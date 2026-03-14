#!/usr/bin/env node
/**
 * Start the CocktailBotHAL mock server + a CORS proxy + React dev client.
 *
 * Usage:
 *   node scripts/dev-robot.js [--glass-present] [--dispense-duration-secs 5]
 *
 * Loads liquids config from examples/mock-server/liquids.json by default.
 * Override with: --liquids path/to/liquids.json
 *
 * In Settings, set:
 *   Robot URL:   http://localhost:8001   ← CORS proxy
 *   Robot Token: changeme
 *
 * Mock control (while running):
 *   curl.exe -X POST http://localhost:8000/mock/control -d "{\"glass\":\"present\"}"
 *   curl.exe -X POST http://localhost:8000/mock/control -d "{\"inject_error\":\"sensor_fault\"}"
 */

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const ROBOT_PORT = 8000; // Rust mock server
const PROXY_PORT = 8001; // CORS proxy (use this as Robot URL)
const ROBOT_DIR = "D:/CocktailBotHAL";
const CLIENT_DIR = __dirname + "/..";
const isWin = process.platform === "win32";

// Pass any extra args (--glass-present, --dispense-duration-secs N, etc.)
// through to the mock server. Default --liquids unless caller provides one.
const extraArgs = process.argv.slice(2);
const defaultMockArgs = extraArgs.includes("--liquids")
  ? []
  : ["--liquids", "examples/mock-server/liquids.json"];

// ── CORS proxy ────────────────────────────────────────────────────────────
// Sits on PROXY_PORT, forwards everything to ROBOT_PORT, and injects
// Access-Control-Allow-Origin so the browser doesn't block the requests.

function startCorsProxy() {
  const server = http.createServer((req, res) => {
    // Preflight
    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders());
      res.end();
      return;
    }

    console.log(`[proxy] ${req.method} ${req.url}`);
    // The Rust server uses exact path matching and reads auth from the
    // Authorization header only. Strip query strings before forwarding so that
    // EventSource's ?token= param doesn't break route matching on /v1/events.
    const upstreamPath = req.url.split("?")[0];

    const opts = {
      hostname: "127.0.0.1",
      port: ROBOT_PORT,
      path: upstreamPath,
      method: req.method,
      headers: { ...req.headers, host: `127.0.0.1:${ROBOT_PORT}` },
    };

    const isSSE =
      req.headers.accept && req.headers.accept.includes("text/event-stream");

    const upstream = http.request(opts, (upRes) => {
      const headers = {
        ...upRes.headers,
        ...corsHeaders(),
        // Prevent any intermediary from buffering SSE
        ...(isSSE ? { "x-accel-buffering": "no" } : {}),
      };
      res.writeHead(upRes.statusCode, headers);
      upRes.pipe(res);
    });

    upstream.on("error", (err) => {
      console.error(`[proxy] upstream error: ${err.message}`);
      if (!res.headersSent) {
        res.writeHead(502, corsHeaders());
        res.end(`Upstream error: ${err.message}`);
      }
    });

    req.pipe(upstream);
  });

  server.listen(PROXY_PORT, "127.0.0.1", () => {
    console.log(
      `[proxy] CORS proxy listening on http://localhost:${PROXY_PORT} → http://localhost:${ROBOT_PORT}`,
    );
    console.log(
      `[proxy] Set Robot URL in Settings to: http://localhost:${PROXY_PORT}`,
    );
  });

  return server;
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Authorization, Content-Type",
    "access-control-allow-methods": "GET, POST, OPTIONS",
  };
}

// ── Process launcher ──────────────────────────────────────────────────────

function startProcess(label, cmd, args, cwd) {
  console.log(`[${label}] Starting: ${cmd} ${args.join(" ")}`);
  const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: isWin });

  child.on("error", (err) =>
    console.error(`[${label}] Failed to start: ${err.message}`),
  );
  child.on("exit", (code) => {
    console.log(`[${label}] exited (code ${code})`);
    process.exit(code ?? 0);
  });

  return child;
}

// ── Inject dev config ─────────────────────────────────────────────────────

const CONFIG_PATH = path.join(CLIENT_DIR, "public", "config.json");
const DEV_CONFIG = {
  activeTheme: "speakeasy",
  settings: {
    browserMode: "card",
    units: "cl",
    lingo: false,
    pride: false,
    robot: {
      url: `http://localhost:${PROXY_PORT}`,
      token: "changeme",
      ingredientAliases: {},
    },
  },
};

fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEV_CONFIG, null, 2) + "\n");
console.log(`[config] Wrote dev config to ${CONFIG_PATH}`);

// ── Start everything ──────────────────────────────────────────────────────

const proxy = startCorsProxy();

const cargoCmd = isWin ? "cargo.exe" : "cargo";
const mockServer = startProcess(
  "robot",
  cargoCmd,
  ["run", "--example", "mock-server", "--", ...defaultMockArgs, ...extraArgs],
  ROBOT_DIR,
);

const npmCmd = isWin ? "npm.cmd" : "npm";
const client = startProcess("client", npmCmd, ["start"], CLIENT_DIR);

// ── Cleanup on exit ───────────────────────────────────────────────────────

function shutdown() {
  proxy.close();
  mockServer.kill();
  client.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

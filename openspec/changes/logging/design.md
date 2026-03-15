## Context

The app currently has two `console.warn` calls with manual string prefixes and no unified logger. As the codebase grows (robot bar, dispense workflow, filter logic), uncontrolled console output becomes harder to trace and leaks into production. The stack is React 16 + Redux + Vite; no existing logging library is in use.

## Goals / Non-Goals

**Goals:**

- Single `src/logger.js` module usable across all hooks and components
- Namespace-tagged output (e.g., `[useRobotBar] warn: ...`)
- Level-aware: `debug < info < warn < error`; production strips `debug` and `info`
- Zero external dependencies (no `loglevel`, `winston`, etc.)
- Replace all existing ad-hoc `console.*` calls

**Non-Goals:**

- Remote log aggregation / crash reporting (e.g., Sentry)
- Persistent log storage in localStorage
- User-visible error UI (that's an error boundary concern)
- Redux action logging middleware (out of scope for now; easy future addition)

## Decisions

### Decision 1 — Plain module, not a class

A simple exported factory function `createLogger(namespace)` returns a plain object `{ debug, info, warn, error }`. No class instantiation required at call sites.

**Why over class:** Simpler to tree-shake and test; fits the functional-components-only rule in this repo.

**Alternative considered:** Single default logger with no namespace — rejected because prefixes are already being used manually, so namespacing is clearly valued.

### Decision 2 — Environment gate via `import.meta.env.MODE`

Vite exposes `import.meta.env.MODE` (`"development"` / `"production"`). The logger checks this at module load time and sets a minimum log level: `debug` in development, `warn` in production.

**Why:** Zero-cost in production; no runtime config file needed; consistent with Vite idioms already in the project.

### Decision 3 — No external dependency

A ~20-line hand-rolled logger is sufficient. Adding `loglevel` or similar would introduce a dependency for trivial functionality.

## Risks / Trade-offs

- **[Risk] Tests import logger and capture console calls** → Mitigation: logger delegates to native `console.*`, so `jest.spyOn(console, 'warn')` continues to work.
- **[Risk] `import.meta.env` unavailable in Jest** → Mitigation: add `import.meta.env.MODE` fallback to `"test"` via Vitest config or mock; treat test like development (all levels on).
- **[Trade-off] No runtime level override** → Acceptable for a static PWA with no server config; a `localStorage`-based override can be added later if needed.

## Migration Plan

1. Create `src/logger.js`
2. Replace `console.warn` calls in `useRobotBar.js` and `useManualIngredients.js`
3. Grep for remaining `console.*` calls and migrate where appropriate
4. Run tests; update snapshots if any

No rollback needed — the change is purely additive at the module level.

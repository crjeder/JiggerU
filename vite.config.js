import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    // Transform JSX in .js files before vite:import-analysis runs
    {
      name: "treat-js-files-as-jsx",
      enforce: "pre",
      async transform(code, id) {
        if (!/src\/.*\.js$/.test(id)) return null;
        return transformWithEsbuild(code, id, { loader: "jsx" });
      },
    },
    // Replace jest.* with vi.* in test files at compile time so mock
    // hoisting works correctly (Vitest only hoists vi.mock, not jest.mock)
    {
      name: "jest-to-vi-compat",
      enforce: "pre",
      transform(code, id) {
        if (!/\.spec\.[jt]sx?$/.test(id)) return null;
        return code
          .replace(/\bjest\.mock\b/g, "vi.mock")
          .replace(/\bjest\.fn\b/g, "vi.fn")
          .replace(/\bjest\.spyOn\b/g, "vi.spyOn")
          .replace(/\bjest\.resetAllMocks\b/g, "vi.resetAllMocks")
          .replace(/\bjest\.clearAllMocks\b/g, "vi.clearAllMocks")
          .replace(/\bjest\.restoreAllMocks\b/g, "vi.restoreAllMocks");
      },
    },
    react(),
    svgr(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  resolve: {
    alias: {
      // react-infinite-scroller has an incomplete package.json; point to dist directly
      "react-infinite-scroller": "react-infinite-scroller/dist/InfiniteScroll",
    },
  },
  publicDir: "public",
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});

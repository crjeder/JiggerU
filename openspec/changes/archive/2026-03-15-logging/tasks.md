## 1. Create Logger Utility

- [x] 1.1 Create `src/logger.js` with `createLogger(namespace)` factory function
- [x] 1.2 Implement log levels: `debug`, `info`, `warn`, `error` delegating to native `console.*`
- [x] 1.3 Add production gate: suppress `debug`/`info` when `import.meta.env.MODE === "production"`
- [x] 1.4 Handle test environment: treat `import.meta.env.MODE === "test"` same as development (all levels on)

## 2. Migrate Existing Console Calls

- [x] 2.1 Replace `console.warn` in `src/hooks/useRobotBar.js` with `createLogger("useRobotBar").warn(...)`
- [x] 2.2 Replace `console.warn` in `src/hooks/useManualIngredients.js` with `createLogger("useManualIngredients").warn(...)`
- [x] 2.3 Grep for remaining `console.*` calls in `src/` and migrate appropriate ones to named loggers

## 3. Tests

- [x] 3.1 Write `src/logger.spec.js` covering: namespace prefix in output, production level suppression, development level pass-through
- [x] 3.2 Verify `useRobotBar` and `useManualIngredients` tests still pass (spy on `console.warn` as before)
- [x] 3.3 Run full test suite; update snapshots if needed (`npm test -- -u`)

## 4. Housekeeping

- [x] 4.1 Update `CHANGELOG.md` with new `Added` entry for centralized logging utility

## 1. Create Logger Utility

- [ ] 1.1 Create `src/logger.js` with `createLogger(namespace)` factory function
- [ ] 1.2 Implement log levels: `debug`, `info`, `warn`, `error` delegating to native `console.*`
- [ ] 1.3 Add production gate: suppress `debug`/`info` when `import.meta.env.MODE === "production"`
- [ ] 1.4 Handle test environment: treat `import.meta.env.MODE === "test"` same as development (all levels on)

## 2. Migrate Existing Console Calls

- [ ] 2.1 Replace `console.warn` in `src/hooks/useRobotBar.js` with `createLogger("useRobotBar").warn(...)`
- [ ] 2.2 Replace `console.warn` in `src/hooks/useManualIngredients.js` with `createLogger("useManualIngredients").warn(...)`
- [ ] 2.3 Grep for remaining `console.*` calls in `src/` and migrate appropriate ones to named loggers

## 3. Tests

- [ ] 3.1 Write `src/logger.spec.js` covering: namespace prefix in output, production level suppression, development level pass-through
- [ ] 3.2 Verify `useRobotBar` and `useManualIngredients` tests still pass (spy on `console.warn` as before)
- [ ] 3.3 Run full test suite; update snapshots if needed (`npm test -- -u`)

## 4. Housekeeping

- [ ] 4.1 Update `CHANGELOG.md` with new `Added` entry for centralized logging utility

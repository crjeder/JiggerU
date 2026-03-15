## Why

The codebase currently uses ad-hoc `console.warn` calls with inconsistent manual prefixes (e.g., `[useRobotBar]`, `[useManualIngredients]`). There is no centralized control over log verbosity, no consistent format, and debug noise leaks into production builds.

## What Changes

- Add a `src/logger.js` utility with namespaced, level-aware logging (`debug`, `info`, `warn`, `error`)
- Replace all scattered `console.*` calls across hooks and components with the logger
- Suppress all logs at or below `info` level in production builds
- Optionally add Redux middleware to log dispatched actions in development

## Capabilities

### New Capabilities

- `app-logger`: Centralized logger utility with namespace support, log levels, and environment-aware suppression

### Modified Capabilities

<!-- No existing spec-level behavior changes — this is purely an infrastructure/DX improvement -->

## Impact

- `src/hooks/useRobotBar.js` — replace `console.warn`
- `src/hooks/useManualIngredients.js` — replace `console.warn`
- Any other files using `console.*` for debug/error output
- `src/store.js` (if Redux middleware is added)
- No UI changes, no breaking API changes, no data schema changes

## Why

Create React App (`react-scripts@5`) is unmaintained and imposes slow cold-start dev servers, opaque webpack config, and outdated tooling. Vite provides near-instant HMR, first-class ES modules, and an actively maintained ecosystem — making day-to-day development noticeably faster.

## What Changes

- Replace `react-scripts` with `vite` + `@vitejs/plugin-react` as the build/dev tool
- Replace `react-scripts test` with `vitest` + `@testing-library/react` (same API, compatible with existing `*.spec.js` tests)
- Add `index.html` to the project root (Vite requires it there, not in `public/`)
- Update `package.json` scripts (`start` → `vite`, `build` → `vite build`, `test` → `vitest`)
- Remove CRA-specific config (`eslintConfig.extends: react-app`, `browserslist` in package.json)
- Add `vite.config.js`
- Remove `react-scripts` from dependencies

## Capabilities

### New Capabilities

- `vite-build`: Vite-based build pipeline replacing react-scripts for dev, build, and test

### Modified Capabilities

<!-- No existing spec-level behavior changes — this is a pure tooling swap with no user-facing requirement changes. -->

## Impact

- **Dependencies**: `react-scripts` removed; `vite`, `@vitejs/plugin-react`, `vitest`, `@testing-library/jest-dom`, `jsdom` added as devDependencies
- **Files**: `index.html` moved to root; `vite.config.js` added; `public/index.html` removed or repurposed
- **Tests**: `*.spec.js` files use Jest-compatible APIs — Vitest is a drop-in; snapshot format identical
- **CI/Netlify**: Build command changes from `react-scripts build` to `vite build`; output dir stays `build/` (configured in vite)
- **Env vars**: CRA's `REACT_APP_*` prefix is not used here, so no env var migration needed

## Context

The app was bootstrapped with Create React App (CRA) and uses `react-scripts@5` for dev, build, and test. CRA is no longer maintained; its webpack-based pipeline is slow to start and difficult to extend without ejecting. The stack is React 18 + Redux + MUI v5 + React Router v6 — all of which have first-class Vite support. Tests use `@testing-library/react` with Jest-compatible APIs (`*.spec.js`).

## Goals / Non-Goals

**Goals:**

- Replace `react-scripts` dev/build with Vite
- Replace `react-scripts test` with Vitest (Jest-compatible drop-in)
- Keep all existing tests green with no test rewrites
- Maintain the same output directory (`build/`) for Netlify compatibility
- Preserve Prettier + Husky formatting workflow unchanged

**Non-Goals:**

- Migrating tests from `*.spec.js` to `*.test.js` or TypeScript
- Switching component library or state management
- Adding new features or refactoring existing code
- Touching CI/CD beyond the build command

## Decisions

### 1. Vitest over Jest directly

**Decision:** Use Vitest as the test runner, not plain Jest.

**Rationale:** Vitest shares Vite's config and transform pipeline, so no separate Babel setup is needed. It implements the full Jest API (`describe`, `it`, `expect`, `vi` ≈ `jest`, snapshot format compatible), meaning existing `*.spec.js` files run without modification. Running `vitest` in watch mode is equivalent to `react-scripts test`.

**Alternative considered:** Keeping Jest with `babel-jest` + `jest-environment-jsdom`. This works but requires a parallel Babel config alongside Vite — extra complexity for zero benefit.

### 2. `@vitejs/plugin-react` (Babel) over `@vitejs/plugin-react-swc`

**Decision:** Use the Babel-based plugin.

**Rationale:** The project already uses Babel implicitly via CRA. The Babel plugin is more compatible with existing JSX transform usage and avoids any edge cases with SWC. Performance difference is negligible at this project's scale.

### 3. Output directory stays `build/`

**Decision:** Configure `vite.config.js` with `build.outDir: 'build'`.

**Rationale:** Netlify is pointed at `build/`. Keeping the same dir requires zero deployment config changes.

### 4. `index.html` moved to project root

**Decision:** Move `public/index.html` to the project root and update asset references.

**Rationale:** Vite's entry point is `index.html` at the root. The `%PUBLIC_URL%` CRA placeholder is replaced with Vite's `<script type="module" src="/src/index.js">` pattern. Static assets in `public/` remain served as-is.

### 5. Environment variables

**Decision:** No migration needed.

**Rationale:** The codebase does not use `REACT_APP_*` env vars. If added in the future, Vite uses `VITE_*` prefix — a one-line change.

## Risks / Trade-offs

- **Snapshot format differences**: Vitest snapshots are Jest-compatible, but re-running `npm test -- -u` after migration may regenerate all snapshots. → Run with `-u` once after migration to re-baseline; diff to confirm no behavioral change.
- **CRA global polyfills removed**: CRA injects some Node globals (`process.env`, `Buffer`) into browser code. Vite does not. → Audit for any `process.env` usage; add `define` entries in `vite.config.js` if needed.
- **`eslintConfig` in package.json**: CRA auto-applied `eslint-config-react-app`. Removing it may surface new lint errors on `npm run lint` if configured. → Remove the `eslintConfig` block; add a minimal `.eslintrc` if needed (likely not, since Prettier is the enforced formatter).
- **`browserslist` field**: CRA used this for PostCSS/Babel targets. Vite uses its own defaults (modern browsers). → Remove from `package.json`; add to `vite.config.js` if specific targets are required.

## Migration Plan

1. Install Vite deps, remove `react-scripts`
2. Add `vite.config.js` and `vitest.config.js` (or unified config)
3. Move/update `index.html` to root
4. Update `package.json` scripts
5. Run `npm test` — fix any failures
6. Run `npm run build` — verify `build/` output
7. Run `npm start` — verify dev server
8. Remove leftover CRA artifacts (`eslintConfig`, `browserslist` in package.json)

**Rollback:** `react-scripts` can be reinstalled and scripts reverted; no data or state changes are involved.

## Open Questions

- None — this is a well-understood tooling swap with no ambiguous requirements.

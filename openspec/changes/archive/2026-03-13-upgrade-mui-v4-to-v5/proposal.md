## Why

Material UI v4 is no longer maintained and relies on JSS for styling, which conflicts with React 18's concurrent rendering model. Upgrading to MUI v5 brings the `@emotion` styling engine, improved theming, better TypeScript support, and long-term security patches.

## What Changes

- Replace `@material-ui/core` with `@mui/material` and `@mui/icons-material`
- Replace JSS-based styling (`makeStyles`, `withStyles`) with `sx` prop or `styled()` from `@mui/material/styles`
- **BREAKING**: Theme API changes — `theme.palette.type` → `theme.palette.mode`, new spacing API, updated component prop names
- **BREAKING**: Several component prop renames (e.g., `variant` values, `color` values)
- Install `@emotion/react` and `@emotion/styled` as peer dependencies
- Remove `@material-ui/core` and `@material-ui/icons` from dependencies
- Update all component imports across the codebase

## Capabilities

### New Capabilities

- `mui-v5-theme`: Theme configuration updated for MUI v5 API (`palette.mode`, new component overrides syntax, `createTheme` usage)

### Modified Capabilities

- `cocktail-detail`: No requirement changes — implementation details updated (import paths, styling API) but user-facing behavior unchanged
- `readme-content`: No requirement changes

## Impact

- `package.json`: Remove `@material-ui/*`, add `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- `src/theme.js`: Rewrite for MUI v5 `createTheme` API
- All component files in `src/components/`: Update import paths, migrate `makeStyles`/`withStyles` to `sx` prop or `styled()`, fix renamed props
- Snapshot tests in `src/components/__snapshots__/`: Must be regenerated after migration
- `src/index.js` / app root: Wrap with `<CacheProvider>` if SSR needed (not required for this SPA)

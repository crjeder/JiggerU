## Context

The app currently uses `@material-ui/core` v4 and `@material-ui/icons` v4 with JSS-based styling (`makeStyles`, `withStyles`, `createMuiTheme`, `MuiThemeProvider`). There are ~30 component files using these APIs. MUI v5 replaced JSS with Emotion and renamed the package scope from `@material-ui` to `@mui`. The app is a React 16 SPA with no SSR, which simplifies the migration (no `CacheProvider` needed for server-side style injection).

## Goals / Non-Goals

**Goals:**

- Replace all `@material-ui/*` imports with `@mui/*` equivalents
- Migrate styling from `makeStyles`/`withStyles` to `sx` prop or `styled()` API
- Update `src/theme.js` to use MUI v5 `createTheme` and `ThemeProvider`
- Keep all existing UI behavior and visual appearance intact
- Regenerate passing snapshot tests after migration

**Non-Goals:**

- Upgrade React (stays at v16)
- Adopt new MUI v5-exclusive components or design patterns
- Migrate to TypeScript
- Adopt CSS-in-JS beyond what MUI requires

## Decisions

### 1. Styling strategy: `sx` prop for simple cases, `styled()` for complex

**Decision**: Convert `makeStyles` hooks to `sx` prop on components for simple one-off styles. For components with many style rules or reuse needs, use `styled()` from `@mui/material/styles`.

**Rationale**: The `sx` prop is the idiomatic MUI v5 approach and eliminates the need for style hook boilerplate. `styled()` keeps complex styles colocated and avoids deep prop drilling.

**Alternative considered**: Keep using `makeStyles` via the `@mui/styles` compatibility package. Rejected because `@mui/styles` is deprecated, requires a separate install, and still uses JSS — defeating the purpose of the upgrade.

### 2. Migration approach: file-by-file, tests last

**Decision**: Migrate all component files first, update theme, then regenerate snapshots in a single pass at the end.

**Rationale**: Snapshot tests will fail throughout migration due to import path and markup changes. Regenerating at the end avoids noisy intermediate failures and reduces churn.

### 3. Theme: minimal changes to preserve behavior

**Decision**: Update only what MUI v5 requires (`palette.type` → `palette.mode`, `createMuiTheme` → `createTheme`, `MuiThemeProvider` → `ThemeProvider`). Keep existing color/theme logic intact.

**Rationale**: The user-facing theme selection feature (color + light/dark) must continue to work exactly as before.

## Risks / Trade-offs

- **Snapshot churn**: All ~8 snapshot files must be regenerated. Risk of accidentally accepting incorrect snapshots.
  → Mitigation: Do a visual review of diffs before accepting with `-u`, and run the dev server to visually verify.

- **Prop renames missed**: MUI v5 renamed several props (e.g., `variant="default"` removed from `Button`, `color` prop restrictions).
  → Mitigation: Run the app in dev mode and check console for MUI deprecation warnings after migration.

- **makeStyles removal**: `makeStyles` from `@material-ui/core/styles` is gone. Must import from `@mui/styles` (deprecated compat) or fully migrate.
  → Decision: Fully migrate to `sx`/`styled()` — no compat package.

- **React 16 + Emotion**: Emotion works with React 16, but some MUI v5 features (e.g., `unstable_sx`) assume React 17+. Core `sx` prop is React 16 compatible.
  → Mitigation: Avoid experimental MUI v5 APIs.

## Migration Plan

1. Install new packages: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
2. Remove old packages: `@material-ui/core`, `@material-ui/icons`
3. Update `src/theme.js` (highest-impact, foundational change)
4. Migrate each component file: update imports, convert `makeStyles` → `sx`/`styled()`
5. Fix any prop renames or API changes found during migration
6. Run `npm test -- -u` to regenerate all snapshots
7. Run `npm start` and visually verify key views (browser list, cocktail detail, settings, my bar)

**Rollback**: All changes are in source — revert the branch. No data migration, no database changes.

## Open Questions

- Should the app be upgraded to React 17 or 18 in the same PR, or kept at React 16?
  (Current decision: keep React 16 — separate concern.)

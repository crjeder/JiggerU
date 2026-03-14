## Context

The app has four themes: `classic`, `c64`, `negroni`, and `blossom`. Themes are registered in `src/themes/index.js` by key, and theme keys are persisted to localStorage via Redux. The `negroni` theme directory contains a single `theme.js` file and includes a `custom.mixButtonLabel` field used by the mix button component.

## Goals / Non-Goals

**Goals:**

- Rename the theme key from `negroni` to `speakeasy` in all code references
- Rename the source directory accordingly
- Update `mixButtonLabel` to `"Shake one!"`
- Update snapshot tests

**Non-Goals:**

- Changing any visual styles (colors, typography, spacing)
- Adding migration logic for existing localStorage values (small user base, acceptable reset)

## Decisions

**Rename directory rather than add an alias**
Simple rename is cleaner than maintaining a compatibility alias. No public API surface to preserve.

**No localStorage migration**
Users with `negroni` stored as their theme preference will fall back to the default theme on next load. Given the app's scale, a migration shim would be over-engineering.

## Risks / Trade-offs

- [Stored theme preference lost] → Acceptable; users can re-select Speakeasy. No data loss of consequence.
- [Snapshot tests will fail until updated] → Run `npm test -- -u` after changes to update snapshots intentionally.

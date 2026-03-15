## Why

The app's current theming system exposes raw color and light/dark toggles to end users, producing inconsistent visual results and no coherent identity. Replacing this with a small set of admin-curated, full-personality themes gives any installation a distinctive look — font, palette, density, and layout — configured once by whoever deploys the app.

## What Changes

- **BREAKING** Remove `color` and `theme` (light/dark) from Redux `settings` state and Settings UI
- Add a theme registry (`src/themes/`) with four named themes: `classic`, `c64`, `negroni`, `blossom`
- Each theme is a complete MUI theme object covering palette, typography (local fonts), border-radius, shadows, card width, and density
- Local font files (woff2) stored in `public/fonts/`; no CDN dependency
- Admin selects active theme via `window.__APP_CONFIG__` inline in `public/index.html` — no rebuild required to switch themes
- Card width is driven by `theme.custom.cardWidth`, replacing the hardcoded `theme.spacing(40)` in `CocktailCard`

## Capabilities

### New Capabilities

- `curated-themes`: Admin-configurable visual theme system — palette, typography, shape, density, and card layout — bundled as named theme objects with local fonts, activated via inline config in `index.html`

### Modified Capabilities

- (none — settings behavior change is a removal, not a spec-level requirement change)

## Impact

- `src/theme.js` — refactored from Redux-connected color picker to static theme loader
- `src/reducers/index.js` — remove `theme` and `color` from settings default state
- `src/components/Settings.js` — remove color and light/dark UI controls
- `src/components/CocktailCard.js` — card width reads `theme.custom.cardWidth`
- `public/index.html` — add `window.__APP_CONFIG__` and `@font-face` declarations
- `public/fonts/` — new directory with woff2 font files
- Snapshot tests will need updates after Settings and CocktailCard changes
- No backend, API, or data changes

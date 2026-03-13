## Why

The in-app Settings dialog exposes controls (theme, browser mode, units, bartender lingo, pride) as per-user preferences persisted in localStorage, but most of these are better treated as deployment-time configuration — set once by the site operator, not overridden per user. Consolidating them into a static `public/config.json` file simplifies the app, removes a UI surface, and makes the deployment contract explicit.

## What Changes

- A new `public/config.json` file holds all operator-level settings: `activeTheme`, `browserMode`, `units`, `lingo`, `pride`, and `robot` config.
- `window.__APP_CONFIG__` in `public/index.html` is replaced by a fetch of `config.json` at startup (or the inline script is extended to load all fields from a dedicated file).
- The Redux `settings` slice is initialised from `config.json` values at startup instead of localStorage defaults.
- The Settings page/route (`/settings`) and `Settings.js` component are removed from the app.
- The Topbar "Settings" navigation item is removed.
- `activeTheme` specifically moves from the existing `window.__APP_CONFIG__` inline script to `config.json` (part of the broader settings consolidation).

## Capabilities

### New Capabilities

- `settings-file`: A static `public/config.json` provides all operator-configurable settings read at app startup, replacing runtime user preference controls.

### Modified Capabilities

- `curated-themes`: `activeTheme` source changes from an inline `<script>` in `index.html` to `config.json`, modifying how the theme is resolved at startup.

## Impact

- **Removed**: `src/components/Settings.js`, `Settings.spec.js`, `/settings` route in `src/App.js`, Settings nav entry in `Topbar.js`
- **Modified**: `src/reducers/settings.js` — initial state sourced from `config.json` instead of hardcoded defaults; `public/index.html` — inline `__APP_CONFIG__` script removed or reduced; `src/theme.js` — reads `activeTheme` from config loader instead of `window.__APP_CONFIG__`
- **New**: `public/config.json`, `src/config.js` (config loader module)
- **Dependencies**: No new npm dependencies required
- **localStorage**: Existing settings in localStorage are no longer read (breaking for returning users who customised settings)

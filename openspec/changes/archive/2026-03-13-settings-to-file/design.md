## Context

Currently the app has two separate configuration mechanisms:

1. **`window.__APP_CONFIG__`** — an inline `<script>` in `public/index.html` that sets `activeTheme`. Read synchronously by `src/themes/index.js` before React initialises.
2. **Redux `settings` slice** — user-editable preferences (`browserMode`, `units`, `lingo`, `pride`, `robot`) persisted in localStorage and edited via the `/settings` page.

This change consolidates both into a single `public/config.json` file, removes the Settings UI page, and treats all these values as operator/deployment configuration.

## Goals / Non-Goals

**Goals:**

- Single source of truth for app configuration: `public/config.json`
- `activeTheme` read from `config.json` (replacing the `index.html` inline script)
- All other settings (`browserMode`, `units`, `lingo`, `pride`, `robot`) also read from `config.json`
- Settings page and route removed from the app
- `config.json` is easily editable by a deployer without a code rebuild

**Non-Goals:**

- Per-user preference controls (no new UI to replace the old Settings page)
- Runtime hot-reload of config without page refresh
- Migration of existing localStorage values for returning users

## Decisions

### 1. Synchronous config load via inline XHR

`getTheme()` in `src/themes/index.js` is called synchronously during React initialisation. An async fetch would require blocking React render or restructuring the theme provider. Instead, `public/index.html` loads `config.json` synchronously before the app bundle:

```html
<script>
  (function () {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/config.json", false); // synchronous
      xhr.send();
      if (xhr.status === 200)
        window.__APP_CONFIG__ = JSON.parse(xhr.responseText);
    } catch (e) {}
  })();
</script>
```

**Alternatives considered:**

- _Async fetch + React Suspense_: Requires restructuring theme provider and app bootstrap — high complexity for minimal gain.
- _Build-time env vars_: Requires rebuild to change config — defeats the "edit without rebuild" goal.
- _Keep inline script, just rename fields_: Doesn't consolidate the two mechanisms.

### 2. Redux settings slice reads from `window.__APP_CONFIG__`

The Redux initial state currently hardcodes defaults in `src/reducers/index.js`. The `settings` slice will be initialised from `window.__APP_CONFIG__` (merged with hardcoded fallbacks), so no new global state mechanism is needed.

```js
const configSettings = (window.__APP_CONFIG__ || {}).settings || {};
settings: {
  browserMode: configSettings.browserMode || "card",
  units: configSettings.units || "cl",
  ...
}
```

**Alternative considered:** A dedicated `src/config.js` module with a `getConfig()` helper — unnecessary indirection for a single read at startup.

### 3. `config.json` structure

```json
{
  "activeTheme": "c64",
  "settings": {
    "browserMode": "card",
    "units": "cl",
    "lingo": false,
    "pride": false,
    "robot": {
      "url": "",
      "token": "",
      "ingredientAliases": {}
    }
  }
}
```

`activeTheme` is a top-level key (not nested under `settings`) to preserve backward compatibility with `window.__APP_CONFIG__.activeTheme` as read by `src/themes/index.js`.

### 4. localStorage is no longer read for settings

The `loadPersistedState()` call that hydrates the Redux store from localStorage is removed (or limited to non-settings state). Returning users lose any customised settings on first load — acceptable given that this app's settings are now operator-configured.

## Risks / Trade-offs

- **Returning users lose custom settings** → Acceptable. Document in CHANGELOG as a breaking change.
- **Synchronous XHR is deprecated in some browser contexts** → It is still fully supported in main thread scripts; the catch block ensures graceful fallback to defaults if the file is absent (e.g., during local `npm start` without a `public/config.json`).
- **`/config.json` must be served with correct MIME type by host** → Netlify serves static files automatically; no special config needed.
- **`ingredientAliases` default data is currently bundled** (`src/data/ingredientAliases.json`) → For the robot use case this data may be too large for `config.json`. Initial implementation moves only the user-set aliases to `config.json`; the default alias bundle remains in the app.

## Migration Plan

1. Add `public/config.json` with current default values.
2. Replace inline `<script>` in `public/index.html` with the synchronous XHR loader.
3. Update `src/reducers/index.js` to seed `settings` from `window.__APP_CONFIG__.settings`.
4. Remove `Settings.js`, `Settings.spec.js`, `/settings` route, and Topbar nav item.
5. Update `src/themes/index.js` — no change required (already reads `window.__APP_CONFIG__.activeTheme`).

Rollback: Revert `public/index.html` to inline script and restore the Settings component.

## Open Questions

- Should `robot.ingredientAliases` in `config.json` be the full default alias map, or start empty and rely on the bundled defaults? (Current decision: start empty; bundled defaults remain as fallback.)
- Is there any remaining use case for user-editable settings that should be preserved? If so, which settings?

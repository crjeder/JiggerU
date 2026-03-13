## 1. Add config file and loader

- [x] 1.1 Create `public/config.json` with all default settings: `activeTheme`, `settings.browserMode`, `settings.units`, `settings.lingo`, `settings.pride`, `settings.robot`
- [x] 1.2 Replace the inline `window.__APP_CONFIG__` script in `public/index.html` with a synchronous XHR loader that fetches `/config.json` and assigns the result to `window.__APP_CONFIG__`

## 2. Seed Redux settings from config

- [x] 2.1 Update `src/reducers/index.js` to read `(window.__APP_CONFIG__ || {}).settings` and merge with hardcoded defaults when initialising the `settings` slice
- [x] 2.2 Remove the `loadPersistedState()` settings hydration from the Redux initial state (localStorage no longer seeds settings)

## 3. Remove Settings UI

- [x] 3.1 Delete `src/components/Settings.js` and `src/components/Settings.spec.js`
- [x] 3.2 Remove the `/settings` route from `src/App.js`
- [x] 3.3 Remove the Settings navigation item from `src/components/Topbar.js`

## 4. Snapshot and test cleanup

- [x] 4.1 Run `npm test -- -u` to update all affected snapshots
- [x] 4.2 Verify no remaining imports or references to `Settings` component exist

## 5. Verification

- [ ] 5.1 Start the app (`npm start`) and confirm the theme from `config.json` loads correctly
- [x] 5.2 Confirm navigating to `/settings` no longer renders the settings page
- [x] 5.3 Confirm the Topbar has no Settings link
- [x] 5.4 Change `activeTheme` in `config.json` and reload — confirm the new theme applies

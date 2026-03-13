## ADDED Requirements

### Requirement: Config file provides all operator settings

The system SHALL read application configuration from `public/config.json` at startup. This file SHALL be the single source of truth for all operator-configurable settings: `activeTheme`, `browserMode`, `units`, `lingo`, `pride`, and `robot` (url, token, ingredientAliases). The file SHALL be loaded synchronously via inline XHR in `public/index.html` before the app bundle executes, populating `window.__APP_CONFIG__`.

#### Scenario: Config file is present and valid

- **WHEN** `public/config.json` exists and contains valid JSON
- **THEN** `window.__APP_CONFIG__` is populated with its contents before React initialises

#### Scenario: Config file is absent or fails to load

- **WHEN** `public/config.json` is absent or returns a non-200 status
- **THEN** `window.__APP_CONFIG__` remains undefined and the app uses hardcoded defaults for all settings

#### Scenario: Operator changes a setting without rebuild

- **WHEN** an operator edits `public/config.json` (e.g., sets `browserMode` to `"table"`) and redeploys
- **THEN** all users see the updated setting on next page load, without a code rebuild

---

### Requirement: Redux settings slice is seeded from config file

The Redux `settings` initial state SHALL be populated from `window.__APP_CONFIG__.settings` at store initialisation, merged with hardcoded defaults. Settings SHALL NOT be read from localStorage on startup. The `settings` slice SHALL NOT persist to localStorage.

#### Scenario: Config specifies units

- **WHEN** `config.json` contains `{ "settings": { "units": "oz" } }`
- **THEN** the Redux store initialises with `state.settings.units === "oz"`

#### Scenario: Config omits a setting

- **WHEN** `config.json` does not include a `settings.browserMode` key
- **THEN** the Redux store initialises `state.settings.browserMode` with the hardcoded default (`"card"`)

---

### Requirement: Settings page and route are removed

The system SHALL NOT include a `/settings` route or a Settings UI component. The Topbar SHALL NOT display a "Settings" navigation item. All former user-editable preferences are now operator-configured via `config.json`.

#### Scenario: Navigating to /settings

- **WHEN** a user navigates to `/settings`
- **THEN** the app renders the default not-found behaviour (redirect to home or 404 view)

#### Scenario: Topbar has no Settings link

- **WHEN** a user views the Topbar
- **THEN** no "Settings" navigation item is visible

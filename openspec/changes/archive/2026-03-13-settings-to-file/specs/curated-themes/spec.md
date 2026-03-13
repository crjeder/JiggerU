## MODIFIED Requirements

### Requirement: Admin configures active theme via config file

The system SHALL read the active theme name from `window.__APP_CONFIG__.activeTheme`, where `window.__APP_CONFIG__` is loaded from `public/config.json` via a synchronous XHR in `public/index.html`. The inline `<script>` block that previously hard-coded `window.__APP_CONFIG__` SHALL be replaced by the synchronous config loader. This value SHALL be read synchronously before React initialises, with no async fetch required.

#### Scenario: Admin switches theme without rebuild

- **WHEN** an admin edits `activeTheme` in `public/config.json` and redeploys
- **THEN** all users see the new theme on next page load, without a code rebuild

#### Scenario: Config file absent falls back to classic

- **WHEN** `public/config.json` is absent or fails to load
- **THEN** `window.__APP_CONFIG__` is undefined and the app renders using the `classic` theme

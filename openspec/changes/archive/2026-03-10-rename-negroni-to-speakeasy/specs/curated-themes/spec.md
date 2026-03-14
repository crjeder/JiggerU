## MODIFIED Requirements

### Requirement: Theme registry provides named visual themes

The system SHALL maintain a registry of named themes, each defining a complete visual personality including palette, typography, shape, card dimensions, and layout density. The registry SHALL contain at least the themes: `classic`, `c64`, `speakeasy`, `blossom`.

#### Scenario: Valid theme name loads correctly

- **WHEN** `window.__APP_CONFIG__.activeTheme` is set to a known theme name (e.g., `"c64"`)
- **THEN** the app renders using that theme's palette, font, border-radius, and card width

#### Scenario: Unknown theme name falls back to classic

- **WHEN** `window.__APP_CONFIG__.activeTheme` is set to an unrecognised string
- **THEN** the app renders using the `classic` theme

#### Scenario: Missing config falls back to classic

- **WHEN** `window.__APP_CONFIG__` is absent or `activeTheme` is undefined
- **THEN** the app renders using the `classic` theme

## ADDED Requirements

### Requirement: Speakeasy theme provides a mix button label

The system SHALL read `theme.custom.mixButtonLabel` for the Speakeasy theme and display it as the mix button text. The Speakeasy theme SHALL define this value as `"Shake one!"`.

#### Scenario: Speakeasy theme shows correct mix button label

- **WHEN** the active theme is `speakeasy`
- **THEN** the mix button displays the text `"Shake one!"`

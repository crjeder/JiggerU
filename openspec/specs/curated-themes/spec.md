### Requirement: Theme registry provides named visual themes

The system SHALL maintain a registry of named themes, each defining a complete visual personality including palette, typography, shape, card dimensions, and layout density. The registry SHALL contain at least the themes: `classic`, `c64`, `negroni`, `blossom`.

#### Scenario: Valid theme name loads correctly

- **WHEN** `window.__APP_CONFIG__.activeTheme` is set to a known theme name (e.g., `"c64"`)
- **THEN** the app renders using that theme's palette, font, border-radius, and card width

#### Scenario: Unknown theme name falls back to classic

- **WHEN** `window.__APP_CONFIG__.activeTheme` is set to an unrecognised string
- **THEN** the app renders using the `classic` theme

#### Scenario: Missing config falls back to classic

- **WHEN** `window.__APP_CONFIG__` is absent or `activeTheme` is undefined
- **THEN** the app renders using the `classic` theme

---

### Requirement: Admin configures active theme via inline script

The system SHALL read the active theme name from `window.__APP_CONFIG__.activeTheme`, set as an inline `<script>` in `public/index.html`. This value SHALL be read synchronously before React initialises, with no async fetch required.

#### Scenario: Admin switches theme without rebuild

- **WHEN** an admin edits `activeTheme` in `public/index.html` and redeploys
- **THEN** all users see the new theme on next page load, without a code rebuild

---

### Requirement: Fonts are served locally

The system SHALL serve all theme fonts as woff2 files from `public/fonts/`. No font SHALL be loaded from an external CDN. `@font-face` declarations SHALL be present in `public/index.html` before the app bundle loads.

#### Scenario: App loads fonts offline

- **WHEN** the app is installed as a PWA and loaded without network access
- **THEN** theme fonts render correctly from the service worker cache

---

### Requirement: Card width is theme-driven

The system SHALL determine cocktail card width from `theme.custom.cardWidth` (pixels). Each theme SHALL define this value. `CocktailCard` SHALL NOT use a hardcoded width value.

#### Scenario: C64 theme shows wide cards

- **WHEN** the active theme is `c64`
- **THEN** each cocktail card is 640px wide, resulting in approximately one card per row on standard viewports

#### Scenario: Blossom theme shows slim cards

- **WHEN** the active theme is `blossom`
- **THEN** each cocktail card is 260px wide, allowing multiple cards per row

#### Scenario: Card width does not overflow on small screens

- **WHEN** a theme's `cardWidth` exceeds the viewport width
- **THEN** the card fills the viewport width without horizontal scroll

---

### Requirement: User color and light/dark settings are removed

The system SHALL NOT expose color scheme or light/dark mode controls to users in the Settings UI. These SHALL be determined entirely by the active theme. The Redux settings state SHALL NOT contain `color` or `theme` fields.

#### Scenario: Settings page has no theme controls

- **WHEN** a user navigates to Settings
- **THEN** no color picker and no light/dark toggle are displayed

#### Scenario: Redux state has no theme fields

- **WHEN** the Redux store is initialised
- **THEN** `state.settings` does not contain `color` or `theme` keys

## ADDED Requirements

### Requirement: Theme defines the mix button label

Each theme SHALL declare `theme.custom.mixButtonLabel` as a string. Components that render the card mix button SHALL read this value via `useTheme()` and fall back to `"Mix it!"` when the field is absent. The label is purely presentational and SHALL NOT affect robot or dispense behaviour.

#### Scenario: C64 theme shows "RUN"

- **WHEN** the active theme is `c64`
- **THEN** the mix button on each card displays the text `"RUN"`

#### Scenario: Classic theme shows "Mix it!"

- **WHEN** the active theme is `classic`
- **THEN** the mix button on each card displays the text `"Mix it!"`

#### Scenario: Theme without mixButtonLabel falls back to default

- **WHEN** a theme's `custom` object does not include `mixButtonLabel`
- **THEN** the mix button displays `"Mix it!"`

## Requirements

### Requirement: Theme uses MUI v5 API

The app's theme provider SHALL use MUI v5's `createTheme` and `ThemeProvider` from `@mui/material/styles` and `@emotion/react`.

#### Scenario: Light mode renders with user-selected color

- **WHEN** a user selects a color scheme and "light" mode in Settings
- **THEN** the app SHALL render with that color as the primary palette and a light background

#### Scenario: Dark mode renders with user-selected color

- **WHEN** a user selects a color scheme and "dark" mode in Settings
- **THEN** the app SHALL render with that color as the primary palette and a dark background

### Requirement: Theme palette mode replaces palette type

The theme configuration SHALL use `palette.mode` (values: `"light"` | `"dark"`) instead of the deprecated `palette.type`.

#### Scenario: Dark mode activates via palette.mode

- **WHEN** the Redux settings state has `theme: "dark"`
- **THEN** the MUI theme SHALL be constructed with `palette: { mode: "dark" }`

#### Scenario: Light mode activates via palette.mode

- **WHEN** the Redux settings state has `theme: "light"`
- **THEN** the MUI theme SHALL be constructed with `palette: { mode: "light" }`

### Requirement: All component styles use Emotion-compatible APIs

All component styling SHALL use MUI v5's `sx` prop, `styled()` from `@mui/material/styles`, or inline styles — not JSS-based `makeStyles` or `withStyles`.

#### Scenario: No JSS style hooks in production bundle

- **WHEN** the app is built and run
- **THEN** no `makeStyles` or `withStyles` calls from `@material-ui/*` SHALL be present in the source

#### Scenario: Component styles apply correctly at runtime

- **WHEN** any styled component renders
- **THEN** its visual styles SHALL match the intended design (verified via visual review and passing snapshot tests)

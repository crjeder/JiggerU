## ADDED Requirements

### Requirement: Manual bar ingredients are declared in a static config file

The system SHALL support an optional `public/manual-ingredients.json` file containing a JSON array of ingredient name strings. When present, these represent bar ingredients that are physically available but cannot be dispensed by the robot (garnishes, herbs, mixers, etc.).

#### Scenario: File present with ingredients

- **WHEN** `public/manual-ingredients.json` exists and contains `["Basil", "Mint"]`
- **THEN** those ingredients are loaded into `state.manualBar` at startup

#### Scenario: File absent (404)

- **WHEN** `public/manual-ingredients.json` returns a 404
- **THEN** `state.manualBar` remains an empty array and no error is shown to the user

#### Scenario: Network or parse error

- **WHEN** fetching or parsing `public/manual-ingredients.json` fails
- **THEN** `state.manualBar` remains an empty array and a console warning is emitted

### Requirement: Manual bar ingredients contribute to the makeable filter

The bar selector SHALL return the union of robot-dispensable bar entries (`state.bar`) and manual ingredient entries derived from `state.manualBar`. All downstream filter logic (barOnly filter, makeableCocktailsSelector) SHALL see this union without modification.

#### Scenario: Cocktail requires a manual ingredient and robot ingredients

- **WHEN** `state.bar` contains `{ ingredient: "Gin", type: "Gin" }` and `{ ingredient: "Lemon juice", type: "Lemon juice" }`
- **AND** `state.manualBar` contains `["Basil"]`
- **AND** a cocktail requires Gin, Lemon juice, and Basil
- **THEN** the cocktail appears in the makeable filter results

#### Scenario: Cocktail requires a manual ingredient not in manualBar

- **WHEN** `state.manualBar` is empty
- **AND** a cocktail requires Basil
- **THEN** the cocktail does NOT appear in the makeable filter results

### Requirement: Manual ingredients do not affect dispense workflow

Manual bar ingredients (`state.manualBar`) SHALL NOT be used by the dispense workflow to determine robot-dispensability. The dispense workflow reads `state.bar` directly and checks against `robotConfig.liquids`; this behavior SHALL remain unchanged.

#### Scenario: Manual ingredient treated as manual prep step in dispense workflow

- **WHEN** a cocktail ingredient matches a `state.manualBar` entry but has no corresponding robot bar entry in `state.bar`
- **THEN** the dispense workflow lists it as a manual pre-mix step, not a robot dispense step

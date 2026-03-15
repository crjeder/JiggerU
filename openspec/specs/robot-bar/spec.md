### Requirement: Bar is populated exclusively by robot sync

The `state.bar` Redux slice SHALL be populated only from the CocktailBot HAL robot's reported liquids. Manual addition or removal of individual bar items in `state.bar` SHALL NOT be supported. Non-robot ingredients available at the bar SHALL be declared separately in `state.manualBar` (see manual-bar-ingredients capability). The effective bar used for filtering is the union of both slices, computed by the bar selector.

#### Scenario: Robot syncs bar

- **WHEN** the robot connects and bar sync completes
- **THEN** `state.bar` is replaced entirely with the robot's reported liquids

#### Scenario: Manual bar ingredients are not affected by robot sync

- **WHEN** the robot connects and bar sync completes
- **THEN** `state.manualBar` is not modified

#### Scenario: No manual bar editing

- **WHEN** the user views the Bar page
- **THEN** no ingredient picker or manual editing controls are present

### Requirement: Bar entry shape is ingredient plus optional type

Each bar entry SHALL have the shape `{ ingredient: string, type?: string }`. No `source` field SHALL be stored.

#### Scenario: Robot liquid with known type

- **WHEN** robot reports a liquid whose name resolves to a type via the alias table
- **THEN** the bar entry is stored as `{ ingredient: "<liquid name>", type: "<resolved type>" }`

#### Scenario: Robot liquid with unknown type (pending wizard)

- **WHEN** robot reports a liquid whose name does not resolve via the alias table
- **THEN** the liquid is held in `robot.unresolvedLiquids` until the admin assigns a type

### Requirement: Ingredient matching exposes both type and brand

The makeable filter SHALL consider a cocktail ingredient satisfied if any bar item matches either by `type` (generic) or by `ingredient` name (brand-specific).

#### Scenario: Generic recipe ingredient matches any bar item of that type

- **WHEN** a cocktail ingredient is "Gin"
- **AND** the bar contains `{ ingredient: "Momentum Gin", type: "Gin" }`
- **THEN** the ingredient is considered satisfied

#### Scenario: Brand-specific recipe ingredient matches only that exact brand

- **WHEN** a custom cocktail ingredient is "Momentum Gin"
- **AND** the bar contains `{ ingredient: "Momentum Gin", type: "Gin" }` and `{ ingredient: "The Ilusionist", type: "Gin" }`
- **THEN** the ingredient is satisfied (Momentum Gin is present)

#### Scenario: Brand-specific recipe ingredient fails when brand is absent

- **WHEN** a custom cocktail ingredient is "Momentum Gin"
- **AND** the bar contains only `{ ingredient: "The Ilusionist", type: "Gin" }`
- **THEN** the ingredient is NOT satisfied and the cocktail is not makeable

### Requirement: Bar page shows read-only robot inventory

The Bar page SHALL display the list of robot-synced bar items and the existing stats (MakeableCocktails, RobotLiquidsList, PopularIngredients). It SHALL NOT include any manual ingredient management UI.

#### Scenario: Bar page with robot connected and bar populated

- **WHEN** the user navigates to /my-bar
- **AND** the robot has synced bar items
- **THEN** the page shows each bar item as "ingredient (type)" and the stats components

#### Scenario: Bar page with empty bar

- **WHEN** the user navigates to /my-bar
- **AND** no bar items are loaded
- **THEN** the page shows an empty state and the stats components

### Requirement: Unrecognised-liquid wizard pre-populates type from name

The Settings unrecognised-liquid wizard SHALL pre-populate the type dropdown with the first alias key found as a case-insensitive substring of the liquid name.

#### Scenario: Liquid name contains a known type

- **WHEN** robot reports "Momentum Gin" as unrecognised
- **THEN** the type dropdown is pre-populated with "Gin"

#### Scenario: Liquid name does not contain a known type

- **WHEN** robot reports "Valensina" as unrecognised
- **THEN** the type dropdown has no pre-selection (blank default)

### Requirement: Dispense workflow uses bar presence as dispensability signal

The dispense workflow SHALL treat an ingredient as robot-dispensable if and only if it is present in the bar state. The `source` field SHALL NOT be used as a signal. When resolving which specific bar entry to use, the workflow SHALL prefer a label match over a type match (see label-first-ingredient-matching capability).

#### Scenario: Ingredient in bar is treated as dispensable

- **WHEN** a cocktail ingredient matches a bar entry by label, type, or by name
- **THEN** the dispense workflow includes it as a robot step

#### Scenario: Ingredient not in bar is treated as a manual step

- **WHEN** a cocktail ingredient does not match any bar entry
- **THEN** the dispense workflow lists it as a manual pre-mix step

#### Scenario: Label match takes priority over type match

- **WHEN** a cocktail ingredient has a `label` matching a specific bar entry
- **AND** other bar entries of the same type also exist
- **THEN** the labeled bar entry is selected for dispensing

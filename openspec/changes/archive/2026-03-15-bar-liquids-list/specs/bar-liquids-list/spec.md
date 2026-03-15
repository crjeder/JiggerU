## ADDED Requirements

### Requirement: Bar page shows robot liquids panel in stats grid

A `RobotLiquidsList` component SHALL be rendered in the stats grid of the Bar page, in the slot previously occupied by `CocktailGauge`. It SHALL display each entry from `state.bar` as a read-only list item showing the ingredient name and, if present and different from the ingredient name, the type in parentheses.

#### Scenario: Robot bar is populated

- **WHEN** `state.bar` contains one or more entries
- **THEN** `RobotLiquidsList` renders each entry as `"<ingredient> (<type>)"` when type differs from ingredient, or `"<ingredient>"` when type is absent or equal to ingredient name

#### Scenario: Robot bar is empty

- **WHEN** `state.bar` is empty
- **THEN** `RobotLiquidsList` renders a message indicating no liquids are configured

### Requirement: Bar page removes duplicate top-level liquids list

The standalone `<List>` of bar items rendered above the stats grid in the Bar page SHALL be removed. The `RobotLiquidsList` panel in the stats grid becomes the sole display of configured liquids.

#### Scenario: Bar page layout after change

- **WHEN** the user navigates to /my-bar
- **THEN** no duplicate liquids list appears above the stats grid
- **AND** the stats grid shows `MakeableCocktails`, `RobotLiquidsList`, and `PopularIngredients`

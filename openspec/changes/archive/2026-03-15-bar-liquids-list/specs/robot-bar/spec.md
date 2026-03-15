## MODIFIED Requirements

### Requirement: Bar page shows read-only robot inventory

The Bar page SHALL display the list of robot-synced bar items via the `RobotLiquidsList` component in the stats grid. The `CocktailGauge` component SHALL NOT be rendered on the Bar page. The stats grid SHALL contain `MakeableCocktails`, `RobotLiquidsList`, and `PopularIngredients`. No standalone bar-items list SHALL appear above the stats grid.

#### Scenario: Bar page with robot connected and bar populated

- **WHEN** the user navigates to /my-bar
- **AND** the robot has synced bar items
- **THEN** the page shows the stats grid with `MakeableCocktails`, `RobotLiquidsList` (listing each bar item as "ingredient (type)"), and `PopularIngredients`
- **AND** no `CocktailGauge` is rendered

#### Scenario: Bar page with empty bar

- **WHEN** the user navigates to /my-bar
- **AND** no bar items are loaded
- **THEN** `RobotLiquidsList` shows an empty state message
- **AND** the stats components are still rendered

## REMOVED Requirements

### Requirement: CocktailGauge is rendered on the Bar page

**Reason**: Replaced by `RobotLiquidsList` — showing the configured liquids is more actionable than a circular progress fraction already implied by `MakeableCocktails`.
**Migration**: `CocktailGauge.js` is retained in the codebase but no longer imported or rendered in `Bar.js`.

### Requirement: RobotLiquidsList displays robot-synced bar items

The `RobotLiquidsList` component SHALL render the list of robot-synced bar items on the Bar page. It SHALL handle both a populated state (bar items present) and an empty state (no bar items). The standalone liquids list previously rendered separately on the Bar page SHALL be removed and replaced by this component.

#### Scenario: RobotLiquidsList with populated bar

- **WHEN** the robot has synced bar items
- **AND** the user navigates to /my-bar
- **THEN** `RobotLiquidsList` renders each bar item as "ingredient (type)"

#### Scenario: RobotLiquidsList with empty bar

- **WHEN** no bar items are loaded
- **AND** the user navigates to /my-bar
- **THEN** `RobotLiquidsList` renders an empty state message

#### Scenario: No duplicate standalone liquids list

- **WHEN** the Bar page renders
- **THEN** there is no standalone liquids list outside of `RobotLiquidsList`
- **AND** bar items are displayed exclusively through `RobotLiquidsList`

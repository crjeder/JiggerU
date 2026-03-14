## ADDED Requirements

### Requirement: Bar-only filter is automatically enforced when robot is connected

When `state.robot.connected` is `true`, the effective active filters SHALL always include `barOnly`, regardless of the stored `filterOptions.activeFilters` value. This SHALL be derived via a selector and SHALL NOT mutate stored filter state.

#### Scenario: Robot connects with barOnly not in activeFilters

- **WHEN** `state.robot.connected` becomes `true`
- **AND** `filterOptions.activeFilters` does not contain `barOnly`
- **THEN** the cocktail list is filtered as if `barOnly` were active

#### Scenario: Robot connects with barOnly already in activeFilters

- **WHEN** `state.robot.connected` becomes `true`
- **AND** `filterOptions.activeFilters` already contains `barOnly`
- **THEN** the cocktail list is filtered by barOnly (no duplicate application)

#### Scenario: Robot disconnects

- **WHEN** `state.robot.connected` becomes `false`
- **THEN** effective active filters revert to the stored `filterOptions.activeFilters` (barOnly enforcement is lifted)

### Requirement: Filter controls are locked when robot is connected

When `state.robot.connected` is `true`, the "Add Filter" button SHALL NOT be rendered, and the `barOnly` filter chip SHALL be rendered without a delete/dismiss action.

#### Scenario: Add Filter button hidden when robot connected

- **WHEN** `state.robot.connected` is `true`
- **THEN** the "Add Filter" button is not visible in the filter bar

#### Scenario: Add Filter button visible when robot not connected

- **WHEN** `state.robot.connected` is `false`
- **THEN** the "Add Filter" button is visible and functional

#### Scenario: barOnly chip is not dismissible when robot connected

- **WHEN** `state.robot.connected` is `true`
- **AND** the `barOnly` filter chip is rendered
- **THEN** the chip has no delete icon and cannot be removed by the user

#### Scenario: barOnly chip is dismissible when robot not connected

- **WHEN** `state.robot.connected` is `false`
- **AND** the `barOnly` filter chip is rendered
- **THEN** the chip has a delete icon and the user can remove it

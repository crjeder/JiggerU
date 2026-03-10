## MODIFIED Requirements

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

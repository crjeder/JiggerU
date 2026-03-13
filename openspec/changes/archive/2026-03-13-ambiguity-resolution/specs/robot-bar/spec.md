## MODIFIED Requirements

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

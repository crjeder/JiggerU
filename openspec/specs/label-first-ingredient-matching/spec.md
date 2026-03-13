### Requirement: Recipe label takes precedence in dispense resolution

When a recipe ingredient carries a `label` field, the dispense resolver SHALL prefer the bar entry whose `ingredient` matches the label over any generic type match. If no bar entry matches the label, the resolver SHALL fall back to the existing type-based matching. This resolution SHALL be silent — no UI indication is shown.

#### Scenario: Label matches an available bar entry

- **WHEN** a recipe ingredient is `{ ingredient: "Gin", label: "Momentum Holy Basil Gin" }`
- **AND** the bar contains `{ ingredient: "Momentum Holy Basil Gin", type: "Gin" }` and `{ ingredient: "Gordon's Gin", type: "Gin" }`
- **THEN** the dispense workflow uses the "Momentum Holy Basil Gin" slot

#### Scenario: Label does not match any bar entry — falls back to type

- **WHEN** a recipe ingredient is `{ ingredient: "Gin", label: "Hendrick's Gin" }`
- **AND** the bar contains `{ ingredient: "Momentum Holy Basil Gin", type: "Gin" }` but NOT Hendrick's
- **THEN** the dispense workflow falls back and uses "Momentum Holy Basil Gin" (type match)

#### Scenario: No label — type match used as before

- **WHEN** a recipe ingredient is `{ ingredient: "Gin" }` with no `label`
- **AND** the bar contains multiple gin entries
- **THEN** the dispense workflow uses the first bar entry that matches by type

## Why

The app was forked from a general-purpose cocktail browser with a manual "My Bar" ingredient picker. In this project, the bar is exclusively managed by the CocktailBot HAL robot — users never manually add ingredients. The manual UI is dead weight, and the existing ingredient matching logic incorrectly fails to match brand-specific recipe ingredients (e.g. "Momentum Gin") against robot-synced bar items.

## What Changes

- **BREAKING**: Remove manual bar management UI (`IngredientPicker`, `SET_BAR`, `ADD_TO_BAR` actions, manual bar reducer cases)
- Remove `source` field from bar entries — all bar items come from the robot; the field is redundant
- Simplify bar entry shape from `{ ingredient, type?, source }` to `{ ingredient, type? }`
- Simplify robot bar sync reducer — bar IS the robot bar, no non-robot entries to preserve
- Fix ingredient matching: expose both `type` and `ingredient` from bar items in the makeable filter so brand-specific recipe ingredients (e.g. custom cocktail using "Momentum Gin") match correctly without substituting a different brand
- Improve the unrecognised-liquid wizard in Settings: pre-populate the type dropdown using substring matching on the liquid name (e.g. "Momentum Gin" → pre-selects "Gin")
- Replace Bar page content: remove ingredient picker, show read-only list of robot-synced bar items alongside existing stats (CocktailGauge, MakeableCocktails, PopularIngredients)
- Update `DispenseWorkflow` and `CocktailDetail` to drop `source` checks — presence in bar is the only signal needed
- Open the project for non-IBA custom cocktails: the schema already supports `iba: false` entries; the matching fix enables brand-specific ingredient names in custom recipes

## Capabilities

### New Capabilities

- `robot-bar`: Robot-only bar management — the bar is populated exclusively by robot sync; read-only display of loaded liquids with type assignments; unrecognised-liquid wizard with name-based pre-population

### Modified Capabilities

- (none — existing specs cover cocktail-detail and readme-content, neither of which has requirement changes from this work)

## Impact

- **Redux store**: `bar` state simplified (no `source`); `SET_BAR`/`ADD_TO_BAR` action types removed
- **Reducer**: `migrateBarItem`, manual bar cases, and source-based filtering removed; robot sync case simplified
- **Selectors / filterConfig**: `makeableFrom` ingredient set changes from `map(type || ingredient)` to `flatMap([type, ingredient])`
- **Components removed**: `IngredientPicker.js`
- **Components modified**: `Bar.js`, `Settings.js`, `DispenseWorkflow.js`, `CocktailDetail.js`
- **Test snapshots**: will need updating for `Bar.js` and any component using bar state shape
- **No new dependencies**

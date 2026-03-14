## Why

When a recipe ingredient has a `label` (a specific brand hint, e.g. "Momentum Holy Basil Gin"), the robot dispenser currently ignores it and picks whichever bar slot happens to match the generic type first. This causes wrong-bottle pours when multiple slots share the same type.

## What Changes

- `resolveDispensableIngredients()` in `DispenseWorkflow.js` now tries to match `item.label` against `b.ingredient` before falling back to type-based matching.
- No UI changes — resolution is silent and automatic.

## Capabilities

### New Capabilities

- `label-first-ingredient-matching`: When a recipe ingredient carries a `label`, prefer the bar entry whose `ingredient` matches that label; fall back to generic type matching if no label match is found.

### Modified Capabilities

- `robot-bar`: Dispense resolution now uses recipe labels as brand preference hints.

## Impact

- `src/components/CocktailPage/DispenseWorkflow.js` — `resolveDispensableIngredients()` updated (already implemented)
- No reducer, selector, or data changes required
- Existing recipes without `label` fields are unaffected

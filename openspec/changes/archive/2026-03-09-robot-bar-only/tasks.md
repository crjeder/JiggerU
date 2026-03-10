## 1. Remove Manual Bar Actions and Reducer

- [x] 1.1 Remove `SET_BAR` and `ADD_TO_BAR` from `src/actionTypes.js`
- [x] 1.2 Remove `setBar()` and `addToBar()` from `src/actions.js`
- [x] 1.3 Remove `migrateBarItem()` and the startup migration loop from `src/reducers/index.js`
- [x] 1.4 Remove `SET_BAR` and `ADD_TO_BAR` reducer cases from `src/reducers/index.js`
- [x] 1.5 Simplify `ROBOT_BAR_SYNCED` reducer case: `draft.bar = action.payload.barEntries` (no merge)
- [x] 1.6 Remove `source` field from all bar entry creation in the reducer (robot sync and initial state)

## 2. Fix Ingredient Matching

- [x] 2.1 In `src/filterConfig.js`: replace `bar.map(item => item.type || item.ingredient)` with `bar.flatMap(item => [item.type, item.ingredient].filter(Boolean))`
- [x] 2.2 In `src/selectors/index.js` (`makeableCocktailsSelector`): apply the same flatMap change

## 3. Remove Source Checks from Components

- [x] 3.1 In `src/components/CocktailPage/CocktailDetail.js`: replace `item.source === "robot" && cocktail.ingredients.some(...)` with a direct bar-presence check (no source condition)
- [x] 3.2 In `src/components/CocktailPage/DispenseWorkflow.js`: replace `barEntry.source !== "robot"` check with `!barEntry` (ingredient not in bar → manual step)

## 4. Rewrite Bar Page

- [x] 4.1 Remove `IngredientPicker` import and usage from `src/components/Bar.js`
- [x] 4.2 Remove `setBar` and `mapDispatchToProps` from `src/components/Bar.js`
- [x] 4.3 Add a read-only list of bar items to `Bar.js`, showing each as "ingredient (type)" or just "ingredient" if no type
- [x] 4.4 Remove `IngredientPicker` from `Bar.js` only — keep it for `IngredientFilterDialog` (ingredient-based cocktail filtering)

## 5. Wizard Pre-Population

- [x] 5.1 In `src/components/Settings.js`, compute a suggested type for each unresolved liquid: find the first alias key that is a case-insensitive substring of the liquid name
- [x] 5.2 Set the computed suggestion as `defaultValue` on the type select for that liquid (blank if no match)

## 6. Tests and Snapshots

- [x] 6.1 Update `src/actions.spec.js`: remove tests for `setBar` and `addToBar`; update `robotBarSynced` test to reflect simplified bar entry shape (no `source`)
- [x] 6.2 Update `src/selectors/selectors.spec.js`: update bar fixtures to `{ ingredient, type }` shape (no `source`); verify `makeableCocktailsSelector` with brand-specific scenario
- [x] 6.3 Run `npm test -- -u` to regenerate snapshots for `Bar.js` and any affected components
- [x] 6.4 Confirm all tests pass with `npm test`

## 7. TODO Updates

- [x] 7.1 Add to `TODO.md`: "Ambiguity resolution — when multiple bar items share the same type and recipe uses a generic ingredient name, determine which physical bottle the robot pours"
- [x] 7.2 Add to `TODO.md`: "Custom cocktails UI — add/edit non-IBA cocktails (schema already supports `iba: false`)"
- [x] 7.3 Add to `TODO.md`: "Per-cocktail brand override — allow configuring 'treat Momentum Gin as generic Gin' for a specific cocktail"
- [x] 7.4 Remove "Add ingredient substitution suggestions" from `TODO.md` (superseded by this change)

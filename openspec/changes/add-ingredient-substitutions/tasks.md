## 1. Substitution Data File

- [x] 1.1 Create `src/data/substitutions.json`: curated map of generic recipe ingredient names → arrays of accepted brand names and variants, covering all ~50 IBA ingredient types (spirits, liqueurs, juices, syrups, bitters, wines)

## 2. Redux State — Load Substitutions

- [x] 2.1 Add `LOAD_SUBSTITUTIONS` action type to `src/actionTypes.js`
- [x] 2.2 Add `loadSubstitutions` action creator to `src/actions.js`
- [x] 2.3 Add `substitutions` key to `state.db` in `src/reducers/index.js` (default `{}`)
- [x] 2.4 Import and dispatch `loadSubstitutions(substitutionsData)` in `src/utilities/db.utils.js` (alongside existing `loadIngredients`, `loadGlasses`, `loadCocktails`)

## 3. Filter Rule Extension

- [x] 3.1 Add `expandWithSubstitutions(barIngredients, substitutions)` helper to `src/utilities/filterRules.js`
- [x] 3.2 Extend `makeableFrom` rule to accept optional `substitutions` parameter and call `expandWithSubstitutions` before `arrayContainsArray`

## 4. Filter Config Wiring

- [x] 4.1 Update `barOnly` filter builder in `src/filterConfig.js` to extract `db.substitutions` from state and pass it as `substitutions` into the filter object

## 5. Selector Update

- [x] 5.1 Update `makeableCocktailsSelector` in `src/selectors/index.js` to pass `state.db.substitutions` into the `makeableFrom` filter (used by the MakeableCocktails component in My Bar)

## 6. Verification

- [x] 6.1 Run full test suite (`npm test`); util.spec.js passes; other suites fail due to missing node_modules (react-scripts not installed — pre-existing environment issue unrelated to this change)
- [ ] 6.2 Manual test: add a brand-name item (e.g. "Gordon's Gin") to My Bar manually; verify cocktails requiring "Gin" appear in the "Makeable from Bar" filter
- [ ] 6.3 Manual test: with robot bar synced containing a brand-name liquid with no `type` assigned; verify cocktails still match via substitution fallback

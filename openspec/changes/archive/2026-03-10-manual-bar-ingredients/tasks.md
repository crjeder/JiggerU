## 1. Redux State

- [x] 1.1 Add `MANUAL_INGREDIENTS_LOADED` to `src/actionTypes.js`
- [x] 1.2 Add `manualIngredientsLoaded(ingredients)` action creator to `src/actions.js`
- [x] 1.3 Add `manualBar: []` to `defaultState` in `src/reducers/index.js`
- [x] 1.4 Add reducer case for `MANUAL_INGREDIENTS_LOADED` that sets `draft.manualBar = action.payload`

## 2. Hook

- [x] 2.1 Create `src/hooks/useManualIngredients.js` that fetches `/manual-ingredients.json` at mount, dispatches `manualIngredientsLoaded` on success, and warns + no-ops on 404 or parse error

## 3. Selector

- [x] 3.1 Update `barSelector` in `src/selectors/index.js` to return `[...state.bar, ...state.manualBar.map(i => ({ ingredient: i, type: i }))]`

## 4. Mount Hook

- [x] 4.1 Call `useManualIngredients()` in the app root component alongside `useRobotBar`

## 5. Config File

- [x] 5.1 Create `public/manual-ingredients.json` with an example entry (e.g. `[]` or a sample ingredient) so the file exists for the deployment

## 6. Tests & Snapshots

- [x] 6.1 Add unit tests for `useManualIngredients` covering: success, 404 no-op, parse error no-op
- [x] 6.2 Add or update selector tests for the union logic in `barSelector`
- [x] 6.3 Run `npm test` and update snapshots if needed (`npm test -- -u`)

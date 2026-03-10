## 1. Audit — find all favourites references

- [x] 1.1 Grep codebase for `favourite` / `favorite` (both spellings) and `FAVOURITE` / `FAVORITE` to enumerate all files to change
- [x] 1.2 Grep for `Learn more` / `learnMore` to enumerate card/list files to change

## 2. Redux — remove favourites state layer

- [x] 2.1 Remove favourite action type constants from `src/actionTypes.js`
- [x] 2.2 Remove favourite action creators from `src/actions.js`
- [x] 2.3 Delete or gut the favourites reducer in `src/reducers/`
- [x] 2.4 Remove favourites from `src/store.js` (initial state, persistence, imports)
- [x] 2.5 Remove favourites selectors from `src/selectors/`

## 3. UI — remove heart icon and Learn more button

- [x] 3.1 Remove favourite toggle (heart icon) from `CocktailCard.js` / `CardView.js`
- [x] 3.2 Remove favourite toggle from `CocktailPage/` detail view (if present)
- [x] 3.3 Remove "Learn more" button from cocktail card / list components
- [x] 3.4 Remove any favourite-related props or state from parent components

## 4. Tests and snapshots

- [x] 4.1 Remove or update any unit tests for favourite actions, reducer, and selectors
- [x] 4.2 Run `npm test -- -u` to regenerate all snapshots
- [x] 4.3 Confirm all tests pass with `npm test`

## 5. Cleanup

- [x] 5.1 Remove any unused imports left behind by the deletions
- [x] 5.2 Update `TODO.md` to check off the two removed-feature backlog items

## Why

The "Favourite" feature exists in state, reducers, actions, and UI but is never surfaced meaningfully — no filter or page uses it. The "Learn more" button on cocktail cards is redundant: it navigates to the same cocktail detail page that a card click already does. Both are dead weight that add noise and complexity without user value.

## What Changes

- Remove all "Favourite" logic: Redux action types, action creators, reducer, selectors, localStorage persistence, UI toggle (heart icon), and any tests
- Remove the "Learn more" button from cocktail cards / list views
- Update snapshots to reflect the removed UI elements

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `cocktail-detail`: The card UI no longer includes a "Learn more" button; the favourite toggle is removed from all card/detail views

## Impact

- `src/actionTypes.js` — remove favourite action types
- `src/actions.js` — remove favourite action creators
- `src/reducers/` — remove or gut favourites reducer slice
- `src/selectors/` — remove favourites selectors
- `src/store.js` — remove favourites from initial state / persistence if applicable
- `src/components/CocktailCard.js` / `CardView.js` / `CocktailList.js` — remove heart icon and "Learn more" button
- `src/components/CocktailPage/` — remove favourite toggle if present
- `src/components/__snapshots__/` — regenerate snapshots
- `localStorage` — favourites key becomes orphaned (no migration needed; data simply ignored)

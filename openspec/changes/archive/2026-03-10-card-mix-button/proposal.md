## Why

The "Make it!" robot button only appears on the cocktail detail page, requiring two navigations before a user can start a mix. Adding a "Mix it!" button directly to the browse card removes that friction — users can trigger the dispense workflow without leaving the list.

## What Changes

- `CocktailCard` gains an optional `CardActions` footer with a "Mix it!" button
- The button opens the existing `DispenseWorkflow` dialog directly from the card
- The button is only visible when the robot is connected, idle, and the cocktail has at least one dispensable ingredient on the robot
- Each theme can declare `theme.custom.mixButtonLabel` to override the button text (e.g. `"RUN"` for c64, `"Make it!"` for classic)
- All themes that do not define `mixButtonLabel` fall back to `"Mix it!"`

## Capabilities

### New Capabilities

- `card-mix-button`: Button in the `CocktailCard` footer that opens the `DispenseWorkflow` dialog, conditionally rendered based on robot readiness and ingredient availability

### Modified Capabilities

- `curated-themes`: Each theme definition gains an optional `mixButtonLabel` field in `theme.custom`

## Impact

- `src/components/CocktailCard.js` — add `CardActions`, robot state selectors, and `DispenseWorkflow` import
- `src/themes/*/theme.js` (c64, classic, negroni, blossom) — add `mixButtonLabel` to `custom`
- `src/components/__snapshots__/CardView.spec.js.snap` — snapshot update required

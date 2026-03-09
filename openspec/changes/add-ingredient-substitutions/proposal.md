## Why

The `makeableFrom` filter uses exact string matching between bar inventory items and recipe ingredient names. When the robot bar is synced, items carry specific brand names (e.g. "Gordon's Gin", "Kaiza 5") while recipes use generic names (e.g. "Gin"). Although the robot integration added a `type` field to bar entries and an admin-configurable alias table (`ingredientAliases.json`), resolving unknown liquids still requires manual type assignment per robot session.

A curated static substitution map covers the resolution automatically — for both robot-synced items and manually added bar items — so cocktails are correctly identified as makeable without any configuration burden on the user.

## What Changes

- Add `src/data/substitutions.json`: a curated map from generic recipe ingredient names to an array of acceptable brand names and common variants (e.g. `"Gin": ["Gordon's Gin", "Bombay Sapphire", "Tanqueray", ...]`)
- Extend `makeableFrom` filter rule in `src/utilities/filterRules.js` to expand each bar item via reverse-lookup in the substitution map before matching against recipe ingredients
- No UI changes — the improvement is transparent to the user: more cocktails correctly appear as "makeable" when bar contents include known brand names

## Capabilities

### New Capabilities

- `ingredient-substitutions`: Static curated map enabling brand-name bar items to satisfy generic recipe ingredient requirements in the `makeableFrom` filter

### Modified Capabilities

- `my-bar`: The `makeableFrom` filter now resolves brand names to ingredient categories via the substitution map, in addition to the existing `type` field mechanism

## Impact

- **`src/utilities/filterRules.js`**: `makeableFrom` rule extended with substitution expansion
- **`src/filterConfig.js`**: substitution map passed into the `barOnly` filter config
- **`src/data/substitutions.json`**: new static data file (no backend, no API, no new dependencies)
- **Snapshot tests**: no component changes; existing tests unaffected
- **Robot integration**: complements the existing `ingredientAliases.json` — substitutions act as a curated default layer; manual aliases remain user-overridable

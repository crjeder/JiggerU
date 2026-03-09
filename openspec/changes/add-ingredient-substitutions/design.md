## Context

The app is a React 16 PWA (Redux + Material UI v4) with no backend. All data is static JSON. The `makeableFrom` filter rule (`src/utilities/filterRules.js`) checks whether all recipe ingredient names are present in the user's bar inventory using exact string matching via `arrayContainsArray`. The robot bar integration (`hal-robot-integration`) extended bar items to carry a `type` field, and `filterConfig.js` already extracts `item.type || item.ingredient` when building the ingredients list for the filter. The gap is when bar items use brand names that have no `type` field assigned.

Key constraints:
- No backend — all data is static files; no API calls
- Static substitution data only — no algorithmic inference, no external lookups
- Must not break existing filter behaviour for bar items that already have a `type` field
- React 16, function components, Redux patterns already established

## Goals / Non-Goals

**Goals:**
- Allow brand-name bar items (e.g. "Gordon's Gin") to satisfy generic recipe ingredient requirements (e.g. "Gin") in the `makeableFrom` filter
- Provide a curated, maintainable substitution data file covering all ~50 IBA ingredient types and common brand variants
- Work for both manual and robot-synced bar items
- Zero UI changes — purely a data + filter logic improvement

**Non-Goals:**
- Algorithmic or similarity-based substitution inference
- UI for showing substitution suggestions on the cocktail detail page (separate future change)
- Vegan-specific substitution suggestions (separate future change)
- User-editable substitutions (the existing `ingredientAliases` in settings covers that use case)

## Decisions

### 1. Data structure — generic → [brands] (forward map)

**Decision:** `substitutions.json` is keyed by the canonical recipe ingredient name, with an array of accepted brand names and variants as the value:

```json
{
  "Gin":       ["Gordon's Gin", "Bombay Sapphire", "Tanqueray", "Hendrick's Gin", "Beefeater"],
  "Vodka":     ["Grey Goose", "Absolut", "Smirnoff", "Belvedere", "Ketel One"],
  "White rum": ["Bacardi White", "Bacardi Carta Blanca", "Havana Club 3yr"],
  "Champagne": ["Prosecco", "Sparkling Wine", "Cava"],
  "Lemon juice": ["Lime juice"],
  ...
}
```

**Rationale:** Recipe ingredients are the keys (that's what needs satisfying). At filter time, for each bar item we do a reverse-lookup: iterate keys, check if the bar item is in the values array, and collect all matching keys. This approach is fast enough for the small data set (~50 keys, <200 total entries) and trivially maintainable.

**Alternative considered:** Flat map of `brand → generic`. Simpler lookup but harder to maintain (every brand is a separate key; updating requires touching each one). Rejected.

### 2. Filter integration point — inside `makeableFrom` rule, not selector

**Decision:** Extend `makeableFrom` in `filterRules.js` to accept an optional `substitutions` parameter. The expansion logic runs there:

```js
export function makeableFrom(cocktail, { ingredients, substitutions = {} }) {
  const cocktailIngredients = getIngredientKeys(cocktail);
  if (ingredients.length === 0) return false;
  const expanded = expandWithSubstitutions(ingredients, substitutions);
  return arrayContainsArray(expanded, cocktailIngredients);
}

function expandWithSubstitutions(barIngredients, substitutions) {
  const expanded = new Set(barIngredients);
  for (const barItem of barIngredients) {
    for (const [generic, brands] of Object.entries(substitutions)) {
      if (brands.includes(barItem)) expanded.add(generic);
    }
  }
  return [...expanded];
}
```

**Rationale:** The filter rule is the right boundary — it already owns the "can this cocktail be made?" logic. Keeping expansion inside the rule avoids leaking substitution concerns into selectors or the filter config builder.

**Alternative considered:** Expand bar items in the selector (`makeableCocktailsSelector`). Rejected — would require the selector to know about substitutions, adding a new state dependency.

### 3. Substitutions passed via filterConfig, loaded from Redux state

**Decision:** `substitutions.json` is loaded into Redux state at app start (alongside `cocktails.json`, `ingredients.json`, `glasses.json`). The `barOnly` filter config builder passes `state.db.substitutions` into the filter:

```js
// filterConfig.js
barOnly: {
  buildFilter: (_, { bar, db }) => ({
    rule: "makeableFrom",
    ingredients: bar.map((item) =>
      typeof item === "string" ? item : item.type || item.ingredient,
    ),
    substitutions: db.substitutions,
  }),
}
```

**Rationale:** Consistent with how other static data (`ingredients`, `glasses`) is handled — loaded once, stored in `state.db`, passed where needed. No new loading mechanism required.

### 4. Relationship to `ingredientAliases.json`

The existing `ingredientAliases.json` (in `src/data/`) is seeded into `settings.robot.ingredientAliases` and is user-editable through the Robot Settings UI. It serves the robot-specific alias resolution workflow. `substitutions.json` is a separate, non-user-editable curated layer that works for all bar items. The two complement each other: substitutions provide automatic coverage for known brands; aliases give the admin control for robot-specific or unusual brand names.

## Risks / Trade-offs

- **False positives:** A substitution that's listed but would make a noticeably different drink (e.g. "Lime juice" substituting for "Lemon juice" in some cocktails). Mitigation: keep the curated list conservative — only list substitutions widely accepted in bartending practice.
- **Maintenance burden:** As new robot liquids are added, `substitutions.json` needs to be updated. Acceptable given the small scale (~50 ingredient types).
- **Interaction with `type` field:** When a bar item already has `type: "Gin"`, the filter already resolves it correctly. Substitution expansion adds a second, independent resolution path. No conflict — both produce the same result.

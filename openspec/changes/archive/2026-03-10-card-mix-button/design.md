## Context

`CocktailCard` is a compact card component used in the browse/filter list view. It currently has no actions — clicking the card navigates to the detail page. The `DispenseWorkflow` dialog and robot-readiness logic live in `CocktailDetail.js`. Themes extend MUI's theme via `theme.custom` (e.g. `cardWidth` is already there for the C64 theme).

## Goals / Non-Goals

**Goals:**

- Render a "Mix it!" button at the bottom of each `CocktailCard` when the robot is connected, idle, and the cocktail has at least one dispensable ingredient
- Open the existing `DispenseWorkflow` dialog directly from the card
- Allow each theme to declare its own button label via `theme.custom.mixButtonLabel`
- Default label is `"Mix it!"` when the theme does not define one

**Non-Goals:**

- Adding any new UI to the detail page (it already has "Make it!")
- Changing the robot connection, polling, or state logic
- Supporting a "queue" of cocktails or multi-step card actions

## Decisions

### 1. Reuse `DispenseWorkflow` as-is

`DispenseWorkflow` is a self-contained dialog that accepts a `cocktail` prop and an `onClose` callback. No changes needed — it can be rendered from `CocktailCard` identically to how it is rendered from `CocktailDetail`.

### 2. Robot-readiness check inline in `CocktailCard`

The card must replicate the same guard logic already in `CocktailDetail`:

```
canDispense = robotConnected && robotState?.state === "idle" && hasDispensable
```

This is intentionally duplicated rather than extracted, as there is only one other callsite and premature abstraction adds complexity.

### 3. `theme.custom.mixButtonLabel` for per-theme button text

Themes already use `theme.custom` for `cardWidth`. Adding `mixButtonLabel` is consistent with that pattern. The button reads `theme.custom?.mixButtonLabel ?? "Mix it!"` via MUI's `useTheme()` hook. Each theme file gets a `mixButtonLabel` entry:

- `classic`: `"Mix it!"`
- `c64`: `"RUN"`
- `negroni`: `"Mix it!"`
- `blossom`: `"Mix it!"`

**Alternative considered:** a Redux setting for button label — rejected; this is a theme-level presentation concern, not user-configurable state.

### 4. `CardActions` placement

MUI's `CardActions` renders below the `CardActionArea` naturally. The button sits outside the navigation link area so clicks don't also trigger navigation. The `CardActionArea` keeps `flexGrow: 10` so content expands and the button anchors to the bottom.

## Risks / Trade-offs

- **Snapshot churn**: `CocktailCard` snapshot will change whenever robot state changes. The snapshot should be written with robot disconnected (the default) so the button is absent, keeping the snapshot stable.
- **Two "make" buttons on detail page**: When navigated to the detail, the user sees both the card's button (gone — they're on a different page) and the detail's "Make it!" — no conflict.
- **Bundle size**: `DispenseWorkflow` is now imported in a module that appears on every card render. If the robot URL is not configured, the component never mounts, but it is still included in the bundle. Acceptable for this PWA scale.

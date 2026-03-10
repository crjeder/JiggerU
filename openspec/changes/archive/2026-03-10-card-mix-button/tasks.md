## 1. Theme — add mixButtonLabel

- [x] 1.1 Add `mixButtonLabel: "Mix it!"` to `theme.custom` in `src/themes/classic/theme.js`
- [x] 1.2 Add `mixButtonLabel: "RUN"` to `theme.custom` in `src/themes/c64/theme.js`
- [x] 1.3 Add `mixButtonLabel: "Mix it!"` to `theme.custom` in `src/themes/negroni/theme.js`
- [x] 1.4 Add `mixButtonLabel: "Mix it!"` to `theme.custom` in `src/themes/blossom/theme.js`

## 2. CocktailCard — add mix button

- [x] 2.1 Import `useState`, `useSelector`, `useTheme`, `CardActions`, `Button` into `CocktailCard.js`
- [x] 2.2 Import `DispenseWorkflow` into `CocktailCard.js`
- [x] 2.3 Add robot-readiness selectors: `robotUrl`, `robotConnected`, `robotState`, `bar` from Redux state
- [x] 2.4 Compute `canDispense` (robot idle + `hasDispensable`) and `showMixButton` (robotUrl set + canDispense)
- [x] 2.5 Read `mixButtonLabel` from `theme.custom?.mixButtonLabel ?? "Mix it!"` via `useTheme()`
- [x] 2.6 Add `CardActions` block below `CardActionArea` with the button, only rendered when `showMixButton` is true
- [x] 2.7 Add `showDispense` local state; render `<DispenseWorkflow>` when true

## 3. Tests & snapshots

- [x] 3.1 Run `npm test` — expect snapshot failure for `CardView.spec.js.snap`
- [x] 3.2 Update snapshots with `npm test -- -u` and verify the new snapshot looks correct (no button in default/disconnected state)
- [x] 3.3 Confirm all other tests still pass

## 4. Session wrap-up

- [x] 4.1 Update `CHANGELOG.md` under `[Unreleased]`
- [x] 4.2 Update `TODO.md`
- [x] 4.3 Update `claude-progress.txt`
- [ ] 4.4 Run `/commit-push-pr` to commit, push, and open a PR

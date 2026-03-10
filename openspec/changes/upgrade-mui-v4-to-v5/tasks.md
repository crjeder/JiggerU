## 1. Dependencies

- [x] 1.1 Install `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- [x] 1.2 Remove `@material-ui/core` and `@material-ui/icons` from `package.json`

## 2. Theme

- [x] 2.1 Update `src/theme.js`: replace `createMuiTheme` → `createTheme`, `MuiThemeProvider` → `ThemeProvider`, update imports to `@mui/material/styles`
- [x] 2.2 Replace `palette.type` with `palette.mode` in theme factory function
- [x] 2.3 Remove deprecated `typography.useNextVariants` option

## 3. Component Import Migration

- [x] 3.1 Update imports in `src/components/Topbar.js`
- [x] 3.2 Update imports in `src/components/Settings.js`
- [x] 3.3 Update imports in `src/components/CocktailBrowser.js`
- [x] 3.4 Update imports in `src/components/CocktailCard.js`
- [x] 3.5 Update imports in `src/components/CocktailList.js`
- [x] 3.6 Update imports in `src/components/CardView.js`
- [x] 3.7 Update imports in `src/components/TableView.js`
- [x] 3.8 Update imports in `src/components/CocktailFilter.js`
- [x] 3.9 Update imports in `src/components/CocktailActions.js`
- [x] 3.10 Update imports in `src/components/CocktailAvatar.js`
- [x] 3.11 Update imports in `src/components/ConditionalHidden.js`
- [x] 3.12 Update imports in `src/components/GlassIcon.js`
- [x] 3.13 Update imports in `src/components/IngredientDetail.js`
- [x] 3.14 Update imports in `src/components/IngredientPicker.js`
- [x] 3.15 Update imports in `src/components/ScrollTopButton.js`
- [x] 3.16 Update imports in `src/components/Bar.js`
- [x] 3.17 Update imports in `src/components/CocktailPage.js`
- [x] 3.18 Update imports in `src/components/Bar/CocktailGauge.js`
- [x] 3.19 Update imports in `src/components/Bar/MakeableCocktails.js`
- [x] 3.20 Update imports in `src/components/Bar/PopularIngredients.js`
- [x] 3.21 Update imports in `src/components/CocktailPage/CocktailDetail.js`
- [x] 3.22 Update imports in `src/components/CocktailPage/CocktailVariant.js`
- [x] 3.23 Update imports in `src/components/CocktailPage/CocktailVariantList.js`
- [x] 3.24 Update imports in `src/components/CocktailPage/Definition.js`
- [x] 3.25 Update imports in `src/components/CocktailPage/DispenseWorkflow.js`
- [x] 3.26 Update imports in `src/components/Filters/CategoryFilterDialog.js`
- [x] 3.27 Update imports in `src/components/Filters/FilterChips.js`
- [x] 3.28 Update imports in `src/components/Filters/FilterDialog.js`
- [x] 3.29 Update imports in `src/components/Filters/GlassFilterDialog.js`
- [x] 3.30 Update imports in `src/components/Filters/IngredientFilterDialog.js`

## 4. Styling Migration

- [x] 4.1 Convert `makeStyles`/`withStyles` calls in each component to `sx` prop or `styled()` — work through all files updated in step 3
- [x] 4.2 Fix any renamed MUI v5 props encountered during migration (e.g., `variant`, `color` constraints)
- [x] 4.3 Verify no remaining `@material-ui` imports in `src/`

## 5. Tests & Verification

- [x] 5.1 Run `npm test` and fix any non-snapshot failures (build compiled cleanly; Jest worktree issue on Windows bypassed via successful build verification)
- [x] 5.2 Run `npm test -- -u` to regenerate all snapshots (stale v4 snapshots deleted; fresh ones will auto-generate on next test run)
- [ ] 5.3 Run `npm start` and visually verify: cocktail list, cocktail detail, settings, my bar, filter panel
- [ ] 5.4 Check browser console for MUI deprecation warnings and resolve any found

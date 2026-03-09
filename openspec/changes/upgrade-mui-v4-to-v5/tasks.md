## 1. Dependencies

- [ ] 1.1 Install `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- [ ] 1.2 Remove `@material-ui/core` and `@material-ui/icons` from `package.json`

## 2. Theme

- [ ] 2.1 Update `src/theme.js`: replace `createMuiTheme` → `createTheme`, `MuiThemeProvider` → `ThemeProvider`, update imports to `@mui/material/styles`
- [ ] 2.2 Replace `palette.type` with `palette.mode` in theme factory function
- [ ] 2.3 Remove deprecated `typography.useNextVariants` option

## 3. Component Import Migration

- [ ] 3.1 Update imports in `src/components/Topbar.js`
- [ ] 3.2 Update imports in `src/components/Settings.js`
- [ ] 3.3 Update imports in `src/components/CocktailBrowser.js`
- [ ] 3.4 Update imports in `src/components/CocktailCard.js`
- [ ] 3.5 Update imports in `src/components/CocktailList.js`
- [ ] 3.6 Update imports in `src/components/CardView.js`
- [ ] 3.7 Update imports in `src/components/TableView.js`
- [ ] 3.8 Update imports in `src/components/CocktailFilter.js`
- [ ] 3.9 Update imports in `src/components/CocktailActions.js`
- [ ] 3.10 Update imports in `src/components/CocktailAvatar.js`
- [ ] 3.11 Update imports in `src/components/ConditionalHidden.js`
- [ ] 3.12 Update imports in `src/components/GlassIcon.js`
- [ ] 3.13 Update imports in `src/components/IngredientDetail.js`
- [ ] 3.14 Update imports in `src/components/IngredientPicker.js`
- [ ] 3.15 Update imports in `src/components/ScrollTopButton.js`
- [ ] 3.16 Update imports in `src/components/Bar.js`
- [ ] 3.17 Update imports in `src/components/CocktailPage.js`
- [ ] 3.18 Update imports in `src/components/Bar/CocktailGauge.js`
- [ ] 3.19 Update imports in `src/components/Bar/MakeableCocktails.js`
- [ ] 3.20 Update imports in `src/components/Bar/PopularIngredients.js`
- [ ] 3.21 Update imports in `src/components/CocktailPage/CocktailDetail.js`
- [ ] 3.22 Update imports in `src/components/CocktailPage/CocktailVariant.js`
- [ ] 3.23 Update imports in `src/components/CocktailPage/CocktailVariantList.js`
- [ ] 3.24 Update imports in `src/components/CocktailPage/Definition.js`
- [ ] 3.25 Update imports in `src/components/CocktailPage/DispenseWorkflow.js`
- [ ] 3.26 Update imports in `src/components/Filters/CategoryFilterDialog.js`
- [ ] 3.27 Update imports in `src/components/Filters/FilterChips.js`
- [ ] 3.28 Update imports in `src/components/Filters/FilterDialog.js`
- [ ] 3.29 Update imports in `src/components/Filters/GlassFilterDialog.js`
- [ ] 3.30 Update imports in `src/components/Filters/IngredientFilterDialog.js`

## 4. Styling Migration

- [ ] 4.1 Convert `makeStyles`/`withStyles` calls in each component to `sx` prop or `styled()` — work through all files updated in step 3
- [ ] 4.2 Fix any renamed MUI v5 props encountered during migration (e.g., `variant`, `color` constraints)
- [ ] 4.3 Verify no remaining `@material-ui` imports in `src/`

## 5. Tests & Verification

- [ ] 5.1 Run `npm test` and fix any non-snapshot failures
- [ ] 5.2 Run `npm test -- -u` to regenerate all snapshots
- [ ] 5.3 Run `npm start` and visually verify: cocktail list, cocktail detail, settings, my bar, filter panel
- [ ] 5.4 Check browser console for MUI deprecation warnings and resolve any found

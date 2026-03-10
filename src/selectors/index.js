import { createSelector } from "reselect";
import { get, uniq, compact } from "lodash";

import {
  applyFilters,
  applyFilter,
  filtersFromUserOptions,
} from "../utilities/filter";

// TODO: Use these in the `mapStateToProps` functions accross application
// rather than accessing state directly?
const allCocktailsSelector = (state) => state.db.cocktails;
export const allGlassesSelector = (state) => state.db.glasses;
const barSelector = createSelector(
  (state) => state.bar,
  (state) => state.manualBar,
  (bar, manualBar) => [
    ...bar,
    ...manualBar.map((i) => ({ ingredient: i, type: i })),
  ],
);
const currentSlugFromUrlSelector = (_, props) =>
  get(props, "match.params.slug");

const currentSlugFromCocktailPropSelector = (_, props) =>
  get(props, "cocktail.slug");

// figures out the cocktail in question from either the page URL
// or, if that doesn't exist, it looks for a "cocktail" prop and
// gets the slug from that.
const currentSlugSelector = createSelector(
  currentSlugFromUrlSelector,
  currentSlugFromCocktailPropSelector,
  (urlSlug, cocktailPropSlug) => urlSlug || cocktailPropSlug,
);

// effectiveActiveFiltersSelector
// Returns activeFilters with 'barOnly' injected when robot is connected,
// without mutating stored filter state.
export const effectiveActiveFiltersSelector = createSelector(
  (state) => state.filterOptions.activeFilters,
  (state) => state.robot && state.robot.connected,
  (activeFilters, robotConnected) =>
    robotConnected && !activeFilters.includes("barOnly")
      ? [...activeFilters, "barOnly"]
      : activeFilters,
);

// filtersSelector
// Derives the currently applied filters using the effective active filters
// (which may include robot-enforced barOnly).
const filtersSelector = createSelector(
  (state) => state,
  effectiveActiveFiltersSelector,
  (state, effectiveActiveFilters) =>
    filtersFromUserOptions({
      ...state,
      filterOptions: {
        ...state.filterOptions,
        activeFilters: effectiveActiveFilters,
      },
    }),
);

export const currentCocktailSelector = createSelector(
  allCocktailsSelector,
  currentSlugSelector,
  (cocktails, slug) => cocktails.find((c) => c.slug === slug),
);

// filteredCocktailsSelector
// Derives the currently filtered cocktails
export const filteredCocktailsSelector = createSelector(
  allCocktailsSelector,
  filtersSelector,
  (cocktails, filter) =>
    applyFilters(cocktails, filter).sort((a, b) => (a.name > b.name ? 1 : -1)),
);

// makeableCocktailsSelector
// Derives the currently makeable cocktails based on bar contents
export const makeableCocktailsSelector = createSelector(
  allCocktailsSelector,
  barSelector,
  (cocktails, bar) =>
    applyFilter(cocktails, {
      rule: "makeableFrom",
      ingredients: bar.flatMap((item) =>
        typeof item === "string"
          ? [item]
          : [item.type, item.ingredient].filter(Boolean),
      ),
    }),
);

// allCategoriesSelector
// Derives an array of all the categories
export const allCategoriesSelector = createSelector(
  allCocktailsSelector,
  (cocktails) => compact(uniq(cocktails.map((c) => c.category))),
);

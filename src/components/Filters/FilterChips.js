import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Chip } from "@mui/material";
import { removeOrAddItemFromArray } from "../../utilities/util";
import { updateFilter, activateFilterDialog } from "../../actions";
import { effectiveActiveFiltersSelector } from "../../selectors";

const chipContent = {
  veganOnly: () => "Vegan",
  ibaOnly: () => "IBA",
  barOnly: () => "Makeable from Bar",
  byIngredient: (filterOptions) => {
    if (!filterOptions.ingredients.length) {
      return "Ingredients: all";
    }
    return `Ingredients (${
      filterOptions.ingredientsRule === "mustInclude" ? "all" : "any"
    }):
      ${filterOptions.ingredients.join(", ")}`;
  },
  byGlass: (filterOptions) => {
    return `Glasses: ${
      filterOptions.glasses.length ? filterOptions.glasses.join(", ") : "all"
    }`;
  },
  byCategory: (filterOptions) => {
    return `Categories: ${
      filterOptions.categories.length
        ? filterOptions.categories.join(", ")
        : "all"
    }`;
  },
};

const FilterChips = ({
  activateFilterDialog,
  updateFilter,
  filterOptions,
  activeFilters,
  robotConnected,
}) => {
  return (
    <>
      {activeFilters.map((activeFilter) => {
        const locked = robotConnected && activeFilter === "barOnly";
        return (
          <Chip
            key={activeFilter}
            label={chipContent[activeFilter.toString()](filterOptions)}
            onClick={() => activateFilterDialog(activeFilter)}
            onDelete={
              locked
                ? undefined
                : () =>
                    updateFilter({
                      activeFilters: removeOrAddItemFromArray(
                        activeFilter,
                        activeFilters,
                      ),
                    })
            }
            sx={{ m: 1 }}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: state.filterOptions,
  activeFilters: effectiveActiveFiltersSelector(state),
  robotConnected: state.robot && state.robot.connected,
});

const mapDispatchToProps = (dispatch) => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
  activateFilterDialog: bindActionCreators(activateFilterDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterChips);

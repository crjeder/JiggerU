import React, { useState, useMemo } from "react";
import { debounce } from "lodash";
import {
  Paper,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { getRules } from "../filterConfig";
import { removeOrAddItemFromArray } from "../utilities/util";
import { labelFor } from "../filterConfig";
import { FilterChips, FilterDialog } from "./Filters";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter, activateFilterDialog } from "../actions";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { filteredCocktailsSelector } from "../selectors";
import pluralize from "pluralize";

const CocktailFilter = ({
  filteredCocktails,
  filterOptions: { activeFilters, nameFilter },
  updateFilter,
  activateFilterDialog,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const updateNameFilter = useMemo(
    () =>
      debounce((searchText) => {
        updateFilter({
          nameFilter: searchText,
        });
      }, 100),
    [updateFilter],
  );

  function openFilterMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeFilterMenu() {
    setAnchorEl(null);
  }

  function addFilter(filter) {
    updateFilter({
      activeFilters: removeOrAddItemFromArray(filter, activeFilters),
    });
    activateFilterDialog(filter);
    closeFilterMenu();
  }

  return (
    <Paper square={true} elevation={24} sx={{ p: "8px 0 0 0" }}>
      <TextField
        label="Filter by name"
        type="search"
        defaultValue={nameFilter}
        placeholder="Start typing cocktail name..."
        sx={{ mt: 0, ml: 1, mr: 1, width: 300 }}
        margin="normal"
        onChange={(e) => updateNameFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button
        sx={{ float: "right", m: 1 }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openFilterMenu}
      >
        <FilterListIcon />
        Add Filter
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeFilterMenu}
      >
        {getRules().map((menuOption, idx) => {
          return (
            <MenuItem
              disabled={activeFilters.includes(menuOption)}
              key={idx}
              onClick={() => addFilter(menuOption)}
            >
              {labelFor(menuOption)}
            </MenuItem>
          );
        })}
      </Menu>
      <FilterChips />

      <FilterDialog />

      <div
        style={{
          padding: 4,
          fontWeight: "bold",
          clear: "both",
          textAlign: "center",
          textTransform: "uppercase",
        }}
        sx={{
          backgroundColor: "secondary.main",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.secondary.light),
        }}
      >
        Showing {pluralize("cocktail", filteredCocktails.length, true)}
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: state.filterOptions,
  filteredCocktails: filteredCocktailsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
  activateFilterDialog: bindActionCreators(activateFilterDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailFilter);

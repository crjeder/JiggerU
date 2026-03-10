import React, { useState } from "react";
import { Chip, TextField, InputAdornment } from "@mui/material";
import { removeOrAddItemFromArray } from "../utilities/util";
import map from "lodash/map";
import { connect } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

const IngredientPicker = ({
  allIngredients,
  selectedIngredients,
  onIngredientsChange,
}) => {
  const [searchTerm, updateSearchTerm] = useState(null);

  return (
    <div>
      <TextField
        id="standard-search"
        label="Filter ingredients"
        type="search"
        sx={{ ml: 1, mr: 1, width: 300 }}
        margin="normal"
        onChange={(e) => updateSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <br style={{ clear: "both" }} />
      {map(allIngredients, (ingredientDetail, ingredientName) => {
        if (
          searchTerm &&
          !ingredientName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return null;
        }
        return (
          <Chip
            key={ingredientName}
            color={
              selectedIngredients.includes(ingredientName)
                ? "primary"
                : "default"
            }
            onClick={(e) => {
              onIngredientsChange(
                removeOrAddItemFromArray(ingredientName, selectedIngredients),
              );
            }}
            label={ingredientName}
            sx={{ m: 0.5 }}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allIngredients: state.db.ingredients,
});

export default connect(mapStateToProps)(IngredientPicker);

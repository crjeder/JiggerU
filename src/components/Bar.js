import React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import PopularIngredients from "./Bar/PopularIngredients";
import CocktailGauge from "./Bar/CocktailGauge";
import MakeableCocktails from "./Bar/MakeableCocktails";
import IngredientPicker from "./IngredientPicker";
import { bindActionCreators } from "redux";
import { setBar } from "../actions";
import { connect } from "react-redux";

const Bar = ({ bar, setBar }) => {
  // Derive string names for IngredientPicker (works with string[] only)
  const selectedNames = bar
    .filter((item) => item && item.source !== "robot")
    .map((item) => (typeof item === "string" ? item : item.ingredient));

  return (
    <div sx={{ justifyContent: "center" }}>
      <Paper sx={{ p: "8px 16px" }}>
        <Typography variant="h2" gutterBottom>
          Your Bar
        </Typography>

        <Typography component="p" paragraph>
          Select the ingredients you have in your bar...
        </Typography>

        <IngredientPicker
          selectedIngredients={selectedNames}
          onIngredientsChange={(selectedIngredients) => {
            setBar(selectedIngredients);
          }}
        />
        <br />

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item md={3} xs={12}>
            <MakeableCocktails />
          </Grid>
          <Grid item md={3} xs={12}>
            <CocktailGauge />
          </Grid>
          <Grid item md={6} xs={12}>
            <PopularIngredients />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bar: state.bar,
  allCocktails: state.db.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  setBar: bindActionCreators(setBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bar);

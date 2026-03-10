import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { makeableCocktailsSelector } from "../../selectors";
import "react-circular-progressbar/dist/styles.css";

const CocktailGauge = ({ allCocktails, makeableCocktails }) => {
  const theme = useTheme();
  const progressBarStyles = {
    path: {
      // Path color
      stroke: theme.palette.primary.main,
    },
    trail: {
      stroke: theme.palette.grey[50],
    },
    text: {
      fill: theme.palette.primary.main,
    },
  };

  return (
    <div>
      <Typography variant="h3" sx={{ fontSize: 25, m: "8px 0" }} gutterBottom>
        Cocktail Gauge
      </Typography>
      <Typography component="p" paragraph>
        How many cocktails can you make with what's in your bar?
      </Typography>

      <CircularProgressbar
        styles={progressBarStyles}
        style={{ padding: 4, fontFamily: "Roboto" }}
        value={makeableCocktails.length}
        maxValue={allCocktails.length}
        text={makeableCocktails.length || "0"}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCocktails: state.db.cocktails,
  makeableCocktails: makeableCocktailsSelector(state),
});

export default connect(mapStateToProps)(CocktailGauge);

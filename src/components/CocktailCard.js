import React from "react";
import { connect } from "react-redux";
import { allGlassesSelector } from "../selectors";
import CocktailAvatar from "./CocktailAvatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import GlassIcon from "./GlassIcon";
import VeganIcon from "@mui/icons-material/FilterVintage";

import Redo from "@mui/icons-material/Redo";

import Ingredient from "./IngredientDetail";
import { Link } from "react-router-dom";

const CocktailCard = ({ cocktail, allGlasses }) => {
  if (!cocktail) return null;

  return (
    <Card
      sx={{
        width: (theme) => theme.custom?.cardWidth || theme.spacing(40),
        m: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <CardActionArea
        sx={{ flexGrow: 10 }}
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
      >
        <CardHeader
          title={
            <h1 style={{ fontSize: 20, marginTop: 0, marginBottom: 0 }}>
              {cocktail.name}
            </h1>
          }
          avatar={<CocktailAvatar cocktail={cocktail} />}
          subheader={
            <span style={{ fontSize: 14, fontStyle: "italic" }}>
              {cocktail.category}
            </span>
          }
        />
        <CardContent>
          <ul style={{ paddingLeft: 16 }}>
            {cocktail.ingredients.map((item, idx) => (
              <li key={idx}>
                <Typography>
                  <Ingredient item={item} />
                </Typography>
              </li>
            ))}
          </ul>

          <br />

          {!cocktail.iba && (
            <Typography component="p" color="textSecondary">
              Non-IBA
            </Typography>
          )}

          {cocktail.glass && (
            <Typography component="p" color="textSecondary">
              <GlassIcon glass={cocktail.glass} fontSize="inherit" />
              &nbsp;
              {allGlasses[cocktail.glass.toString()].name}
            </Typography>
          )}
          {cocktail.garnish && (
            <Typography component="p" color="textSecondary">
              <Redo fontSize="inherit" />
              &nbsp;
              {cocktail.garnish}
            </Typography>
          )}

          {!cocktail.vegan && (
            <Typography component="p" color="textSecondary">
              <VeganIcon fontSize="inherit" />
              &nbsp; Non-vegan
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  allGlasses: allGlassesSelector(state),
});

export default connect(mapStateToProps)(CocktailCard);

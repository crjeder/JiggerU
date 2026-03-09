import React from "react";
import { removeOrAddItemFromArray } from "../utilities/util";
import { updateFavourites } from "../actions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/MenuBook";
import UnFavouriteIcon from "@mui/icons-material/Favorite";
import FavouriteIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import ConditionalHidden from "./ConditionalHidden";

const CocktailActions = ({
  updateFavourites,
  cocktail,
  favourites,
  hideLabelOnXS = false,
}) => {
  return (
    <>
      <Button
        sx={{ p: "4px 8px" }}
        size="large"
        color="secondary"
        onClick={() => {
          updateFavourites(removeOrAddItemFromArray(cocktail.slug, favourites));
        }}
      >
        {favourites.includes(cocktail.slug) ? (
          <UnFavouriteIcon />
        ) : (
          <FavouriteIcon />
        )}
        <ConditionalHidden hideOnXS={hideLabelOnXS}>
          Favourite
        </ConditionalHidden>
      </Button>
      <Button
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
        sx={{ p: "4px 8px" }}
        size="large"
        color="secondary"
      >
        <ReadMoreIcon />
        <ConditionalHidden hideOnXS={hideLabelOnXS}>
          Learn More
        </ConditionalHidden>
      </Button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  favourites: state.favourites,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavourites: bindActionCreators(updateFavourites, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailActions);

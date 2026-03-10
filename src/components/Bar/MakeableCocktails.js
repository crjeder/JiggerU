import React from "react";
import { connect } from "react-redux";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { makeableCocktailsSelector } from "../../selectors";

const MakeableCocktails = ({ makeableCocktails }) => {
  return (
    <div>
      <Typography variant="h3" sx={{ fontSize: 25, m: "8px 0" }} gutterBottom>
        Makeable Cocktails
      </Typography>
      <Typography component="p" paragraph>
        These are the cocktails you can make...
      </Typography>
      <List sx={{ maxHeight: "20rem", overflowY: "scroll" }}>
        {makeableCocktails.map((cocktail) => (
          <ListItem
            button
            key={cocktail.name}
            component={Link}
            to={`/cocktails/${cocktail.slug}`}
          >
            <ListItemText primary={cocktail.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  makeableCocktails: makeableCocktailsSelector(state),
});

export default connect(mapStateToProps)(MakeableCocktails);

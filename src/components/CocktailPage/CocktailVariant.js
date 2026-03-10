import React from "react";
import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

const CocktailVariant = ({
  cocktail: { name, image, category, glass, preparation, ingredients } = {},
}) => (
  <ListItem
    sx={{ backgroundColor: "background.paper" }}
    alignItems="flex-start"
  >
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src={image} />
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={
        <span>
          <span
            style={{ display: "block", fontStyle: "italic", marginBottom: 8 }}
          >
            {ingredients.join(" - ")}
          </span>
          <span>{preparation}</span>
        </span>
      }
    />
  </ListItem>
);

export default CocktailVariant;

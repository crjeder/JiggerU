import React from "react";
import CocktailCard from "./CocktailCard";
import { ImageList } from "@mui/material";

const CardView = ({ displayedCocktails }) => {
  return (
    <ImageList sx={{ justifyContent: "center" }}>
      {displayedCocktails.map((cocktail) => (
        <CocktailCard key={cocktail.name} cocktail={cocktail} />
      ))}
    </ImageList>
  );
};

export default CardView;

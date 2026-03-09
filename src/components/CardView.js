import React from "react";
import CocktailCard from "./CocktailCard";
import { Box } from "@mui/material";

const CardView = ({ displayedCocktails }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {displayedCocktails.map((cocktail) => (
        <CocktailCard key={cocktail.name} cocktail={cocktail} />
      ))}
    </Box>
  );
};

export default CardView;

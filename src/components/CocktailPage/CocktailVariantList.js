import React from "react";
import { Typography, List, Divider, Paper } from "@mui/material";
import CocktailVariant from "./CocktailVariant";

const CocktailVariantList = ({ cocktail }) => {
  const { enrichment, enriched } = cocktail;

  if (!enriched || !enrichment.variants || !enrichment.variants.length)
    return null;

  return (
    <>
      <Divider sx={{ m: "24px 0" }} />

      <Typography variant="h5" gutterBottom>
        Variants
      </Typography>

      <Paper>
        <List>
          {enrichment.variants.map((variant, idx) => {
            return (
              <React.Fragment key={variant.name}>
                <CocktailVariant cocktail={variant} />
                {idx !== enrichment.variants.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default CocktailVariantList;

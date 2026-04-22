import React, { useState } from "react";
import { connect } from "react-redux";
import DispenseWorkflow from "./DispenseWorkflow";
import { Typography, Paper, Button, Box } from "@mui/material";
import { allGlassesSelector } from "../../selectors";
import IngredientDetail from "../IngredientDetail";
import Definition from "./Definition";
import useCanDispense from "../../hooks/useCanDispense";

const CocktailPage = ({ cocktail, allGlasses }) => {
  const [showDispense, setShowDispense] = useState(false);
  const { robotUrl, robotConnected, canDispense, robotBusy, hasDispensable } =
    useCanDispense(cocktail);

  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    vegan,
    garnish,
    enrichment,
    enriched,
  } = cocktail;

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "3rem", md: "4rem", lg: "5rem" },
        }}
        variant="h1"
      >
        {name}
      </Typography>

      <Box sx={{ mt: 1, mb: 5 }}>
        <Definition title="Category" description={category} />
        <Definition
          title="Glass"
          description={allGlasses[glass.toString()].name}
        />
        <Definition title="Garnish" description={garnish} />
        {!vegan && <Definition title="Vegan" description={"Non-vegan"} />}

        {enriched && enrichment.ibaCategory && (
          <Definition
            title="IBA Category"
            description={enrichment.ibaCategory}
          />
        )}
      </Box>
      <Paper sx={{ p: 2 }}>
        <Typography component="ul" gutterBottom>
          <>
            {ingredients.map((ingredient, idx) => {
              return (
                <li key={`ingredient-${idx}`}>
                  <IngredientDetail item={ingredient} />
                </li>
              );
            })}
          </>
        </Typography>
        <br />
        <Typography component="p">{preparation}</Typography>
      </Paper>
      {robotUrl && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canDispense}
            onClick={() => setShowDispense(true)}
            title={
              !robotConnected
                ? "Robot not connected"
                : robotBusy
                  ? "Robot is busy"
                  : !hasDispensable
                    ? "No ingredients loaded on robot"
                    : undefined
            }
          >
            Make it!
          </Button>
        </div>
      )}
      {showDispense && (
        <DispenseWorkflow
          cocktail={cocktail}
          onClose={() => setShowDispense(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  allGlasses: allGlassesSelector(state),
});

export default connect(mapStateToProps)(CocktailPage);

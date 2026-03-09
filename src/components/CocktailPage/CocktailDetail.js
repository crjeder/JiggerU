import React, { useState } from "react";
import { useSelector } from "react-redux";
import DispenseWorkflow from "./DispenseWorkflow";
import { Typography, Paper, Button } from "@mui/material";
import { allGlassesSelector } from "../../selectors";
import IngredientDetail from "../IngredientDetail";
import Definition from "./Definition";
import { connect } from "react-redux";

const CocktailPage = ({ cocktail, allGlasses }) => {
  const [showDispense, setShowDispense] = useState(false);
  const robotUrl = useSelector(
    (state) => state.settings.robot && state.settings.robot.url,
  );
  const robotConnected = useSelector((state) => state.robot.connected);
  const robotState = useSelector((state) => state.robot.robotState);
  const bar = useSelector((state) => state.bar);

  const robotIdle = robotConnected && robotState && robotState.state === "idle";

  // Check if at least one cocktail ingredient matches a robot-loaded bar entry
  const hasDispensable = bar.some(
    (item) =>
      item &&
      item.source === "robot" &&
      cocktail.ingredients.some(
        (ing) =>
          ing.ingredient === item.type || ing.ingredient === item.ingredient,
      ),
  );

  const canDispense = !!robotUrl && robotIdle && hasDispensable;
  const robotBusy =
    robotConnected &&
    robotState &&
    ["working", "waiting_for_glass", "drink_ready"].includes(robotState.state);

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
          xs: { fontSize: "3rem" },
          md: { fontSize: "4rem" },
          lg: { fontSize: "5rem" },
        }}
        variant="h1"
      >
        {name}
      </Typography>

      <div sx={{ mt: 1, mb: 5 }}>
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
      </div>
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

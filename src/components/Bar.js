import React from "react";
import { Typography, Paper, Grid, Box } from "@mui/material";
import MakeableCocktails from "./Bar/MakeableCocktails";
import RobotLiquidsList from "./Bar/RobotLiquidsList";
import PopularIngredients from "./Bar/PopularIngredients";

const Bar = () => {
  return (
    <Box sx={{ justifyContent: "center", px: 2 }}>
      <Paper sx={{ p: "8px 16px" }}>
        <Typography variant="h2" gutterBottom>
          Robot Bar
        </Typography>

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item md={3} xs={12}>
            <MakeableCocktails />
          </Grid>
          <Grid item md={3} xs={12}>
            <RobotLiquidsList />
          </Grid>
          <Grid item md={6} xs={12}>
            <PopularIngredients />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Bar;

import React from "react";
import {
  Typography,
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CocktailGauge from "./Bar/CocktailGauge";
import MakeableCocktails from "./Bar/MakeableCocktails";
import PopularIngredients from "./Bar/PopularIngredients";
import { connect } from "react-redux";

const Bar = ({ bar }) => {
  return (
    <Box sx={{ justifyContent: "center", px: 2 }}>
      <Paper sx={{ p: "8px 16px" }}>
        <Typography variant="h2" gutterBottom>
          Robot Bar
        </Typography>

        {bar.length === 0 ? (
          <Typography component="p" paragraph color="textSecondary">
            No ingredients loaded. Connect a robot to populate the bar.
          </Typography>
        ) : (
          <List dense>
            {bar.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={
                    item.type && item.type !== item.ingredient
                      ? `${item.ingredient} (${item.type})`
                      : item.ingredient
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item md={3} xs={12}>
            <MakeableCocktails />
          </Grid>
          <Grid item md={3} xs={12}>
            <CocktailGauge />
          </Grid>
          <Grid item md={6} xs={12}>
            <PopularIngredients />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  bar: state.bar,
});

export default connect(mapStateToProps)(Bar);

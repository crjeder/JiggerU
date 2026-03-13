import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { connect } from "react-redux";

const RobotLiquidsList = ({ bar }) => {
  return (
    <div>
      <Typography variant="h3" sx={{ fontSize: 25, m: "8px 0" }} gutterBottom>
        Configured Liquids
      </Typography>
      {bar.length === 0 ? (
        <Typography component="p" color="textSecondary">
          No liquids configured.
        </Typography>
      ) : (
        <List dense>
          {bar.map((item, idx) => (
            <ListItem key={idx} disableGutters>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  bar: state.bar,
});

export default connect(mapStateToProps)(RobotLiquidsList);

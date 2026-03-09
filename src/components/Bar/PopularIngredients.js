import React from "react";
import { connect } from "react-redux";
import { countIngredients } from "../../utilities/cocktail.utils";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { bindActionCreators } from "redux";
import { addToBar } from "../../actions";

const PopularIngredients = ({ allCocktails, bar, addToBar }) => {
  const counts = countIngredients(allCocktails)
    .filter((i) => {
      return !bar.some(
        (item) =>
          (typeof item === "string" ? item : item.ingredient) === i.name,
      );
    })
    .slice(0, 5);

  return (
    <div>
      <Typography variant="h3" sx={{ fontSize: 25, m: "8px 0" }} gutterBottom>
        Popular Ingredients
      </Typography>
      <Typography component="p" paragraph>
        These are popular ingredients not currently in your bar.
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Appearances</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {counts.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ display: "flex" }} component="th" scope="row">
                <div>
                  <span>{row.name}</span>
                  <IconButton
                    onClick={() => addToBar(row.name)}
                    color="primary"
                    aria-label="Add"
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bar: state.bar,
  allCocktails: state.db.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  addToBar: bindActionCreators(addToBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularIngredients);

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
} from "@mui/material";

const PopularIngredients = ({ allCocktails, bar }) => {
  const counts = countIngredients(allCocktails)
    .filter((i) => {
      return !bar.some(
        (item) => item.ingredient === i.name || item.type === i.name,
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
              <TableCell component="th" scope="row">
                {row.name}
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

export default connect(mapStateToProps)(PopularIngredients);

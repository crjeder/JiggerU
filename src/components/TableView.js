import React from "react";
import capitalize from "lodash/capitalize";
import ConditionalHidden from "./ConditionalHidden";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import CocktailAvatar from "./CocktailAvatar";

const TableView = ({ displayedCocktails }) => {
  const columns = [
    {
      name: "name",
    },
    { name: "category", hideOnXS: true },
  ];

  return (
    <TableContainer sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Appearance</TableCell>
            {columns.map((column) => (
              <ConditionalHidden key={column.name} hideOnXS={column.hideOnXS}>
                <TableCell>{capitalize(column.name)}</TableCell>
              </ConditionalHidden>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedCocktails.map((cocktail) => (
            <TableRow hover tabIndex={-1} key={cocktail.name}>
              <TableCell>
                <CocktailAvatar cocktail={cocktail} />
              </TableCell>
              {columns.map((column) => {
                return (
                  <ConditionalHidden
                    key={column.name}
                    hideOnXS={column.hideOnXS}
                  >
                    <TableCell>{cocktail[column.name]}</TableCell>
                  </ConditionalHidden>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;

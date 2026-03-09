import React from "react";
import { Tooltip } from "@mui/material";
import { connect } from "react-redux";
import compact from "lodash/compact";
import { createMeasurementString } from "../utilities/cocktail.utils";

const IngredientDetail = ({ item, units, useLingo, allIngredients }) => {
  if (item.special) return <span>{item.special}</span>;

  const { taste, abv, vegan } = allIngredients[item.ingredient] || {};

  const toolTipContent = [];
  toolTipContent.push(abv > 0 ? abv + "% abv" : "Non-alcoholic");
  toolTipContent.push(vegan === false ? "Non-Vegan" : "");
  toolTipContent.push(taste);

  return (
    <span>
      {item.unit === "cl"
        ? createMeasurementString(item.amount, units, useLingo)
        : item.amount}{" "}
      <Tooltip title={compact(toolTipContent).join(", ")} placement="top">
        <strong style={{ cursor: "pointer" }}>
          {item.label || item.ingredient}
        </strong>
      </Tooltip>
    </span>
  );
};

const mapStateToProps = (state) => ({
  allIngredients: state.db.ingredients,
  units: state.settings.units,
  useLingo: state.settings.lingo,
});

export default connect(mapStateToProps)(IngredientDetail);

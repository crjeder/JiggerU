import React from "react";
import { Hidden } from "@mui/material";

const ConditionalHidden = ({ hideOnXS, children }) => {
  if (!hideOnXS) return children;
  return <Hidden smDown>{children}</Hidden>;
};

export default ConditionalHidden;

import React from "react";
import { Box } from "@mui/material";

const ConditionalHidden = ({ hideOnXS, children }) => {
  if (!hideOnXS) return children;
  return <Box sx={{ display: { xs: "none", sm: "block" } }}>{children}</Box>;
};

export default ConditionalHidden;

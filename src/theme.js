import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./themes";

const Theme = ({ children }) => (
  <ThemeProvider theme={getTheme()}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default Theme;

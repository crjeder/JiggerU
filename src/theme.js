import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getTheme } from "./themes";

const Theme = ({ children }) => (
  <MuiThemeProvider theme={getTheme()}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default Theme;

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import indigo from "@mui/material/colors/indigo";
import red from "@mui/material/colors/red";
import teal from "@mui/material/colors/teal";
import brown from "@mui/material/colors/brown";
import pink from "@mui/material/colors/pink";
import cyan from "@mui/material/colors/cyan";
import deepPurple from "@mui/material/colors/deepPurple";

import { connect } from "react-redux";

export const colors = {
  indigo,
  red,
  teal,
  brown,
  pink,
  purple: deepPurple,
};

/**
 * override theme defaults here.
 */
function buildTheme(color, theme) {
  return createTheme({
    palette: {
      primary: colors[`${color}`],
      secondary: theme === "light" ? pink : cyan,
      mode: theme,
    },
  });
}

const mapStateToProps = (state) => ({
  color: state.settings.color,
  theme: state.settings.theme,
});

const Theme = ({ color, theme, children }) => (
  <ThemeProvider theme={buildTheme(color, theme)}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default connect(mapStateToProps)(Theme);

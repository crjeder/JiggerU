import { createTheme } from "@mui/material/styles";

const sakuraPink = {
  main: "#E8A0BF",
  light: "#F4C0D4",
  dark: "#C07090",
  contrastText: "#3D2B1F",
};

const sageGreen = {
  main: "#A8C5A0",
  light: "#C8DCC0",
  dark: "#78A070",
  contrastText: "#1A2A18",
};

export default createTheme({
  palette: {
    primary: sakuraPink,
    secondary: sageGreen,
    mode: "light",
    background: {
      default: "#FDF6F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3D2B1F",
      secondary: "#7A5C50",
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", sans-serif',
    fontWeightMedium: 500,
    h1: { fontWeight: 500, letterSpacing: "0.01em" },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.75 },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(232, 160, 191, 0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
  custom: {
    cardWidth: 260,
    mixButtonLabel: "Mix it!",
  },
});

import { createTheme } from "@mui/material/styles";

const amber = {
  main: "#C07030",
  light: "#E09050",
  dark: "#8A4F20",
  contrastText: "#FFF8F0",
};

const cream = {
  main: "#F5E6C8",
  light: "#FFF8F0",
  dark: "#C8B090",
  contrastText: "#3A2010",
};

export default createTheme({
  palette: {
    primary: amber,
    secondary: cream,
    mode: "dark",
    background: {
      default: "#1A0E05",
      paper: "#2A1A0A",
    },
    text: {
      primary: "#F5E6C8",
      secondary: "#C8A870",
    },
  },
  typography: {
    fontFamily: '"Playfair Display", Georgia, serif',
    h1: { fontWeight: 400, letterSpacing: "0.02em" },
    h2: { fontWeight: 400, letterSpacing: "0.02em" },
    h3: { fontWeight: 400 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.7 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(192, 112, 48, 0.2)",
        },
      },
    },
  },
  custom: {
    cardWidth: 280,
  },
});

import { createTheme } from "@mui/material/styles";

const cobaltBlue = {
  main: "#4040A0",
  light: "#7B89D4",
  dark: "#2020A0",
  contrastText: "#A0A0FF",
};

const paleBlue = {
  main: "#A0A0FF",
  light: "#C0C0FF",
  dark: "#7B89D4",
  contrastText: "#000033",
};

export default createTheme({
  palette: {
    primary: cobaltBlue,
    secondary: paleBlue,
    mode: "dark",
    background: {
      default: "#000033",
      paper: "#000066",
    },
    text: {
      primary: "#A0A0FF",
      secondary: "#7B89D4",
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", monospace',
    fontSize: 10,
    h1: { fontSize: "1.2rem", letterSpacing: "0.05em" },
    h2: { fontSize: "1.1rem", letterSpacing: "0.05em" },
    h3: { fontSize: "1rem", letterSpacing: "0.05em" },
    h4: { fontSize: "0.9rem", letterSpacing: "0.05em" },
    h5: { fontSize: "0.8rem" },
    h6: { fontSize: "0.75rem" },
    body1: { fontSize: "0.65rem", lineHeight: 1.8 },
    body2: { fontSize: "0.6rem", lineHeight: 1.8 },
    caption: { fontSize: "0.55rem" },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: Array(25).fill("none"),
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #7B89D4",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: 0,
        },
        outlined: {
          border: "2px solid #7B89D4",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "2px solid #7B89D4",
        },
      },
    },
  },
  custom: {
    cardWidth: 640,
    mixButtonLabel: "RUN",
  },
});

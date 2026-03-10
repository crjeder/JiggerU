import { createTheme } from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";
import teal from "@mui/material/colors/teal";

export default createTheme({
  palette: {
    primary: indigo,
    secondary: teal,
    mode: "light",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
  custom: {
    cardWidth: 320,
    mixButtonLabel: "Mix it!",
  },
});

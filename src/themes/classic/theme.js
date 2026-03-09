import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import teal from "@material-ui/core/colors/teal";

export default createMuiTheme({
  palette: {
    primary: indigo,
    secondary: teal,
    type: "light",
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
  custom: {
    cardWidth: 320,
  },
});

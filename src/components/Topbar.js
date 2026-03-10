import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import GlassIcon from "./GlassIcon";
import DrinkIcon from "@mui/icons-material/LocalDrink";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const prideBackground = `linear-gradient(to bottom,
    #e70000 0,
    #e70000 16%,
    #ff8c00 16%,
    #ff8c00 32%,
    #ffd400 32%,
    #ffd400 48%,
    #00811f 48%,
    #00811f 66%,
    #0044ff 66%,
    #0044ff 86%,
    #760089 86%) no-repeat`;

const Topbar = ({ pride, robotUrl, robotConnected, robotState }) => {
  const backgroundSx = pride ? { background: prideBackground } : {};
  const textBackgroundSx = pride
    ? { ml: 0.5, p: "4px 8px", backgroundColor: "rgba(0, 0, 0, 0.25)" }
    : { ml: 0.5, p: "4px 8px" };

  const robotDotColor = (() => {
    if (!robotUrl) return null;
    if (!robotConnected) return "#f44336";
    const s = robotState && robotState.state;
    if (s === "idle") return "#4caf50";
    if (s === "working" || s === "waiting_for_glass") return "#ff9800";
    if (s === "error") return "#f44336";
    return "#9e9e9e";
  })();

  const robotDotLabel = (() => {
    if (!robotUrl) return null;
    if (!robotConnected) return "Robot: disconnected";
    const s = robotState && robotState.state;
    return s ? `Robot: ${s.replace(/_/g, " ")}` : "Robot: connecting...";
  })();

  return (
    <AppBar position="sticky" sx={backgroundSx}>
      <Toolbar>
        <Button
          sx={{ flexGrow: 1, ...textBackgroundSx }}
          component={Link}
          to="/cocktails"
          color="inherit"
        >
          <GlassIcon type="martini" />
          <Typography
            sx={{
              color: "white",
              fontSize: 20,
              textTransform: "capitalize",
              ml: 1,
              display: { xs: "none", sm: "block" },
            }}
            component="h1"
          >
            Cocktail Browser
          </Typography>
        </Button>
        <Button
          sx={textBackgroundSx}
          component={Link}
          to="/cocktails"
          color="inherit"
        >
          <SearchIcon />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ color: "white", fontSize: 14 }}>
              Browse
            </Typography>
          </Box>
        </Button>
        <Button
          sx={textBackgroundSx}
          component={Link}
          to="/my-bar"
          color="inherit"
        >
          <DrinkIcon />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ color: "white", fontSize: 14 }}>Bar</Typography>
          </Box>
        </Button>
        <Button
          sx={textBackgroundSx}
          component={Link}
          to="/settings"
          color="inherit"
        >
          <SettingsIcon />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ color: "white", fontSize: 14 }}>
              Settings
            </Typography>
          </Box>
        </Button>
        {robotDotColor && (
          <Tooltip title={robotDotLabel}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                display: "inline-block",
                marginLeft: 8,
                verticalAlign: "middle",
                backgroundColor: robotDotColor,
              }}
            />
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  pride: state.settings.pride,
  robotUrl: state.settings.robot && state.settings.robot.url,
  robotConnected: state.robot.connected,
  robotState: state.robot.robotState,
});

export default connect(mapStateToProps)(Topbar);

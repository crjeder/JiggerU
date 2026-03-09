import React from "react";
import { Fab, Slide } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useScroll from "../hooks/useScroll";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const ScrollTopButton = () => {
  const scrollPos = useScroll();
  const visible = scrollPos > 100;

  return (
    <Slide in={visible} direction="up">
      <Fab
        onClick={scrollToTop}
        color="secondary"
        aria-label="Return to top"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(),
          right: (theme) => theme.spacing(),
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Slide>
  );
};

export default ScrollTopButton;

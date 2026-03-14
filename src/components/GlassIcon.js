import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import Martini from "../images/glasses/Martini.svg?react";
import OldFashioned from "../images/glasses/OldFashioned.svg?react";
import Collins from "../images/glasses/Collins.svg?react";
import Highball from "../images/glasses/Highball.svg?react";
import ChampagneFlute from "../images/glasses/ChampagneFlute.svg?react";
import ChampagneTulip from "../images/glasses/ChampagneTulip.svg?react";
import Margarita from "../images/glasses/Margarita.svg?react";
import Hurricane from "../images/glasses/Hurricane.svg?react";
import Shot from "../images/glasses/Shot.svg?react";
import HotDrink from "../images/glasses/HotDrink.svg?react";
import WhiteWine from "../images/glasses/WhiteWine.svg?react";

// Glass SVGs
// Note that currently not all of these are completed, these are just placeholders
// for if someone at some point makes some real SVGs. Note that there are
// a few constraints on the SVG format for material UI's SVG icon;
//
// https://material-ui.com/style/icons/#svg-icons
//
// * SVG elements should be scaled for a 24x24px viewport.
// * The first child should be a 'path' element.
//

const glassSvgLookup = {
  martini: Martini,
  "old-fashioned": OldFashioned,
  collins: Collins,
  highball: Highball,
  "champagne-flute": ChampagneFlute,
  margarita: Margarita,
  "champagne-tulip": ChampagneTulip,
  hurricane: Hurricane,
  shot: Shot,
  "hot-drink": HotDrink,
  "white-wine": WhiteWine,
};

const GlassIcon = ({ glass = "martini", ...otherProps }) => {
  const GlassSvg = glassSvgLookup[glass.toString()];

  return (
    <SvgIcon {...otherProps}>
      <GlassSvg />
    </SvgIcon>
  );
};

export default GlassIcon;

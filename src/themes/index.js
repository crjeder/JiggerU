import classic from "./classic/theme";
import c64 from "./c64/theme";
import negroni from "./negroni/theme";
import blossom from "./blossom/theme";

const themes = { classic, c64, negroni, blossom };

export function getTheme() {
  const config = window.__APP_CONFIG__ || {};
  const name = config.activeTheme || "classic";
  return themes[name] || themes.classic;
}

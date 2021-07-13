import layout_40 from "./layout_40_default.json";
import layout_60 from "./layout_60_default.json";
import layout_60_iso from "./layout_60_ISO.json";
import layout_60_hhkb from "./layout_60_hhkb.json";
import layout_60_tsangan from "./layout_60_tsangan.json";
import layout_60_wkl from "./layout_60_wkl.json";
import layout_65 from "./layout_65_default.json";
import layout_75 from "./layout_75_default.json";
import layout_80 from "./layout_80_default.json";
import layout_numpad from "./layout_numpad.json";
import layout_40_ortho from "./layout_40_ortho.json";
import layout_50_ortho from "./layout_50_ortho.json";
import layout_40_leftnum from "./layout_40_leftnum.json";
import layout_95 from "./layout_95_default.json";
import layout_100 from "./layout_100_default.json";

const LAYOUTS = {
  40: layout_40,
  60: layout_60,
  65: layout_65,
  75: layout_75,
  80: layout_80,
  95: layout_95,
  100: layout_100,
  "60iso": layout_60_iso,
  "60wkl": layout_60_wkl,
  "60hhkb": layout_60_hhkb,
  "60tsangan": layout_60_tsangan,
  numpad: layout_numpad,
  "40ortho": layout_40_ortho,
  "50ortho": layout_50_ortho,
  leftnum: layout_40_leftnum,
};

export default LAYOUTS;

export const layoutOptions = Object.keys(LAYOUTS);

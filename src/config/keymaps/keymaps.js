import keymap_numpad from "./keymap_numpad.json";
import keymap_40_ortho from "./keymap_40_ortho.json";
import keymap_50_ortho from "./keymap_50_ortho.json";
import keymap_40_leftnum from "./keymap_40_leftnum.json";
import keymap_40 from "./keymap_40_default.json";
import keymap_60 from "./keymap_60_default.json";
import keymap_60_hhkb from "./keymap_60_hhkb.json";
import keymap_60_tsangan from "./keymap_60_tsangan.json";
import keymap_60_wkl from "./keymap_60_wkl.json";
import keymap_60_iso from "./keymap_60_ISO.json";
import keymap_65 from "./keymap_65_default.json";
import keymap_75 from "./keymap_75_default.json";
import keymap_80 from "./keymap_80_default.json";
import keymap_95 from "./keymap_95_default.json";
import keymap_100 from "./keymap_100_default.json";

const KEYMAPS = {
  numpad: keymap_numpad,
  "40ortho": keymap_40_ortho,
  "50ortho": keymap_50_ortho,
  leftnum: keymap_40_leftnum,
  "60wkl": keymap_60_wkl,
  "60hhkb": keymap_60_hhkb,
  "60tsangan": keymap_60_tsangan,
  "60iso": keymap_60_iso,
  40: keymap_40,
  60: keymap_60,
  65: keymap_65,
  75: keymap_75,
  80: keymap_80,
  95: keymap_95,
  100: keymap_100,
};

export default KEYMAPS;

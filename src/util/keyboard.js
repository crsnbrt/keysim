import qmk_codes from "../config/keys/qmk_codes.json";
import groups from "../config/keys/groups.json";

export const KEY_LAYERS = {
  KEY: 1,
  ALPHA: 2,
  MOD: 3,
  ARROWS: 4,
  FUNCTION: 5,
  NAVIGATION: 6,
  NUMPAD: 7,
  ROW0: 8,
  ROW1: 9,
  ROW2: 10,
  ROW3: 11,
  ROW4: 12,
  ROW5: 13,
};

export default class KeyUtil {
  //get layers this key is part of
  static setKeyLayers(code, mesh) {
    let layers = [1];
    if (this.isAlpha(code)) layers.push(KEY_LAYERS.ALPHA);
    if (this.isAlphaMod(code)) layers.push(KEY_LAYERS.MOD);
    if (this.isArrow(code)) layers.push(KEY_LAYERS.ARROWS);
    if (this.isNumpad(code)) layers.push(KEY_LAYERS.NUMPAD);
    if (this.isNav(code)) layers.push(KEY_LAYERS.NAVIGATION);
    if (this.isFunction(code)) layers.push(KEY_LAYERS.FUNCTION);
    if (!mesh) return layers;
    layers.forEach((l) => mesh.layers.enable(l));
  }
  static getKeyCode(code) {
    return qmk_codes[code];
  }
  static isAlpha(code) {
    return groups.alphas.includes(code);
  }
  static isMod(code) {
    return groups.mods.includes(code);
  }
  static isAlphaMod(code) {
    return groups.mods_alpha.includes(code);
  }
  static isNav(code) {
    return groups.nav.includes(code);
  }
  static isNumpad(code) {
    return groups.numpad.includes(code);
  }
  static isFunction(code) {
    return groups.function.includes(code);
  }
  static isArrow(code) {
    return groups.arrows.includes(code);
  }
  static isBlank(code) {
    return groups.blank.includes(code);
  }
  static isStabilized(code) {
    return groups.stabilized.includes(code);
  }
  static getKeyObject(arr, qmk_code) {
    return arr.find((x) => x.options.code === qmk_code);
  }
  //get percent from width and height in units
  static getSize(w, h) {
    h = h || 5;
    if (h <= 4) return 40;
    if (w <= 15) return 60;
    if (w <= 16) return 65;
    if (w <= 19) return 80;
    return 100;
  }
  //get key row 0 - 5
  static getKeyRow(index, layout, total_rows) {
    total_rows = total_rows || 5;
    let row = Math.floor(layout[index].y);
    return row;
  }
  //get key profile assumes: r1,r1,r2,r3,r4,r4
  static getKeyProfile(index, layout, total_rows) {
    total_rows = total_rows || 5;
    let row = Math.floor(layout[index].y);
    if (total_rows < 5) {
      //40%
      row++;
    } else if (total_rows > 5) {
      //75%+
      row = row === 0 ? 1 : row;
      row = row > 4 ? 4 : row;
    } else {
      //60/65
      row++;
      row = row > 4 ? 4 : row;
    }
    return row;
  }
}

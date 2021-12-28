import COLORWAYS from "../config/colorways/colorways";
import initial_settings from "../config/settings_user_default.json";
import { updateCustomColorway } from "../store/slices/colorways";
import * as colorConvert from "color-convert";
import colorwayTemplate from "../config/colorways/colorway_template.json";
import { subscribe } from "redux-subscriber";
import store from "../store/store";
import Util from "./math";

const accentOptions = [
  {
    background: "#49c5b1",
    color: "#eeeeee",
  },
  {
    background: "#5eaeff",
    color: "#ff26ff",
  },
  {
    background: "#e3229f",
    color: "#ffe600",
  },
  {
    background: "#81b595",
    color: "#094a21",
  },
  {
    background: "#c78bd6",
    color: "#0590a6",
  },
];

subscribe("colorways.active", (state) => {
  ColorUtil.cachedColorway = ColorUtil.getColorway(state.colorways.active);
});
subscribe("colorways.custom", (state) => {
  ColorUtil.cachedColorway = ColorUtil.getColorway(state.colorways.active);
});

//helpers for managing color values and colorway json
export default class ColorUtil {
  static cachedColorway;

  static get colorway() {
    return (
      this.cachedColorway ?? this.getColorway(initial_settings.colorways.active)
    );
  }

  static get changedOverrides() {
    return this.changedOverridesArr.length > 0
      ? this.changedOverridesArr.length
      : [];
  }

  static getUserColorway(id) {
    let state = store.getState();
    id = id || state.colorways.active;
    return state.colorways.custom.find((c) => c.id === id);
  }

  static getColorway(cw_name) {
    cw_name = cw_name || initial_settings.colorways.active;
    let cw = COLORWAYS[cw_name];
    return cw || this.getUserColorway(cw_name) || "";
  }

  static getAccent(cw_name) {
    cw_name = cw_name || store.getState().colorways.active;
    return this.colorway?.swatches?.accent?.background || "";
  }

  static getUiAccent(cw_name, defaultAccent) {
    defaultAccent = defaultAccent || "#666666";
    let accent = this.getAccent(cw_name);
    if (!accent) return defaultAccent;
    let hsv = colorConvert.hex.hsv(accent);
    let ratio = this.contrast(accent, "202024");
    //too dark
    if (ratio < 7) {
      let ratioDelta = 7 - ratio;
      hsv[2] = Math.min(hsv[2] + 10 * ratioDelta, 100);
      let hex = `#${colorConvert.hsv.hex(hsv)}`;
      return hex;
    }
    return accent;
  }

  static addCodeToOverride(key_code, swatch) {
    swatch = swatch || store.getState().colorways.activeSwatch;
    let cw = JSON.parse(JSON.stringify(this.getUserColorway()));
    if (!cw || !swatch) return;
    cw.override[key_code] = swatch;
    store.dispatch(updateCustomColorway(cw));
  }

  static luminanace(r, g, b) {
    let a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  static contrast(hex1, hex2) {
    let rgb1 = colorConvert.hex.rgb(hex1);
    let rgb2 = colorConvert.hex.rgb(hex2);
    let lum1 = this.luminanace(rgb1[0], rgb1[1], rgb1[2]);
    let lum2 = this.luminanace(rgb2[0], rgb2[1], rgb2[2]);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  static getUiCompliment(cw_name) {
    let cw = this.getColorway(cw_name);
    return cw?.swatches?.accent?.color || "";
  }

  static getUiAccentText(cw_name) {
    let acc = this.getUiAccent(cw_name);
    let v = colorConvert.hex.hsv(acc);
    let isLight = (v[2] > 80 && v[1] < 50) || v[2] > 95;
    return isLight ? "black" : "white";
  }

  static getRandomAccent() {
    return accentOptions[Math.floor(Math.random() * accentOptions.length)];
  }

  static getCaseColor(cw_name) {
    let cw = this.getColorway(cw_name);
    return cw?.case?.color || initial_settings.case.primaryColor;
  }

  static getColorwayTemplate(i) {
    let cw = JSON.parse(JSON.stringify(colorwayTemplate));
    cw.swatches.accent = ColorUtil.getRandomAccent();
    cw.id = `cw_${Util.randString()}`;
    cw.label = `My Colorway ${i}`;
    return cw;
  }

  static getTransparentColor(hex, transparency) {
    let val = colorConvert.hex.rgb(hex);
    return `rgba(${val[0]}, ${val[1]}, ${val[2]}, ${transparency || 0.5})`;
  }

  static parseColor(color) {
    if (typeof color === "string" || color instanceof String) {
      color = color.replace("#", "");
      color = color.replace("0x", "");
    }
    return parseInt(color, 16);
  }

  //true if closer to white, false if closer to black
  static isLight(color) {
    color = this.parseColor(color);
    let r = (color >> 16) & 0xff;
    let g = (color >> 8) & 0xff;
    let b = (color >> 0) & 0xff;
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 128;
  }
  //if color is dark make it brighter by ammout, darken if color is light
  static offsetColor(color, amount) {
    if (this.isLight(color)) {
      amount = amount * -1;
    }
    color = this.parseColor(color);
    var r = (color >> 16) + amount;
    var b = ((color >> 8) & 0x00ff) + amount;
    var g = (color & 0x0000ff) + amount;
    var newColor = g | (b << 8) | (r << 16);
    return "#" + newColor.toString(16);
  }

  static isValidColorString(str) {
    const reg = /^#[0-9A-F]{6}$/i;
    return reg.test(str);
  }
}

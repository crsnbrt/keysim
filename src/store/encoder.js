/*
encode colorway json for query string

encoded example: cw_9aa5b6.393b3b-393b3b.fe5a90-fe5a90.393b3b_ENT.2-ESC.2-GESC.2_ID_LABEL

decoded example: 
{
  "id": "ID",
  "label": "LABEL",
  "swatches": {
    "base": {
      "background": "#9aa5b6",
      "color": "#393b3b"
    },
    "mods": {
      "background": "#393b3b",
      "color": "#fe5a90"
    },
    "accent": {
      "background": "#fe5a90",
      "color": "#393b3b"
    }
  },
  "override": {
    "KC_ENT": "accent",
    "KC_ESC": "accent",
    "KC_GESC": "accent"
  }
}
*/

const decodeSwatches = (arr, sw_keys) => {
  let items = arr.map((x) => {
    let o = x.split(".");
    return {
      background: "#" + o[0],
      color: "#" + o[1],
    };
  });
  let sw = {};
  items.forEach((x, i) => {
    sw[sw_keys[i]] = x;
  });
  return sw;
};

const decodeOverride = (arr, sw_keys) => {
  let override = {};
  arr.forEach((x) => {
    let o = x.split(".");
    let key = "KC_" + o[0];
    override[key] = sw_keys[o[1]];
  });
  return override;
};

//decode qs value to colorway json
export const decodeColorway = (value) => {
  if (!value) return;
  let cw = {};
  value = value.split("_");
  let sw_list = value[1].split("-");
  let sw_keys = ["base", "mods", "accent"];
  if (sw_list.length > 3) {
    for (let i = 3; i < sw_list.length; i++) {
      sw_keys.push("swatch-" + Math.floor(Math.random() * Math.floor(100000)));
    }
  }
  cw["swatches"] = decodeSwatches(sw_list, sw_keys);
  cw["override"] = decodeOverride(value[2].split("-"), sw_keys);
  cw.id = value[3].replace("-", "_");
  cw.label = decodeURIComponent(value[4]);
  return cw;
};

export const encodeColorway = (value) => {
  let swatchlist = Object.keys(value.swatches);
  if (swatchlist.legnth < 1) return "";
  let swatches = swatchlist
    .map((s) => {
      let x = value.swatches[s];
      let colors = Object.keys(x);
      return colors.map((c) => x[c]).join(".");
    })
    .join("-");
  let override = Object.keys(value.override)
    .map((o) => {
      let x = value.override[o];
      return `${o.replace("KC_", "")}.${swatchlist.indexOf(x)}`;
    })
    .join("-");
  let id = value.id.replace("_", "-");
  let label = encodeURIComponent(value.label);
  let encoded = `cw_${swatches}_${override}_${id}_${label}`.replace(/#/gi, "");
  return swatches ? encoded : "";
};

export const validateColorway = (cw_str) => {
  return true;
};

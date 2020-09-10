import store from "./store";
const qs = require("query-string");

const setQueryStringParameter = (name, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};

//encode custom colorway json for query string
const encodeColorway = (value) => {
  let swatchlist = Object.keys(value.swatches);
  let swatches = swatchlist
    .map((s) => {
      let x = value.swatches[s];
      let colors = Object.keys(x);
      return colors.map((c) => x[c]).reduce((a, b) => a + "." + b);
    })
    .reduce((a, b) => a + "-" + b);
  let override = Object.keys(value.override)
    .map((o) => {
      let x = value.override[o];
      return `${o.replace("KC_", "")}.${swatchlist.indexOf(x)}`;
    })
    .reduce((a, b) => a + "-" + b);
  let id = value.id.replace("_", "-");
  let label = encodeURIComponent(value.label);
  let encoded = `cw_${swatches}_${override}_${id}_${label}`.replace(/#/gi, "");
  return encoded;
};

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
const decodeColorway = (value) => {
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

export const get_qs_values = () => {
  if (!document.location.search) return;
  const parsed = qs.parse(document.location.search);
  if (parsed.colorway && parsed.colorway.includes("cw_")) {
    parsed.colorway = decodeColorway(parsed.colorway);
  }
  return parsed;
};

export const set_qs_values = (values) => {
  if (values?.colorway) {
    values.colorway = encodeColorway(values.colorway);
  }
  let encoded = encodeColorway(test);
  setQueryStringParameter("colorway", encoded);
};

const getColorwayString = (state) => {
  let cw = state.colorways.active;
  if (cw && !cw.includes("cw_")) return cw;
  cw = state.colorways.custom.find((x) => x.id === cw);
  return encodeColorway(cw);
};

export const getPermalink = () => {
  let link = window.location.href;
  link = link.includes("?") ? link.split("?")[0] : link;
  let state = store.getState();
  var query = qs.stringify({
    colorway: getColorwayString(state),
    size: state.case.layout,
    legend: state.keys.legendPrimaryStyle,
    sub: state.keys.legendSecondaryStyle,
    cf: state.case.material,
    cc: state.case.primaryColor.replace("#", ""),
  });
  return link + "?" + query;
};

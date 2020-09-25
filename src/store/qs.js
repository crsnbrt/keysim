import store from "./store";
import { encodeColorway, decodeColorway } from "./encoder";
const qs = require("query-string");

export const get_qs_values = () => {
  if (!document.location.search) return;
  const parsed = qs.parse(document.location.search);
  if (parsed.colorway && parsed.colorway.includes("cw_")) {
    parsed.colorway = decodeColorway(parsed.colorway);
  }
  return parsed;
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

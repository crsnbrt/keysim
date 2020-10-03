import * as THREE from "three";
import LEGENDS from "../../config/legends/primary/primary";
import SUBS from "../../config/legends/subs/subs";
import KeyUtil from "../../util/keyboard";

const MIP_COUNT = 0;

//genertates a texture with canvas for top of key
export const keyTexture = (opts) => {
  let w = opts.w;
  let h = opts.h;
  let legend = opts.legend;
  let sublegend = opts.sub;
  let key = opts.code;
  var texture;
  let pxPerU = 128;
  let subColor = opts.subColor || opts.color;
  let fg = opts.color;
  let bg = opts.background;

  //iso enter add extra .25 for overhang
  let isIsoEnter = key === "KC_ENT" && h > 1;
  if (isIsoEnter) {
    w = w + 0.25;
  }

  let canvas = document.createElement("canvas");
  canvas.height = pxPerU * h;
  canvas.width = pxPerU * w;

  //let canvas = new OffscreenCanvas(pxPerU * w, pxPerU * h);

  let ctx = canvas.getContext("2d");
  //draw base color
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw gradient to simulate sculpting
  let gradient;
  if (key === "KC_SPC") {
    //convex
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(0,0,0,0.15)");
    gradient.addColorStop(0.5, "rgba(128,128,128,0.0)");
    gradient.addColorStop(1, "rgba(255,255,255,0.15)");
  } else {
    //concave
    //simulate slight curve with gradient on face
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0.2)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.0)");
    gradient.addColorStop(0.6, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.15)");
  }

  //bottom edge highlight
  let shineOpacity = 0.4;
  let shineRight = ctx.createLinearGradient(0, 0, canvas.width, 0);
  shineRight.addColorStop(0, `rgba(255,255,255,${0 * shineOpacity})`);
  shineRight.addColorStop(0.03, `rgba(255,255,255,${0 * shineOpacity})`);
  shineRight.addColorStop(0.07, `rgba(255,255,255,${0.6 * shineOpacity})`);
  shineRight.addColorStop(0.8, `rgba(255,255,255,${0.6 * shineOpacity})`);
  shineRight.addColorStop(0.95, `rgba(255,255,255,${0 * shineOpacity})`);

  //side edge highlight
  let shineBottom = ctx.createLinearGradient(0, 0, 0, canvas.height);
  let highlightRatio = (canvas.width - pxPerU * 0.04) / canvas.width;
  shineBottom.addColorStop(0, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(0.03, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(0.15, `rgba(255,255,255,${0.5 * shineOpacity})`);
  shineBottom.addColorStop(0.5, `rgba(255,255,255,${0.7 * shineOpacity})`);
  shineBottom.addColorStop(0.85, `rgba(255,255,255,${1.1 * shineOpacity})`);
  shineBottom.addColorStop(0.9, `rgba(255,255,255,${0.7 * shineOpacity})`);
  shineBottom.addColorStop(0.95, `rgba(255,255,255,${0 * shineOpacity})`);
  shineBottom.addColorStop(1, `rgba(255,255,255,${0 * shineOpacity})`);

  //draw gradients
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = shineRight;
  ctx.fillRect(0, canvas.height * 0.97, canvas.width, canvas.height);

  ctx.fillStyle = shineBottom;
  ctx.fillRect(canvas.width * highlightRatio, 0, canvas.width, canvas.height);

  let l = LEGENDS[legend];
  let mainChar = l?.chars[key] || "";

  // 1u bs and enter
  if (key === "KC_BSPC" && w <= 1) {
    mainChar = l?.chars["KC_BSISO"];
  }
  if ((key === "KC_ENT" && w <= 1) || isIsoEnter) {
    mainChar = l?.chars["KC_ENISO"];
  }

  let modWord = !l.encoded && mainChar.length > 1; //mods use multi chacter words instead of symbols (sa)
  let subChar = SUBS[sublegend]?.chars[key] || "";

  //convert to unicode value if encoded for custom fonts
  mainChar =
    l.encoded && mainChar.length > 1
      ? String.fromCharCode(parseInt(mainChar, 16))
      : mainChar;

  //font size
  let fontScaler = 1;
  if (mainChar["top"]) fontScaler = 1 / 2; //number keys 2 characters stacked
  if (!mainChar["top"] && modWord) fontScaler = 1 / 4; // keys with full words for modifer text i.e. "Enter", "Alt", "Home"
  let fontSize = l.fontsize * (fontScaler + 0.25);

  //set font style
  if (modWord) {
    ctx.font = `700 ${fontSize}px ${l.fontFamily}`;
  } else {
    ctx.font = `${fontSize}px ${l.fontFamily}`;
  }
  ctx.fillStyle = fg;

  if (l.centered) {
    ctx.textAlign = "center";
    l.offsetX = (w * pxPerU) / 2;
  } else {
    ctx.textAlign = "left";
  }
  let ent_off_x = 0;
  let ent_off_y = 0;
  if (isIsoEnter) {
    ent_off_x = 15;
    ent_off_y = 6;
  }

  if (mainChar["top"]) {
    ctx.fillText(mainChar.top, l.offsetX, l.offsetY + l.yOffsetTop);
    ctx.fillText(mainChar.bottom, l.offsetX, l.offsetY + l.yOffsetBottom);
  } else {
    ctx.fillText(
      mainChar,
      l.offsetX + ent_off_x,
      l.fontsize + (KeyUtil.isAlpha(key) ? l.offsetY : l.yOffsetMod) + ent_off_y
    );
  }

  // //sub characters
  if (sublegend && subChar && l.subsSupported) {
    let sub = SUBS[sublegend];
    let multiplier = sub.fontSizeMultiplier * 0.35;
    ctx.fillStyle = subColor || fg;
    ctx.font = `bold ${pxPerU * multiplier}px ${sub.fontFamily}`;
    if (subChar?.top) {
      ctx.fillText(subChar.top, pxPerU * 0.55, pxPerU * 0.4);
      ctx.fillText(subChar.bottom, pxPerU * 0.55, pxPerU * 0.8);
    } else {
      ctx.fillText(subChar, pxPerU * 0.55, pxPerU * 0.8);
    }
  }

  texture = new THREE.CanvasTexture(canvas);

  if (MIP_COUNT > 0) {
    // texture.mipmaps[0] = canvas;
    // for (let i = 1; i < MIP_COUNT + 1; i++) {
    //   let scale = 1 / 2 ** i;
    //   let mip_w = opts.w * pxPerU * scale;
    //   let mip_h = opts.h * pxPerU * scale;
    //   let mip_canvas = document.createElement("canvas");
    //   let mip_ctx = mip_canvas.getContext("2d");
    //   mip_canvas.width = mip_w;
    //   mip_canvas.height = mip_h;
    //   mip_ctx.fillStyle = "#ff0000";
    //   mip_ctx.fillRect(0, 0, mip_w, mip_h);
    //   // mip_ctx.scale(scale, scale);
    //   // mip_ctx.drawImage(canvas, 0, 0);
    //   texture.mipmaps[i] = mip_canvas;
    //   if (DEBUG) {
    //     document.body.appendChild(mip_canvas);
    //   }
    // }
  }

  //document.body.appendChild(canvas);

  texture.needsUpdate = true;
  texture.minFilter = THREE.NearestMipmapNearestFilter;
  return texture;
};

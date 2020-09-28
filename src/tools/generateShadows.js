import LAYOUTS from "../config/layouts/layouts";

const fs = require("fs");
const path = require("path");
const { createCanvas, Image } = require("canvas");
const StackBlur = require("stackblur-canvas");

const DIST_DIR = "../assets/shadows/";
const RESOLUTION = 512;
const DEBUG = false;
const bezel = 0.5;
const ratio = 16;
const mainShaodwDist = 40;
const mainShadowAngle = 35;
const shadowWidthOffset = Math.abs(
  Math.sin((mainShadowAngle * Math.PI) / 180) * mainShaodwDist
);
const shadowHeightOffset = Math.abs(
  Math.cos((mainShadowAngle * Math.PI) / 180) * mainShaodwDist
);
const stop1Color = DEBUG ? "red" : `rgba(0, 0, 0, 0.2)`;
const stop2Color = DEBUG ? "green" : `rgba(0, 0, 0, 0.2)`;
const mask_overlap = 30;

const layouts = Object.keys(LAYOUTS).map((board) => {
  let b = LAYOUTS[board];
  return {
    name: board,
    w: b.width,
    h: b.height,
  };
});

const blur = (ctx, radius) => {
  let imgData = ctx.getImageData(0, 0, RESOLUTION, RESOLUTION);
  let bluredImgData = StackBlur.imageDataRGBA(
    imgData,
    0,
    0,
    RESOLUTION,
    RESOLUTION,
    radius
  );
  ctx.putImageData(bluredImgData, 0, 0);
};

const generateShadow = (options) => {
  const width = RESOLUTION;
  const height = RESOLUTION;
  const w = (options.w + bezel) * ratio;
  const h = (options.h + bezel) * ratio;

  const aoCanvas = createCanvas(width, height);
  const aoCtx = aoCanvas.getContext("2d");

  const mainCanvas = createCanvas(width, height);
  const mainCtx = mainCanvas.getContext("2d");

  let wGutter = (width - w) / 2;
  let hGutter = (height - h) / 2;

  //Ambiant occlusion canvas
  aoCtx.fillStyle = `rgba(0, 0,${DEBUG ? 255 : 0}, 0.5)`;
  aoCtx.fillRect(wGutter, hGutter, w, h);
  blur(aoCtx, 30);
  aoCtx.fillStyle = `rgba(0, 0, 0, 0.9)`;
  aoCtx.fillRect(wGutter, hGutter, w, h);
  blur(aoCtx, 2);

  const shadow_path_1 = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(wGutter, hGutter);
    ctx.lineTo(wGutter - shadowWidthOffset, hGutter - shadowHeightOffset);
    ctx.lineTo(wGutter + w - shadowWidthOffset, hGutter - shadowHeightOffset);
    ctx.lineTo(wGutter + w, hGutter);
    ctx.closePath();
  };
  const shadow_path_2 = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(wGutter, hGutter + h);
    ctx.lineTo(
      wGutter - shadowWidthOffset * (2 / 3),
      hGutter + h - shadowHeightOffset
    );
    ctx.lineTo(wGutter - shadowWidthOffset, hGutter - shadowHeightOffset);
    ctx.lineTo(wGutter, hGutter);
    ctx.closePath();
  };
  const mask_path_1 = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(wGutter, hGutter);
    ctx.lineTo(
      wGutter - shadowWidthOffset - mask_overlap,
      hGutter - shadowHeightOffset - mask_overlap
    );
    ctx.lineTo(width, hGutter - shadowHeightOffset - mask_overlap);
    ctx.lineTo(width, hGutter);
    ctx.closePath();
  };
  const mask_path_2 = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(wGutter, height);
    ctx.lineTo(wGutter - shadowWidthOffset - mask_overlap, height);
    ctx.lineTo(
      wGutter - shadowWidthOffset - mask_overlap,
      hGutter - shadowHeightOffset - mask_overlap
    );
    ctx.lineTo(wGutter, hGutter);
    ctx.closePath();
  };
  const g1 = (c1, c2, ctx, reverse) => {
    let gradient = ctx.createLinearGradient(
      wGutter + w,
      hGutter,
      wGutter + w,
      hGutter - shadowHeightOffset
    );
    gradient.addColorStop(0, reverse ? c2 : c1);
    gradient.addColorStop(1, reverse ? c1 : c2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };
  const g2 = (c1, c2, ctx, reverse) => {
    let gradient = ctx.createLinearGradient(
      wGutter,
      hGutter,
      wGutter - shadowWidthOffset,
      hGutter
    );
    gradient.addColorStop(0, reverse ? c2 : c1);
    gradient.addColorStop(1, reverse ? c1 : c2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  mainCtx.fillStyle = "rgba(0,0,0,0.2)";
  shadow_path_1(mainCtx);
  mainCtx.fill();
  shadow_path_2(mainCtx);
  mainCtx.fill();
  blur(mainCtx, 10);

  var img = new Image();
  img.src = aoCanvas.toBuffer();
  mainCtx.drawImage(img, 0, 0);
  const buffer = mainCanvas.toBuffer("image/png");
  return buffer;
};

layouts.forEach((item) => {
  let filepath = path.join(__dirname, DIST_DIR, `${item.name}.png`);
  let imageData = generateShadow(item);
  fs.writeFileSync(filepath, imageData);
  console.log(`shadow generated for ${item.name}: ${path}`);
});

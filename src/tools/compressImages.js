const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminOptipng = require("imagemin-optipng");

console.log("compressing images...");

const MATERIALS = path.join(__dirname, "../assets/materials/*.{jpg,png}");
const SHADOWS = path.join(__dirname, "../assets/shadows/*.{jpg,png}");
const ENVMAPS = path.join(__dirname, "../assets/envMap/*.{jpg,png}");
const DEST = path.join(__dirname, "../assets/dist");

(async () => {
  const files = await imagemin([MATERIALS, SHADOWS, ENVMAPS], {
    destination: DEST,
    plugins: [imageminMozjpeg(), imageminOptipng()],
  });

  console.log(files);
})();

import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import ambiantOcclusionPath from "../../assets/dist/shadow-key-noise.png";
import lightMapPath from "../../assets/materials/white.png";

const loader = new TextureLoader();
const ambiantOcclusionMap = loader.load(ambiantOcclusionPath);
ambiantOcclusionMap.wrapS = THREE.RepeatWrapping;
ambiantOcclusionMap.wrapT = THREE.RepeatWrapping;

const lightMap = loader.load(lightMapPath);
lightMap.wrapS = THREE.RepeatWrapping;
lightMap.wrapT = THREE.RepeatWrapping;

export default (w, h, color) => {
  let geometry;
  let mesh;

  geometry = new THREE.CylinderGeometry(w, w, h, 100);

  let topTexture = createTexture(w, color);
  let top = new THREE.MeshLambertMaterial({
    map: topTexture,
    lightMap: lightMap,
    lightMapIntensity: 0,
  });
  top.map.minFilter = THREE.LinearFilter;

  let side = new THREE.MeshStandardMaterial({
    aoMap: ambiantOcclusionMap,
    color: color,
    aoMapIntensity: 0.4,
    lightMap: lightMap,
    lightMapIntensity: 0,
  });
  let materials = [];

  materials.push(side, top);

  //create mesh
  mesh = new THREE.Mesh(geometry, materials);
  mesh.name = "knob";
  mesh.position.set(0, 0.15, 0);
  return mesh;
};

const createTexture = (w, bg) => {
  const pxPerU = 128;
  let canvas = document.createElement("canvas");
  canvas.height = pxPerU * w;
  canvas.width = pxPerU * w;

  let ctx = canvas.getContext("2d");

  //draw base color
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw gradient to simulate sculpting
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const innerRadius = canvas.height / 2 - 2;
  const outerRadius = canvas.height / 2;
  let gradient;
  gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    innerRadius,
    centerX,
    centerY,
    outerRadius
  );
  gradient.addColorStop(1, "rgba(255,255,255,0.2)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0)");
  gradient.addColorStop(0, "rgba(0,0,0,0.15)");

  //draw gradients
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.CanvasTexture(canvas);

  texture.needsUpdate = true;
  texture.minFilter = THREE.NearestMipmapNearestFilter;
  return texture;
};

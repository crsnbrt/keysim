import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import roughnessMapPath from "../../assets/dist/lightgold_roughness-512.png";
import albedoMapPath from "../../assets/dist/lightgold_albedo-512.png";

export default (w, cm) => {
  let cornerRadius = 0.02;
  let bevel = 0.04;
  let height = 0.2;
  let width = w || 4;
  let depth = 1;
  let geometry;
  let mesh;
  let loader = new TextureLoader();
  let ratio = depth / width;

  //create geometry
  let shape = new THREE.Shape();

  //basic outline
  shape.moveTo(0, cornerRadius);
  shape.quadraticCurveTo(0, 0, cornerRadius, 0);
  shape.lineTo(width - cornerRadius, 0);
  shape.quadraticCurveTo(width, 0, width, cornerRadius);
  shape.lineTo(width, depth - cornerRadius);
  shape.quadraticCurveTo(width, depth, width - cornerRadius, depth);
  shape.lineTo(cornerRadius, depth);
  shape.quadraticCurveTo(0, depth, 0, depth - cornerRadius);
  shape.lineTo(0, cornerRadius);

  let extrudeOptions = {
    depth: height,
    steps: 1,
    bevelSegments: 1,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
  };

  geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
  geometry.faceVertexUvs.push(geometry.faceVertexUvs[0]); //duplicate uvs for ao

  let roughnessMap = loader.load(roughnessMapPath);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.x = ratio;
  roughnessMap.repeat.y = -ratio;

  let albedoMap = loader.load(albedoMapPath);
  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.RepeatWrapping;
  albedoMap.repeat.x = ratio;
  albedoMap.repeat.y = -ratio;

  let material = new THREE.MeshStandardMaterial({
    envMap: cm,
    roughness: 0.05,
    metalness: 0.9,
    map: albedoMap,
  });
  //top face
  let material2 = new THREE.MeshStandardMaterial({
    envMap: cm,
    map: albedoMap,
    metalness: 0.9,
    roughnessMap: roughnessMap,
  });
  let materials = [];

  materials.push(material2, material);

  //create mesh
  mesh = new THREE.Mesh(geometry, materials);
  mesh.name = "badge";
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(0, 0.15, 0);
  return mesh;
};

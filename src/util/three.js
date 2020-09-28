import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export default class ThreeUtil {
  //get place with texture applied
  static getTexturedPlane(tex) {
    let loader = new TextureLoader();
    let texture = loader.load(tex);
    let material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
      map: texture,
      transparent: true,
    });
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(130, 50), material);
    plane.material.side = THREE.DoubleSide;
    return plane;
  }
  //merge geometries of meshes
  static mergeMeshes(meshes) {
    let material = meshes[0].material;
    let combined = new THREE.Geometry();
    for (var i = 0; i < meshes.length; i++) {
      meshes[i].updateMatrix();
      combined.merge(meshes[i].geometry, meshes[i].matrix);
    }
    let mesh = new THREE.Mesh(combined, material);
    mesh.receiveShadow = meshes[i].receiveShadow;
    mesh.castShadow = meshes[i].castShadow;
    return mesh;
  }
  //create a box mesh with a geometry and material
  static createBox(w, h, l, x, y, z, color) {
    var material = new THREE.MeshLambertMaterial({
      color: color || "#666666",
      fog: false,
    });
    var geom = new THREE.BoxGeometry(w || 10, h || 10, l || 10);
    var mesh = new THREE.Mesh(geom, material);
    mesh.position.set(x || 0, y || 0, z || 0);
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    return mesh;
  }
  //creater box from object
  static createBoxOpts(options) {
    return this.createBox(
      options.w,
      options.h,
      options.l,
      options.x,
      options.y,
      options.z,
      options.color
    );
  }

  static getSceneScreenshot(renderer) {
    let data = renderer.domElement.toDataURL();
    let image = document.createElement("img");
    image.src = data;
    let w = window.open("about:blank");
    w.document.write(image.outerHTML);
    w.document.close();
  }
}

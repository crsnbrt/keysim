import * as THREE from "three";
import store from "../../store/store";
import holes from "./holes";

export default (layout, color) => {
  color = color || "#cccccc";
  let cornerRadius = 0;
  let bevel = 0.04;
  let bezel = 0.25;
  let height = 1;
  let width = layout.width + bezel * 2;
  let depth = layout.height + bezel * 2;
  let size = store.getState().case.layout;
  let geometry;
  let mesh;

  //create geometry
  let shape = new THREE.Shape();

  //basic outline
  shape.moveTo(0, cornerRadius);
  shape.lineTo(width - cornerRadius, 0);
  shape.lineTo(width, depth - cornerRadius);
  shape.lineTo(cornerRadius, depth);
  shape.lineTo(0, cornerRadius);

  shape.holes = holes(size, layout, bezel);

  let extrudeOptions = {
    depth: height,
    steps: 1,
    bevelSegments: 1,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
  };

  geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

  for (let i = 0; i < geometry.vertices.length; i++) {
    let v = geometry.vertices[i];
    if (v.z > 0.5 && v.y < 0.7) {
      if (depth > 6) {
        v.z += 0.67;
      } else if (depth > 5) {
        v.z += 0.55;
      } else {
        v.z += 0.5;
      }
    }
  }

  geometry.faceVertexUvs.push(geometry.faceVertexUvs[0]);

  for (let i = 0; i < geometry.faces.length; i++) {
    const f = geometry.faces[i];
    //all faces geneated from the extrusion (side faces)
    if (!f.normal.z) {
      f.materialIndex = 1;
    } else {
      f.materialIndex = 0;
    }
  }

  //create mesh
  mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: color })
  );
  mesh.name = "CASE";
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(-bezel, 0, -bezel);

  return mesh;
};

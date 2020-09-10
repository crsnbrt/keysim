import * as THREE from "three";

const GUTTER = 0.05;
const c = 0.05; //corner inset
const i = 0.15; // inset
const it = 0.05; // inset top edge

//stores geometry for each possible size
var computed_geometries = {};

const lowerCapFace = (geometry, dist, distFront, offset) => {
  distFront = distFront || dist;
  offset = offset || 0;
  geometry.vertices[4].y -= dist;
  geometry.vertices[5].y -= dist + offset;
  geometry.vertices[6].y -= dist + offset;
  geometry.vertices[7].y -= dist;
  geometry.vertices[8].y -= distFront;
  geometry.vertices[9].y -= distFront - offset;
  geometry.vertices[10].y -= distFront - offset;
  geometry.vertices[11].y -= distFront;
  return geometry;
};

//geometry for rectangle key
export const keyGeometry = (opts) => {
  let key = `test${opts.w}${opts.h}${opts.row}`;
  if (computed_geometries[key]) {
    return computed_geometries[key].clone();
  }
  let geometry = new THREE.Geometry();
  let w = (opts.w || 1) - GUTTER;
  let d = opts.h - GUTTER;
  let h = 0.5;

  geometry.vertices.push(
    // bottom verticies
    new THREE.Vector3(0, 0, 0),
    // 0
    new THREE.Vector3(w, 0, 0),
    // 1
    new THREE.Vector3(w, 0, d),
    // 2
    new THREE.Vector3(0, 0, d),
    // 3
    // top for 1
    new THREE.Vector3(i, h, it + c),
    // 4
    new THREE.Vector3(i + c, h, it),
    // 5
    // top for 2
    new THREE.Vector3(w - i - c, h, it),
    // 6
    new THREE.Vector3(w - i, h, it + c),
    // 7
    // top for 3
    new THREE.Vector3(w - i, h, d - i - c),
    // 8
    new THREE.Vector3(w - i - c, h, d - i),
    // 9
    // top for 4
    new THREE.Vector3(i + c, h, d - i),
    // 10
    new THREE.Vector3(i, h, d - i - c) // 11
  );
  geometry.faces.push(
    // top top
    new THREE.Face3(4, 7, 5),
    new THREE.Face3(7, 6, 5),
    // top bottom
    new THREE.Face3(9, 11, 10),
    new THREE.Face3(9, 8, 11),
    // top center
    new THREE.Face3(4, 11, 7),
    new THREE.Face3(8, 7, 11),
    // corner faces
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(1, 6, 7),
    new THREE.Face3(2, 8, 9),
    new THREE.Face3(3, 10, 11),
    // back side
    new THREE.Face3(0, 5, 1),
    // 10
    new THREE.Face3(1, 5, 6),
    // 11
    // right side
    new THREE.Face3(2, 7, 8),
    new THREE.Face3(2, 1, 7),
    // left side
    new THREE.Face3(0, 3, 11),
    new THREE.Face3(0, 11, 4),
    // front side
    new THREE.Face3(3, 2, 9),
    new THREE.Face3(3, 9, 10)
  );
  geometry.faceVertexUvs[0].push(
    // top top
    [
      new THREE.Vector2(0, 1 - c),
      new THREE.Vector2(1, 1 - c),
      new THREE.Vector2(c, 1),
    ],
    // 4 7 5
    [
      new THREE.Vector2(1, 1 - c),
      new THREE.Vector2(1 - c, 1),
      new THREE.Vector2(c, 1),
    ],
    // 7 6 5
    // top bottom
    [
      new THREE.Vector2(1 - c, 0),
      new THREE.Vector2(0, c),
      new THREE.Vector2(c, 0),
    ],
    // 9 11 10
    [
      new THREE.Vector2(1 - c, 0),
      new THREE.Vector2(1, c),
      new THREE.Vector2(0, c),
    ],
    // 9 8 11
    // top center
    [
      new THREE.Vector2(0, 1 - c),
      new THREE.Vector2(0, c),
      new THREE.Vector2(1, 1 - c),
    ],
    // 4 11 7
    [
      new THREE.Vector2(1, c),
      new THREE.Vector2(1, 1 - c),
      new THREE.Vector2(0, c),
    ],
    // 8 7 11
    // corners
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    // back
    [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 0)],
    // 0, 5, 1
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    // 1, 5, 6
    // right
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    // 2, 7, 8
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    // 2, 1, 7
    // left
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    // 0, 3, 11
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    // 0, 11, 4
    // front
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    // 3, 2, 9
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)] // 3, 9, 10
  );
  geometry.faceVertexUvs.push(geometry.faceVertexUvs[0]);

  // geometry.faceVertexUvs[1][16] = [ new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0) ]
  // geometry.faceVertexUvs[1][16] = [ new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0) ]

  // angle top faces for profile
  // if (opts.row === 1) {
  //   geometry = lowerCapFace(geometry, -0.05);
  // }
  // if (opts.row === 2) {
  //   geometry = lowerCapFace(geometry, 0.1);
  // }
  // if (opts.row === 3) {
  //   geometry = lowerCapFace(geometry, 0.2, 0.1, 0.007);
  // }
  // if (opts.row === 4) {
  //   geometry = lowerCapFace(geometry, 0.15, 0.01, 0.01);
  // }

  // angle top faces for profile
  if (opts.h === 2 && opts.w < 1.25) {
    geometry = lowerCapFace(geometry, 0.1);
  }
  if (opts.row === 1) {
    geometry = lowerCapFace(geometry, -0.05);
  }
  if (opts.row === 2 && opts.h !== 2) {
    geometry = lowerCapFace(geometry, 0.1);
  }
  if (opts.row === 3 && opts.h !== 2) {
    geometry = lowerCapFace(geometry, 0.1);
    geometry.rotateX(-0.1);
    geometry.translate(0, -0.1, 0);
  }
  if (opts.row === 4 && opts.h !== 2) {
    geometry.rotateX(-0.2);
    geometry.translate(0, -0.19, 0);
  }
  geometry.computeFaceNormals();
  computed_geometries[key] = geometry;
  return geometry;
};

// geometry for enter key
export const keyGeometryISOEnter = (opts) => {
  if (computed_geometries["isoent"]) {
    return computed_geometries["isoent"].clone();
  }
  let geometry = new THREE.Geometry();
  let w = (opts.w || 1) - GUTTER;
  let d = opts.h - GUTTER;
  let h = 0.4;

  // extra with of top
  let o = 0.25;

  geometry.vertices.push(
    // bottom verticies
    new THREE.Vector3(-o, 0, 0),
    // 0
    new THREE.Vector3(w, 0, 0),
    // 1
    new THREE.Vector3(w, 0, d),
    // 2
    new THREE.Vector3(0, 0, d),
    // 3
    new THREE.Vector3(0, 0, 1),
    // 4
    new THREE.Vector3(-o, 0, 1),
    // 5
    // top for 0
    new THREE.Vector3(i - o, h, it + c),
    // 6
    new THREE.Vector3(i + c - o, h, it),
    // 7
    // top for 1
    new THREE.Vector3(w - i - c, h, it),
    // 8
    new THREE.Vector3(w - i, h, it + c),
    // 9
    // top for 2
    new THREE.Vector3(w - i, h, d - i - c),
    // 10
    new THREE.Vector3(w - i - c, h, d - i),
    // 11
    // top for 3
    new THREE.Vector3(i + c, h, d - i),
    // 12
    new THREE.Vector3(i, h, d - i - c),
    // 13
    // top for 4 (inside corner)
    new THREE.Vector3(i, h, 1 - i),
    // 14
    new THREE.Vector3(i - c, h, 1 - i),
    // 15
    // top for 5
    new THREE.Vector3(i + c - o, h, 1 - i),
    // 16
    new THREE.Vector3(i - o, h, 1 - i - c) // 17
  );
  geometry.faces.push(
    // top
    new THREE.Face3(6, 9, 7),
    new THREE.Face3(7, 9, 8),
    new THREE.Face3(6, 17, 15),
    new THREE.Face3(17, 16, 15),
    new THREE.Face3(6, 15, 9),
    new THREE.Face3(15, 14, 9),
    new THREE.Face3(14, 10, 9),
    new THREE.Face3(14, 13, 10),
    new THREE.Face3(13, 11, 10),
    new THREE.Face3(13, 12, 11),
    // corners
    new THREE.Face3(0, 6, 7),
    new THREE.Face3(1, 8, 9),
    new THREE.Face3(2, 10, 11),
    new THREE.Face3(3, 12, 13),
    new THREE.Face3(4, 14, 15),
    new THREE.Face3(5, 16, 17),
    // sides
    new THREE.Face3(0, 7, 8),
    new THREE.Face3(0, 8, 1),
    new THREE.Face3(9, 10, 2),
    new THREE.Face3(9, 2, 1),
    new THREE.Face3(3, 2, 11),
    new THREE.Face3(3, 11, 12),
    new THREE.Face3(4, 3, 13),
    new THREE.Face3(4, 13, 14),
    new THREE.Face3(5, 4, 15),
    new THREE.Face3(5, 15, 16),
    new THREE.Face3(0, 5, 17),
    new THREE.Face3(0, 17, 6)
  );

  let uxo = 0.2;
  let uyo = 0.35;
  geometry.faceVertexUvs[0].push(
    //top
    [
      new THREE.Vector2(0, 1 - c), //6
      new THREE.Vector2(1, 1 - c), //9
      new THREE.Vector2(c, 1), //7
    ],
    [
      new THREE.Vector2(c, 1), //7
      new THREE.Vector2(1, 1 - c), //9
      new THREE.Vector2(1 - c, 1), //8
    ],
    [
      new THREE.Vector2(0, 1 - c), //6
      new THREE.Vector2(0, uyo + c), //17
      new THREE.Vector2(uxo - c, uyo), //15
    ],
    [
      new THREE.Vector2(0, uyo + c), //17
      new THREE.Vector2(c, uyo), //16
      new THREE.Vector2(uxo - c, uyo), //15
    ],
    [
      new THREE.Vector2(0, 1 - c), //6
      new THREE.Vector2(uxo - c, uyo), //15
      new THREE.Vector2(1, 1 - c), //9
    ],
    [
      new THREE.Vector2(uxo - c, uyo), //15
      new THREE.Vector2(uxo, uyo), //14
      new THREE.Vector2(1, 1 - c), //9
    ],
    [
      new THREE.Vector2(uxo, uyo), //14
      new THREE.Vector2(1, c), //10
      new THREE.Vector2(1, 1 - c), //9
    ],
    [
      new THREE.Vector2(uxo, uyo), //14
      new THREE.Vector2(uxo, c), //13
      new THREE.Vector2(1, c), //10
    ],
    [
      new THREE.Vector2(uxo, c), //13
      new THREE.Vector2(1 - c, 0), //11
      new THREE.Vector2(1, c), //10
    ],
    [
      new THREE.Vector2(uxo, c), //13
      new THREE.Vector2(uxo + c, 0), //12
      new THREE.Vector2(1 - c, 0), //11
    ],
    //corners
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0)],
    // sides
    [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    [new THREE.Vector2(1, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(1, 1), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)],
    [new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)]
  );

  geometry.faceVertexUvs.push(geometry.faceVertexUvs[0]);
  geometry.computeFaceNormals();
  computed_geometries["isoent"] = geometry;
  return geometry;
};

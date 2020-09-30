import * as THREE from "three";

const getSquarePath = (startx, starty, w, h, gutter) => {
  gutter = gutter || 0;
  startx = startx - gutter;
  starty = starty - gutter;
  w = (w || 1) + gutter * 2;
  h = (h || 1) + gutter * 2;
  let path = new THREE.Path();
  path.moveTo(startx, starty);
  path.lineTo(startx + w, starty);
  path.lineTo(startx + w, starty + h);
  path.lineTo(startx, starty + h);
  path.lineTo(startx, starty);
  return path;
};

const getPathFromPoints = (startx, starty, points) => {
  let path = new THREE.Path();
  path.moveTo(startx, starty);
  for (let i = 0; i < points.length; i++) {
    path.lineTo(
      path.currentPoint.x + points[i].x,
      path.currentPoint.y + points[i].y
    );
  }
  return path;
};

const getPathEsc = (sx, sy, gutter) => {
  return getSquarePath(sx, sy, 1, 1, gutter);
};
const getPathF1 = (sx, sy, gutter) => {
  return getSquarePath(sx, sy, 4, 1, gutter);
};
const getPathF5 = (sx, sy, gutter) => {
  return getSquarePath(sx, sy, 4, 1, gutter);
};
const getPathF9 = (sx, sy, gutter) => {
  return getSquarePath(sx, sy, 4, 1, gutter);
};
const getPathNav = (sx, sy, gutter) => {
  return getSquarePath(sx, sy, 3, 2, gutter);
};
const getPathArrows = (sx, sy, gutter) => {
  gutter = gutter || 0;
  return getPathFromPoints(sx - gutter, sy + gutter, [
    { x: 0, y: -1 - gutter * 2 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 1 + gutter * 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 + gutter * 2 },
    { x: -3 - gutter * 2, y: 0 },
  ]);
};

export default (layoutName, layoutJson, bezel) => {
  let holes = [];
  let gutter = 0.05;
  let w = layoutJson.width;
  let h = layoutJson.height;
  let sx = bezel; //start x
  let sy = bezel; //start y

  let esc = getPathEsc(sx, sy, gutter);
  let f1 = getPathF1(sx + 2, sy, gutter);
  let f5 = getPathF5(sx + 6.5, sy, gutter);
  let f9 = getPathF9(sx + 11, sy, gutter);
  let nav = getPathNav(sx + 15.25, sy + 1.25, gutter);
  let arrows = getPathArrows(sx + 15.25, sy + 6.2, gutter);

  switch (layoutName) {
    case "100":
      holes.push(esc, f1, f5, f9, nav, arrows);
      holes.push(getSquarePath(sx, sy + 1.25, 15, 5, gutter));
      holes.push(getSquarePath(sx + 18.5, sy + 1.25, 4, 5, gutter)); //100% numpad
      break;
    case "95":
      holes.push(
        getPathEsc(sx, sy, gutter),
        getPathF1(sx + 1.25, sy, gutter),
        getPathF5(sx + 5.5, sy, gutter),
        getPathF9(sx + 9.75, sy, gutter),
        getPathArrows(sx + 13.25, sy + 6.4, gutter),
        getPathFromPoints(sx + 15.5, sy + 1.25, [
          { x: 4, y: 0 },
          { x: 0, y: 5 },
          { x: -3, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
          { x: 0, y: -4 },
        ]),
        getPathFromPoints(sx, sy + 1.25, [
          { x: 15, y: 0 },
          { x: 0, y: 3 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: -13, y: 0 },
          { x: 0, y: -5 },
        ])
      );
      break;
    case "80":
      holes.push(esc, f1, f5, f9, nav, arrows);
      holes.push(getSquarePath(sx, sy + 1.25, 15, 5, gutter));
      break;
    case "65":
      holes.push(
        getPathFromPoints(sx - gutter, sy - gutter, [
          { x: w + gutter * 2, y: 0 },
          { x: 0, y: h + gutter * 2 },
          { x: -3 - gutter * 2, y: 0 },
          { x: 0, y: -1 },
          { x: -0.5 + gutter * 2, y: 0 },
          { x: 0, y: 1 },
          { x: -(w - 3.5) - gutter * 2, y: 0 },
          { x: 0, y: -h - gutter * 2 },
        ])
      );
      break;
    case "60hhkb":
      holes.push(
        getPathFromPoints(sx - gutter, sy - gutter, [
          { x: 15 + gutter * 2, y: 0 },
          { x: 0, y: 4 + gutter * 2 },
          { x: -2.5, y: 0 },
          { x: 0, y: 1 },
          { x: -11.25 - gutter * 2, y: 0 },
          { x: 0, y: -1 },
          { x: -1.25, y: 0 },
          { x: 0, y: -4 - gutter * 2 },
        ])
      );
      break;
    case "60wkl":
      holes.push(
        getPathFromPoints(sx, sy, [
          { x: 15, y: 0 },
          { x: 0, y: 5 },
          { x: -1.25, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: -10.5, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: -1.25, y: 0 },
          { x: 0, y: -5 },
        ])
      );
      break;
    case "numpad":
      holes.push(
        getSquarePath(sx, sy, 4, 1, gutter),
        getSquarePath(sx, sy + 1.25, 4, 5, gutter)
      );
      break;
    default:
      holes.push(getSquarePath(sx, sy, w, h, gutter));
      break;
  }
  return holes;
};

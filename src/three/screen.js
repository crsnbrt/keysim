import * as THREE from "three";
import store from "../store/store";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

export default class Screen {
  constructor(options) {
    this.el = document.getElementById("screen");
    this.h = this.el.clientHeight || 450;
    this.w = this.el.clientWidth || 800;
    this.scene = options.scene;
    this.scale = options.scale;
    this.el = options.el;
    this.debug = false;
    this.setup();
  }

  setup() {
    //container for screen, light, body/stand mesh
    this.monitor = new THREE.Object3D();
    this.setupGlow();

    let bezel = 0.25;
    let thickness = 1;
    let distAboveDesk = 4;
    let setBackDistance = 9;
    let uw = this.w / this.scale;
    let uh = this.h / this.scale;
    let w = uw + bezel * 2;
    let h = uh + bezel * 2;
    let r = 0.4;

    //body
    let shape = new THREE.Shape();
    shape.moveTo(0, r);
    shape.quadraticCurveTo(0, 0, r, 0);
    shape.lineTo(w - r, 0);
    shape.quadraticCurveTo(w, 0, w, r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(r, h);
    shape.quadraticCurveTo(0, h, 0, h - r);
    shape.lineTo(0, r);
    let extrudeOptions = {
      bevelEnabled: true,
      bevelSegments: 1,
      bevelOffset: 0,
      bevelSize: 0.08,
      bevelThickness: 0.05,
      depth: thickness,
      steps: 1,
    };
    let geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    let material = new THREE.MeshStandardMaterial({
      color: "#cccccc",
      roughness: 0.8,
      metalness: 0.3,
    });
    let body = new THREE.Mesh(geometry, material);
    body.position.y -= h / 2;
    body.position.x -= w / 2;

    //stand
    let standWidth = uw * 0.25;
    let sr = 0.08;
    let baseWidth = 10;
    let baseHeight = 0.5;
    let armWidth = 0.5;
    let armHeight = 10;
    let armBack = baseWidth / 2 + armWidth / 2;
    let armFront = baseWidth / 2 - armWidth / 2;
    let standShape = new THREE.Shape();
    standShape.moveTo(0, sr);
    standShape.quadraticCurveTo(0, 0, sr, 0);
    standShape.lineTo(baseWidth - sr, 0);
    standShape.quadraticCurveTo(baseWidth, 0, baseWidth, sr);
    standShape.lineTo(baseWidth, baseHeight - sr);
    standShape.quadraticCurveTo(
      baseWidth,
      baseHeight,
      baseWidth - sr,
      baseHeight
    );
    standShape.lineTo(armBack + sr, baseHeight);
    standShape.quadraticCurveTo(armBack, baseHeight, armBack, baseHeight + sr);
    standShape.lineTo(armBack, armHeight);
    standShape.lineTo(armFront, armHeight);
    standShape.lineTo(armFront, baseHeight + sr);
    standShape.quadraticCurveTo(
      armFront,
      baseHeight,
      armFront - sr,
      baseHeight
    );
    standShape.lineTo(sr, baseHeight);
    standShape.quadraticCurveTo(0, baseHeight, 0, baseHeight - sr);
    standShape.lineTo(0, sr);
    let standExtrudeOptions = {
      bevelEnabled: true,
      bevelSegments: 1,
      bevelOffset: 0,
      bevelSize: 0.08,
      bevelThickness: 0.05,
      depth: standWidth,
      steps: 1,
    };
    let standGeometry = new THREE.ExtrudeGeometry(
      standShape,
      standExtrudeOptions
    );
    let stand = new THREE.Mesh(standGeometry, material);
    stand.rotation.y = Math.PI / 2;
    stand.position.x -= standWidth / 2;
    stand.position.z = -setBackDistance + baseWidth / 2;

    //this.scene.add(stand);

    //dom element for the screen
    let element = document.getElementById("screen");
    element.remove();
    this.display = new CSS3DObject(element);
    this.display.position.y =
      this.h / 2 + distAboveDesk * this.scale - bezel * this.scale;
    this.display.position.z =
      -(setBackDistance * this.scale) + this.scale * (thickness + 0.2);

    this.monitor.add(body);
    this.monitor.add(this.display);
    this.monitor.position.set(0, uh / 2 + distAboveDesk, -setBackDistance);
    this.scene.add(this.monitor);

    store.subscribe(() => {
      let state = store.getState();
      this.setGlowColor(state.settings.activeWindowColor);
    });
  }

  setupGlow() {
    //glow light
    RectAreaLightUniformsLib.init();
    this.glow = new THREE.RectAreaLight("#ffffff", 0.4, this.w, this.h);
    this.glow.rotateY(Math.PI);
    this.glow.position.set(0, 0, 1);
    //add debugging mesh
    if (this.debug) {
      var lightMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(),
        new THREE.MeshBasicMaterial({ side: THREE.BackSide })
      );
      var lightMeshBack = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(),
        new THREE.MeshBasicMaterial({ color: "#080808" })
      );
      lightMesh.scale.x = this.glow.width;
      lightMesh.scale.y = this.glow.height;
      lightMesh.add(lightMeshBack);
      this.glow.add(lightMesh);
    }

    this.monitor.add(this.glow);
  }

  setGlowColor(color) {
    color = color || "#ffffff";
    this.glow.color.set(color);
  }
}

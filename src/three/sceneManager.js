import * as THREE from "three";
import Collection from "./collection";
import { subscribe } from "redux-subscriber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { enableHighlight, disableHighlight } from "./key/materials";
import ThreeUtil from "../util/three";
//import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class SceneManager extends Collection {
  constructor(options) {
    super();
    this.takeScreenshot = false;
    this.options = options || {};
    this.editing = false;
    this.scale = options.scale || 1;
    this.textureLoader = new THREE.TextureLoader();
    this.el = options.el || document.body;
    this.init();
  }
  init() {
    this.scene = new THREE.Scene();
    //main renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      logarithmicDepthBuffer: true,
      antialias: true,
    });
    this.renderer.localClippingEnabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.el.appendChild(this.renderer.domElement);
    //css renderer for dom elements in the scene
    // this.cssRenderer = new CSS3DRenderer();
    // this.el.appendChild(this.cssRenderer.domElement);

    //main setup
    this.setupCamera();
    this.setupControls();
    this.setupLights();
    this.resize();

    //mouse and raycaster
    this.mouse = new THREE.Vector2(-1000, -1000);
    this.raycaster = new THREE.Raycaster();
    this.raycaster.layers.set(1);

    //bind global events
    window.addEventListener("resize", (e) => this.resize(e), false);
    this.el.addEventListener("mousemove", (e) => this.move(e), false);
    this.el.addEventListener("click", (e) => this.mouseClick(e), false);
    this.el.addEventListener(
      "touchstart",
      (e) => {
        this.move(e);
        this.mouseClick(e);
      },
      false
    );
    document.addEventListener(
      "screenshot",
      () => {
        this.takeScreenshot = true;
      },
      false
    );

    //some helpers for reading and setting orbit controls position / taking screenshots
    document.addEventListener("keydown", (e) => {
      if (e.key === "F1") {
        console.log("Camera Position:");
        console.log(this.camera.position);
        console.log("Controls Target:");
        console.log(this.controls.target);
      }
      if (e.key === "F2") {
        this.camera.position.set(-7, 8, 9);
        this.controls.target.set(-3, -2, 1);
      }
      if (e.key === "F3") {
        this.takeScreenshot = true;
      }
    });

    subscribe("colorways.editing", (state) => {
      this.editing = state.colorways.editing;
    });
  }
  get w() {
    return this.el.offsetWidth;
  }
  get h() {
    return this.el.offsetHeight;
  }
  get sidebarWidth() {
    let sb = document.getElementById("sidebar");
    return sb ? sb.offsetWidth : 0;
  }
  resize() {
    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.w, this.h);
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 1000);
    this.camera.position.y = 15;
    this.camera.position.z = 15;
    this.camera.position.x = 0;
  }
  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = (Math.PI / 20) * 9.7;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableKeys = false;
    this.controls.maxDistance = 40;
    this.controls.target = new THREE.Vector3(0, 0, 0);
  }
  setupLights() {
    let ambiant = new THREE.AmbientLight("#ffffff", 0.5);
    this.scene.add(ambiant);

    //main
    let primaryLight = new THREE.DirectionalLight("#dddddd", 0.7);
    primaryLight.position.set(5, 10, 10);
    primaryLight.target.position.set(0, -10, -10);
    primaryLight.target.updateMatrixWorld();
    this.scene.add(primaryLight, primaryLight.target);

    //secondary shadows
    let shadowLight = new THREE.DirectionalLight("#FFFFFF", 0.2);
    shadowLight.position.set(-4, 3, -10);
    shadowLight.target.position.set(0, 0, 0);
    shadowLight.target.updateMatrixWorld();
    this.scene.add(shadowLight, shadowLight.target);

    //lighthelpers
    // let slh = new THREE.DirectionalLightHelper(shadowLight, 2);
    // let plh = new THREE.DirectionalLightHelper(primaryLight, 2);
    // slh.update();
    // plh.update();
    // this.scene.add(slh, plh);
  }
  mouseClick(e) {
    if (!this.editing) return;
    if (this.intersectedObj) {
      let event = new CustomEvent("key_painted", {
        detail: this.intersectedObj.name,
      });
      document.dispatchEvent(event);
    }
  }
  move(e) {
    e.preventDefault();
    let isTouch = e.type === "touchstart";
    let l = (isTouch ? e.touches[0].clientX : e.clientX) - this.sidebarWidth;
    let t = (isTouch ? e.touches[0].clientY : e.clientY) - 0;
    this.mouse.x = (l / this.w) * 2 - 1;
    this.mouse.y = -(t / this.h) * 2 + 1;
  }
  deactivateIntersection() {
    if (!this.intersectedObj) return;
    disableHighlight(this.intersectedObj);
    this.intersectedObj = undefined;
  }
  activateIntersection(obj) {
    document.body.classList.add("intersecting-key");
    this.isIntersecting = true;
    this.intersectedObj = obj;
    if (this.editing) enableHighlight(obj);
  }
  checkIntersections() {
    let intersects = this.raycaster.intersectObjects(this.scene.children, true);
    //no intersections
    if (!intersects.length) {
      this.isIntersecting = false;
      this.deactivateIntersection();
      document.body.classList.remove("intersecting-key");
      return;
    }
    //same obj dont do anything
    if (this.intersectedObj === intersects[0].object) return;
    //reset old object
    this.deactivateIntersection();
    //not a valid obj
    let ignored = intersects[0]?.object.name === "IGNORE";
    if (ignored) return;
    //activate new obj
    this.activateIntersection(intersects[0].object);
  }
  render() {
    this.update();
    this.controls.update();
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.checkIntersections();
    this.renderer.render(this.scene, this.camera);
    // let x = this.camera.position.x;
    // let y = this.camera.position.y;
    // let z = this.camera.position.z;
    //this.camera.position.multiplyScalar(this.scale);
    //this.cssRenderer.render(this.scene, this.camera);
    //this.camera.position.set(x, y, z);
  }
  tick() {
    this.render();
    if (this.takeScreenshot) {
      ThreeUtil.getSceneScreenshot(this.renderer);
      this.takeScreenshot = false;
    }
    requestAnimationFrame(this.tick.bind(this));
  }
}

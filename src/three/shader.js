import * as THREE from "three";

class Shader {
  constructor(opts) {
    opts = opts || {};
    this.u_time = { type: "f", value: 1.0 };
    this.u_mouse = { type: "v2", value: new THREE.Vector2() };
    this.u_resolution = { type: "v2", value: new THREE.Vector2() };
    this.time_increment = opts.time_increment || 0.05;
    this.frag =
      opts.frag || document.getElementById("fragmentShader").textContent;
    this.vert =
      opts.vert || document.getElementById("vertexShader").textContent;
  }
  //return an object for a three shader material
  get materialOptions() {
    return {
      uniforms: {
        u_time: this.u_time,
        u_mouse: this.u_mouse,
        u_resolution: this.u_resolution,
      },
      vertexShader: this.vert,
      fragmentShader: this.frag,
    };
  }
  updateMouse(x, y) {
    this.u_mouse.value.x = x;
    this.u_mouse.value.y = y;
  }
  updateResolution(w, h) {
    w = w || window.innerWidth;
    h = h || window.innerHeight;
    this.u_resolution.value.x = w;
    this.u_resolution.value.y = h;
  }
  updateTime(factor) {
    factor = factor || 1;
    this.u_time.value += this.time_increment * factor;
  }
}

export default Shader;

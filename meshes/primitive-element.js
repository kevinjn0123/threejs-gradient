import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/flower.js"

const uniforms = {
  time: {
    type: "f",
    value: 1.0,
  },
  pointscale: {
    type: "f",
    value: 1.0,
  },
  decay: {
    type: "f",
    value: 2.0,
  },
  complex: {
    type: "f",
    value: 2.0,
  },
  waves: {
    type: "f",
    value: 3.0,
  },
  eqcolor: {
    type: "f",
    value: 3.0,
  },
  fragment: {
    type: "i",
    value: false,
  },
  dnoise: {
    type: "f",
    value: 0.0,
  },
  qnoise: {
    type: "f",
    value: 4.0,
  },
  r_color: {
    type: "f",
    value: 0.0,
  },
  g_color: {
    type: "f",
    value: 0.0,
  },
  b_color: {
    type: "f",
    value: 0.0,
  },
}

export const primitiveElement = function () {
  this.mesh = new THREE.Object3D()
  const geo = new THREE.IcosahedronGeometry(1, 6)
  //const mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
  const mat = new THREE.ShaderMaterial({
    wireframe: false,
    uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  })
  const mesh = new THREE.Mesh(geo, mat)
  //---
  this.mesh.add(mesh)
}

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import {
  vertexShader,
  fragmentShader,
} from "../shaders/moving-gradient/index.js"
import { CustomMat } from "./utils.js"

const settings = {
  strength: 2.0,
}

const gui = new dat.GUI()

const folder1 = gui.addFolder("Noise")
folder1.add(settings, "strength", 0, 20, 0.01)

export const vertices = [
  {
    x: 0.2,
    y: 0.2,
    color: new THREE.Color("hsl(20, 100%, 71%)"),
  },
  {
    x: 0.8,
    y: 0.2,
    color: new THREE.Color("hsl(40, 100%, 71%)"),
  },
  {
    x: 0.2,
    y: 0.8,
    color: new THREE.Color("hsl(200, 100%, 71%)"),
  },
  {
    x: 0.8,
    y: 0.8,
    color: new THREE.Color("hsl(140, 100%, 65%)"),
  },
]

export const sphereElement = function () {
  this.settings = settings

  const material = CustomMat("textures/texture-3.jpg", {
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uNoiseStrength: { value: settings.strength },
      texture1: { type: "t", value: null },
      scale: { type: "f", value: 1.0 },

      vertices: { value: vertices },
      resolution: { value: new THREE.Vector2(400, 400) },
    },
  })

  const geometry = new THREE.SphereGeometry(1, 80, 80)
  this.mesh = new THREE.Mesh(geometry, material)
}

export const planeElement = function () {
  this.settings = settings

  const material = CustomMat("textures/texture-2.jpg", {
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uNoiseStrength: { value: settings.strength },
      texture1: { type: "t", value: null },
      scale: { type: "f", value: 1.0 },

      vertices: { value: vertices },
      resolution: { value: new THREE.Vector2(400, 400) },
    },
  })

  const geometry = new THREE.PlaneGeometry(20, 20, 100, 100)
  this.mesh = new THREE.Mesh(geometry, material)
}

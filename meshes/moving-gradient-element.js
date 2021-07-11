import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import {
  vertexShader,
  fragmentShader,
} from "../shaders/moving-gradient/index.js"
import { CustomMat } from "./utils.js"
import { getVertices } from "./consts.js"

const settings = {
  strength: 2.0,
}
const points = {
  point_1_x: 0.2,
  point_1_y: 0.2,
  point_2_x: 0.8,
  point_2_y: 0.2,
  point_3_x: 0.2,
  point_3_y: 0.8,
  point_4_x: 0.8,
  point_4_y: 0.8,
}

const gui = new dat.GUI()

const folder1 = gui.addFolder("Noise")
folder1.add(settings, "strength", 0, 20, 0.01)
const folder2 = gui.addFolder("Points")
folder2.add(points, "point_1_x", 0, 1, 0.01)
folder2.add(points, "point_1_y", 0, 1, 0.01)
folder2.add(points, "point_2_x", 0, 1, 0.01)
folder2.add(points, "point_2_y", 0, 1, 0.01)
folder2.add(points, "point_3_x", 0, 1, 0.01)
folder2.add(points, "point_3_y", 0, 1, 0.01)
folder2.add(points, "point_4_x", 0, 1, 0.01)
folder2.add(points, "point_4_y", 0, 1, 0.01)

const material = CustomMat("textures/texture-3.jpg", {
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uNoiseStrength: { value: settings.strength },
    texture1: { type: "t", value: null },
    scale: { type: "f", value: 1.0 },

    vertices: { value: getVertices(points) },
    resolution: { value: new THREE.Vector2(400, 400) },
  },
})

export const sphereElement = function () {
  this.settings = settings
  this.points = points

  const geometry = new THREE.SphereGeometry(1, 80, 80)
  this.mesh = new THREE.Mesh(geometry, material)
}

export const planeElement = function () {
  this.settings = settings
  this.points = points

  const geometry = new THREE.PlaneGeometry(20, 20, 2, 100)
  this.mesh = new THREE.Mesh(geometry, material)
}

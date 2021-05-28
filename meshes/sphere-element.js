import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/spheres.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
}
const gui = new dat.GUI()
gui.add(settings, "speed", 0.1, 1, 0.01)
gui.add(settings, "density", 0, 10, 0.01)
gui.add(settings, "strength", 0, 2, 0.01)

export const sphereElement = function () {
  const geometry = new THREE.IcosahedronBufferGeometry(1, 64)
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
    },
    wireframe: true,
  })
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

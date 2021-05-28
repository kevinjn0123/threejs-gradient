import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/spheres.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 6.0,
}
const gui = new dat.GUI()

const folder1 = gui.addFolder("Noise")
const folder2 = gui.addFolder("Rotation")
folder1.add(settings, "speed", 0.1, 1, 0.01)
folder1.add(settings, "density", 0, 10, 0.01)
folder1.add(settings, "strength", 0, 2, 0.01)
folder2.add(settings, "frequency", 0, 10, 0.1)
folder2.add(settings, "amplitude", 0, 10, 0.1)

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
      uFrequency: { value: settings.frequency },
      uAmplitude: { value: settings.amplitude },
    },
    wireframe: true,
  })
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

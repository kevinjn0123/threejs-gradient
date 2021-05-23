import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/spheres.js"

// TODO: add dat GUI or https://github.com/pmndrs/leva
const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
}

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

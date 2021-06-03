import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
// import { vertexShader, fragmentShader } from "../shaders/planes.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import { vertexShader, fragmentShader } from "../shaders/plane/index.js"

// TODO: add dat GUI or https://github.com/pmndrs/leva
// const settings = {
//   speed: 0.2,
//   density: 1.5,
//   strength: 0.5,
// }
const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 1.8,
  frequency: 3.0,
  amplitude: 6.0,
  intensity: 7.0,
  color1r: 0.5,
  color1g: 0.5,
  color1b: 0.5,
  color2r: 0.5,
  color2g: 0.5,
  color2b: 0.5,
}
const gui = new dat.GUI()

const folder1 = gui.addFolder("Noise")
const folder2 = gui.addFolder("Rotation")
const folder3 = gui.addFolder("ColorInt")
const folder4 = gui.addFolder("Color")
folder1.add(settings, "speed", 0.1, 1, 0.01)
folder1.add(settings, "density", 0, 10, 0.01)
folder1.add(settings, "strength", 0, 2, 0.01)
folder2.add(settings, "frequency", 0, 10, 0.1)
folder2.add(settings, "amplitude", 0, 10, 0.1)
folder3.add(settings, "intensity", 0, 10, 0.1)
folder4.add(settings, "color1r", 0, 1, 0.01)
folder4.add(settings, "color1g", 0, 1, 0.01)
folder4.add(settings, "color1b", 0, 1, 0.01)
folder4.add(settings, "color2r", 0, 1, 0.01)
folder4.add(settings, "color2g", 0, 1, 0.01)
folder4.add(settings, "color2b", 0, 1, 0.01)

export const planeElement = function () {
  //   const geometry = new THREE.PlaneGeometry(3,3,50,50)

  const geometry = new THREE.BufferGeometry()

  const indices = []

  const vertices = []
  const normals = []
  const colors = []

  const size = 5
  const segments = 50

  const halfSize = size / 2
  const segmentSize = size / segments

  // generate vertices, normals and color data for a simple grid geometry

  for (let i = 0; i <= segments; i++) {
    const y = i * segmentSize - halfSize

    for (let j = 0; j <= segments; j++) {
      const x = j * segmentSize - halfSize

      vertices.push(x, -y, 0)
      normals.push(0, 0, 1)

      const r = x / size + 0.5
      const g = y / size + 0.5

      colors.push(r, g, 1)
    }
  }

  // generate indices (data for element array buffer)

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + (j + 1)
      const b = i * (segments + 1) + j
      const c = (i + 1) * (segments + 1) + j
      const d = (i + 1) * (segments + 1) + (j + 1)

      // generate two faces (triangles) per iteration

      indices.push(a, b, d) // face one
      indices.push(b, c, d) // face two
    }
  }

  //

  geometry.setIndex(indices)
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  )
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      uNoiseDensity: { value: settings.density },
      uNoiseStrength: { value: settings.strength },
      uFrequency: { value: settings.frequency },
      uIntensity: { value: settings.intensity },
      resolution: { value: new THREE.Vector3() },
    },
    wireframe: false,
  })
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

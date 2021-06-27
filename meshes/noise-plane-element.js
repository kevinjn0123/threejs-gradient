import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import { vertexShader, fragmentShader } from "../shaders/noise/index.js"

// TODO: add dat GUI or https://github.com/pmndrs/leva

// const settings = {
//   speed: 0.2,
//   density: 1.5,
//   strength: 1.0,
//   frequency: 3.0,
//   amplitude: 6.0,
//   mesh: 50,
//   color1r: 0.8,
//   color1g: 0.3,
//   color1b: 0.43,
//   color2r: 0.1,
//   color2g: 0.5,
//   color2b: 1.0,
//   color3r: 0.6,
//   color3g: 0.71,
//   color3b: 0.56,
// }
// const gui = new dat.GUI()

// const folder1 = gui.addFolder("Settings")

// folder1.add(settings, "u_resolution", 0.1, 1, 0.01)
// folder1.add(settings, "u_pixelDensity", 0, 10, 0.01)
// folder1.add(settings, "strength", 0, 2, 0.01)


export const noisePlaneElement = function () {

  const geometry = new THREE.BufferGeometry()

  const indices = []

  const vertices = []
  const normals = []
  const colors = []

  const size = 5
  const segments = settings.mesh

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





var uniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib["ambient"],
  THREE.UniformsLib["lights"],
  THREE.UniformsUtils.clone(THREE.ShaderLib.phong.uniforms),
  {
    diffuse: {
      type: "c",
      value: new THREE.Color(0xff00ff)
    },
    dirSpecularWeight: {
      type: "v3",
      value: new THREE.Vector3(1, 9, 1)
    },
    time: {
      type: "f",
      value: 0.0
    }
  }, {
        emissive: { value: new THREE.Color( 0x000000 ) },
        roughness: { value: 0.5 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 },
        uTime: { value: 0 },
        uSpeed: { value: settings.speed },
        uNoiseDensity: { value: settings.density },
        uNoiseStrength: { value: settings.strength },
        uFrequency: { value: settings.frequency },
        uIntensity: { value: settings.intensity },
        uC1r: {value:settings.color1r}, 
        uC1g:{value:settings.color1g}, 
        uC1b:{value:settings.color1b}, 
        uC2r:{value:settings.color2r}, 
        uC2g:{value:settings.color2g}, 
        uC2b:{value:settings.color2b}, 
        uC3r:{value:settings.color3r}, 
        uC3g:{value:settings.color3g}, 
        uC3b:{value:settings.color3b}, 
        resolution: { value: new THREE.Vector3() },
        shininess:{value:0.43}, 
        ambient: { value: new THREE.Color( 0x000000 ) },
        specular: { value: new THREE.Color( 0x000000 ) },
        opacity:{value:0.5}

      }
]);



  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    fragmentShader,
    uniforms: uniforms,
    
    wireframe: false,
    lights: true,
  })
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

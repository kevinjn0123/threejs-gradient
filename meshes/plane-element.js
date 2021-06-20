import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
// import { vertexShader, fragmentShader } from "../shaders/planes.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import { vertexShader, fragmentShader } from "../shaders/plane/index.js"

// TODO: add dat GUI or https://github.com/pmndrs/leva

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 1.0,
  frequency: 3.0,
  amplitude: 6.0,
  mesh: 50,
  color1r: 0.8,
  color1g: 0.3,
  color1b: 0.43,
  color2r: 0.1,
  color2g: 0.5,
  color2b: 1.0,
  color3r: 0.6,
  color3g: 0.71,
  color3b: 0.56,
}
const gui = new dat.GUI()

const folder1 = gui.addFolder("Noise")
const folder2 = gui.addFolder("Rotation")
const folder3 = gui.addFolder("Mesh")
const folder4 = gui.addFolder("Color")
folder1.add(settings, "speed", 0.1, 1, 0.01)
folder1.add(settings, "density", 0, 10, 0.01)
folder1.add(settings, "strength", 0, 2, 0.01)
folder2.add(settings, "frequency", 0, 10, 0.1)
folder2.add(settings, "amplitude", 0, 10, 0.1)
folder3.add(settings, "mesh", 20, 200, 5)
folder4.add(settings, "color1r", 0, 1, 0.01)
folder4.add(settings, "color1g", 0, 1, 0.01)
folder4.add(settings, "color1b", 0, 1, 0.01)
folder4.add(settings, "color2r", 0, 1, 0.01)
folder4.add(settings, "color2g", 0, 1, 0.01)
folder4.add(settings, "color2b", 0, 1, 0.01)
folder4.add(settings, "color3r", 0, 1, 0.01)
folder4.add(settings, "color3g", 0, 1, 0.01)
folder4.add(settings, "color3b", 0, 1, 0.01)

export const planeElement = function () {

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



// let uniforms = THREE.UniformsUtils.merge([
//             THREE.UniformsLib.common,
//             THREE.UniformsLib.specularmap,
//             THREE.UniformsLib.envmap,
//             THREE.UniformsLib.aomap,
//             THREE.UniformsLib.lightmap,
//             THREE.UniformsLib.emissivemap,
//             THREE.UniformsLib.bumpmap,
//             THREE.UniformsLib.normalmap,
//             THREE.UniformsLib.displacementmap,
//             THREE.UniformsLib.gradientmap,
//             THREE.UniformsLib.fog,
//             THREE.UniformsLib.lights,
//             {
//                 // custom uniforms:
//                 diffuse: { value: new THREE.Color(color) },
//                 emissive: { value: new THREE.Color(emissive) },
//                 specular: { value: new THREE.Color(specular) },
//                 shininess: { value: shininess }
//             }
//         ]);


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
         // temporary
        //  "uniform vec3 diffuse;",
        //  "uniform float opacity;",
        //  "uniform vec3 ambient;",
        //  "uniform vec3 emissive;",
        //  "uniform vec3 specular;",
        //  "uniform float shininess;",
      }
]);
// var uniforms = THREE.UniformsUtils.merge([
//   THREE.UniformsLib["ambient"],
//   THREE.UniformsLib["lights"],
//   THREE.UniformsUtils.clone(THREE.ShaderLib.phong.uniforms),
//   {
//     diffuse: {
//       type: "c",
//       value: new THREE.Color(0xff00ff)
//     },
//     dirSpecularWeight: {
//       type: "v3",
//       value: new THREE.Vector3(1, 9, 1)
//     }
//   }, 
//   THREE.UniformsLib.aomap,
//       THREE.UniformsLib.lightmap,
//       THREE.UniformsLib.emissivemap,
//       THREE.UniformsLib.bumpmap,
//       THREE.UniformsLib.normalmap,
//       THREE.UniformsLib.displacementmap,
//       THREE.UniformsLib.roughnessmap,
//       THREE.UniformsLib.metalnessmap,
//       THREE.UniformsLib.fog,
//       THREE.UniformsLib.lights,
      
// ]);
// var lights = THREE.UniformsLib["lights"];

var vertex = [
  "#define PHONG",
  // "varying vec3 vViewPosition;",
  "varying vec2 vUv;",
  "varying vec3 vNormal;",


"varying float displacement;",
"varying vec3 vPos;",

"uniform float uTime;",
"uniform float uSpeed;",
"uniform float uNoiseDensity;",
"uniform float uNoiseStrength;",
"uniform float uFrequency;",
  THREE.ShaderChunk["common"],
  THREE.ShaderChunk["uv_pars_vertex"],
  THREE.ShaderChunk["uv2_pars_vertex"],
  THREE.ShaderChunk["displacementmap_pars_vertex"],
  THREE.ShaderChunk["envmap_pars_vertex"],
  THREE.ShaderChunk["color_pars_vertex"],
  THREE.ShaderChunk["fog_pars_vertex"],
  THREE.ShaderChunk["morphtarget_pars_vertex"],
  THREE.ShaderChunk["skinning_pars_vertex"],
  THREE.ShaderChunk["shadowmap_pars_vertex"],
  THREE.ShaderChunk["logdepthbuf_pars_vertex"],
  THREE.ShaderChunk["clipping_planes_pars_vertex"],
// vertexShader,
  "void main() {",
  "float t = uTime * uSpeed;",

  THREE.ShaderChunk["uv_vertex"],
  THREE.ShaderChunk["uv2_vertex"],
  THREE.ShaderChunk["color_vertex"],
  THREE.ShaderChunk["beginnormal_vertex"],
  THREE.ShaderChunk["morphnormal_vertex"],
  THREE.ShaderChunk["skinbase_vertex"],
  THREE.ShaderChunk["skinnormal_vertex"],
  THREE.ShaderChunk["defaultnormal_vertex"],
  "vNormal = normalize( transformedNormal);",
  THREE.ShaderChunk["begin_vertex"],
  THREE.ShaderChunk["displacementmap_vertex"],
  THREE.ShaderChunk["morphtarget_vertex"],
  THREE.ShaderChunk["skinning_vertex"],
  THREE.ShaderChunk["project_vertex"],
  THREE.ShaderChunk["logdepthbuf_vertex"],
  THREE.ShaderChunk["clipping_planes_vertex"],
  // "vViewPosition = - mvPosition.xyz;",
  THREE.ShaderChunk["worldpos_vertex"],
  THREE.ShaderChunk["envmap_vertex"],
  THREE.ShaderChunk["shadowmap_vertex"],
  THREE.ShaderChunk["fog_vertex"],
  "vUv = uv;",
 "float displacement = 0.75 * cnoise(0.43 * position * uFrequency + t);",
  "vec3 newPos = position + normal * displacement * uNoiseStrength;",
 "vNormal = normal * displacement;",
  "vPos = position;",

  "gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1);",

  "}"
].join("\n");


var fragment = [
  "#define PHONG",
  "uniform vec3 diffuse;",
  "uniform float opacity;",
  "uniform vec3 ambient;",
  "uniform vec3 emissive;",
  "uniform vec3 specular;",
  "uniform float shininess;",
  "varying vec2 vUv;",
  // THREE.ShaderChunk["common"],
  // THREE.ShaderChunk["packing"],
  // THREE.ShaderChunk["color_pars_fragment"],
  // THREE.ShaderChunk["uv_pars_fragment"],
  // THREE.ShaderChunk["uv2_pars_fragment"],
  // THREE.ShaderChunk["map_pars_fragment"],
  // THREE.ShaderChunk["alphamap_pars_fragment"],
  // THREE.ShaderChunk["aomap_pars_fragment"],
  // THREE.ShaderChunk["lightmap_pars_fragment"],
  // THREE.ShaderChunk["emissivemap_pars_fragment"],
  // THREE.ShaderChunk["envmap_pars_fragment"],
  // THREE.ShaderChunk["gradientmap_pars_fragment"],
  // THREE.ShaderChunk["fog_pars_fragment"],
  // THREE.ShaderChunk["bsdfs"],
  // THREE.ShaderChunk["lights_pars"],
  // THREE.ShaderChunk["lights_phong_pars_fragment"],
  // THREE.ShaderChunk["shadowmap_pars_fragment"],
  // THREE.ShaderChunk["bumpmap_pars_fragment"],
  // THREE.ShaderChunk["normalmap_pars_fragment"],
  // THREE.ShaderChunk["specularmap_pars_fragment"],
  // THREE.ShaderChunk["logdepthbuf_pars_fragment"],
  // THREE.ShaderChunk["clipping_planes_pars_fragment"],
  // fragmentShader,
  "varying vec3 vNormal;",
  "varying float displacement;",
  "varying vec3 vPos;",
  
  "uniform float uC1r;",
  "uniform float uC1g;",
  "uniform float uC1b;",
  "uniform float uC2r;",
  "uniform float uC2g;",
  "uniform float uC2b;",
  "uniform float uC3r;",
  "uniform float uC3g;",
  "uniform float uC3b;",
  
  "varying vec3 color1;",
  "varying vec3 color2;",
  "varying vec3 color3;",
  "void main() {",

  // "vec3 color = vec3(1.0);",
  // "vec4 diffuseColor = vec4( color, opacity );",

"vec3 color1 = vec3(uC1r, uC1g, uC1b);",
"vec3 color2 = vec3(uC2r, uC2g, uC2b);",
"vec3 color3 = vec3(uC3r, uC3g, uC3b);",

//   "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
//   "vec3 totalEmissiveRadiance = emissive;",
//   THREE.ShaderChunk["logdepthbuf_fragment"],
//   THREE.ShaderChunk["map_fragment"],
//   THREE.ShaderChunk["color_fragment"],
//   THREE.ShaderChunk["alphamap_fragment"],
//   THREE.ShaderChunk["alphatest_fragment"],
//   THREE.ShaderChunk["specularmap_fragment"],
//   THREE.ShaderChunk["normal_flip"],
//   THREE.ShaderChunk["normal_fragment"],
//   THREE.ShaderChunk["emissivemap_fragment"],
//   THREE.ShaderChunk["lights_phong_fragment"],
//   THREE.ShaderChunk["lights_template"],
//   THREE.ShaderChunk["aomap_fragment"],
//   "vec3 outgoingLight = reflectedLight.directDiffuse +reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;",
//   THREE.ShaderChunk["envmap_fragment"],
//   "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
//   THREE.ShaderChunk["premultiplied_alpha_fragment"],
//   THREE.ShaderChunk["tonemapping_fragment"],
//   THREE.ShaderChunk["encodings_fragment"],
//   THREE.ShaderChunk["fog_fragment"],
  "gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)), color2, vNormal.z), 1.0);",

  "}"
].join("\n");

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    fragmentShader: fragment,
    uniforms: uniforms,
    
    wireframe: false,
    lights: true,
  })
  // material.uniforms.shininess.value = 34.0;
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

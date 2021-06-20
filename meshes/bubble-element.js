import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { vertexShader, fragmentShader } from "../shaders/spheres/index.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
import fetch from "../web_modules/whatwg-fetch.js"

const cnoise = await fetch(`../shaders/plane/cnoise.glsl`).then((res) =>
  res.text()
)

const cnoiseimport = `
${cnoise}`


const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 6.0,
  intensity: 7.0,
  shininess:34.0,
}
// const gui = new dat.GUI()

// const folder1 = gui.addFolder("Noise")
// const folder2 = gui.addFolder("Rotation")
// const folder3 = gui.addFolder("Color")
// folder1.add(settings, "speed", 0.1, 1, 0.01)
// folder1.add(settings, "density", 0, 10, 0.01)
// folder1.add(settings, "strength", 0, 2, 0.01)
// folder2.add(settings, "frequency", 0, 10, 0.1)
// folder2.add(settings, "amplitude", 0, 10, 0.1)
// folder3.add(settings, "intensity", 0, 10, 0.1)

export const bubbleElement = function () {
    const geometry = new THREE.IcosahedronBufferGeometry(1, 12)


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
    }
  ]);

  var vertex = [
    "#define PHONG",
    "varying vec3 vViewPosition;",
    "varying vec2 vUv;",
    "varying vec3 vNormal;",
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
    // document.getElementById("vertCode").text,
    "uniform float time;",
    "void main() {",
    THREE.ShaderChunk["uv_vertex"],
    THREE.ShaderChunk["uv2_vertex"],
    THREE.ShaderChunk["color_vertex"],
    THREE.ShaderChunk["beginnormal_vertex"],
    THREE.ShaderChunk["morphnormal_vertex"],
    THREE.ShaderChunk["skinbase_vertex"],
    THREE.ShaderChunk["skinnormal_vertex"],
    THREE.ShaderChunk["defaultnormal_vertex"],
    "vNormal = normalize(transformedNormal);",
    THREE.ShaderChunk["begin_vertex"],
    THREE.ShaderChunk["displacementmap_vertex"],
    THREE.ShaderChunk["morphtarget_vertex"],
    THREE.ShaderChunk["skinning_vertex"],
    THREE.ShaderChunk["project_vertex"],
    THREE.ShaderChunk["logdepthbuf_vertex"],
    THREE.ShaderChunk["clipping_planes_vertex"],
    "vViewPosition = - mvPosition.xyz;",
    THREE.ShaderChunk["worldpos_vertex"],
    THREE.ShaderChunk["envmap_vertex"],
    THREE.ShaderChunk["shadowmap_vertex"],
    THREE.ShaderChunk["fog_vertex"],
    "vUv = uv;",
    // document.getElementById("vertMain").text,
    "float maxOffLen = 0.4;",
    "vec2 p = uv * vec2(PI*2.0);",
    
    "vec3 offset = normalize(normal) * vec3(sin(time * 4.0 + p.y ) * maxOffLen - maxOffLen);",
    
    "gl_Position.x += offset.x;",
    "gl_Position.y += offset.y;",
    "gl_Position.z += offset.z;",
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
    
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["packing"],
    THREE.ShaderChunk["color_pars_fragment"],
    THREE.ShaderChunk["uv_pars_fragment"],
    THREE.ShaderChunk["uv2_pars_fragment"],
    THREE.ShaderChunk["map_pars_fragment"],
    THREE.ShaderChunk["alphamap_pars_fragment"],
    THREE.ShaderChunk["aomap_pars_fragment"],
    THREE.ShaderChunk["lightmap_pars_fragment"],
    THREE.ShaderChunk["emissivemap_pars_fragment"],
    THREE.ShaderChunk["envmap_pars_fragment"],
    THREE.ShaderChunk["gradientmap_pars_fragment"],
    THREE.ShaderChunk["fog_pars_fragment"],
    THREE.ShaderChunk["bsdfs"],
    THREE.ShaderChunk["lights_pars"],
    THREE.ShaderChunk["lights_phong_pars_fragment"],
    THREE.ShaderChunk["shadowmap_pars_fragment"],
    THREE.ShaderChunk["bumpmap_pars_fragment"],
    THREE.ShaderChunk["normalmap_pars_fragment"],
    THREE.ShaderChunk["specularmap_pars_fragment"],
    THREE.ShaderChunk["logdepthbuf_pars_fragment"],
    THREE.ShaderChunk["clipping_planes_pars_fragment"],
    // document.getElementById("fragCode").text,
    "uniform float time;",

    cnoise,
    "void main() {",

    "vec3 color = vec3(1.0);",
    // document.getElementById("fragColor").text,
    "float r = abs(sin( (vUv.x + time * 0.125 ) * 4.0 )) * 0.2 + 0.7;",
    "float g = abs(sin( (vUv.y + time * 0.245 ) * 2.0 )) * 0.2 + 0.7;",
    "float b = abs(sin( (vUv.y - time * 0.333 ) * 2.0 )) * 0.2 + 0.7;",
    
    "r += cnoise(vec3(vUv.x*4.0,vUv.y*4.0, time)) * 0.1;",
    "g += cnoise(vec3(vUv.x*8.0,vUv.y*5.0, time*2.0)) * 0.1;",
    "b += cnoise(vec3(vUv.x*12.0,vUv.y*6.0, time*3.0)) * 0.1;",
    
    "color = vec3(r,g,b);",
    "vec4 diffuseColor = vec4( color, opacity );",
    "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
    "vec3 totalEmissiveRadiance = emissive;",
    THREE.ShaderChunk["logdepthbuf_fragment"],
    THREE.ShaderChunk["map_fragment"],
    THREE.ShaderChunk["color_fragment"],
    THREE.ShaderChunk["alphamap_fragment"],
    THREE.ShaderChunk["alphatest_fragment"],
    THREE.ShaderChunk["specularmap_fragment"],
    THREE.ShaderChunk["normal_flip"],
    THREE.ShaderChunk["normal_fragment"],
    THREE.ShaderChunk["emissivemap_fragment"],
    THREE.ShaderChunk["lights_phong_fragment"],
    THREE.ShaderChunk["lights_template"],
    THREE.ShaderChunk["aomap_fragment"],
    "vec3 outgoingLight = reflectedLight.directDiffuse +reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;",
    THREE.ShaderChunk["envmap_fragment"],
    // "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
    "gl_FragColor = diffuseColor;",
    THREE.ShaderChunk["premultiplied_alpha_fragment"],
    THREE.ShaderChunk["tonemapping_fragment"],
    THREE.ShaderChunk["encodings_fragment"],
    THREE.ShaderChunk["fog_fragment"],
    "}"
  ].join("\n");

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    lights: true, 
    wireframe:true
  });


 

  this.mesh = new THREE.Mesh(geometry, material);
//   scene.add(sphere);


//   const material = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//       uTime: { value: 0 },
//       uSpeed: { value: settings.speed },
//       uNoiseDensity: { value: settings.density },
//       uNoiseStrength: { value: settings.strength },
//       uFrequency: { value: settings.frequency },
//       uAmplitude: { value: settings.amplitude },
//       uIntensity: { value: settings.intensity },
//     },
//     // wireframe: true,
//   })
//   this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

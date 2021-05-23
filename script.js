import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { vertexShader, fragmentShader } from "./shaders/spheres.js"

let scene
let camera
let controls
let renderer
let clock
let sceneObjects = []
let uniforms = {}

let mesh

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
}

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 4)

renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor("green", 1)

clock = new THREE.Clock()

controls = new OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement)

/**
 * ADDING OBJECTS
 */
adjustLighting()
addElements()

animationLoop()

/**
 * FUNCTIONS
 */
function adjustLighting() {
  // LIGHTS
  var light = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(light)

  var light2 = new THREE.PointLight(0xffffff, 0.5)
  scene.add(light2)
}

function addElements() {
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
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

var delta = 0
function animationLoop() {
  // ------------------------- ANIMATE SHADERS -------------------------------
  // delta += 0.1

  // // uniform
  // mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5

  // // attribute
  // for (var i = 0; i < vertexDisplacement.length; i++) {
  //   vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25
  // }
  // mesh.geometry.attributes.vertexDisplacement.needsUpdate = true

  // for (let object of sceneObjects) {
  //   object.rotation.x += 0.01
  //   object.rotation.y += 0.03
  // }

  // ------------------------- ANIMATE SPHERES -------------------------------
  // mesh.material.uniforms.uTime.value = clock.getElapsedTime()
  // mesh.material.uniforms.uSpeed.value = settings.speed
  // mesh.material.uniforms.uNoiseDensity.value = settings.density
  // mesh.material.uniforms.uNoiseStrength.value = settings.strength

  // ------------------------- START ANIMATE -------------------------------
  window.requestAnimationFrame(animationLoop)
  renderer.render(scene, camera)

  controls.update()
}

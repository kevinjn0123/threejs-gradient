import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"

let scene
let camera
let controls
let renderer
let sceneObjects = []
let uniforms = {}

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
renderer.setClearColor("black", 1)

controls = new OrbitControls(camera, renderer.domElement)

document.body.appendChild(renderer.domElement)

/**
 * ADDING OBJECTS
 */
// adjustLighting()

// const { mesh, vertexDisplacement } = addTestObjects()

// animationLoop()

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

function addTestObjects() {
  var customUniforms = {
    delta: { value: 0 },
  }
  var material = new THREE.ShaderMaterial({
    uniforms: customUniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })

  var geometry = new THREE.BoxBufferGeometry(100, 100, 100, 10, 10, 10)
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.z = -1000
  mesh.position.x = -100
  scene.add(mesh)

  var geometry2 = new THREE.SphereGeometry(50, 20, 20)
  var mesh2 = new THREE.Mesh(geometry2, material)
  mesh2.position.z = -1000
  mesh2.position.x = 100
  scene.add(mesh2)

  var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100)
  var mesh3 = new THREE.Mesh(geometry3, material)
  mesh3.rotation.x = (-90 * Math.PI) / 180
  mesh3.position.y = -100
  scene.add(mesh3)

  // attribute
  var vertexDisplacement = new Float32Array(geometry.attributes.position.count)

  for (var i = 0; i < vertexDisplacement.length; i++) {
    vertexDisplacement[i] = Math.sin(i)
  }

  geometry.addAttribute(
    "vertexDisplacement",
    new THREE.BufferAttribute(vertexDisplacement, 1)
  )

  return { mesh, vertexDisplacement }
}

function vertexShader() {
  return `
    attribute float vertexDisplacement;
    uniform float delta;
    varying float vOpacity;
    varying vec3 vUv;

    void main()
    {
        vUv = position;
        vOpacity = vertexDisplacement;

        vec3 p = position;

        p.x += sin(vertexDisplacement) * 50.0;
        p.y += cos(vertexDisplacement) * 50.0;

      vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `
}

function fragmentShader() {
  return `
    uniform float delta;
    varying float vOpacity;
    varying vec3 vUv;

    void main() {

        float r = 1.0 + cos(vUv.x * delta);
        float g = 0.5 + sin(delta) * 0.5;
        float b = 0.0;
        vec3 rgb = vec3(r, g, b);

      gl_FragColor = vec4(rgb, vOpacity);
    }
  `
}

var delta = 0
function animationLoop() {
  // ------------------------- ANIMATE SHADERS -------------------------------
  delta += 0.1

  // uniform
  mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5

  // attribute
  for (var i = 0; i < vertexDisplacement.length; i++) {
    vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25
  }
  mesh.geometry.attributes.vertexDisplacement.needsUpdate = true

  for (let object of sceneObjects) {
    object.rotation.x += 0.01
    object.rotation.y += 0.03
  }

  // ------------------------- START ANIMATE -------------------------------
  window.requestAnimationFrame(animationLoop)
  renderer.render(scene, camera)

  controls.update()
}

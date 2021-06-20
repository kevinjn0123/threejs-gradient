import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7"
// import { vertexShader, fragmentShader } from "../shaders/planes.js"
import { vertexShader, fragmentShader } from "../shaders/simple/index.js"
// import { vertexShader, fragmentShader } from "../shaders/turbulence/index.js"

const settings = {
  speed: 0.2,
  density: 1.5,
  // strength: 1.8,
  // frequency: 3.0,
  // intensity: 7.0,
}

const gui = new dat.GUI()

const folder1 = gui.addFolder("Test")
folder1.add(settings, "speed", 0.1, 1, 0.01)

export const planeElement = function () {
  this.settings = settings

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    // fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      // uNoiseDensity: { value: settings.density },
      // uNoiseStrength: { value: settings.strength },
      // uFrequency: { value: settings.frequency },
      // uIntensity: { value: settings.intensity },
      // resolution: { value: new THREE.Vector3() },
    },
    wireframe: true,
  })

  // [Box Test]
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  // this.mesh = new THREE.Mesh(geometry, material)

  // [Plane Test]
  const geometry = new THREE.PlaneGeometry(1, 1, 2, 2)
  // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  this.mesh = new THREE.Mesh(geometry, material)
}

export const boxElement = function () {
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    // fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      // uNoiseDensity: { value: settings.density },
      // uNoiseStrength: { value: settings.strength },
      // uFrequency: { value: settings.frequency },
      // uIntensity: { value: settings.intensity },
      // resolution: { value: new THREE.Vector3() },
    },
    wireframe: true,
  })

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

export const coneElement = function () {
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    // fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      // uNoiseDensity: { value: settings.density },
      // uNoiseStrength: { value: settings.strength },
      // uFrequency: { value: settings.frequency },
      // uIntensity: { value: settings.intensity },
      // resolution: { value: new THREE.Vector3() },
    },
    wireframe: true,
  })
  const geometry = new THREE.ConeGeometry(5, 20, 32)
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

export const cylinderElement = function () {
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    // fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      // uNoiseDensity: { value: settings.density },
      // uNoiseStrength: { value: settings.strength },
      // uFrequency: { value: settings.frequency },
      // uIntensity: { value: settings.intensity },
      // resolution: { value: new THREE.Vector3() },
    },
    wireframe: true,
  })
  // const geometry = new THREE.ConeGeometry(5, 20, 32)
  const geometry = new THREE.CylinderGeometry(5, 5, 20, 32)
  this.mesh = new THREE.Mesh(geometry, material)

  this.settings = settings
}

export const textElement = function (font) {
  this.settings = settings

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader,
    // fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: settings.speed },
      // uNoiseDensity: { value: settings.density },
      // uNoiseStrength: { value: settings.strength },
      // uFrequency: { value: settings.frequency },
      // uIntensity: { value: settings.intensity },
      // resolution: { value: new THREE.Vector3() },
    },
    wireframe: true,
  })

  const textGeo = new THREE.TextGeometry("Hello three.js!", {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
  })

  textGeo.computeBoundingBox()

  this.mesh = new THREE.Mesh(textGeo, material)
}

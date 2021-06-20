import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
// import { boxElement } from "../meshes/turbulence-element.js"
import {
  boxElement,
  coneElement,
  cylinderElement,
  textElement,
} from "../meshes/simple-element-2.js"

export class Scene {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(-40, -2, -2)
    // this.camera.lookAt(new THREE.Vector3(100, 1000, 100))

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor("grey", 1)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock()

    const manager = new THREE.LoadingManager()
    manager.onLoad = () => this.init() // when all resources are loaded
    this.loader = new THREE.FontLoader(manager)
    this.loader.load(
      "/fonts/helvetiker_regular.typeface.json",
      (response) => (this.font = response)
    )
  }

  init() {
    this.addCanvas()
    this.addLights()
    this.addMeshElements()
    this.animationLoop()
  }

  addCanvas() {
    const canvas = this.renderer.domElement
    document.body.appendChild(canvas)
  }

  addLights() {
    // const _ambientLights = new THREE.AmbientLight(0xffffff, 1)
    const _ambientLights = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4)
    const _lights = new THREE.PointLight(0xffffff, 0.5)
    _lights.position.set(20, 20, 20)
    this.scene.add(_lights)
    this.scene.add(_ambientLights)
  }

  addMeshElements() {
    // const element = new textElement(this.font)
    const element = new boxElement()
    this.mesh = element.mesh
    console.log("this.mesh", this.mesh)
    this.meshSettings = element.settings

    this.scene.add(this.mesh)
    // this.mesh.rotation.x = Math.PI / 2
  }

  animationLoop() {
    // ------------------------- ANIMATE PLANE -------------------------------
    this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
    this.mesh.material.uniforms.uSpeed.value = this.meshSettings.speed
    // this.mesh.material.uniforms.uNoiseDensity.value = this.meshSettings.density
    // this.mesh.material.uniforms.uNoiseStrength.value =
    //   this.meshSettings.strength

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}

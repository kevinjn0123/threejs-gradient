import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { primitiveElement } from "../meshes/primitive-element.js"

export class Scene {
  constructor() {
    this._width = window.innerWidth
    this._height = window.innerHeight
    //---
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x000000, 5, 15)
    this.scene.background = new THREE.Color(0x000000)
    //---
    this.camera = new THREE.PerspectiveCamera(
      35,
      this._width / this._height,
      1,
      1000
    )
    this.camera.position.set(0, 0, 10)
    //---
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this._width, this._height)
    this.renderer.shadowMap.enabled = true

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.init()
  }

  init() {
    this.addCanvas()
    this.addLights()
    this.addPrimitive()

    this.animationLoop()
  }

  addCanvas() {
    const canvas = this.renderer.domElement
    document.body.appendChild(canvas)
  }

  addLights() {
    //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
    const _ambientLights = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4)
    const _lights = new THREE.PointLight(0xffffff, 0.5)
    _lights.position.set(20, 20, 20)
    this.scene.add(_lights)
    this.scene.add(_ambientLights)
  }

  addPrimitive() {
    const _primitive = new primitiveElement()
    _primitive.mesh.scale.set(1, 1, 1)
    this.scene.add(_primitive.mesh)
  }

  animationLoop() {
    // ------------------------- ANIMATE SPHERES -------------------------------
    // this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
    // this.mesh.material.uniforms.uSpeed.value = settings.speed
    // this.mesh.material.uniforms.uNoiseDensity.value = settings.density
    // this.mesh.material.uniforms.uNoiseStrength.value = settings.strength

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}

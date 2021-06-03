// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { planeElement } from "../meshes/plane-element.js"

export class Scene {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 0, 4)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor("grey", 1)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock()

    this.init()
  }

  init() {
    this.addCanvas()
    this.addMeshElements()
    this.animationLoop()
  }

  addCanvas() {
    const canvas = this.renderer.domElement
    document.body.appendChild(canvas)
  }

  addMeshElements() {
    const plane = new planeElement()
    this.mesh = plane.mesh
    this.meshSettings = plane.settings

    this.scene.add(this.mesh)
    this.mesh.rotation.x = Math.PI / 2
    
  }

  animationLoop() {
    // ------------------------- ANIMATE PLANE -------------------------------
    this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
    this.mesh.material.uniforms.uSpeed.value = this.meshSettings.speed
    this.mesh.material.uniforms.uNoiseDensity.value = this.meshSettings.density
    this.mesh.material.uniforms.uNoiseStrength.value =
      this.meshSettings.strength

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}
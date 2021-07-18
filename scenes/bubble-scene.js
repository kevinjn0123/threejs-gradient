// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { bubbleElement } from "../meshes/bubble-element.js"

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
    this.renderer.setClearColor("green", 1)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock()

    this.init()
  }

  init() {
    this.addCanvas()
    this.addMeshElements()
    this.addLights()
    this.animationLoop()

  }

  addCanvas() {
    const canvas = this.renderer.domElement
    document.body.appendChild(canvas)
  }

  addMeshElements() {
    const sphere = new bubbleElement()
    this.mesh = sphere.mesh
    this.meshSettings = sphere.settings

    this.scene.add(this.mesh)
  }



  addLights() {

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.color.setHSL(0.6, 1, 0.8);
  hemiLight.position.set(0, 10, 0);

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
  dirLight.color.setHSL(0.1, 1.0, 0.8);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
    this.scene.add(this.hemiLight)
    this.scene.add(this.dirLight)

  }

  animationLoop() {
    // ------------------------- ANIMATE SPHERES -------------------------------
    this.mesh.material.uniforms.time.value = this.clock.getElapsedTime()
    this.mesh.material.uniforms.shininess.value = 34.0
    // this.mesh.material.uniforms.uSpeed.value = this.meshSettings.speed
    // this.mesh.material.uniforms.uNoiseDensity.value = this.meshSettings.density
    // this.mesh.material.uniforms.uNoiseStrength.value =
    //   this.meshSettings.strength
    // this.mesh.material.uniforms.uFrequency.value = this.meshSettings.frequency
    // this.mesh.material.uniforms.uAmplitude.value = this.meshSettings.amplitude
    // this.mesh.material.uniforms.uIntensity.value = this.meshSettings.intensity

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}

// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { noisePlaneElement } from "../meshes/noise-plane-element.js"

const cycle = 100;
let seedNum;
let gra;

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
    this.addLights()
    this.addMeshElements()
    this.animationLoop()
  }

  addCanvas() {
    const canvas = this.renderer.domElement
    document.body.appendChild(canvas)
  }

  addMeshElements() {
    const plane = new noisePlaneElement()
    this.mesh = plane.mesh
    this.meshSettings = plane.settings

    this.scene.add(this.mesh)
    this.mesh.rotation.x = Math.PI / 2
  }


  addLights() {
    //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
    const _ambientLights = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4)
    const _lights = new THREE.PointLight(0xffffff, 1.0)
    _lights.position.set(20, 20, 20)
    this.scene.add(_lights)
    this.scene.add(_ambientLights)
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
    dirLight.color.setHSL(0.1, 1.0, 0.8);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    this.scene.add(dirLight);
  }


  animationLoop() {
    // ------------------------- ANIMATE PLANE -------------------------------
    this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
    this.mesh.material.uniforms.uResolution.value = this.meshSettings.uResolution
    this.mesh.material.uniforms.uPixelDensity.value = this.meshSettings.uPixelDensity
    this.mesh.material.uniforms.uLightDir.value = this.meshSettings.uLightDir





    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}

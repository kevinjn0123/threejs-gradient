import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
import { vertexShader, fragmentShader } from "../shaders/flower.js"

const uniforms = {
  time: {
    type: "f",
    value: 1.0,
  },
  pointscale: {
    type: "f",
    value: 1.0,
  },
  decay: {
    type: "f",
    value: 2.0,
  },
  complex: {
    type: "f",
    value: 2.0,
  },
  waves: {
    type: "f",
    value: 3.0,
  },
  eqcolor: {
    type: "f",
    value: 3.0,
  },
  fragment: {
    type: "i",
    value: false,
  },
  dnoise: {
    type: "f",
    value: 0.0,
  },
  qnoise: {
    type: "f",
    value: 4.0,
  },
  r_color: {
    type: "f",
    value: 0.0,
  },
  g_color: {
    type: "f",
    value: 0.0,
  },
  b_color: {
    type: "f",
    value: 0.0,
  },
}

const primitiveElement = function () {
  this.mesh = new THREE.Object3D()
  const geo = new THREE.IcosahedronGeometry(1, 6)
  //const mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
  const mat = new THREE.ShaderMaterial({
    wireframe: false,
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  })
  const mesh = new THREE.Mesh(geo, mat)
  //---
  this.mesh.add(mesh)
}

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

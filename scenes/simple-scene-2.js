import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls"
// import { planeElement } from "../meshes/turbulence-element.js"
import {
  planeElement,
  coneElement,
  cylinderElement,
  textElement,
} from "../meshes/simple-element-2.js"
import { vertexShader, fragmentShader } from "../shaders/turbulence/index.js"

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

  addLights() {
    // const _ambientLights = new THREE.AmbientLight(0xffffff, 1)
    const _ambientLights = new THREE.HemisphereLight(0xffffff, 0x000000, 1.4)
    const _lights = new THREE.PointLight(0xffffff, 0.5)
    _lights.position.set(20, 20, 20)
    this.scene.add(_lights)
    this.scene.add(_ambientLights)
  }

  addMeshElements() {
    const settings = {
      speed: 0.2,
      density: 1.5,
      // strength: 1.8,
      // frequency: 3.0,
      // intensity: 7.0,
    }

    // const plane = new textElement()
    // this.mesh = plane.mesh
    // console.log("this.mesh", this.mesh)
    // this.meshSettings = plane.settings

    const loader = new THREE.FontLoader()

    loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
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

      // const geometry = new THREE.TextGeometry("Hello three.js!", {
      //   font: font,
      //   size: 80,
      //   height: 5,
      //   curveSegments: 12,
      //   bevelEnabled: true,
      //   bevelThickness: 10,
      //   bevelSize: 8,
      //   bevelOffset: 0,
      //   bevelSegments: 5,
      // })

      // // const geometry = new THREE.CylinderGeometry(5, 5, 20, 32)
      // this.mesh = new THREE.Mesh(geometry, material)

      //

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

      const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

      this.mesh = new THREE.Mesh(textGeo, material)
      console.log("this.mesh", this.mesh)
      this.scene.add(this.mesh)
    })

    // this.mesh.rotation.x = Math.PI / 2
  }

  animationLoop() {
    // ------------------------- ANIMATE PLANE -------------------------------
    if (this.mesh) {
      this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()
      // this.mesh.material.uniforms.uSpeed.value = this.meshSettings.speed
    }

    // this.mesh.material.uniforms.uNoiseDensity.value = this.meshSettings.density
    // this.mesh.material.uniforms.uNoiseStrength.value =
    //   this.meshSettings.strength

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)) // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
  }
}

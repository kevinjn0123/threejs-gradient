// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";
// import { materialSphereElement } from "../meshes/material-sphere-element.js";
import { materialElement } from "../meshes/material-element.js";
let textureCube;

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("black", 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    this.addCanvas();
    this.addLights();
    this.addMeshElements();
    this.animationLoop();
    this.addEnv();
  }

  addCanvas() {
    const canvas = this.renderer.domElement;
    document.body.appendChild(canvas);
  }

  addMeshElements() {
    const plane = new materialElement();
    this.mesh = plane.mesh;
    this.meshSettings = plane.settings;
    this.scene.add(this.mesh);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.rotation.z = Math.PI / 3;
    this.mesh.recieveShadow = true;
  }

  addLights() {
    const _ambientLights = new THREE.AmbientLight(0x404040, 5);
    _ambientLights.position.set(0, 40, 200);
    // this.scene.add(_ambientLights);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(50, 50, 0);
    dirLight.lookAt(0, 0, 0);
    dirLight.position.multiplyScalar(1);
    const targetObject = new THREE.Object3D();
    targetObject.position.set(0, 0, 0);
    this.scene.add(targetObject);
    dirLight.target = targetObject;
    this.scene.add(dirLight);

    var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-50, 50, 0);
    dirLight2.position.multiplyScalar(50);
    const targetObject2 = new THREE.Object3D();
    targetObject2.position.set(0, 0, 0);
    this.scene.add(targetObject2);

    dirLight2.target = targetObject2;
    this.scene.add(dirLight2);

    const rectLight1 = new THREE.RectAreaLight(0xffffff, 1, 10, 10);
    rectLight1.position.set(5, 0, 0);
    rectLight1.lookAt(0, 0, 0);
    this.scene.add(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0xffffff, 1, 10, 10);
    rectLight2.position.set(-5, 0, 0);
    rectLight2.lookAt(0, 0, 0);
    this.scene.add(rectLight2);
  }

  addEnv() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath("textures/bridge/");
    textureCube = loader.load([
      "posx.jpeg",
      "negx.jpeg",
      "posy.jpeg",
      "negy.jpeg",
      "posz.jpeg",
      "negz.jpeg",
    ]);
    textureCube.encoding = THREE.sRGBEncoding;
    this.scene.background = textureCube;
    this.mesh.material.envMap = textureCube;
  }

  animationLoop() {
    // ------------------------- ANIMATE PLANE -------------------------------
    this.mesh.material.userData.uTime.value = this.clock.getElapsedTime();
    this.mesh.material.userData.uSpeed.value = this.meshSettings.speed;
    this.mesh.material.userData.uNoiseDensity.value = this.meshSettings.density;
    this.mesh.material.userData.uNoiseStrength.value =
      this.meshSettings.strength;
    this.mesh.material.userData.uFrequency.value = this.meshSettings.frequency;
    this.mesh.material.userData.uC1r.value = this.meshSettings.color1r;
    this.mesh.material.userData.uC1g.value = this.meshSettings.color1g;
    this.mesh.material.userData.uC1b.value = this.meshSettings.color1b;
    this.mesh.material.userData.uC2r.value = this.meshSettings.color2r;
    this.mesh.material.userData.uC2g.value = this.meshSettings.color2g;
    this.mesh.material.userData.uC2b.value = this.meshSettings.color2b;
    this.mesh.material.userData.uC3r.value = this.meshSettings.color3r;
    this.mesh.material.userData.uC3g.value = this.meshSettings.color3g;
    this.mesh.material.userData.uC3b.value = this.meshSettings.color3b;
    this.mesh.material.userData.meshCount.value = this.meshSettings.meshCount;
    this.mesh.material.roughness = this.meshSettings.roughness;
    this.mesh.material.metalness = this.meshSettings.metalness;
    this.mesh.material.envMap = textureCube;
    // this.mesh.geometry.parameters.heightSegments =
    //   this.mesh.material.userData.meshCount.value;

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)); // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera);

    this.controls.update();
  }
}

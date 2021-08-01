// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";
import { materialElement } from "../meshes/material-element.js";
import { RGBELoader } from "https://rawcdn.githack.com/mrdoob/three.js/d0340e3a147e290fa86d14bc3ed97d8e1c20602e/examples/jsm/loaders/RGBELoader.js";
import { FlakesTexture } from "../../shaders/FlakesTexture.js";

let textureCube;
let hdrCubeRenderTarget;

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("black", 1);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    this.addCanvas();
    this.addMeshElements();
    this.animationLoop();
    this.addTexture();
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
  }

  //load .hdr and use as envmap and lighting
  addEnv() {
    const loader = new THREE.CubeTextureLoader();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    const newloader = new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load("/textures/cayley_interior_2k.hdr", (hdrEquiRect, textureData) => {
        hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquiRect);
        pmremGenerator.compileCubemapShader();
        this.mesh.material.envMap = hdrCubeRenderTarget.texture;
        this.mesh.material.lightMap = hdrCubeRenderTarget.texture;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.7;
        // this.scene.background = hdrCubeRenderTarget.texture;
      });
  }

  // add flake material to the mesh
  addTexture() {
    let texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    //repeat the wrapping 10 (x) and 6 (y) times
    texture.repeat.x = 20;
    texture.repeat.y = 20;
    this.mesh.material.normalMap = texture;
    // this.mesh.material.normalScale = new THREE.Vector2(0.01, 0.01);
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
    this.mesh.material.envMapIntensity = this.meshSettings.envMapIntensity;
    this.mesh.material.roughness = this.meshSettings.roughness;
    this.mesh.material.metalness = this.meshSettings.metalness;
    this.mesh.material.clearcoat = this.meshSettings.clearcoat;
    this.mesh.material.clearcoatRoughness =
      this.meshSettings.clearcoatRoughness;
    this.mesh.material.normalScale = new THREE.Vector2(
      this.meshSettings.normalScale,
      this.meshSettings.normalScale
    );
    this.mesh.rotation.z = Math.PI * this.meshSettings.rotation;

    // ------------------------- START ANIMATE -------------------------------
    window.requestAnimationFrame(this.animationLoop.bind(this)); // bind "this" to keep pointing the constructed scene
    this.renderer.render(this.scene, this.camera);

    this.controls.update();
  }
}

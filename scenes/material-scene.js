// original sources from https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";
import { materialElement } from "../meshes/material-element.js";
import { RGBELoader } from "https://rawcdn.githack.com/mrdoob/three.js/d0340e3a147e290fa86d14bc3ed97d8e1c20602e/examples/jsm/loaders/RGBELoader.js";
import { FlakesTexture } from "../../shaders/FlakesTexture.js";
import { EffectComposer } from "https://rawcdn.githack.com/mrdoob/three.js/c94947ac1df0485f20d5d8d99b40c08a79a4e889/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://rawcdn.githack.com/mrdoob/three.js/c94947ac1df0485f20d5d8d99b40c08a79a4e889/examples/jsm/postprocessing/RenderPass.js";
import { BloomPass } from "https://rawcdn.githack.com/mrdoob/three.js/c94947ac1df0485f20d5d8d99b40c08a79a4e889/examples/jsm/postprocessing/BloomPass.js";
import { FilmPass } from "https://rawcdn.githack.com/mrdoob/three.js/c94947ac1df0485f20d5d8d99b40c08a79a4e889/examples/jsm/postprocessing/FilmPass.js";
import { HalftonePass } from "https://rawcdn.githack.com/mrdoob/three.js/c94947ac1df0485f20d5d8d99b40c08a79a4e889/examples/jsm/postprocessing/HalftonePass.js";

let hdrCubeRenderTarget;
let composer;

const width = window.innerWidth;
const height = window.innerHeight;
const rtParameters = {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBFormat,
  stencilBuffer: true,
};

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
    this.postProcessing();
  }

  addCanvas() {
    const canvas = this.renderer.domElement;
    document.body.appendChild(canvas);
    this.camera.updateProjectionMatrix();
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
        this.renderer.toneMappingExposure = 1.0;
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
  }

  postProcessing() {
    composer = new EffectComposer(
      this.renderer
      // new THREE.WebGLRenderTarget(
      //   window.innerWidth,
      //   window.innerHeight,
      //   rtParameters
      // )
    );
    composer.addPass(new RenderPass(this.scene, this.camera));

    const bloomPass = new BloomPass(
      1, // strength
      25, // kernel size
      4, // sigma ?
      256 // blur render target resolution
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(
      0.45, // noise intensity
      0.015, // scanline intensity
      648, // scanline count
      false // grayscale
    );
    filmPass.renderToScreen = true;
    // composer.addPass(filmPass);

    const halftoneParams = {
      shape: 1,
      radius: 2,
      rotateR: Math.PI / 12,
      rotateB: (Math.PI / 12) * 2,
      rotateG: (Math.PI / 12) * 3,
      scatter: 1,
      blending: 1,
      blendingMode: 1,
      greyscale: false,
      disable: false,
    };
    const halftonePass = new HalftonePass(width, height, halftoneParams);
    composer.addPass(halftonePass);

    composer.setSize(window.innerWidth, window.innerHeight);
    const delta = this.clock.getDelta();
    composer.render(delta);
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
    this.camera.updateProjectionMatrix();
    this.controls.update();
    if (composer) {
      composer.render();
    }
  }
}

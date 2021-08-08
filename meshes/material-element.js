import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js";
// import { vertexShader, fragmentShader } from "../shaders/planes.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7";
import { vertexShader, fragmentShader } from "../shaders/material/index.js";

// TODO: add dat GUI or https://github.com/pmndrs/leva

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 2.0,
  frequency: 2.0,
  amplitude: 6.0,
  meshCount: 50,
  type: "plane",
  color1r: 0.8,
  color1g: 0.3,
  color1b: 0.43,
  color2r: 0.1,
  color2g: 0.5,
  color2b: 1.0,
  color3r: 0.6,
  color3g: 0.71,
  color3b: 0.56,
  envMapIntensity: 1,
  roughness: 0.14,
  metalness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0.5,
  normalScale: 0.01,
  rotation: 0,
  bloomPass: false,
  filmPass: true,
  halftonePass: true,
};
const gui = new dat.GUI();

const folder1 = gui.addFolder("Noise");
const folder2 = gui.addFolder("Material");
const folder3 = gui.addFolder("Mesh");
const folder4 = gui.addFolder("Color");
const folder5 = gui.addFolder("Texture");
folder1.add(settings, "speed", 0.1, 1, 0.01);
folder1.add(settings, "density", 0, 10, 0.01);
folder1.add(settings, "strength", 0, 2, 0.01);
folder1.add(settings, "frequency", 0, 10, 0.1);
folder1.add(settings, "amplitude", 0, 10, 0.1);
folder2.add(settings, "envMapIntensity", 0, 4, 0.1);
folder2.add(settings, "roughness", 0, 1, 0.01);
folder2.add(settings, "metalness", 0, 1, 0.01);
folder2.add(settings, "clearcoat", 0, 1, 0.01);
folder2.add(settings, "clearcoatRoughness", 0, 1, 0.01);
folder2.add(settings, "normalScale", 0, 0.05, 0.01);
folder3.add(settings, "rotation", 0, 2, 0.01);
folder4.add(settings, "color1r", 0, 1, 0.01);
folder4.add(settings, "color1g", 0, 1, 0.01);
folder4.add(settings, "color1b", 0, 1, 0.01);
folder4.add(settings, "color2r", 0, 1, 0.01);
folder4.add(settings, "color2g", 0, 1, 0.01);
folder4.add(settings, "color2b", 0, 1, 0.01);
folder4.add(settings, "color3r", 0, 1, 0.01);
folder4.add(settings, "color3g", 0, 1, 0.01);
folder4.add(settings, "color3b", 0, 1, 0.01);
folder5.add(settings, "bloomPass");
folder5.add(settings, "filmPass");
folder5.add(settings, "halftonePass");

export const materialElement = function () {
  var uniforms = {
    uTime: { value: 0 },
    uSpeed: { value: settings.speed },
    uNoiseDensity: { value: settings.density },
    uNoiseStrength: { value: settings.strength },
    uFrequency: { value: settings.frequency },
    uIntensity: { value: settings.intensity },
    type: { value: settings.type },
    uC1r: { value: settings.color1r },
    uC1g: { value: settings.color1g },
    uC1b: { value: settings.color1b },
    uC2r: { value: settings.color2r },
    uC2g: { value: settings.color2g },
    uC2b: { value: settings.color2b },
    uC3r: { value: settings.color3r },
    uC3g: { value: settings.color3g },
    uC3b: { value: settings.color3b },
    meshCount: { value: settings.meshCount },
    envMapIntensity: { value: settings.envMapIntensity },
    roughness: { value: settings.roughness },
    clearcoat: { value: settings.clearcoat },
    clearcoatRoughness: { value: settings.clearcoatRoughness },
    metalness: { value: settings.metalness },
    normalScale: { value: settings.normalScale },
    rotation: { value: settings.rotation },
    bloomPass: { value: settings.bloomPass },
  };

  var geometry;
  if (settings.type === "plane") {
    geometry = new THREE.PlaneGeometry(5, 5, 1, settings.meshCount);
  } else if ((settings.type = "sphere")) {
    geometry = new THREE.IcosahedronBufferGeometry(1, settings.meshCount);
  } else if (settings.type === "waterPlane") {
    newGeometry = new THREE.PlaneGeometry(
      5,
      5,
      settings.meshCount,
      settings.meshCount
    );
  }

  let material = new THREE.MeshPhysicalMaterial({
    roughness: settings.roughness,
    metalness: settings.metalness,
    clearcoat: settings.clearcoat,
    clearcoatRoughness: settings.clearcoatRoughness,
    side: THREE.DoubleSide,
    envMapIntensity: settings.envMapIntensity,
    // clearcoat: 1.0,
    // cleacoatRoughness: 0.1,
    transmission: 1,
    reflectivity: 1,
    opacity: 1,
    color: 0xffffff,
    normalScale: new THREE.Vector2(settings.normalScale, settings.normalScale),

    // update the uniform values via userData
    userData: uniforms,
    onBeforeCompile: (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uSpeed = uniforms.uSpeed;
      shader.uniforms.uNoiseDensity = uniforms.uNoiseDensity;
      shader.uniforms.uNoiseStrength = uniforms.uNoiseStrength;
      shader.uniforms.uIntensity = uniforms.uIntensity;
      shader.uniforms.uFrequency = uniforms.uFrequency;
      shader.uniforms.uC1r = uniforms.uC1r;
      shader.uniforms.uC1g = uniforms.uC1g;
      shader.uniforms.uC1b = uniforms.uC1b;
      shader.uniforms.uC2r = uniforms.uC2r;
      shader.uniforms.uC2g = uniforms.uC2g;
      shader.uniforms.uC2b = uniforms.uC2b;
      shader.uniforms.uC3r = uniforms.uC3r;
      shader.uniforms.uC3g = uniforms.uC3g;
      shader.uniforms.uC3b = uniforms.uC3b;
      shader.uniforms.rotation = uniforms.rotation;
      shader.uniforms.meshCount = uniforms.meshCount;
      material.roughness = settings.roughness;
      material.metalness = settings.metalness;
      material.clearcoat = settings.clearcoat;
      material.clearcoatRoughness = settings.clearcoatRoughness;
      material.envMapIntensity = settings.envMapIntensity;
      material.normalScale = uniforms.normalScale;
      console.log(material);
      // //----------- console.log(shader.vertextShader or shader.fragmentShader) before assinging custom shader for reference

      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    },
  });
  this.mesh = new THREE.Mesh(geometry, material);
  this.settings = settings;

  // update geometry with different types and mesh counts
  function regenerateGeometry(prevMesh) {
    let newGeometry;

    if (settings.type === "plane") {
      newGeometry = new THREE.PlaneGeometry(5, 5, 1, settings.meshCount);
    } else if (settings.type === "sphere") {
      newGeometry = new THREE.IcosahedronBufferGeometry(1, settings.meshCount);
      settings.strength = 1.0;
      settings.roughness = 0.26;
    } else if (settings.type === "waterPlane") {
      newGeometry = new THREE.PlaneGeometry(
        5,
        5,
        settings.meshCount,
        settings.meshCount
      );
    }
    // console.log(settings.meshCount);
    // console.log(settings.type);
    // console.log(prevMesh.geometry);

    prevMesh.geometry.dispose();
    prevMesh.geometry = newGeometry;
  }

  folder3.add(settings, "meshCount", 20, 200, 10).onChange(() => {
    regenerateGeometry(this.mesh);
  });

  folder3
    .add(settings, "type", ["plane", "sphere", "waterPlane"])
    .onChange(() => {
      regenerateGeometry(this.mesh);
    });
};

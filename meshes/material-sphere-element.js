import * as THREE from "https://cdn.skypack.dev/pin/three@v0.128.0-SK0zhlI7UZNd0gIQdpJa/mode=imports/optimized/three.js";
// import { vertexShader, fragmentShader } from "../shaders/planes.js"
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7";
import { vertexShader, fragmentShader } from "../shaders/material/index.js";

// TODO: add dat GUI or https://github.com/pmndrs/leva

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.5,
  frequency: 3.0,
  amplitude: 6.0,
  mesh: 50,
  color1r: 0.8,
  color1g: 0.3,
  color1b: 0.43,
  color2r: 0.1,
  color2g: 0.5,
  color2b: 1.0,
  color3r: 0.6,
  color3g: 0.71,
  color3b: 0.56,
};
const gui = new dat.GUI();

const folder1 = gui.addFolder("Noise");
const folder2 = gui.addFolder("Rotation");
const folder3 = gui.addFolder("Mesh");
const folder4 = gui.addFolder("Color");
folder1.add(settings, "speed", 0.1, 1, 0.01);
folder1.add(settings, "density", 0, 10, 0.01);
folder1.add(settings, "strength", 0, 2, 0.01);
folder2.add(settings, "frequency", 0, 10, 0.1);
folder2.add(settings, "amplitude", 0, 10, 0.1);
folder3.add(settings, "mesh", 20, 200, 5);
folder4.add(settings, "color1r", 0, 1, 0.01);
folder4.add(settings, "color1g", 0, 1, 0.01);
folder4.add(settings, "color1b", 0, 1, 0.01);
folder4.add(settings, "color2r", 0, 1, 0.01);
folder4.add(settings, "color2g", 0, 1, 0.01);
folder4.add(settings, "color2b", 0, 1, 0.01);
folder4.add(settings, "color3r", 0, 1, 0.01);
folder4.add(settings, "color3g", 0, 1, 0.01);
folder4.add(settings, "color3b", 0, 1, 0.01);

export const materialSphereElement = function () {
  const geometry = new THREE.IcosahedronBufferGeometry(1, 64);
  var uniforms = {
    uTime: { value: 0 },
    uSpeed: { value: settings.speed },
    uNoiseDensity: { value: settings.density },
    uNoiseStrength: { value: settings.strength },
    uFrequency: { value: settings.frequency },
    uIntensity: { value: settings.intensity },
    mesh: { value: settings.mesh },
    uC1r: { value: settings.color1r },
    uC1g: { value: settings.color1g },
    uC1b: { value: settings.color1b },
    uC2r: { value: settings.color2r },
    uC2g: { value: settings.color2g },
    uC2b: { value: settings.color2b },
    uC3r: { value: settings.color3r },
    uC3g: { value: settings.color3g },
    uC3b: { value: settings.color3b },
  };

  let material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.5,
    side: THREE.DoubleSide,
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

      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    },
  });

  this.mesh = new THREE.Mesh(geometry, material);

  this.settings = settings;
};

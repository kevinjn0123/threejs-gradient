import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { PlaneElement } from "../components/moving-gradient-elements"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import { FadingImage } from "../components/fading-image"

const getVertices = (points) => [
  {
    x: points.point_1_x,
    y: points.point_1_y,
    color: new THREE.Color("hsl(20, 100%, 50%)"),
  },
  {
    x: points.point_2_x,
    y: points.point_2_y,
    color: new THREE.Color("hsl(0, 100%, 50%)"),
  },
  {
    x: points.point_3_x,
    y: points.point_3_y,
    color: new THREE.Color("hsl(130, 100%, 50%)"),
  },
  {
    x: points.point_4_x,
    y: points.point_4_y,
    color: new THREE.Color("hsl(230, 100%, 50%)"),
  },
]

const fragmentShader = [
  // "uniform vec3 colorA;",
  // "uniform vec3 colorB; ",
  // "varying vec3 vUv;",

  // "void main() {",
  // "  gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);",
  // "}"
  "struct Vertex {",
  "  float x;",
  "  float y;",
  "  vec3 color;",
  "};",

  "uniform Vertex vertices[" + 4 + "];",
  "varying vec2 vUv;",
  "varying vec3 fNormal;",

  "vec3 overlayBlending(vec3 color1, vec3 color2) {",
  "  float r = (color1.r >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.r) * (1.0 - color2.r) : (2.0 * color1.r * color2.r);",
  "  float g = (color1.g >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.g) * (1.0 - color2.g) : (2.0 * color1.g * color2.g);",
  "  float b = (color1.b >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.b) * (1.0 - color2.b) : (2.0 * color1.b * color2.b);",
  "  return vec3(r, g, b);",
  "}",

  "vec3 screenBlending(vec3 color1, vec3 color2) {",
  "  float r = 1.0 - (1.0 - color2.r) * (1.0 - color1.r);",
  "  float g = 1.0 - (1.0 - color2.g) * (1.0 - color1.g);",
  "  float b = 1.0 - (1.0 - color2.b) * (1.0 - color1.b);",
  "  return vec3(r, g, b);",
  "}",

  // LCH functions
  "#define PI 3.14159365",
  "#define TAU 6.28318531",
  "const vec3 wref =  vec3(1, 1, 1);",
  "float xyzF(float t){ return mix(pow(t,1./3.), 7.787037*t + 0.139731, step(t,0.00885645)); }",
  "float xyzR(float t){ return mix(t*t*t , 0.1284185*(t - 0.139731), step(t,0.20689655)); }",

  "vec3 rgb2lch(in vec3 c) {",
  "  c *= mat3( 0.4124, 0.3576, 0.1805, 0.2126, 0.7152, 0.0722, 0.0193, 0.1192, 0.9505);",
  "  c.x = xyzF(c.x/wref.x);",
  "  c.y = xyzF(c.y/wref.y);",
  "  c.z = xyzF(c.z/wref.z);",
  "  vec3 lab = vec3(max(0.,116.0*c.y - 16.0), 500.0*(c.x - c.y), 200.0*(c.y - c.z));",
  "  return vec3(lab.x, length(vec2(lab.y,lab.z)), atan(lab.z, lab.y));",
  "}",

  "vec3 lch2rgb(in vec3 c) {",
  "  c = vec3(c.x, cos(c.z) * c.y, sin(c.z) * c.y);",
  "  float lg = 1./116.*(c.x + 16.);",
  "  vec3 xyz = vec3(wref.x*xyzR(lg + 0.002*c.y), wref.y*xyzR(lg), wref.z*xyzR(lg - 0.005*c.z));",
  "  vec3 rgb = xyz*mat3( 3.2406, -1.5372,-0.4986, -0.9689,  1.8758, 0.0415, 0.0557,  -0.2040, 1.0570);",
  "  return rgb;",
  "}",

  "float lerpAng(in float a, in float b, in float x) {",
  "  float ang = mod(mod((a-b), TAU) + PI*3., TAU)-PI;",
  "  return ang*x+b;",
  "}",

  "vec3 lerpLch(in vec3 a, in vec3 b, in float x) {",
  "  float hue = lerpAng(a.z, b.z, x);",
  "  return vec3(mix(b.xy, a.xy, x), hue);",
  "}",
  // End LCH
  "const float gamma = 2.4;",
  "vec3 lin2srgb(vec3 c) {",
  "  return pow(c, vec3(1.0 / gamma));",
  "}",

  "vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {",
  "  return a + b * cos(6.28318 * (c * t + d));",
  "}",

  "void main() {",
  // "  vec2 position = vUv.xy / vec2(0.1).xy - vec2(4.5).xy;",
  "  vec3 color = vec3(0, 0, 0);",
  "  float sumDistance = 0.0;",
  "  float distort = fNormal.z;",

  "  for(int i = 0; i < " + 4 + "; i++) {",
  "    float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);",
  "    sumDistance += currentDistance;",
  "  }",
  "  float t = 0.0;",
  "  for(int i = 0; i < " + 4 + "; i++) {",
  "    float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);",
  "    float inverseDistance = 1.0 / (currentDistance / sumDistance);",
  "    t += inverseDistance;",
  "  }",
  "vec3 brightness = vec3(0.5, 0.5, 0.5);",
  "vec3 contrast = vec3(0.5, 0.5, 0.5);",
  "vec3 oscilation = vec3(1.0, 1.0, 1.0);",
  "vec3 phase = vec3(0.0, 0.1, 0.2);",
  "  for(int i = 0; i < " + 4 + "; i++) {",
  "    float currentDistance = pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);",
  "    float inverseDistance = 1.0 / (currentDistance / sumDistance);",
  "    float weight = inverseDistance / t;",
  "    weight = smoothstep(0.0, 1.0, weight);",
  // "    color = screenBlending(color, vertices[i].color * weight);",
  // "    color = rgb2lch(color) * vec3(1.0 / 100.0, 1.0 / 132.0, 1.0 / 360.0);",
  // "    vec3 newcolor = rgb2lch(vertices[i].color) * vec3(1.0 / 100.0, 1.0 / 132.0, 1.0 / 360.0) * weight;",
  // "    color = color + newcolor;",
  // "    color = lch2rgb(color * vec3(100.0, 132.0, 360.0));",
  "    color = screenBlending(color + distort / 30.0, vertices[i].color * weight);",
  // "    color = screenBlending(color, vertices[i].color * weight);",
  // "       color = cosPalette(distort, brightness, contrast, oscilation, phase);",
  "  }",
  "  color = lin2srgb(color);",
  "  gl_FragColor = vec4(color.rgb, 1.0);",
  "}",
].join("\n")

export default function Scene1() {
  // const fragmentShader = useShader({
  //   publicPath: "/shaders/moving-gradient/fragment.frag",
  // })
  const noises = useShader({
    publicPath: "/shaders/moving-gradient/noises.glsl",
  })
  const vertex = useShader({
    publicPath: "/shaders/displacement-test/vertex.glsl",
  })
  const vertexShader = `
    ${noises}
    ${vertex}
    `

  console.log("fragmentShader", fragmentShader)

  const points = {
    point_1_x: 0.2,
    point_1_y: 0.2,
    point_2_x: 0.8,
    point_2_y: 0.2,
    point_3_x: 0.2,
    point_3_y: 0.8,
    point_4_x: 0.8,
    point_4_y: 0.8,
  }

  return (
    <div
      style={{
        background: "pink",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas>
        {/* addMeshElements */}
        <FadingImage />
        {/* <mesh>
          <planeGeometry />
          <shaderMaterial
            side={THREE.DoubleSide}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={{
              uTime: { value: 0 },
              uNoiseStrength: { value: 5 },
              texture1: { type: "t", value: null },
              scale: { type: "f", value: 1.0 },
              vertices: { value: getVertices(points) },
              resolution: { value: new THREE.Vector2(400, 400) },
            }}
          />
        </mesh> */}
        {/* addLights */}
        <hemisphereLight args={[0xffffff, 0x000000, 1.4]} />
        <pointLight args={[0xffffff, 0.5]} />
        {/* @ts-ignore */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

Scene1.defaultProps = {}

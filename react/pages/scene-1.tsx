import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { PlaneElement } from "../components/moving-gradient-elements"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"

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

export default function Scene1() {
  const fragmentShader = useShader({
    publicPath: "/shaders/moving-gradient/fragment.frag",
  })
  const noises = useShader({
    publicPath: "/shaders/moving-gradient/noises.glsl",
  })
  const vertex = useShader({
    publicPath: "/shaders/moving-gradient/vertex.glsl",
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
        <mesh>
          <PlaneElement />
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
        </mesh>
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

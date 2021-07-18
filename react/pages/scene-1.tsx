import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { PlaneElement } from "../components/moving-gradient-elements"
import { useShader } from "../hooks/use-shader"

export default function Scene1() {
  const fragmentShader = useShader({
    publicPath: "/shaders/turbulence/fragment.frag",
  })
  const noises = useShader({ publicPath: "/shaders/turbulence/noises.glsl" })
  const vertex = useShader({ publicPath: "/shaders/turbulence/vertex.glsl" })
  const vertexShader = `
    ${noises}
    ${vertex}
    `

  console.log("fragmentShader", fragmentShader)

  return (
    <div
      style={{
        background: "pink",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas>
        <mesh>
          <PlaneElement />
          <shaderMaterial
            side="DoubleSide"
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </mesh>
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight color="blue" position={[0, 0, 5]} intensity={0.5} />
        {/* @ts-ignore */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

Scene1.defaultProps = {}

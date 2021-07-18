import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { PlaneElement } from "../components/moving-gradient-elements"

export default function Scene1() {
  return (
    <div
      style={{
        background: "pink",
        width: "100vw",
        height: "100vh",
      }}
    >
      <PlaneElement />
      <Canvas>
        <mesh>
          <boxBufferGeometry />
          <meshPhongMaterial />
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

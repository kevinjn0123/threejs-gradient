import { Canvas } from "@react-three/fiber"

export function Scene1() {
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
          <boxBufferGeometry />
          <meshPhongMaterial />
        </mesh>
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight color="blue" position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </div>
  )
}

Scene1.defaultProps = {}

import { Canvas } from "@react-three/fiber"

export function Scene1() {
  return (
    <div
      style={{
        background: "pink",
      }}
    >
      Scene1
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}

Scene1.defaultProps = {}

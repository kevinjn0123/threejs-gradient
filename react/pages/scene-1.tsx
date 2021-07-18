import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { MovingGraadientElement } from "../components/moving-gradient-elements"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import { FadingImage } from "../components/fading-image"

export default function Scene1() {
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
        <MovingGraadientElement />
        {/* <FadingImage /> */}
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

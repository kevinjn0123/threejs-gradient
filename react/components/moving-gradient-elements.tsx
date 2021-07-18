import * as React from "react"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import "./MovingGradientMaterial"
import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"

const clock = new THREE.Clock()

export function MovingGraadientElement() {
  const mesh = useRef()
  useFrame(
    (state, delta) =>
      (mesh.current.uniforms.uTime.value = clock.getElapsedTime())
  )

  const [texture1, texture2, texture3] = useLoader(THREE.TextureLoader, [
    "/textures/texture-1.jpg",
    "/textures/texture-2.jpg",
    "/textures/texture-3.jpg",
  ])

  return (
    <mesh>
      {/* <planeGeometry args={[20, 20, 2, 100]} /> */}
      <sphereGeometry args={[1, 80, 80]} />
      <movingGradientMaterial ref={mesh} texture1={texture2} />
    </mesh>
  )
}

MovingGraadientElement.defaultProps = {}

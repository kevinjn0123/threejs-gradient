import * as React from "react"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import "./MovingGradientMaterial"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const clock = new THREE.Clock()

export function MovingGraadientElement() {
  const mesh = useRef()
  useFrame(
    (state, delta) =>
      (mesh.current.uniforms.uTime.value = clock.getElapsedTime())
  )

  return (
    <mesh>
      <planeGeometry args={[20, 20, 2, 100]} />
      <movingGradientMaterial ref={mesh} />
    </mesh>
  )
}

MovingGraadientElement.defaultProps = {}

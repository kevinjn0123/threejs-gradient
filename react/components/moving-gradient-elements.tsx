import * as React from "react"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import "./MovingGradientMaterial"

export function MovingGraadientElement() {
  return (
    <mesh>
      <planeGeometry args={[20, 20, 2, 100]} />
      <movingGradientMaterial />
    </mesh>
  )
}

MovingGraadientElement.defaultProps = {}

import * as React from "react"
import { useShader } from "../hooks/use-shader"
import * as THREE from "three"
import "./MovingGradientMaterial"
import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { FormContext } from "../helpers/form-provider"

const clock = new THREE.Clock()

export function MovingGraadientElement() {
  const ctx = React.useContext(FormContext)
  console.log("ctx", ctx)
  const { noiseStrength } = ctx.watch()

  const mesh: any = useRef()
  useFrame((state, delta) => {
    mesh.current.uniforms.uTime.value = clock.getElapsedTime()
    mesh.current.uniforms.uNoiseStrength.value = noiseStrength
  })

  const [texture1, texture2, texture3] = useLoader(THREE.TextureLoader, [
    "/textures/texture-1.jpg",
    "/textures/texture-2.jpg",
    "/textures/texture-3.jpg",
  ])

  return (
    <mesh>
      {/* <planeGeometry args={[20, 20, 2, 100]} /> */}
      <sphereGeometry args={[1, 80, 80]} />
      {/* @ts-ignore */}
      <movingGradientMaterial ref={mesh} texture1={texture2} />
    </mesh>
  )
}

MovingGraadientElement.defaultProps = {}

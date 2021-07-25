import * as THREE from "three"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import "./ImageFadeMaterial"

export function FadingImage() {
  const ref: any = useRef()
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
    "/img/Img1.jpg",
    "/img/Img2.jpg",
    // "/img/displacement/10.jpg",
    "/textures/texture-2.jpg",
  ])
  const [hovered, setHover] = useState(false)
  useFrame(
    () =>
      (ref.current.dispFactor = THREE.MathUtils.lerp(
        ref.current.dispFactor,
        //  @ts-ignore
        !!hovered,
        0.1
      ))
  )
  return (
    <mesh
      onPointerMove={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <planeGeometry />
      {/* @ts-ignore */}
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
      />
    </mesh>
  )
}

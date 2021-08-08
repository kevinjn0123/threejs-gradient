import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef, useContext, Suspense } from 'react'
import './GradientMaterial'
import * as THREE from 'three'
import { FormContext } from '../../helpers/form-provider'

const clock = new THREE.Clock()

const meshCount = 50

export default function GradientMesh() {
  const ctx: any = useContext(FormContext)
  const { type } = ctx?.watch()

  const mesh = useRef()
  const material: any = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          material.current.userData.uTime.value = clock.getElapsedTime()
          // material.current.uniforms.uNoiseStrength.value = noiseStrength
        })()
      : null
  )

  return (
    <mesh ref={mesh}>
      {type === 'plane' && <planeGeometry args={[5, 5, 1, meshCount]} />}
      {type === 'sphere' && <icosahedronBufferGeometry args={[1, meshCount]} />}
      {type === 'waterPlane' && (
        <planeGeometry args={[5, 5, meshCount, meshCount]} />
      )}

      {/* @ts-ignore */}
      <gradientMaterial ref={material} />
    </mesh>
  )
}

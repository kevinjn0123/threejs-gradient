import { useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import React, { useRef, useContext, Suspense } from 'react'
import './GradientMaterial'
import * as THREE from 'three'
import { FormContext } from '../../helpers/form-provider'
import { CustomEnvironment } from './Environment'

const clock = new THREE.Clock()

const meshCount = 50

function GradientMeshComp() {
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

export default function GradientMesh({ r3f }) {
  return (
    <Suspense fallback={'Loading...'}>
      {/* TODO: may be needed for including RGBELoader */}
      {/* <Environment
        files={'/hdr/cayley_interior_2k.hdr'}
        preset={null}
        background={true}
      /> */}
      <CustomEnvironment background={false} />
      <GradientMeshComp />
    </Suspense>
  )
}

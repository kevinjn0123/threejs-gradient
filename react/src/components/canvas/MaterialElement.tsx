import { useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import React, { useRef, useContext, Suspense } from 'react'
import './MaterialMaterial'
import * as THREE from 'three'
import { FormContext } from '../../helpers/form-provider'

const clock = new THREE.Clock()

function MaterialElementComp() {
  const ctx: any = useContext(FormContext)
  const { noiseStrength } = ctx?.watch()

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
      {/* <sphereGeometry args={[1, 80, 80]} /> */}
      <planeGeometry args={[5, 5, 1, 50]} />
      {/* @ts-ignore */}
      <materialMaterial ref={material} />
    </mesh>
  )
}

export default function MaterialElement({ r3f }) {
  return (
    <Suspense fallback={'Loading...'}>
      <Environment
        files={'/environments/cayley_interior_2k.hdr'} // Array of cubemap files OR single equirectangular file
        preset={null}
        background={true}
      />
      <MaterialElementComp />
    </Suspense>
  )
}

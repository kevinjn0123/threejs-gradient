import * as React from 'react'
import * as THREE from 'three'
import './MovingGradientMaterial'
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { FormContext } from '../helpers/form-provider'

const clock = new THREE.Clock()

export function MovingGradientElement() {
  const ctx = React.useContext(FormContext)
  console.log('ctx', ctx)
  const { noiseStrength } = ctx.watch()

  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.uniforms.uTime.value = clock.getElapsedTime()
    mesh.current.uniforms.uNoiseStrength.value = noiseStrength
  })

  const texture2 = useTexture('/textures/texture-2.jpg')

  return (
    <mesh>
      {/* <planeGeometry args={[20, 20, 2, 100]} /> */}
      <sphereGeometry args={[1, 80, 80]} />
      {/* @ts-ignore */}
      <movingGradientMaterial ref={mesh} texture1={texture2} />
    </mesh>
  )
}

MovingGradientElement.defaultProps = {}

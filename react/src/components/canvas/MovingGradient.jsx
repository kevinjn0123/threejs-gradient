import useStore from '@/helpers/store'
import { A11y } from '@react-three/a11y'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState, useContext } from 'react'
import './MovingGradientMaterial'
import * as THREE from 'three'
import { FormContext } from '../../helpers/form-provider'

const clock = new THREE.Clock()

const MovingGradientComponent = ({ route }) => {
  const ctx = useContext(FormContext)
  const { noiseStrength } = ctx.watch()

  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef()
  const material = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          material.current.uniforms.uTime.value = clock.getElapsedTime()
          material.current.uniforms.uNoiseStrength.value = noiseStrength
        })()
      : null
  )
  const [texture1, texture2, texture3] = useLoader(THREE.TextureLoader, [
    '/textures/texture-1.jpg',
    '/textures/texture-2.jpg',
    '/textures/texture-3.jpg',
  ])

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereGeometry args={[1, 80, 80]} />
      <movingGradientMaterial ref={material} texture1={texture2} />
    </mesh>
  )
}
export default MovingGradientComponent

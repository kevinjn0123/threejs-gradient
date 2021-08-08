import { GUIGradient } from '@/components/dom/gui-gradient'
import dynamic from 'next/dynamic'
import { Environment } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import * as PP from '@/components/pp'
import { HalftonePass } from '@/components/pp/lib/HalftonePassO'
// import { BlendFunction } from 'postprocessing'
// import {
//   EffectComposer,
//   RenderPass,
//   EffectPass,
//   NormalPass,
// } from 'postprocessing'
import { EffectComposer } from '../components/pp/lib/postprocessing/EffectComposer'
import { RenderPass } from '../components/pp/lib/postprocessing/RenderPass'
import { usePostProcessing } from '@/hooks/use-post-processing'

const GradientMesh = dynamic(() => import('@/components/canvas/GradientMesh'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <Scene r3f />
      <GUIGradient />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Gradient Scene',
    },
  }
}

function Scene({ r3f }) {
  const { camera } = useThree()
  // scene.background = new THREE.Color(0x000000)
  camera.position.set(2, 4, 1)

  usePostProcessing()

  return (
    <Suspense fallback={'Loading...'}>
      <Environment
        files={'cayley_interior_2k.hdr'}
        path={'/hdr/'}
        preset={null}
        background={true}
      />
      <GradientMesh />
    </Suspense>
  )
}

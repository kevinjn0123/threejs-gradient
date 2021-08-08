import { GUIGradient } from '@/components/dom/gui-gradient'
import dynamic from 'next/dynamic'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import * as PP from '@/components/pp'

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
  const { scene } = useThree()
  scene.background = new THREE.Color(0x000000)

  return (
    <Suspense fallback={'Loading...'}>
      <Environment
        files={'cayley_interior_2k.hdr'}
        path={'/hdr/'}
        preset={null}
      />
      <PP.EffectComposer>
        <PP.Noise opacity={0.2} />
      </PP.EffectComposer>
      <GradientMesh />
    </Suspense>
  )
}

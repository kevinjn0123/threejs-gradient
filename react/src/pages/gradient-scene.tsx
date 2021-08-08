import { GUIGradient } from '@/components/dom/gui-gradient'
import dynamic from 'next/dynamic'
import { Environment } from '@react-three/drei'
import React, { useRef, useContext, Suspense } from 'react'

const GradientMesh = dynamic(() => import('@/components/canvas/GradientMesh'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      {/* <GradientMesh r3f /> */}
      {/* <Environment
        r3f
        files={'cayley_interior_2k.hdr'}
        path={'/hdr/'}
        preset={null}
      /> */}
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
  return (
    <Suspense fallback={'Loading...'}>
      <Environment
        files={'cayley_interior_2k.hdr'}
        path={'/hdr/'}
        preset={null}
      />
      <GradientMesh />
    </Suspense>
  )
}

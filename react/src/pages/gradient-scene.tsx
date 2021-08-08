import { GUIGradient } from '@/components/dom/gui-gradient'
import dynamic from 'next/dynamic'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import * as PP from '@/components/pp'
import { HalftonePass } from '@/components/pp/lib/HalftonePass'
import { BlendFunction } from 'postprocessing'
// import { EffectComposer } from 'postprocessing'
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  NormalPass,
} from 'postprocessing'
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
  const { gl, scene } = useThree()
  scene.background = new THREE.Color(0x000000)

  const composer = new EffectComposer(
    gl
    // new THREE.WebGLRenderTarget(
    //   window.innerWidth,
    //   window.innerHeight,
    //   rtParameters
    // )
  )
  console.log('composer', composer)

  composer.addPass(new RenderPass(scene))

  const halftoneParams = {
    shape: 1,
    radius: 2,
    rotateR: Math.PI / 12,
    rotateB: (Math.PI / 12) * 2,
    rotateG: (Math.PI / 12) * 3,
    scatter: 1,
    blending: 1,
    blendingMode: 1,
    greyscale: false,
    disable: false,
  }
  const halftonePass = new HalftonePass(
    window.innerWidth,
    window.innerHeight,
    halftoneParams
  )
  console.log('halftonePass', halftonePass)
  composer.addPass(halftonePass)

  return (
    <Suspense fallback={'Loading...'}>
      <Environment
        files={'cayley_interior_2k.hdr'}
        path={'/hdr/'}
        preset={null}
      />
      <PP.EffectComposer>
        {/* <PP.Noise opacity={0.2} /> */}
        {/* <PP.HalftonePass /> */}
        {/* <PP.SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
          rings={4} // amount of rings in the occlusion sampling pattern
          distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
          distanceFalloff={0.0} // distance falloff. min: 0, max: 1
          rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
          rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
          luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
          radius={20} // occlusion sampling radius
          scale={0.5} // scale of the ambient occlusion
          bias={0.5} // occlusion bias
        /> */}
      </PP.EffectComposer>
      <GradientMesh />
    </Suspense>
  )
}

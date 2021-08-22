import { GUIGradient } from '@/components/dom/gui-gradient'
import { usePostProcessing } from '@/hooks/use-post-processing'
import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useContext } from 'react'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { FormContext } from '@/helpers/form-provider'

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
  const ctx: any = useContext(FormContext)
  const { postProcessing, env } = ctx?.watch()

  const { camera } = useThree()
  // scene.background = new THREE.Color(0x000000)
  camera.position.set(2, 4, 1)

  usePostProcessing({ on: postProcessing === 'threejs' })

  return (
    <Suspense fallback={'Loading...'}>
      {env === 'env' ? (
        <Environment
          files={'cayley_interior_2k.hdr'}
          path={'/hdr/'}
          preset={null}
          background={true}
        />
      ) : (
        <ambientLight intensity={1} />
      )}

      {postProcessing === 'r3f' && (
        <EffectComposer>
          <Noise opacity={0.2} />
        </EffectComposer>
      )}

      <GradientMesh />
    </Suspense>
  )
}

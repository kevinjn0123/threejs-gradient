import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { HalftonePass } from '@/lib/from-threejs/postprocessing/HalftonePass'
import { BloomPass } from '@/lib/from-threejs/postprocessing/BloomPass'
import { EffectComposer as EffectComposerImpl } from '@/lib/from-threejs/postprocessing/EffectComposer'
import { RenderPass } from '@/lib/from-threejs/postprocessing/RenderPass'

export function usePostProcessing({ on = false }) {
  const { gl, scene, camera, size } = useThree()

  const composer = useMemo(() => {
    // Initialize composer
    const effectComposer = new EffectComposerImpl(gl)
    // Add render pass
    effectComposer.addPass(new RenderPass(scene, camera))

    const bloomPass = new BloomPass(
      1, // strength
      25, // kernel size
      4, // sigma ?
      256 // blur render target resolution
    )
    effectComposer.addPass(bloomPass)

    // Create & add a halftone pass
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
      size.width,
      size.height,
      halftoneParams
    )
    effectComposer.addPass(halftonePass)

    return effectComposer
  }, [gl, scene, camera, size])

  useEffect(() => composer?.setSize(size.width, size.height), [composer, size])
  useFrame(
    (_, delta) => void ((gl.autoClear = true), on && composer.render(delta)),
    1
  )
}

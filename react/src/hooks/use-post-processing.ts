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

export function usePostProcessing() {
  const { gl, scene, camera, size } = useThree()

  const composer = new EffectComposer(gl)
  composer.addPass(new RenderPass(scene, camera))
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
  const halftonePass = new HalftonePass(size.width, size.height, halftoneParams)
  composer.addPass(halftonePass)

  useEffect(() => composer?.setSize(size.width, size.height), [composer, size])
  useFrame(
    (_, delta) => void ((gl.autoClear = true), composer.render(delta)),
    1
  )
}

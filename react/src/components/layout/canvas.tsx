import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { FormContext } from '../../helpers/form-provider'
import { useContextBridge } from '@react-three/drei'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const ContextBridge = useContextBridge(FormContext)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 2, 4],
        matrixWorldNeedsUpdate: true,
      }}
      dpr={2} //device pixel ratio - 1 default and fast, 2 detailed and slow
      linear={true} //sRGBEncoding
      flat={true} //ACESFilmicToneMapping
      onCreated={(state) => {
        state.events.connect(dom.current)
        console.log(state.camera)
      }}
    >
      <LControl />
      <A11yUserPreferences>
        <Preload all />
        <ContextBridge>{children}</ContextBridge>
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas

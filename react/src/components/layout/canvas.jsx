import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { FormContext } from '../../helpers/form-provider'
import { useForm } from 'react-hook-form'
import { GUI } from '../dom/gui'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const formProps = useForm({
    defaultValues: {
      noiseStrength: 0.1,
    },
  })

  return (
    <>
      <Canvas
        mode='concurrent'
        style={{
          position: 'absolute',
          top: 0,
        }}
        onCreated={(state) => state.events.connect(dom.current)}
      >
        <FormContext.Provider value={formProps}>
          <LControl />
          <A11yUserPreferences>
            <Preload all />
            {children}
          </A11yUserPreferences>
        </FormContext.Provider>
      </Canvas>
      <FormContext.Provider value={formProps}>
        <GUI />
      </FormContext.Provider>
    </>
  )
}

export default LCanvas

import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { MovingGraadientElement } from '../components/moving-gradient-elements'
import { Layout } from '../components/layout'
import { GUI } from '../components/gui'
import { useForm } from 'react-hook-form'
import { FormContext, GreetingContext } from '../helpers/form-provider'
import { useContextBridge } from '@react-three/drei'

export default function Scene1() {
  const formProps = useForm({
    defaultValues: {
      noiseStrength: 0.1,
    },
  })
  const [name, setName] = React.useState('')

  return (
    <Layout>
      hello
      <div
        style={{
          background: 'pink',
          width: '100vw',
          height: '100vh',
        }}
      >
        <FormContext.Provider value={formProps}>
          <GreetingContext.Provider value={{ name, setName }}>
            <SceneWrapper />
          </GreetingContext.Provider>
          {/* <GUI /> */}
        </FormContext.Provider>
      </div>
    </Layout>
  )
}

function SceneWrapper() {
  const ContextBridge = useContextBridge(FormContext, GreetingContext)

  return (
    <ContextBridge r3f>
      {/* addMeshElements */}
      <MovingGraadientElement />
      {/* addLights */}
      <hemisphereLight args={[0xffffff, 0x000000, 1.4]} />
      <pointLight args={[0xffffff, 0.5]} />
      {/* @ts-ignore */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </ContextBridge>
  )
}

Scene1.defaultProps = {}

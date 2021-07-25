import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { MovingGraadientElement } from "../components/moving-gradient-elements"
import { Layout } from "../components/layout"
import { GUI } from "../components/gui"
import { useForm } from "react-hook-form"
import { FormContext } from "../helpers/form-provider"

export default function Scene1() {
  const formProps = useForm({
    defaultValues: {
      noiseStrength: 0.1,
    },
  })

  return (
    <Layout>
      <div
        style={{
          background: "pink",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <FormContext.Provider value={formProps}> */}
        <Canvas>
          {/* <FormContext.Provider value={formProps}> */}
          {/* addMeshElements */}
          <MovingGraadientElement />
          {/* addLights */}
          <hemisphereLight args={[0xffffff, 0x000000, 1.4]} />
          <pointLight args={[0xffffff, 0.5]} />
          {/* @ts-ignore */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          {/* </FormContext.Provider> */}
        </Canvas>
        {/* <GUI /> */}
        {/* </FormContext.Provider> */}
      </div>
    </Layout>
  )
}

Scene1.defaultProps = {}

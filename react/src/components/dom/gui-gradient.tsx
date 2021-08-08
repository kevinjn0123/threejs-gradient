import * as React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../helpers/form-provider'

export function GUIGradient() {
  const ctx: any = useContext(FormContext) // States from Form
  console.log('ctx - GUIGradient', ctx)

  return (
    <div
      style={{
        background: 'black',
        color: 'white',
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      GUI
      <div>
        <div
          style={{
            display: 'flex',
          }}
        >
          <div>
            <input {...ctx.register('type')} type='radio' value='plane' />
            <label>Plane</label>
          </div>
          <div>
            <input {...ctx.register('type')} type='radio' value='sphere' />
            <label>Sphere</label>
          </div>
          <div>
            <input {...ctx.register('type')} type='radio' value='waterPlane' />
            <label>Water Plane</label>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
          }}
        >
          <div>
            <input {...ctx.register('env')} type='radio' value='env' />
            <label>Env</label>
          </div>
          <div>
            <input {...ctx.register('env')} type='radio' value='light' />
            <label>Light</label>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
          }}
        >
          <div>
            <input
              {...ctx.register('postProcessing')}
              type='radio'
              value='threejs'
            />
            <label>threejs</label>
          </div>
          <div>
            <input
              {...ctx.register('postProcessing')}
              type='radio'
              value='r3f'
            />
            <label>@react-three/postprocessing</label>
          </div>
        </div>
      </div>
    </div>
  )
}

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
            <label htmlFor='dewey'>Plane</label>
          </div>
          <div>
            <input {...ctx.register('type')} type='radio' value='sphere' />
            <label htmlFor='dewey'>Sphere</label>
          </div>
          <div>
            <input {...ctx.register('type')} type='radio' value='waterPlane' />
            <label htmlFor='dewey'>Water Plane</label>
          </div>
        </div>
      </div>
    </div>
  )
}
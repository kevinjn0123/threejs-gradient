import * as React from 'react'
import { useContext } from 'react'
import { FormContext } from '../../helpers/form-provider'

export function GUI() {
  const ctx: any = useContext(FormContext) // States from Form
  console.log('ctx - GUI', ctx)

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
        <input
          type='range'
          min='0'
          max='10'
          step='0.1'
          {...ctx.register('noiseStrength')}
        />
        <label>Noise Strength</label>
      </div>
    </div>
  )
}

GUI.defaultProps = {}

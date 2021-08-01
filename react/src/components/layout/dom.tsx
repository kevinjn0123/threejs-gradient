import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])
  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      <ul
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0.5,
          background: '#fff',
        }}
      >
        <Link href='/'>Home</Link>
        <br />
        <Link href='/scene-1'>scene-1 (moving-gradient)</Link>
        <br />
        <Link href='/gradient-scene'>gradient-scene</Link>
      </ul>
      {children}
    </div>
  )
}

export default Dom

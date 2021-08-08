import * as THREE from 'three'
import { useContext, useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import { FormContext } from '@/helpers/form-provider'

export function CustomEnvironment({ background = false }) {
  const { gl, scene } = useThree()
  const ctx: any = useContext(FormContext)
  const { env } = ctx?.watch()
  console.log('env', env)

  const [cubeMap] = useLoader(
    HDRCubeTextureLoader,
    // 'cayley_interior_2k.hdr',
    [
      // @ts-ignore
      ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'],
    ],
    (loader) => {
      console.log('loader', loader)
      loader.setDataType(THREE.UnsignedByteType)
      loader.setPath('/hdr/')
    }
  )
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl)
    gen.compileEquirectangularShader()
    const hdrCubeRenderTarget = gen.fromCubemap(cubeMap)
    cubeMap.dispose()
    gen.dispose()
    if (background) scene.background = hdrCubeRenderTarget.texture
    else {
      scene.background = new THREE.Color(0x000000)
      scene.background.convertSRGBToLinear()
    }
    scene.environment = hdrCubeRenderTarget.texture
    return () => (scene.environment = scene.background = null)
  }, [cubeMap])
  return null
}

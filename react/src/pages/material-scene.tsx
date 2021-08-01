import { GUI } from '@/components/dom/gui'
import dynamic from 'next/dynamic'

const MaterialMesh = dynamic(() => import('@/components/canvas/MaterialMesh'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <MaterialMesh r3f />
      <GUI />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Scene Test',
    },
  }
}

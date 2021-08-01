import { GUIGradient } from '@/components/dom/gui-gradient'
import dynamic from 'next/dynamic'

const GradientMesh = dynamic(() => import('@/components/canvas/GradientMesh'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <GradientMesh r3f />
      <GUIGradient />
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

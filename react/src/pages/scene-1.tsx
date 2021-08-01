import { GUI } from '@/components/dom/gui'
import dynamic from 'next/dynamic'

const MovingGradientMesh = dynamic(
  () => import('@/components/canvas/MovingGradientMesh'),
  {
    ssr: false,
  }
)

const Page = () => {
  return (
    <>
      <MovingGradientMesh r3f />
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

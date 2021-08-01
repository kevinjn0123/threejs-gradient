import { GUI } from '@/components/dom/gui'
import dynamic from 'next/dynamic'

const MaterialElement = dynamic(
  () => import('@/components/canvas/MaterialElement'),
  {
    ssr: false,
  }
)

const Page = () => {
  return (
    <>
      <MaterialElement r3f />
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

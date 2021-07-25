import { GUI } from '@/components/dom/gui'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { FormContext } from '@/helpers/form-provider'

const MovingGradient = dynamic(
  () => import('@/components/canvas/MovingGradient'),
  {
    ssr: false,
  }
)

const Page = () => {
  return (
    <>
      <MovingGradient r3f />
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

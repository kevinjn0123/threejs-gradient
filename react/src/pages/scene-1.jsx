import { GUI } from '@/components/dom/gui'
import dynamic from 'next/dynamic'
import { FormContext } from '../helpers/form-provider'
import { useForm } from 'react-hook-form'

const MovingGradient = dynamic(
  () => import('@/components/canvas/MovingGradient'),
  {
    ssr: false,
  }
)

const Page = () => {
  console.log('useForm', useForm)
  // const formProps = useForm({
  //   defaultValues: {
  //     noiseStrength: 0.1,
  //   },
  // })
  // console.log('FormContext', FormContext)

  return (
    <>
      <MovingGradient r3f />
      {/* <FormContext.Provider value={formProps}> */}
      {/* <GUI /> */}
      {/* </FormContext.Provider> */}
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

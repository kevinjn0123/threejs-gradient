import dynamic from 'next/dynamic'

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

import dynamic from 'next/dynamic'

// Step 2 - update Box components
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <Box r3f route='/box' />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}

import { Box, Gradient } from 'graadient'

const Page = () => {
  return (
    <>
      <Box r3f />
      <Gradient r3f />
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

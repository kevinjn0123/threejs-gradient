import { Counter, Box } from 'graadient'

const Page = () => {
  return (
    <>
      <Counter />
      <Box r3f />
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

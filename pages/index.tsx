import HomePage from '../src/components/Home/Home'
import Layout from '../src/components/Layout/Layout'

export default function Home() {
  return (
    <Layout
      siteTitle="India | Volvo Cars"
      siteDescription="Welcome to the India site of Volvo Cars. Explore and design your favorite Volvo SUV, estate and sedan today."
    >
      <HomePage />
    </Layout>
  )
}

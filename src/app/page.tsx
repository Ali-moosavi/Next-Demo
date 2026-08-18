import Slider from '@/components/slider/Slider'
import TopProducts from '@/components/home/TopProducts'
import type { PRODUCT_TYPE } from '@/types/types'
import { getAllProducts } from '@/lib/data'

async function Home() {
  
  const products: PRODUCT_TYPE[] = getAllProducts()

  const topProducts = [...products]
    .sort((a, b) => Number(b.rate) - Number(a.rate))
    .slice(0, 12)

  return (
    <main>
      <Slider />
      <TopProducts products={topProducts} />
    </main>
  )
}

export default Home

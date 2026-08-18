import { Suspense } from 'react'
import CategoryClientView from '@/components/category/CategoryClientView'
import type { SUCCES_PROPERTIES_TYPE, PRODUCT_TYPE, CATEGORY_TYPE } from '@/types/types'

export const revalidate = 3600
export const dynamicParams = true

const findCategoryById = (
  items: CATEGORY_TYPE[],
  targetId: number,
): CATEGORY_TYPE | null => {
  for (const item of items) {
    const currentId = Number(item.categoryid ?? item.id)
    if (currentId === targetId) return item
    if (Array.isArray(item.children)) {
      const found = findCategoryById(item.children, targetId)
      if (found) return found
    }
  }
  return null
}

const collectCategoryIds = (node: CATEGORY_TYPE): number[] => {
  const ids: number[] = []
  const walk = (current: CATEGORY_TYPE) => {
    if (!current) return
    const currentId = Number(current.categoryid ?? current.id)
    if (!Number.isNaN(currentId)) ids.push(currentId)
    if (Array.isArray(current.children)) {
      current.children.forEach(walk)
    }
  }
  walk(node)
  return ids
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      next: { revalidate: 3600 },
    })
    const categories: CATEGORY_TYPE[] = await res.json()

    const getAllIds = (items: CATEGORY_TYPE[]): string[] => {
      return items.flatMap((item) => {
        const id = String(item.categoryid ?? item.id)
        const childIds = item.children ? getAllIds(item.children) : []
        return [id, ...childIds]
      })
    }

    return getAllIds(categories).map((categoryid) => ({
      categoryid,
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

async function getData() {
  const [propertiesRes, categoriesRes, productsRes] = await Promise.all([
    fetch('http://localhost:3001/filters', { next: { revalidate: 3600 } }),
    fetch('http://localhost:3001/categories', { next: { revalidate: 3600 } }),
    fetch('http://localhost:3001/products', { next: { revalidate: 3600 } }),
  ])

  const properties: SUCCES_PROPERTIES_TYPE[] = await propertiesRes.json()
  const categories: CATEGORY_TYPE[] = await categoriesRes.json()
  const products: PRODUCT_TYPE[] = await productsRes.json()

  return { properties, categories, products }
}

interface PageProps {
  params: Promise<{ categoryid: string }>
}

export default async function CategoryIdPage({ params }: PageProps) {
  const { categoryid } = await params
  const targetId = Number(categoryid)

  const { properties, categories, products } = await getData()

  let categoryName = ''
  let categoryProducts: PRODUCT_TYPE[] = []

  if (Number.isFinite(targetId)) {
    const targetCategory = findCategoryById(categories, targetId)
    categoryName = targetCategory?.name ?? ''
    const categoryIds = targetCategory ? collectCategoryIds(targetCategory) : [targetId]

    categoryProducts = products.filter((product) =>
      categoryIds.includes(Number(product.Categoryid)),
    )
  }

  return (
    <Suspense fallback={null}>
      <CategoryClientView
        categoryName={categoryName}
        allProducts={categoryProducts}
        properties={properties}
      />
    </Suspense>
  )
}
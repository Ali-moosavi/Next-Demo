import db from '@/data/db.json'
import type { PRODUCT_TYPE, CATEGORY_TYPE, SUCCES_PROPERTIES_TYPE } from '@/types/types'

function nodeId(node: CATEGORY_TYPE): number | undefined {
  return node.categoryid ?? node.id
}

export function getCategoryTree(): CATEGORY_TYPE[] {
  return db.categories as unknown as CATEGORY_TYPE[]
}

export function findCategoryById(
  targetId: number,
  nodes: CATEGORY_TYPE[] = getCategoryTree()
): CATEGORY_TYPE | null {
  for (const node of nodes) {
    if (Number(nodeId(node)) === targetId) return node
    if (node.children?.length) {
      const found = findCategoryById(targetId, node.children)
      if (found) return found
    }
  }
  return null
}

export function collectCategoryIds(node: CATEGORY_TYPE): number[] {
  const ids: number[] = []
  const walk = (current: CATEGORY_TYPE) => {
    const currentId = Number(nodeId(current))
    if (!Number.isNaN(currentId)) ids.push(currentId)
    current.children?.forEach(walk)
  }
  walk(node)
  return ids
}

export function getAllProducts(): PRODUCT_TYPE[] {
  return db.products as unknown as PRODUCT_TYPE[]
}

export function getProductById(id: number): PRODUCT_TYPE | undefined {
  return getAllProducts().find((p) => p.id === id)
}

export function getAllFilters(): SUCCES_PROPERTIES_TYPE[] {
  return db.filters as unknown as SUCCES_PROPERTIES_TYPE[]
}
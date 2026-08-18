'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getPaginatedItems, Item } from '@/lib/api'
import { TruncatedPagination } from '@/components/category/TruncatedPagination'

function PaginatedListContent() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const [items, setItems] = useState<Item[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const limit = 10

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getPaginatedItems(currentPage, limit)
        setItems(response.data)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="min-h-[300px] border rounded-lg p-4 bg-background shadow-sm">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">
            Loading page {currentPage}...
          </p>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-3 text-sm font-medium">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <TruncatedPagination totalPages={totalPages} />
    </div>
  )
}

export default function PaginatedList() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading pagination...</p>}>
      <PaginatedListContent />
    </Suspense>
  )
}
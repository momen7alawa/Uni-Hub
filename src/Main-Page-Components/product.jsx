 import React, { useEffect, useState } from 'react'
import Pagetitle from '../Pagetitle'
import ProductsSection from '../ProductsSection'
import SingleProduct from '../SingleProduct'
import { useLocation } from 'react-router-dom'

const normalizeItem = (item, index = 0) => {
  let imagePath = item.imageURL || item.image || ''

  if (imagePath.startsWith('./../images/')) {
    const parts = imagePath.split('/')
    imagePath = '/images/' + parts[parts.length - 1]
  }

  return {
    id: item.id ?? index + 1,
    title: item.title,
    image: imagePath,
    category: item.class || item.category || 'Tools',
    price: typeof item.price === 'number' ? item.price : 0,
    description:
      item.description ||
      `Shared tool: ${item.title}${item.owner ? ` (owner: ${item.owner})` : ''
      }.`,
    owner: item.owner,
    class: item.class,
  }
};
/*
if (location.state?.product) {
  const fromNav = normalizeItem(location.state.product, 0)
  setSelectedProduct(fromNav)
}
*/


const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items`)
        if (!res.ok) throw new Error('Failed to load items')
        const rawData = await res.json()
        const normalized = rawData.map((item, idx) =>
          normalizeItem(item, idx)
        )
        setProducts(normalized)

        if (location.state?.product) {
          const fromNav = normalizeItem(location.state.product, 0)
          setSelectedProduct(fromNav)
        }
      } catch (err) {
        console.error('Error fetching items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [location.state])

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      {selectedProduct ? (
        <SingleProduct
          product={selectedProduct}
          onBack={handleBack} // ⬅️ يتم تمرير الدالة handleBack إلى onBack في SingleProduct
          relatedProducts={products}
          onSelectProduct={handleSelectProduct}
        />
      ) : (
        <>
          <Pagetitle title="Available Tools" />
          <ProductsSection
            products={products}
            loading={loading}
            onSelectProduct={handleSelectProduct}
          />
        </>
      )}
    </main>
  )
}

export default ProductPage
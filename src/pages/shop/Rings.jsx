

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa"
import { useCart } from "../../hooks/useCart"
import productService from "../../services/productService"

const ImageSlider = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        No Image
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${name} ${idx + 1}`}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
          style={{ opacity: idx === currentIndex ? 1 : 0 }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Rings = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getProducts({ category: 'rings' })
      
      if (data.products && data.products.length > 0) {
        setProducts(data.products)
      } else if (Array.isArray(data)) {
        setProducts(data)
      } else {
        setProducts([])
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleBuyNow = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    navigate("/checkout")
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        setVisibleCount(prev => Math.min(prev + 4, products.length))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [products.length])

  // 🔥 Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array(10).fill().map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl p-3 space-y-3">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Rings Collection
          </h1>

          <span className="text-sm bg-white border px-4 py-1.5 rounded-full text-gray-600">
            {products.length} items
          </span>
        </div>

        {/* Empty */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No rings available
          </div>
        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">

            {products.slice(0, visibleCount).map((product, index) => {

  const price = product.price || 0
  const originalPrice = product.originalPrice || product.comparePrice || price

  const discount =
    product.discount ||
    (originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0)

  const rating = product.ratings || 0

  return (
    <div
      key={product._id}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{
        animation: 'fade-in-up 0.5s ease-out backwards',
        animationDelay: `${index * 80}ms`
      }}
    >

      <Link to={`/product/${product._id}`}>

        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden group">
          <ImageSlider images={product.images} name={product.name} />

          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded">
            NEW
          </span>
        </div>

        {/* Info */}
        <div className="p-2 space-y-1">

          {/* Name */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
            {product.name}
          </h3>

          {/* ⭐ Rating FIX */}
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1 bg-green-600 text-white text-[11px] px-2 py-0.5 rounded">
              {rating.toFixed(1)}
              <FaStar size={10} />
            </span>

            <span className="text-[10px] text-gray-400">
              ({product.numReviews || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </span>

            {originalPrice > price && (
              <>
                <span className="text-[10px] line-through text-gray-400">
                  ₹{originalPrice.toLocaleString()}
                </span>

                <span className="text-[10px] text-green-600 font-semibold">
                  {discount}% off
                </span>
              </>
            )}
          </div>

        </div>

      </Link>

      {/* ✅ Buttons ALWAYS visible */}
      <div className="flex gap-2 p-2 pt-0">

        <button
          onClick={(e) => handleAddToCart(product, e)}
          className="flex-1 bg-gray-100 text-gray-700 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1"
        >
          <FaShoppingCart size={11} />
          Cart
        </button>

        <button
          onClick={(e) => handleBuyNow(product, e)}
          className="flex-1 bg-blue-600 text-white py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1"
        >
          <FaBolt size={11} />
          Buy
        </button>

      </div>

    </div>
  )
})}

          </div>
        )}
      </div>
    </section>
  )
}

export default Rings

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { FaSearch, FaStar, FaShoppingCart, FaBolt } from "react-icons/fa"
import { useCart } from "../../hooks/useCart"
import productService from "../../services/productService"
import { CATEGORIES_DATA } from "../../utils/categoryData"

const ProductCard = ({ product, onAddToCart, onBuyNow, delay }) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const discountPercent =
    product.comparePrice && product.price && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 flex flex-col justify-between ${
        isVisible ? 'opacity-100 translate-y-0 animate-fade-in' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      <Link to={`/product/${product._id}`} className="block">
        {/* Product Image */}
        <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-2">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
              No Image
            </div>
          )}
          {discountPercent ? (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          ) : (
            <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Info */}
        <div className="px-3 pt-2 pb-1 space-y-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              {product.ratings?.toFixed(1) || '0.0'} <FaStar className="text-[8px]" />
            </span>
            <span className="text-[11px] text-gray-400">({product.numReviews || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.comparePrice?.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-3 pb-3 pt-2 flex gap-1.5">
        <button
          onClick={(e) => onAddToCart(product, e)}
          className="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1 text-xs font-medium transition-colors cursor-pointer"
        >
          <FaShoppingCart size={11} />
          Cart
        </button>
        <button
          onClick={(e) => onBuyNow(product, e)}
          className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-xs font-medium transition-colors cursor-pointer"
        >
          <FaBolt size={11} />
          Buy
        </button>
      </div>
    </div>
  )
}

const Shop = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || "")

  const searchTerm = searchParams.get('search') || ""
  const selectedCategory = searchParams.get('category') || ""
  const selectedSubcategory = searchParams.get('subcategory') || ""

  const activeCategoryObj = CATEGORIES_DATA.find(
    (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase() || cat.slug.toLowerCase() === selectedCategory.toLowerCase()
  )

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory, selectedSubcategory])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await productService.getProducts({
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedSubcategory && { subcategory: selectedSubcategory }),
        ...(searchTerm && { search: searchTerm })
      })

      let resultList = data.products || (Array.isArray(data) ? data : [])
      
      if (selectedSubcategory && resultList.length > 0) {
        resultList = resultList.filter(
          p => p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase() ||
               p.subCategory?.toLowerCase() === selectedSubcategory.toLowerCase() ||
               p.name?.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
               p.description?.toLowerCase().includes(selectedSubcategory.toLowerCase())
        )
      }

      setProducts(resultList)
    } catch (err) {
      setError(err.message)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput) {
      navigate(`/shop?search=${encodeURIComponent(searchInput)}`)
    } else {
      navigate('/shop')
    }
  }

  const handleCategoryChange = (catName) => {
    if (catName) {
      navigate(`/shop?category=${encodeURIComponent(catName)}`)
    } else {
      navigate('/shop')
    }
  }

  const handleSubcategoryChange = (subName) => {
    if (subName) {
      navigate(`/shop?category=${encodeURIComponent(selectedCategory)}&subcategory=${encodeURIComponent(subName)}`)
    } else {
      navigate(`/shop?category=${encodeURIComponent(selectedCategory)}`)
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
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Clean Header & Category Filter Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full max-w-7xl mx-auto px-4 py-5 space-y-4">
          
          {/* Header Title & Search Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Electronics & Gadgets Shop</h1>
              <p className="text-xs text-gray-500 mt-1">
                {selectedCategory
                  ? `${selectedCategory} ${selectedSubcategory ? `> ${selectedSubcategory}` : ''}`
                  : 'All Electronics Products'}
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-80">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-full px-4 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-blue-700 transition duration-200"
              >
                Search
              </button>
            </form>
          </div>

          {/* ALL CATEGORIES IN ONE SINGLE-PAGE FLEX WRAP ROW (No horizontal scrollbar slider!) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCategoryChange("")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  !selectedCategory
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES_DATA.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase()
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subcategories (if main category selected) */}
          {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
            <div className="pt-2 border-t border-dashed border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Subcategories:
              </span>
              <button
                onClick={() => handleSubcategoryChange("")}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border cursor-pointer ${
                  !selectedSubcategory
                    ? 'bg-yellow-400 text-gray-900 border-yellow-500 font-bold'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                All {activeCategoryObj.name}
              </button>
              {activeCategoryObj.subcategories.map((sub, sIdx) => {
                const isSubSelected = selectedSubcategory.toLowerCase() === sub.toLowerCase()
                return (
                  <button
                    key={sIdx}
                    onClick={() => handleSubcategoryChange(sub)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border cursor-pointer ${
                      isSubSelected
                        ? 'bg-yellow-400 text-gray-900 border-yellow-500 font-bold shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {sub}
                  </button>
                )
              })}
            </div>
          )}

        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-500 text-sm font-medium">{products.length} products found</p>
          {(selectedCategory || selectedSubcategory || searchTerm) && (
            <button
              onClick={() => { setSearchInput(""); navigate('/shop'); }}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {error ? (
          <div className="text-center py-12 bg-white rounded-xl border p-6">
            <p className="text-red-500 font-medium mb-3">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
            <p className="text-gray-600 text-base font-semibold mb-2">No products found</p>
            <p className="text-gray-400 text-xs mb-6">Try selecting another category or clear your search filters.</p>
            <button
              onClick={() => { setSearchInput(""); navigate('/shop'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                delay={index * 60}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop

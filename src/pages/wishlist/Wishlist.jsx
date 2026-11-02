import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa"
import { useCart } from "../../hooks/useCart"
import { WishlistContext } from "../../context/WishlistContext"
import { AuthContext } from "../../context/AuthContext"

const Wishlist = () => {
  const { user } = useContext(AuthContext)
  const { wishlist, removeFromWishlist, addToWishlist, loading } = useContext(WishlistContext)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=wishlist')
    }
  }, [user, navigate])

  const handleAddToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product._id)
  }

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaHeart className="mx-auto text-gray-300 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite jewelry items here!</p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Product Image */}
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(product._id)
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <span className="text-xs text-blue-600 uppercase">{product.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {product.ratings?.toFixed(1) || '0.0'} ({product.numReviews || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist

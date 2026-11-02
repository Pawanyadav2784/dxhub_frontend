import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FaStar, FaShoppingCart, FaHeart, FaMinus, FaPlus, FaCheck, FaUpload, FaTimes, FaChevronRight } from "react-icons/fa"
import { useCart } from "../../hooks/useCart"
import { WishlistContext } from "../../context/WishlistContext"
import { AuthContext } from "../../context/AuthContext"
import productService from "../../services/productService"
import uploadService from "../../services/uploadService"
import SEO from "../../components/seo/SEO"
import { getSiteUrl } from "../../components/seo/seoConfig"

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const { user } = useContext(AuthContext)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewImages, setReviewImages] = useState([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setSelectedImage(0)  // image reset on product change
        const data = await productService.getProductById(id)
        setProduct(data)
        setError(null)

        // ✅ Flipkart style — same category + random mix
        const [sameCatResult, randomResult] = await Promise.all([
          // Same category ke products (4 max)
          productService.getProducts({
            category: data?.category,
            limit: 6
          }),
          // Random sab products (price-high sorted — variety ke liye)
          productService.getProducts({
            sort: 'price-high',
            limit: 12
          })
        ])

        const sameCat = (sameCatResult.products || sameCatResult)
          .filter(p => p._id !== id)
          .slice(0, 4)

        const random = (randomResult.products || randomResult)
          .filter(p => p._id !== id && !sameCat.find(s => s._id === p._id))
          .slice(0, 6)

        // Dono mix karo — shuffle karke natural lagao
        const mixed = [...sameCat, ...random].sort(() => Math.random() - 0.5)
        setSimilarProducts(mixed)
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart({ ...product, quantity })
    navigate('/checkout')
  }

  const handleWishlist = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    setWishlistLoading(true)
    try {
      if (isInWishlist(id)) {
        await removeFromWishlist(id)
      } else {
        await addToWishlist(id)
      }
    } catch (err) {
      console.error('Wishlist error:', err)
    } finally {
      setWishlistLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploadingImages(true)
    try {
      const urls = await uploadService.uploadImages(files)
      setReviewImages(prev => [...prev, ...urls])
    } catch (err) {
      alert('Failed to upload images')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeReviewImage = (index) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await productService.createReview(id, {
        rating: reviewRating,
        comment: reviewComment,
        images: reviewImages
      })
      setReviewComment('')
      setReviewRating(5)
      setReviewImages([])
      const data = await productService.getProductById(id)
      setProduct(data)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found</h2>
          <button onClick={() => navigate('/shop')} className="bg-blue-600 text-white px-6 py-2 rounded">
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const discount = product.comparePrice 
    ? Math.round((1 - product.price / product.comparePrice) * 100) 
    : 0
  const inWishlist = isInWishlist(id)
  const productDescription = (product.description || `Shop ${product.name} at DXHUB.`)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productDescription,
    image: product.images || [],
    sku: product.sku || product._id,
    category: product.category,
    brand: { "@type": "Brand", name: "DXHUB" },
    offers: {
      "@type": "Offer",
      url: `${getSiteUrl()}/product/${id}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(product.numReviews > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratings,
        reviewCount: product.numReviews,
      },
    }),
  }

  return (
    <>
      <SEO
        title={product.name}
        description={productDescription}
        path={`/product/${id}`}
        image={product.images?.[0] || "/logo.jpeg"}
        type="product"
        schema={productSchema}
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-blue-600">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 flex-shrink-0 overflow-hidden ${
                      selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              </div>
              <button
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className={`p-2 rounded-full transition-colors ${
                  inWishlist 
                    ? 'bg-red-100 text-red-500' 
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <FaHeart className={inWishlist ? 'fill-current' : ''} size={24} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(product.ratings || 0) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.ratings?.toFixed(1) || '0.0'} ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.comparePrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.comparePrice}</span>
                  <span className="text-lg font-semibold text-green-600">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Vendor Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Sold by</p>
              <p className="font-semibold text-gray-900">{product.vendorName || 'Unknown Vendor'}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <FaCheck className="text-green-500" />
                  <span className="text-green-700 font-medium">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FaMinus size={14} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-x border-gray-300 py-2"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <FaShoppingCart />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            {(product.material || product.weight || product.dimensions) && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  {product.material && (
                    <div className="flex">
                      <span className="w-24 text-gray-600">Material:</span>
                      <span className="text-gray-900">{product.material}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex">
                      <span className="w-24 text-gray-600">Weight:</span>
                      <span className="text-gray-900">{product.weight}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex">
                      <span className="w-24 text-gray-600">Dimensions:</span>
                      <span className="text-gray-900">{product.dimensions}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'description'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Add Review Form */}
                {user && (
                  <form onSubmit={handleReviewSubmit} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Write a Review</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-600">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            className={star <= reviewRating ? "text-yellow-400" : "text-gray-300"}
                            size={20}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                    />
                    
                    {/* Review Images Upload */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-2">Add Photos (Optional)</label>
                      <div className="flex flex-wrap gap-2">
                        {reviewImages.map((url, idx) => (
                          <div key={idx} className="relative w-20 h-20">
                            <img src={url} alt={`Review ${idx + 1}`} className="w-full h-full object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => removeReviewImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}
                        {reviewImages.length < 5 && (
                          <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-400">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploadingImages}
                            />
                            {uploadingImages ? (
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
                            ) : (
                              <FaUpload className="text-gray-400" />
                            )}
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Upload up to 5 images</p>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review, idx) => (
                      <div key={idx} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {review.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold">{review.name}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                                    size={14}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        
                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {review.images.map((img, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={img}
                                alt={`Review image ${imgIdx + 1}`}
                                className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                                onClick={() => window.open(img, '_blank')}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ✅ SIMILAR PRODUCTS SECTION — Compact Style */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-600 rounded-full" />
                <h2 className="text-lg font-bold text-gray-900">You May Also Like</h2>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
              >
                View All <FaChevronRight size={10} />
              </Link>
            </div>

            {/* Auto-fill grid — no empty gaps */}
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
            >
              {similarProducts.map((p) => {
                const disc = p.comparePrice
                  ? Math.round((1 - p.price / p.comparePrice) * 100)
                  : 0
                return (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="bg-white rounded-lg border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    {/* Image — fixed small size */}
                    <div className="relative w-full h-28 bg-white overflow-hidden flex items-center justify-center">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                      )}
                      {disc > 0 && (
                        <span className="absolute top-1 left-1 bg-green-500 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                          {disc}%
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
                        {p.name}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 flex-wrap mb-1.5">
                        <span className="text-sm font-bold text-gray-900">₹{p.price?.toLocaleString()}</span>
                        {p.comparePrice && (
                          <span className="text-[10px] text-gray-400 line-through">₹{p.comparePrice?.toLocaleString()}</span>
                        )}
                      </div>

                      {/* Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart({ ...p, quantity: 1 })
                        }}
                        disabled={p.stock === 0}
                        className="w-full text-[10px] py-1 rounded font-semibold flex items-center justify-center gap-1 transition-colors
                          bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FaShoppingCart size={9} />
                        {p.stock === 0 ? 'Out of Stock' : 'Add'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
      </div>
    </>
  )
}

export default ProductDetails

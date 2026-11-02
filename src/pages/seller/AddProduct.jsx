import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaCloudUploadAlt, FaTimes, FaBox, FaTag, FaCheckCircle, FaStar, FaEye, FaPercent, FaShieldAlt } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import productService from "../../services/productService"
import uploadService from "../../services/uploadService"
import { CATEGORIES_DATA } from "../../utils/categoryData"

const AddProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isVendor } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: 'Mobiles & Accessories',
    subCategory: '',
    stock: '',
    material: '',
    weight: '',
    dimensions: '',
    images: []
  })
  
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [error, setError] = useState('')
  const [previewImages, setPreviewImages] = useState([])

  useEffect(() => {
    if (!isVendor) {
      navigate('/')
      return
    }

    if (id) {
      fetchProduct()
    }
  }, [id, isVendor, navigate])

  const fetchProduct = async () => {
    try {
      const product = await productService.getProductById(id)
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        comparePrice: product.comparePrice || '',
        category: product.category || 'Mobiles & Accessories',
        subCategory: product.subCategory || '',
        stock: product.stock || '',
        material: product.material || '',
        weight: product.weight || '',
        dimensions: product.dimensions || '',
        images: product.images || []
      })
      setPreviewImages(product.images || [])
    } catch (err) {
      setError('Failed to load product details')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploadingImages(true)
    try {
      const urls = await uploadService.uploadImages(files)
      setPreviewImages(prev => [...prev, ...urls])
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    } catch (err) {
      alert('Failed to upload images. Please try again.')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        stock: parseInt(formData.stock)
      }

      const productId = id || window.location.pathname.split('/').pop()
      
      if (productId && window.location.pathname.includes('edit-product')) {
        await productService.updateProduct(productId, productData)
        alert('Product updated successfully!')
      } else {
        await productService.createProduct(productData)
        alert('Product added successfully!')
      }
      
      navigate('/seller/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  // Calculate discount percentage for live preview
  const priceVal = parseFloat(formData.price) || 0
  const compareVal = parseFloat(formData.comparePrice) || 0
  const discountPercent = (compareVal > priceVal && priceVal > 0)
    ? Math.round(((compareVal - priceVal) / compareVal) * 100)
    : 0

  if (!isVendor) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24 text-slate-900">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white shadow-xl border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/seller/dashboard')}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition border border-white/10 shadow-inner"
                title="Back to Seller Dashboard"
              >
                <FaArrowLeft size={16} />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-widest shadow-sm">
                    DXHUB Seller Studio
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {id ? 'Edit Product Listing' : 'Create New Listing'}
                </h1>
                <p className="text-xs text-blue-200 mt-0.5 font-medium">
                  Fill in product specifications and publish directly to the marketplace
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
              <FaShieldAlt className="text-amber-400" />
              <span className="text-xs text-white font-bold">Verified Vendor Account</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-md">
            <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0 text-rose-700">
              <FaTimes />
            </div>
            <span>{error}</span>
          </div>
        )}

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT FORM COLUMN (7 Cols on LG) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            
            {/* Card 1: Product Images Upload */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-extrabold text-sm shadow-inner">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Product Media Gallery</h3>
                    <p className="text-xs text-slate-500 font-medium">High quality product photos increase sales</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Cloudinary Powered
                </span>
              </div>

              <div className="border-2 border-dashed border-blue-300/80 hover:border-blue-600 bg-gradient-to-b from-blue-50/30 to-indigo-50/20 hover:from-blue-50/80 hover:to-blue-100/40 rounded-2xl p-8 text-center transition cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImages}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  {uploadingImages ? (
                    <div className="flex flex-col items-center py-2">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-3"></div>
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Uploading images...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/25 mb-3 group-hover:scale-110 transition">
                        <FaCloudUploadAlt size={30} />
                      </div>
                      <span className="text-base font-extrabold text-slate-800 group-hover:text-blue-600 transition">Click or drag images to upload</span>
                      <span className="text-xs text-slate-400 mt-1 font-semibold">PNG, JPG, WEBP • Max 5MB per file</span>
                    </div>
                  )}
                </label>
              </div>

              {previewImages.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                    Uploaded Media ({previewImages.length})
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {previewImages.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                        <img
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                            Main
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-rose-600 text-white rounded-full p-1 shadow-lg hover:bg-rose-700 transition"
                          title="Delete Image"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Basic Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-extrabold text-sm shadow-inner">
                  2
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Product Title & Description</h3>
                  <p className="text-xs text-slate-500 font-medium">Core information visible to customers</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Product Title / Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="e.g. Ultra HD Smart ANC Wireless Headphones 500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Product Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="Write a clear overview highlighting key specifications, build material, features, and box contents..."
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Pricing & Stock */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-extrabold text-sm shadow-inner">
                  3
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Pricing & Inventory</h3>
                  <p className="text-xs text-slate-500 font-medium">Configure customer price, MRP strike price & stock</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Selling Price (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">₹</span>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl pl-9 pr-4 py-3 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                      placeholder="999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    MRP / Compare (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">₹</span>
                    <input
                      type="number"
                      name="comparePrice"
                      min="0"
                      value={formData.comparePrice}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl pl-9 pr-4 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                      placeholder="1999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Stock Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="50"
                  />
                </div>
              </div>

              {discountPercent > 0 && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <FaPercent className="text-emerald-600" />
                  <span>Customers save {discountPercent}% OFF with this price structure!</span>
                </div>
              )}
            </div>

            {/* Card 4: Categories & Technical Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 font-extrabold text-sm shadow-inner">
                  4
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Categories & Tech Specs</h3>
                  <p className="text-xs text-slate-500 font-medium">Proper categorization helps buyers discover your item</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Main Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      const catObj = CATEGORIES_DATA.find(c => c.name === newCat || c.slug === newCat);
                      setFormData(prev => ({
                        ...prev,
                        category: newCat,
                        subCategory: catObj?.subcategories?.[0] || ''
                      }));
                    }}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                  >
                    {CATEGORIES_DATA.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                  >
                    <option value="">Select Subcategory (Optional)</option>
                    {(
                      CATEGORIES_DATA.find(
                        c => c.name.toLowerCase() === formData.category.toLowerCase() || c.slug.toLowerCase() === formData.category.toLowerCase()
                      )?.subcategories || []
                    ).map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Brand / Manufacturer
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="e.g. Samsung, Boat, Sony, LG"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Warranty Info
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="e.g. 1 Year Brand Warranty"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Technical Specifications
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition bg-slate-50/50 focus:bg-white"
                    placeholder="e.g. 8GB RAM, 128GB Storage, 5000mAh Battery"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Form Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/seller/dashboard')}
                className="w-1/3 bg-white hover:bg-slate-100 text-slate-700 font-extrabold py-4 rounded-2xl border border-slate-200 transition text-sm shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImages}
                className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={16} />
                    <span>{id ? 'Update Product' : 'Publish Product'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* RIGHT LIVE PREVIEW COLUMN (5 Cols on LG) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <FaEye className="text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Live Customer Preview</h3>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Realtime Store Card
                </span>
              </div>

              {/* Product Preview Card */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                {/* Image Box */}
                <div className="relative aspect-square bg-slate-100 flex items-center justify-center overflow-hidden group">
                  {previewImages.length > 0 ? (
                    <img
                      src={previewImages[0]}
                      alt="Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400 p-4 text-center">
                      <FaBox size={48} className="mb-2 opacity-50" />
                      <span className="text-xs font-bold text-slate-400">No Image Uploaded Yet</span>
                    </div>
                  )}

                  {discountPercent > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                      {discountPercent}% OFF
                    </span>
                  )}

                  {formData.material && (
                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md">
                      {formData.material}
                    </span>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-blue-600 uppercase">
                    <span>{formData.category || 'Category'}</span>
                    {formData.subCategory && <span className="text-slate-400">• {formData.subCategory}</span>}
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {formData.name || 'Product Title Will Appear Here'}
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={11} />
                      ))}
                    </div>
                    <span className="text-slate-500 text-[11px] ml-1">(0 reviews)</span>
                  </div>

                  {/* Price Row */}
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900">
                      ₹{formData.price ? parseFloat(formData.price).toLocaleString() : '0'}
                    </span>
                    {formData.comparePrice && parseFloat(formData.comparePrice) > (parseFloat(formData.price) || 0) && (
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        ₹{parseFloat(formData.comparePrice).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock Pill */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Stock Availability:</span>
                    <span className={`font-extrabold ${parseInt(formData.stock) > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {parseInt(formData.stock) > 0 ? `${formData.stock} Units` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips & Guidance */}
              <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs text-slate-600 space-y-1">
                <p className="font-extrabold text-blue-900 flex items-center gap-1.5">
                  <FaTag className="text-blue-600" /> Pro Seller Tip:
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Products with high-resolution images and original MRP compare prices receive up to 3x more customer orders!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddProduct

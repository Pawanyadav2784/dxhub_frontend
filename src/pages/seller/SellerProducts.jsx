import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBox, FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import productService from "../../services/productService"

const SellerProducts = () => {
  const { isVendor } = useContext(AuthContext)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isVendor) {
      navigate('/')
      return
    }
    fetchProducts()
  }, [isVendor, navigate])

  const fetchProducts = async () => {
    try {
      const data = await productService.getVendorProducts()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId)
        fetchProducts()
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  if (!isVendor) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/seller/dashboard')}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Products ({products.length})</h1>
          </div>
          <Link
            to="/seller/add-product"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus size={14} /> Add Product
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaBox className="mx-auto text-gray-300 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products yet</h2>
            <p className="text-gray-600 mb-6">Start selling by adding your first product!</p>
            <Link
              to="/seller/add-product"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                          {product.images?.[0] && (
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">₹{product.price}</td>
                    <td className="px-4 py-3">
                      <span className={product.stock < 10 ? 'text-red-600' : 'text-gray-900'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/seller/edit-product/${product._id}`}
                          className="p-2 hover:bg-gray-100 rounded text-green-600"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 hover:bg-gray-100 rounded text-red-600"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerProducts

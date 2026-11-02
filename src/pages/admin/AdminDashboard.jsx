import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUsers, FaBox, FaShoppingCart, FaRupeeSign, FaEdit, FaTrash, FaCheck, FaTimes, FaUndo } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import api from "../../services/api"
import { ENDPOINTS } from "../../utils/endpoints"

const AdminDashboard = () => {
  const { user, isAdmin } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
      return
    }
    fetchData()
  }, [isAdmin, navigate])

  const fetchData = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        api.get(ENDPOINTS.AUTH.USERS),
        api.get(ENDPOINTS.PRODUCTS.BASE),
        api.get(ENDPOINTS.ORDERS.BASE)
      ])
      
      setUsers(usersRes.data)
      setProducts(productsRes.data.products || [])
      setOrders(ordersRes.data)
      
      const totalRevenue = ordersRes.data
        .filter(o => o.paymentStatus === 'paid' || o.paymentMethod === 'cod')
        .reduce((sum, o) => sum + o.totalPrice, 0)
      
      setStats({
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.total || productsRes.data.products?.length || 0,
        totalOrders: ordersRes.data.length,
        totalRevenue
      })
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`${ENDPOINTS.AUTH.USERS}/${userId}`)
        fetchData()
      } catch (error) {
        alert('Failed to delete user')
      }
    }
  }

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`${ENDPOINTS.ORDERS.BASE}/${orderId}/status`, { orderStatus: status })
      fetchData()
    } catch (error) {
      alert('Failed to update order status')
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`${ENDPOINTS.PRODUCTS.BASE}/${productId}`)
        fetchData()
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex flex-wrap justify-between gap-4">
            <p className="text-gray-600">Welcome, {user?.name}</p>
            <Link to="/admin/returns" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <FaUndo /> Manage Returns
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaBox className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaShoppingCart className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaRupeeSign className="text-orange-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products ({products.length})
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Recent Orders */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {orders.slice(0, 5).map((order) => (
                              <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">#{order._id.slice(-6).toUpperCase()}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{order.user?.name || 'Unknown'}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{order.totalPrice}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                    order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {order.orderStatus}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {orders.length === 0 && (
                          <p className="text-center text-gray-500 py-8">No orders yet</p>
                        )}
                      </div>
                    </div>

                    {/* Recent Users */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Joined</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {users.slice(0, 5).map((u) => (
                              <tr key={u._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{u.email}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                    u.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">All Users ({users.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Shop</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {users.map((u) => (
                            <tr key={u._id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{u.email}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                  u.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {u.role}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {u.shopName || '-'}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button className="p-2 hover:bg-gray-100 rounded text-blue-600">
                                    <FaEdit size={16} />
                                  </button>
                                  {u._id !== user._id && (
                                    <button
                                      onClick={() => handleDeleteUser(u._id)}
                                      className="p-2 hover:bg-gray-100 rounded text-red-600"
                                    >
                                      <FaTrash size={16} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">All Orders ({orders.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Items</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Update</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                #{order._id.slice(-6).toUpperCase()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div>
                                  <p className="font-medium">{order.user?.name || 'Unknown'}</p>
                                  <p className="text-gray-500 text-xs">{order.user?.email}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">{order.orderItems?.length || 0}</td>
                              <td className="px-4 py-3 font-medium text-gray-900">₹{order.totalPrice}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                  order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {order.paymentStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                  order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                  order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {order.orderStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {orders.length === 0 && (
                        <p className="text-center text-gray-500 py-12">No orders yet</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">All Products ({products.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vendor</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
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
                                  <p className="font-medium text-gray-900">{product.name}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{product.vendorName}</td>
                              <td className="px-4 py-3 font-medium text-gray-900">₹{product.price}</td>
                              <td className="px-4 py-3 text-gray-900">{product.stock}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{product.category}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {product.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Link
                                  to={`/product/${product._id}`}
                                  className="p-2 hover:bg-gray-100 rounded text-blue-600 inline-block"
                                >
                                  <FaCheck size={16} />
                                </Link>
                                <button
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="p-2 hover:bg-gray-100 rounded text-red-600 inline-block ml-2"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {products.length === 0 && (
                        <p className="text-center text-gray-500 py-12">No products yet</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

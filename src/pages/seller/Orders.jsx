import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBox, FaArrowLeft } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import orderService from "../../services/orderService"

const Orders = () => {
  const { user, isVendor } = useContext(AuthContext)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isVendor) {
      navigate('/')
      return
    }
    fetchOrders()
  }, [isVendor, navigate])

  const fetchOrders = async () => {
    try {
      const data = await orderService.getVendorOrders()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status)
      fetchOrders()
    } catch (error) {
      alert('Failed to update order status')
    }
  }

  if (!isVendor) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/seller/dashboard')}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaBox className="mx-auto text-gray-300 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600">You haven't received any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex flex-wrap justify-between items-start p-4 bg-gray-50 border-b">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">{order.user?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-gray-900">₹{order.vendorSubtotal?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.vendorStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.vendorStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.vendorStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.vendorStatus || 'processing'}
                    </span>
                  </div>
                  <div>
                    <select
                      value={order.vendorStatus || 'processing'}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className="border rounded px-3 py-1"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex gap-4 overflow-x-auto">
                    {order.vendorOrderItems?.map((item, idx) => (
                      <div key={idx} className="flex-shrink-0 w-24">
                        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-medium text-gray-900 mt-1 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  {order.user?.shippingAddress && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                      <p className="font-medium text-gray-900">{order.user.shippingAddress.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {order.user.shippingAddress.street}, {order.user.shippingAddress.city}, 
                        {order.user.shippingAddress.state} - {order.user.shippingAddress.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">Phone: {order.user.shippingAddress.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders

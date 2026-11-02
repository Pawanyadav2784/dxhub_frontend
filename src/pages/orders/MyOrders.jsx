import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBox, FaArrowLeft, FaExchangeAlt, FaFileInvoice, FaHeadset, FaSearch, FaTimesCircle } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import orderService from "../../services/orderService"

const MyOrders = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=my-orders')
      return
    }
    fetchOrders()
  }, [user, navigate])

  const [cancellingId, setCancellingId] = useState(null)

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Kya aap sure hain? Ye order cancel ho jaayega.')) return
    setCancellingId(orderId)
    try {
      await orderService.cancelOrder(orderId)
      // Local state update karo — page reload ki zaroorat nahi
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId
            ? { ...o, orderStatus: 'cancelled', vendorOrders: o.vendorOrders.map(vo => ({ ...vo, status: 'cancelled' })) }
            : o
        )
      )
    } catch (error) {
      alert(error.response?.data?.message || 'Order cancel karne mein problem aayi')
    } finally {
      setCancellingId(null)
    }
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
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start p-4 bg-gray-50 border-b">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-bold text-gray-900">{order.orderNumber || `#${order._id.slice(-8).toUpperCase()}`}</p>
                    {order.isReplacement && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Replacement</span>}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment</p>
                    <p className="font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      to={`/order-tracking/${order._id}`}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      <FaSearch size={14} />
                      Track Order
                    </Link>
                    <Link
                      to={`/invoice/${order._id}`}
                      className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
                    >
                      <FaFileInvoice size={14} />
                      Invoice
                    </Link>
                    <Link
                      to={`/support?orderId=${order._id}`}
                      className="inline-flex items-center gap-2 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm"
                    >
                      <FaHeadset size={14} />
                      Get Help
                    </Link>
                    {order.orderStatus === 'delivered' && !order.isReplacement && (
                      <Link
                        to={`/returns?orderId=${order._id}`}
                        className="inline-flex items-center gap-2 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm"
                      >
                        <FaExchangeAlt size={14} />
                        Return / Exchange
                      </Link>
                    )}
                    {order.orderStatus === 'processing' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancellingId === order._id}
                        className="inline-flex items-center gap-2 bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-sm disabled:opacity-50"
                      >
                        <FaTimesCircle size={14} />
                        {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="flex gap-4 overflow-x-auto">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex-shrink-0 w-24">
                        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden cursor-pointer"
                          onClick={() => navigate(`/product/${item.product}`)}
                        >
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
                        <p className="text-xs font-medium text-gray-900">₹{item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                    <p className="font-medium text-gray-900">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {order.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders

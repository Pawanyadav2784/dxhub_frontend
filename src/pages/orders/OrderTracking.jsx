import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCheck, FaBox, FaTruck, FaHome, FaClock, FaFileInvoice, FaHeadset } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import orderService from "../../services/orderService"

const OrderTracking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrder()
  }, [id, user, navigate])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const data = await orderService.getOrderById(id)
      setOrder(data)
      setError(null)
    } catch (err) {
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'processing': return 0
      case 'shipped': return 1
      case 'delivered': return 2
      case 'cancelled': return -1
      default: return 0
    }
  }

  const getTimelineIcon = (step, currentStep) => {
    if (currentStep === -1) return <FaClock className="text-red-500" />
    if (step < currentStep) return <FaCheck className="text-white" />
    if (step === currentStep) return <FaBox className="text-white" />
    return <FaBox />
  }

  const getTimelineColor = (step, currentStep) => {
    if (currentStep === -1) return 'bg-red-100 text-red-500'
    if (step < currentStep) return 'bg-green-500 text-white'
    if (step === currentStep) return 'bg-blue-500 text-white'
    return 'bg-gray-200 text-gray-400'
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Order not found</h2>
          <button onClick={() => navigate('/my-orders')} className="bg-blue-600 text-white px-6 py-2 rounded">
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  const currentStep = getStatusStep(order.orderStatus)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/my-orders')}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="text-xl font-bold text-gray-900">{order.orderNumber || `#${order._id.slice(-8).toUpperCase()}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment</p>
              <span className={`px-2 py-1 text-xs rounded-full ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {order.paymentMethod?.toUpperCase()} - {order.paymentStatus}
              </span>
            </div>
          </div>

          {order.trackingNumber && (
            <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Courier Tracking / AWB</p>
              <p className="font-bold text-blue-800">{order.trackingNumber}</p>
              {order.courierName && <p className="text-sm text-gray-600">{order.courierName}</p>}
            </div>
          )}

          {/* Order Status Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            
            {order.orderStatus === 'cancelled' ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <FaClock className="mx-auto text-red-500 text-3xl mb-2" />
                <p className="text-red-700 font-semibold">This order has been cancelled</p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTimelineColor(0, currentStep)}`}>
                    {currentStep > 0 ? <FaCheck /> : <FaBox />}
                  </div>
                  <p className="ml-2 font-medium">Processing</p>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div className={`h-full ${currentStep > 0 ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: currentStep > 0 ? '100%' : '0%' }} />
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTimelineColor(1, currentStep)}`}>
                    {currentStep > 1 ? <FaCheck /> : currentStep === 1 ? <FaTruck /> : <FaTruck />}
                  </div>
                  <p className="ml-2 font-medium">Shipped</p>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div className={`h-full ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: currentStep > 1 ? '100%' : '0%' }} />
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTimelineColor(2, currentStep)}`}>
                    {currentStep === 2 ? <FaCheck /> : <FaHome />}
                  </div>
                  <p className="ml-2 font-medium">Delivered</p>
                </div>
              </div>
            )}
          </div>

          {/* Vendor-specific Status */}
          {order.vendorOrders && order.vendorOrders.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Vendor-wise Status</h3>
              <div className="space-y-4">
                {order.vendorOrders.map((vendorOrder, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{vendorOrder.vendorName}</p>
                        <p className="text-sm text-gray-500">
                          {vendorOrder.items?.length || 0} items • ₹{vendorOrder.subtotal?.toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        vendorOrder.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        vendorOrder.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        vendorOrder.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {vendorOrder.status || 'Processing'}
                      </span>
                    </div>
                    {vendorOrder.trackingNumber && (
                      <p className="mt-3 text-sm text-blue-700">
                        AWB: <strong>{vendorOrder.trackingNumber}</strong>
                        {vendorOrder.courierName ? ` via ${vendorOrder.courierName}` : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems?.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <p className="font-medium text-gray-900">{order.shippingAddress?.fullName}</p>
          <p className="text-gray-600">
            {order.shippingAddress?.street}, {order.shippingAddress?.city}, 
            {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
          </p>
          <p className="text-gray-600">Phone: {order.shippingAddress?.phone}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{order.itemsPrice?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{order.totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => navigate(`/invoice/${order._id}`)}
            className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg"
          >
            <FaFileInvoice /> View Invoice
          </button>
          <button
            onClick={() => navigate(`/support?orderId=${order._id}`)}
            className="flex items-center justify-center gap-2 border border-blue-300 text-blue-700 py-3 rounded-lg"
          >
            <FaHeadset /> Raise Support Ticket
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking

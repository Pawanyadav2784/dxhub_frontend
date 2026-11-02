import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCheck, FaCreditCard, FaUniversity } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import { useCart } from "../../hooks/useCart"
import orderService from "../../services/orderService"
import paymentService from "../../services/paymentService"

const Checkout = () => {
  const { user } = useContext(AuthContext)
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })

  const [paymentMethod, setPaymentMethod] = useState('cod')

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=checkout')
    }
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/shop')
    }
  }, [user, cartItems, navigate, orderPlaced])

  const handleAddressChange = (e) => {
    setShippingAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateAddress = () => {
    const { fullName, phone, street, city, state, postalCode } = shippingAddress
    return fullName && phone && street && city && state && postalCode
  }

  const createOrder = async () => {
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.images?.[0],
        vendor: item.vendor
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: cartTotal,
      shippingPrice: cartTotal >= 500 ? 0 : 50,
      totalPrice: cartTotal >= 500 ? cartTotal : cartTotal + 50
    }

    const order = await orderService.createOrder(orderData)
    return order
  }

  const handlePlaceOrder = async () => {
    if (!validateAddress()) {
      alert('Please fill all shipping address fields')
      return
    }

    setLoading(true)

    try {
      const order = await createOrder()

      // Cash on Delivery / Direct Order (Soft Bypass Razorpay)
      if (paymentMethod === 'cod') {
        setOrderId(order.orderNumber || `ORD-${order._id.slice(-8).toUpperCase()}`)
        setOrderPlaced(true)
        clearCart()
        setStep(3)
        return
      }

      // Online Razorpay Payment (Code intact for future activation)
      try {
        const gatewayOrder = await paymentService.createOrder(
          Math.round(order.totalPrice * 100),
          order._id
        )
        const paymentResult = await paymentService.checkout({
          amount: order.totalPrice,
          key: gatewayOrder.key_id,
          order_id: gatewayOrder.order_id,
          name: user.name,
          email: user.email,
          phone: shippingAddress.phone,
          description: 'Jewelry E-commerce Purchase'
        })

        if (paymentResult.success) {
          await paymentService.verifyPayment(
            paymentResult.orderId,
            paymentResult.paymentId,
            paymentResult.signature,
            order._id
          )
          setOrderId(order.orderNumber || `ORD-${order._id.slice(-8).toUpperCase()}`)
          setOrderPlaced(true)
          clearCart()
          setStep(3)
        }
      } catch (paymentError) {
        console.error('Payment error:', paymentError)
        if (paymentError.message !== 'Payment cancelled') {
          alert(paymentError.message || 'Payment failed. Please try again.')
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  const shippingCost = cartTotal >= 500 ? 0 : 50
  const totalAmount = cartTotal + shippingCost

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > 1 ? <FaCheck /> : '1'}
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > 2 ? <FaCheck /> : '2'}
            </div>
            <div className={`w-20 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleAddressChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="House number and street name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Postal code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!validateAddress()}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                <div className="space-y-4">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50/40 ring-2 ring-green-500/20' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        <span className="font-semibold text-gray-900">Cash on Delivery (COD) / Direct Order</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Pay with cash when your order is delivered to your address</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-60">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <FaCreditCard className="text-purple-600" />
                        <span className="font-medium">UPI / Online Gateway (Temporarily Disabled)</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">GPay, PhonePe, Paytm (Use Cash on Delivery for now)</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Processing...' : paymentMethod === 'cod' ? `Confirm Order (COD) - ₹${totalAmount}` : `Pay Now - ₹${totalAmount}`}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You will be redirected to Razorpay for secure payment
                </p>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-green-600 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-4">Thank you for your order</p>
                <p className="text-lg font-medium text-gray-900 mb-6">
                  Order ID: <span className="text-blue-600">{orderId}</span>
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/my-orders')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                  >
                    View My Orders
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  {shippingCost === 0 && (
                    <p className="text-xs text-green-600">Free shipping on orders above ₹500</p>
                  )}
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft } from "react-icons/fa"
import { useCart } from "../../hooks/useCart"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const navigate = useNavigate()

  const shippingCost = cartTotal >= 500 ? 0 : 50
  const totalAmount = cartTotal + shippingCost

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaShoppingBag className="mx-auto text-gray-300 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful jewelry to your cart!</p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({cartItems.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => navigate(`/product/${item._id}`)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </p>
                    <p className="font-bold text-gray-900 mt-2">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <FaMinus size={12} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-x border-gray-300 py-1"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    >
                      <FaTrash size={14} />
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="mt-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <FaArrowLeft size={14} />
              Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    Add ₹{(500 - cartTotal).toLocaleString()} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Secure checkout powered by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

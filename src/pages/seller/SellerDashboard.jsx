import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBox, FaShoppingCart, FaRupeeSign, FaChartLine, FaPlus, FaEdit, FaTrash, FaEye, FaShippingFast, FaTruck, FaCheck, FaStore, FaClock } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import productService from "../../services/productService"
import orderService from "../../services/orderService"
import shiprocketService from "../../services/shiprocketService"

const SellerDashboard = () => {
  const { user, isVendor } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalEarnings: 0
  })
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isVendor) {
      navigate('/')
      return
    }
    fetchData()
  }, [isVendor, navigate])

  const fetchData = async () => {
    try {
      console.log('Fetching seller data...')
      setLoading(true)
      
      let productsData = []
      let ordersData = []
      
      try {
        productsData = await productService.getVendorProducts()
      } catch (e) {
        console.error('Products error:', e)
      }
      
      try {
        ordersData = await orderService.getVendorOrders()
      } catch (e) {
        console.error('Orders error:', e)
      }
      
      console.log('Vendor products:', productsData)
      console.log('Vendor orders:', ordersData)
      
      setProducts(Array.isArray(productsData) ? productsData : productsData.products || [])
      setOrders(Array.isArray(ordersData) ? ordersData : ordersData.orders || [])
      
      const ordersArr = Array.isArray(ordersData) ? ordersData : []
      const pendingCount = ordersArr.filter(o => o.vendorStatus === 'processing').length
      const totalEarnings = ordersArr
        .filter(o => o.vendorStatus === 'delivered')
        .reduce((sum, o) => sum + (o.vendorSubtotal || 0), 0)
      
      const productsArr = Array.isArray(productsData) ? productsData : []
      setStats({
        totalProducts: productsArr.length,
        totalOrders: ordersArr.length,
        pendingOrders: pendingCount,
        totalEarnings
      })
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId)
        fetchData()
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status)
      fetchData()
    } catch (error) {
      alert('Failed to update order status')
    }
  }

  const handleCreateShipment = async (order) => {
    try {
      const orderItems = order.vendorOrderItems?.map(item => ({
        name: item.name,
        sku: item.product || 'SKU001',
        units: item.quantity,
        selling_price: item.price,
        discount: 0
      })) || []

      const shipmentData = {
        order_id: order._id,
        order_date: new Date(order.createdAt).toISOString().split('T')[0],
        pickup_location: 'Primary',
        billing_customer_name: order.user?.name?.split(' ')[0] || 'Customer',
        billing_last_name: order.user?.name?.split(' ').slice(1).join(' ') || '',
        billing_address: order.shippingAddress?.street || 'Address',
        billing_city: order.shippingAddress?.city || 'City',
        billing_state: order.shippingAddress?.state || 'State',
        billing_country: 'India',
        billing_email: order.user?.email || 'email@example.com',
        billing_phone: order.shippingAddress?.phone || '9999999999',
        shipping_is_billing: true,
        order_items: orderItems,
        payment_method: order.paymentMethod === 'cod' ? 'COD' : 'PREPAID',
        total_length: 10,
        total_breadth: 10,
        total_height: 10,
        weight: 0.5
      }

      const response = await shiprocketService.createOrder(shipmentData)
      
      if (response.order_id) {
        await shiprocketService.schedulePickup(response.shipment_id)
        
        const updateData = {
          vendorStatus: 'shipped',
          trackingNumber: response.awb_code || response.shipment_id,
          shiprocketOrderId: response.order_id,
          shiprocketShipmentId: response.shipment_id
        }
        
        await orderService.updateOrderStatus(order._id, 'shipped', updateData)
        alert(`Shipment created! AWB: ${response.awb_code || 'Pending'}`)
        fetchData()
      }
    } catch (error) {
      console.error('Shipment error:', error)
      alert('Failed to create shipment. Make sure Shiprocket is configured.')
    }
  }

  const handleTrackOrder = async (order) => {
    try {
      if (order.shiprocketOrderId) {
        const response = await shiprocketService.trackByOrder(order.shiprocketOrderId)
        alert(`Tracking: ${JSON.stringify(response, null, 2)}`)
      } else if (order.trackingNumber) {
        const response = await shiprocketService.trackByAwb(order.trackingNumber)
        alert(`Tracking: ${JSON.stringify(response, null, 2)}`)
      } else {
        alert('No tracking information available')
      }
    } catch (error) {
      console.error('Track error:', error)
      alert('Failed to track order')
    }
  }

  if (!isVendor) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-400 text-slate-950 text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                  <FaStore size={10} /> Certified Seller Hub
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Seller Dashboard</h1>
              <p className="text-blue-100 text-sm mt-0.5">Welcome back, <span className="font-semibold text-white">{user?.name}</span></p>
            </div>
            
            <Link
              to="/seller/add-product"
              className="bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-400/20 hover:scale-105 transition active:scale-95 text-sm"
            >
              <FaPlus size={13} /> Add New Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                <FaBox size={22} />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                <FaShoppingCart size={22} />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Orders</p>
                <p className="text-3xl font-black text-amber-600 mt-1">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
                <FaClock size={22} />
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Earnings</p>
                <p className="text-3xl font-black text-slate-900 mt-1">₹{stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
                <FaRupeeSign size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 pt-3 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Orders ({orders.length})
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-3"></div>
                <p className="text-sm font-semibold text-slate-500">Loading seller workspace...</p>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                        <p className="text-xs text-slate-500">Overview of latest orders received</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        View All Orders →
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Items</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/80 transition">
                              <td className="px-4 py-3 font-mono font-bold text-slate-900">#{order._id.slice(-6).toUpperCase()}</td>
                              <td className="px-4 py-3 font-semibold text-slate-800">
                                {order.user?.name || 'Customer'}
                              </td>
                              <td className="px-4 py-3 text-slate-600">
                                {order.vendorOrderItems?.length || 0} item(s)
                              </td>
                              <td className="px-4 py-3 font-extrabold text-slate-900">
                                ₹{order.vendorSubtotal?.toLocaleString() || 0}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-1 text-xs font-extrabold rounded-full inline-block uppercase ${
                                  order.vendorStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                  order.vendorStatus === 'shipped' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  order.vendorStatus === 'cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                                  'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}>
                                  {order.vendorStatus || 'processing'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-500 text-xs">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {orders.length === 0 && (
                        <div className="text-center py-10">
                          <FaShoppingCart className="mx-auto text-slate-300 text-4xl mb-2" />
                          <p className="text-slate-500 text-sm">No orders received yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Your Catalog ({products.length})</h3>
                        <p className="text-xs text-slate-500">Manage active products, pricing, and stock</p>
                      </div>
                      <Link
                        to="/seller/add-product"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 text-xs shadow-sm transition"
                      >
                        <FaPlus size={12} /> Add Product
                      </Link>
                    </div>
                    
                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Rating</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {products.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50/80 transition">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                    {product.images?.[0] ? (
                                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <FaBox size={16} />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900 line-clamp-1">{product.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">{product.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 font-extrabold text-slate-900">₹{product.price}</td>
                              <td className="px-4 py-3">
                                <span className={`font-bold ${product.stock < 10 ? 'text-rose-600' : 'text-slate-800'}`}>
                                  {product.stock}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1 font-semibold text-xs text-slate-700">
                                  <span className="text-amber-400">★</span>
                                  <span>{product.ratings?.toFixed(1) || '0.0'}</span>
                                  <span className="text-slate-400">({product.numReviews})</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full uppercase ${
                                  product.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {product.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end items-center gap-1">
                                  <Link
                                    to={`/product/${product._id}`}
                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 transition"
                                    title="View Product"
                                  >
                                    <FaEye size={15} />
                                  </Link>
                                  <button
                                    onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-emerald-600 transition"
                                    title="Edit Product"
                                  >
                                    <FaEdit size={15} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-rose-600 transition"
                                    title="Delete Product"
                                  >
                                    <FaTrash size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {products.length === 0 && (
                        <div className="text-center py-12">
                          <FaBox className="mx-auto text-slate-300 text-5xl mb-3" />
                          <p className="text-slate-600 font-semibold text-base">No products listed yet</p>
                          <p className="text-xs text-slate-400 mt-1">Start adding items to sell on DXHUB</p>
                          <Link
                            to="/seller/add-product"
                            className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-700 transition mt-4 inline-block"
                          >
                            Add Your First Product
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Manage Orders ({orders.length})</h3>
                      <p className="text-xs text-slate-500">Track shipments and update vendor dispatch statuses</p>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer Details</th>
                            <th className="px-4 py-3">Items Purchased</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Current Status</th>
                            <th className="px-4 py-3">Shipment</th>
                            <th className="px-4 py-3">Update Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50/80 transition">
                              <td className="px-4 py-3 font-mono font-bold text-slate-900">
                                #{order._id.slice(-6).toUpperCase()}
                              </td>
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-bold text-slate-800 text-sm">{order.user?.name || 'Customer'}</p>
                                  <p className="text-slate-500 text-xs">{order.user?.email}</p>
                                  <p className="text-slate-400 text-[11px] mt-0.5">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {order.vendorOrderItems?.map((item, idx) => (
                                  <div key={idx} className="text-xs text-slate-700 font-medium">
                                    <span className="font-bold text-blue-600">{item.quantity}x</span> {item.name}
                                  </div>
                                ))}
                              </td>
                              <td className="px-4 py-3 font-extrabold text-slate-900">
                                ₹{order.vendorSubtotal?.toLocaleString()}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-1 text-xs font-extrabold rounded-full uppercase inline-block ${
                                  order.vendorStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                  order.vendorStatus === 'shipped' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  order.vendorStatus === 'packed' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                  order.vendorStatus === 'cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                                  'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}>
                                  {order.vendorStatus || 'processing'}
                                </span>
                                {order.trackingNumber && (
                                  <div className="text-[11px] font-mono text-blue-600 font-bold mt-1">
                                    AWB: {order.trackingNumber}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {order.vendorStatus === 'processing' ? (
                                  <button
                                    onClick={() => handleCreateShipment(order)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition"
                                  >
                                    <FaShippingFast size={12} />
                                    Ship Order
                                  </button>
                                ) : order.vendorStatus === 'shipped' ? (
                                  <button
                                    onClick={() => handleTrackOrder(order)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition"
                                  >
                                    <FaTruck size={12} />
                                    Track
                                  </button>
                                ) : order.vendorStatus === 'packed' ? (
                                  <span className="text-xs font-bold text-purple-600">Ready to ship</span>
                                ) : order.vendorStatus === 'delivered' ? (
                                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                                    <FaCheck /> Delivered
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400">-</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={order.vendorStatus || 'processing'}
                                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                  className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="processing">Processing</option>
                                  <option value="packed">Packed</option>
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
                        <div className="text-center py-12">
                          <FaShoppingCart className="mx-auto text-slate-300 text-4xl mb-2" />
                          <p className="text-slate-500 font-semibold text-sm">No orders yet</p>
                        </div>
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

export default SellerDashboard

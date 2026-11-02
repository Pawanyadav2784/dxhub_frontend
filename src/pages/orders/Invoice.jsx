import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaPrint } from "react-icons/fa"
import orderService from "../../services/orderService"

const Invoice = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService.getInvoice(id)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading invoice...</div>
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Invoice not found.</div>
  }

  const orderNumber = order.orderNumber || `ORD-${order._id.slice(-8).toUpperCase()}`
  const invoiceNumber = order.invoiceNumber || `INV-${order._id.slice(-8).toUpperCase()}`

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between mb-4 print:hidden">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700">
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <FaPrint /> Print / Save PDF
          </button>
        </div>

        <article className="bg-white shadow p-8 md:p-12 print:shadow-none">
          <header className="flex justify-between gap-6 border-b pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold">DXHUB</h1>
              <p className="text-gray-500">Electronics & Gadgets</p>
              <p className="text-sm text-gray-500 mt-2">business@dxhub.in</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="mt-2"><strong>Invoice:</strong> {invoiceNumber}</p>
              <p><strong>Order:</strong> {orderNumber}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Billed To</h3>
              <p>{order.user?.name || order.shippingAddress?.fullName}</p>
              <p>{order.user?.email}</p>
              <p>{order.shippingAddress?.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </section>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-y bg-gray-50">
                  <th className="text-left p-3">Item</th>
                  <th className="text-right p-3">Qty</th>
                  <th className="text-right p-3">Price</th>
                  <th className="text-right p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-3">{item.name}</td>
                    <td className="text-right p-3">{item.quantity}</td>
                    <td className="text-right p-3">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="text-right p-3">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="ml-auto mt-6 max-w-sm space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{order.itemsPrice.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{order.shippingPrice ? `₹${order.shippingPrice}` : 'FREE'}</span></div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span><span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </section>

          <footer className="border-t mt-10 pt-6 text-sm text-gray-600">
            <p><strong>Payment:</strong> {order.paymentMethod?.toUpperCase()} / {order.paymentStatus?.toUpperCase()}</p>
            {order.paymentId && <p><strong>Payment ID:</strong> {order.paymentId}</p>}
            {order.refundedAmount > 0 && <p><strong>Refunded:</strong> ₹{order.refundedAmount.toLocaleString('en-IN')} ({order.refundStatus})</p>}
            <p className="mt-4">This is a computer-generated invoice.</p>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default Invoice

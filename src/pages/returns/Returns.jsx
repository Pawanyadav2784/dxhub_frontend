import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { FaBoxOpen, FaExchangeAlt, FaImage, FaUndo } from "react-icons/fa"
import orderService from "../../services/orderService"
import returnService from "../../services/returnService"
import uploadService from "../../services/uploadService"

const statusSteps = [
  'requested', 'approved', 'pickup-scheduled', 'picked-up', 'received', 'qc-passed'
]

const Returns = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const [order, setOrder] = useState(null)
  const [requests, setRequests] = useState([])
  const [type, setType] = useState('return')
  const [selectedItems, setSelectedItems] = useState({})
  const [comments, setComments] = useState('')
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const loadRequests = async () => setRequests(await returnService.getMyRequests())

  useEffect(() => {
    loadRequests().catch(console.error)
    if (orderId) orderService.getOrderById(orderId).then(setOrder).catch(() => setOrder(null))
  }, [orderId])

  const updateItem = (itemId, field, value) => {
    setSelectedItems((current) => ({
      ...current,
      [itemId]: {
        quantity: 1,
        reason: '',
        ...current[itemId],
        [field]: value
      }
    }))
  }

  const toggleItem = (item) => {
    setSelectedItems((current) => {
      const next = { ...current }
      if (next[item._id]) delete next[item._id]
      else next[item._id] = { quantity: 1, reason: '' }
      return next
    })
  }

  const handleImages = async (event) => {
    const files = Array.from(event.target.files).slice(0, 5)
    if (!files.length) return
    setUploading(true)
    try {
      const urls = await uploadService.uploadImages(files)
      setImages((current) => [...current, ...urls].slice(0, 5))
    } catch {
      alert('Could not upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const items = Object.entries(selectedItems).map(([orderItemId, item]) => ({
      orderItemId,
      quantity: Number(item.quantity),
      reason: item.reason
    }))
    if (!items.length) return alert('Select at least one item')

    setSubmitting(true)
    try {
      const request = await returnService.createRequest({
        orderId,
        type,
        items,
        comments,
        evidenceImages: images
      })
      setRequests((current) => [request, ...current])
      setSelectedItems({})
      setComments('')
      setImages([])
      alert(`Request created: ${request.rmaNumber}`)
    } catch (error) {
      alert(error.response?.data?.message || 'Could not create request')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this return/exchange request?')) return
    const updated = await returnService.cancelRequest(id)
    setRequests((current) => current.map((request) => request._id === id ? updated : request))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <FaUndo className="text-blue-600 text-2xl" />
          <div>
            <h1 className="text-3xl font-bold">Returns & Exchanges</h1>
            <p className="text-gray-500">Request pickup and track refund or replacement progress.</p>
          </div>
        </div>

        {order && (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 mb-10">
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Order {order.orderNumber || order._id}</h2>
                <p className="text-sm text-gray-500">Delivered orders are eligible within the policy window.</p>
              </div>
              <div className="flex rounded-lg border overflow-hidden">
                <button type="button" onClick={() => setType('return')} className={`px-4 py-2 ${type === 'return' ? 'bg-blue-600 text-white' : ''}`}>
                  Return
                </button>
                <button type="button" onClick={() => setType('exchange')} className={`px-4 py-2 ${type === 'exchange' ? 'bg-blue-600 text-white' : ''}`}>
                  Exchange
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {order.orderItems.map((item) => {
                const selected = selectedItems[item._id]
                return (
                  <div key={item._id} className={`border rounded-xl p-4 ${selected ? 'border-blue-500 bg-blue-50' : ''}`}>
                    <div className="flex gap-4">
                      <input type="checkbox" checked={Boolean(selected)} onChange={() => toggleItem(item)} className="mt-2 w-5 h-5" />
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Purchased quantity: {item.quantity}</p>
                        {selected && (
                          <div className="grid md:grid-cols-[120px_1fr] gap-3 mt-3">
                            <select value={selected.quantity} onChange={(e) => updateItem(item._id, 'quantity', e.target.value)} className="border rounded-lg px-3 py-2">
                              {Array.from({ length: item.quantity }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Qty {index + 1}</option>
                              ))}
                            </select>
                            <input required value={selected.reason} onChange={(e) => updateItem(item._id, 'reason', e.target.value)} placeholder="Reason for return/exchange" className="border rounded-lg px-3 py-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <textarea value={comments} onChange={(e) => setComments(e.target.value)} rows="3" placeholder="Additional details (optional)" className="w-full border rounded-lg px-4 py-3 mt-5" />

            <div className="mt-4">
              <label className="inline-flex items-center gap-2 border border-dashed rounded-lg px-4 py-3 cursor-pointer">
                <FaImage /> {uploading ? 'Uploading...' : 'Add proof images'}
                <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" disabled={uploading} />
              </label>
              <div className="flex gap-2 mt-3">
                {images.map((image) => <img key={image} src={image} alt="Evidence" className="w-16 h-16 object-cover rounded" />)}
              </div>
            </div>

            <button disabled={submitting || uploading} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400">
              {submitting ? 'Submitting...' : `Request ${type === 'return' ? 'Return' : 'Exchange'}`}
            </button>
          </form>
        )}

        {!orderId && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
            Select an eligible delivered order from <Link to="/my-orders" className="font-semibold text-blue-700">My Orders</Link>.
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">My Requests</h2>
        <div className="space-y-5">
          {!requests.length && <div className="bg-white rounded-xl p-8 text-gray-500">No return or exchange requests.</div>}
          {requests.map((request) => {
            const currentStep = statusSteps.indexOf(request.status)
            return (
              <article key={request._id} className="bg-white shadow rounded-xl p-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-bold text-blue-700">{request.rmaNumber}</p>
                    <p className="capitalize font-semibold flex items-center gap-2">
                      {request.type === 'exchange' ? <FaExchangeAlt /> : <FaBoxOpen />} {request.type}
                    </p>
                    <p className="text-sm text-gray-500">Order: {request.order?.orderNumber}</p>
                  </div>
                  <span className="capitalize bg-gray-100 px-3 py-1 rounded-full h-fit">{request.status.replaceAll('-', ' ')}</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mt-5">
                  {request.items.map((item) => (
                    <div key={item._id} className="border rounded-lg p-3 text-sm">
                      <p className="font-semibold">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p className="text-gray-500">{item.reason}</p>
                    </div>
                  ))}
                </div>

                {currentStep >= 0 && (
                  <div className="mt-5 flex gap-1">
                    {statusSteps.map((step, index) => (
                      <div key={step} title={step} className={`h-2 flex-1 rounded ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                )}
                {request.pickup?.trackingNumber && <p className="mt-4 text-sm">Pickup tracking: <strong>{request.pickup.trackingNumber}</strong></p>}
                {request.refund?.razorpayRefundId && <p className="mt-2 text-sm">Refund ID: <strong>{request.refund.razorpayRefundId}</strong> · ₹{request.refund.amount}</p>}
                {request.replacementOrder && <p className="mt-2 text-sm">Replacement: <strong>{request.replacementOrder.orderNumber}</strong></p>}
                {request.rejectionReason && <p className="mt-4 bg-red-50 text-red-700 p-3 rounded">Reason: {request.rejectionReason}</p>}

                {['requested', 'approved'].includes(request.status) && (
                  <button onClick={() => handleCancel(request._id)} className="mt-4 text-red-600 text-sm font-semibold">Cancel request</button>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Returns

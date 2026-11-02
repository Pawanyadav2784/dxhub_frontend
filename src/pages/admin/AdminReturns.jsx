import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCheck, FaExchangeAlt, FaMoneyBillWave, FaTimes, FaTruck } from "react-icons/fa"
import returnService from "../../services/returnService"

const AdminReturns = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [workingId, setWorkingId] = useState('')

  const loadRequests = async () => {
    try {
      setRequests(await returnService.getAllRequests())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests().catch(console.error)
  }, [])

  const runAction = async (id, action) => {
    setWorkingId(id)
    try {
      const updated = await action()
      setRequests((current) => current.map((request) => request._id === id ? updated : request))
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed')
    } finally {
      setWorkingId('')
    }
  }

  const updateStatus = (request, status, extra = {}) => {
    const note = window.prompt('Internal/customer status note (optional):', '') || ''
    return runAction(request._id, () => returnService.updateStatus(request._id, { status, note, ...extra }))
  }

  const schedulePickup = (request) => {
    const provider = window.prompt('Pickup provider:', 'Shiprocket')
    if (!provider) return
    const trackingNumber = window.prompt('Reverse pickup tracking/AWB number:')
    if (!trackingNumber) return
    updateStatus(request, 'pickup-scheduled', {
      pickup: { provider, trackingNumber, scheduledAt: new Date().toISOString() }
    })
  }

  const reject = (request) => {
    const rejectionReason = window.prompt('Rejection reason:')
    if (!rejectionReason) return
    updateStatus(request, 'rejected', { rejectionReason })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/admin')} className="p-2 rounded-full hover:bg-gray-200"><FaArrowLeft /></button>
          <div>
            <h1 className="text-3xl font-bold">Return & Exchange Management</h1>
            <p className="text-gray-500">Approve pickup, inspect returns, issue refunds and create replacements.</p>
          </div>
        </div>

        {loading ? <p>Loading requests...</p> : (
          <div className="space-y-6">
            {!requests.length && <div className="bg-white rounded-xl p-8">No requests found.</div>}
            {requests.map((request) => (
              <article key={request._id} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-blue-700 font-bold">{request.rmaNumber}</p>
                    <h2 className="text-xl font-semibold capitalize">{request.type} · {request.status.replaceAll('-', ' ')}</h2>
                    <p className="text-sm text-gray-500">
                      {request.user?.name} ({request.user?.email}) · Order {request.order?.orderNumber}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{new Date(request.createdAt).toLocaleString('en-IN')}</p>
                    <p className="font-semibold capitalize">Priority: {request.type}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                  {request.items.map((item) => (
                    <div key={item._id} className="border rounded-lg p-3 flex gap-3">
                      {item.image && <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />}
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm">Qty: {item.quantity} · ₹{item.unitPrice}</p>
                        <p className="text-sm text-gray-500">{item.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {request.evidenceImages?.length > 0 && (
                  <div className="flex gap-2 mb-5">
                    {request.evidenceImages.map((image) => (
                      <a key={image} href={image} target="_blank" rel="noreferrer">
                        <img src={image} alt="Customer evidence" className="w-20 h-20 object-cover rounded border" />
                      </a>
                    ))}
                  </div>
                )}

                {request.pickup?.trackingNumber && (
                  <p className="bg-blue-50 p-3 rounded mb-4 text-sm">
                    Reverse pickup: {request.pickup.provider} · <strong>{request.pickup.trackingNumber}</strong>
                  </p>
                )}
                {request.refund?.razorpayRefundId && (
                  <p className="bg-green-50 p-3 rounded mb-4 text-sm">
                    Refund: ₹{request.refund.amount} · <strong>{request.refund.razorpayRefundId}</strong>
                  </p>
                )}
                {request.replacementOrder && (
                  <p className="bg-purple-50 p-3 rounded mb-4 text-sm">
                    Replacement order: <strong>{request.replacementOrder.orderNumber}</strong>
                  </p>
                )}

                <div className="flex flex-wrap gap-2 border-t pt-5">
                  {request.status === 'requested' && (
                    <>
                      <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'approved')} className="action-button bg-green-600 text-white"><FaCheck /> Approve</button>
                      <button disabled={workingId === request._id} onClick={() => reject(request)} className="action-button bg-red-600 text-white"><FaTimes /> Reject</button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button disabled={workingId === request._id} onClick={() => schedulePickup(request)} className="action-button bg-blue-600 text-white"><FaTruck /> Schedule Pickup</button>
                  )}
                  {request.status === 'pickup-scheduled' && (
                    <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'picked-up')} className="action-button bg-blue-600 text-white"><FaTruck /> Mark Picked Up</button>
                  )}
                  {request.status === 'picked-up' && (
                    <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'received')} className="action-button bg-gray-800 text-white"><FaCheck /> Mark Received</button>
                  )}
                  {request.status === 'received' && (
                    <>
                      <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'qc-passed')} className="action-button bg-green-600 text-white"><FaCheck /> QC Passed</button>
                      <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'qc-failed')} className="action-button bg-red-600 text-white"><FaTimes /> QC Failed</button>
                    </>
                  )}
                  {request.status === 'qc-passed' && request.type === 'return' && (
                    <button disabled={workingId === request._id} onClick={() => runAction(request._id, () => returnService.processRefund(request._id))} className="action-button bg-green-700 text-white">
                      <FaMoneyBillWave /> Refund to Original Method
                    </button>
                  )}
                  {request.status === 'qc-passed' && request.type === 'exchange' && (
                    <button disabled={workingId === request._id} onClick={() => runAction(request._id, () => returnService.processExchange(request._id))} className="action-button bg-purple-700 text-white">
                      <FaExchangeAlt /> Create Replacement
                    </button>
                  )}
                  {request.status === 'exchange-processing' && request.replacementOrder && (
                    <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'exchange-shipped')} className="action-button bg-purple-700 text-white">
                      <FaTruck /> Replacement Shipped
                    </button>
                  )}
                  {request.status === 'exchange-shipped' && (
                    <button disabled={workingId === request._id} onClick={() => updateStatus(request, 'completed')} className="action-button bg-green-700 text-white">
                      <FaCheck /> Complete Exchange
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <style>{`.action-button{display:inline-flex;align-items:center;gap:.5rem;padding:.65rem 1rem;border-radius:.5rem;font-weight:600}.action-button:disabled{opacity:.5}`}</style>
    </div>
  )
}

export default AdminReturns

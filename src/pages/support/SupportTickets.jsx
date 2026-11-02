import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import supportTicketService from "../../services/supportTicketService"

const SupportTickets = () => {
  const [searchParams] = useSearchParams()
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({
    orderId: searchParams.get('orderId') || '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [submitting, setSubmitting] = useState(false)

  const loadTickets = async () => {
    const data = await supportTicketService.getMyTickets()
    setTickets(data)
  }

  useEffect(() => {
    loadTickets().catch(console.error)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const ticket = await supportTicketService.createTicket(form)
      setTickets((current) => [ticket, ...current])
      setForm((current) => ({ ...current, subject: '', message: '', priority: 'normal' }))
      alert(`Support ticket created: ${ticket.ticketNumber}`)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create support ticket')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 h-fit">
          <h1 className="text-2xl font-bold mb-2">Customer Support</h1>
          <p className="text-gray-500 mb-6">Create a ticket and keep its Ticket ID for reference.</p>

          <div className="space-y-4">
            <input
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              placeholder="Order ID (optional)"
              className="w-full border rounded-lg px-4 py-3"
            />
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Subject"
              className="w-full border rounded-lg px-4 py-3"
            />
            <textarea
              required
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your issue"
              className="w-full border rounded-lg px-4 py-3"
            />
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="low">Low priority</option>
              <option value="normal">Normal priority</option>
              <option value="high">High priority</option>
            </select>
            <button disabled={submitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400">
              {submitting ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>

        <section>
          <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
          <div className="space-y-4">
            {tickets.length === 0 && <p className="bg-white p-6 rounded-xl text-gray-500">No support tickets yet.</p>}
            {tickets.map((ticket) => (
              <article key={ticket._id} className="bg-white rounded-xl shadow p-5">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold text-blue-700">{ticket.ticketNumber}</p>
                    <h3 className="font-semibold mt-1">{ticket.subject}</h3>
                  </div>
                  <span className="capitalize text-sm bg-gray-100 rounded-full px-3 py-1 h-fit">{ticket.status}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">{ticket.message}</p>
                {ticket.order?.orderNumber && <p className="text-xs text-gray-500 mt-3">Order: {ticket.order.orderNumber}</p>}
                {ticket.adminResponse && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                    <strong>Support response:</strong> {ticket.adminResponse}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SupportTickets

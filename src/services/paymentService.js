export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

import api from './api'

export const createRazorpayOrder = async (amount, appOrderId, currency = 'INR') => {
  const response = await api.post('/payment/create-order', { amount, currency, appOrderId })
  return response.data
}

export const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature, appOrderId) => {
  const response = await api.post('/payment/verify-payment', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appOrderId
  })
  return response.data
}

export const paymentService = {
  async initialize() {
    return await initializeRazorpay()
  },

  async createOrder(amount, appOrderId) {
    return await createRazorpayOrder(amount, appOrderId)
  },

  async verifyPayment(orderId, paymentId, signature, appOrderId) {
    return await verifyPayment(orderId, paymentId, signature, appOrderId)
  },

  async checkout(options) {
    const isInitialized = await this.initialize()
    if (!isInitialized) {
      throw new Error('Razorpay failed to load')
    }

    return new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: options.key,
        amount: Math.round(options.amount * 100), // ✅ Rupees → Paise (Razorpay requires paise)
        currency: options.currency || 'INR',
        name: options.name || 'Jewelry E-commerce',
        description: options.description || 'Purchase',
        image: options.image || '/logo.png',
        order_id: options.order_id,
        handler: function (response) {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          })
        },
        prefill: {
          name: options.name,
          email: options.email,
          contact: options.phone
        },
        notes: {
          address: options.address || ''
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled'))
          }
        }
      })
      razorpay.on('payment.failed', function (response) {
        reject({
          success: false,
          error: {
            code: response.error.code,
            description: response.error.description,
            source: response.error.source,
            step: response.error.step,
            reason: response.error.reason
          }
        })
      })
      razorpay.open()
    })
  }
}

export default paymentService

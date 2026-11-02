const Policy = () => {
  const policies = {
    "help-center": {
      title: "Help Center",
      content: `Welcome to DXHUB Help Center! We're here to assist you with any questions or concerns.

**Frequently Asked Questions:**

**How do I place an order?**
1. Browse our collection
2. Add items to cart
3. Proceed to checkout
4. Enter shipping details
5. Make payment

**How do I track my order?**
Go to 'My Orders' section and click on 'Track Order' for any order.

**How do I contact customer support?**
You can contact us via email at business@dxhub.in.

**What are your working hours?**
We're available Monday to Saturday, 10 AM to 7 PM.

**How do I change my password?**
Go to Account Settings > Security > Change Password`
    },
    "return-policy": {
      title: "Return Policy",
      content: `At DXHUB, we want you to be completely satisfied with your purchase.

**Return Eligibility:**
- Items must be unused and in original packaging
- Returns must be initiated within 7 days of delivery
- Customized or personalized items cannot be returned
- Earrings are non-returnable for hygiene reasons

**How to Return:**
1. Go to My Orders
2. Select the item you want to return
3. Click 'Return / Exchange'
4. Select items, quantity, reason, and upload proof images when needed
5. Keep the generated RMA ID for tracking
6. Pickup, inspection, refund, or replacement status will appear in your account

**Refund Timeline:**
- Refund starts after the returned item passes quality inspection
- Money is refunded to the original payment method
- Banks may take additional working days to reflect the amount

**Exchange:**
- Approved exchanges receive a separate replacement Order ID
- Replacement shipment and tracking appear in My Orders
- Product-specific eligibility and stock availability apply`
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: `At DXHUB, we value your privacy and are committed to protecting your personal information.

**Information We Collect:**
- Personal information (name, email, phone)
- Shipping and billing addresses
- Payment information (securely processed)
- Order history
- Device and browser information

**How We Use Your Information:**
- Process and deliver orders
- Communicate about your order
- Improve our services
- Send promotional offers (with your consent)
- Prevent fraud

**Data Security:**
- SSL encryption for all transactions
- Secure payment processing
- Regular security audits
- Limited employee access

**Your Rights:**
- Access your data
- Correct inaccurate data
- Delete your account
- Opt-out of marketing emails

**Contact:** privacy@dxhub.in`
    },
    "terms": {
      title: "Terms & Conditions",
      content: `Welcome to DXHUB. By using our website, you agree to these terms.

**General Terms:**
- All products are subject to availability
- Prices are subject to change without notice
- We reserve the right to cancel any order
- Product images are for representation only

**Account Terms:**
- You must provide accurate information
- You're responsible for your account
- You must be 18 years or older

**Ordering:**
- Minimum order value: ₹500
- One promo code per order
- Orders once placed cannot be modified

**Intellectual Property:**
- All content is owned by DXHUB
- No copying without permission

**Liability:**
- We're not liable for any damages
- Our liability is limited to order value

**Contact:** legal@dxhub.in`
    }
  }

  const path = window.location.pathname.split("/").pop() || "help-center"
  const policy = policies[path] || policies["help-center"]

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{policy.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
          {policy.content}
        </div>
        <div className="mt-8 pt-6 border-t">
          <p className="text-gray-500">Questions? Contact us at business@dxhub.in</p>
        </div>
      </div>
    </div>
  )
}

export default Policy

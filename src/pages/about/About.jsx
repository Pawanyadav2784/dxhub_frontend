import { FaLaptop, FaHandshake, FaAward, FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa"

const AboutBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">About DXHUB Electronics</h1>
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
          Your trusted multi-vendor platform for smart electronics, mobiles, audio gear, IT accessories & home appliances.
        </p>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <AboutBanner />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700"
              alt="DXHUB Electronics Collection"
              className="rounded-xl shadow-lg border border-gray-200"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Tech Journey</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              DXHUB was created to revolutionize access to authentic, high-quality electronics and smart tech gadgets. From feature phones and flagship smartphones to powerful bluetooth speakers, TWS earbuds, smartwatches, IT accessories, and reliable home appliances.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We connect customers directly with verified multi-vendor suppliers, ensuring competitive prices, strict quality checks, and genuine manufacturer warranties.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're looking for everyday charger cables, high-capacity power banks, or upgrading your living room with modern LED TVs and smart home appliances, DXHUB is your one-stop tech marketplace.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {[
            { icon: FaLaptop, label: "Tech Innovation" },
            { icon: FaHandshake, label: "Trusted Vendors" },
            { icon: FaAward, label: "100% Authentic" },
            { icon: FaShippingFast, label: "Fast Shipping" },
            { icon: FaHeadset, label: "Dedicated Support" },
            { icon: FaShieldAlt, label: "Warranty Backed" },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100"
            >
              <item.icon className="text-3xl text-blue-600 mx-auto mb-3" />
              <p className="text-xs font-semibold text-gray-800">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Authentic Products</h3>
                <p className="text-gray-600 text-sm">
                  Every product is 100% authentic and goes through strict quality checks before reaching you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Best Prices</h3>
                <p className="text-gray-600 text-sm">
                  We offer competitive prices without compromising on quality, ensuring value for your money.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Packaging</h3>
                <p className="text-gray-600 text-sm">
                  All items are carefully packaged to ensure they reach you in perfect condition.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-gray-600 text-sm">
                  Not satisfied? We offer hassle-free returns and exchanges within 7 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We'd love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default About

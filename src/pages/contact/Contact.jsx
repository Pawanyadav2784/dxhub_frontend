import ContactBanner from "./ContactBanner"
import ContactInfo from "./ContactInfo"
import ContactForm from "./ContactForm"
import ContactMap from "./ContactMap"

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 selection:bg-amber-500 selection:text-white">
      {/* 3D Animated Hero Header */}
      <ContactBanner />

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column - Contact Info & Quick Cards (5 Cols) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>

          {/* Right Column - 3D Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Interactive 3D Google Map Section */}
      <ContactMap />
    </div>
  )
}

export default Contact
import { motion } from "framer-motion"
import { Phone, MapPin, Mail, Clock, MessageSquare, ExternalLink, ArrowRight, ShieldAlert } from "lucide-react"

const contactItems = [
  {
    icon: Phone,
    title: "Call Us Direct",
    subtitle: "Mon - Sat (9am - 8pm)",
    value: "+91 9988733798",
    actionText: "Call Now",
    actionLink: "tel:+919988733798",
    whatsappLink: "https://wa.me/919988733798",
    accent: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-500/10",
    borderGlow: "group-hover:border-amber-500/50",
    bgGradient: "from-amber-500/10 to-yellow-500/5",
  },
  {
    icon: Mail,
    title: "Email Support",
    subtitle: "24/7 Ticketing & Enquiries",
    value: "business@dxhub.in",
    actionText: "Send Mail",
    actionLink: "mailto:business@dxhub.in",
    accent: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/10",
    borderGlow: "group-hover:border-blue-500/50",
    bgGradient: "from-blue-500/10 to-indigo-500/5",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    subtitle: "Visit our Corporate Hub",
    value: "New Delhi, India - 110001",
    actionText: "View Map",
    actionLink: "#map-section",
    accent: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10",
    borderGlow: "group-hover:border-emerald-500/50",
    bgGradient: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    subtitle: "Customer Service Availability",
    value: "Mon - Sat: 9:00 AM - 8:00 PM IST",
    actionText: "Sunday Closed",
    actionLink: "#",
    accent: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-500/10",
    borderGlow: "group-hover:border-purple-500/50",
    bgGradient: "from-purple-500/10 to-violet-500/5",
  },
]

const ContactInfo = () => {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" /> Direct Channels
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ways to Reach Us
        </h2>
        <p className="text-sm text-slate-500">
          Choose your preferred channel for immediate response from our dedicated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-lg ${item.shadow} ${item.borderGlow} transition-all duration-300 overflow-hidden flex flex-col justify-between`}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.bgGradient} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
              />

              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>

                {/* Primary Value */}
                <p className="font-semibold text-slate-800 text-sm md:text-base mt-2 break-all">
                  {item.value}
                </p>
              </div>

              {/* Action Links */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                {item.whatsappLink ? (
                  <div className="flex items-center gap-3">
                    <a
                      href={item.actionLink}
                      className="text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                    >
                      {item.actionText} <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={item.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                ) : item.actionLink !== "#" ? (
                  <a
                    href={item.actionLink}
                    className="text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                  >
                    {item.actionText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-slate-400 font-normal">{item.actionText}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Assurance Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-start gap-3.5 shadow-xl border border-slate-800"
      >
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-100">Looking for Order Updates?</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            You can also track your shipped packages directly from your account page under <span className="text-amber-300 font-medium">My Orders</span>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactInfo
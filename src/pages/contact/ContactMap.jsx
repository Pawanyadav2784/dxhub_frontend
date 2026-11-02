import { motion } from "framer-motion"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

const ContactMap = () => {
  return (
    <div id="map-section" className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* 3D Map Viewport Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.1)] bg-slate-900"
      >
        {/* Map Iframe */}
        <iframe
          title="DXHUB Store & Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319277!2d77.06889754101264!3d28.52758200617636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-[360px] md:h-[420px] border-0 filter saturate-[1.1] contrast-[1.05]"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating 3D Info Badge overlay */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm bg-slate-950/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 text-white shadow-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <MapPin className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">DXHUB Corporate Hub</h4>
              <p className="text-xs text-slate-400">New Delhi, Delhi 110001, India</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Flagship Store
            </span>
            <a
              href="https://maps.google.com/?q=New+Delhi+India"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              Get Directions <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactMap
import { useState } from "react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { ChevronDown, ShieldCheck, Heart, Sparkles, PhoneCall } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 border-t border-slate-800/80 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-14">
        
        {/* DESKTOP 4-COLUMN & MOBILE APP COMPACT ACCORDION LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-2 md:space-y-3 pb-2 md:pb-0">
            <h2 className="text-xl md:text-3xl font-black text-white tracking-wider flex items-center justify-between">
              <span>DXHUB<span className="text-amber-400">.</span></span>
              <span className="md:hidden text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Original
              </span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your destination for smart electronics, smartphones, audio & home appliances.
            </p>
            <div className="hidden md:flex items-center gap-2 pt-1 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Guaranteed Original Products</span>
            </div>
          </div>

          {/* Top Categories - Mobile Accordion / Desktop Column */}
          <div className="border-t border-slate-800/80 md:border-t-0 pt-3 md:pt-0">
            <button 
              type="button"
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-left cursor-pointer md:cursor-default py-1 md:py-0 md:mb-4 group"
            >
              <h3 className="text-xs md:text-sm font-black text-slate-100 md:text-white tracking-wider uppercase group-hover:text-amber-400 md:group-hover:text-white transition-colors">
                Top Categories
              </h3>
              <ChevronDown className={`w-4 h-4 text-slate-400 md:hidden transition-transform duration-300 ${openSection === 'categories' ? 'rotate-180 text-amber-400' : ''}`} />
            </button>

            <ul className={`space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400 pt-2 md:pt-0 transition-all duration-300 ${openSection === 'categories' ? 'block' : 'hidden md:block'}`}>
              <li><Link to="/shop?category=Mobiles" className="hover:text-amber-400 transition-colors block py-0.5">Mobiles & Smart Phones</Link></li>
              <li><Link to="/shop?category=Speaker" className="hover:text-amber-400 transition-colors block py-0.5">Speakers & Soundbars</Link></li>
              <li><Link to="/shop?category=Audio" className="hover:text-amber-400 transition-colors block py-0.5">Audio, TWS & Headphones</Link></li>
              <li><Link to="/shop?category=Smart%20Watch" className="hover:text-amber-400 transition-colors block py-0.5">Smart Watches</Link></li>
              <li><Link to="/shop?category=Home%20appliances" className="hover:text-amber-400 transition-colors block py-0.5">Home Appliances</Link></li>
              <li><Link to="/shop?category=IT%20Accessories" className="hover:text-amber-400 transition-colors block py-0.5">IT & Laptop Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Support - Mobile Accordion / Desktop Column */}
          <div className="border-t border-slate-800/80 md:border-t-0 pt-3 md:pt-0">
            <button 
              type="button"
              onClick={() => toggleSection('support')}
              className="w-full flex items-center justify-between text-left cursor-pointer md:cursor-default py-1 md:py-0 md:mb-4 group"
            >
              <h3 className="text-xs md:text-sm font-black text-slate-100 md:text-white tracking-wider uppercase group-hover:text-amber-400 md:group-hover:text-white transition-colors">
                Customer Support
              </h3>
              <ChevronDown className={`w-4 h-4 text-slate-400 md:hidden transition-transform duration-300 ${openSection === 'support' ? 'rotate-180 text-amber-400' : ''}`} />
            </button>

            <ul className={`space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400 pt-2 md:pt-0 transition-all duration-300 ${openSection === 'support' ? 'block' : 'hidden md:block'}`}>
              <li><Link to="/help-center" className="hover:text-amber-400 transition-colors block py-0.5">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-amber-400 transition-colors block py-0.5">Support Tickets</Link></li>
              <li><Link to="/returns" className="hover:text-amber-400 transition-colors block py-0.5">Returns & Exchanges</Link></li>
              <li><Link to="/return-policy" className="hover:text-amber-400 transition-colors block py-0.5">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-amber-400 transition-colors block py-0.5">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition-colors block py-0.5">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="border-t border-slate-800/80 md:border-t-0 pt-3 md:pt-0 space-y-2 md:space-y-3">
            <h3 className="text-xs md:text-sm font-black text-slate-100 md:text-white tracking-wider uppercase">
              Follow & Connect
            </h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p><a href="mailto:business@dxhub.in" className="hover:text-amber-400 transition-colors">✉ business@dxhub.in</a></p>
              <p><a href="tel:+919988733798" className="hover:text-amber-400 transition-colors">📞 Mob: 9988733798</a></p>
            </div>
            <div className="flex items-center gap-2 text-sm pt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-blue-600 hover:border-blue-500 text-white transition duration-200">
                <FaFacebook className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a href="https://instagram.com/dxhub_official" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-pink-600 hover:border-pink-500 text-white transition duration-200">
                <FaInstagram className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-sky-500 hover:border-sky-400 text-white transition duration-200">
                <FaTwitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact App Style */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] md:text-xs text-slate-400">
          <p>© 2026 DXHUB Electronics. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-amber-400">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-amber-400">Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-400">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


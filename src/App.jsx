import { useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ScrollToTop from "./components/ScrollToTop"
import RouteSEO from "./components/seo/RouteSEO"
import { CartContext } from "./context/CartContext"

// Navigate injector — CartContext ko React Router navigate deta hai
const NavigateInjector = () => {
  const navigate = useNavigate()
  const { setNavigateToLogin } = useContext(CartContext)

  useEffect(() => {
    // Logout state mein add to cart karne par login pe bhejo
    setNavigateToLogin(() => {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    })
  }, [navigate, setNavigateToLogin])

  return null
}

function App() {
  const location = useLocation()

  // 🛡️ Determine if current path belongs to the Web/MDM platform
  const isWebRoute = 
    location.pathname === '/' ||
    location.pathname.startsWith('/about-mdm') ||
    location.pathname.startsWith('/services-mdm') ||
    location.pathname.startsWith('/contact-mdm')

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <RouteSEO />
      <NavigateInjector />

      {/* Render E-Commerce Navbar only when browsing the Store/Shop */}
      {!isWebRoute && <Navbar />}

      <main className={`flex-grow ${!isWebRoute ? 'pt-14' : ''}`}>
        <AppRoutes />
      </main>

      {/* Render E-Commerce Footer only when browsing the Store/Shop */}
      {!isWebRoute && <Footer />}
    </div>
  )
}

export default App

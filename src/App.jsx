

import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
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
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <RouteSEO />
      <NavigateInjector />   {/* ✅ CartContext ko navigate inject karta hai */}

      <Navbar />

      <main className="flex-grow pt-14">
        <AppRoutes />
      </main>

      <Footer />

    </div>
  )
}

export default App

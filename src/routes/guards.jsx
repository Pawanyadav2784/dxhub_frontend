import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// ─────────────────────────────────────────────────
// 1. GuestRoute — Sirf logged-OUT users ke liye
//    Logged-in user /login ya /register pe jaaye
//    to usse ghar (/) bhej do — Flipkart style
// ─────────────────────────────────────────────────
export const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  // Auth load hone tak kuch mat karo
  if (loading) return <PageLoader />

  // Pehle se logged in hai → home bhejo
  if (user) return <Navigate to="/" replace />

  return children
}

// ─────────────────────────────────────────────────
// 2. ProtectedRoute — Sirf logged-IN users ke liye
//    Customer: my-orders, checkout, wishlist etc.
//    Login ke baad wapas same page pe aao
// ─────────────────────────────────────────────────
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <PageLoader />

  // Login nahi → login page pe bhejo, redirect param ke saath
  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

// ─────────────────────────────────────────────────
// 3. RoleRoute — Specific role wale users ke liye
//    Vendor pages sirf vendors dekh sakte hain
//    Admin pages sirf admin dekh sakta hai
// ─────────────────────────────────────────────────
export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  if (!allowedRoles.includes(user.role)) {
    // Role match nahi hua — unauthorized page pe bhejo
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

// ─────────────────────────────────────────────────
// Loading Spinner — Auth check hone tak
// ─────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-amber-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-amber-700 font-medium">Loading...</p>
    </div>
  </div>
)

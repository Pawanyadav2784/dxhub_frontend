import { Routes, Route } from "react-router-dom"

// Guards
import { GuestRoute, ProtectedRoute, RoleRoute } from "./guards"

// Pages
import Home from "../pages/home/Home"
import Shop from "../pages/shop/Shop"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ResetPassword from "../pages/auth/ResetPassword"
import Unauthorized from "../pages/auth/Unauthorized"
import Contact from "../pages/contact/Contact"
import About from "../pages/about/About"

import SellerDashboard from "../pages/seller/SellerDashboard"
import AddProduct from "../pages/seller/AddProduct"
import SellerProducts from "../pages/seller/SellerProducts"
import Orders from "../pages/seller/Orders"

import Rings from "../pages/shop/Rings"
import Earrings from "../pages/shop/Earrings"
import Bracelets from "../pages/shop/Bracelets"
import Pendant from "../pages/shop/Pendant"
import Necklace from "../pages/shop/Necklace"
import Mangalsutra from "../pages/shop/Mangalsutra"
import Dhoop from "../pages/incense/Dhoop"
import Agarbatti from "../pages/incense/Agarbatti"
import HariDarshan from "../pages/incense/HariDarshan"
import PoojaKits from "../pages/incense/PoojaKits"
import ProductDetails from "../pages/shop/ProductDetails"
import Cart from "../pages/cart/Cart"
import Checkout from "../pages/checkout/Checkout"
import MyOrders from "../pages/orders/MyOrders"
import OrderTracking from "../pages/orders/OrderTracking"
import AdminDashboard from "../pages/admin/AdminDashboard"
import Wishlist from "../pages/wishlist/Wishlist"
import Policy from "../pages/policy/Policy"
import Invoice from "../pages/orders/Invoice"
import SupportTickets from "../pages/support/SupportTickets"
import Returns from "../pages/returns/Returns"
import AdminReturns from "../pages/admin/AdminReturns"

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── PUBLIC ROUTES ─────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Electronics Category Quick Routes -> Shop */}
      <Route path="/mobiles" element={<Shop />} />
      <Route path="/speaker" element={<Shop />} />
      <Route path="/audio" element={<Shop />} />
      <Route path="/smart-watch" element={<Shop />} />
      <Route path="/home-appliances" element={<Shop />} />
      <Route path="/it-accessories" element={<Shop />} />

      {/* Policy Pages */}
      <Route path="/help-center" element={<Policy />} />
      <Route path="/return-policy" element={<Policy />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/terms" element={<Policy />} />

      {/* ── GUEST-ONLY ROUTES (logged-in user redirect hoga) ── */}
      {/* Logged in hoke /login ya /register khologe to home pe aoge */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        }
      />

      {/* ── PROTECTED ROUTES (sirf logged-in customers) ────── */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-tracking/:id"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <SupportTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/returns"
        element={
          <ProtectedRoute>
            <Returns />
          </ProtectedRoute>
        }
      />

      {/* ── VENDOR-ONLY ROUTES ─────────────────────────────── */}
      <Route
        path="/seller/dashboard"
        element={
          <RoleRoute allowedRoles={["vendor", "admin"]}>
            <SellerDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/seller/add-product"
        element={
          <RoleRoute allowedRoles={["vendor", "admin"]}>
            <AddProduct />
          </RoleRoute>
        }
      />
      <Route
        path="/seller/products"
        element={
          <RoleRoute allowedRoles={["vendor", "admin"]}>
            <SellerProducts />
          </RoleRoute>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <RoleRoute allowedRoles={["vendor", "admin"]}>
            <Orders />
          </RoleRoute>
        }
      />
      <Route
        path="/seller/edit-product/:id"
        element={
          <RoleRoute allowedRoles={["vendor", "admin"]}>
            <AddProduct />
          </RoleRoute>
        }
      />

      {/* ── ADMIN-ONLY ROUTES ──────────────────────────────── */}
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/returns"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminReturns />
          </RoleRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes

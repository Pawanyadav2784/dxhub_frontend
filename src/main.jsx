import { StrictMode } from 'react'
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      {/* AuthProvider CartProvider ke ANDAR hona chahiye
          taaki AuthContext CartContext ka initCart access kar sake */}
      <AuthProvider>
        <WishlistProvider>
          <App/>
        </WishlistProvider>
      </AuthProvider>
    </CartProvider>
  </BrowserRouter>,
)

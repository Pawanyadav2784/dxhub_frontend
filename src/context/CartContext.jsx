import { createContext, useState, useEffect, useCallback } from "react"

export const CartContext = createContext()

// User-specific localStorage key banao
const getCartKey = (userId) => userId ? `cart_${userId}` : null

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)

  // ─── callback ref for navigate (AuthContext inject karega) ───
  const [_navigateToLogin, setNavigateRef] = useState(null)

  // User change hone par (login/logout) cart reload karo
  const initCart = useCallback((userId) => {
    setCurrentUserId(userId)
    if (!userId) {
      setCart([])
      return
    }
    const cartKey = getCartKey(userId)
    const saved = localStorage.getItem(cartKey)
    setCart(saved ? JSON.parse(saved) : [])
  }, [])

  // navigate function inject karne ka method
  const setNavigateToLogin = useCallback((fn) => {
    setNavigateRef(() => fn)
  }, [])

  // Jab bhi cart ya userId change ho, save karo
  useEffect(() => {
    const cartKey = getCartKey(currentUserId)
    if (!cartKey) return
    localStorage.setItem(cartKey, JSON.stringify(cart))
  }, [cart, currentUserId])

  // ✅ Auth check — logout hai to login pe redirect
  const addToCart = (product) => {
    if (!currentUserId) {
      // Logged out — login pe bhejo
      if (_navigateToLogin) {
        _navigateToLogin()
      } else {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
      return
    }
    setCart((prev) => {
      const existingItem = prev.find(item => item._id === product._id)
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    const cartKey = getCartKey(currentUserId)
    if (cartKey) localStorage.removeItem(cartKey)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        initCart,
        setNavigateToLogin,   // AppRoutes/Layout inject karega
        cartCount: cart.length,
        cartTotal,
        isLoggedIn: !!currentUserId
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

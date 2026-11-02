import { createContext, useState, useEffect, useContext } from "react"
import authService from "../services/authService"
import { CartContext } from "./CartContext"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // CartContext se initCart lo
  const { initCart } = useContext(CartContext)

  useEffect(() => {
    const userInfo = authService.getCurrentUser()
    if (userInfo) {
      setUser(userInfo)
      initCart(userInfo._id) // ✅ App open hone par user ki cart load karo
    } else {
      initCart(null) // ✅ Koi login nahi — cart empty
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password)
      setUser(data)
      initCart(data._id) // ✅ Login par us user ki cart load karo
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const data = await authService.register(userData)
      setUser(data)
      initCart(data._id) // ✅ Register par fresh empty cart
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    initCart(null) // ✅ Logout par cart completely clear
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      register,
      logout, 
      updateUser,
      isVendor: user?.role === 'vendor',
      isAdmin: user?.role === 'admin',
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

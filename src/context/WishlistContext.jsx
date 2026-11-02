import { createContext, useState, useEffect } from "react"
import api from "../services/api"
import { ENDPOINTS } from "../utils/endpoints"

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      fetchWishlist()
    } else {
      setWishlist([]) // ✅ Logout par wishlist clear
    }
  }, [])

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const response = await api.get(ENDPOINTS.WISHLIST.BASE)
      setWishlist(response.data)
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    try {
      await api.post(ENDPOINTS.WISHLIST.ADD, { productId })
      await fetchWishlist()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to wishlist' 
      }
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`${ENDPOINTS.WISHLIST.REMOVE}/${productId}`)
      setWishlist(prev => prev.filter(item => item._id !== productId))
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Failed to remove from wishlist' }
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId)
  }

  const clearWishlist = async () => {
    try {
      await api.delete(ENDPOINTS.WISHLIST.CLEAR)
      setWishlist([])
    } catch (error) {
      console.error('Failed to clear wishlist:', error)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { FaUser, FaShoppingCart, FaChevronDown, FaChevronRight, FaSignOutAlt, FaHeart, FaBars, FaTimes } from "react-icons/fa"
import { HiOutlineSearch } from "react-icons/hi"
import { AuthContext } from "../../context/AuthContext"
import { useCart } from "../../hooks/useCart"
import { WishlistContext } from "../../context/WishlistContext"
import productService from "../../services/productService"
import { CATEGORIES_DATA } from "../../utils/categoryData"

import Logo from "../Logo"

const Navbar = () => {
  const { user, logout, isVendor } = useContext(AuthContext)
  const { cartItems, clearCart } = useCart()
  const { wishlistCount } = useContext(WishlistContext)
  const navigate = useNavigate()

  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(CATEGORIES_DATA[0])
  const [userOpen, setUserOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const userMenuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([])
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    clearCart()
    setUserOpen(false)
  }

  const handleSearchChange = async (value) => {
    setSearchTerm(value)
    if (value.length >= 1) {
      try {
        const data = await productService.getProducts({ search: value })
        setSearchResults(data.products || [])
      } catch (err) {
        setSearchResults([])
      }
    } else {
      setSearchResults([])
    }
  }

  const handleSearch = () => {
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
    setSearchTerm("")
    setSearchResults([])
  }

  const handleViewAll = () => {
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
    setSearchTerm("")
    setSearchResults([])
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">
        <Logo />

        <div ref={searchRef} className="hidden md:block relative w-[220px] lg:w-[280px] xl:w-[320px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
              placeholder="Search electronics, mobiles..."
              className="w-full rounded-full py-1.5 pl-8 pr-8 text-xs lg:text-sm text-gray-700 outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button type="button" onClick={handleSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
              <HiOutlineSearch className="text-base" />
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
              {searchResults.map(product => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => { setSearchTerm(""); setSearchResults([]); }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 border-b"
                >
                  <img src={product.images?.[0]} alt="" className="w-10 h-10 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500">₹{product.price}</p>
                  </div>
                </Link>
              ))}
              <Link
                to="#"
                onClick={handleViewAll}
                className="block p-2 text-center text-blue-600 text-sm hover:bg-gray-100 font-semibold"
              >
                View all results
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6 font-medium text-xs lg:text-sm">
          <Link to="/" className="hover:text-yellow-300 whitespace-nowrap transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-yellow-300 whitespace-nowrap transition">
            All Products
          </Link>

          {/* Categories Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-yellow-300 py-2 font-semibold whitespace-nowrap transition">
              Categories <FaChevronDown size={11} />
            </button>

            {/* Mega Dropdown Menu */}
            <div
              className={`absolute -left-40 md:-left-52 top-10 w-[580px] max-w-[calc(100vw-3rem)] bg-white text-gray-800 shadow-2xl rounded-xl transition-all duration-200 z-50 flex overflow-hidden border border-gray-200
              ${categoriesOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}`}
            >
              {/* Main Categories Sidebar */}
              <div className="w-56 bg-gray-50 border-r border-gray-100 py-2 max-h-[440px] overflow-y-auto custom-scrollbar">
                {CATEGORIES_DATA.map((cat) => (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => {
                      navigate(`/shop?category=${encodeURIComponent(cat.name)}`);
                      setCategoriesOpen(false);
                    }}
                    className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between cursor-pointer transition ${activeCategory?.id === cat.id ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    <span>{cat.name}</span>
                    <FaChevronRight size={10} className={activeCategory?.id === cat.id ? "text-white" : "text-gray-400"} />
                  </div>
                ))}
              </div>

              {/* Subcategories Panel */}
              <div className="flex-1 p-4 max-h-[440px] overflow-y-auto bg-white">
                {activeCategory && (
                  <div>
                    <div className="flex items-center justify-between border-b pb-2 mb-3">
                      <h4 className="font-bold text-gray-900 text-sm">{activeCategory.name}</h4>
                      <Link
                        to={`/shop?category=${encodeURIComponent(activeCategory.name)}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Browse All →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {activeCategory.subcategories.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={`/shop?category=${encodeURIComponent(activeCategory.name)}&subcategory=${encodeURIComponent(sub)}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="p-2 rounded-md text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition border border-transparent hover:border-blue-100 truncate"
                        >
                          • {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link to="/contact" className="hover:text-yellow-300 whitespace-nowrap transition">
            Contact
          </Link>

          <Link to="/about" className="hover:text-yellow-300 whitespace-nowrap transition">
            About
          </Link>

          {isVendor && (
            <Link 
              to="/seller/dashboard" 
              className="bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold px-3 py-1 rounded-full text-xs shadow-sm whitespace-nowrap transition hover:scale-105"
            >
              Seller Dashboard
            </Link>
          )}
        </div>

        {/* User & Cart Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/wishlist" className="relative cursor-pointer">
            <FaHeart className="text-xl" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div ref={userMenuRef} className="relative hidden md:block">
            <FaUser
              className="cursor-pointer text-xl"
              onClick={() => setUserOpen(!userOpen)}
            />

            {userOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black rounded shadow-lg w-48 z-50 border">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                    </div>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setUserOpen(false)}
                    >
                      My Orders
                    </Link>
                    {isVendor && (
                      <Link
                        to="/seller/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setUserOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setUserOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setUserOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search electronics..."
              className="w-full rounded-full py-2 pl-10 pr-4 text-gray-700 text-sm outline-none"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          </div>

          <Link
            to="/"
            className="block py-2 hover:text-yellow-300 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="block py-2 hover:text-yellow-300 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>

          {/* Mobile Categories Accordion */}
          <div>
            <button
              className="flex items-center justify-between py-2 hover:text-yellow-300 w-full font-semibold"
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            >
              <span>Product Categories</span>
              <FaChevronDown className={`transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`} size={12} />
            </button>

            {mobileCategoriesOpen && (
              <div className="pl-3 space-y-2 bg-blue-800 rounded-lg p-3 mt-1 max-h-80 overflow-y-auto">
                {CATEGORIES_DATA.map((cat) => (
                  <div key={cat.id} className="border-b border-blue-700/50 pb-2 last:border-b-0">
                    <button
                      className="flex items-center justify-between text-xs font-semibold py-1.5 w-full text-yellow-200"
                      onClick={() => setExpandedMobileCategory(expandedMobileCategory === cat.id ? null : cat.id)}
                    >
                      <span>{cat.name}</span>
                      <FaChevronDown className={`transition-transform ${expandedMobileCategory === cat.id ? 'rotate-180' : ''}`} size={10} />
                    </button>

                    {expandedMobileCategory === cat.id && (
                      <div className="pl-3 py-1 space-y-1">
                        <Link
                          to={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[11px] font-bold text-white py-1 hover:underline"
                        >
                          All {cat.name}
                        </Link>
                        {cat.subcategories.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={`/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-[11px] text-blue-100 py-0.5 hover:text-white"
                          >
                            • {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="block py-2 hover:text-yellow-300 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/about"
            className="block py-2 hover:text-yellow-300 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          {user ? (
            <>
              <div className="border-t border-blue-500 pt-3">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-blue-200 uppercase">{user.role}</p>
              </div>
              <Link
                to="/my-orders"
                className="block py-2 hover:text-yellow-300 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
              {isVendor && (
                <Link
                  to="/seller/dashboard"
                  className="block py-2 hover:text-yellow-300 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Seller Dashboard
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block py-2 text-red-300 hover:text-red-100 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 hover:text-yellow-300 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 hover:text-yellow-300 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

import { useLocation } from "react-router-dom"
import SEO from "./SEO"
import { getSiteUrl } from "./seoConfig"

const routeMetadata = {
  "/": ["Premium Electronics & Smart Gadgets", "Discover smartphones, audio gear, smart watches and electronics at DXHUB."],
  "/shop": ["Shop Smart Electronics", "Browse DXHUB's electronics, smartphones and gadget collection with trusted quality."],
  "/about": ["About Us", "Learn about DXHUB, our commitment to high-speed smart electronics and tech gadgets."],
  "/contact": ["Contact Us", "Contact DXHUB for product, order and customer support enquiries."],
  "/seller/dashboard": ["Seller Dashboard", "Manage your seller products, orders and earnings on DXHUB."],
  "/seller/add-product": ["Add Product Studio", "Create and publish new electronics products to DXHUB catalog."],
  "/seller/products": ["Seller Catalog", "View and manage your active listed products on DXHUB."],
  "/cart": ["Shopping Cart", "View items in your DXHUB shopping cart."],
  "/checkout": ["Checkout", "Complete your DXHUB order securely."],
  "/login": ["Account Login", "Sign in to your DXHUB customer or vendor account."],
  "/register": ["Create Account", "Register a new customer or vendor account on DXHUB."],
  "/my-orders": ["My Orders", "View your order history and tracking status on DXHUB."],
  "/wishlist": ["My Wishlist", "View saved favorite products on DXHUB."],
  "/help-center": ["Help Center", "Get help with electronics shopping and orders at DXHUB."],
  "/return-policy": ["Return Policy", "Read DXHUB's return and replacement policy."],
  "/privacy-policy": ["Privacy Policy", "Learn how DXHUB collects, uses and protects your information."],
  "/terms": ["Terms & Conditions", "Read the terms and conditions for shopping at DXHUB."],
}

const noIndexPaths = [
  "/cart", "/checkout", "/login", "/register", "/my-orders", "/order-tracking",
  "/wishlist", "/invoice", "/support", "/returns", "/seller", "/admin", "/unauthorized",
]

const RouteSEO = () => {
  const { pathname } = useLocation()
  const metadata = routeMetadata[pathname]
  const noIndex = noIndexPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  const siteUrl = getSiteUrl()
  const homeSchema = pathname === "/" ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DXHUB",
        url: siteUrl,
        logo: `${siteUrl}/logo.jpeg`,
        email: "business@dxhub.in",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "DXHUB",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  } : undefined

  // Determine title fallback dynamically
  const getDynamicTitle = () => {
    if (metadata?.[0]) return metadata[0]
    if (pathname.startsWith("/product/")) return "Product Details"
    if (pathname.startsWith("/seller/edit-product")) return "Edit Product"
    if (pathname.startsWith("/seller")) return "Seller Workspace"
    return "Premium Electronics & Smart Gadgets"
  }

  return (
    <SEO
      title={getDynamicTitle()}
      description={metadata?.[1]}
      path={pathname}
      noIndex={noIndex}
      schema={homeSchema}
    />
  )
}

export default RouteSEO

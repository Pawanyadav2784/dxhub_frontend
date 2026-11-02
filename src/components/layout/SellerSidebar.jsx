import { Link } from "react-router-dom"

const SellerSidebar = () => {

  return (

    <div className="w-64 h-screen bg-black text-white p-6">

      <h2 className="text-xl mb-8">
        Seller Panel
      </h2>

      <div className="flex flex-col gap-4">

        <Link to="/seller/dashboard">
          Dashboard
        </Link>

        <Link to="/seller/add-product">
          Add Product
        </Link>

        <Link to="/seller/products">
          My Products
        </Link>

        <Link to="/seller/orders">
          Orders
        </Link>

      </div>

    </div>

  )
}

export default SellerSidebar
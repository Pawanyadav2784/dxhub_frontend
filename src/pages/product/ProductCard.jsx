import { FaHeart } from "react-icons/fa"

const ProductCard = ({product}) => {

  return (

    <div className="border p-4 group relative hover:shadow-lg transition">

      <img
        src={product.image}
        className="w-full h-52 object-cover"
      />

      <h2 className="mt-4 font-semibold">
        {product.name}
      </h2>

      <p className="text-yellow-600">
        ₹{product.price}
      </p>

      <button className="bg-black text-white w-full mt-3 py-2">
        Add To Cart
      </button>

      <FaHeart className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 cursor-pointer"/>

    </div>

  )

}

export default ProductCard
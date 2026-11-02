// import ProductCard from "../product/ProductCard";

// const PopularProducts = () => {

//   const products = [
//     {
//       id:1,
//       name:"Pearl Earrings",
//       price:199,
//       image:"https://images.unsplash.com/photo-1535632787350-4e68ef0ac584"
//     },
//     {
//       id:2,
//       name:"Gold Earrings",
//       price:199,
//       image:"https://images.unsplash.com/photo-1602751584552-8ba73aad10e1"
//     },
//     {
//       id:3,
//       name:"Diamond Ring",
//       price:199,
//       image:"https://images.unsplash.com/photo-1588449668365-d15e397f6787"
//     }
//   ]

//   return (

//     <div className="px-10 py-20">

//       <h2 className="text-3xl font-bold text-center mb-10">
//         Popular This Week
//       </h2>

//       <div className="grid grid-cols-3 gap-6">

//         {products.map((p)=>(
//           <ProductCard key={p.id} product={p}/>
//         ))}

//       </div>

//     </div>

//   )

// }

// export default PopularProducts

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/productService";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts({ sort: "price-high", limit: 3 })
      .then(data => {
        const list = data.products || (Array.isArray(data) ? data : []);
        setProducts(list);
      })
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-slate-950 text-white px-4">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-yellow-400">
          Popular Electronics This Week
        </h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Discover our top rated smartphones, speakers, headphones & smartwatches
        </p>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-4 transition hover:border-yellow-400/50 hover:shadow-xl"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-xl bg-white h-64 flex items-center justify-center p-4">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>

            {/* Details */}
            <div className="mt-5 text-center">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{p.category}</span>
              <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                {p.name}
              </h3>
              <p className="text-yellow-400 font-extrabold text-lg mt-1">
                ₹{p.price?.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-16">
        <Link to="/shop" className="px-10 py-3 border.5 border-yellow-400 bg-yellow-400 text-slate-950 font-bold rounded-xl hover:bg-yellow-300 transition shadow-lg">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default PopularProducts;
// import ProductCard from "../product/ProductCard";

// const FeaturedProducts = () => {

//   const products = [

//     {
//       id:1,
//       name:"Diamond Ring",
//       price:50000,
//       image:"https://images.unsplash.com/photo-1588449668365-d15e397f6787"
//     },

//     {
//       id:2,
//       name:"Gold Necklace",
//       price:75000,
//       image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638"
//     },

//     {
//       id:3,
//       name:"Silver Bracelet",
//       price:20000,
//       image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
//     }

//   ]

//   return (

//     <div className="px-10 py-20">

//       <h2 className="text-3xl font-bold text-center mb-10">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-3 gap-6">

//         {products.map((p)=>(
//           <ProductCard key={p.id} product={p}/>
//         ))}

//       </div>

//     </div>

//   )

// }

// export default FeaturedProducts

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts({ limit: 6 })
      .then(data => {
        const list = data.products || (Array.isArray(data) ? data : []);
        setProducts(list);
      })
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="px-6 py-6 bg-white border-t border-b">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Trending Electronics & Deals</h3>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              className="min-w-[200px] max-w-[220px] bg-gray-50 rounded-xl p-3 
              transition duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group border border-gray-100"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-lg bg-white h-36 flex items-center justify-center">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              {/* Title */}
              <p className="text-xs font-medium text-gray-900 mt-2 line-clamp-2 leading-tight">
                {p.name}
              </p>

              {/* Rating */}
              <div className="mt-1">
                <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {p.ratings?.toFixed(1) || '4.2'} ★
                </span>
              </div>

              {/* Price */}
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-bold text-sm text-gray-900">₹{p.price?.toLocaleString()}</span>
                {p.comparePrice && (
                  <span className="text-gray-400 line-through text-xs">
                    ₹{p.comparePrice?.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
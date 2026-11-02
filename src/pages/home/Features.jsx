// const Features = () => {

//   return (

//     <div className="bg-gray-100 py-16">

//       <div className="grid grid-cols-3 text-center">

//         <div>
//           <h3 className="font-bold">Free Shipping</h3>
//           <p>On orders over ₹1200</p>
//         </div>

//         <div>
//           <h3 className="font-bold">Dedicated Support</h3>
//           <p>Quick response 24/7</p>
//         </div>

//         <div>
//           <h3 className="font-bold">Money Back</h3>
//           <p>Worry-free shopping</p>
//         </div>

//       </div>

//     </div>

//   )
// }

// export default Features
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck size={32} />,
      title: "Free Shipping",
      desc: "On orders over ₹1200",
    },
    {
      icon: <Headphones size={32} />,
      title: "Dedicated Support",
      desc: "Quick response 24/7",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Money Back",
      desc: "Worry-free shopping",
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4 text-black">{item.icon}</div>

            <h3 className="font-semibold text-lg mb-1">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;
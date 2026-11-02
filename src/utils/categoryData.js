// DXHUB Product Categories & Subcategories Registry

export const CATEGORIES_DATA = [
  {
    id: "mobiles",
    name: "Mobiles",
    slug: "mobiles",
    icon: "FaMobileAlt",
    image: "/categories/mobiles.png",
    subcategories: ["Feature Phones", "Landline Phones", "Smart Phones"]
  },
  {
    id: "speaker",
    name: "Speaker",
    slug: "speaker",
    icon: "FaVolumeUp",
    image: "/categories/speaker.png",
    subcategories: [
      "Portable Speaker",
      "Party Speaker",
      "Tower Speaker",
      "Sound Bar / Home Theatre",
      "Multimedia Speaker"
    ]
  },
  {
    id: "audio",
    name: "Audio",
    slug: "audio",
    icon: "FaHeadphones",
    image: "/categories/audio.png",
    subcategories: ["Tws / Buds", "Neckband", "Headphone", "Wire earphone"]
  },
  {
    id: "chargers-and-adaptors",
    name: "Chargers and adaptors",
    slug: "chargers-and-adaptors",
    icon: "FaPlug",
    image: "/categories/chargers.png",
    subcategories: ["Fast Chargers", "Car Chargers", "Wireless Adaptors"]
  },
  {
    id: "data-cable",
    name: "Data cable",
    slug: "data-cable",
    icon: "FaUsb",
    image: "/categories/datacable.png",
    subcategories: ["Type C Cable", "Micro USB Cable", "Lightning Cable"]
  },
  {
    id: "power-bank",
    name: "Power bank",
    slug: "power-bank",
    icon: "FaBatteryFull",
    image: "/categories/powerbank.png",
    subcategories: ["10000mAh", "20000mAh", "Fast Charging Power Bank"]
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    slug: "smart-watch",
    icon: "FaClock",
    image: "/categories/smartwatch.png",
    subcategories: ["Calling Smartwatch", "Sports Watch", "Fitness Band"]
  },
  {
    id: "mobile-accessories",
    name: "Mobile Accessories",
    slug: "mobile-accessories",
    icon: "FaMobile",
    image: "/categories/accessories.png",
    subcategories: ["Mobile stand", "Selfie stick", "Blogger Mic", "Cooling pad"]
  },
  {
    id: "home-appliances",
    name: "Home appliances",
    slug: "home-appliances",
    icon: "FaTv",
    image: "/categories/appliances.png",
    subcategories: [
      "LED Tv",
      "Washing Machine",
      "Air Conditioner",
      "Water cooler",
      "Water Heater",
      "Irons"
    ]
  },
  {
    id: "it-accessories",
    name: "IT Accessories",
    slug: "it-accessories",
    icon: "FaLaptop",
    image: "/categories/it.png",
    subcategories: ["Keyboard", "Mouse", "Laptop stand"]
  },
  {
    id: "office-supply",
    name: "Office Supply",
    slug: "office-supply",
    icon: "FaPrint",
    image: "/categories/office.png",
    subcategories: ["Photocopier Paper", "Tissue Paper", "Cleaning items"]
  }
];

export const getAllCategories = () => CATEGORIES_DATA;

export const getCategoryBySlug = (slug) =>
  CATEGORIES_DATA.find((cat) => cat.slug === slug || cat.name.toLowerCase() === slug.toLowerCase());

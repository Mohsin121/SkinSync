import { useState } from "react";
import { Link } from "react-router-dom";

import { ChevronLeft, ChevronRight, ShoppingCart, Star} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import HeroSection from "./HeroSection";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    brand: "SkinSync",
    price: 29.99,
    category: "Cleansers",
    image: "https://picsum.photos/id/101/300/400",
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    brand: "Radiance",
    price: 45.5,
    category: "Serums",
    image: "https://picsum.photos/id/102/300/400",
  },
  {
    id: 3,
    name: "Deep Moisture Cream",
    brand: "HydraGlow",
    price: 39.99,
    category: "Moisturizers",
    image: "https://picsum.photos/id/103/300/400",
  },
  {
    id: 4,
    name: "Gentle Exfoliating Scrub",
    brand: "PureSkin",
    price: 34.99,
    category: "Exfoliants",
    image: "https://picsum.photos/id/104/300/400",
  },
];

const recommendedProducts = [
  {
    id: 5,
    name: "Overnight Repair Mask",
    brand: "NightCare",
    price: 49.99,
    image: "https://picsum.photos/id/101/300/400",
  },
  {
    id: 6,
    name: "Anti-Aging Eye Cream",
    brand: "YouthFul",
    price: 59.99,
    image: "https://picsum.photos/id/106/300/400",
  },
  {
    id: 7,
    name: "Daily Sun Protection",
    brand: "Shield",
    price: 35.5,
    image: "https://picsum.photos/id/107/300/400",
  },
];




const Home = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  });
  const [carouselIndex, setCarouselIndex] = useState(0);
 


  const filteredProducts = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.priceRange ||
        checkPriceRange(product.price, filters.priceRange))
  );


  function checkPriceRange(price, range) {
    switch (range) {
      case "0-25":
        return price <= 25;
      case "25-50":
        return price > 25 && price <= 50;
      case "50+":
        return price > 50;
      default:
        return true;
    }
  }


  // Product Card Component
  const ProductCard = ({ product, variant = "default" }) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
      dispatch(addToCart(product));
    };
  
    return (
      <div
        className={`
          ${theme?.card} 
          ${theme?.border} 
          rounded-xl 
          overflow-hidden 
          shadow-lg 
          hover:shadow-2xl 
          transition-all 
          duration-300 
          group
          relative
          ${variant === "carousel" ? "w-full" : ""}
        `}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-white/70 rounded-full p-2 shadow-md">
            <Star
              size={20}
              className="text-yellow-500 fill-yellow-100 hover:fill-yellow-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg truncate pr-2">{product.name}</h3>
            <span className="font-semibold text-emerald-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className={`${theme?.subtext} text-xs italic`}>{product.brand}</p>
          <div className="flex justify-between items-center mt-3">
            <button
            onClick={()=> handleAddToCart(product)}
              className={`
                ${theme?.primary} 
                text-white 
                px-4 
                py-2 
                rounded-lg 
                flex 
                items-center 
                gap-2 
                hover:opacity-90 
                transition 
                duration-200
              `}
            >
              <ShoppingCart size={16} />
             
            </button>
            <Link
              to={`detail`}
              className="text-sm underline hover:text-blue-600 transition"
            >
              Quick View
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${theme?.background} ${theme?.text} min-h-screen  mb-4 `}>
      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto ">
        {/* Hero Section */}
       
           <HeroSection/>
        {/* Filters */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Our Products</h2>
          <div className="flex space-x-4">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className={`${theme?.card} ${theme?.border} p-2 rounded-lg`}
            >
              <option value="">All Categories</option>
              <option value="Cleansers">Cleansers</option>
              <option value="Serums">Serums</option>
              <option value="Moisturizers">Moisturizers</option>
            </select>
            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters({ ...filters, priceRange: e.target.value })
              }
              className={`${theme?.card} ${theme?.border} p-2 rounded-lg`}
            >
              <option value="">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50+">$50+</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Recommended Products Carousel */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recommended For You</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                className={`${theme?.card} ${theme?.border} p-2 rounded-lg`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setCarouselIndex(
                    Math.min(recommendedProducts.length - 3, carouselIndex + 1)
                  )
                }
                className={`${theme?.card} ${theme?.border} p-2 rounded-lg`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {recommendedProducts
              .slice(carouselIndex, carouselIndex + 3)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="carousel"
                />
              ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Cleansers", "Moisturizers", "Serums"].map((category) => (
            <div
              key={category}
              className={`${theme?.card} ${theme?.border} p-6 rounded-lg shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="mb-4">
                Explore our selection of {category.toLowerCase()}
              </p>
              <Link
                to={`/products?category=${category.toLowerCase()}`}
                className={`${theme?.primary} text-white px-3 py-1 rounded-lg text-sm`}
              >
                View Products →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

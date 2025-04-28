import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";
import RecommendedSection from "./RecommendedSection";



const Home = () => {
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data.data.slice(0, 6)); // Show only first 6 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.priceRange || checkPriceRange(product.price, filters.priceRange))
  );

 

  return (
    <div className={`${theme?.background} ${theme?.text} min-h-screen mb-4`}>
      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <HeroSection />

        {/* Filters */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Our Products</h2>
          <div className="flex space-x-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className={`${theme?.card} ${theme?.border} p-2 rounded-lg`}
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Accesories">Accesories</option>
            </select>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
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
          {filteredProducts.length ? (
            filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p>No products found</p>
          )}
        </div>

        {/* Recommended Products Carousel */}
       <RecommendedSection/>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Pants", "Shirts", "Accesories"].map((category) => (
            <div key={category} className={`${theme?.card} ${theme?.border} p-6 rounded-lg shadow-md`}>
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="mb-4">Explore our selection of {category.toLowerCase()}</p>
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

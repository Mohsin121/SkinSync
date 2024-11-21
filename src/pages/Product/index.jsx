import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
const Product = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  });
  const [sortBy, setSortBy] = useState("latest");

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

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "latest") return b.id - a.id;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const ProductCard = ({ product }) => {
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
        `}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full  object-cover transition-transform duration-300 group-hover:scale-110"
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
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
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
    <div className={`${theme?.background} ${theme?.text} min-h-screen`}>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`
            col-span-1
            ${theme?.card} 
            ${theme?.border}
            rounded-xl 
            p-6
          `}>
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2">Category</h3>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className={`
                    ${theme?.card} 
                    ${theme?.border}
                    p-2 
                    rounded-lg 
                    w-full
                  `}
                >
                  <option value="">All Categories</option>
                  <option value="Cleansers">Cleansers</option>
                  <option value="Serums">Serums</option>
                  <option value="Moisturizers">Moisturizers</option>
                  <option value="Exfoliants">Exfoliants</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2">Price Range</h3>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    setFilters({ ...filters, priceRange: e.target.value })
                  }
                  className={`
                    ${theme?.card} 
                    ${theme?.border}
                    p-2 
                    rounded-lg 
                    w-full
                  `}
                >
                  <option value="">All Prices</option>
                  <option value="0-25">$0 - $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50+">$50+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sort By */}
            <div className={`
              col-span-3
              ${theme?.card} 
              ${theme?.border}
              rounded-xl 
              p-4 
              flex 
              items-center 
              justify-end
            `}>
              <span className={`${theme?.subtext} mr-4`}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`
                  ${theme?.card} 
                  ${theme?.border}
                  p-2 
                  rounded-lg 
                `}
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Product Cards */}
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
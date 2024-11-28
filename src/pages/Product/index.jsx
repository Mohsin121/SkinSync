import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, ShoppingCart, X, ArrowBigRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { addToCart } from '../../redux/slices/cartSlice';


const ProductsPage = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(200);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Hydrating Facial Cleanser',
      description: 'Gentle facial cleanser for all skin types',
      price: 29.99,
      category: 'women',
      image: 'https://picsum.photos/id/101/600/400',
    },
    {
      id: 2,
      name: "Men's Beard Oil",
      description: 'Nourishing beard oil for smooth grooming',
      price: 24.5,
      category: 'men',
      image: 'https://picsum.photos/id/102/600/400',
    },
    {
      id: 3,
      name: 'Unisex Moisturizer',
      description: 'All-day hydration for all skin types',
      price: 34.99,
      category: 'all',
      image: 'https://picsum.photos/id/103/600/400',
    },
    {
      id: 4,
      name: "Women's Night Cream",
      description: 'Rejuvenating night treatment',
      price: 45.0,
      category: 'women',
      image: 'https://picsum.photos/id/104/600/400',
    },
    {
      id: 5,
      name: "Men's Face Wash",
      description: 'Deep cleansing formula for men',
      price: 19.99,
      category: 'men',
      image: 'https://picsum.photos/id/105/600/400',
    },
    {
      id: 6,
      name: 'Universal Sunscreen',
      description: 'Broad spectrum protection',
      price: 39.99,
      category: 'all',
      image: 'https://picsum.photos/id/106/600/400',
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (activeFilter === 'All' || product.category === activeFilter.toLowerCase()) &&
      product.price <= priceRange
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={`${theme.background} ${theme.text} min-h-screen p-8`}>
      <div className="container mx-auto">
        {/* Filter Section */}
        <div className={`${theme.card} rounded-xl shadow-md p-4 mb-6 border ${theme.border}`}>
  <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
    <div>
      <h1 className="text-xl  fw-bolder">
        Our Collection
      </h1>
    </div>
    
    <div className="flex items-center gap-3">
  {/* Compact Category Filter */}
  <div
    className={`flex items-center ${
      theme.name === 'Midnight Horizon' ? 'bg-gray-800' : 'bg-gray-100'
    } rounded-full p-1 space-x-1`}
  >
    {['All', 'Men', 'Women'].map((filter) => (
      <button
        key={filter}
        onClick={() => setActiveFilter(filter)}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
          activeFilter === filter
            ? `${theme.primary} text-white`
            : `${
                theme.name === 'Midnight Horizon'
                  ? 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`
        }`}
      >
        {filter}
      </button>
    ))}
  </div>

  {/* Minimalist Price Filter */}
  <div
    className={`flex items-center ${
      theme.name === 'Midnight Horizon' ? 'bg-gray-800' : 'bg-gray-100'
    } rounded-lg px-3 py-1.5 space-x-2`}
  >
    <Filter
      size={16}
      className={`${
        theme.name === 'Midnight Horizon' ? 'text-cyan-400' : 'text-purple-600'
      } opacity-70`}
    />
    <input
      type="range"
      min="0"
      max="200"
      value={priceRange}
      onChange={(e) => setPriceRange(Number(e.target.value))}
      className={`w-24 h-1 ${
        theme.name === 'Midnight Horizon' ? 'bg-gray-700' : 'bg-gray-200'
      } rounded-full appearance-none 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:w-3 
      [&::-webkit-slider-thumb]:h-3 
      [&::-webkit-slider-thumb]:${
        theme.name === 'Midnight Horizon' ? 'bg-cyan-400' : 'bg-purple-600'
      } 
      [&::-webkit-slider-thumb]:rounded-full`}
    />
    <span
      className={`text-xs ${
        theme.name === 'Midnight Horizon' ? 'text-gray-300' : 'text-gray-600'
      }`}
    >
      ${priceRange}
    </span>
  </div>
</div>

  </div>
</div>

        {/* Products Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${theme.card} ${theme.border} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all`}
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className={`${theme.subtext} text-sm mb-4`}>{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                  <Link
                   to="/detail"
                    className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                  >
                    View Detail →
                  </Link>
                </div>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="text-sm underline hover:text-blue-600 transition mt-2"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50`}
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className={`${theme.card} rounded-xl shadow-lg p-8 w-full max-w-lg relative`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-2"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={20} />
            </button>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">{quickViewProduct.name}</h3>
            <p className="text-sm mb-4">{quickViewProduct.description}</p>
            <span className="text-xl font-bold text-emerald-600">${quickViewProduct.price.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

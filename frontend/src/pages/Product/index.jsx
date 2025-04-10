import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useTheme } from '../../context/ThemeContext';
import { Filter, ShoppingCart, X, SlidersHorizontal, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(200);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data.data); // Set products from API response
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the active filter and price range
  const filteredProducts = products.filter(
    (product) =>
      (activeFilter === 'All' || product.category.toLowerCase() === activeFilter.toLowerCase()) &&
      product.price <= priceRange
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Available categories for filtering
  const categories = ['All', 'Men', 'Women', 'Accessories', 'Footwear'];

  return (
    <div className={`${theme.background} ${theme.text} min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Collection</h1>
          <p className={`${theme.subtext} max-w-2xl mx-auto`}>
            Discover our handpicked selection of premium products designed for style and comfort.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel - Desktop */}
          <div className={`hidden lg:block w-64 shrink-0 ${theme.card} rounded-xl shadow-md p-6 h-fit sticky top-4 ${theme.border} border`}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Tag size={18} className="mr-2" /> Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      activeFilter === category
                        ? `${theme.primary} text-white`
                        : `hover:bg-opacity-10 hover:bg-gray-500`
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <SlidersHorizontal size={18} className="mr-2" /> Price Range
              </h2>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className={`text-sm ${theme.subtext}`}>$0</span>
                  <span className={`text-sm font-medium`}>${priceRange}</span>
                  <span className={`text-sm ${theme.subtext}`}>$200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`${theme.card} ${theme.border} border w-full py-3 rounded-lg flex items-center justify-center gap-2`}
              >
                <Filter size={18} />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className={`lg:hidden ${theme.card} rounded-xl shadow-md p-4 mb-6 ${theme.border} border`}>
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          activeFilter === category
                            ? `${theme.primary} text-white`
                            : `bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700`
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="font-medium mb-2">Price: $0 - ${priceRange}</h3>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className={`${theme.card} rounded-lg shadow-sm p-4 mb-6 ${theme.border} border flex justify-between items-center`}>
              <div>
                <span className="font-medium">
                  {filteredProducts.length} Products
                </span>
                {activeFilter !== 'All' && (
                  <span className="ml-2">
                    in <span className="font-semibold">{activeFilter}</span>
                  </span>
                )}
              </div>
              <div className={`text-sm ${theme.subtext}`}>
                Price up to ${priceRange}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={`${theme.card} rounded-lg p-8 text-center ${theme.border} border`}>
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className={`${theme.subtext} mb-4`}>Try changing your filters to see more products.</p>
                <button
                  onClick={() => {
                    setActiveFilter('All');
                    setPriceRange(200);
                  }}
                  className={`${theme.primary} text-white px-4 py-2 rounded-lg`}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`${theme.card} ${theme.border} border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group`}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-56 object-cover transform transition-transform group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                      <p className={`${theme.subtext} text-sm mb-3 line-clamp-2`}>{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`${theme.primary} text-white p-2 rounded-lg`}
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={18} />
                          </button>
                          <Link
                            to={`detail/${product._id}`}
                            className={`${theme.card} border ${theme.border} p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
                            aria-label="View details"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className={`${theme.card} rounded-xl shadow-xl p-0 w-full max-w-2xl relative overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 z-10 transition-colors"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${theme.primary} bg-opacity-10`}>
                  {quickViewProduct.category}
                </span>
                <h3 className="text-2xl font-bold mb-2">{quickViewProduct.name}</h3>
                <p className={`${theme.subtext} mb-6`}>{quickViewProduct.description}</p>
                <div className="mb-6">
                  <span className="text-2xl font-bold">${quickViewProduct.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className={`${theme.primary} text-white px-6 py-3 rounded-lg flex items-center gap-2 flex-1`}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <Link
                    to={`detail/${quickViewProduct._id}`}
                    className={`${theme.card} border ${theme.border} px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
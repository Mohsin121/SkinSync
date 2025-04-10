import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingCart, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const RecommendedProducts = () => {
  const { theme } = useTheme();
  const {toneId} = useParams()
  const dispatch = useDispatch();

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Fetch recommended products from API
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        // Using the productId to get personalized recommendations if provided
        const endpoint = `http://localhost:8000/api/products/recommended-products/${toneId}`;
          
        const response = await axios.get(endpoint);
        setRecommendedProducts(response.data.data); // Set recommended products from API response
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [toneId]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={`${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Recommended For You</h2>
          <p className={`${theme.subtext} max-w-2xl mx-auto`}>
            Products we think you'll love based on your preferences and browsing history.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : recommendedProducts.length === 0 ? (
          <div className={`${theme.card} rounded-lg p-8 text-center ${theme.border} border`}>
            <h3 className="text-xl font-medium mb-2">No recommendations available</h3>
            <p className={`${theme.subtext} mb-4`}>We're still learning your preferences.</p>
            <Link
              to="/products"
              className={`${theme.primary} text-white px-4 py-2 rounded-lg inline-block`}
            >
              Explore All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
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
                        to={`/products/detail/${product._id}`}
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
                    to={`/products/detail/${quickViewProduct._id}`}
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

export default RecommendedProducts;
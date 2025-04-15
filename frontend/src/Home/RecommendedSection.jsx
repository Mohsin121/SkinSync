import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Settings, SettingsIcon, Settings2Icon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const RecommendedSection = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      setLoading(true);
      const user = localStorage.getItem("userInfo");
      
      if (user) {
        try {
          const userData = JSON.parse(user);
          const userID = userData?.id;
          
          const res = await axios.get(`http://localhost:8000/api/products/recommended/${userID}`);
          setRecommendedProducts(res.data.data);
        } catch (error) {
          console.error("Error fetching recommended products:", error);
          setRecommendedProducts([]);
        }
      } else {
        console.log("User not found in localStorage");
        setRecommendedProducts([]);
      }
      
      setLoading(false);
    };
  
    fetchRecommendedProducts();
  }, []);

  // No products found message component
  const NoProductsMessage = () => (
    <div className={`${theme?.card} ${theme?.border} border rounded-xl p-6 shadow-md w-full`}>
      <div className="flex flex-col items-center text-center">
        <div className={`p-4 rounded-full ${theme?.primary} bg-opacity-10 mb-4`}>
          <Settings2Icon size={32} className={theme?.primary} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Personalize Your Shopping Experience</h3>
        
        <p className={`${theme?.subtext} mb-4 max-w-lg`}>
          We can recommend products that match your skin tone and preferences. 
          Please update your profile settings to get personalized product recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link 
            to="/profile" 
            className={`${theme?.primary} text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90`}
          >
            Update Skin Tone <ArrowRight size={16} />
          </Link>
          
          <Link 
            to="/products" 
            className={`${theme?.card} ${theme?.border} border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2`}
          >
            Explore All Products
          </Link>
        </div>
        
        <p className="text-sm mt-4">
          Set your skin tone in your profile to find the best matching products for your beauty routine.
        </p>
      </div>
    </div>
  );

  // If still loading, show a loading skeleton
  if (loading) {
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recommended For You</h2>
          <div className="flex space-x-2">
            <div className={`${theme?.card} ${theme?.border} p-2 rounded-lg opacity-50`}>
              <ChevronLeft size={20} />
            </div>
            <div className={`${theme?.card} ${theme?.border} p-2 rounded-lg opacity-50`}>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className={`${theme?.card} ${theme?.border} border rounded-xl h-64 animate-pulse`}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recommended For You</h2>
        
        {recommendedProducts.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              disabled={carouselIndex === 0}
              className={`${theme?.card} ${theme?.border} p-2 rounded-lg ${
                carouselIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCarouselIndex(Math.min(recommendedProducts.length - 3, carouselIndex + 1))}
              disabled={carouselIndex >= recommendedProducts.length - 3}
              className={`${theme?.card} ${theme?.border} p-2 rounded-lg ${
                carouselIndex >= recommendedProducts.length - 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {recommendedProducts.length === 0 ? (
        <NoProductsMessage />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts.slice(carouselIndex, carouselIndex + 3).map((product) => (
            <ProductCard key={product._id} product={product} variant="carousel" />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedSection;
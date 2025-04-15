import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Star, ArrowLeft, Send, Camera, AlertCircle } from "lucide-react";
import axios from "axios";

const Review = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError("Failed to load product details.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

 

  const validateForm = () => {
    const errors = {};
    
    if (rating === 0) {
      errors.rating = "Please select a rating";
    }
    
    if (!reviewText.trim()) {
      errors.text = "Please write your review";
    } else if (reviewText.length < 10) {
      errors.text = "Review must be at least 10 characters long";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }  
    setReviewSubmitting(true);   
    try {
      const token = localStorage.getItem("token");
      const payload= {
        text:reviewText,
        rating:rating,
        product:productId,
      }
      const response = await axios.post(
        "http://localhost:8000/api/reviews/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      
      if (response.data.success) {
        setReviewSuccess(true);
        // Clear form after successful submission
        setRating(0);
        setReviewText("");
        
        // Allow user to see success message before redirecting
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div
          className={`${theme?.card} ${theme?.border} rounded-lg p-6 shadow-md`}
        >
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          <p className="mt-2">Please try again later or contact support.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (reviewSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div
          className={`${theme?.card} ${theme?.border} rounded-lg p-8 shadow-md`}
        >
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p className="text-lg mb-4">Your review has been submitted successfully.</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your feedback helps other customers make better purchase decisions!
          </p>
          
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme?.text} min-h-screen`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </button>

        <div className={`${theme?.card} ${theme?.border} rounded-lg p-6 shadow-md mb-8`}>
          <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
          
          {product && (
            <div className="flex flex-col sm:flex-row items-start mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-xs text-center">No image</span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {product.category}
                </p>
                
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Rating Stars */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    fill={
                      (hoverRating || rating) >= star ? "#FFD700" : "transparent"
                    }
                    stroke={
                      (hoverRating || rating) >= star ? "#FFD700" : "#6B7280"
                    }
                    className="cursor-pointer transition-colors"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {rating > 0 ? `${rating} star${rating !== 1 ? "s" : ""}` : ""}
                </span>
              </div>
              {formErrors.rating && (
                <p className="text-red-500 text-sm mt-1">{formErrors.rating}</p>
              )}
            </div>   

            {/* Review Text */}
            <div className="mb-6">
              <label htmlFor="review-text" className="block text-sm font-medium mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you like or dislike? How was your experience with this product?"
                rows={6}
                className={`w-full px-4 py-2 rounded-md border ${
                  formErrors.text ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                maxLength={1000}
              />
              {formErrors.text ? (
                <p className="text-red-500 text-sm mt-1">{formErrors.text}</p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {reviewText.length}/1000 characters
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle size={16} className="text-red-500 mt-0.5 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={reviewSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {reviewSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
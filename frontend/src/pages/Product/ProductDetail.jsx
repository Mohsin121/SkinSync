import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { useTheme } from './../../context/ThemeContext';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; // Make sure you have axios installed
import CustomerReviews from "./CustomerReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State for loading status
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

  

  // Fetch product details based on the ID from the URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data.data); // Set the product state with the response data
        setSelectedImage(response.data.data.images[0]); // Set the first image as the default
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProduct();
  }, [id]);



  const fetchReviews = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/reviews/${productId}`
      );
      setReviews(response.data.data.reviews); 
      setAverageRating(response.data.data.averageRating)
      setTotalReviews(response.data.data.totalReviews)

    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    if (product?._id) {
      fetchReviews(product._id);
    }
  }, [product]);


  // Handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching product
  }

  return (
    <div className={`${theme.background} ${theme.text} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Product Images */}
          <div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {product?.images?.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${product.name} ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === image ? theme.primary : theme.border
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className={`${theme.subtext} mb-6`}>{product.category}</p>

            <div className="flex items-center mb-6">
              <span className="text-xl font-bold">Rs{product.price}</span>
              <div className="ml-4 flex items-center">
                {[...Array(averageRating)].map((_, index) => (
                  <Star
                    key={index}
                    className={index < product.rating ? "text-yellow-500" : "text-gray-400"}
                  />
                ))}
                <span className={`${theme.subtext} text-sm ml-2`}>
                  {totalReviews || 0} Reviews
                </span>
              </div>
            </div>

            {/* Product Actions and Description Section */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`${theme.primary} text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2`}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <Link
                  to="/checkout"
                  onClick={handleAddToCart}
                  className={`${theme.button} text-center rounded-lg font-medium p-3 ${
                    product.stock === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                  }`}
                >
                  Buy Now
                </Link>
              </div>

              {/* Product Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <h2 className="text-lg font-semibold">
                    Quantity: <span className="text-green-600 dark:text-green-400">{product.stock} in stock</span>
                  </h2>
                ) : (
                  <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Sold Out
                  </h2>
                )}
              </div>

              {/* Product Description */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>{product.description}</span>
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <CustomerReviews reviews = {reviews}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
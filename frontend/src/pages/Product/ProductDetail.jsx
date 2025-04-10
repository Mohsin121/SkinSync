import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { useTheme } from './../../context/ThemeContext';
import { Link, useParams } from "react-router-dom";
import axios from 'axios'; // Make sure you have axios installed


const fakeProduct = {
  name: "Hydrating Facial Cleanser",
  description:
    "A gentle facial cleanser that hydrates and soothes the skin, suitable for all skin types.",
  price: 29.99,
  images: [
    "https://picsum.photos/id/101/600/400",
    "https://picsum.photos/id/102/600/400",
    "https://picsum.photos/id/103/600/400",
  ],
  features: [
    "Hydrates and soothes the skin",
    "Gentle formula suitable for all skin types",
    "Dermatologically tested",
  ],
  reviews: [
    {
      name: "Jane Doe",
      rating: 5,
      comment: "Amazing product! My skin feels so soft and hydrated.",
    },
    {
      name: "John Smith",
      rating: 4,
      comment: "Really good cleanser, but a bit pricey.",
    },
  ],
};
const ProductDetail = () => {

  const { id } = useParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State for loading status

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
            <p className={`${theme.subtext} mb-6`}>{product.description}</p>

            <div className="flex items-center mb-6">
              <span className="text-xl font-bold">${product.price}</span>
              <div className="ml-4 flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={index < product.rating ? "text-yellow-500" : "text-gray-400"}
                  />
                ))}
                <span className={`${theme.subtext} text-sm ml-2`}>
                  {fakeProduct.reviews.length} Reviews
                </span>
              </div>
            </div>

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
                className={`${theme.button} text-center rounded-lg font-medium p-3`}
              >
                Buy Now
              </Link>
            </div>

            {/* Product Features */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mx-2"></span>
                    {product?.description}
                            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
          {fakeProduct.reviews.length > 0 ? (
            <div className="space-y-4">
              {fakeProduct.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className={`${theme.card} ${theme.border} rounded-lg p-4`}
                >
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={index < review.rating ? "text-yellow-500" : "text-gray-400"}
                      />
                    ))}
                    <span className={`${theme.subtext} text-sm ml-2`}>
                      {review.rating} / 5
                    </span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <p
                    className={`${theme.subtext} text-xs mt-2`}
                  >
                    - {review.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${theme.subtext} text-sm`}>No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

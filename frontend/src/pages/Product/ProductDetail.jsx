import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { useTheme } from './../../context/ThemeContext';
import { Link } from "react-router-dom";

const ProductDetail = () => {

  const product = {
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
  
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

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
              {product.images.map((image, idx) => (
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
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-gray-400" />
                <span className={`${theme.subtext} text-sm ml-2`}>
                  {product.reviews.length} Reviews
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
              to='/checkout'
                className={`${theme.button} py-3 rounded-lg font-medium`}
              >
                Buy Now
              </Link>
            </div>

            {/* Product Features */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className={`${theme.card} ${theme.border} rounded-lg p-4`}
                >
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-gray-400" />
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
            <p className={`${theme.subtext} text-sm`}>
              No reviews yet. Be the first to write one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

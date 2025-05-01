import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "../context/ThemeContext";

const ProductCard = ({ product, variant = "default" }) => {
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div
      className={`
        ${theme?.card}
        ${theme?.border} border
        rounded-xl overflow-hidden shadow-md
        hover:shadow-xl transition-all duration-300
        ${variant === "carousel" ? "w-full" : ""}
      `}
    >
      <div className="relative overflow-hidden h-52">
        <Link to={`/products/detail/${product._id}`}>
          <img
            src={product.image || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-4 ">
        {/* Product Category Badge (if available) */}
        {product.category && (
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full inline-block mb-2">
            {product.category}
          </span>
        )}
        <h3 className="font-bold text-lg truncate pr-2">{product.name}</h3>
        <span className="font-semibold text-emerald-600">
          Rs{product.price.toFixed(2)}
        </span>
      </div>
      {/* <p className={`${theme?.subtext} text-xs italic`}>{product.brand}</p> */}
      <div className="flex justify-between items-center mx-2 mb-2">
        <button
          onClick={handleAddToCart}
          className={`${theme?.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition duration-200`}
        >
          <ShoppingCart size={16} />
        </button>
        <Link
          to={`/products/detail/${product._id}`}
          className="text-md underline hover:text-blue-600 transition"
        >
          Detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

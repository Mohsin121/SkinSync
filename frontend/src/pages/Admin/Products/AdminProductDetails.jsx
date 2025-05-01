import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { failureToaster } from "../../../utils/swal";

const AdminProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/product/${id}`);
      navigate("/admin/products");
    } catch (err) {
      failureToaster("Failed to delete product");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading product details...</div>;
  if (error) return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
console.log("asdasdasd")
  return (
    <div className="w-100 mx-auto p-5">
      <button onClick={() => navigate("/admin/products")} className="flex items-center text-gray-600 hover:text-gray-900 mb-5">
        <ArrowLeft className="mr-2" size={18} /> Back to Products
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex space-x-3">
          
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
              <Trash2 size={16} className="mr-2" /> Delete
            </button>
          </div>
        </div>

        <p className="text-gray-700">{product.description}</p>
        <p className="mt-3"><strong>Category:</strong> {product.category}</p>
        <p><strong>Subcategory:</strong> {product.subcategory || "N/A"}</p>
        <p><strong>Price:</strong> Rs{product.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> {product.stock}</p>

        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Product Images</h3>
          <div className="flex gap-3 overflow-x-auto">
            {product.images?.length > 0 ? (
              product.images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index}`} className="w-full h-40 object-cover rounded-md shadow-md" />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;

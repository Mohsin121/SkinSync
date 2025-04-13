import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Filter, Eye } from "lucide-react";
import axios from "axios";

import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
    setProducts(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <div className="flex space-x-3">
          <Link to="add" className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">  
            <Plus size={20} className="mr-2" /> Add Product
          </Link>
         
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-600">{product._id}</td>
                <td className="p-4 text-sm text-gray-900 font-medium">{product.name}</td>
                <td className="p-4 text-sm text-gray-600">{product.category}</td>
                <td className="p-4 text-sm text-gray-600">${product.price.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-600">{product.stock || "N/A"}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                  <Link to={`edit/${product._id}`}  className="text-gray-600 hover:text-gray-900">
                      <Edit size={18} />
                    </Link>
                    
                    <Link to={`detail/${product._id}`} className="text-yellow-500 hover:text-red-700">
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

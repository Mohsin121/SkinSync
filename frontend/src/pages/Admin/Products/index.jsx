import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "Clothing",
      price: 29.99,
      stock: 150
    },
    {
      id: 2,
      name: "Leather Jacket",
      category: "Outerwear",
      price: 199.99,
      stock: 50
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <div className="flex space-x-3">
          <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            <Plus size={20} className="mr-2" /> Add Product
          </button>
          <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Filter size={20} className="mr-2" /> Filters
          </button>
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
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-sm text-gray-600">{product.id}</td>
              <td className="p-4 text-sm text-gray-900 font-medium">{product.name}</td>
              <td className="p-4 text-sm text-gray-600">{product.category}</td>
              <td className="p-4 text-sm text-gray-600">${product.price.toFixed(2)}</td>
              <td className="p-4 text-sm text-gray-600">{product.stock}</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
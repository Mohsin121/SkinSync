import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    images: [],
    suggestedColors: "",
  });
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/product/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("stock", product.stock);
    formData.append("suggestedColors", product.suggestedColors);

    for (let i = 0; i < newImages.length; i++) {
      formData.append("image", newImages[i]);
    }

    try {
      await axios.put(`http://localhost:8000/api/admin/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to update product");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading product data...</div>;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Edit Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block font-medium">Stock</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block font-medium">Subcategory</label>
          <input type="text" name="subcategory" value={product.subcategory} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Suggested Colors</label>
          <input type="text" name="suggestedColors" value={product.suggestedColors} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Current Images</label>
          <div className="flex gap-2 overflow-x-auto mt-2">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt="Product" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Upload New Images (Max: 5)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">Update Product</button>
          <button type="button" onClick={() => navigate("/admin/products")} className="bg-gray-500 text-white px-5 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

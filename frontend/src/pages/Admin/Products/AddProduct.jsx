import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    color: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Predefined colors for selection
  const colors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#808080", "#800000",
  ];

  // Image Upload Handler
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  // Remove Image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Color Selection
  const handleColorSelect = (color) => {
    setProductData((prev) => ({ ...prev, color }));
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!productData.name) newErrors.name = "Product name is required";
    if (!productData.description) newErrors.description = "Description is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.subcategory) newErrors.subcategory = "Subcategory is required";
    if (!productData.stock) newErrors.stock = "Stock is required";
    if (images.length < 3) newErrors.images = "At least 3 images are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Product Data:", productData);
    console.log("Uploaded Images:", images);
    alert("Product added successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Category & Subcategory */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
            <select
              name="subcategory"
              value={productData.subcategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Subcategory</option>
              <option value="Perfumes">Perfumes</option>
              <option value="Shoes">Shoes</option>
            </select>
            {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-8 gap-2 mt-4">
            {images.map((src, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={src} alt={`preview-${index}`} className="w-full h-full rounded-lg object-cover" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Color (Optional)</label>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

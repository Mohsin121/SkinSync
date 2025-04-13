import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { failureToaster, successToaster } from "../../../utils/swal";

const skinTones = [
  { id: 'FFDFC4', name: 'Very Light', hex: '#FFDFC4' },
  { id: 'F0C8A0', name: 'Light', hex: '#F0C8A0' },
  { id: 'D8B094', name: 'Medium Light', hex: '#D8B094' },
  { id: 'BB9675', name: 'Medium', hex: '#BB9675' },
  { id: '8E6B56', name: 'Medium Dark', hex: '#8E6B56' },
  { id: '5F4238', name: 'Dark', hex: '#5F4238' },
  { id: '3B2219', name: 'Very Dark', hex: '#3B2219' }
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    stock: 0,
    suggestedColors: [],
    images: [],
  });

  const categoryOptions = {
    Men: ["Shirts", "Trousers", "Shoes"],
    Women: ["Dresses", "Handbags", "Perfumes"],
    Accessories: ["Watches", "Sunglasses", "Belts"],
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        const product = response.data.data;
        
        // Parse suggestedColors if it's a string
        let suggestedColors = product.suggestedColors;
        if (typeof suggestedColors === 'string') {
          try {
            suggestedColors = JSON.parse(suggestedColors);
          } catch (e) {
            suggestedColors = suggestedColors.split(',').map(color => color.trim());
          }
        }
        
        setFormData({
          productName: product.name || product.productName,
          price: product.price,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory,
          stock: product.stock || product.stock,
          suggestedColors: suggestedColors || [],
          images: product.images || [],
        });
        
        // Set subcategories based on category
        if (product.category && categoryOptions[product.category]) {
          setSubcategories(categoryOptions[product.category]);
        }
        
        // Set image previews from existing product images
        setImagePreviews(product.images || []);
        
      } catch (err) {
        setError("Failed to load product data");
        failureToaster("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "category") {
      setSubcategories(categoryOptions[value] || []);
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    }
  };

  const handleSkinToneToggle = (toneId) => {
    setFormData(prev => {
      const currentTones = prev.suggestedColors;
      const newTones = currentTones.includes(toneId)
        ? currentTones.filter(id => id !== toneId)
        : [...currentTones, toneId];
      return { ...prev, suggestedColors: newTones };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setNewImages(files);
    
    // Create previews for new images
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index, isExisting = true) => {
    if (isExisting) {
      // Remove existing image
      const updatedImages = formData.images.filter((_, i) => i !== index);
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      
      setFormData({ ...formData, images: updatedImages });
      setImagePreviews(updatedPreviews);
    } else {
      // Remove new image
      const newIndex = index - formData.images.length;
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(newIndex, 1);
      
      const updatedPreviews = [...imagePreviews];
      updatedPreviews.splice(index, 1);
      
      setNewImages(updatedNewImages);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.suggestedColors.length === 0) {
      failureToaster("Please select at least one skin tone");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subcategory);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("suggestedColors", JSON.stringify(formData.suggestedColors));
    
    // Append kept existing images
    if (formData.images && formData.images.length > 0) {
      formDataToSend.append("existingImages", JSON.stringify(formData.images));
    }
    
    // Append new images
    newImages.forEach((image) => {
      formDataToSend.append("images", image);
    });

    console.log(formDataToSend);


    try {
      await axios.put(
        `http://localhost:8000/api/products/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      successToaster("Product Updated Successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      failureToaster(error.response?.data?.message || "Error updating product");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl font-semibold text-gray-700">Loading product data...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl font-semibold text-red-600">{error}</div>
    </div>
  );

  return (
    <div className="flex justify-center items-center   py-8">
      <div className=" w-full ">
        <h2 className="text-3xl bg-white rounded-4 p-4 font-bold mb-6 text-center text-gray-800">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter stock"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categoryOptions).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subcategory</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product description"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Suggested Skin Tones</label>
              <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                {skinTones.map((tone) => (
                  <div key={tone.id} className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSkinToneToggle(tone.id)}
                      className={`w-16 h-16 rounded-full border-4 transition-all ${
                        formData.suggestedColors.includes(tone.id)
                          ? 'border-blue-500 scale-110'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: tone.hex }}
                      title={tone.name}
                    />
                    <span className="text-xs text-gray-600">{tone.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">
                Current Images
              </label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {formData.images.map((img, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <label className="block text-gray-700 font-semibold mb-2">
                Upload New Images (Max 2)
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {newImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {newImages.map((file, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(formData.images.length + index, false)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
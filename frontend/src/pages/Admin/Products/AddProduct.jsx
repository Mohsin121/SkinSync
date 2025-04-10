import axios from "axios";
import { useState } from "react";
import { failureToaster, successToaster } from "../../../utils/swal";
import skinTones from "../../../constants/Skintones";
import { categoryOptions } from "../../../constants/CategoriesOptions";



const defaultBody = {
  productName: "",
  price: "",
  description: "",
  category: "",
  subcategory: "",
  quantity: 0,
  suggestedColors: [],
  images: [],
};

const AddProduct = () => {
  const [formData, setFormData] = useState(defaultBody);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
    if (files.length > 2) {
      failureToaster("You can only upload up to 2 images");
      return;
    }

    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];

    files.forEach(file => {
      if (newImages.length < 2) {
        newImages.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.suggestedColors.length === 0) {
      failureToaster("Please select at least one skin tone");
      return;
    }

    if (formData.images.length === 0) {
      failureToaster("Please upload at least one image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subcategory);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("suggestedColors", JSON.stringify(formData.suggestedColors));
    
    // Append images as an array
    formData.images.forEach((image) => {
      formDataToSend.append("images", image); // Use the same key for multiple images
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/product",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData(defaultBody);
      setImagePreviews([]);
      successToaster("Product Added Successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      failureToaster(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>

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
              <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
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
                Upload Images (Max 2)
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
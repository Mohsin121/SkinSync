const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  subcategory: { type: String },
  images: [{ type: String }],
  suggestedColors: [{ type: String, required: true }],

},
  {
    timestamps: true,

  },
);
module.exports = mongoose.model("Product", ProductSchema);

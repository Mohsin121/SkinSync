// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text:{type:String, required:true}
}, {
  timestamps: true,
});

module.exports = mongoose.model("Review", ReviewSchema);


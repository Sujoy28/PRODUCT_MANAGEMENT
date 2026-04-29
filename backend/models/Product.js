
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
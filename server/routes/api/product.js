const express = require("express");
const { auth } = require("../../middlewares");
const { ResponseHandler, upload } = require("../../utils");
const Product = require("../../models/Product");
// const { upload } = require("../../utils/multer"); // Import multer config
const router = express.Router();


// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    return ResponseHandler.ok(res, products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return ResponseHandler.badRequest(res, error.message || "Error fetching products");
  }
});

// Get product details
router.get("/product/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return ResponseHandler.badRequest(res, "Product not found");
    }
    return ResponseHandler.ok(res, product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return ResponseHandler.badRequest(res, error.message || "Error fetching product details");
  }
});

router.post("/product", upload.array("images", 5), async (req, res) => {
  try {
    const { productName, description, price, category, stock, subcategory, suggestedColors } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Generate image URLs
    const images = req.files.map((file) => `http://localhost:8000/uploads/${file.filename}`);

    const newProduct = new Product({
      name: productName,
      description,
      price,
      category,
      subcategory,
      suggestedColors: JSON.parse(suggestedColors), // Parse JSON string to an array
      stock,
      images,
    });

    await newProduct.save();
    return ResponseHandler.ok(res, newProduct, "Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    return ResponseHandler.badRequest(res, error.message || "Error creating product");
  }
});


// Update product details
router.put("/product/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!updatedProduct) {
      return ResponseHandler.badRequest(res, "Product not found");
    }
    return ResponseHandler.ok(res, updatedProduct, "Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
    return ResponseHandler.badRequest(res, error.message || "Error updating product");
  }
});

// Delete a product
router.delete("/product/:productId",  async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return ResponseHandler.badRequest(res, "Product not found");
    }
    return ResponseHandler.ok(res, deletedProduct, "Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    return ResponseHandler.badRequest(res, error.message || "Error deleting product");
  }
});

module.exports = router;

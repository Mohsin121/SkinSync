const express = require("express");
const { auth } = require("../../middlewares");
const { ResponseHandler, upload } = require("../../utils");
const Product = require("../../models/Product");
const User = require("../../models/User");
// const { upload } = require("../../utils/multer"); // Import multer config
const router = express.Router();


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return ResponseHandler.ok(res, products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return ResponseHandler.badRequest(res, error.message || "Error fetching products");
  }
});

// Get product details
router.get("/:productId", async (req, res) => {
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




// API to get recommended products by userID
router.get("/recommended/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return ResponseHandler.badRequest(res, "User ID is required");
    }


    // Fetch user from the database
    const user = await User.findById(id);
    if (!user) {
      return ResponseHandler.badRequest(res, "User not found");
    }

    const skinTone = user.skinTone; // Get the user's skin tone

    // Fetch products based on skin tone matching with suggested colors
    const recommendedProducts = await Product.find({
      suggestedColors: { $in: [skinTone] } // Match products that suggest the user's skin tone
    });

    return ResponseHandler.ok(res, recommendedProducts);
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return ResponseHandler.badRequest(res, error.message || "Error fetching recommended products");
  }
});


// API to get recommended products by skin tone id
router.get("/recommended-products/:toneId", async (req, res) => {
  try {
    const { toneId } = req.params; 
    if (!toneId) {
      return ResponseHandler.badRequest(res, "Skin tone id is required");
    }


    // Fetch products based on skin tone matching with suggested colors
    const recommendedProducts = await Product.find({
      suggestedColors: { $in: [toneId] } // Match products that suggest the user's skin tone
    });

    return ResponseHandler.ok(res, recommendedProducts);
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return ResponseHandler.badRequest(res, error.message || "Error fetching recommended products");
  }
});

router.put("/product/:productId", upload.array("images", 5), async (req, res) => {
  try {
    const { productName, description, price, category, stock, subcategory, suggestedColors, existingImages } = req.body;

    // Ensure suggestedColors is always an array
    const parsedSuggestedColors = Array.isArray(suggestedColors) ? suggestedColors : JSON.parse(suggestedColors);

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `http://localhost:8000/uploads/${file.filename}`);
    }

    // Get the existing product data
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return ResponseHandler.badRequest(res, "Product not found");
    }

    // Merge existing images with new ones
    const allImages = existingImages ? [...JSON.parse(existingImages), ...images] : images;

    product.name = productName || product.name;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.suggestedColors = parsedSuggestedColors || product.suggestedColors;
    product.price = price || product.price;
    product.images = allImages;

    await product.save();

    return ResponseHandler.ok(res, product, "Product updated successfully");
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

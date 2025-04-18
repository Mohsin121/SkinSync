const express = require("express");
const { auth } = require("../../middlewares");
const { ResponseHandler, upload } = require("../../utils");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Order = require("../../models/Order");

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

router.put("/:productId", upload.array("images", 5), async (req, res) => {
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



router.get("/dashboard/stats", auth.required, auth.admin, async (req, res) => {
  try {
   

    // Get total users count
    const totalUsers = await User.countDocuments();

    // Get total products count
    const totalProducts = await Product.countDocuments();

    // Get total orders and revenue
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Calculate monthly revenue for the current year
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" }
        }
      },
      {
        $project: {
          month: "$_id",
          revenue: 1,
          _id: 0
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    // Format monthly revenue data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueData = monthNames.map((month, index) => {
      const monthData = monthlyRevenue.find(item => item.month === index + 1);
      return {
        month,
        revenue: monthData ? monthData.revenue : 0
      };
    });

    // Get sales by category
    const salesByCategory = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          sales: { $sum: "$items.quantity" }
        }
      },
      {
        $project: {
          category: "$_id",
          sales: 1,
          _id: 0
        }
      }
    ]);

    // Get order status distribution
    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          value: 1,
          _id: 0
        }
      }
    ]);

    // Get user growth (new users per month)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      {
        $project: {
          month: "$_id",
          users: 1,
          _id: 0
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    // Format user growth data
    const userGrowthData = monthNames.map((month, index) => {
      const monthData = userGrowth.find(item => item.month === index + 1);
      return {
        month,
        users: monthData ? monthData.users : 0
      };
    });

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'fullName email');

    // Return all dashboard data
    return ResponseHandler.ok(res, {
      summary: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue
      },
      revenueData,
      salesByCategory,
      orderStatus,
      userGrowthData,
      recentOrders
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return ResponseHandler.serverError(res, error.message || "Error fetching dashboard statistics");
  }
})



module.exports = router;

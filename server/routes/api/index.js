const express = require("express");
const UserRoute = require("./user");
const AuthRoute = require("./auth");
const ProductRoute = require("./product");
const OrderRoute = require("./order");
const ReviewRoute = require("./review");








const router = express.Router();

router.use("/user", UserRoute);
router.use("/auth", AuthRoute);
router.use("/products", ProductRoute);
router.use("/orders", OrderRoute);
router.use("/reviews", ReviewRoute);







module.exports = router;

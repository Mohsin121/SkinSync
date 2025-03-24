const express = require("express");
const UserRoute = require("./user");
const AuthRoute = require("./auth");
const ProductRoute = require("./product");






const router = express.Router();

router.use("/user", UserRoute);
router.use("/auth", AuthRoute);
router.use("/admin", ProductRoute);





module.exports = router;

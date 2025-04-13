const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const { auth } = require("../../middlewares");
const {
  ResponseHandler,
} = require("../../utils");
const router = express.Router();

router.get("/context",auth.required, auth.user, (request, response) => {
  return ResponseHandler.ok(
    response,
    request.user.toAuthJSON()
  );
});


router.get("/users", async (request, response) => {

  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    console.log("users", users);
    return ResponseHandler.ok(response, users);

  } catch (error) {
    console.log("Error:", error);
    return ResponseHandler.badRequest(
      response,
      error.message || "Error fetching users"
    );
  }

});

router.get("/detail/:userId", async (request, response) => {

  try {
    const user= await User.findById(request.params.userId);
    if (!user) {
      return ResponseHandler.badRequest(response, "User not found");
    }
    return ResponseHandler.ok(response, user);
  } catch (error) {
    console.log("Error:", error);
    return ResponseHandler.badRequest(
      response,
      error.message || "Error fetching users"
    );
  }

});



router.put("/status/:userId", async (request, response) => {

  try {
    const user= await User.findById(request.params.userId);
    if (!user) {
      return ResponseHandler.badRequest(response, "User not found");
    }

    user.status = request.body.status;
    await user.save();
    
    return ResponseHandler.ok(response, user);

  } catch (error) {
    console.log("Error:", error);
    return ResponseHandler.badRequest(
      response,
      error.message || "Error fetching users"
    );
  }

});


router.put(
  "/update-profile",
  auth.required,
  auth.user,
  async (request, response) => {
    try {
      console.log("body for update", request.body);
      const { fullName, phone, skinTone } = request.body;
      const userId = request.user._id;

      // Find the user
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return ResponseHandler.badRequest(response, "User not found");
      }

      // Update user data
      user.fullName = fullName || user.fullName;  
      user.phone = phone || user.phone;
      user.skinTone = skinTone || user.skinTone;

      // Save the updated user information
      const updatedUser = await user.save();

      // Respond with the updated user data
      return ResponseHandler.ok(response, updatedUser, "Profile updated successfully!");
    } catch (err) {
      console.log("Error: ", err);
      return ResponseHandler.badRequest(response, err.message || "Error updating user profile");
    }
  }
);


router.put(
  "/update-address",
  auth.required,
  auth.user,
  async (request, response) => {
    try {
      const { street, state, city, zip, country } = request.body;
      const userId = request.user._id;

      // Find the user
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return ResponseHandler.badRequest(response, "User not found");
      }

      // Update user data
      user.street = street || user.street;  
      user.state = state || user.state;
      user.zip = zip || user.zip;
      user.city = city || user.city;
      user.country = country || user.country;


      // Save the updated user information
      const updatedAddress = await user.save();

      // Respond with the updated user data
      return ResponseHandler.ok(response, updatedAddress, "Address updated successfully!");
    } catch (err) {
      console.log("Error: ", err);
      return ResponseHandler.badRequest(response, err.message || "Error updating user address");
    }
  }
);

// Update user password
router.put(
  "/update-password",
  auth.required,
  auth.user,
  async (request, response) => {
    try {
      const { currentPassword, newPassword } = request.body;

      if (!currentPassword || !newPassword) {
        return ResponseHandler.badRequest(
          response,
          "Missing required parameters: currentPassword, newPassword"
        );
      }

      if (currentPassword.length <= 0 || newPassword.length <= 0) {
        return ResponseHandler.badRequest(
          response,
          "Passwords cannot be empty"
        );
      }

      if (currentPassword === newPassword) {
        return ResponseHandler.badRequest(
          response,
          "Old password and new password cannot be the same"
        );
      }

      const user = request.user;

      // Check if old password is valid
      if (!user.validPassword(currentPassword)) {
        return ResponseHandler.badRequest(response, "Invalid old password");
      }

      // Set new password
      user.setPassword(newPassword);
      await user.save();

      return ResponseHandler.ok(response, {
        message: "Password has been changed successfully",
      });
    } catch (error) {
      console.log("Error:", error);
      return ResponseHandler.badRequest(
        response,
        error.message || "Error changing password"
      );
    }
  }
);









module.exports = router;

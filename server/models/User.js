const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const config = require("../config");

const UserSchema = new mongoose.Schema(
  {
    // General Info
    fullName: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
    
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    authType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },


    verifyToken: { type: String, default: null },
    skinTone: { type: String, default: "BB9675" },

    verifyTokenExpires: { type: Date, default: null },

    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
   
      street: { type: String },
      city: { type: String },
      state: { type: String },

      zip: { type: String },
      country: { type: String },
    

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
    hash: { type: String, default: null },
    salt: { type: String, default: null },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "Taken" });

UserSchema.methods.validPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.setOTP = function () {
  this.otp = Math.floor(100000 + Math.random() * 9000);
  this.otpExpires = Date.now() + 3600000; // 1 hour
};

UserSchema.methods.generateJWT = function () {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.secret
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    email:this.email,
    fullName: this.fullName,
    profileImage:this.profileImage,
    otp: this.otp,
    authType: this.authType,
    otp: this.otp,
    status: this.status,
    role: this.role,
    street: this.street,
    state: this.state,
    city: this.city,
    zip: this.zip,
    country: this.country,
    token: this.generateJWT(),
    createdAt: this.createdAt,

  };
};

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    profileImage:this.profileImage,
    email: this.email,
    status: this.status,
    role: this.role,
    street: this.street,
    state: this.state,
    city: this.city,
    zip: this.zip,
    country: this.country,
    createdAt: this.createdAt,

  };
};

module.exports = mongoose.model("User", UserSchema);

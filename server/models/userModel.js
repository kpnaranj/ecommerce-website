//Public Libraries
const mongoose = require("mongoose");
// User Schema - Creation of user elements
const userSchema = new mongoose.Schema(
  {
    // Name of user - Complete name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Email of user - Complete email
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of user - Hidden to user
    password: {
      type: String,
      required: true,
    },
    // Role of user, default 0
    role: {
      type: Number,
      default: 0,
    },
    // Cart of user, empty as default
    cart: {
      type: Array,
      default: [],
    },
  },
  // Time of delivery products
  { timestamps: true }
);
// Export model
module.exports = mongoose.model("Users", userSchema);

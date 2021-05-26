const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      isRequired: true,
    },
    email: {
      type: String,
      isRequired: true,
      unique: true,
    },
    password: {
      type: String,
      isRequired: true,
    },
    isAdmin: {
      type: Boolean,
      isRequired: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

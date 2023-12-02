const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  { 
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  { 
    title: {
      type: String
    }, 
    story: {
      type: String
    }, 
    date_published: {
      type: Date
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
  }
);


const contentModel = mongoose.model("content", contentSchema);

module.exports = contentModel;
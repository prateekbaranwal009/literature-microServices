const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  { 
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    read: {
        type: Number,
        required: true,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);


const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
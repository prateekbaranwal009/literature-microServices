const mongoose = require("mongoose");

const userEventSchema = mongoose.Schema(
  { 
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    like: {
        type: Number,
    },
    read: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);


const userEventModel = mongoose.model("user_event", userEventSchema);

module.exports = userEventModel;
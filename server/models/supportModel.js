const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    reply: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const supports = model("supports", supportSchema);

module.exports = supports;

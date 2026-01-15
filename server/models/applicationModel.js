const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;

const applicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    resume: String,
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied",
    },
    aiScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const applications = model("applications", applicationSchema);

module.exports = applications;

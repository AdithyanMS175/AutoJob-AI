const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;

const jobSchema = new Schema(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
     company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const jobs = model("jobs", jobSchema);

module.exports = jobs;

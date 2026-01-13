const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;


const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  resume: String,
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected"],
    default: "applied",
  },
}, { timestamps: true });


const applications = model("jobs", applicationSchema);

module.exports = applications;


const applications = require("../models/applicationModel");
const jwt = require(`jsonwebtoken`);
const jobs = require("../models/jobModel");

exports.applyJobsController = async (req, res) => {
  const { jobId, userId, resume } = req.body;

  try {
    const existingJob = await applications.findOne({ jobId, userId });
    if (existingJob) {
      return res.status(409).json("You already applied for this job");
    } else {
      const newApplication = await applications.create({
        jobId,
        userId,
        resume,
      });
      res.status(200).json(newApplication);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.recruiterJobApplicantsController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { recruiterId } = req.body;

    const applicants = await applications
      .find({ jobId })
      .populate("jobId")
      .populate("userId"); // full user document

    // authorize recruiter using job document
    const authorizedApplicants = applicants.filter(
      app => app.jobId.recruiterId.toString() === recruiterId
    );

    res.status(200).json(authorizedApplicants);
  } catch (err) {
  console.error("recruiterJobApplicantsController error:", err);
  res.status(500).json({ message: err.message });
}
};

exports.deleteApplicationController = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { recruiterId } = req.body;

    // 1️⃣ find application
    const app = await applications.findById(applicationId);
    if (!app) {
      return res.status(404).json("Application not found");
    }

    // 2️⃣ verify recruiter owns the job
    const job = await jobs.findOne({
      _id: app.jobId,
      recruiterId,
    });

    if (!job) {
      return res.status(403).json("Unauthorized");
    }

    // 3️⃣ delete application
    await applications.findByIdAndDelete(applicationId);

    res.status(200).json("Application deleted successfully");
  } catch (err) {
    console.error("Delete application error:", err);
    res.status(500).json(err);
  }
};











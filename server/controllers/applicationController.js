const applications = require("../models/applicationModel");
const jwt = require(`jsonwebtoken`);
const jobs = require("../models/jobModel");



exports.applyJobsController = async (req, res) => {
  const { jobId, userId, resume } = req.body;

  try {
    if (!jobId || !userId) {
      return res.status(400).json("Job ID and User ID required");
    }

    
    const existingApplication = await applications.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(409).json("You already applied for this job");
    }

    
    const job = await jobs.findById(jobId).select("recruiterId");
    if (!job) {
      return res.status(404).json("Job not found");
    }

    
    const newApplication = await applications.create({
      jobId,
      userId,
      recruiterId: job.recruiterId, 
      resume: resume || "",
      status: "applied",
    });

    res.status(200).json(newApplication);

  } catch (err) {
    console.error("Apply Job Error:", err);
    res.status(500).json(err.message);
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


exports.acceptApplicationController = async (req, res) => {
  try {
    console.log("inside acceptApplicationController");

    const { applicationId } = req.params;
    const { recruiterId } = req.body;

    // find application
    const application = await applications
      .findById(applicationId)
      .populate("jobId");

    if (!application) {
      return res.status(404).json("Application not found");
    }

    // recruiter ownership check
    if (application.jobId.recruiterId.toString() !== recruiterId) {
      return res.status(403).json("Not authorized");
    }

    // update status
    application.recruiterId = recruiterId;
    application.status = "shortlisted";
    await application.save();

    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};


// candidate - get my applications
exports.getMyApplicationsController = async (req, res) => {
  console.log("Inside getMyApplicationsController");

  try {
    const { userId } = req.body;

    const myApplications = await applications
      .find({ userId })
      .populate("jobId", "jobTitle")
      .populate("recruiterId", "username");

    res.status(200).json(myApplications);
    console.log(myApplications)
  } catch (err) {
    console.error("getMyApplicationsController error:", err);
    res.status(500).json({ message: err.message });
  }
};





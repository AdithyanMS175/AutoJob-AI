const { default: mongoose } = require("mongoose");
const jobs = require("../models/jobModel");
const jwt = require(`jsonwebtoken`);
const applications = require("../models/applicationModel");

//recruiter add Jobs
exports.addJobController = async (req, res) => {
  console.log("Inside addJobController");

  const {
    jobTitle,
    description,
    skills,
    location,
    salary,
    recruiterId,
    category,
    company,
  } = req.body;
  console.log(
    jobTitle,
    description,
    skills,
    location,
    salary,
    recruiterId,
    category,
    company
  );

  try {
    const addJob = await jobs.create({
      jobTitle,
      description,
      skills,
      location,
      salary,
      recruiterId,
      category,
      company,
    });
    res.status(200).json(addJob);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//recreuiter my jobs
exports.getMyJobsController = async (req, res) => {
  console.log("Inside getMyJobsController");

  try {
    const recruiterId = req.body.recruiterId;
    console.log("RecruiterId:", recruiterId);

    const userJobs = await jobs.find({ recruiterId });
    console.log("Jobs found:", userJobs.length);

    const jobsWithCount = await Promise.all(
      userJobs.map(async (job) => {
        const count = await applications.countDocuments({
          jobId: job._id,
        });

        return {
          ...job.toObject(),
          applicantCount: count,
        };
      })
    );

    res.status(200).json(jobsWithCount);
  } catch (err) {
    console.error("❌ getMyJobsController error:", err);
    res.status(500).json({ message: err.message });
  }
};

//candidate all jobs in home
exports.userAllJobsController = async (req, res) => {
  try {
    const allJobs = await jobs.find();
    res.status(200).json(allJobs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//recruiter delete my job
exports.deleteJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { recruiterId } = req.body;

    
    const job = await jobs.findOne({ _id: jobId, recruiterId });
    if (!job) {
      return res.status(403).json("Unauthorized or job not found");
    }

    
    await applications.deleteMany({ jobId });

   
    await jobs.findByIdAndDelete(jobId);

    res.status(200).json("Job deleted successfully");
  } catch (err) {
    console.error("Delete job error:", err);
    res.status(500).json(err);
  }
};

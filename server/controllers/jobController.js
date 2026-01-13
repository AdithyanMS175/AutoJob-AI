const { default: mongoose } = require("mongoose");
const jobs = require("../models/jobModel");
const jwt = require(`jsonwebtoken`);

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
    company
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
      company
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
  // extract string id
  const recruiterId = req.body.recruiterId;

  // convert to ObjectId
  // const recruiterId = new mongoose.Types.ObjectId(recruiterIdStr);
  console.log(recruiterId);

  try {
    const userJobs = await jobs.find({ recruiterId });
    console.log(userJobs);

    res.status(200).json(userJobs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

const jobs = require("../models/jobModel");
const jwt = require(`jsonwebtoken`);

//user upload books
exports.addBookController = async (req, res) => {
  console.log("Inside addJobController");
  
  const { jobTitle, description, skills, location, salary, recruiterId,category } = req.body;
  console.log(jobTitle, description, skills, location, salary, recruiterId,category);

  try {
    const addJob = await jobs.create({ jobTitle, description, skills, location, salary, recruiterId,category});
    res.status(200).json(addJob);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

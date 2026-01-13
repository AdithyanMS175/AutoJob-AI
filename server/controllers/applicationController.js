const applications = require("../models/applicationModel") 
const jwt = require(`jsonwebtoken`);


exports.getMyJobsController = async (req, res) => {
  try {
    

    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });

    // attach application count
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await applications.countDocuments({
          jobId: job._id,
        });

        return {
          ...job._doc,
          applicationsCount: count,
        };
      })
    );

    res.status(200).json(jobsWithCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
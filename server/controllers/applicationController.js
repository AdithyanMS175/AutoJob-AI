const applications = require("../models/applicationModel");
const jwt = require(`jsonwebtoken`);
const jobs = require("../models/jobModel");
const sendMail = require("../utils/sendMail");

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
      (app) => app.jobId.recruiterId.toString() === recruiterId,
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

    // find application + candidate + job
    const application = await applications
      .findById(applicationId)
      .populate("jobId")
      .populate("userId", "email username");

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

    //  SEND EMAIL TO CANDIDATE
    await sendMail({
      to: application.userId.email,
      subject: `You’ve been shortlisted for ${application.jobId.jobTitle}`,
      html: `
    <div style="background-color: #f9f9f9; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -1px;">You're Moving Forward!</h1>
        </div>

        <div style="padding: 40px; line-height: 1.6;">
          <p style="font-size: 18px; color: #555;">Hi <strong>${application.userId.username}</strong>,</p>
          
          <p style="font-size: 16px;">We have some exciting news! Our team has reviewed your application and we are impressed with your background. We’ve officially <strong>shortlisted</strong> you for the role of:</p>
          
          <div style="background-color: #f3f4f6; border-left: 4px solid #6366f1; padding: 15px 20px; margin: 25px 0; font-size: 20px; font-weight: bold; color: #1f2937;">
            ${application.jobId.jobTitle}
          </div>

          <p style="font-size: 16px;">What's next? Our hiring team is currently coordinating schedules. You can expect a follow-up email within the next 2-3 business days to discuss the interview process.</p>
          
          <div style="text-align: center; margin-top: 35px;">
             <p style="font-size: 14px; color: #9ca3af;">No action is needed from your side right now.</p>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 600;">Best regards,</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">The Hiring Team</p>
        </div>
      </div>
    </div>
  `,
    });
    console.log(" Sending shortlisted mail to:", application.userId.email);
    console.log("ENV CHECK EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "ENV CHECK EMAIL_PASS:",
      process.env.EMAIL_PASS ? "FOUND" : "MISSING",
    );

    res.status(200).json({
      message: "Application shortlisted & email sent",
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
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
    console.log(myApplications);
  } catch (err) {
    console.error("getMyApplicationsController error:", err);
    res.status(500).json({ message: err.message });
  }
};

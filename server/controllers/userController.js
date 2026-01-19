const applications = require("../models/applicationModel");
const jobs = require("../models/jobModel");
const users = require("../models/userModel");
const jwt = require(`jsonwebtoken`);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//register
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  const { email, password, role } = req.body;
  console.log(email, password, role);
  // res.status(200).json("Request Recieved")

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(409).json("User Already Exists. Please Login!!!");
    } else {
      const newUser = await users.create({ email, password, role });
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//login
exports.loginController = async (req, res) => {
  console.log("Inside loginController");
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      if (password == existingUser.password) {
        const token = jwt.sign(
          { userMail: existingUser.email, role: existingUser.role },
          process.env.JWTSECRET,
        );
        res.status(200).json({ user: existingUser, token });
      } else {
        res.status(401).json(" Incorrect Email / Password ");
      }
    } else {
      res.status(404).json("Account Does not exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//googleLogin

exports.googleLoginController = async (req, res) => {
  console.log("Inside googleLogin");

  const { email, password, username, picture, role } = req.body;
  console.log(email, password, username, picture, role);

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        { userMail: existingUser.email, role: existingUser.role },
        process.env.JWTSECRET,
      );
      res.status(200).json({ user: existingUser, token });
    } else {
      const newUser = await users.create({
        username,
        email,
        password,
        picture,
        role,
      });

      const token = jwt.sign(
        { userMail: newUser.email, role: newUser.role },
        process.env.JWTSECRET,
      );
      res.status(200).json({ user: newUser, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//fetch user
exports.getUserController = async (req, res) => {
  try {
    // console.log("PARAM ID:", req.params.id);
    // console.log("PAYLOAD:", req.payload);
    const { id } = req.params;

    const user = await users.findById({ _id: id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const parseArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

//user Edit Profile
exports.userProfileUpdateController = async (req, res) => {
  console.log("Inside userProfilUpdateController");

  const email = req.payload;
  const { id } = req.params;

  const {
    username,
    bio,
    password,
    role,
    picture,
    linkedin,
    github,
    education,
    isVerified,
    phone,
    skills,
    experience,
  } = req.body;

  const updatePicture = req.file ? req.file.filename : picture;

  console.log(
    id,
    email,
    username,
    password,
    bio,
    role,
    updatePicture,
    linkedin,
    github,
    education,
    isVerified,
    phone,
    skills,
    experience,
  );

  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
        picture: updatePicture,
        bio,
        role,
        linkedin,
        github,
        education: parseArray(education),
        isVerified: isVerified === "true",
        phone,
        skills: parseArray(skills),
        experience: parseArray(experience),
      },
      { new: true },
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// user Upload Resume
exports.userResumeUploadController = async (req, res) => {
  console.log("Inside userResumeUploadController");

  const email = req.payload;
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json("Resume file is required");
  }

  const resume = req.file.filename;

  console.log(id, email, resume);

  try {
    const updatedUser = await users.findByIdAndUpdate(
      { _id: id },
      { $push: { resumes: resume } },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//recruiter dashboard controller
exports.recruiterDashboardController = async (req, res) => {
  try {
    const { recruiterId } = req.body;

    // 1️⃣ Recruiter jobs
    const recruiterJobs = await jobs
      .find({ recruiterId })
      .select("_id jobTitle");

    const jobIds = recruiterJobs.map((job) => job._id);

    // 2️⃣ Total applications
    const totalApplications = await applications.countDocuments({
      jobId: { $in: jobIds },
    });

    // 3️⃣ AI shortlisted (example condition)
    const shortlisted = await applications.countDocuments({
      jobId: { $in: jobIds },
      aiScore: { $gte: 80 },
    });

    // 4️⃣ Recent applications
    const recentApplications = await applications
      .find({
        jobId: { $in: jobIds },
      })
      .populate("userId", "username")
      .populate("jobId", "jobTitle")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("userId jobId aiScore createdAt");

    res.status(200).json({
      stats: {
        totalJobs: recruiterJobs.length,
        totalApplications,
        shortlisted,
      },
      recentApplications,
    });
  } catch (err) {
    console.error("Recruiter dashboard error:", err);
    res.status(500).json(err);
  }
};

// admin dashboard controller

exports.adminDashboardController = async (req, res) => {
  try {
    // 📊 Stats
    const totalJobs = await jobs.countDocuments();
    const totalUsers = await users.countDocuments();
    const aiApplications = await applications.countDocuments({
      aiScore: { $gte: 1 },
    });

    const conversionRate = totalJobs
      ? ((aiApplications / totalJobs) * 100).toFixed(1)
      : 0;

    // 📈 Application trend (last 7 days)
    const appTrend = await applications.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          applications: { $sum: 1 },
        },
      },
    ]);

    // 📈 Job trend (last 7 days)
    const jobTrend = await jobs.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          jobs: { $sum: 1 },
        },
      },
    ]);

    // 🕒 Recent activity
    const recentLogs = await applications
      .find()
      .populate("userId", "username")
      .populate("jobId", "jobTitle")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        totalJobs,
        totalUsers,
        aiApplications,
        conversionRate,
      },
      trends: {
        applications: appTrend,
        jobs: jobTrend,
      },
      recentLogs,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json(err);
  }
};

//admin all User view Controller
exports.getAllUsersController = async (req, res) => {
  try {
    const allUsers = await users.find({ role: { $ne: "admin" } });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

//admin delete user Controller
exports.deleteUserController = async (req, res) => {
  try {
    console.log("deleteUserController");
    const { id } = req.params;
    console.log(id);

    const user = await users.findById(id);
    if (!user) return res.status(404).json("User not found");

    // cleanup
    if (user.role === "recruiter") {
      const recruiterJobs = await jobs.find({ recruiterId: id });
      const jobIds = recruiterJobs.map((j) => j._id);

      await applications.deleteMany({ jobId: { $in: jobIds } });
      await jobs.deleteMany({ recruiterId: id });
    }

    if (user.role === "candidate") {
      await applications.deleteMany({ id });
    }

    await users.findByIdAndDelete(id);

    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔹 Get all jobs
exports.getAllJobsController = async (req, res) => {
  console.log("getALlJobsController");

  try {
    const allJobs = await jobs.find().populate("recruiterId", "username email");

    res.status(200).json(allJobs);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔹 Get all applications
exports.getAllApplicationsController = async (req, res) => {
  try {
    const allApplications = await applications
      .find()
      .populate("userId", "username email")
      .populate("jobId", "jobTitle recruiterId");

    res.status(200).json(allApplications);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔹 Delete job + related applications
exports.deleteAdminJobController = async (req, res) => {
  try {
    const { jobId } = req.params;

    await applications.deleteMany({ jobId });
    await jobs.findByIdAndDelete(jobId);

    res.status(200).json("Job deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔹 Delete application
exports.deleteAdminApplicationController = async (req, res) => {
  try {
    const { applicationId } = req.params;

    await applications.findByIdAndDelete(applicationId);

    res.status(200).json("Application deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

//admin dashboard report
exports.downloadDashboardReport = async (req, res) => {
  try {
    const totalUsers = await users.countDocuments();
    const totalJobs = await jobs.countDocuments();
    const totalApplications = await applications.countDocuments();
    const aiApplications = await applications.countDocuments({
      aiScore: { $ne: null },
    });

    const conversionRate = totalJobs
      ? ((totalApplications / totalJobs) * 100).toFixed(2)
      : 0;

    const recentApps = await applications
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "username email")
      .populate("jobId", "jobTitle");

    // Build CSV
    let csv = `AutoJob AI – Admin Report\n\n`;
    csv += `Total Users,${totalUsers}\n`;
    csv += `Total Jobs,${totalJobs}\n`;
    csv += `Total Applications,${totalApplications}\n`;
    csv += `AI Applications,${aiApplications}\n`;
    csv += `Conversion Rate,${conversionRate}%\n\n`;

    csv += `Recent Applications\n`;
    csv += `Candidate,Email,Job Title,Applied On\n`;

    recentApps.forEach((app) => {
      csv += `"${app.userId?.username}","${app.userId?.email}","${app.jobId?.jobTitle}","${new Date(app.createdAt).toLocaleString()}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=admin-dashboard-report.csv",
    );

    res.status(200).send(csv);
  } catch (err) {
    console.error("Report download error:", err);
    res.status(500).json("Failed to generate report");
  }
};

// USER VERIFICATION PAYMENT
exports.userVerificationPaymentController = async (req, res) => {
  console.log("Inside User Verification Payment Controller");

  const email = req.payload;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.isVerified) {
      return res.status(400).json("User already verified");
    }

    user.isVerified = true;
    await user.save();

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Recruiter Verification",
            description: "Verified recruiter account on AutoJob AI",
            metadata: {
              userId: user._id.toString(),
              email: user.email,
            },
          },
          unit_amount: 2900,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: user.email,
      success_url: `http://localhost:5173/billing/success`,
      cancel_url: `http://localhost:5173/billing/cancel`,
    });

    res.status(200).json({ checkOutURL: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  console.log("getCurrentUser function triggered");
  try {
    const userMail = req.payload;
    console.log(userMail);

    // Fetch user from MongoDB
    const user = await users.findOne({ email: userMail });

    // FIXED: Corrected spelling from 'conosle' to 'console'
    console.log("User data from DB:", user);

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (err) {
    // Adding console.error here helps you see the actual error in your terminal
    console.error("Backend Error:", err);
    res.status(500).json(err);
  }
};


exports.autoFillProfileFromResume = async (req, res) => {
  console.log("🔥 Auto-fill API HIT");

  try {
    const email = req.payload;
    console.log("Email:",email)
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json("Resume text missing");
    }

    const user = await users.findOne({ email });

    const systemPrompt = `
You are an AI resume parser.

RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- Only include fields found in resume

FORMAT:
{ "username": "",
  "education": [ { "degree": "", "institution": "", "year": "" } ],
  "experience": [ { "company": "", "role": "", "years": "", "description": "" } ],
 "skills": [] } `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nRESUME TEXT:\n"""${resumeText}"""`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("🧠 GEMINI RAW RESPONSE:\n", JSON.stringify(data, null, 2));

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json("Invalid AI response");

    const parsedProfile = JSON.parse(jsonMatch[0]);

   
    const updatedUser = await users.findOneAndUpdate(
      { email },
      {
        $set: {
          ...(parsedProfile.username && { username: parsedProfile.username }),
          ...(parsedProfile.education?.length && { education: parsedProfile.education }),
          ...(parsedProfile.experience?.length && { experience: parsedProfile.experience }),
          ...(parsedProfile.skills?.length && { skills: parsedProfile.skills }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Auto-fill error:", error);
    res.status(500).json("Auto-fill failed");
  }
};
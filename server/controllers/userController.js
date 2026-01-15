const applications = require("../models/applicationModel");
const jobs = require("../models/jobModel");
const users = require("../models/userModel");
const jwt = require(`jsonwebtoken`);

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
          process.env.JWTSECRET
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
        process.env.JWTSECRET
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
        process.env.JWTSECRET
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
    password,
    bio,
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
    experience
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
      { new: true }
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
      { new: true }
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
    const recruiterJobs = await jobs.find({ recruiterId }).select("_id jobTitle");

    const jobIds = recruiterJobs.map(job => job._id);

    // 2️⃣ Total applications
    const totalApplications = await applications.countDocuments({
      jobId: { $in: jobIds }
    });

    // 3️⃣ AI shortlisted (example condition)
    const shortlisted = await applications.countDocuments({
      jobId: { $in: jobIds },
      aiScore: { $gte: 80 }
    });

    // 4️⃣ Recent applications
    const recentApplications = await applications.find({
      jobId: { $in: jobIds }
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
        shortlisted
      },
      recentApplications
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
      aiScore: { $gte: 1 }
    });

    const conversionRate = totalJobs
      ? ((aiApplications / totalJobs) * 100).toFixed(1)
      : 0;

    // 📈 Application trend (last 7 days)
    const appTrend = await applications.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          applications: { $sum: 1 }
        }
      }
    ]);

    // 📈 Job trend (last 7 days)
    const jobTrend = await jobs.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          jobs: { $sum: 1 }
        }
      }
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
        conversionRate
      },
      trends: {
        applications: appTrend,
        jobs: jobTrend
      },
      recentLogs
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
    console.log("deleteUserController")
    const { id } = req.params;
    console.log(id);

    
    const user = await users.findById(id);
    if (!user) return res.status(404).json("User not found");

    // cleanup
    if (user.role === "recruiter") {
      const recruiterJobs = await jobs.find({ recruiterId: id });
      const jobIds = recruiterJobs.map(j => j._id);

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



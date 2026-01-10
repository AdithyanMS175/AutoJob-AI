const users = require("../models/userModel");
const jwt = require(`jsonwebtoken`);



//register
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  const { email, password, role } = req.body;
  console.log(email,password,role);
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

  const { email, password, username, picture,role } = req.body;
  console.log(email, password, username, picture,role);

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
        role
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

const parseArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

//use Edit Profile

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
    experience
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
        experience: parseArray(experience)
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

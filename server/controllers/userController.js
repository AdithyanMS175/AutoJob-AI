const users = require("../models/userModel");
const jwt = require(`jsonwebtoken`);

//register
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  const { email, password } = req.body;
  console.log(email,password);
  // res.status(200).json("Request Recieved")

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(409).json("User Already Exists. Please Login!!!");
    } else {
      const newUser = await users.create({ email, password });
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

  const { email, password, username, picture } = req.body;
  console.log(email, password, username, picture);

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



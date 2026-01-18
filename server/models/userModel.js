const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    default:"",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "+xx xxxxxxxx",
  },
  bio: {
    type: String,
    default: "employee bio",
  },
  role: {
    type: String,
    default: "user",
  },
  skills: {
    type: Array,
    default: [],
  },

  experience: [
    {
      company: String,
      role: String,
      years: String,
      description: String,
    },
  ],

  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],

  resumes: {
    type: Array,
    default: [],
  },

  linkedin: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});


const users = model("users",userSchema)

module.exports = users
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = createToken(newUser._id);
    res.status(201).json({ newUser: newUser._id, token, created: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ created: false });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    if (!user) {
      res.status(400).json({ created: false });
    }

    const token = createToken(user._id);

    res.status(200).json({ user: user._id, token, login: true });
  } catch (err) {
    res.status(400).json({ created: false });
  }
};

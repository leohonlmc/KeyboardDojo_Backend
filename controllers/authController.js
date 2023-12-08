const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
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

    res.status(200).json({ user: user._id, token, email, login: true });
  } catch (err) {
    res.status(400).json({ created: false });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: "Error getting user" });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: "Error getting user" });
  }
};

module.exports.updateLeaderBoard = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.score = req.body.score;
    await user.save();

    res.status(200).json({ update: true });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error updating score", error: err.message });
  }
};

module.exports.getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find({}).sort({ score: -1 }).limit(5);

    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error getting leaderboard" });
  }
};

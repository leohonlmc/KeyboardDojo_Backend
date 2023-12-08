const Chat = require("../models/chatModel");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

module.exports.createChat = async (req, res) => {
  try {
    const newChat = await Chat.create(req.body);
    res.status(201).json({ newChat: newChat._id, created: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ created: false });
  }
};

module.exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.find();

    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (err) {
    res.status(400).json({ message: "Error getting chat" });
  }
};

module.exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);

    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (err) {
    res.status(400).json({ message: "Error deleting chat" });
  }
};

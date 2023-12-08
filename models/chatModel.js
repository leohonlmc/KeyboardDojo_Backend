let mongoose = require("mongoose");

// Create Model of Product
let chatModel = mongoose.Schema(
  {
    id: String,
    email: String,
    chat: String,
  },
  {
    collection: "chat",
  }
);

module.exports = mongoose.model("Chat", chatModel);

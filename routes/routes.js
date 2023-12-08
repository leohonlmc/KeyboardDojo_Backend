const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const chatController = require("../controllers/chatController");

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/update/:id", authController.updateLeaderBoard);
router.get("/leaderboard", authController.getLeaderBoard);
router.get("/user/:id", authController.getUser);
router.get("/users", authController.getUsers);
router.post("/chat", chatController.createChat);
router.get("/api/chat", chatController.getChat);

module.exports = router;

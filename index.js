const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes"); // Import routes

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://keyboarddojo.onrender.com"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
    secure: true,
  })
);
app.use(express.json());

// Use the routes
app.use(routes);

module.exports = app;

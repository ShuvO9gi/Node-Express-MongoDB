const express = require("express");

const adminRouter = express.Router();

adminRouter.param("user", (req, res, next, id) => {
  req.user = id === "1" ? "Admin" : "Anonymous";
  next();
});

adminRouter.param((userId, option) => (req, res, next, val) => {
  if (val === option) {
    next();
  } else {
    res.sendStatus(403);
  }
});

adminRouter.param("userId", "10");

adminRouter.get("/param/:userId", (req, res) => {
  res.send(
    "This another use of param. It can be used for many purposes. Here, option can be an objector anything"
  );
});

adminRouter.get("/:user", (req, res) => {
  res.send(`Hello ${req.user}`);
});

adminRouter.get("/dashboard", (req, res) => {
  res.send("Welcome to dashboard.");
});

adminRouter.get("/login", (req, res) => {
  res.send("Login Page.");
});

module.exports = adminRouter;

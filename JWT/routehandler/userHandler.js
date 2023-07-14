const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

//SIGNUP
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newTodo = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    const data = await newTodo.save();
    res.status(200).json({ message: "Signup is successful!", result: data });
  } catch (err) {
    res.status(500).json({ error: "Signup failed!" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    console.log(user);
    if (user && user.length > 0) {
      const isValidPassword = bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET /* "jsonsecretaccess%" */,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          "access-token": token,
          message: "Login Successful!",
        });
      } else {
        res.status(401).json({ error: "Login Failed!" });
      }
    } else {
      res.status(401).json({ error: "Authentication Failed!" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Authentication Unknown!" });
  }
});

module.exports = router;

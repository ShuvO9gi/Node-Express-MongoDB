const express = require("express");
const mongoose = require("mongoose");
const customHandler = require("../schemas/customSchemas");
const Todo = new mongoose.model("Todo", customHandler);

const route = express.Router();

//GET all active todos
route.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({ result: data });
});

//callback doesn't work
//GET all active todos with callback
route.get("/active-callback", (req, res) => {
  const todo = new Todo();
  todo.findCallback((err, data) => {
    console.log(err);
    res.status(200).json({ result: data });
  });
});

//GET todo by static methods
route.get("/static", async (req, res) => {
  const data = await Todo.findByWord();
  res.status(200).json({ result: data });
});

//GET todo using custom query helper
route.get("/query", async (req, res) => {
  const data = await Todo.find().byLanguage("w3school");
  res.status(200).json({ result: data });
});

module.exports = route;

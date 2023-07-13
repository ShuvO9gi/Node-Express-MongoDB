const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchemas");
const Todo = new mongoose.model("Todo", todoSchema);

//Get all the todos
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({ status: "active" })
      .select({
        _id: 0,
        date: 0,
      })
      .limit(4);
    console.log(data);
    res.status(200).json({ message: "Success!", result: data });
  } catch (err) {
    res.status(500).json({ error: "There was an server side error!" });
  }
});

//Get the todo by ID
router.get("/get/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });

    res.status(200).json({ message: "Success!", result: data });
  } catch (err) {
    res.status(500).json({ error: "There was an server side error!" });
  }
});

//post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const data = await newTodo.save();
    res
      .status(200)
      .json({ message: "Todo was inserted successfully!", result: data });
  } catch (err) {
    res.status(500).json({ error: "There was an server side error!" });
  }
});

//post multiple todos
router.post("/all", (req, res) => {
  Todo.insertMany(req.body)
    .then(() =>
      res.status(200).json({ message: "Todo was inserted successfully!" })
    )
    .catch((err) =>
      res.status(500).json({ error: "There was an server side error!" })
    );
});

//put the todo
router.put("/update/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, { $set: { status: "active" } })
    .then(() => console.log("Todo was updated successfully!"))
    .catch((err) => console.log(err));
  res.end();
});

//update multiple todo
router.put("/updatemultiple", async (req, res) => {
  try {
    await Todo.updateMany(
      { status: "inactive" },
      { $set: { status: "active" } }
    );
    res.status(200).json({ message: "Todo was updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: "There was an server side error!" });
  }
});

//delete todo
router.delete("/delete/:id", async (req, res) => {
  try {
    /* const data =  */ await Todo.deleteOne({ _id: req.params.id });

    res
      .status(200)
      .json({ message: "Todo was deleted successfully!" /* , result: data */ });
  } catch (err) {
    res.status(500).json({ error: "There was an server side error!" });
  }
});

module.exports = router;

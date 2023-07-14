const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userHandler = require("./routeHandler/userHandler");
const todoHandler = require("./routeHandler/todoHandler");

//express app initialization
const app = express();
dotenv.config({ path: "../.env" }); //for more: https://www.npmjs.com/package/dotenv
app.use(express.json());

//database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connection made successfully"))
  .catch((err) => console.log(err));

//application routes
app.use("/user", userHandler);
app.use("/todo", todoHandler);

//default error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

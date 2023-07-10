const express = require("express");
const fs = require("fs");

const app = express();

//Synchronous
app.get("/synchronous", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(a);
});

//Asychronous
app.get("/asynchronous", (req, res, next) => {
  fs.readFile("/file-not-exist", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/asynchronousToSynchronous", [
  (req, res, next) => {
    fs.readFile("/file-not-exist", "utf-8", (err, data) => {
      console.log(data);
      next(err);
    });
  },
  (req, res, next) => {
    // eslint-disable-next-line no-undef
    console.log(data.property);
  },
]);

//Error Handling for Synchronous Code

//if user hit wrong url it will be catched by this
//404 error handler(express has default of this handler)
app.use((req, res, next) => {
  res.status(404).send("Request url was not found!");
  next("Request url was not found!"); //treated as error & called next middleware
});

//for any synchronous action express set a invisible
//default error handling middleware at the end of the code
//output is by default defined by Express.js
//if we want to control this middleware we can write
//a errorhandlemiddleware at the end of the code
//it takes four parameter (err, req, res, next)
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("Headers was already sent!"); //redirect to default error handler
  } else {
    if (err.message) {
      res.send(err.message); //if we don't send any status by default express will treat as 200(success)
    } else {
      res.status(500).send("There was an error");
    }
  }
});

//still there is invisible default error handler

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

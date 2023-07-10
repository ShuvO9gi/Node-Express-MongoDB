const express = require("express");

const publicRouter = express.Router();

const log = (req, res, next) => {
  console.log(`${new Date(Date.now()).toLocaleString()}-${req.method}`);
  next();
};

publicRouter.all("*", log);

publicRouter.get("/", (req, res) => {
  res.send("This is home page.");
});

publicRouter.get("/about", (req, res) => {
  res.send("This is about page.");
});

publicRouter
  .route("/route") //</(chain)?route> routing pattern, also can use RegExp pattern, use package, path-to-regexp
  .all((req, res, next) => {
    res.send("Useful for all method");
    next();
  })
  .post((req, res) => {
    res.send("This is post method");
  });

module.exports = publicRouter;

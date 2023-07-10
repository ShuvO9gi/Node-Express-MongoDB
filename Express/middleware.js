const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); //built-in middleware
app.use(cookieParser()); //cookie-parser is third-party middleware

const admin = express.Router();

const myMiddleware = (req, res, next) => {
  console.log("I am middleware 1.");
  //res.end(); //we can stop response in the middleware
  //next("This text will be treated as error");
  throw new Error("There is an error"); // this will be must catched by some error middleware handler
};

//if we want pass any parameter to the parameter
const loggerWrapper = (parameter) =>
  function (req, res, next) {
    if (parameter.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()}-${req.method}-${
          req.originalUrl
        }-${req.ip}`
      );
      next();
    } else {
      throw new Error("Failed to log.");
    }
  };
//passing parameter to the middleware
admin.use(loggerWrapper({ log: true }));

admin.get("/login-dashboard", (req, res) => {
  res.send("Welcome to dashboard.");
});

admin.use(myMiddleware);

admin.get("/dashboard", (req, res) => {
  res.send("Welcome to dashboard.");
});

app.use("/admin", admin); //Router level middleware

//this errorHandleMiddleware will prevent application from crashing
const errorHandleMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("There was a sever side error.");
  next();
};

admin.use(errorHandleMiddleware);

//simple use of multiple middleware
const myMiddleware1 = (req, res, next) => {
  console.log("I am middleware 1.");
  next();
};

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()}-${req.method}-${
      req.originalUrl
    }-${req.ip}`
  );
  next();
};

app.use(myMiddleware1); //application level middleware

app.get("/", logger, (req, res) => {
  res.send("This is also a middleware.");
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

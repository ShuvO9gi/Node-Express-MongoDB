const express = require("express");
const cookieParser = require("cookie-parser");
const { handler, handler1 } = require("./requestHandler");

const app = express();
const admin = express();

app.use(cookieParser()); //for getting the value of the cookie

admin.get("/dashboard", handler);

admin.get("/dashboard/headers", handler1);

app.use("/admin", admin);

app.get("/user/:id", (req, res) => {
  console.log(req.baseUrl); //it will be blank ""
  console.log(req.originalUrl);
  console.log(req.path);
  console.log(req.params); //{id: "3"}
  console.log(req.params.id);
  console.log(req.query); //{filter: "name"}
  console.log(req.cookies);
  res.send("This is user page.");
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

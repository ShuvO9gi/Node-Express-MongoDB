const express = require("express");
const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRouter");

const app = express();

app.use("/", publicRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

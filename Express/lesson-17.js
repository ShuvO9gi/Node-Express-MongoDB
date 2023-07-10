const express = require("express");

const app = express();
//we can use multiple route
const admin = express();

admin.get("/dashboard", (req, res) => {
  console.log(admin.path());
  res.send("This is admin dashboard.");
});

//enable or disable some specific features
app.enable("case sensitive routing");
app.disable("case sensitive routing");

//for getting userId using param middleware
app.param("id", (req, res, next, id) => {
  const user = {
    userId: id,
    name: "Shuvo",
  };
  req.userDetails = user;
  next();
});

app.get("/user/:id", (req, res) => {
  console.log(req.userDetails);
  res.send("This is home page.");
});

//
app.use("/admin", admin);

//Works for all method
app.all("/all", (req, res) => {
  res.send("This is common for all method(get, post, put...).");
});

//Uses of view engine
app.set("view engine", "ejs");

//Uses of route
app
  .route("/about/contact")
  .get((req, res) => {
    //res.render("index");
    res.render("pages/about"); //output to the browser //views folder is default path
  })
  .post((req, res) => {
    res.send("This is common route method for post.");
  })
  .put((req, res) => {
    res.send("This is common route method for put.");
  });

//server listener
app.listen(3000, () => console.log("Connected to port 3000"));

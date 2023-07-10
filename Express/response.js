const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  console.log(res.headersSent); //to know whether headers is sent or not
  res.render("pages/about", {
    name: "Express.js",
  });
  res.json({
    name: "Express.js",
  });
});

app.get("/format", (req, res) => {
  res.format({
    "text/plain": () => {
      res.send("Hi"); //response finished with data
    },
    "text/html": () => {
      res.render("/pages/about", {
        name: "Express.js",
      });
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  });
});

app.get("/cookie", (req, res) => {
  res
    .cookie("name", "Express.JS", {
      expires: new Date(Date.now() + 0.5 * 3600000), // cookie will be removed after 1/2 hours
    })
    .location("/about")
    .redirect("/about");
});

app.get("/status", (req, res) => {
  res.status(200); //response will not be finished //100(Information),200(Success),300(Redirect),400(Client Error),500(Server Error)
  //res.sendStatus(500); //response will be finished
  res.end(); //response finished without data
});

app.get("/location", (req, res) => {
  res.location("/cookie");
  res.end();
});

app.get("/redirect", (req, res) => {
  res.redirect("/status");
});

app.get("/get-set", (req, res) => {
  res.set({ Platform: "Express.JS", Accept: "text/plain" });
  console.log(res.get("Platform"));
  res.end();
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

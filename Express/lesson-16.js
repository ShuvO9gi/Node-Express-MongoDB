const express = require("express");
const app = express();

//app.use(express.json());  //Content-Type: "application/json"
//app.use(express.raw());   //Content-Type: "application/octet-stream"
//app.use(express.text());  //Content-Type: "text/plain"
/* 
// accessing any static file
  app.use(
  express.static(`${__dirname}/public/`, {
    index: "home.html",
  })
); */
const router = express.Router({ caseSensitive: true });

app.use(router);

router.get("/about", (req, res) => {
  res.send("This is home page with router path.");
});

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  res.send("This is home page with post request.");
});

app.listen(3000, () => console.log("Connected to port 3000"));

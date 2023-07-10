const handler = (req, res) => {
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.path);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.protocol);
  console.log(req.app.get("view engine")); //through this we can access the app object without exporting i.e. req has app object
  res.send("Welcome to dashboard page.");
};

const handler1 = (req, res) => {
  if (req.accepts("json")) {
    res.send("It accepts JSON");
  } else {
    res.send("It accepts others format");
  }
  console.log(req.get("Content-Type")); //used to know the headers information
};

module.exports = { handler, handler1 };

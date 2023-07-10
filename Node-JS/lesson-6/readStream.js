//Read stream
const http = require("http");

// req is readable stream & res is the writable stream
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html><head><title>Form</title></head>");
    res.write(
      '<body><form method="post" action="/action-page"><input name="message" /></form></body></html>'
    );
    res.end();
  } else if (req.url === "/action-page" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //console.log(chunk.toString());
      body.push(chunk); //add every chunk to the blank array
    });
    //this "end" event will define that stream is finished
    req.on("end", () => {
      console.log("Stream Finished!");
      const parsedBody = Buffer.concat(body).toString(); //we concat the every buffer from Buffer object
      console.log(parsedBody);
      res.write("Connection made successfully!");
      res.end();
    });
    /* res.write("Connection made successfully!");
        res.end(); */
  } else {
    res.write("Not Found.");
    res.end();
  }
});

server.listen(3000);

console.log("Connected to port 3000");

/* //Read stream basic knowledge
const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
//const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, "utf-8");

//event listener
ourReadStream.on("data", (chunk) => {
    console.log(chunk); //return an buffer(binary data)
    //console.log(chunk.toString()); // return an redable output
});
//ourReadStream.on("data", (data) => {console.log(data);});

console.log("Hello, This is last line"); */

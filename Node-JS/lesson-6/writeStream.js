const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const ourReadStream = fs.createReadStream(__dirname + "/bigdata.txt", "utf8");
    ourReadStream.pipe(res);
});

server.listen(3000);

console.log("Connected to port 3000");





/* //Read stream(basic knowledge)
const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`)

//event listener
ourReadStream.on("data", (chunk) => {
    ourWriteStream.write(chunk);
});


console.log("Hello, This is last line"); */
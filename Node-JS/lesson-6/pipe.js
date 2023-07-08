const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/outputPipe.txt`)

ourReadStream.pipe(ourWriteStream);


console.log("Hello, This is last line");
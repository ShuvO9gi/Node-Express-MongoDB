//File System to create,read & write a file
    //const fs = require("fs");

//creating a new file synchronously but it blocks the node.js thread
    /* //fs.writeFileSync("myFile.txt", "Hello, This is my new file.")
    //fs.appendFileSync("myFile.txt", "Adding a new line to the existing file.")
    const output = fs.readFileSync("myFile.txt");
    console.log(output);    // it will return a buffer which is the binary code of the text which were saved in the file
    console.log(output.toString()); //return text outpu */

//creating a new file asynchronously with non blocking I/O system 
    fs.readFile("myFile.txt", (err, data) => {
        console.log(data.toString());
    });
    console.log("Hello, This is second line!");   //this will be printed first
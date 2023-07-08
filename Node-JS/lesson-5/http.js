//for creating node.js server within the application
const http = require("http");

//const server = http.createServer(); //it will create a new server
//here, server is just like an EventEmitter, it has emit, on others event

//server.on("connection", () => {console.log('Connection made succesfully!')});

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.write("Hello, Programmers!");
        res.write("This is home page.");
        res.end();
    } else if(req.url === "/about") {
        res.write("This is about page.");
        res.end();
    } else {
        res.write("Not found.");
        res.end();
    }
})


server.listen(3000); //we can put any number but 3000 is convention and also we can create many server

console.log("Listenning the 3000 port!"); //if we write node http.js it will run the server. For stopping, use ctrl+c
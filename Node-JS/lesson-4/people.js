//(function(exports={},require,module,__dirname,__filename) {


const people = ["sakib", "Learn"];

var a = 6;
function test() {
    console.log("Test");
}

//console.log(module);

//module.exports = people;
module.exports = {
    people2: people,
    a,
    test2:test
}

//retrun module.exports;
//}) ();

//Immediately Invoked Function Expression (IIFE) function
/* 
*  Title: Basic Node Example
*  Description: Simple application that prints random quote after some setInterval
*  Author: Shuvo
*  Date: 07/07/2023 
*/

//Dependencies
const mathLibrary = require("./lib/math");
const quoteLibrary = require("./lib/quotes");

//App object - Module scaffolding
const app = {};

//Configuration
app.config = {
    timesBetweeenQuotes: 1000,
};

//Function that prints random quotes
app.printQuotes = function printQuotes() {
    //Get all the quotes
    const allQuotes = quoteLibrary.getQuotes();

    //Get the length of the quotes
    const numberOfQuotes = allQuotes.length;

    //Pick a random number between 1 and numberOfQuotes
    const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

    //Get the quotes in from an array
    const distractQuotes = allQuotes[randomNumber -1];

    //Print the quotes in the console
    console.log(distractQuotes);
}

//Function that indifinitely calls the quotes
app.inidifiniteLoop = function inidifiniteLoop() {
    setInterval(app.printQuotes, app.config.timesBetweeenQuotes);
}

//Invoke the inidifinteLopp
app.inidifiniteLoop();
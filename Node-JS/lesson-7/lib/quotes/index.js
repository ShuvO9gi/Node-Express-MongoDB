/*
 * Title: Quotes Library
 * Description: Utility library for getting a list of quotes
 * Author: Shuvo
 * Date: 07/07/2023
 */

//Dependencies
const fs = require("fs");

//Quote object - Module scaffolding
const quote = {};

//Read the quote file and return a list of quotes to the user
quote.getQuotes = function getQuotes() {
  const readQuote = fs.readFileSync(`${__dirname}/quotes.txt`, "utf8");
  const listOfQuotes = readQuote.split(/\r?\n/); //we also use /\n/
  return listOfQuotes;
};

//Export the library
module.exports = quote;

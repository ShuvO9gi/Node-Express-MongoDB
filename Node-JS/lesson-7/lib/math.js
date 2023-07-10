/*
 * Title: Math library
 * Description: Utility library for math related functions
 * Author: Shuvo
 * Date: 07/07/2023
 */

//Math object - Module scaffolding
const math = {};

//Get a random integers between two integers
math.getRandomNumber = function getRandomNumber(min, max) {
  let minimum = min;
  let maximum = max;
  minimum = typeof minimum === "number" ? minimum : 0;
  maximum = typeof maximum === "number" ? maximum : 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Exports the library
module.exports = math;

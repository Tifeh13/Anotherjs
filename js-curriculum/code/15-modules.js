// ============================================================
// JAVASCRIPT MODULES (IMPORT/EXPORT, MODULE PATTERNS)
// - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Modules need the .mjs extension OR a package.json with
// "type": "module". The easiest way:
//
//   rename/copy this file to 15-modules.mjs, then run:
//   node 15-modules.mjs
//
// (Or run:  node --experimental-default-type=module 15-modules.js)
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHY MODULES? (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine writing your WHOLE school's rules on ONE sheet of
// paper. Finding anything would be a nightmare!
//
// Modules let us SPLIT code into files - like subjects in
// separate exercise books - and SHARE exactly what we choose.
//
// One file exports its tools; another file imports them.
//
// Note: this file imports from mathUtils.js (in this folder).


// ------------------------------------------------------------
// PART 2: NAMED EXPORTS - SHARING BY NAME
// ------------------------------------------------------------
//
// In mathUtils.js we wrote:
//
//   export function add(a, b) { return a + b; }
//   export const PI = 3.14159;
//
// The word "export" makes them available to other files.
//
// UNCOMMENT BELOW AND RUN IT:

// import { add, multiply, PI } from "./mathUtils.js";
//
// console.log(add(2, 3));        // 5
// console.log(multiply(4, 5));   // 20
// console.log(PI);               // 3.14159


// ------------------------------------------------------------
// PART 3: RENAMING WITH "as" - IMPORTING WITH A NICKNAME
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// import { add as sum, multiply as times } from "./mathUtils.js";
//
// console.log(sum(10, 5));     // 15
// console.log(times(3, 4));    // 12


// ------------------------------------------------------------
// PART 4: IMPORT EVERYTHING AS A NAMESPACE
// ------------------------------------------------------------
//
// The * gathers ALL named exports into ONE object.
//
// UNCOMMENT BELOW AND RUN IT:

// import * as maths from "./mathUtils.js";
//
// console.log(maths.add(1, 2));      // 3
// console.log(maths.PI);             // 3.14159
// console.log(maths.subtract(9, 4)); // 5


// ------------------------------------------------------------
// PART 5: DEFAULT EXPORTS - THE MAIN DISH
// ------------------------------------------------------------
//
// mathUtils.js also has ONE default export. Import it with
// ANY name you like - no curly braces.
//
// UNCOMMENT BELOW AND RUN IT:

// import whateverName from "./mathUtils.js";
//
// console.log(whateverName());   // I am mathUtils - I do maths for you!
//
// // Mix both in one line:
// import describeModule, { add } from "./mathUtils.js";
// console.log(describeModule(), add(100, 200));


// ------------------------------------------------------------
// PART 6: EXPORTING FROM YOUR OWN FILE
// ------------------------------------------------------------
//
// Every JS file can be a module. Write a function, stick
// "export" in front, done.
//
// UNCOMMENT BELOW AND RUN IT (after adding the export below):

// function greet(name) {
//   return `Hello, ${name}!`;
// }
//
// export { greet };
//
// // Another file could now do:
// // import { greet } from "./15-modules.js";
// // greet("Ada");
//
// console.log("This file exported greet() successfully!");


// ------------------------------------------------------------
// PART 7: MODULE PATTERNS - KEEPING THINGS PRIVATE
// ------------------------------------------------------------
//
// Whatever you do NOT export stays PRIVATE to the file -
// invisible from outside. That is the core module pattern:
// a public surface over a private engine.
//
// UNCOMMENT BELOW AND RUN IT:

// let secretPassword = "abc123";        // NOT exported - hidden!
//
// function checkPassword(guess) {       // the public door
//   return guess === secretPassword;
// }
//
// export { checkPassword };
//
// console.log(checkPassword("abc123")); // true - via the public door
//
// // From another file, secretPassword is UNREACHABLE.
// // Only checkPassword's answer escapes.


// ------------------------------------------------------------
// PART 8: OLD-SCHOOL CONTEXT (what you may see in the wild)
// ------------------------------------------------------------
//
// Before ES modules, Node used CommonJS:
//
//   // exporting (old style)
//   module.exports = { add, multiply };
//
//   // importing (old style)
//   const { add } = require("./mathUtils");
//
// Modern code prefers import/export, but you WILL meet
// require() in older tutorials and codebases.


// ------------------------------------------------------------
// PART 9: REAL EXAMPLE - BUILD A TINY CALCULATOR MODULE
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// import { add, multiply, subtract } from "./mathUtils.js";
//
// function calculate(a, operator, b) {
//   switch (operator) {
//     case "+": return add(a, b);
//     case "-": return subtract(a, b);
//     case "*": return multiply(a, b);
//     default:  return "Unknown operator";
//   }
// }
//
// console.log(calculate(6, "+", 4));   // 10
// console.log(calculate(6, "-", 4));   // 2
// console.log(calculate(6, "*", 4));   // 24


// ------------------------------------------------------------
// PART 10: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Add a "divide" function to mathUtils.js (named export),
//    import it here, and print divide(20, 4).
// 2. Import mathUtils.js with * as maths and use three of its
//    tools.
// 3. Create your own file "greetings.js" exporting a default
//    function, and import it under a custom name.
// 4. Keep a variable private in greetings.js and expose only
//    a function that uses it.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. Modules = splitting code into files with controlled
//    sharing.
// 2. export shares; import collects. Named: { add }.
// 3. Rename with "as", grab everything with * as name.
// 4. One default export per file, imported without braces.
// 5. Unexported code stays private - the core module pattern.
// 6. Old code uses require()/module.exports (CommonJS).
// ============================================================

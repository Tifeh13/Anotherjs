// ============================================================
// FUNCTIONS - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 03-functions.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHAT IS A FUNCTION? (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine a JUICE BLENDER. You put fruit in (ingredients),
// press the button, and get juice out. You do not rebuild the
// blender every time - you just REUSE it.
//
// A function is a NAMED BLOCK OF CODE that you can run
// (call) whenever you want, as many times as you want.
// It takes INPUTS (parameters) and may give an OUTPUT (return).


// ------------------------------------------------------------
// PART 2: FUNCTION DECLARATION (the classic way)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// function greet() {
//   console.log("Hello there seun and barakat");
// }

// greet();   // calling it makes it RUN - defining it alone does nothing
// greet();   // same blender, used twice


// ------------------------------------------------------------
// PART 3: PARAMETERS - GIVING THE FUNCTION INPUTS
// ------------------------------------------------------------
//
// A parameter is a named slot waiting for a value. An argument
// is the ACTUAL value you pass when calling.
//
// UNCOMMENT BELOW AND RUN IT:

// function greetStudent(name) {
//   console.log("Hello, " + name + "!");
// }

// // greetStudent("Ada");     // "Ada" is the argument
// // greetStudent("Chinedu");

// greetStudent();
// greetStudent ('Seun')
// greetStudent ('Barakat')

// greetStudent ('Maudee')
// greetStudent ('Kwasu')

// ------------------------------------------------------------
// PART 4: RETURN - GETTING A VALUE BACK OUT
// ------------------------------------------------------------
//
// console.log only SHOWS something. return HANDS the result
// back to whoever called the function, so they can store it
// and use it later.

// UNCOMMENT BELOW AND RUN IT:

// function add(a, b) {
//   return a + b;
// }

// let total = add(5, 3);      // total now holds 8
// console.log(total);
// console.log(add(10, 20));   // 30 - returned value used directly


// ------------------------------------------------------------
// PART 5: FUNCTION EXPRESSION (a function stored in a variable)
// ------------------------------------------------------------
//
// Functions are VALUES in JS - you can store them in variables
// like any other value.
//
// UNCOMMENT BELOW AND RUN IT:

// const double = function (number) {
//   return number * 2;
// };

// console.log(double(4));    // 8
// console.log(double(21));   // 42


// ------------------------------------------------------------
// PART 6: ARROW FUNCTIONS (the short modern way)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// const triple = (number) => {
//   return number * 3;
// };

// console.log(triple(5));    // 15

// // Short version: ONE parameter -> no brackets needed,
// // ONE expression -> no "return" keyword needed.
// const square = n => n * n;

// console.log(square(6));    // 36


// ------------------------------------------------------------
// PART 7: THE THREE WAYS SIDE BY SIDE
// ------------------------------------------------------------
//
// Same job, three shapes. All are called the same way.
//
// UNCOMMENT BELOW AND RUN IT:

// function halfDeclaration(n) { return n / 2; }
// const halfExpression = function (n) { return n / 2; };
// const halfArrow = (n) => n / 2;

// console.log(halfDeclaration(10));   // 5
// console.log(halfExpression(10));    // 5
// console.log(halfArrow(10));         // 5


// ------------------------------------------------------------
// PART 8: DEFAULT PARAMETERS (a spare tyre)
// ------------------------------------------------------------
//
// If the caller forgets an argument, the default steps in.
//
// UNCOMMENT BELOW AND RUN IT:

// function welcome(name = "student") {
//   console.log("Welcome, " + name + "!");
// }

// welcome();           // Welcome, student!
// welcome("Bola");     // Welcome, Bola!


// ------------------------------------------------------------
// PART 9: REAL EXAMPLE - GRADING FUNCTION
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

function getGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "F";
}

console.log(getGrade(85));   // A
console.log(getGrade(55));   // C
console.log(getGrade(30));   // F
console.log(getGrade(66));   // B
console.log(getGrade(49.5));   // B


// ------------------------------------------------------------
// PART 10: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Write a function "isEven" that takes a number and returns
//    true if it is even, false if odd (hint: % operator).
// 2. Convert your "isEven" declaration into an arrow function
//    stored in a const.
// 3. Write a function "introduce(name, age)" that RETURNS the
//    sentence "My name is X and I am Y years old."
// 4. Give "introduce" a default age of 18.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. A function is a reusable named block of code - a blender:
//    inputs go in, a result comes out.
// 2. Declare with: function name() {...} - then CALL it with
//    name() to run it.
// 3. Parameters are input slots; arguments are the real values.
// 4. return hands a value back; console.log only displays.
// 5. Three ways: declaration, expression (in a variable),
//    arrow function (short modern form).
// 6. Default parameters fill in when an argument is missing.
// ============================================================

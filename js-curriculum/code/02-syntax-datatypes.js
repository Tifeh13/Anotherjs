// ============================================================
// BASIC SYNTAX: VARIABLES, OPERATORS, DATA TYPES - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 02-syntax-datatypes.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: VARIABLES - BOXES THAT STORE VALUES
// ------------------------------------------------------------
//
// Imagine labelled boxes in a storeroom. Each box has a NAME
// (the label) and holds a THING (the value). You can look
// inside, and with "let" you can even SWAP what is inside.
//
// UNCOMMENT BELOW AND RUN IT:

// let studentName = "Ada";
// let age = 20;

// console.log(studentName);
// console.log(age);


// ------------------------------------------------------------
// PART 2: let vs const (and why var is old news)
// ------------------------------------------------------------
//
// "let"  = a box whose contents CAN be replaced later.
// "const" = a box that is SEALED - once filled, never changed.
// "var"  = the old way from 1995. It works, but modern JS
//          almost always uses let and const.
//
// UNCOMMENT BELOW AND RUN IT:

// let score = 10;
// score = 15;              // allowed - let can change
// console.log(score);      // 15

// const birthYear = 2006;
// // birthYear = 2007;      // uncommenting this line CRASHES:
// // TypeError: Assignment to constant variable.
// console.log(birthYear);


// ------------------------------------------------------------
// PART 3: DATA TYPE - STRINGS (text)
// ------------------------------------------------------------
//
// A string is TEXT wrapped in quotes, like words on a name tag.
//
// UNCOMMENT BELOW AND RUN IT:

// let greeting = "Hello, world!";
// let city = 'Lagos';

// console.log(greeting);
// console.log(city);
// console.log(typeof greeting);   // string


// ------------------------------------------------------------
// PART 4: DATA TYPE - NUMBERS
// ------------------------------------------------------------
//
// JS has ONE number type for whole numbers and decimals.
//
// UNCOMMENT BELOW AND RUN IT:

// let wholeNumber = 42;
// let price = 'Hello World!';
// let negative = -7;

// console.log(wholeNumber, price, negative);
// console.log(typeof negative);   // number
// console.log(typeof price);
// console.log(price);




// ------------------------------------------------------------
// PART 5: DATA TYPE - BOOLEANS (true / false)
// ------------------------------------------------------------
//
// A boolean is a LIGHT SWITCH: it is either ON (true) or
// OFF (false). Great for yes/no questions.

// UNCOMMENT BELOW AND RUN IT:

// let isRaining = false;
// let hasTicket = true;
// let Name = 'Ada!';
// let age = 20;

// // console.log(isRaining, Name, age);
// // console.log(hasTicket);
// console.log(typeof hasTicket);   // boolean
// console.log(typeof Name);
// console.log(typeof age);




// ------------------------------------------------------------
// PART 6: DATA TYPE - ARRAYS (ordered lists)
// ------------------------------------------------------------
//
// An array is an EGG TRAY: several values in one container,
// each in its own numbered slot. Slots start counting at 0!
//
// UNCOMMENT BELOW AND RUN IT:

// let fruits = ["mango", "banana", "orange", 20, true];
// //
// console.log(fruits);         // the whole tray
// console.log(fruits[1]);      // "mango"  - first slot is 0!
// console.log(fruits[2]);      // "orange" - third slot
// console.log(fruits.length);  // 3 - how many items
// console.log(typeof fruits);  // object (arrays are objects)


// ------------------------------------------------------------
// PART 7: DATA TYPE - OBJECTS (labelled properties)
// ------------------------------------------------------------
//
// An object is an ID CARD: one thing with many labelled
// details attached (name, age, department...).
//
// UNCOMMENT BELOW AND RUN IT:

let student = {
  name: "Ada",
  age: 20,
  isEnrolled: true
};

//
// console.log(student);
console.log(student.name);    // "Ada"   - dot notation
console.log(student["age"]);  // 20      - bracket notation
// console.log(typeof student);  // object
console.log(student['age']);



// ------------------------------------------------------------
// PART 8: OPERATORS - DOING MATHS
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// console.log(10 + 3);    // 13   addition
// console.log(10 - 3);    // 7    subtraction
// console.log(10 * 3);    // 30   multiplication
// console.log(10 / 3);    // 3.33 division
// console.log(10 % 3);    // 1    remainder (what is left over)
// console.log(2 ** 3);    // 8    power (2 to the power of 3)


// ------------------------------------------------------------
// PART 9: OPERATORS - COMPARING VALUES
// ------------------------------------------------------------
//
// Comparisons ask a yes/no question and answer with a boolean.
//
// UNCOMMENT BELOW AND RUN IT:

// console.log(5 > 3);        // true
// console.log(5 < 3);        // false
// console.log(5 === 5);      // true  - strictly equal
// console.log(5 !== 4);      // true  - not equal
// console.log(5 === "5");    


// ------------------------------------------------------------
// PART 10: OPERATORS - JOINING STRINGS AND LOGIC
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// let firstName = "Ada";
// let lastName = "Obi";
// console.log(firstName + " " + lastName);   // Ada Obi
//
// // && means AND: BOTH sides must be true
// console.log(true && false);    // false
// // || means OR: at least ONE side must be true
// console.log(true || false);    // true
// // ! means NOT: flips the value
// console.log(!true);            // false


// ------------------------------------------------------------
// PART 11: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Create a const called "country" with your country's name
//    and a let called "population" with any number.
// 2. Make an array of 4 subjects and print the LAST one
//    (careful with the numbering!).
// 3. Make an object called "car" with brand, year and
//    isElectric properties, then print the brand.
// 4. What is 17 % 5? Guess first, then print it.
// 5. Check with === whether 10 and "10" are equal, and explain
//    the result in a comment.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. let = changeable box, const = sealed box, var = old way.
// 2. Strings = text in quotes, numbers = 42 or 19.99,
//    booleans = true/false, arrays = ordered lists (start at 0),
//    objects = labelled properties.
// 3. typeof tells you what type a value is.
// 4. Math operators: + - * / % **
// 5. Compare with === and !== (strict is safest).
// 6. && = AND, || = OR, ! = NOT.
// ============================================================

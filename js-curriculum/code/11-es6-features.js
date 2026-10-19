// ============================================================
// ES6 FEATURES (TEMPLATE LITERALS, DESTRUCTURING, DEFAULT
// PARAMETERS, SPREAD & REST) - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 11-es6-features.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHAT IS ES6? (in the simplest way possible)
// ------------------------------------------------------------
//
// JavaScript was born in 1995 with some awkward habits.
// In 2015 the language got a huge upgrade called ES6
// (ECMAScript 2015). Think of it as a PHONE SOFTWARE UPDATE:
// same phone, but new buttons that make everything easier.
//
// The features in this lesson are the ones you will use
// EVERY DAY as a modern JS developer.


// ------------------------------------------------------------
// PART 2: TEMPLATE LITERALS - STRINGS WITH SUPERPOWERS
// ------------------------------------------------------------
//
// Old way: gluing strings together with + and remembering
// where the spaces go. Painful!
//
// UNCOMMENT BELOW AND RUN IT:

// let name = "Ada";
// let age = 20;

// console.log("My name is " + name + " and I am " + age + " years old.");

// // New way: backticks (`) + ${} placeholders
// console.log(`My name is ${name} and I am ${age} years old.`);

// // The ${} can hold any EXPRESSION:
// console.log(`Next year I will be ${age + 1}.`);
// //
// // // Backticks also keep LINE BREAKS as you type them:
// let menu = `
// 1. Rice 2. Beans
// 3. Yam`;
// console.log(menu);


// ------------------------------------------------------------
// PART 3: OBJECT DESTRUCTURING - UNPACK THE SUITCASE
// ------------------------------------------------------------
//
// An object is like a suitcase with labelled items inside.
// Destructuring pulls items OUT and gives them names in one
// line, instead of one line per property.
//
// UNCOMMENT BELOW AND RUN IT:

// let student = { name: "Chinedu", age: 22, course: "Computer Science" };
// //
// // // Old way:
// // let name = student.name;
// // let age = student.age;

// // ES6 way - the names must MATCH the property names:
// let { name, age, course } = student;

// console.log(name);     // Chinedu
// // console.log(age);      // 22
// // console.log(course);   // Computer Science

// // You can rename while unpacking:
// let { name: fullName } = student;
// console.log(student); // Chinedu


// ------------------------------------------------------------
// PART 4: ARRAY DESTRUCTURING - PULL BY POSITION
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// let colours = ["red", "green", "blue"];

// let [first, second, third] = colours;

// console.log(first);    // red
// console.log(second);   // green
// console.log(third);    // blue

// // Skip positions with a hole:
// let [, , onlyBlue] = colours;
// console.log(onlyBlue); // blue


// ------------------------------------------------------------
// PART 5: DEFAULT PARAMETERS (a spare tyre)
// ------------------------------------------------------------
//
// If the caller forgets an argument, the default steps in.
// No more "undefined" surprises.
//
// UNCOMMENT BELOW AND RUN IT:

// function orderDrink(drink = "water", size = "medium") {
//   console.log(`One ${size} ${drink}, please!`);
// }

// orderDrink();                       // One medium water, please!
// orderDrink("zobo");                 // One medium zobo, please!
// orderDrink("smoothie", "large");    // One large smoothie, please!


// ------------------------------------------------------------
// PART 6: SPREAD OPERATOR (...) - SPREAD THE CONTENTS OUT
// ------------------------------------------------------------
//
// The three dots "spread" an array's items OUT of their
// container. Great for copying and combining arrays.
//
// UNCOMMENT BELOW AND RUN IT:

// let fruits = ["mango", "banana"];
// let moreFruits = ["orange", ...fruits];   // orange, mango, banana

// // console.log(moreFruits);

// // Copy an array (changes to the copy do NOT affect the original):
// let copy = [...fruits];
// copy.push("cherry");
// copy.pop('')
// copy.pop('')

// console.log(fruits);   // mango, banana (untouched!)
// console.log(copy);     // mango, banana, cherry
//
// // Combining:
// let maths = [1, 2, 3];
// let english = [4, 5, 6];
// let allSubjects = [...maths, ...english];
// console.log(allSubjects);   // 1,2,3,4,5,6
// allSubjects.pop()
// console.log(allSubjects);   // 1,2,3,4,5
// allSubjects.push(7)
// console.log(allSubjects);   // 1,2,3,4,5,7


// ------------------------------------------------------------
// PART 7: REST OPERATOR (...) - GATHER EVERYTHING IN
// ------------------------------------------------------------
//
// The SAME three dots, the OPPOSITE job: in a parameter list,
// rest GATHERS all remaining arguments into one array.
//
// UNCOMMENT BELOW AND RUN IT:

// function countEverything(first, ...theRest) {
//   console.log("First:", first);
//   console.log("The rest:", theRest);
// }

// countEverything("a", "b", "c", "d");
// // First: a
// // The rest: [ 'b', 'c', 'd' ]

// // Superpower: functions that accept ANY number of arguments:
// function sum(...numbers) {
//   return numbers.reduce((total, n) => total + n, 0);
// }

// console.log(sum(1, 2));          // 3
// console.log(sum(1, 2, 3, 4, 5)); // 15


// ------------------------------------------------------------
// PART 8: SPREAD VS REST - SAME DOTS, DIFFERENT JOBS
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// // Spread = unpacking a box (sending items OUT)
// let box = [1, 2, 3];
// let barakat = [4, 5, 6, ...box]
// console.log(barakat);          // 1 2 3
// //
// // // Rest = packing a box (collecting items IN)
// function pack(...items) {
//   console.log(items);         // [1, 2, 3]
// }
// pack(1, 2, 3);


// ------------------------------------------------------------
// PART 9: REAL EXAMPLE - CLEAN USER PROFILE FUNCTION
// ------------------------------------------------------------
//
// Combines destructuring + defaults + template literals.
//
// UNCOMMENT BELOW AND RUN IT:

function printProfile({ name, role = "student", scores = [] }) {
  let total = scores.reduce((sum, s) => sum + s, 0);
  console.log(`${name} (${role}) - total score: ${total}`);
}

printProfile({ name: "Ada", scores: [70, 80, 90] });
printProfile({ name: "Bola" });
printProfile({ name: "Charlie", role: "instructor", scores: [85, 95] });

//
// // One parameter, unpacked into named values with defaults.


// ------------------------------------------------------------
// PART 10: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Use a template literal to print "I live in CITY and I
//    love LANG" using two variables.
// 2. Destructure { title, author } from a book object and
//    print a sentence with them.
// 3. Write "average(...numbers)" using the rest operator that
//    returns the average of any amount of scores.
// 4. Merge two arrays of your friends using spread, and make
//    a copy of the merged array.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. ES6 = the big 2015 modernisation of JavaScript.
// 2. Template literals: backticks + ${expression} - cleaner
//    strings, multi-line for free.
// 3. Destructuring: unpack objects by NAME { a, b }, arrays by
//    POSITION [x, y].
// 4. Default parameters fill in for missing arguments.
// 5. Spread (...) unpacks arrays; rest (...) gathers
//    arguments into an array. Same dots, opposite jobs.
// ============================================================

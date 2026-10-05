// ============================================================
// ASYNC/AWAIT (USAGE, ERROR HANDLING, FETCH) - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 13-async-await.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: THE PROBLEM WITH LONG .then() CHAINS
// ------------------------------------------------------------
//
// Chained .then()s work, but deep chains get hard to read -
// like reading a story written as one endless sentence.
//
// async/await is SUGAR COATING: same promises underneath,
// but the code READS top-to-bottom like normal steps.
//
// Two magic words:
//   async  - marks a function as promise-friendly
//   await  - "pause here until the promise settles"


// ------------------------------------------------------------
// PART 2: async FUNCTIONS ALWAYS RETURN A PROMISE
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// async function sayHello() {
//   return "Hello from an async function";
// }
//
// console.log(sayHello());          // Promise { ... } - it IS a promise!
//
// sayHello().then(function (message) {
//   console.log(message);           // Hello from an async function
// });


// ------------------------------------------------------------
// PART 3: await - WAITING (WITHOUT FREEZING)
// ------------------------------------------------------------
//
// await pauses ONLY that async function, not the whole
// program. The program outside keeps running.
//
// UNCOMMENT BELOW AND RUN IT:

// function waitTwoSeconds() {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve("Finally done waiting!");
//     }, 2000);
//   });
// }
//
// async function run() {
//   console.log("Waiting...");
//   let message = await waitTwoSeconds();   // pause HERE
//   console.log(message);                    // runs 2s later
// }
//
// run();
//
// console.log("(The program kept running - proof await is not freezing!)");
//
// // Node keeps the process alive until pending promises finish.


// ------------------------------------------------------------
// PART 4: REWRITING A .then() CHAIN WITH AWAIT
// ------------------------------------------------------------
//
// Same steps as promise chaining, but flat and readable.
//
// UNCOMMENT BELOW AND RUN IT:

// function step1() {
//   return Promise.resolve("Step 1 done");
// }
// function step2(previous) {
//   return previous + " -> Step 2 done";
// }
// function step3(previous) {
//   return previous + " -> Step 3 done";
// }
//
// async function runSteps() {
//   let first  = await step1();
//   let second = await step2(first);
//   let third  = await step3(second);
//   console.log(third);
// }
//
// runSteps();


// ------------------------------------------------------------
// PART 5: ERROR HANDLING - try/catch COMES BACK
// ------------------------------------------------------------
//
// With promises we used .catch(). With await, a rejected
// promise THROWS - so our normal try-catch (Lesson 05!)
// handles it. Same safety net, familiar shape.
//
// UNCOMMENT BELOW AND RUN IT:

// function checkAge(age) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       if (age >= 18) resolve("Access granted");
//       else reject(new Error("You must be 18 or older"));
//     }, 500);
//   });
// }
//
// async function tryToEnter(age) {
//   try {
//     let message = await checkAge(age);
//     console.log(message);
//   } catch (error) {
//     console.log("Caught:", error.message);
//   }
// }
//
// tryToEnter(16);   // Caught: You must be 18 or older
// tryToEnter(21);   // Access granted


// ------------------------------------------------------------
// PART 6: SEQUENTIAL VS PARALLEL (an important habit)
// ------------------------------------------------------------
//
// await one-by-one = SEQUENTIAL (slow, but sometimes needed
// when step 2 needs step 1's result). Starting promises first
// and awaiting together = PARALLEL (fast).
//
// UNCOMMENT BELOW AND RUN IT:

// function boil(msg, ms) {
//   return new Promise((resolve) => setTimeout(() => resolve(msg), ms));
// }
//
// async function sequential() {
//   console.time("sequential");
//   let a = await boil("rice", 1000);      // starts after... finishes at 1s
//   let b = await boil("beans", 1000);     // starts AFTER rice! ends 2s
//   console.log(a, b);
//   console.timeEnd("sequential");         // ~2000ms
// }
//
// async function parallel() {
//   console.time("parallel");
//   let pa = boil("rice", 1000);           // BOTH start immediately
//   let pb = boil("beans", 1000);
//   let a = await pa;
//   let b = await pb;
//   console.log(a, b);
//   console.timeEnd("parallel");           // ~1000ms
// }
//
// sequential().then(parallel);


// ------------------------------------------------------------
// PART 7: COMBINING ASYNC/AWAIT WITH FETCH
// ------------------------------------------------------------
//
// fetch is the browser's built-in way to request data from
// the internet. It returns a promise - a perfect partner for
// await. (Node 18+ has fetch built in too, so this runs!)
//
// UNCOMMENT BELOW AND RUN IT:

// async function getUser() {
//   try {
//     let response = await fetch("https://randomuser.me/api/?results=1");
//     let data = await response.json();
//     let user = data.results[0];
//     console.log(`${user.name.first} ${user.name.last} - ${user.email}`);
//   } catch (error) {
//     console.log("Network problem:", error.message);
//   }
// }
//
// getUser();
//
// // Note the TWO awaits: one for the response arriving, one
// // for turning the body into JSON. Beginners forget the second!


// ------------------------------------------------------------
// PART 8: REAL EXAMPLE - FETCH WITH STATUS CHECK
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// async function loadUsers() {
//   try {
//     let response = await fetch("https://randomuser.me/api/?results=3");
//
//     if (!response.ok) {                       // 404, 500, etc.
//       throw new Error("HTTP error! Status: " + response.status);
//     }
//
//     let data = await response.json();
//     data.results.forEach(function (user, i) {
//       console.log(`${i + 1}. ${user.name.first} (${user.location.country})`);
//     });
//   } catch (error) {
//     console.log("Something went wrong:", error.message);
//   }
// }
//
// loadUsers();
//
// // IMPORTANT: fetch does NOT reject on 404/500 - only on
// // network failure. Always check response.ok yourself.


// ------------------------------------------------------------
// PART 9: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Write an async function that awaits a 1-second promise
//    and returns "Done!". Print its result with .then().
// 2. Convert the flipCoin promise from the promises lesson
//    into an async function that awaits it inside try-catch.
// 3. Fetch one user from randomuser.me and log ONLY their
//    email.
// 4. Add a .finally() to any chain that logs "All finished".
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. async marks a function; it ALWAYS returns a promise.
// 2. await pauses the async function until the promise
//    settles - code reads top to bottom.
// 3. await can only be used inside async functions (or
//    top-level in modules).
// 4. Rejected awaited promises throw - handle with try-catch.
// 5. Await sequentially when steps depend on each other;
//    start-then-await for parallel speed.
// 6. fetch + await + response.json() = the daily bread of
//    modern JS. Check response.ok!
// ============================================================

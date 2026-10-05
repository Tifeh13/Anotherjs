// ============================================================
// PROMISES (CREATION, CHAINING, ERROR HANDLING) - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 12-promises.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHAT IS A PROMISE? (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine you order Jollof rice at a restaurant. You do not
// get the food instantly - the waiter gives you a RECEIPT
// (a ticket) that PROMISES your food is coming.
//
// Eventually ONE of two things happens:
//   - FULFILLED: your jollof arrives.        (success)
//   - REJECTED:  "Sorry, we finished jollof." (failure)
//
// A Promise in JavaScript is that receipt: an object that
// represents a value you will have LATER. While you wait,
// the promise is "pending".


// ------------------------------------------------------------
// PART 2: WHY DO WE NEED PROMISES?
// ------------------------------------------------------------
//
// Some things take TIME: downloading data, reading files,
// timers. JS does not freeze the page while waiting - it
// starts the task, hands you a promise, and moves on.
//
// UNCOMMENT BELOW AND RUN IT:

// console.log("1. Order placed");
//
// setTimeout(function () {
//   console.log("3. Food arrives (2 seconds later)");
// }, 2000);
//
// console.log("2. Meanwhile, I check my phone");
//
// // Notice the ORDER: 1, 2, 3. JS kept working while waiting!


// ------------------------------------------------------------
// PART 3: CREATING A PROMISE
// ------------------------------------------------------------
//
// A promise takes a function with two doors:
// resolve(value)  = success door
// reject(error)   = failure door
//
// UNCOMMENT BELOW AND RUN IT:

// let myPromise = new Promise(function (resolve, reject) {
//   let foodReady = true;
//
//   if (foodReady) {
//     resolve("Here is your jollof rice!");
//   } else {
//     reject("Sorry, we finished jollof.");
//   }
// });
//
// console.log(myPromise);   // Promise { 'Here is your jollof rice!' }


// ------------------------------------------------------------
// PART 4: .then() AND .catch() - COLLECTING THE RESULT
// ------------------------------------------------------------
//
// .then()  runs when the promise RESOLVES (success).
// .catch() runs when it REJECTS (failure).
//
// UNCOMMENT BELOW AND RUN IT:

// let orderFood = new Promise(function (resolve, reject) {
//   let kitchenOpen = false;
//
//   if (kitchenOpen) {
//     resolve("Food is ready!");
//   } else {
//     reject("Kitchen is closed.");
//   }
// });
//
// orderFood
//   .then(function (message) {
//     console.log("Success:", message);
//   })
//   .catch(function (error) {
//     console.log("Failed:", error);
//   });
//
// // Flip kitchenOpen to true and run again.


// ------------------------------------------------------------
// PART 5: REAL PROMISE - setTimeout WRAPPED IN A FUNCTION
// ------------------------------------------------------------
//
// In real code, functions RETURN promises. Here is a fake
// "download" that succeeds after 1.5 seconds.
//
// UNCOMMENT BELOW AND RUN IT:

// function downloadFile(fileName) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(`${fileName} downloaded!`);
//     }, 1500);
//   });
// }
//
// console.log("Download starting...");
//
// downloadFile("photo.jpg").then(function (message) {
//   console.log(message);
// });
//
// console.log("(This prints BEFORE the download finishes)");


// ------------------------------------------------------------
// PART 6: CHAINING - ONE STEP AFTER ANOTHER
// ------------------------------------------------------------
//
// .then() returns a NEW promise, so you can line steps up.
// Each .then receives whatever the previous step RETURNED.
// This is how we escape "callback hell".
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
// step1()
//   .then(step2)
//   .then(step3)
//   .then(function (finalResult) {
//     console.log(finalResult);
//   });


// ------------------------------------------------------------
// PART 7: ERROR HANDLING IN CHAINS
// ------------------------------------------------------------
//
// One .catch() at the END catches a failure from ANY step
// above it - like one safety net under the whole staircase.
//
// UNCOMMENT BELOW AND RUN IT:

// function checkAge(age) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       if (age >= 18) {
//         resolve("Access granted");
//       } else {
//         reject(new Error("You must be 18 or older"));
//       }
//     }, 1000);
//   });
// }
//
// checkAge(16)
//   .then(function (message) {
//     console.log(message);
//     return "Next step ran";
//   })
//   .then(function (next) {
//     console.log(next);
//   })
//   .catch(function (error) {
//     console.log("Caught:", error.message);
//   });
//
// // Change 16 to 21 and run again.


// ------------------------------------------------------------
// PART 8: PROMISE.ALL - WAIT FOR MANY AT ONCE
// ------------------------------------------------------------
//
// Run several downloads in PARALLEL and wait for all.
// If ONE fails, the whole thing fails.
//
// UNCOMMENT BELOW AND RUN IT:

// let p1 = new Promise((resolve) => setTimeout(() => resolve("Rice ready"), 1000));
// let p2 = new Promise((resolve) => setTimeout(() => resolve("Chicken ready"), 2000));
// let p3 = new Promise((resolve) => setTimeout(() => resolve("Drinks ready"), 1500));
//
// Promise.all([p1, p2, p3]).then(function (results) {
//   console.log(results);   // [ 'Rice ready', 'Chicken ready', 'Drinks ready' ]
// });
//
// // Total time = the SLOWEST promise (2s), not the sum (4.5s)!


// ------------------------------------------------------------
// PART 9: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Create a promise that resolves with "Hello after 3
//    seconds" using setTimeout, and print it with .then().
// 2. Write "flipCoin()" that returns a promise resolving
//    "HEADS" or rejecting "TAILS" randomly.
// 3. Chain three promises: each waits 1 second and appends a
//    word, ending with "ready -> set -> go".
// 4. Use Promise.all with two promises and log both results.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. A Promise = a receipt for a value you will have later.
//    States: pending -> fulfilled or rejected.
// 2. new Promise((resolve, reject) => {...}) creates one.
// 3. .then(success) / .catch(failure) / .finally(always).
// 4. .then chains run steps in order; each gets the previous
//    step's return value.
// 5. One .catch at the end nets every error above it.
// 6. Promise.all waits for many promises in parallel.
// ============================================================

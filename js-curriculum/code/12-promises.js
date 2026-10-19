// ============================================================
// 12 - PROMISES: HANDLING THINGS THAT TAKE TIME
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything is commented out in blocks.
// Uncomment ONE block at a time, run it with:
//
//     node 12-promises.js
//
// Explain the block, show the output, then move on.
//
// To uncomment: select the lines, press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
//
// All the timers here are under 2 seconds on purpose, so the
// class does not sit in silence waiting for food to arrive.
// ============================================================


// ------------------------------------------------------------
// PART 1: THE PROBLEM - SOME THINGS ARE JUST SLOW
// ------------------------------------------------------------
//
// Some jobs finish instantly:
//
//     let x = 2 + 2;              // done, right now
//
// Other jobs take real time:
//
//     - asking a server for data   (0.2s, or 5s on a bad network)
//     - reading a file from disk   (milliseconds to seconds)
//     - waiting for a user to click (seconds, minutes, forever)
//
// Code that finishes immediately is called SYNCHRONOUS.
// Code that starts now and finishes LATER is ASYNCHRONOUS.
//
// JavaScript has only ONE thread - one worker. If that worker
// stood still and waited for every slow job, the page would
// freeze: no scrolling, no typing, no clicking.
//
// So JavaScript does not wait. It starts the slow job, writes
// itself a note ("when this finishes, run this function"), and
// carries on with the next line of code.
//
// That note is called a CALLBACK.
//
// UNCOMMENT BELOW AND RUN IT:

// console.log("1. I place my order");

// setTimeout(function () {
//   console.log("3. The food arrives (2 seconds later)");
// }, 2000);

// console.log("2. While I wait, I check my phone");
//
// EXPECTED OUTPUT - in this exact order:
//   1. I place my order
//   2. While I wait, I check my phone
//   3. The food arrives (2 seconds later)
//
// WHY?
//   setTimeout does not sleep the program. It hands the
//   function to a timer and returns immediately, so line 2
//   prints first. Two seconds later the timer fires and the
//   callback runs.
//
// This is the single most important idea in lessons 12-14:
// STARTING a slow job is not the same as FINISHING it.


// ------------------------------------------------------------
// PART 2: THE OLD SOLUTION - AND WHY IT HURT
// ------------------------------------------------------------
//
// Before promises, people passed callbacks into callbacks:
// "when A finishes, start B; when B finishes, start C..."
//
// It looked like this (do not run it - just read the shape):

// loginUser("ada", function (user) {
//   getPosts(user.id, function (posts) {
//     getComments(posts[0].id, function (comments) {
//       showOnPage(comments, function () {
//         console.log("Finally done - four levels deep!");
//       });
//     });
//   });
// });

// The problems:
//   1. The code grows sideways (the "pyramid of doom").
//   2. Every level needs its own error handling.
//   3. Reading order is not execution order - hard to follow.
//
// A Promise is JavaScript's way of flattening that pyramid:
// one object that represents the future result, with one
// place to handle success and one place to handle failure.


// ------------------------------------------------------------
// PART 3: A PROMISE IS A RECEIPT
// ------------------------------------------------------------
//
// You order jollof rice. The waiter does not hand you food.
// The waiter hands you a RECEIPT - a ticket that says
// "your food is coming".
//
// That receipt is a Promise: a placeholder for a value you
// will have later. It is not the value itself.
//
// A promise is always in exactly one of three states:
//
//   STATE       RESTAURANT                    IN JAVASCRIPT
//   ---------   ---------------------------   ---------------------
//   pending     waiting with the receipt       still working
//   fulfilled   the food arrives               success + a value
//   rejected    "we finished jollof"           failure + an error
//
// pending -> fulfilled OR rejected. Never backwards.
// Once it settles, it can never change again. If you ask the
// same promise for its value a second time, you get the same
// answer - it does not re-run the kitchen.
//
// UNCOMMENT BELOW AND RUN IT:

// let receipt = new Promise(function (resolve) {
//   // Nothing slow here yet - we just look at the receipt.
//   resolve("Jollof rice");
// });

// console.log(receipt);   // Promise { 'Jollof rice' }

// NOTE: Node prints `Promise { 'Jollof rice' }`. Chrome's
// console prints `Promise {<fulfilled>: 'Jollof rice'}`.
// Same object, different display.


// ------------------------------------------------------------
// PART 4: CREATING A PROMISE - TWO DOORS
// ------------------------------------------------------------
//
// new Promise(executor)
//
// The function you pass in runs IMMEDIATELY, and it receives
// two functions from JavaScript:
//
//   resolve(value)  -> open the success door
//   reject(reason)  -> open the failure door
//
// Calling one of them settles the promise. Only the FIRST
// call counts; a later reject() after resolve() is ignored.
//
// UNCOMMENT BELOW AND RUN IT:

// let order = new Promise(function (resolve, reject) {
//   let kitchenOpen = true;

//   if (kitchenOpen) {
//     resolve("Here is your jollof rice!");
//   } else {
//     reject(new Error("Sorry, we finished jollof."));
//   }
// });

// order
//   .then(function (food) {
//     console.log("Success:", food);
//   })
//   .catch(function (error) {
//     console.log("Failure:", error.message);
//   });
//
// EXPECTED OUTPUT: Success: Here is your jollof rice!
//
// Now change kitchenOpen to false and run again.
// EXPECTED OUTPUT: Failure: Sorry, we finished jollof.
//
// KEEP .then AND .catch IN ONE CHAIN.
// If you write order.then(...) on one line and order.catch(...)
// separately, the promise that .then returns has no rejection
// handler of its own. Node reports "UnhandledPromiseRejection"
// and may exit - even though your catch block printed the
// message. Chaining them (above) sends the failure through
// the catch of the same chain.

// Why `new Error(...)` and not just a string?
//   A real Error carries a message AND a stack trace, so you
//   can find where it came from. Reject with errors, not text.

// IMPORTANT: the executor runs immediately. That is why this
// prints "Kitchen opened" before anything else:

// console.log("Before new Promise");

// new Promise(function (resolve) {
//   console.log("Inside the executor - runs right now!");
//   resolve("done");
// }).then(function (value) {
//   console.log("Then runs later, with:", value);
// });

// console.log("After new Promise");
//
// EXPECTED OUTPUT:
//   Before new Promise
//   Inside the executor - runs right now!
//   After new Promise
//   Then runs later, with: done
//
// .then callbacks ALWAYS run after the current code finishes.
// Promises do not interrupt; they queue.


// ------------------------------------------------------------
// PART 5: .then(), .catch(), .finally()
// ------------------------------------------------------------
//
// .then(fn)    runs if the promise is FULFILLED.
//              fn receives the resolved value.
//
// .catch(fn)   runs if the promise is REJECTED.
//              fn receives the error.
//
// .finally(fn) runs EITHER WAY. No value, no error - just
//              "clean up now" (hide a spinner, close a file).
//
// UNCOMMENT BELOW AND RUN IT:

// function checkResult(score) {
//   return new Promise(function (resolve, reject) {
//     if (score >= 50) {
//       resolve("You passed with " + score);
//     } else {
//       reject(new Error("You scored " + score + " - try again"));
//     }
//   });
// }

// checkResult(72)
//   .then(function (message) {
//     console.log("Then:   ", message);
//   })
//   .catch(function (error) {
//     console.log("Catch:  ", error.message);
//   })
//   .finally(function () {
//     console.log("Finally: result checked");
//   });
//
// EXPECTED OUTPUT:
//   Then:    You passed with 72
//   Finally: result checked
//
// Now change 72 to 30 and run it again.
// EXPECTED OUTPUT:
//   Catch:   You scored 30 - try again
//   Finally: result checked
//
// Only ONE of then/catch runs per promise, but finally always
// runs once.
//
// (Why one call at a time? If you start two chains at once,
// their callbacks interleave in the microtask queue, and the
// output order can surprise you. One promise at a time keeps
// the lesson about then/catch/finally, not about scheduling.)


// ------------------------------------------------------------
// PART 6: A REAL PROMISE - A FUNCTION THAT RETURNS ONE
// ------------------------------------------------------------
//
// You will almost never write `new Promise` in daily code.
// You will CALL functions that already return promises:
// fetch(), response.json(), fs.promises.readFile(), and so on.
//
// To understand them, write one yourself: a fake download.
//
// UNCOMMENT BELOW AND RUN IT:

// function downloadFile(fileName, milliseconds) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(fileName + " downloaded!");
//     }, milliseconds);
//   });
// }

// console.log("Download starting...");

// downloadFile("photo.jpg", 1500).then(function (message) {
//   console.log(message);
// });

// console.log("(This prints BEFORE the download finishes)");
//
// EXPECTED OUTPUT:
//   Download starting...
//   (This prints BEFORE the download finishes)
//   photo.jpg downloaded!        <- 1.5 seconds later
//
// Trace it:
//   1. downloadFile is called. It creates the promise and
//      starts the timer. It returns the pending promise NOW.
//   2. .then registers what to do when it settles.
//   3. The last console.log runs.
//   4. The timer fires -> resolve() -> .then runs.
//
// The function RETURNS a promise so the caller decides what to
// do next. That is the whole design: the slow part is inside,
// the waiting decision is outside.


// ------------------------------------------------------------
// PART 7: CHAINING - THE RELAY RACE
// ------------------------------------------------------------
//
// .then() returns a NEW promise. So you can chain:
//
//   first().then(second).then(third)
//
// The value each .then RETURNS becomes the input of the next
// .then. Like passing a baton in a relay race.
//
// If a .then returns a PROMISE, the chain waits for it before
// moving on (this is the key to sequencing real work).
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

// step1()
//   .then(step2)
//   .then(step3)
//   .then(function (finalResult) {
//     console.log(finalResult);
//   });

// EXPECTED OUTPUT:
//   Step 1 done -> Step 2 done -> Step 3 done
//
// Promise.resolve(value) is shorthand for "a promise that is
// already fulfilled with this value". It is handy for testing.
//
// THE #1 CHAINING BUG: forgetting to return.

// step1()
//   .then(function (previous) {
//     previous + " -> Step 2 done";     // <-- no return!
//   })
//   .then(function (result) {
//     console.log("BUG:", result);      // BUG: undefined
//   });
//
// A function with no return hands back undefined. Every middle
// step of a chain must return something.

// Returning a promise makes the chain WAIT:

// function wait(ms) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, ms);
//   });
// }

// wait(500)
//   .then(function () {
//     console.log("first 0.5s passed");
//     return wait(500);                 // wait for this too
//   })
//   .then(function () {
//     console.log("second 0.5s passed");
//   });

// EXPECTED OUTPUT (about 1 second apart):
//   first 0.5s passed
//   second 0.5s passed


// ------------------------------------------------------------
// PART 8: ERROR HANDLING IN A CHAIN
// ------------------------------------------------------------
//
// A rejection SKIPS every .then below it and jumps to the
// nearest .catch. So you do not need try/catch around each
// step - one catch at the end is a net under the staircase.
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
//     }, 500);
//   });
// }

// checkAge(16)
//   .then(function (message) {
//     console.log("Step A:", message);
//     return "Step B ran";
//   })
//   .then(function (next) {
//     console.log("Step C:", next);
//   })
//   .catch(function (error) {
//     console.log("Caught:", error.message);
//   });
//
// EXPECTED OUTPUT:
//   Caught: You must be 18 or older
//
// Neither .then ran. The rejection jumped straight down.
//
// Now change 16 to 21. EXPECTED OUTPUT:
//   Step A: Access granted
//   Step C: Step B ran
//
// Two more facts worth knowing:
//
//   - An error THROWN inside a .then also lands in .catch.
//   - After a .catch, the chain CONTINUES. If you return a
//     value from .catch, later .then steps receive it. That is
//     how you implement a fallback.
//
// UNCOMMENT BELOW AND RUN IT:

// Promise.reject(new Error("Primary server down"))
//   .catch(function (error) {
//     console.log("Recovering from:", error.message);
//     return "Using cached data";        // the fallback value
//   })
//   .then(function (data) {
//     console.log("Recovered:", data);
//   });

// EXPECTED OUTPUT:
//   Recovering from: Primary server down
//   Recovered: Using cached data
//
// ALWAYS add a .catch. An unhandled rejection shows up as a
// red "Uncaught (in promise)" error and can crash Node.


// ------------------------------------------------------------
// PART 9: Promise.all - MANY ORDERS AT ONCE
// ------------------------------------------------------------
//
// Real apps often need several things before they can show a
// page: the user, their posts, their settings.
//
// Promise.all([p1, p2, p3]) starts them together and resolves
// when ALL of them are done.
//
// UNCOMMENT BELOW AND RUN IT:

// function cook(food, milliseconds) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(food + " ready");
//     }, milliseconds);
//   });
// }

// console.time("Promise.all");

// Promise.all([
//   cook("Rice", 1000),
//   cook("Chicken", 1500),
//   cook("Drinks", 500)
// ]).then(function (results) {
//   console.log(results);
//   console.timeEnd("Promise.all");
// });
//
// EXPECTED OUTPUT:
//   [ 'Rice ready', 'Chicken ready', 'Drinks ready' ]
//   Promise.all: ~1500ms
//
// Two things to notice:
//
//   1. Results are in the ORIGINAL ORDER, not finish order.
//      Drinks finished first, but it is still third.
//   2. The total wait is the SLOWEST task (1.5s), not the sum
//      (3s). All three pots were on the fire at once.
//
// If ANY promise rejects, Promise.all rejects immediately,
// even if the others would have succeeded.
//
// If you want every result, success or failure, use
// Promise.allSettled:

// Promise.allSettled([
//   Promise.resolve("Rice ready"),
//   Promise.reject(new Error("Chicken burned")),
//   Promise.resolve("Drinks ready")
// ]).then(function (results) {
//   results.forEach(function (result) {
//     if (result.status === "fulfilled") {
//       console.log("OK:  ", result.value);
//     } else {
//       console.log("FAIL:", result.reason.message);
//     }
//   });
// });

// EXPECTED OUTPUT:
//   OK:   Rice ready
//   FAIL: Chicken burned
//   OK:   Drinks ready
//
// Quick reference:
//   Promise.all          -> all must succeed
//   Promise.allSettled   -> wait for all, report each outcome
//   Promise.race         -> first to SETTLE wins (success or failure)
//   Promise.any          -> first to SUCCEED wins


// ------------------------------------------------------------
// PART 10: WHERE YOU WILL MEET PROMISES IN REAL CODE
// ------------------------------------------------------------
//
// Promises are the standard shape for "this finishes later":
//
//   fetch(url)                 -> a promise for a Response
//   response.json()            -> a promise for parsed data
//   fs.promises.readFile(path) -> a promise for file contents
//   navigator.clipboard.readText()
//   a database query
//
// Lesson 13 (async/await) is a nicer way to USE these
// promises. Lesson 14 uses them to talk to real APIs.
//
// For now, remember the shape:
//
//   somethingSlow()
//     .then(handleSuccess)
//     .catch(handleFailure)
//     .finally(cleanUp);


// ------------------------------------------------------------
// PART 11: TRY IT YOURSELF
// ------------------------------------------------------------
//
// 1. Write wait(ms) that returns a promise resolving after ms.
//    Then wait(1000).then(() => console.log("1 second!"));
//
// 2. Write flipCoin() that resolves "HEADS" or rejects with an
//    Error("TAILS") using Math.random() < 0.5.
//    Run it 5 times with .then/.catch.
//
// 3. Chain three steps with wait(500): print "ready", then
//    "set", then "go". Each line must appear half a second
//    after the one before it.
//
// 4. Use Promise.all with two wait() promises (300ms and
//    700ms) and time the whole thing with console.time.
//    Prove the total is about 700ms, not 1000ms.
//
// 5. Bug hunt: the chain below prints undefined. Fix it.
//
//      wait(300)
//        .then(function () { "finished"; })
//        .then(function (value) { console.log(value); });
//
// Write your answers below this line:




// ============================================================
// QUICK SUMMARY (read this out loud at the end)
// ============================================================
//
// 1. Some work finishes later. JS does not freeze; it starts
//    the job, gets a promise, and keeps going.
// 2. A promise is a receipt for a future value. States:
//    pending -> fulfilled OR rejected. It never changes after.
// 3. new Promise(function (resolve, reject) {...}) creates
//    one. The executor runs immediately.
// 4. .then(success) / .catch(failure) / .finally(always).
// 5. .then returns a new promise. Return a value to pass it
//    on; return a promise to make the chain wait.
// 6. One .catch at the end catches every error above it.
// 7. Promise.all waits for many promises at once; the wait is
//    as long as the slowest task, and one failure fails all.
// 8. fetch() and response.json() are promises - lesson 13
//    shows the cleaner way to use them.
// ============================================================

// ============================================================
// 13 - ASYNC / AWAIT: PROMISES THAT READ LIKE NORMAL CODE
// ============================================================
//
// HOW TO USE THIS FILE:
// Uncomment ONE block at a time and run:
//
//     node 13-async-await.js
//
// Parts 1-7 need no internet. Part 8 does (it calls a real API).
//
// To uncomment: select the lines, press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
//
// PREREQUISITE: lesson 12 (promises). async/await is not a new
// system - it is a nicer way to write the same promises.
// ============================================================


// ------------------------------------------------------------
// PART 1: THE PROBLEM - CHAINS READ INSIDE OUT
// ------------------------------------------------------------
//
// This works, but look at how you have to read it:
//
//     getUser()
//       .then(function (user) { return getPosts(user); })
//       .then(function (posts) { return getComments(posts[0]); })
//       .then(function (comments) { console.log(comments); })
//       .catch(function (error) { console.log(error); });
//
// You hop from .then to .then, tracking what each one returns.
// Add a condition or a loop and it gets ugly fast.
//
// async/await lets us write the SAME thing top to bottom:
//
//     async function show() {
//       try {
//         let user     = await getUser();
//         let posts    = await getPosts(user);
//         let comments = await getComments(posts[0]);
//         console.log(comments);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//
// Two words to understand:
//
//   async  -> "this function contains waiting, and it will
//              always give back a promise"
//
//   await  -> "pause this function here until the promise
//              settles, then hand me the value"
//
// IMPORTANT MENTAL MODEL:
//    await is a BOOKMARK, not a pause button for the program.
//    The async function marks its page and steps aside. The
//    rest of the program keeps running. When the slow thing
//    finishes, the function comes back to its bookmark.
//
// There is no new power here. async/await is PROMISE SYNTAX
// SUGAR: the engine still creates promises and .then chains
// underneath. You could rewrite every example below with
// .then and get the same behaviour.


// ------------------------------------------------------------
// PART 2: async FUNCTIONS ALWAYS RETURN A PROMISE
// ------------------------------------------------------------
//
// Put async in front of a function and its return value gets
// wrapped in a promise automatically. Even a plain string.
//
// UNCOMMENT BELOW AND RUN IT:

// async function sayHello() {
//   return "Hello from an async function";
// }

// let result = sayHello();
// console.log(result);          // Promise { 'Hello from an async function' }

// result.then(function (message) {
//   console.log("Unwrapped:", message);
// });

// EXPECTED OUTPUT:
//   Promise { 'Hello from an async function' }
//   Unwrapped: Hello from an async function
//
// Notice: the function returned a STRING, but the caller got
// a PROMISE. That is the automatic wrapping.
//
// Why does this matter?
//   - Callers must await it or .then it.
//   - console.log(sayHello()) will never show the string.
//   - It also means an async function behaves like any other
//     promise, so Promise.all works with it.

// await works on ANY value, promise or not. Awaiting a plain
// number just gives the number back:

// async function add(a, b) {
//   let total = await (a + b);   // silly, but legal
//   return total;
// }

// add(2, 3).then(function (value) {
//   console.log("Total:", value);   // Total: 5
// });

// If an async function THROWS, the promise it returns is
// REJECTED:

// async function explode() {
//   throw new Error("Something broke");
// }

// explode().catch(function (error) {
//   console.log("Caught from async function:", error.message);
// });

// EXPECTED OUTPUT:
//   Caught from async function: Something broke


// ------------------------------------------------------------
// PART 3: await - WAITING WITHOUT FREEZING
// ------------------------------------------------------------
//
// This is the part students get wrong, so run it and trace the
// order together.
//
// UNCOMMENT BELOW AND RUN IT:

// function waitTwoSeconds() {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve("Finally done waiting!");
//     }, 2000);
//   });
// }

// async function run() {
//   console.log("1. run() started");
//   let message = await waitTwoSeconds();   // bookmark here
//   console.log("3. " + message);           // 2s later
// }

// run();

// console.log("2. The program kept running while run() waited");
//
// EXPECTED OUTPUT, in this order:
//   1. run() started
//   2. The program kept running while run() waited
//   3. Finally done waiting!          <- after 2 seconds
//
// WHY THIS ORDER?
//   1. run() starts and prints line 1.
//   2. It calls waitTwoSeconds(), gets a pending promise, and
//      hits await. It puts down a bookmark and RETURNS control
//      to the caller.
//   3. The main program continues: line 2 prints.
//   4. Two seconds later the timer fires, the promise resolves,
//      and run() resumes from the bookmark with the value.
//
// If await froze the whole program, line 2 would print last.
// It does not.
//
// NOTE: `message` is the STRING, not a promise. await unwraps
// it. Without await, message would be a pending promise.

// PROOF that "await waits" only inside its own function:
// two async functions can wait at the same time.

// async function order(food, ms) {
//   await new Promise(function (resolve) { setTimeout(resolve, ms); });
//   console.log(food + " is ready");
// }

// order("Rice", 1000);
// order("Beans", 1000);

// console.log("Both orders started at once");
//
// EXPECTED OUTPUT:
//   Both orders started at once
//   Rice is ready          <- both at about 1s
//   Beans is ready
//
// They did not queue behind each other. Each function paused
// itself, and both timers ran in parallel.


// ------------------------------------------------------------
// PART 4: REWRITING A .then() CHAIN WITH await
// ------------------------------------------------------------
//
// Same three steps from lesson 12, two ways.
//
// Promise style:
//
//     step1().then(step2).then(step3).then(function (result) {
//       console.log(result);
//     });
//
// Async style:
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

// async function runSteps() {
//   let first  = await step1();
//   let second = await step2(first);
//   let third  = await step3(second);
//   console.log(third);
// }

// runSteps();

// EXPECTED OUTPUT:
//   Step 1 done -> Step 2 done -> Step 3 done
//
// Why this is easier to teach and to debug:
//   - Each step has its own named variable (first, second,
//     third). You can console.log any of them on its own line.
//   - The order you read is the order that runs.
//   - try/catch replaces a trailing .catch, and you already
//     know try/catch from lesson 05.
//
// The relay race is identical: each await receives the value
// the previous call produced.

// REMEMBER: await only pauses the async function it is in.
// If you call runSteps() without awaiting it, the rest of the
// program continues immediately - runSteps keeps working in
// the background and prints when it is done.


// ------------------------------------------------------------
// PART 5: ERROR HANDLING - try / catch / finally
// ------------------------------------------------------------
//
// With promises, a rejection goes to .catch.
// With await, a rejected promise THROWS at the await line.
// So ordinary try/catch handles it. Same safety net, familiar
// shape.
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

// async function tryToEnter(age) {
//   console.log("Checking age " + age + "...");
//   try {
//     let message = await checkAge(age);
//     console.log("Success:", message);
//   } catch (error) {
//     console.log("Caught: ", error.message);
//   } finally {
//     console.log("Door check finished");
//   }
// }

// tryToEnter(16);
// tryToEnter(21);
//
// EXPECTED OUTPUT (both checks run at the same time, so the
// order of the middle lines can vary):
//   Checking age 16...
//   Checking age 21...
//   Caught:  You must be 18 or older
//   Door check finished
//   Success: Access granted
//   Door check finished
//
// HOW IT MAPS:
//
//   PROMISES (lesson 12)      ASYNC/AWAIT (this lesson)
//   ----------------------    --------------------------
//   .then(success)            the lines after await
//   .catch(failure)           catch (error) { ... }
//   .finally(always)          finally { ... }
//
// Without try/catch, a rejected await becomes an unhandled
// rejection:
//
//   Caught: You must be 18 or older   <- with try/catch
//   Uncaught (in promise) Error: ...  <- without it
//
// So: every await that can fail belongs inside try/catch.


// ------------------------------------------------------------
// PART 6: SEQUENTIAL VS PARALLEL - A HABIT THAT SAVES SECONDS
// ------------------------------------------------------------
//
// Two ways to do two slow jobs:
//
//   SEQUENTIAL: start A, wait for A, start B, wait for B.
//               Total = A + B.
//
//   PARALLEL:   start A and B together, then wait for both.
//               Total = the slower one.
//
// Sequential is required when B needs A's result. If they are
// independent, parallel is almost always better.
//
// UNCOMMENT BELOW AND RUN IT:

// function boil(food, milliseconds) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(food + " ready");
//     }, milliseconds);
//   });
// }

// async function sequential() {
//   console.time("sequential");
//   let rice  = await boil("Rice", 1000);    // starts now
//   let beans = await boil("Beans", 1000);   // starts AFTER rice
//   console.log(rice, "|", beans);
//   console.timeEnd("sequential");
// }

// async function parallel() {
//   console.time("parallel");
//   let ricePromise  = boil("Rice", 1000);   // both start now
//   let beansPromise = boil("Beans", 1000);
//   let rice  = await ricePromise;
//   let beans = await beansPromise;
//   console.log(rice, "|", beans);
//   console.timeEnd("parallel");
// }

// sequential().then(parallel);
//
// EXPECTED OUTPUT:
//   Rice ready | Beans ready
//   sequential: ~2000ms
//   Rice ready | Beans ready
//   parallel: ~1000ms
//
// THE KEY INSIGHT:
//   Calling a function that returns a promise STARTS the work.
//   It is await that waits. So in `parallel`, both timers began
//   before the first await.
//
// `sequential().then(parallel)` is itself a promise chain: run
// the first demo, then the second, so the timing logs do not
// overlap.
//
// The shorter parallel form is Promise.all:

// async function parallelWithAll() {
//   console.time("all");
//   let [rice, beans] = await Promise.all([
//     boil("Rice", 1000),
//     boil("Beans", 1000)
//   ]);
//   console.log(rice, "|", beans);
//   console.timeEnd("all");       // ~1000ms
// }

// parallelWithAll();
//
// Use sequential when step 2 needs step 1's answer:
//
//   let user  = await getUser(id);
//   let posts = await getPosts(user.id);   // needs user.id


// ------------------------------------------------------------
// PART 7: THE forEach TRAP (students hit this constantly)
// ------------------------------------------------------------
//
// This looks right and is wrong:
//
//     foods.forEach(async function (food) {
//       await boil(food, 500);
//       console.log(food + " done");
//     });
//
// forEach does not wait for its callback. It fires all of them
// and moves on. Each callback pauses itself, but nobody waits
// for the group. If you need one-at-a-time, use for...of.
//
// UNCOMMENT BELOW AND RUN IT:

// function boil(food, milliseconds) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(food + " ready");
//     }, milliseconds);
//   });
// }

// async function oneAtATime(foods) {
//   console.time("oneAtATime");
//   for (let food of foods) {
//     let result = await boil(food, 500);   // waits properly
//     console.log(result);
//   }
//   console.timeEnd("oneAtATime");          // ~1500ms for 3 foods
// }

// oneAtATime(["Rice", "Beans", "Yam"]);
//
// EXPECTED OUTPUT:
//   Rice ready
//   Beans ready
//   Yam ready
//   oneAtATime: ~1500ms
//
// If you do NOT need them in order, start them all and use
// Promise.all instead:
//
//     let results = await Promise.all(foods.map(function (food) {
//       return boil(food, 500);
//     }));
//
// That finishes in ~500ms total because all three cook at once.


// ------------------------------------------------------------
// PART 8: A FIRST TASTE OF fetch (full lesson next)
// ------------------------------------------------------------
//
// fetch(url) is the browser's built-in way to ask a server for
// data. It returns a promise, so await fits it perfectly.
//
// Lesson 14 goes deep into APIs, GET, POST, status codes and
// JSON. For now, just see the shape.
//
// UNCOMMENT BELOW AND RUN IT (needs internet):

// async function getUser() {
//   try {
//     let response = await fetch("https://randomuser.me/api/?results=1");
//     console.log("Status:", response.status);

//     let data = await response.json();       // second wait!
//     let user = data.results[0];
//     console.log(user.name.first + " " + user.name.last);
//     console.log(user.email);
//   } catch (error) {
//     console.log("Network problem:", error.message);
//   }
// }

// getUser();
//
// TWO awaits, TWO waits:
//   1. await fetch(...)      -> wait for the RESPONSE to arrive
//   2. await response.json() -> wait for the BODY to be parsed
//
// THE #1 BEGINNER BUG: forgetting the second await.
//
//     let data = response.json();
//     console.log(data.results);   // undefined - data is a promise
//
// If you forget it, you are holding the wrapping paper, not
// the gift. (A good way to explain it to students.)
//
// Also note: this try/catch only catches network failures.
// A 404 or 500 arrives as a normal response, so you must check
// response.ok yourself. Lesson 14 covers that in detail.


// ------------------------------------------------------------
// PART 9: TRY IT YOURSELF
// ------------------------------------------------------------
//
// 1. Write an async function that awaits wait(10000) and then
//    logs "Done!". Call it with .then and confirm you get
//    another promise back.
//
// 2. Convert lesson 12's flipCoin() into:
//
//      async function play() {
//        try   { let result = await flipCoin(); console.log(result); }
//        catch (error) { console.log("Bad luck:", error.message); }
//      }
//
//    Run it five times and watch both paths.
//
// 3. Write sequential() and parallel() that each "load" three
//    users with different delays. Time both. Explain the gap.
//
// 4. Bug hunt: why does this print "loaded" before the data?
//
//      async function load() {
//        let data = fetch("https://jsonplaceholder.typicode.com/todos/1");
//        console.log("loaded", data);
//      }
//      load();
//
//    Fix it with two awaits and a response.ok check.
//
// 5. Given a list of three IDs, fetch the three todos in
//    parallel with Promise.all and log the titles.
//
// Write your answers below this line:




// ============================================================
// QUICK SUMMARY (read this out loud at the end)
// ============================================================
//
// 1. async/await is promise syntax sugar. Same machinery.
// 2. An async function ALWAYS returns a promise, even when it
//    returns a plain value. Throwing inside it rejects that
//    promise.
// 3. await pauses only the async function it is in; the rest
//    of the program keeps running.
// 4. await gives you the resolved VALUE, not a promise.
// 5. A rejected await throws, so use try/catch/finally.
// 6. Awaiting one by one is sequential. Start first, await
//    later (or Promise.all) to run in parallel.
// 7. Do not await inside forEach; use for...of when order
//    matters, or Promise.all when it does not.
// 8. fetch + await + response.json() is the everyday API
//    pattern - lesson 14 makes it fully clear.
// ============================================================

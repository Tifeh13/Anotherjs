// ============================================================
// FETCH API (fetch, RESPONSE OBJECTS, HANDLING JSON)
// - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// This lesson needs a WEB PAGE, not plain Node!
// (Works in the browser console, or Node 18+ in the terminal.)
//
// 1. Open index.html (in this folder) in your browser.
// 2. Press F12 to open DevTools, go to the Console tab.
// 3. Uncomment ONE block at a time, paste it into the Console,
//    press Enter, and watch the results.
// 4. You need INTERNET ACCESS for the example APIs.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHAT IS AN API? (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine a RESTAURANT: you (the app) do not walk into the
// kitchen. You give the WAITER your order, the waiter goes
// to the kitchen (the server) and brings back your food.
//
// An API is that waiter: a structured way for your code to
// ASK a server for data and RECEIVE it.


// ------------------------------------------------------------
// PART 2: YOUR FIRST fetch()
// ------------------------------------------------------------
//
// fetch(url) sends a GET request and returns a PROMISE.
// The promise resolves to a RESPONSE OBJECT (the waiter's
// tray - not your food yet!).
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// fetch("https://randomuser.me/api/?results=1")
//   .then(function (response) {
//     console.log(response);       // the full Response object
//     console.log(response.status);   // 200 = OK
//     console.log(response.ok);       // true when status is 200-299
//   });


// ------------------------------------------------------------
// PART 3: THE RESPONSE OBJECT (the tray, not the meal)
// ------------------------------------------------------------
//
// The response carries: .status (200, 404...), .ok (boolean),
// and HEADERS (extra info). The BODY (actual data) is still
// packed - you must unpack it.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// fetch("https://randomuser.me/api/?results=1")
//   .then(function (response) {
//     console.log("Status:", response.status);
//     console.log("OK?:    ", response.ok);
//     console.log("Headers:", response.headers.get("content-type"));
//     // The body is NOT here yet - next part!
//   });


// ------------------------------------------------------------
// PART 4: response.json() - UNPACKING THE DATA
// ------------------------------------------------------------
//
// .json() reads the body and parses the JSON text into a
// real JavaScript object. It ALSO returns a promise - so we
// chain another .then(). (This is the #1 beginner trap!)
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// fetch("https://randomuser.me/api/?results=1")
//   .then(function (response) {
//     return response.json();     // unpack the food!
//   })
//   .then(function (data) {
//     console.log(data);          // the actual JavaScript object
//     console.log(data.results[0].name.first);
//   });


// ------------------------------------------------------------
// PART 5: THE SAME THING WITH async/await (cleaner)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// async function getUser() {
//   let response = await fetch("https://randomuser.me/api/?results=1");
//   let data = await response.json();
//   console.log(`${data.results[0].name.first} - ${data.results[0].email}`);
// }
//
// getUser();
//
// // Two awaits: 1) response arrives  2) body becomes JSON.


// ------------------------------------------------------------
// PART 6: HANDLING ERRORS (the .ok trap!)
// ------------------------------------------------------------
//
// fetch only REJECTS on network failure. A 404 or 500 still
// RESOLVES! You must check response.ok yourself.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// async function safeFetch(url) {
//   try {
//     let response = await fetch(url);
//
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status} - ${response.statusText}`);
//     }
//
//     let data = await response.json();
//     console.log("Got data:", data);
//   } catch (error) {
//     console.log("Fetch failed:", error.message);
//   }
// }
//
// safeFetch("https://randomuser.me/api/?results=1");        // works
// safeFetch("https://randomuser.me/api/DOES-NOT-EXIST");    // 404 caught!


// ------------------------------------------------------------
// PART 7: DISPLAYING FETCHED DATA ON THE PAGE
// ------------------------------------------------------------
//
// Real apps fetch data, then RENDER it with the DOM skills
// from Lessons 06-10.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// async function showUser() {
//   let box = document.getElementById("user-result");
//   box.textContent = "Loading...";
//
//   try {
//     let response = await fetch("https://randomuser.me/api/?results=1");
//     if (!response.ok) throw new Error("HTTP " + response.status);
//
//     let data = await response.json();
//     let user = data.results[0];
//
//     box.innerHTML = `
//       <strong>${user.name.first} ${user.name.last}</strong><br>
//       ${user.email}<br>
//       <img src="${user.picture.medium}" alt="user photo">`;
//   } catch (error) {
//     box.textContent = "Could not load user: " + error.message;
//   }
// }
//
// document.getElementById("load-user-btn")
//         .addEventListener("click", showUser);
//
// // Click "Load a random user" on the page!


// ------------------------------------------------------------
// PART 8: SENDING DATA WITH POST
// ------------------------------------------------------------
//
// GET asks FOR data. POST SENDS data. You describe the
// request with an options object.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// async function createPost() {
//   let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       title: "My first post",
//       body: "Written from the browser console!",
//       userId: 1
//     })
//   });
//
//   let data = await response.json();
//   console.log(data);   // the fake server echoes it back with an id
// }
//
// createPost();
//
// // JSON.stringify = JS object -> JSON text.
// // response.json() = JSON text -> JS object.


// ------------------------------------------------------------
// PART 9: REAL EXAMPLE - LOADING A LIST
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// async function loadPosts() {
//   let response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
//   let posts = await response.json();
//
//   let ul = document.createElement("ul");
//   posts.forEach(function (post) {
//     let li = document.createElement("li");
//     li.textContent = post.title;
//     ul.appendChild(li);
//   });
//   document.body.appendChild(ul);
// }
//
// loadPosts();
//
// // Fetch -> array -> forEach -> createElement -> append.
// // That loop IS modern web development.


// ------------------------------------------------------------
// PART 10: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Fetch 5 users from randomuser.me and log each full name.
// 2. Fetch https://jsonplaceholder.typicode.com/todos/1 and
//    log the todo's title and completed status.
// 3. Wrap a fetch in try-catch with a response.ok check, and
//    test it with a bad URL.
// 4. Render the 5 users' photos and names on the page using
//    createElement and appendChild.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. fetch(url) asks a server for data; it returns a promise
//    resolving to a Response object.
// 2. response.status / response.ok describe the HTTP result.
// 3. The body needs unpacking: await response.json() (also a
//    promise!). Other readers: .text(), .blob().
// 4. fetch does NOT reject on 404/500 - check response.ok.
// 5. POST sends data: method + headers + JSON.stringify body.
// 6. Pipeline: fetch -> json -> forEach -> render with DOM.
// ============================================================

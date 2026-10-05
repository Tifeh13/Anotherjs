// ============================================================
// DOM MANIPULATION - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// This lesson needs a WEB PAGE, not Node.js!
//
// 1. Open index.html (in this folder) in your browser.
// 2. Press F12 to open DevTools, go to the Console tab.
// 3. Uncomment ONE block at a time, paste it into the Console,
//    press Enter, and watch the page change.
// 4. To start fresh, just refresh the page (F5).
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHAT IS THE DOM? (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine your HTML page is a FAMILY TREE. <html> is the
// grandparent, <body> the parent, and every heading, button
// and paragraph is a CHILD hanging from a branch.
//
// The DOM (Document Object Model) is JavaScript's MAP of that
// tree. Through the DOM, JS can FIND any element, CHANGE it,
// DELETE it, or CREATE new ones - live, while you watch.


// ------------------------------------------------------------
// PART 2: THE DOCUMENT OBJECT (your entry point)
// ------------------------------------------------------------
//
// "document" is a built-in object the browser hands you for
// free. It represents the whole page. You always start here.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// console.log(document);
// console.log(document.title);      // the page's title
// console.log(document.body);       // the <body> element


// ------------------------------------------------------------
// PART 3: getElementById - FIND ONE ELEMENT BY ITS ID
// ------------------------------------------------------------
//
// An id is like a student's admission number: UNIQUE.
// Fastest way to grab exactly one element.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let heading = document.getElementById("main-title");
//
// console.log(heading);            // the <h1> element
// console.log(heading.textContent);


// ------------------------------------------------------------
// PART 4: querySelector - FIND THE FIRST MATCH WITH CSS
// ------------------------------------------------------------
//
// querySelector accepts ANY CSS selector and gives back the
// FIRST element that matches.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let firstCard = document.querySelector(".card");   // first .card
// let button = document.querySelector("#action-btn"); // by id
// let listItem = document.querySelector("ul li");     // first li in a ul
//
// console.log(firstCard, button, listItem);


// ------------------------------------------------------------
// PART 5: querySelectorAll - FIND ALL MATCHES
// ------------------------------------------------------------
//
// Returns a NodeList (a list of elements). Loop over it to
// work on each one.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let allCards = document.querySelectorAll(".card");
//
// console.log(allCards);           // NodeList of the 3 cards
// console.log(allCards.length);    // 3
//
// allCards.forEach(function (card) {
//   console.log(card.textContent);
// });


// ------------------------------------------------------------
// PART 6: innerHTML, innerText vs textContent
// ------------------------------------------------------------
//
// innerHTML   -> gets/sets the HTML INSIDE (can add tags!)
// innerText   -> the VISIBLE text (respects CSS hiding)
// textContent -> ALL the raw text (faster, ignores CSS)
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let msg = document.getElementById("message");
//
// msg.textContent = "Set with textContent - plain and safe.";
//
// msg.innerHTML = "Set with <strong>innerHTML</strong> - tags work!";
//
// console.log(msg.innerText);
// console.log(msg.textContent);


// ------------------------------------------------------------
// PART 7: setAttribute AND style
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let link = document.querySelector("#my-link");
//
// link.setAttribute("href", "https://developer.mozilla.org");
// link.setAttribute("target", "_blank");
// link.textContent = "Go to MDN docs";
//
// let title = document.getElementById("main-title");
// title.style.color = "tomato";
// title.style.fontSize = "48px";


// ------------------------------------------------------------
// PART 8: classList - ADD, REMOVE, TOGGLE CLASSES
// ------------------------------------------------------------
//
// The professional way to change looks: put the styles in a
// CSS class, then switch the class from JS.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");
//
// title.classList.add("highlight");
// title.classList.remove("highlight");
// title.classList.toggle("highlight");   // on if off, off if on
//
// console.log(title.classList.contains("highlight"));


// ------------------------------------------------------------
// PART 9: CREATING ELEMENTS (build a new brick)
// ------------------------------------------------------------
//
// Three steps: CREATE it, DECORATE it, ATTACH it.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let newPara = document.createElement("p");
// newPara.textContent = "I was born from JavaScript!";
// newPara.classList.add("card");
//
// document.body.appendChild(newPara);   // attach as last child of body


// ------------------------------------------------------------
// PART 10: REMOVING ELEMENTS
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let firstCard = document.querySelector(".card");
// firstCard.remove();                  // modern, simple way


// ------------------------------------------------------------
// PART 11: EVENT HANDLING - LISTENING FOR CLICKS
// ------------------------------------------------------------
//
// addEventListener = "when X happens, do Y". The function you
// pass is the event HANDLER.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let button = document.getElementById("action-btn");
//
// button.addEventListener("click", function () {
//   alert("You clicked me!");
// });


// ------------------------------------------------------------
// PART 12: THE EVENT OBJECT
// ------------------------------------------------------------
//
// The browser passes an EVENT OBJECT to your handler full of
// details about what happened.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let input = document.getElementById("name-input");
//
// input.addEventListener("input", function (event) {
//   console.log("Current value:", event.target.value);
// });
//
// document.getElementById("main-title").addEventListener("click", function (e) {
//   console.log("Click at X:", e.clientX, "Y:", e.clientY);
// });


// ------------------------------------------------------------
// PART 13: EVENT DELEGATION (one listener, many children)
// ------------------------------------------------------------
//
// Instead of adding a listener to EVERY child, add ONE to the
// parent. The click "bubbles up" from the child; we check
// event.target to see WHO was actually clicked.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let list = document.getElementById("fruit-list");
//
// list.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     console.log("You clicked:", event.target.textContent);
//     event.target.classList.toggle("highlight");
//   }
// });
//
// // Bonus: click "Add fruit" - the NEW items also respond,
// // because the listener lives on the parent, not the items.


// ------------------------------------------------------------
// PART 14: REAL EXAMPLE - A TINY TO-DO LIST
// ------------------------------------------------------------
//
// Combines everything: select, create, listen, delegate.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let addBtn = document.getElementById("add-todo-btn");
// let todoInput = document.getElementById("todo-input");
// let todoList = document.getElementById("todo-list");
//
// addBtn.addEventListener("click", function () {
//   if (todoInput.value.trim() === "") return;   // ignore empty
//
//   let li = document.createElement("li");
//   li.textContent = todoInput.value;
//   todoList.appendChild(li);
//   todoInput.value = "";                        // clear the box
// });
//
// todoList.addEventListener("click", function (event) {
//   event.target.remove();   // click a todo to delete it
// });


// ------------------------------------------------------------
// PART 15: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Change the text of #main-title to your school's name.
// 2. Add a click listener to #action-btn that toggles the
//    "highlight" class on the title.
// 3. Create a new <li> "cherry" and append it to #fruit-list.
// 4. Use event delegation so clicking any card logs its text.
// 5. Extend the to-do example: only remove a todo if it is
//    clicked (hint: check event.target.tagName === "LI").
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. The DOM is the browser's live family tree of your HTML;
//    JavaScript uses it to read and change the page.
// 2. Select: getElementById (one, by id), querySelector
//    (first CSS match), querySelectorAll (all matches).
// 3. Change: textContent/innerHTML, setAttribute, style,
//    classList.add/remove/toggle.
// 4. Events: addEventListener("click", handler); the handler
//    receives an event object (event.target is the star).
// 5. Delegate: one listener on the parent handles clicks from
//    all current AND future children.
// 6. Create: createElement -> decorate -> appendChild.
//    Remove: element.remove().
// ============================================================

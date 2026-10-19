// ============================================================
// SELECTING ELEMENTS (getElementById, querySelector, querySelectorAll)
// - BEGINNER LESSON
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
// PART 1: WHY WE NEED SELECTION (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine a classroom of students. To give an assignment you
// must first CALL A NAME: "Ada!", "every student wearing
// glasses!", "the first person in the front row!".
//
// Selecting in the DOM works the same way: before JavaScript
// can touch an element, you must SELECT it by name, class,
// or position.


// ------------------------------------------------------------
// PART 2: getElementById - THE STUDENT'S ADMISSION NUMBER
// ------------------------------------------------------------
//
// Fastest, most direct selection. Returns ONE element (or
// null if the id does not exist).
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");

// console.log(title);
// console.log(typeof title);          // object - it IS the element
// console.log(document.getElementById("does-not-exist"));  // null


// ------------------------------------------------------------
// PART 3: querySelector - CSS SELECTORS, FIRST MATCH ONLY
// ------------------------------------------------------------
//
// One method that understands ANY CSS selector: #id, .class,
// tag, or even combinations like "ul li.highlight".
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// console.log(document.querySelector("#main-title"));   // by id
// console.log(document.querySelector(".card"));         // FIRST .card only
// console.log(document.querySelector("button"));        // first <button>
// console.log(document.querySelector("#fruit-list li"));// first li in that list


// ------------------------------------------------------------
// PART 4: querySelectorAll - GRAB EVERY MATCH
// ------------------------------------------------------------
//
// Returns a NodeList - like an array of elements. Use
// .length, forEach, or index access [0], [1], ...
// //
// // UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let cards = document.querySelectorAll(".card");

// console.log(cards);            // NodeList(3)
// console.log(cards.length);     // 3
// console.log(cards[0]);         // first card

// cards.forEach(function (card, index) {
//   console.log("Card " + (index + 1) + ": " + card.textContent);
// });


// ------------------------------------------------------------
// PART 5: null - WHAT IF NOTHING MATCHES?
// ------------------------------------------------------------
//
// If nothing matches, you get null. Then trying to use the
// element CRASHES. Always check before you use!

// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let ghost = document.querySelector("#i-do-not-exist");

// console.log(ghost);                    // null
// ghost.textContent = "hello";

// if (ghost !== null) {
//   ghost.textContent = "hello";
// } else {
//   console.log("Element not found - safe exit!");
// }


// ------------------------------------------------------------
// PART 6: WHICH ONE SHOULD I USE? (comparison)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// All three of these select the SAME element:
let byId    = document.getElementById("main-title");
let byQuery = document.querySelector("#main-title");

console.log(byId === byQuery);   // true - same element object!

// Rule of thumb:
// - One known id?            -> getElementById
// - Anything else?           -> querySelector
// - Many elements at once?   -> querySelectorAll + forEach


// ------------------------------------------------------------
// PART 7: REAL EXAMPLE - HIGHLIGHT EVERY CARD
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:
// const cards = document.querySelectorAll(".card");
// cards.forEach(function (card) {
//   card.classList.add("highlight");
// });
// // Refresh the page (F5) to clear the highlight.


// ------------------------------------------------------------
// PART 8: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Select the button using all THREE methods and confirm
//    they return the same element.
// 2. Select all <li> elements inside #fruit-list and print how
//    many there are.
// 3. Try selecting "#main-title" with querySelectorAll - what
//    do you get? (A NodeList with one item, not an element!)
// 4. Write a function "selectSafely(selector)" that returns the
//    element, or logs "Not found" when the result is null.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. Before using an element you must SELECT it.
// 2. getElementById("x") -> one element, by unique id, fastest.
// 3. querySelector(".card") -> FIRST match of any CSS selector.
// 4. querySelectorAll(".card") -> ALL matches in a NodeList;
//    loop with forEach.
// 5. No match = null - always check before using.
// ============================================================

// ============================================================
// MODIFYING ELEMENTS (innerHTML, textContent, setAttribute,
// classList) - BEGINNER LESSON
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
// PART 1: SELECTION IS STEP ONE, MODIFICATION IS STEP TWO
// ------------------------------------------------------------
//
// Selecting an element is like picking up a whiteboard marker.
// Modifying is actually WRITING on the board. In this lesson
// we change: TEXT, HTML, ATTRIBUTES and CLASSES.


// ------------------------------------------------------------
// PART 2: textContent - PLAIN TEXT, THE SAFE WAY
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let msg = document.getElementById("message");
//
// msg.textContent = "Written by JavaScript!";
//
// // Reading works too:
// console.log(msg.textContent);
//
// // textContent treats everything as PLAIN text.
// // Watch what happens with tags:
// msg.textContent = "I am <b>not</b> bold";   // tags shown literally!


// ------------------------------------------------------------
// PART 3: innerHTML - FULL HTML, THE POWERFUL (RISKY) WAY
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let msg = document.getElementById("message");
//
// msg.innerHTML = "I am <strong>actually bold</strong> now";
//
// // innerHTML PARSES tags. Powerful - but dangerous with user
// // input: a user could inject <script> or <img onerror=...>.
// // Rule: user text -> textContent. Trusted HTML -> innerHTML.


// ------------------------------------------------------------
// PART 4: innerText vs textContent - THE SUBTLE DIFFERENCE
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");
//
// title.style.display = "none";        // hide it with CSS
//
// console.log("innerText:    ", title.innerText);     // "" - respects hiding
// console.log("textContent:  ", title.textContent);   // full text anyway
//
// title.style.display = "";            // show it again
//
// // innerText = what a HUMAN sees. textContent = raw text.


// ------------------------------------------------------------
// PART 5: ATTRIBUTES WITH setAttribute AND friends
// ------------------------------------------------------------
//
// Attributes are the extra settings on a tag: href, src,
// id, class... setAttribute works on ANY of them.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let link = document.getElementById("my-link");
//
// link.setAttribute("href", "https://developer.mozilla.org");
// link.setAttribute("target", "_blank");       // open in new tab
// link.textContent = "MDN Web Docs";
//
// console.log(link.getAttribute("href"));      // read it back
//
// // For the common ones there are shortcuts:
// link.href = "https://javascript.info";
// link.id = "my-link";                         // back to original


// ------------------------------------------------------------
// PART 6: INLINE STYLE (quick and dirty)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");
//
// title.style.color = "tomato";
// title.style.backgroundColor = "lightyellow";  // note: camelCase!
// title.style.fontSize = "44px";
//
// // CSS "background-color" becomes JS "backgroundColor".


// ------------------------------------------------------------
// PART 7: classList - THE PROFESSIONAL WAY
// ------------------------------------------------------------
//
// CSS holds the styles; JS only switches classes on/off.
// This keeps styling and behaviour separated.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");
//
// title.classList.add("highlight");        // turn style ON
// title.classList.remove("highlight");     // turn style OFF
// title.classList.toggle("highlight");     // flip: on<->off
// title.classList.toggle("highlight");
//
// console.log(title.classList.contains("highlight"));  // true/false


// ------------------------------------------------------------
// PART 8: REAL EXAMPLE - DARK MODE SWITCH
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let body = document.body;
//
// function toggleDarkMode() {
//   body.classList.toggle("dark-mode");
// }
//
// // The .dark-mode class does not exist in index.html yet.
// // Add this CSS, then run toggleDarkMode() a few times:
// //
// //   .dark-mode { background: #1a1a2e; color: #eee; }
//
// toggleDarkMode();


// ------------------------------------------------------------
// PART 9: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Change #message with textContent to your name.
// 2. Then change it with innerHTML so part of it is bold.
// 3. Point #my-link at your favourite website and change its
//    text to match.
// 4. Toggle "highlight" on all three cards in one forEach.
// 5. Build a "reset" function that restores the original text
//    of #message and removes all highlights.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. textContent = plain text, safe and fast.
// 2. innerHTML = parses HTML tags, powerful but risky with
//    untrusted input.
// 3. innerText respects CSS visibility; textContent does not.
// 4. setAttribute(name, value) sets any attribute; getAttribute
//    reads it; .href/.id are common shortcuts.
// 5. style.* changes inline styles (camelCase property names).
// 6. classList add/remove/toggle/contains = the professional
//    way to change appearance.
// ============================================================

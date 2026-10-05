// ============================================================
// EVENT HANDLING (addEventListener, EVENT OBJECTS,
// EVENT DELEGATION) - BEGINNER LESSON
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
// PART 1: WHAT IS AN EVENT? (in the simplest way possible)
// ------------------------------------------------------------
//
// A web page is like a house with DOORBELL, SMOKE ALARM and a
// PHONE. They sit silent until something HAPPENS: someone
// presses the bell, smoke rises, the phone rings.
//
// In the browser those happenings are EVENTS: a click, a
// keypress, the mouse moving, a form submitting.
//
// Event handling = "WHEN this happens, DO that."
// addEventListener is how you write that sentence in JS.


// ------------------------------------------------------------
// PART 2: YOUR FIRST LISTENER
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let button = document.getElementById("action-btn");
//
// button.addEventListener("click", function () {
//   alert("You clicked the button!");
// });
//
// // Click the button on the page. Every click = one alert.
// // Refresh (F5) to remove the listener.


// ------------------------------------------------------------
// PART 3: OTHER EVENT TYPES
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let input = document.getElementById("name-input");
//
// input.addEventListener("input", function () {
//   console.log("Typed so far:", input.value);
// });
//
// input.addEventListener("keydown", function () {
//   console.log("A key was pressed!");
// });
//
// // Also try: "mouseover", "mouseout", "dblclick", "submit".


// ------------------------------------------------------------
// PART 4: THE EVENT OBJECT (the browser's incident report)
// ------------------------------------------------------------
//
// When an event happens, the browser builds an EVENT OBJECT
// and hands it to your function. It knows WHAT happened,
// WHERE and to WHOM.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let title = document.getElementById("main-title");
//
// title.addEventListener("click", function (event) {
//   console.log("Type of event:  ", event.type);        // "click"
//   console.log("Element hit:    ", event.target);      // what was clicked
//   console.log("Mouse position: ", event.clientX, event.clientY);
// });


// ------------------------------------------------------------
// PART 5: NAMED FUNCTIONS AS HANDLERS
// ------------------------------------------------------------
//
// A named handler can be attached AND removed later.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let button = document.getElementById("action-btn");
//
// function shout() {
//   console.log("BUTTON WAS CLICKED!");
// }
//
// button.addEventListener("click", shout);
//
// // Later, to stop listening:
// // button.removeEventListener("click", shout);
// // (must pass the SAME function - arrow functions cannot be
// // removed this way because each one is unique)


// ------------------------------------------------------------
// PART 6: EVENT BUBBLING (clicks ripple UP the tree)
// ------------------------------------------------------------
//
// Click a child and the event FIRES on the child first, then
// on its parent, then grandparent - like bubbles rising in a
// glass of water. This is called BUBBLING, and it is the key
// that makes delegation possible.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let list = document.getElementById("fruit-list");
//
// list.addEventListener("click", function () {
//   console.log("Parent <ul> heard a click from one of its children");
// });
//
// // Now click any fruit - the parent reacts, even though the
// // listener is on the <ul>, not the <li>.


// ------------------------------------------------------------
// PART 7: EVENT DELEGATION (one listener for all children)
// ------------------------------------------------------------
//
// Because of bubbling, ONE parent listener can serve every
// child. We check event.target to see who was actually hit.
//
// Benefits: less memory, and it works for elements CREATED
// LATER too.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let list = document.getElementById("fruit-list");
//
// list.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     console.log("Clicked fruit:", event.target.textContent);
//     event.target.classList.toggle("highlight");
//   }
// });
//
// // Click "Add fruit" to create a NEW item, then click it.
// // It responds instantly - no new listener needed!


// ------------------------------------------------------------
// PART 8: REAL EXAMPLE - CLICK-TO-DELETE TODOS
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let addBtn = document.getElementById("add-todo-btn");
// let todoInput = document.getElementById("todo-input");
// let todoList = document.getElementById("todo-list");
//
// addBtn.addEventListener("click", function () {
//   if (todoInput.value.trim() === "") return;
//
//   let li = document.createElement("li");
//   li.textContent = todoInput.value;
//   todoList.appendChild(li);
//   todoInput.value = "";
// });
//
// todoList.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     event.target.remove();
//   }
// });
//
// // Add 3 todos, then click each one to delete it.


// ------------------------------------------------------------
// PART 9: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Add a listener to #action-btn that logs "Clicked!" on
//    every click.
// 2. Show a live character count of #name-input as the user
//    types (hint: "input" event, .value.length).
// 3. Use delegation on #fruit-list: double-clicking a fruit
//    ("dblclick") removes it.
// 4. Log the key the user pressed using event.key.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. Events are happenings: click, input, keydown, submit...
// 2. addEventListener("click", handler) = "when this, do that".
// 3. The handler receives an EVENT OBJECT: event.type,
//    event.target, event.clientX...
// 4. Clicks BUBBLE UP from child to parent.
// 5. Delegation = one listener on the parent + event.target
//    checks -> serves current AND future children.
// ============================================================

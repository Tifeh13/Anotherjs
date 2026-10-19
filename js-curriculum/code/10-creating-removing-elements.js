// ============================================================
// CREATING AND REMOVING ELEMENTS (createElement, appendChild,
// removeChild) - BEGINNER LESSON
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
// PART 1: BUILDING THE PAGE LIKE LEGO
// ------------------------------------------------------------
//
// Every element on the page is a LEGO BRICK JavaScript built
// and clicked into place. Creating elements = making new
// bricks. appendChild = snapping them onto the page.
// Removing = taking a brick off again.
//
// The recipe NEVER changes:
//   1. CREATE the brick     (createElement)
//   2. DECORATE it          (textContent, classList, ...)
//   3. ATTACH it            (appendChild)


// ------------------------------------------------------------
// PART 2: CREATE AND ATTACH YOUR FIRST ELEMENT
// ------------------------------------------------------------
//
// // UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let newPara = document.createElement("p");     // 1. create (invisible yet!)
// newPara.textContent = "I was built by JS!";    // 2. decorate
// document.body.appendChild(newPara);            // 3. attach - now visible

// // createElement makes the element but it floats in memory,
// // UNATTACHED, until appendChild snaps it onto the page.


// ------------------------------------------------------------
// PART 3: DECORATING BEFORE ATTACHING
// ------------------------------------------------------------
//
// You can decorate BEFORE or AFTER attaching. Doing it before
// is neater - the browser paints the finished product at once.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let card = document.createElement("div");
// card.classList.add("card");
// card.textContent = "A brand new card";
// card.style.borderColor = "tomato";

// document.body.appendChild(card);


// ------------------------------------------------------------
// PART 4: APPEND TO A SPECIFIC PARENT
// ------------------------------------------------------------
//
// appendChild attaches as the LAST child of any parent you
// choose - not just body.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let fruit = document.createElement("li");
// fruit.textContent = "Cherry";

// document.getElementById("fruit-list").appendChild(fruit);
// //
// // Scroll down to the fruit list - cherry joined at the end.


// ------------------------------------------------------------
// PART 5: append VS appendChild
// ------------------------------------------------------------
//
// appendChild returns the child and only accepts ELEMENT
// nodes. The modern .append() accepts text AND elements, and
// several at once.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let list = document.getElementById("fruit-list");
//
// list.append("Papaya", document.createElement("li"));  // text + element
//
// // Note: appendChild would THROW on that plain string.


// ------------------------------------------------------------
// PART 6: INSERTING IN A SPECIFIC SPOT
// ------------------------------------------------------------
//
// appendChild always adds at the END. To cut in line, use
// insertBefore or prepend.
// //
// // UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let list = document.getElementById("fruit-list");
// let firstFruit = list.children[0];          // current first item

// let newFirst = document.createElement("li");
// newFirst.textContent = "Apple (first!)";

// list.insertBefore(newFirst, firstFruit);    // before the old first

// // Or straight to the very top:
// let topFruit = document.createElement("li");
// topFruit.textContent = "Avocado (top!)";
// list.prepend(topFruit);


// ------------------------------------------------------------
// PART 7: REMOVING ELEMENTS
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let firstCard = document.querySelector(".card");

// firstCard.remove();   // modern way - the element removes itself
//
// // The classic (older) pattern - still in every codebase:
// // parent.removeChild(child)


// ------------------------------------------------------------
// PART 8: BUILDING A LIST FROM DATA (the pro pattern)
// ------------------------------------------------------------
//
// Real apps render data. The pattern: LOOP over data, BUILD
// an element per item, APPEND each one.
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let students = ["Ada", "Chinedu", "Bola", "Ngozi"];
// let ul = document.createElement("ul");

// students.forEach(function (name) {
//   let li = document.createElement("li");
//   li.textContent = name;
//   ul.appendChild(li);
// });

// document.body.appendChild(ul);
//
// // Change the array, run again - the page follows the data.


// ------------------------------------------------------------
// PART 9: REAL EXAMPLE - A "CLEAR COMPLETED" BUTTON
// ------------------------------------------------------------
//
// UNCOMMENT BELOW, PASTE IN CONSOLE AND RUN IT:

// let btn = document.createElement("button");
// btn.textContent = "Clear my new list";
// document.body.appendChild(btn);

// btn.addEventListener("click", function () {
//   document.querySelectorAll("ul li").forEach(function (li) {
//     li.remove();
//   });
// });
//
// // Careful: this clears ALL lists on the playground page.


// ------------------------------------------------------------
// PART 10: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Create an <h2> "My shopping list" and prepend it to body.
// 2. Build an array of 5 items, then render each as an <li>
//    inside a new <ul>.
// 3. Add a class "card" to the <ul> you built.
// 4. Create a button that removes only the LAST item of
//    #fruit-list (hint: .lastElementChild.remove()).
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. createElement("tag") makes a NEW element (in memory only).
// 2. Decorate it: textContent, classList, style...
// 3. appendChild(parent) or .append() snaps it onto the page.
// 4. appendChild = last child; prepend/insertBefore = custom spots.
// 5. .remove() deletes an element (parent.removeChild(child)
//    is the classic equivalent).
// 6. Big idea: LOOP over data -> build -> append. That is how
//    real apps render lists.
// ============================================================

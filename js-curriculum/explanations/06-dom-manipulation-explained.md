# 06 - DOM Manipulation (Explained)

Matching files: `code/06-dom-manipulation.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to reset.

---

## PART 1: What is the DOM?

Your HTML page is a **family tree**: `<html>` the grandparent, `<body>` the parent, and every heading, button and paragraph a child on a branch.

The **DOM** (Document Object Model) is JavaScript's **live map** of that tree. Through it, JS can find any element, change it, delete it, or create new ones — while you watch.

---

## PART 2: The document object

`document` is a built-in object the browser hands you — it represents the whole page. Every DOM journey starts here.

```js
console.log(document);
console.log(document.title);   // "DOM Playground - JS Lessons 06-09"
console.log(document.body);    // the <body> element
```

**Output:** the whole document, the page title, and the body element.

---

## PART 3: getElementById — find one element by its ID

An `id` is like an admission number: **unique** on the page. This is the fastest, most direct selection.

```js
let heading = document.getElementById("main-title");

console.log(heading);              // the <h1> element
console.log(heading.textContent);  // "DOM Playground"
```

- Returns the element itself, or `null` if no such id exists.

---

## PART 4: querySelector — first match with CSS

`querySelector` accepts **any CSS selector** and returns the **first** matching element.

```js
let firstCard = document.querySelector(".card");      // first .card
let button    = document.querySelector("#action-btn"); // by id
let listItem  = document.querySelector("ul li");       // first li in a ul

console.log(firstCard, button, listItem);
```

- One method to rule them all: `#id`, `.class`, `tag`, and combinations like `"ul li.highlight"`.

---

## PART 5: querySelectorAll — find all matches

Returns a **NodeList** — a list of elements supporting `.length`, `[index]` and `forEach`.

```js
let allCards = document.querySelectorAll(".card");

console.log(allCards);          // NodeList(3)
console.log(allCards.length);   // 3

allCards.forEach(function (card) {
  console.log(card.textContent);
});
```

**Output:** all three cards listed one by one.

---

## PART 6: innerHTML vs innerText vs textContent

Three ways to read/write an element's content:

| Property | What it does | Watch out |
|---|---|---|
| `innerHTML` | gets/sets the **HTML inside** — tags are parsed | risky with user input (injection) |
| `innerText` | the **visible** text | respects CSS hiding, slower |
| `textContent` | **all raw text** | ignores CSS, faster, safe |

```js
let msg = document.getElementById("message");

msg.textContent = "Set with textContent - plain and safe.";
msg.innerHTML = "Set with <strong>innerHTML</strong> - tags work!";

console.log(msg.innerText);     // what a human sees
console.log(msg.textContent);   // raw text including tag names
```

- Rule of thumb: user-supplied text → `textContent`. Trusted HTML → `innerHTML`.

---

## PART 7: setAttribute and style

```js
let link = document.querySelector("#my-link");

link.setAttribute("href", "https://developer.mozilla.org");
link.setAttribute("target", "_blank");
link.textContent = "Go to MDN docs";

let title = document.getElementById("main-title");
title.style.color = "tomato";
title.style.fontSize = "48px";
```

- `setAttribute(name, value)` works on any attribute.
- Inline styles use **camelCase**: CSS `font-size` becomes JS `fontSize`.

---

## PART 8: classList — add, remove, toggle

The professional way to change looks: styles live in CSS classes; JS only switches classes.

```js
let title = document.getElementById("main-title");

title.classList.add("highlight");      // turn on
title.classList.remove("highlight");   // turn off
title.classList.toggle("highlight");   // flip: on <-> off

console.log(title.classList.contains("highlight"));   // true/false
```

---

## PART 9: Creating elements

Three steps, always the same:

1. **CREATE** — `document.createElement("p")` (exists in memory only!)
2. **DECORATE** — text, classes, styles
3. **ATTACH** — `parent.appendChild(el)`

```js
let newPara = document.createElement("p");
newPara.textContent = "I was born from JavaScript!";
newPara.classList.add("card");

document.body.appendChild(newPara);   // appears at the end of body
```

---

## PART 10: Removing elements

```js
let firstCard = document.querySelector(".card");
firstCard.remove();   // modern, simple
```

- The classic equivalent is `parent.removeChild(child)` — you will meet it in older code.

---

## PART 11: Event handling — listening for clicks

`addEventListener` = "**when** X happens, **do** Y." The function you pass is the event **handler**.

```js
let button = document.getElementById("action-btn");

button.addEventListener("click", function () {
  alert("You clicked me!");
});
```

- Common events: `click`, `input`, `keydown`, `mouseover`, `submit`.

---

## PART 12: The event object

The browser passes the handler an **event object** describing what happened.

```js
let input = document.getElementById("name-input");

input.addEventListener("input", function (event) {
  console.log("Current value:", event.target.value);   // live typing
});

document.getElementById("main-title").addEventListener("click", function (e) {
  console.log("Click at X:", e.clientX, "Y:", e.clientY);
});
```

- `event.target` — the element the event happened on (the star of delegation).
- `event.type`, `event.clientX/Y` — what and where.

---

## PART 13: Event delegation

Instead of a listener on **every** child, put **one** on the parent. The click *bubbles up* from the child; check `event.target` to see who was hit.

```js
let list = document.getElementById("fruit-list");

list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("You clicked:", event.target.textContent);
    event.target.classList.toggle("highlight");
  }
});
```

- `event.target.tagName` is **UPPERCASE** (`"LI"`, not `"li"`).
- Items created **later** respond automatically — no new listener needed.

---

## PART 14: Real example — a tiny to-do list

Combines everything: select, create, listen, delegate.

```js
let addBtn    = document.getElementById("add-todo-btn");
let todoInput = document.getElementById("todo-input");
let todoList  = document.getElementById("todo-list");

addBtn.addEventListener("click", function () {
  if (todoInput.value.trim() === "") return;   // ignore empty

  let li = document.createElement("li");
  li.textContent = todoInput.value;
  todoList.appendChild(li);
  todoInput.value = "";                        // clear the box
});

todoList.addEventListener("click", function (event) {
  event.target.remove();   // click a todo to delete it
});
```

- `.trim()` strips whitespace so a space-only entry is treated as empty.

---

## PART 15: Try it yourself

Practice tasks — renaming the title, toggling the highlight class from a button click, appending "cherry" to the fruit list, delegated card logging, and making to-do removal check `event.target.tagName === "LI"`. Students build these in the console themselves.

---

## Quick summary

1. The DOM is the browser's live family tree of your HTML; JS drives it through `document`.
2. Select: `getElementById`, `querySelector` (first match), `querySelectorAll` (all matches).
3. Change: `textContent`/`innerHTML`, `setAttribute`, `style`, `classList.add/remove/toggle`.
4. Events: `addEventListener("click", handler)`; the handler receives the event object (`event.target` is the star).
5. Delegate: one parent listener serves current **and** future children.
6. Create → decorate → `appendChild`; remove with `.remove()`.

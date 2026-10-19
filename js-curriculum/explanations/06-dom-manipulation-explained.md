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
let listItem  = document.querySelector("ul li li");       // first li in a ul

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

---






























































































# EXTRA: The DOM Explained a Different Way (Version 2)

> Same lesson, a new angle. Read this after (or instead of) the version above — whichever one clicks for you.

## The one-sentence idea

Your browser reads your HTML and builds a **live JavaScript copy** of the page. That copy is the **DOM**. Whatever JavaScript does to the DOM, the screen shows **instantly** — no refresh, no reload.

If HTML is a robot's skeleton and CSS is its paint and clothes, then JS is the muscles — and the DOM is the **nervous system**: the wiring that lets JS feel and move every part.

## Step 1: Find the element (you can't change what you can't find)

Three ways to search, three classroom analogies:

| You want | Use | Like a teacher saying |
|---|---|---|
| the one element with a unique `id` | `document.getElementById("main-title")` | "Ada, stand up!" (the admission number) |
| the first match of any CSS selector | `document.querySelector(".card")` | "First person in a red hat, stand up!" |
| **all** matches | `document.querySelectorAll(".card")` | "Everyone in a red hat, line up!" |

Three habits to build from day one:

1. Selection returns the element itself, so you can chain: `document.getElementById("message").textContent = "Hi!"`. But don't overdo it — saving the element in a variable keeps code readable.
2. No match → `null`. Using `null` like an element is a crash. An `if (el) { ... }` check costs nothing and saves hours of debugging.
3. `querySelectorAll` gives a **NodeList**, not an Array. `.length`, `[0]` and `.forEach` work; `.map` and `.filter` do not (convert with `Array.from(list)` if you ever need array powers).

## Step 2: Change what the element says

Three properties, one job each:

- `textContent` — replaces **all** inner content with plain text. Safe with user input.
- `innerHTML` — replaces the content **and lets the browser parse HTML tags**. Powerful but dangerous: never feed it raw user input, or someone typing `<img src=x onerror=...>` gets code running on your page (an XSS attack).
- `innerText` — like `textContent`, but it "looks" at the page: text hidden by CSS stays hidden. Slower, occasionally handy.

Memory hook: **Content = textContent · Markup = innerHTML · Visible = innerText.**

## Step 3: Change how it looks

Two routes:

- Direct: `el.style.backgroundColor = "gold"` — every CSS dash becomes the next word's capital: `font-size` → `fontSize`, `border-radius` → `borderRadius`.
- The **pro route** — define a CSS class once, then flip it from JS:

```js
title.classList.add("highlight");      // switch on
title.classList.remove("highlight");   // switch off
title.classList.toggle("highlight");   // flip: on <-> off
title.classList.contains("highlight"); // is it on? true / false
```

Why is `classList` "professional"? Because styling rules stay in CSS where they belong, and JS only makes decisions. Designers edit the CSS; your JS never touches a style value.

## Step 4: Attributes

`el.setAttribute("href", "https://developer.mozilla.org")` sets any attribute; `el.getAttribute("href")` reads it back. Popular attributes also have shortcuts (`el.id`, `el.href`, `el.value`), but `setAttribute` always works.

## Step 5: Build new elements (and tear them down)

A new element is **invisible until attached**. Think of a LEGO brick snapped together in your hand — it only appears once you press it onto the model.

```js
let li = document.createElement("li");    // 1. CREATE (in memory only!)
li.textContent = "Cherry";                // 2. DECORATE
document.getElementById("fruit-list").appendChild(li);  // 3. ATTACH
```

`el.remove()` deletes it. Older code says `parent.removeChild(el)` — same result, more typing.

## Step 6: Make the page react (events)

`addEventListener` installs a **doorbell**. Installing it changes nothing on screen; the code inside runs **only when someone presses**.

```js
button.addEventListener("click", function () {
  alert("Pressed!");
});
```

- `"click"` is the event; the function is the **handler** — the page's reaction.
- The handler runs **later**, only when the event happens. That's why nothing prints the moment you paste this into the console.
- When the event fires, the browser hands your handler an **event object** — a note the visitor leaves behind: who they were (`event.target`), what they did (`event.type`), where they clicked (`event.clientX` / `event.clientY`). For inputs, `event.target.value` is the live typed text.

## Step 7: Event delegation — one doorbell for the whole building

A click on a child doesn't stop there: it **bubbles up** through its ancestors, like a bubble rising through water. So instead of giving every `<li>` its own doorbell, put **one** on the `<ul>` and check `event.target` to see which item the bubble came from:

```js
list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {   // tagName is ALWAYS UPPERCASE
    event.target.classList.toggle("highlight");
  }
});
```

The superpower: items added **later** are covered automatically — the listener lives on the parent, not on the children.

## Step 8: Everything together — the to-do list, line by line

```js
let addBtn    = document.getElementById("add-todo-btn");  // find
let todoInput = document.getElementById("todo-input");    //   the
let todoList  = document.getElementById("todo-list");     //     players

addBtn.addEventListener("click", function () {            // install doorbell
  if (todoInput.value.trim() === "") return;              // guard: ignore empty
  let li = document.createElement("li");                  // CREATE
  li.textContent = todoInput.value;                       // DECORATE
  todoList.appendChild(li);                               // ATTACH
  todoInput.value = "";                                   // reset the box
});

todoList.addEventListener("click", function (event) {     // ONE doorbell for all
  event.target.remove();                                  // click a todo → gone
});
```

**Find → listen → create → attach → reset.** Almost every interactive widget you will ever build is a variation of this loop.

## Common beginner mistakes (learn them now, thank yourself later)

1. **Selecting before the page exists.** Scripts run top-to-bottom; if your `<script>` sits above the HTML it needs, `getElementById` returns `null`. That's why the script lives at the bottom of `<body>` in `index.html`.
2. **Forgetting the null check** — `Cannot read properties of null` is the most common DOM crash (you met it in Lesson 05!).
3. **`innerHTML` + user input** — an open door for XSS. Use `textContent` for anything a user typed.
4. **`tagName` is uppercase** — compare with `"LI"`, never `"li"`.
5. **CSS dashes in JS styles** — `style.font-size` is a syntax error; it's `style.fontSize`.
6. **Expecting a NodeList to be an Array** — `forEach` yes, `map` no.

## 60-second cheat sheet

| Task | Code |
|---|---|
| find one by id | `document.getElementById("main-title")` |
| find first CSS match | `document.querySelector(".card")` |
| find all matches | `document.querySelectorAll(".card")` |
| read / change text | `el.textContent` |
| change HTML inside | `el.innerHTML` *(trusted input only)* |
| set an attribute | `el.setAttribute("href", url)` |
| change look | `el.style.color = "red"` or `el.classList.toggle("x")` |
| create + attach | `document.createElement("li")` → decorate → `parent.appendChild(li)` |
| delete | `el.remove()` |
| react to clicks | `el.addEventListener("click", handler)` |
| who was clicked? | `event.target` |
| one listener, many children | delegation on the parent + `event.target` |

## Test yourself (answers below — no peeking)

1. What does `querySelector` return when nothing matches?
2. Which property would you use to display text a user typed — and why not the other one?
3. Why does a listener on the `<ul>` also catch clicks on `<li>`s added next week?
4. `title.style.font-size = "48px";` — what's wrong?

**Answers:** 1. `null`. 2. `textContent` — `innerHTML` would run any HTML the user typed (XSS risk). 3. Clicks bubble up to the parent, and the handler inspects `event.target` at click time, so future items are covered automatically. 4. CSS dashes become camelCase in JS: `style.fontSize`.

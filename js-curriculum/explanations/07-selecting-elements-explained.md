# 07 - Selecting Elements (Explained)

Matching files: `code/07-selecting-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter.

---

## PART 1: Why we need selection

Before JavaScript can touch an element, it must **select** it — like a teacher calling a name: "Ada!", "everyone wearing glasses!", "first person in the front row!".

Selection happens by **id**, **class**, **tag**, or **position**.

---

## PART 2: getElementById — the admission number

The fastest, most direct selection. Returns **one** element (or `null` if the id does not exist).

```js
let title = document.getElementById("main-title");

console.log(title);                                   // the <h1>
console.log(typeof title);                            // object - it IS the element
console.log(document.getElementById("does-not-exist")); // null
```

- IDs must be unique — so this can only ever return one element.

**Output:** the heading element, `"object"`, and `null`.

---

## PART 3: querySelector — CSS selectors, first match only

One method that understands **any CSS selector** you already know from styling:

```js
console.log(document.querySelector("#main-title"));      // by id
console.log(document.querySelector(".card"));            // FIRST .card only
console.log(document.querySelector("button"));           // first <button>
console.log(document.querySelector("#fruit-list li"));   // first li in that list
```

- `"#fruit-list li"` means: the element with id `fruit-list`, then the first `li` inside it — descendant selectors work exactly as in CSS.

---

## PART 4: querySelectorAll — grab every match

Returns a **NodeList** of all matches — supports `.length`, index access and `forEach`.

```js
let cards = document.querySelectorAll(".card");

console.log(cards);            // NodeList(3)
console.log(cards.length);     // 3
console.log(cards[0]);         // first card

cards.forEach(function (card, index) {
  console.log("Card " + (index + 1) + ": " + card.textContent);
});
```

**Output:**
```
Card 1: Card 1 - I am a div with class "card"
Card 2: Card 2 - try selecting all of us
Card 3: Card 3 - querySelectorAll finds us all
```

---

## PART 5: null — what if nothing matches?

No match → `null`. Then using the "element" **crashes** — check before you use it.

```js
let ghost = document.querySelector("#i-do-not-exist");

console.log(ghost);   // null

ghost.textContent = "hello";   // TypeError: Cannot set properties of null

if (ghost !== null) {
  ghost.textContent = "hello";
} else {
  console.log("Element not found - safe exit!");
}
```

- `null` check = defensive programming. Real apps select dynamically, so misses happen.

**Output:** `null` and `Element not found - safe exit!`

---

## PART 6: Which one should I use?

```js
let byId    = document.getElementById("main-title");
let byQuery = document.querySelector("#main-title");

console.log(byId === byQuery);   // true - same element object!
```

Rule of thumb:

- **One known id?** → `getElementById`
- **Anything else?** → `querySelector`
- **Many elements at once?** → `querySelectorAll` + `forEach`

**Output:** `true`

---

## PART 7: Real example — highlight every card

```js
document.querySelectorAll(".card").forEach(function (card) {
  card.classList.add("highlight");
});
```

- Select-all + loop + modify: the most common DOM pattern in real apps.
- Refresh (F5) to clear the highlight.

---

## PART 8: Try it yourself

Practice tasks — selecting the button all three ways and comparing, counting the fruit `li`s, checking what `querySelectorAll("#main-title")` returns (a NodeList with one item — **not** an element!), and writing a `selectSafely(selector)` helper. Students build these in the console themselves.

---

## Quick summary

1. Selection always comes before manipulation.
2. `getElementById("x")` — one element, unique id, fastest.
3. `querySelector(".card")` — **first** match of any CSS selector.
4. `querySelectorAll(".card")` — **all** matches in a NodeList; loop with `forEach`.
5. No match returns `null` — always check before using.














# 07 - Selecting Elements (Explained)

Matching files: `code/07-selecting-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter.

---

## PART 1: Why we need selection

A web page is a tree of elements (the DOM). Before JavaScript can change, hide, or read anything on the page, it must **find** that element first. This step is called **selection**.

Think of a teacher in a classroom. She can call:

- one student by **admission number** → "Number 24!" (id)
- a **group** → "Everyone wearing glasses!" (class)
- by **position** → "First person in the front row!" (first match)

Selection always comes **first**, and changing the element comes **second**:

```js
let title = document.getElementById("main-title");   // 1. find it
title.textContent = "Hello!";                        // 2. change it
```

- No selection = nothing to change. Every DOM task starts here.

---

## PART 2: getElementById — the admission number

The fastest, most direct selection. Returns **one** element (or `null` if the id does not exist).

```js
let title = document.getElementById("main-title");

console.log(title);                                   // the <h1>
console.log(typeof title);                            // object - it IS the element
console.log(document.getElementById("does-not-exist")); // null
```

- IDs must be unique — so this can only ever return one element.
- Write the id **without** `#`. `getElementById("#main-title")` will NOT work.
- The result is the real element itself, so you can use it straight away (`title.textContent = ...`).

**Output:** the heading element, `"object"`, and `null`.

---

## PART 3: querySelector — CSS selectors, first match only

One method that understands **any CSS selector** you already know from styling:

```js
console.log(document.querySelector("#main-title"));      // by id
console.log(document.querySelector(".card"));            // FIRST .card only
console.log(document.querySelector("button"));           // first <button>
console.log(document.querySelector("#fruit-list li"));  // first li in that list
```

- Here you **do** write the symbol: `#` for id, `.` for class, nothing for a tag.
- `"#fruit-list li"` means: the element with id `fruit-list`, then the first `li` inside it — descendant selectors work exactly as in CSS.
- Even if 10 elements match, you only get the **first** one.
- If nothing matches, you get `null`.

---

## PART 4: querySelectorAll — grab every match

Returns a **NodeList** of all matches — a list-like collection (not a real array) that supports `.length`, index access and `forEach`.

```js
let cards = document.querySelectorAll(".card");

console.log(cards);            // NodeList(3)
console.log(cards.length);     // 3
console.log(cards[0]);         // first card

cards.forEach(function (card, index) {
  console.log("Card " + (index + 1) + ": " + card.textContent);
});
```

**Output:**
```
Card 1: Card 1 - I am a div with class "card"
Card 2: Card 2 - try selecting all of us
Card 3: Card 3 - querySelectorAll finds us all
```

- `forEach` runs the function once per element: `card` is the element, `index` is its position (starting at 0).
- If nothing matches you get an **empty** NodeList (`length` is `0`), **not** `null`.

---

## PART 5: null — what if nothing matches?

No match → `null`. Then using the "element" **crashes** — check before you use it.

```js
let ghost = document.querySelector("#i-do-not-exist");

console.log(ghost);   // null

// ghost.textContent = "hello";   // TypeError: Cannot set properties of null

if (ghost !== null) {
  ghost.textContent = "hello";
} else {
  console.log("Element not found - safe exit!");
}
```

- `null` check = defensive programming. Real apps select dynamically, so misses happen.
- If you ever see **"Cannot set properties of null"** or **"Cannot read properties of null"**, check these three things:
  1. A typo in the id or class name.
  2. A missing `#` or `.` inside `querySelector`.
  3. Your script runs **before** the element exists on the page.

**Output:** `null` and `Element not found - safe exit!`

---

## PART 6: Which one should I use?

```js
let byId    = document.getElementById("main-title");
let byQuery = document.querySelector("#main-title");

console.log(byId === byQuery);   // true - same element object!
```

Rule of thumb:

- **One known id?** → `getElementById`
- **Anything else?** → `querySelector`
- **Many elements at once?** → `querySelectorAll` + `forEach`

Side-by-side:

| Method | What you pass | Returns | Nothing found |
|---|---|---|---|
| `getElementById("x")` | id only, no `#` | one element | `null` |
| `querySelector(".x")` | any CSS selector | first matching element | `null` |
| `querySelectorAll(".x")` | any CSS selector | NodeList of all matches | empty NodeList |

**Output:** `true`

---

## PART 7: Real example — highlight every card

```js
document.querySelectorAll(".card").forEach(function (card) {
  card.classList.add("highlight");
});
```

- Select-all + loop + modify: the most common DOM pattern in real apps.
- Refresh (F5) to clear the highlight.

**Common mistake — treating a list like one element:**

```js
document.querySelectorAll(".card").textContent = "Hi";   // ❌ a NodeList has no single textContent to set

document.querySelectorAll(".card").forEach(function (card) {
  card.textContent = "Hi";                                // ✅ loop, then change each element
});
```

---

## PART 8: Try it yourself

Practice tasks — students build these in the console themselves:

1. Select the button all three ways (`getElementById`, `querySelector("#id")`, `querySelector("button")`) and compare them with `===`.
2. Count the fruit `li`s using `querySelectorAll`.
3. Check what `querySelectorAll("#main-title")` returns — a NodeList with one item, **not** an element! (You need `[0]` to get the element.)
4. Write a `selectSafely(selector)` helper that returns the element, or logs a message if it is not found.

---

## Quick summary

1. Selection always comes before manipulation.
2. `getElementById("x")` — one element, unique id, fastest, no `#`.
3. `querySelector(".card")` — **first** match of any CSS selector, `null` if none.
4. `querySelectorAll(".card")` — **all** matches in a NodeList; loop with `forEach`; empty list if none.
5. No match returns `null` — always check before using.
6. One element vs. a list is the #1 beginner mix-up: a NodeList is not an element.
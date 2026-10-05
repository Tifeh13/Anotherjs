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

// ghost.textContent = "hello";   // TypeError: Cannot set properties of null

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

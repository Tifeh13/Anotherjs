# 10 - Creating and Removing Elements (Explained)

Matching files: `code/10-creating-removing-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to reset the page between blocks.

---

## PART 1: Building the page like LEGO

Every element on the page is a **LEGO brick** JavaScript built and clicked into place:

- **Creating** elements = making new bricks
- **appendChild** = snapping them onto the page
- **Removing** = taking a brick off again

The recipe never changes:

1. **CREATE** the brick — `createElement`
2. **DECORATE** it — `textContent`, `classList`, `style`...
3. **ATTACH** it — `appendChild`

---

## PART 2: Create and attach your first element

```js
let newPara = document.createElement("p");     // 1. create (invisible yet!)
newPara.textContent = "I was built by JS!";    // 2. decorate
document.body.appendChild(newPara);            // 3. attach - now visible
```

- `createElement` makes the element but it **floats in memory, unattached** — nothing appears on screen.
- Only `appendChild` snaps it onto the page, as the **last child** of body.

**Output:** a new paragraph at the very bottom of the page.

---

## PART 3: Decorating before attaching

You can decorate before **or** after attaching. Doing it first is neater — the browser paints the finished product in one go.

```js
let card = document.createElement("div");
card.classList.add("card");
card.textContent = "A brand new card";
card.style.borderColor = "tomato";

document.body.appendChild(card);
```

**Output:** a fully styled card appears — never a half-dressed flash of content.

---

## PART 4: Append to a specific parent

`appendChild` attaches as the **last child** of any parent you choose — not just body.

```js
let fruit = document.createElement("li");
fruit.textContent = "Cherry";

document.getElementById("fruit-list").appendChild(fruit);
```

**Output:** "Cherry" joins the fruit list at the end.

---

## PART 5: append vs appendChild

```js
let list = document.getElementById("fruit-list");

list.append("Papaya", document.createElement("li"));   // text + element
```

- `appendChild` — the classic: **element nodes only**, returns the child.
- `append` — modern: accepts **text and elements**, several at once; `appendChild` would **throw** on that plain string.

**Output:** the text "Papaya" plus an empty `li` appear in the list.

---

## PART 6: Inserting in a specific spot

`appendChild` always adds at the end. To cut in line:

```js
let list = document.getElementById("fruit-list");
let firstFruit = list.children[0];            // current first item

let newFirst = document.createElement("li");
newFirst.textContent = "Apple (first!)";

list.insertBefore(newFirst, firstFruit);      // before the old first

let topFruit = document.createElement("li");
topFruit.textContent = "Avocado (top!)";
list.prepend(topFruit);                       // straight to the very top
```

- `insertBefore(newNode, referenceNode)` — inserts between existing bricks.
- `prepend` — first child; the mirror of `append`.

**Output:** "Avocado (top!)" first, then "Apple (first!)", then the original fruits.

---

## PART 7: Removing elements

```js
let firstCard = document.querySelector(".card");

firstCard.remove();   // modern way - the element removes itself
```

- The classic pattern — still in every older codebase:

```js
// parent.removeChild(child)
```

**Output:** the first card vanishes from the page.

---

## PART 8: Building a list from data (the pro pattern)

Real apps **render data**. The pattern: loop over data → build an element per item → append each one.

```js
let students = ["Ada", "Chinedu", "Bola", "Ngozi"];
let ul = document.createElement("ul");

students.forEach(function (name) {
  let li = document.createElement("li");
  li.textContent = name;
  ul.appendChild(li);
});

document.body.appendChild(ul);
```

- Build the container **first**, fill it item by item, attach it **once** at the end — one reflow instead of many.
- Change the array, run again — the page follows the data.

**Output:** a four-name list at the bottom of the page.

---

## PART 9: Real example — a "clear completed" button

Elements created by JS can get their own listeners immediately:

```js
let btn = document.createElement("button");
btn.textContent = "Clear my new list";
document.body.appendChild(btn);

btn.addEventListener("click", function () {
  document.querySelectorAll("ul li").forEach(function (li) {
    li.remove();
  });
});
```

- Warning: this clears **all** lists on the playground page — a good reminder to scope selectors carefully in real apps.

---

## PART 10: Try it yourself

Practice tasks — prepending an `<h2>`, rendering a 5-item shopping array as a `ul`, adding the `card` class to it, and a button that removes only the **last** fruit (`lastElementChild.remove()`). Students build these in the console themselves.

---

## Quick summary

1. `createElement("tag")` makes a new element — in memory only.
2. Decorate it: `textContent`, `classList`, `style`...
3. `appendChild` / `append` snap it onto the page.
4. `appendChild` = last child; `prepend` / `insertBefore` = custom spots.
5. `.remove()` deletes an element (`parent.removeChild(child)` is the classic twin).
6. Big idea: **loop over data → build → append** — that is how real apps render lists.










# 10 - Creating and Removing Elements (Explained)

Matching files: `code/10-creating-removing-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to reset the page between blocks.

---

## PART 1: Building the page like LEGO

Every element on the page is a **LEGO brick** JavaScript built and clicked into place:

- **Creating** elements = making new bricks
- **appendChild** = snapping them onto the page
- **Removing** = taking a brick off again

Until now (lessons 07 to 09) we only worked with elements that were **already in the HTML**. This lesson lets JavaScript **make new ones**, which is how to-do lists, chat messages and product grids appear on real websites.

The recipe never changes:

1. **CREATE** the brick — `createElement`
2. **DECORATE** it — `textContent`, `classList`, `style`...
3. **ATTACH** it — `appendChild`

---

## PART 2: Create and attach your first element

```js
let newPara = document.createElement("p");     // 1. create (invisible yet!)
newPara.textContent = "I was built by JS!";    // 2. decorate
document.body.appendChild(newPara);            // 3. attach - now visible
```

- `createElement` makes the element but it **floats in memory, unattached** — nothing appears on screen.
- Only `appendChild` snaps it onto the page, as the **last child** of body.
- Forget step 3 and the element exists, but nobody can see it. This is the most common beginner mistake.
- The tag name goes in as a string **without** angle brackets: `"p"`, not `"<p>"`.

**Output:** a new paragraph at the very bottom of the page.

---

## PART 3: Decorating before attaching

You can decorate before **or** after attaching. Doing it first is neater — the element is finished before the page ever shows it.

```js
let card = document.createElement("div");
card.classList.add("card");
card.textContent = "A brand new card";
card.style.borderColor = "tomato";

document.body.appendChild(card);
```

- Everything you learned in lesson 08 (`textContent`, `classList`, `style`, `setAttribute`) works on a new element exactly as it does on an old one.

**Output:** a fully styled card appears — never a half-dressed flash of content.

---

## PART 4: Append to a specific parent

`appendChild` attaches as the **last child** of any parent you choose — not just body.

```js
let fruit = document.createElement("li");
fruit.textContent = "Cherry";

document.getElementById("fruit-list").appendChild(fruit);
```

- Here we **select** the parent (lesson 07) and call `appendChild` on it: `parent.appendChild(child)`.
- Think of it as "put this child inside that parent, at the end".
- An element can only live in **one** place. Appending an element that is already on the page **moves** it; it does not copy it.

**Output:** "Cherry" joins the fruit list at the end.

---

## PART 5: append vs appendChild

```js
let list = document.getElementById("fruit-list");

list.append("Papaya", document.createElement("li"));   // text + element
```

| | `appendChild` | `append` |
|---|---|---|
| Accepts | one **element** only | **text and elements**, several at once |
| Plain string | ❌ throws an error | ✅ works |
| Age | the classic | modern |

- `appendChild` also **returns** the child it attached; `append` returns nothing.
- For beginners: use `appendChild` for one element, `append` when you want to add several things or plain text.

**Output:** the text "Papaya" plus an empty `li` appear in the list.

---

## PART 6: Inserting in a specific spot

`appendChild` always adds at the end. To cut in line:

```js
let list = document.getElementById("fruit-list");
let firstFruit = list.children[0];            // current first item

let newFirst = document.createElement("li");
newFirst.textContent = "Apple (first!)";

list.insertBefore(newFirst, firstFruit);      // before the old first

let topFruit = document.createElement("li");
topFruit.textContent = "Avocado (top!)";
list.prepend(topFruit);                       // straight to the very top
```

| Method | Where the new element goes |
|---|---|
| `append(x)` / `appendChild(x)` | **last** child |
| `prepend(x)` | **first** child |
| `insertBefore(x, ref)` | right **before** the element `ref` |

- `insertBefore(newNode, referenceNode)` — inserts between existing bricks. It must be called on the **parent**, and the reference must be one of its children.
- `prepend` — first child; the mirror of `append`.
- Run this block on a fresh page (F5 first). If you ran earlier blocks, the list will already contain extra items.

**Output:** "Avocado (top!)" first, then "Apple (first!)", then the original fruits.

---

## PART 7: Removing elements

```js
let firstCard = document.querySelector(".card");

firstCard.remove();   // modern way - the element removes itself
```

- The classic pattern — still in every older codebase:

```js
// parent.removeChild(child)
firstCard.parentNode.removeChild(firstCard);   // go up to the parent, then remove the child
```

- Both do the same job. `.remove()` is shorter because the element does not need to know its parent.
- If `querySelector` finds nothing, `firstCard` is `null` and `.remove()` crashes — remember the `null` check from lesson 07.

**Output:** the first card vanishes from the page.

---

## PART 8: Building a list from data (the pro pattern)

Real apps **render data**. The pattern: loop over data → build an element per item → append each one.

```js
let students = ["Ada", "Chinedu", "Bola", "Ngozi"];
let ul = document.createElement("ul");

students.forEach(function (name) {
  let li = document.createElement("li");
  li.textContent = name;
  ul.appendChild(li);
});

document.body.appendChild(ul);
```

Read it as a recipe:

1. **Data:** an array of names.
2. **Container:** an empty `<ul>` (not on the page yet).
3. **Loop:** for each name, create an `<li>`, fill it, put it in the `<ul>`.
4. **Attach:** put the finished `<ul>` on the page **once**.

- Build the container **first**, fill it item by item, attach it **once** at the end — the page updates once, not four times.
- Change the array, run again — the page follows the data.

**Output:** a four-name list at the bottom of the page.

---

## PART 9: Real example — a "clear list" button

Elements created by JS can get their own listeners immediately (lesson 09):

```js
let btn = document.createElement("button");
btn.textContent = "Clear my new list";
document.body.appendChild(btn);

btn.addEventListener("click", function () {
  document.querySelectorAll("ul li").forEach(function (li) {
    li.remove();
  });
});
```

- This one example uses all four lessons so far: **create** a button, **select** the items, **react to a click**, **remove** each item.
- Warning: this clears **all** lists on the playground page (including the fruit list) — a good reminder to scope selectors carefully in real apps. A more careful version would use a specific id, like `#todo-list li`.

---

## PART 10: Try it yourself

Practice tasks — students build these in the console themselves:

1. Create an `<h2>` and `prepend` it so it appears at the very top of the page.
2. Render a 5-item shopping array as a `<ul>` using the PART 8 pattern.
3. Add the `card` class to that list so it gets styled.
4. Add a button that removes only the **last** fruit from `#fruit-list` (hint: `lastElementChild.remove()`).

---

## Quick summary

1. `createElement("tag")` makes a new element — in memory only, invisible until attached.
2. Decorate it: `textContent`, `classList`, `style`...
3. `appendChild` / `append` snap it onto the page.
4. `appendChild` = last child; `prepend` / `insertBefore` = custom spots.
5. An element lives in one place — appending it again **moves** it.
6. `.remove()` deletes an element (`parent.removeChild(child)` is the classic twin).
7. Big idea: **loop over data → build → append** — that is how real apps render lists.







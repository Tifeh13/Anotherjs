# 09 - Event Handling (Explained)

Matching files: `code/09-event-handling.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to remove listeners and start fresh.

---

## PART 1: What is an event?

A web page is a house with a **doorbell**, **smoke alarm** and **phone** — silent until something *happens*: the bell is pressed, smoke rises, the phone rings.

In the browser those happenings are **events**: clicks, keypresses, mouse movement, form submissions.

Event handling = "**when** this happens, **do** that." `addEventListener` is how you write that sentence in JS.

---

## PART 2: Your first listener

```js
let button = document.getElementById("action-btn");

button.addEventListener("click", function () {
  alert("You clicked the button!");
});
```

- Two arguments: the **event name** (`"click"`) and the **handler function** to run each time.
- Refreshing the page removes the listener.

**Output:** an alert on every click.

---

## PART 3: Other event types

```js
let input = document.getElementById("name-input");

input.addEventListener("input", function () {
  console.log("Typed so far:", input.value);
});

input.addEventListener("keydown", function () {
  console.log("A key was pressed!");
});
```

- `"input"` fires on **every keystroke/change** — the heart of live search boxes and character counters.
- Also worth trying: `"mouseover"`, `"mouseout"`, `"dblclick"`, `"submit"`.

**Output:** a console line per keystroke.

---

## PART 4: The event object (the incident report)

When an event happens, the browser builds an **event object** and hands it to your function: what happened, where, and to whom.

```js
let title = document.getElementById("main-title");

title.addEventListener("click", function (event) {
  console.log("Type of event:  ", event.type);      // "click"
  console.log("Element hit:    ", event.target);    // what was clicked
  console.log("Mouse position: ", event.clientX, event.clientY);
});
```

- `event.target` — the element the event happened on (the star of delegation).
- `event.type` — `"click"`, `"input"`, ...
- `event.clientX/clientY` — cursor position at click time.

---

## PART 5: Named functions as handlers

```js
let button = document.getElementById("action-btn");

function shout() {
  console.log("BUTTON WAS CLICKED!");
}

button.addEventListener("click", shout);

// button.removeEventListener("click", shout);   // stops listening
```

- A **named** function can be attached and later removed.
- `removeEventListener` needs the **same function reference** — a freshly written arrow function can never be removed this way.

---

## PART 6: Event bubbling

Click a child and the event **fires on the child first, then the parent, then the grandparent** — bubbles rising in a glass of water. This is **bubbling**, and it is the key that makes delegation possible.

```js
let list = document.getElementById("fruit-list");

list.addEventListener("click", function () {
  console.log("Parent <ul> heard a click from one of its children");
});
```

- Click any fruit: the parent reacts even though the listener is on the `<ul>`, not the `<li>`.
- (You can stop bubbling with `event.stopPropagation()` — rarely needed at this stage.)

**Output:** one console line per click on any list item.

---

## PART 7: Event delegation

Because of bubbling, **one** parent listener can serve every child — check `event.target` to see who was actually hit.

```js
let list = document.getElementById("fruit-list");

list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("Clicked fruit:", event.target.textContent);
    event.target.classList.toggle("highlight");
  }
});
```

- `event.target.tagName` is **UPPERCASE** (`"LI"`).
- The `if` matters: without it, clicks on the `<ul>` itself would also react.
- Click **Add fruit** to create a new item, then click it — it responds instantly, no new listener needed. That is the superpower.

---

## PART 8: Real example — click-to-delete todos

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
  if (event.target.tagName === "LI") {
    event.target.remove();                     // click a todo to delete it
  }
});
```

- Two listeners total: one to **create**, one (delegated) to **delete** any current or future todo.
- `.trim()` makes whitespace-only entries count as empty.

---

## PART 9: Try it yourself

Practice tasks — logging every click on `#action-btn`, a live character counter for `#name-input`, double-click-to-remove delegation on `#fruit-list`, and logging `event.key` on keypress. Students build these in the console themselves.

---

## Quick summary

1. Events are happenings: `click`, `input`, `keydown`, `submit`...
2. `addEventListener("click", handler)` = "when this, do that".
3. The handler receives an **event object**: `event.type`, `event.target`, `event.clientX`...
4. Clicks **bubble up** from child to parent.
5. **Delegation** = one parent listener + `event.target` checks — serves current and future children.










# 09 - Event Handling (Explained)

Matching files: `code/09-event-handling.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to remove listeners and start fresh.

---

## PART 1: What is an event?

A web page is a house with a **doorbell**, **smoke alarm** and **phone** — silent until something *happens*: the bell is pressed, smoke rises, the phone rings.

In the browser those happenings are **events**: clicks, keypresses, mouse movement, form submissions.

Event handling = "**when** this happens, **do** that."

| In the house | In the browser |
|---|---|
| Doorbell is pressed → open the door | Button is clicked → run a function |
| Phone rings → pick up | Key is pressed → run a function |

`addEventListener` is how you write that sentence in JS. A listener has three parts:

```js
element.addEventListener("click", doSomething);
//  ^ WHO to watch   ^ WHAT to wait for   ^ WHAT to do
```

---

## PART 2: Your first listener

```js
let button = document.getElementById("action-btn");

button.addEventListener("click", function () {
  alert("You clicked the button!");
});
```

- Two arguments: the **event name** (`"click"`) and the **handler function** to run each time.
- The event name is written **without** `on`: `"click"`, not `"onclick"`.
- The function does **not** run now — it is stored and runs later, **every time** the event happens.
- Refreshing the page removes the listener.

**Output:** an alert on every click.

---

## PART 3: Other event types

```js
let input = document.getElementById("name-input");

input.addEventListener("input", function () {
  console.log("Typed so far:", input.value);
});

input.addEventListener("keydown", function () {
  console.log("A key was pressed!");
});
```

- `"input"` fires on **every keystroke/change** — the heart of live search boxes and character counters.
- `"keydown"` fires the moment a key goes down — useful for shortcuts (Enter, Escape, arrow keys). At that moment `input.value` does **not** contain the new character yet, so use `"input"` when you need the current text.
- Also worth trying: `"mouseover"`, `"mouseout"`, `"dblclick"`, `"submit"`.

| Event | Fires when... |
|---|---|
| `click` | the element is clicked |
| `dblclick` | the element is double-clicked |
| `input` | the text in a field changes |
| `keydown` | a key is pressed down |
| `mouseover` / `mouseout` | the mouse enters / leaves the element |
| `submit` | a form is submitted |

**Output:** a console line per keystroke.

---

## PART 4: The event object (the incident report)

When an event happens, the browser builds an **event object** and hands it to your function: what happened, where, and to whom. You receive it by adding a parameter (usually named `event` or `e`).

```js
let title = document.getElementById("main-title");

title.addEventListener("click", function (event) {
  console.log("Type of event:  ", event.type);      // "click"
  console.log("Element hit:    ", event.target);    // what was clicked
  console.log("Mouse position: ", event.clientX, event.clientY);
});
```

- `event.target` — the element the event happened on (the star of delegation).
- `event.type` — `"click"`, `"input"`, ...
- `event.clientX/clientY` — cursor position at click time (in pixels from the top-left of the visible window).
- You do not call the function yourself, so you never pass `event` in — the browser supplies it.

---

## PART 5: Named functions as handlers

```js
let button = document.getElementById("action-btn");

function shout() {
  console.log("BUTTON WAS CLICKED!");
}

button.addEventListener("click", shout);

// button.removeEventListener("click", shout);   // stops listening
```

- A **named** function can be attached and later removed.
- `removeEventListener` needs the **same function reference** — a freshly written arrow function can never be removed this way.
- **Common mistake:** no parentheses after the name.

```js
button.addEventListener("click", shout);     // ✅ hand over the function, run it later
button.addEventListener("click", shout());   // ❌ runs shout() immediately, attaches its result
```

---

## PART 6: Event bubbling

Click a child and the event **fires on the child first, then the parent, then the grandparent** — bubbles rising in a glass of water. This is **bubbling**, and it is the key that makes delegation possible.

```html
<ul id="fruit-list">        <!-- 3. then the parent hears it -->
  <li>Apple</li>            <!-- 1. you click here, event starts here -->
</ul>
```

```js
let list = document.getElementById("fruit-list");

list.addEventListener("click", function () {
  console.log("Parent <ul> heard a click from one of its children");
});
```

- Click any fruit: the parent reacts even though the listener is on the `<ul>`, not the `<li>`.
- (You can stop bubbling with `event.stopPropagation()` — rarely needed at this stage.)

**Output:** one console line per click on any list item.

---

## PART 7: Event delegation

Because of bubbling, **one** parent listener can serve every child — check `event.target` to see who was actually hit.

Without delegation you would need one listener **per item**, and new items would have none:

```js
// ❌ the slow way: 1 listener per <li>, new items get nothing
document.querySelectorAll("#fruit-list li").forEach(function (li) {
  li.addEventListener("click", function () { /* ... */ });
});
```

With delegation, there is just **one**:

```js
let list = document.getElementById("fruit-list");

list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("Clicked fruit:", event.target.textContent);
    event.target.classList.toggle("highlight");
  }
});
```

- `event.target.tagName` is **UPPERCASE** (`"LI"`).
- The `if` matters: without it, clicks on the `<ul>` itself would also react.
- Click **Add fruit** to create a new item, then click it — it responds instantly, no new listener needed. That is the superpower.
- Later tip: if your `<li>` ever contains other tags (like a `<span>`), `event.target` may be the inner tag. `event.target.closest("li")` solves that.

---

## PART 8: Real example — click-to-delete todos

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
  if (event.target.tagName === "LI") {
    event.target.remove();                     // click a todo to delete it
  }
});
```

- Two listeners total: one to **create**, one (delegated) to **delete** any current or future todo.
- `.trim()` removes spaces from both ends, so whitespace-only entries count as empty.
- `return` exits the function early — nothing below it runs for an empty box.
- This combines everything so far: **select** (lesson 07), **modify** (lesson 08), and **react to events** (this lesson).

---

## PART 9: Try it yourself

Practice tasks — students build these in the console themselves:

1. Log a message on every click of `#action-btn`.
2. Build a live character counter for `#name-input` (hint: the `"input"` event and `input.value.length`).
3. Add double-click-to-remove delegation on `#fruit-list` (hint: `"dblclick"` and `event.target`).
4. Log `event.key` on keypress to see which key was pressed.

---

## Quick summary

1. Events are happenings: `click`, `input`, `keydown`, `submit`...
2. `addEventListener("click", handler)` = "when this, do that".
3. The handler receives an **event object**: `event.type`, `event.target`, `event.clientX`...
4. Pass the function itself (`shout`), not its result (`shout()`).
5. Clicks **bubble up** from child to parent.
6. **Delegation** = one parent listener + `event.target` checks — serves current and future children.
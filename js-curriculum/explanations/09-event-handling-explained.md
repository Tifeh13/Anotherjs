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

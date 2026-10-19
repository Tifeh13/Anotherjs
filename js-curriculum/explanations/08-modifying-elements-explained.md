# 08 - Modifying Elements (Explained)

Matching files: `code/08-modifying-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to reset between blocks.

---

## PART 1: Selection is step one, modification is step two

Selecting an element is picking up the whiteboard marker; modifying is actually **writing on the board**. This lesson changes four things: **text**, **HTML**, **attributes**, and **classes**.

---

## PART 2: textContent — plain text, the safe way

```js
let msg = document.getElementById("message");

msg.textContent = "Written by JavaScript!";

console.log(msg.textContent);   // read it back

msg.textContent = "I am <b>not</b> bold";   // tags shown literally!
```

- `textContent` treats everything as **plain text** — the `<b>` appears on screen as visible characters.
- That "limitation" is a **safety feature**: user input can never inject HTML.

**Output:** the paragraph text changes; console shows the raw text.

---

## PART 3: innerHTML — full HTML, the powerful (risky) way

```js
let msg = document.getElementById("message");

msg.innerHTML = "I am <strong>actually bold</strong> now";
```

- `innerHTML` **parses** the string as HTML — tags become real elements.
- **Danger:** with user-supplied strings, someone could inject `<script>` or `<img onerror=...>` (XSS attacks).
- **Rule:** user text → `textContent`. Trusted, hand-written HTML → `innerHTML`.

**Output:** the word "actually bold" renders in bold.

---

## PART 4: innerText vs textContent — the subtle difference

```js
let title = document.getElementById("main-title");

title.style.display = "none";   // hide it with CSS

console.log("innerText:   ", title.innerText);     // "" - respects hiding
console.log("textContent: ", title.textContent);   // full text anyway

title.style.display = "";       // show it again
```

- `innerText` = what a **human sees** (CSS-aware).
- `textContent` = the **raw text** no matter what.
- `textContent` is also faster — the default choice unless you specifically need visibility awareness.

**Output:** an empty string, then "DOM Playground".

---

## PART 5: Attributes with setAttribute and friends

Attributes are a tag's extra settings: `href`, `src`, `id`, `class`...

```js
let link = document.getElementById("my-link");

link.setAttribute("href", "https://developer.mozilla.org");
link.setAttribute("target", "_blank");     // open in new tab
link.textContent = "MDN Web Docs";

console.log(link.getAttribute("href"));    // read it back

link.href = "https://javascript.info";     // shortcut for common ones
```

- `setAttribute(name, value)` works on **any** attribute.
- `getAttribute(name)` reads; common attributes also have direct shortcuts (`.href`, `.id`, `.src`).

**Output:** the link now points at MDN and opens in a new tab; console shows the URL.

---

## PART 6: Inline style (quick and dirty)

```js
let title = document.getElementById("main-title");

title.style.color = "tomato";
title.style.backgroundColor = "lightyellow";   // note: camelCase!
title.style.fontSize = "44px";
```

- CSS `background-color` → JS `backgroundColor`. CSS hyphens become camelCase.
- Fine for quick tweaks — for anything real, prefer classes (next part).

**Output:** the heading turns tomato on a pale yellow background, bigger.

---

## PART 7: classList — the professional way

CSS holds the styles; JS only **switches classes on/off**. Styling and behaviour stay separated.

```js
let title = document.getElementById("main-title");

title.classList.add("highlight");       // turn style ON
title.classList.remove("highlight");    // turn style OFF
title.classList.toggle("highlight");    // flip: on <-> off
title.classList.toggle("highlight");

console.log(title.classList.contains("highlight"));   // true/false
```

- `toggle` is perfect for switches (dark mode, active menus, open dropdowns).
- `contains` answers "does it have this class right now?"

**Output:** the highlight appears/disappears as you toggle; console ends with `false`.

---

## PART 8: Real example — dark mode switch

```js
let body = document.body;

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
}
```

The `.dark-mode` class does not exist in `index.html` yet — add this CSS first:

```css
.dark-mode { background: #1a1a2e; color: #eee; }
```

Then run `toggleDarkMode()` a few times and watch the page flip.

- One class on `<body>` restyles everything inside it that inherits colours — a tiny pattern that powers real dark modes.

---

## PART 9: Try it yourself

Practice tasks — setting your name with `textContent`, bolding part of it with `innerHTML`, re-pointing `#my-link`, toggling highlights on all three cards in one `forEach`, and writing a `reset()` that restores original text and clears highlights. Students build these in the console themselves.

---

## Quick summary

1. `textContent` = plain text, safe and fast.
2. `innerHTML` = parses HTML tags — powerful, risky with untrusted input.
3. `innerText` respects CSS visibility; `textContent` does not.
4. `setAttribute`/`getAttribute` handle any attribute; `.href`/`.id` are shortcuts.
5. `style.*` changes inline styles with camelCase names.
6. `classList.add/remove/toggle/contains` is the professional way to change appearance.














# 08 - Modifying Elements (Explained)

Matching files: `code/08-modifying-elements.js`, `code/index.html`

**How to run:** open `index.html` in a browser, press F12 → Console, paste one uncommented block at a time, press Enter. Refresh (F5) to reset between blocks.

---

## PART 1: Selection is step one, modification is step two

Selecting an element is picking up the whiteboard marker; modifying is actually **writing on the board**.

```js
let msg = document.getElementById("message");   // step 1: select (pick up the marker)
msg.textContent = "Hello!";                     // step 2: modify (write on the board)
```

This lesson changes four things about an element:

| What you change | Tool | Example |
|---|---|---|
| The **text** inside | `textContent` | `msg.textContent = "Hi"` |
| The **HTML** inside | `innerHTML` | `msg.innerHTML = "<b>Hi</b>"` |
| The **attributes** (`href`, `src`...) | `setAttribute` | `link.setAttribute("href", "...")` |
| The **classes** (appearance) | `classList` | `msg.classList.add("highlight")` |

---

## PART 2: textContent — plain text, the safe way

```js
let msg = document.getElementById("message");

msg.textContent = "Written by JavaScript!";

console.log(msg.textContent);   // read it back

msg.textContent = "I am <b>not</b> bold";   // tags shown literally!
```

- `textContent` works both ways: **read** it (`console.log(msg.textContent)`) or **write** it (`msg.textContent = "..."`).
- Writing **replaces** everything that was inside the element.
- It treats everything as **plain text** — the `<b>` appears on screen as visible characters.
- That "limitation" is a **safety feature**: user input can never inject HTML.

**Output:** the paragraph text changes; console shows the raw text.

---

## PART 3: innerHTML — full HTML, the powerful (risky) way

```js
let msg = document.getElementById("message");

msg.innerHTML = "I am <strong>actually bold</strong> now";
```

- `innerHTML` **parses** the string as HTML — tags become real elements.
- Compare with PART 2: the same `<b>` that showed up as text there now becomes real bold formatting.
- **Danger:** if the string comes from a user, someone can sneak in harmful HTML such as `<img src="x" onerror="...">` and run their own code on your page (an **XSS attack**).
- **Rule:**
  - user text (forms, comments, URLs) → `textContent`
  - trusted, hand-written HTML → `innerHTML`

**Output:** the words "actually bold" render in bold.

---

## PART 4: innerText vs textContent — the subtle difference

Both give you the text inside an element, but they answer different questions:

- `textContent` = the **raw text** in the HTML, no matter what.
- `innerText` = the text a **human can actually see** (it is CSS-aware).

```js
let title = document.getElementById("main-title");

title.style.visibility = "hidden";   // hide it with CSS (the space stays, the text is invisible)

console.log("innerText:   ", title.innerText);     // "" - nothing visible to read
console.log("textContent: ", title.textContent);   // full text anyway

title.style.visibility = "";         // show it again
```

- `textContent` is also faster — make it your default unless you specifically need "only what is visible".
- **Heads-up:** if you hide the element with `display: "none"` instead, browsers treat it as "not rendered" and `innerText` falls back to the full text. The "hidden text is skipped" behaviour shows up most clearly with `visibility: hidden`, or when a hidden element sits **inside** a visible parent.

**Output:** an empty string, then "DOM Playground".

---

## PART 5: Attributes with setAttribute and friends

Attributes are a tag's extra settings, written inside the opening tag: `href`, `src`, `id`, `class`...

```html
<a href="https://example.com" target="_blank">Click</a>
<!--  ^ attribute name  ^ value -->
```

```js
let link = document.getElementById("my-link");

link.setAttribute("href", "https://developer.mozilla.org");
link.setAttribute("target", "_blank");     // open in new tab
link.textContent = "MDN Web Docs";

console.log(link.getAttribute("href"));    // read it back

link.href = "https://javascript.info";     // shortcut for common ones
```

- `setAttribute(name, value)` works on **any** attribute — it is the all-purpose tool.
- `getAttribute(name)` reads an attribute; common ones also have direct shortcuts (`.href`, `.id`, `.src`).
- Notice the last line **overwrites** the MDN link — so the final link points to javascript.info. Run the blocks separately to see each step.

**Output:** the link now points at MDN and opens in a new tab; console shows the URL.

---

## PART 6: Inline style (quick and dirty)

```js
let title = document.getElementById("main-title");

title.style.color = "tomato";
title.style.backgroundColor = "lightyellow";   // note: camelCase!
title.style.fontSize = "44px";
```

- CSS `background-color` → JS `backgroundColor`. Remove each hyphen and capitalise the next letter (`font-size` → `fontSize`).
- Values are **strings**, units included: `"44px"`, not `44`.
- Fine for quick tweaks — for anything real, prefer classes (next part).

**Output:** the heading turns tomato on a pale yellow background, bigger.

---

## PART 7: classList — the professional way

CSS holds the styles; JS only **switches classes on/off**. Styling and behaviour stay separated — like a light switch: the wiring (CSS) is already done, JS just flips the switch.

```js
let title = document.getElementById("main-title");

title.classList.add("highlight");       // turn style ON
title.classList.remove("highlight");    // turn style OFF
title.classList.toggle("highlight");    // flip: on <-> off
title.classList.toggle("highlight");

console.log(title.classList.contains("highlight"));   // true/false
```

| Method | What it does |
|---|---|
| `add("x")` | adds the class (does nothing if already there) |
| `remove("x")` | removes the class (does nothing if missing) |
| `toggle("x")` | adds it if missing, removes it if present |
| `contains("x")` | answers `true` / `false`: does it have this class right now? |

- Trace the code above: on → off → on → off. That is why the final `contains` prints `false`.
- `toggle` is perfect for switches (dark mode, active menus, open dropdowns).
- Do **not** put a dot in the name: `classList.add("highlight")`, not `".highlight"`.

**Output:** the highlight appears/disappears as you toggle; console ends with `false`.

---

## PART 8: Real example — dark mode switch

```js
let body = document.body;

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
}
```

The `.dark-mode` class does not exist in `index.html` yet — add this CSS first:

```css
.dark-mode { background: #1a1a2e; color: #eee; }
```

Then run `toggleDarkMode()` a few times and watch the page flip.

- One class on `<body>` restyles everything inside it that inherits colours — a tiny pattern that powers real dark modes.
- Later, you will connect this function to a button click so users can flip it themselves.

---

## PART 9: Try it yourself

Practice tasks — students build these in the console themselves:

1. Set your name with `textContent`.
2. Bold part of it with `innerHTML`.
3. Re-point `#my-link` to a site you like and make it open in a new tab.
4. Toggle highlights on all three cards in one `forEach` (hint: PART 7 of the selecting lesson).
5. Write a `reset()` function that restores the original text and clears the highlights.

---

## Quick summary

1. Selection first, modification second.
2. `textContent` = plain text, safe and fast — your default.
3. `innerHTML` = parses HTML tags — powerful, risky with untrusted input.
4. `innerText` respects CSS visibility; `textContent` does not.
5. `setAttribute`/`getAttribute` handle any attribute; `.href`/`.id` are shortcuts.
6. `style.*` changes inline styles with camelCase names and string values.
7. `classList.add/remove/toggle/contains` is the professional way to change appearance.
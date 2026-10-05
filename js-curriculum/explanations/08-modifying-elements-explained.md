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

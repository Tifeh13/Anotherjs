# 01 - Introduction to JavaScript (Explained)

Matching file: `code/01-intro-to-js.js`

---

## PART 1: What is JavaScript?

If a web page were a house: **HTML is the bricks** (structure), **CSS is the paint** (appearance), and **JavaScript is the electricity** — it makes things actually *happen*.

JavaScript runs in the browser and on servers (via Node.js). It is the language of interactivity: buttons that respond, popups, live-updating data.

---

## PART 2: How JavaScript runs your code

The computer reads your code **top to bottom, line by line**, like a cook following a recipe — one instruction at a time, in order.

```js
console.log("Step 1: Boil the water");
console.log("Step 2: Add the rice");
console.log("Step 3: Serve the food");
```

- Each line is one instruction, executed in the exact order written.

**Output:**
```
Step 1: Boil the water
Step 2: Add the rice
Step 3: Serve the food
```

---

## PART 3: Talking to the screen (console.log)

`console.log()` is your loudspeaker: whatever you place inside the brackets gets printed so you can see it. It accepts text, numbers, several values at once — even quick maths.

```js
console.log("Hello, students!");
console.log(2026);
console.log("2 + 2 is", 2 + 2);
```

- `"2 + 2 is"` is text; `2 + 2` is calculated first, then printed.

**Output:**
```
Hello, students!
2026
2 + 2 is 4
```

---

## PART 4: Adding notes to your code (comments)

Comments start with `//` and are **completely ignored** by the computer — they exist for humans.

```js
// This line is a comment - the computer ignores it.
console.log("Only this line actually runs.");
```

- Use comments to explain *why* code exists, or to temporarily disable a line while testing.

**Output:** `Only this line actually runs.`

---

## PART 5: JavaScript is case-sensitive

`name` and `Name` are **two different variables**. Capitalisation matters everywhere in JS — variable names, function names, keywords.

```js
let name = "Ada";
let Name = "Grace";

console.log(name);   // Ada
console.log(Name);   // Grace
```

- A classic beginner bug: declaring `let total` and later typing `Total`.

**Output:**
```
Ada
Grace
```

---

## PART 6: Statements end with semicolons

A statement is one full instruction; the semicolon `;` is the full stop at its end.

```js
console.log("First instruction");
console.log("Second instruction");
```

- Modern JS can often infer them, but writing them explicitly avoids subtle bugs.

**Output:**
```
First instruction
Second instruction
```

---

## PART 7: Try it yourself

Practice tasks — printing personal details with two `console.log` calls, printing an unquoted `10 + 5`, and proving case-sensitivity with `school` vs `School`. Students write and run these themselves.

---

## Quick summary

1. JavaScript is the "electricity" of the web — it makes pages interactive.
2. Code runs top to bottom, one line at a time.
3. `console.log()` prints values to the screen.
4. Comments (`//`) are notes the computer skips.
5. JS is case-sensitive: `name` ≠ `Name`.
6. Statements end with a semicolon.

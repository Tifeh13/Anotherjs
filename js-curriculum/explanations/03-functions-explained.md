# 03 - Functions (Explained)

Matching file: `code/03-functions.js`

---

## PART 1: What is a function?

A function is a **juice blender**: put fruit in (inputs), press the button, get juice out (output). You do not rebuild the blender each time — you **reuse** it.

In code: a **named block of code** you can run (call) whenever you like. It takes **inputs** (parameters) and may hand back an **output** (a returned value).

---

## PART 2: Function declaration (the classic way)

```js
function greet() {
  console.log("Hello there!");
}

greet();
greet();
```

- Writing the function only **defines** it — nothing runs.
- Calling it with `greet()` actually runs the block, every time you call.

**Output:**
```
Hello there!
Hello there!
```

---

## PART 3: Parameters — giving the function inputs

A **parameter** is a named slot in the definition; an **argument** is the actual value passed in the call.

```js
function greetStudent(name) {
  console.log("Hello, " + name + "!");
}

greetStudent("Ada");
greetStudent("Chinedu");
```

- The same function now produces different results per input — that is the whole point.

**Output:**
```
Hello, Ada!
Hello, Chinedu!
```

---

## PART 4: return — getting a value back out

`console.log` only **shows** something to humans. `return` **hands the result back** to whoever called the function so it can be stored and reused.

```js
function add(a, b) {
  return a + b;
}

let total = add(5, 3);
console.log(total);          // 8
console.log(add(10, 20));    // 30
```

- After `return` runs, the function exits immediately.
- A function without `return` gives back `undefined`.

**Output:**
```
8
30
```

---

## PART 5: Function expression (a function stored in a variable)

Functions are **values** in JS — they can live in variables, be passed around, stored in arrays.

```js
const double = function (number) {
  return number * 2;
};

console.log(double(4));    // 8
console.log(double(21));   // 42
```

**Output:**
```
8
42
```

---

## PART 6: Arrow functions (the short modern way)

```js
const triple = (number) => {
  return number * 3;
};

const square = n => n * n;   // shortest form

console.log(triple(5));   // 15
console.log(square(6));   // 36
```

- One parameter → parentheses optional.
- One expression → braces and `return` optional (implicit return).

**Output:**
```
15
36
```

---

## PART 7: The three ways side by side

```js
function halfDeclaration(n) { return n / 2; }
const halfExpression = function (n) { return n / 2; };
const halfArrow = (n) => n / 2;

console.log(halfDeclaration(10));   // 5
console.log(halfExpression(10));    // 5
console.log(halfArrow(10));         // 5
```

- All three are called identically. Differences (hoisting, `this`) come later — for now, choose the style your team uses.

**Output:**
```
5
5
5
```

---

## PART 8: Default parameters (a spare tyre)

If the caller forgets an argument, the default steps in instead of `undefined`.

```js
function welcome(name = "student") {
  console.log("Welcome, " + name + "!");
}

welcome();          // Welcome, student!
welcome("Bola");    // Welcome, Bola!
```

**Output:**
```
Welcome, student!
Welcome, Bola!
```

---

## PART 9: Real example — grading function

```js
function getGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "F";
}

console.log(getGrade(85));   // A
console.log(getGrade(55));   // C
console.log(getGrade(30));   // F
```

- Early `return`s avoid a long else-if ladder inside the function.

**Output:**
```
A
C
F
```

---

## PART 10: Try it yourself

Practice tasks — an `isEven` function (`%` hint), converting it to an arrow function, an `introduce(name, age)` function that **returns** a sentence, and a default age of 18. Students write and run these themselves.

---

## Quick summary

1. A function is a reusable, named block — a blender: inputs in, result out.
2. Define with `function name() {}`; run it with `name()`.
3. Parameters = input slots; arguments = real values passed in.
4. `return` hands a value back; `console.log` only displays.
5. Three shapes: declaration, expression, arrow function.
6. Default parameters fill in for missing arguments.

# 15 - JavaScript Modules (Explained)

Matching files: `code/15-modules.js`, `code/mathUtils.js`

**How to run:** modules need `.mjs` or `"type": "module"` in package.json. Easiest: copy the file to `15-modules.mjs` and run `node 15-modules.mjs`.

---

## PART 1: Why modules?

Writing your whole school's rules on **one sheet of paper** would be a nightmare to maintain. Modules let us **split code into files** — like subjects in separate exercise books — and share **exactly what we choose**.

One file **exports** its tools; another **imports** them.

```
mathUtils.js   (the toolbox: exports add, multiply, subtract, PI, describeModule)
15-modules.js  (the workshop: imports what it needs)
```

---

## PART 2: Named exports — sharing by name

In `mathUtils.js`:

```js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

function subtract(a, b) { return a - b; }
export { subtract };   // exported later, in one list at the bottom
```

Then in `15-modules.js`:

```js
import { add, multiply, PI } from "./mathUtils.js";

console.log(add(2, 3));        // 5
console.log(multiply(4, 5));   // 20
console.log(PI);               // 3.14159
```

- The word `export` makes a tool available to other files.
- Named imports use **curly braces with the exact names** — and `./` means "same folder as this file".

**Output:** `5`, `20`, `3.14159`

---

## PART 3: Renaming with "as" — importing with a nickname

```js
import { add as sum, multiply as times } from "./mathUtils.js";

console.log(sum(10, 5));     // 15
console.log(times(3, 4));    // 12
```

- `as` gives a local nickname — useful when two modules export clashing names.
- Only the import changes; the export stays as written.

**Output:** `15`, `12`

---

## PART 4: Import everything as a namespace

```js
import * as maths from "./mathUtils.js";

console.log(maths.add(1, 2));       // 3
console.log(maths.PI);              // 3.14159
console.log(maths.subtract(9, 4));  // 5
```

- `* as maths` gathers **all named exports** into one object — every tool behind a `maths.` prefix, like a labelled drawer.
- The default export is **not** included in the namespace.

**Output:** `3`, `3.14159`, `5`

---

## PART 5: Default exports — the main dish

`mathUtils.js` ends with:

```js
export default function describeModule() {
  return "I am mathUtils - I do maths for you!";
}
```

Imported with **any name you like**, no curly braces:

```js
import whateverName from "./mathUtils.js";

console.log(whateverName());   // I am mathUtils - I do maths for you!

// Mix both in one line:
import describeModule, { add } from "./mathUtils.js";
console.log(describeModule(), add(100, 200));
```

- One **default** export per file (the "main dish"); many named exports (the side dishes).
- Default = no braces, any name. Named = braces, exact name.

**Output:** `I am mathUtils - I do maths for you!` then the same plus `300`.

---

## PART 6: Exporting from your own file

Any JS file can be a module — write the function, add `export`:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

export { greet };

console.log("This file exported greet() successfully!");
```

- Another file can then `import { greet } from "./15-modules.js";`
- Exports live at the top level of the file — never inside functions or blocks.

**Output:** `This file exported greet() successfully!`

---

## PART 7: Module patterns — keeping things private

Whatever you do **not** export stays **private** to the file — invisible from outside. That is the core module pattern: a public surface over a private engine.

```js
let secretPassword = "abc123";        // NOT exported - hidden!

function checkPassword(guess) {       // the public door
  return guess === secretPassword;
}

export { checkPassword };

console.log(checkPassword("abc123")); // true - via the public door
```

- Other files can **ask** `checkPassword` — but can never touch `secretPassword` directly.
- This is real encapsulation: expose behaviour, hide data.

**Output:** `true`

---

## PART 8: Old-school context (what you may see in the wild)

Before ES modules, Node used **CommonJS**:

```js
// exporting (old style)
module.exports = { add, multiply };

// importing (old style)
const { add } = require("./mathUtils");
```

- Modern code prefers `import`/`export`, but you **will** meet `require()` in older tutorials and codebases.
- You cannot freely mix both styles in one project without configuration.

---

## PART 9: Real example — a tiny calculator module

The point of modules: build small single-purpose tools, then compose them.

```js
import { add, multiply, subtract } from "./mathUtils.js";

function calculate(a, operator, b) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    default:  return "Unknown operator";
  }
}

console.log(calculate(6, "+", 4));   // 10
console.log(calculate(6, "-", 4));   // 2
console.log(calculate(6, "*", 4));   // 24
```

- `calculate` does not do the maths itself — it **routes** to imported tools. That composition is exactly how real applications are assembled from modules.

**Output:** `10`, `2`, `24`

---

## PART 10: Try it yourself

Practice tasks — adding a named `divide` export to `mathUtils.js`, namespace-importing three tools, creating your own `greetings.js` with a default export, and keeping one variable private while exposing a function that uses it. Students build and run these themselves.

---

## Quick summary

1. Modules = splitting code into files with **controlled sharing**.
2. `export` shares; `import` collects. Named: `import { add }`.
3. Rename with `as`; grab everything with `* as name`.
4. One **default** export per file, imported without braces under any name.
5. Unexported code stays **private** — the core module pattern.
6. Old code uses `require()` / `module.exports` (CommonJS).

# 15 - JavaScript Modules: Splitting Code Into Files

Matching files: [code/15-modules.js](../code/15-modules.js), [code/mathUtils.js](../code/mathUtils.js)

**How to run:** `node 15-modules.js` from the `code` folder. The folder now has a `package.json` with `"type": "module"`, so plain `.js` files are treated as ES modules.

If a student copies the file elsewhere, either rename it to `.mjs` or add `"type": "module"` to that folder's `package.json`. Otherwise Node reads it as CommonJS and `import` fails with:

```
SyntaxError: Cannot use import statement outside a module
```

**What the student should be able to do by the end:**
1. Explain why big programs are split into modules (scope, dependencies, privacy, reuse).
2. Use named exports and default exports correctly, and know when to choose which.
3. Import with `{}`, with `as`, and with `* as`.
4. Explain that modules are evaluated once and shared.
5. Recognise CommonJS (`require` / `module.exports`) in older code.
6. Spot the common path and loading mistakes.

---

## How I would teach this lesson (45-60 minutes)

| Time | What happens |
|---|---|
| 0-8 | Part 1: the "one exercise book for every subject" problem. Build the case for modules before showing syntax. |
| 8-15 | Part 2: how modules load in the browser vs Node. Mention the `file://` trap. |
| 15-25 | Parts 3-5: named imports, `as`, namespace. Students run each. |
| 25-33 | Part 6: default exports. Compare with named. |
| 33-40 | Parts 7-8: exporting your own tools and the privacy pattern. |
| 40-47 | Part 9: one module, one shared instance. This explains surprising state sharing. |
| 47-55 | Parts 10-12: barrels, dynamic `import()`, and CommonJS in the wild. |
| 55-60 | Part 13 gotchas + summary + quiz. |

The sentence that frames the whole lesson:

> **A module is a file with a front door and a private inside.**

---

## PART 1: Why modules?

Start with something concrete from school:

> Imagine one exercise book for every subject. Maths, biology, English, history - all on the same pages. Finding yesterday's biology note is hard, and if two people write at once they overwrite each other.

A single giant JS file has the same four problems. Put them on the board:

| Problem | What it looks like in code |
|---|---|
| Name collisions | two files both declare `let count`; one silently wins |
| Hidden dependencies | script order matters; move one `<script>` and things break |
| No privacy | every top-level variable is visible to every script |
| No reuse | you cannot lift `add()` into another project cleanly |

Modules fix each one:

- Each file has its **own scope**. Top-level variables are private unless exported.
- Dependencies are **declared at the top**: `import { add } from "./mathUtils.js";` tells you exactly what this file needs.
- Other files can only use what is **exported**.
- A module can be copied to another project with its imports and still work.

The two words:

```
export  ->  "here is something I offer"
import  ->  "here is something I need"
```

**Ask:** *"If `mathUtils.js` defines `subtract` but does not export it, can another file use it?"* No - it is private to that file.

**Ask:** *"Does a module have to be a special kind of file?"* No. It is a normal `.js` file that uses `import`/`export`. The environment decides how it is loaded.

---

## PART 2: How modules load

### In the browser

```html
<script src="app.js"></script>              <!-- classic script -->
<script type="module" src="app.js"></script> <!-- module script -->
```

The differences that matter:

| Classic script | Module script |
|---|---|
| shares the global scope | has its own scope |
| runs in order, blocks parsing | deferred until HTML is parsed |
| sloppy mode by default | strict mode by default |
| `import` is a syntax error | `import` works |

The deferral is a quiet bonus: module code runs after the HTML exists, so `document.getElementById` finds elements without `DOMContentLoaded`.

**The `file://` trap.** Open an HTML page by double-clicking it and module imports fail in Chrome with a CORS message, because modules load through `fetch` rules. Serve the folder instead:

```
npx serve .
# or
python -m http.server
```

This confuses students every year. Say it before it happens.

### In Node

| Extension | Treated as |
|---|---|
| `.mjs` | ES module, always |
| `.cjs` | CommonJS, always |
| `.js` | depends on nearest `package.json` |

This folder's `package.json`:

```json
{ "type": "module" }
```

So `node 15-modules.js` works. If they copy the file to the desktop, rename it to `.mjs`.

**Strict mode note:** modules are strict automatically. Assigning to an undeclared variable throws instead of creating a global. That is good, but it can surprise students who are used to sloppy scripts.

---

## PART 3: Named exports

Look at `mathUtils.js` first, not the importing file. Students need to see both sides.

```js
export function add(a, b) { return a + b; }
export const PI = 3.14159;

function subtract(a, b) { return a - b; }
export { subtract };
```

Three styles of the same idea:
1. `export` in front of a declaration.
2. `export` in front of a `const`.
3. Declare privately, then `export { name }` at the bottom.

Then the import:

```js
import { add, multiply, PI } from "./mathUtils.js";

console.log(add(2, 3));        // 5
console.log(multiply(4, 5));   // 20
console.log(PI);               // 3.14159
```

**Output:** `5`, `20`, `3.14159`

The three details beginners trip on:

1. **`./` is required** for a local file. Without it, `"mathUtils.js"` is treated as a package name and fails with `ERR_MODULE_NOT_FOUND`.
2. **The extension is required** in Node and in browsers: `"./mathUtils.js"`, not `"./mathUtils"`.
3. **Imported bindings are read-only.** `add = 5;` throws `TypeError: Assignment to constant variable`. You can call `add`, not replace it.

Also point out what is *not* imported: `subtract` exists in the file but is not in this import list, so it is not available here. Import what you need, not everything.

---

## PART 4: Renaming with `as`

Two modules can export `add`. Renaming avoids the collision:

```js
import { add as sum, multiply as times } from "./mathUtils.js";

console.log(sum(10, 5));     // 15
console.log(times(3, 4));    // 12
```

The module still calls them `add` and `multiply`. Renaming is **local to the importing file**.

Use it when:
- two imports clash,
- a name is unclear in your context (`add` -> `addMoney`),
- you are migrating and want to keep call sites stable.

Do not overuse it: too many aliases make searching harder.

---

## PART 5: Namespace import

```js
import * as maths from "./mathUtils.js";

console.log(maths.add(1, 2));       // 3
console.log(maths.PI);              // 3.14159
console.log(maths.subtract(9, 4));  // 5
console.log(Object.keys(maths));    // [ 'PI', 'add', 'default', 'multiply', 'subtract' ] in Node
```

- `* as name` gathers all **named** exports into one object.
- The default export appears as a property called `default`. It is not one of the named exports.
- Key order is not guaranteed across environments; never depend on it.
- Reads nicely when you use many tools: `maths.add`, `maths.PI`.
- Can hide what you actually use. Prefer named imports when you need two or three things.

**Ask:** *"What is the difference between `import * as maths` and a default import?"* The namespace is an object holding every named export; a default import is the single value exported with `export default`.

---

## PART 6: Default exports

`mathUtils.js` ends with:

```js
export default function describeModule() {
  return "I am mathUtils - I do maths for you!";
}
```

Import it without braces, under any name:

```js
import whateverName from "./mathUtils.js";
console.log(whateverName());
```

**Output:** `I am mathUtils - I do maths for you!`

Mix both:

```js
import describeModule, { add } from "./mathUtils.js";
console.log(describeModule(), add(100, 200));
```

**Output:** `I am mathUtils - I do maths for you! 300`

Rules:
- One default export per module. A second is a `SyntaxError`.
- Named exports can be many.
- Default import names are chosen by the importer, so two files may call the same thing different names. That is convenient and a searchability hazard.

**When to use which** - give them a decision rule:

| Situation | Use |
|---|---|
| A toolbox with several functions | named exports |
| One main thing (a component, a class, a single function) | default export |
| Not sure | named - easier to search and refactor |

---

## PART 7: Exporting from your own file

```js
function greet(name) {
  return "Hello, " + name + "!";
}

function shout(name) {
  return greet(name).toUpperCase();
}

export { greet, shout };
```

Two equivalent styles:

```js
// inline
export function greet(name) { ... }

// list at the bottom
function greet(name) { ... }
export { greet };
```

Exports must be **top-level**. This is a syntax error:

```js
if (true) {
  export const x = 1;   // SyntaxError
}
```

Why? The module's exports must be known before any code runs, so the engine can link modules before execution.

Important: `export { greet }` does **not** call `greet`. It only publishes the binding. The function runs when someone calls it.

---

## PART 8: Privacy - the public door pattern

This is the design lesson inside the syntax lesson. Anything not exported is invisible to other modules.

```js
let secretPassword = "abc123";        // private

function checkPassword(guess) {       // public door
  return guess === secretPassword;
}

export { checkPassword };
```

From another file, `secretPassword` is not reachable. Only the yes/no answer escapes.

A more realistic example to write on the board:

```js
let balance = 0;

export function deposit(amount) {
  if (amount <= 0) throw new Error("Invalid amount");
  balance += amount;
  return balance;
}

export function getBalance() {
  return balance;
}
```

Why this is better than exporting `balance`:

- Outside code cannot set a negative balance.
- Validation lives in one place.
- You can change the internal storage later without breaking callers.

This is **encapsulation**: a small public surface over a private engine.

**But be precise with students:** this is privacy from other modules, not security. Anyone with the source can read `"abc123"`. Modules protect invariants, not secrets.

---

## PART 9: Modules are singletons

This surprises everyone. A module is evaluated **once**, no matter how many files import it. Every importer shares the same instance.

```js
// counter.js
let count = 0;

export function increment() { count++; return count; }
export function getCount()   { return count; }
```

```js
// a.js
import { increment } from "./counter.js";
increment();          // 1

// b.js
import { getCount } from "./counter.js";
console.log(getCount());   // 1 - the SAME counter
```

Consequences:
- Shared state is shared, not copied.
- Top-level code in a module runs once, even with five importers.
- Keep top-level code for definitions and setup, not actions.

If you need a fresh instance per user, export a **factory**:

```js
export function createCounter() {
  let count = 0;
  return {
    increment() { return ++count; },
    getCount() { return count; }
  };
}
```

Each call to `createCounter()` returns an independent object.

**Ask:** *"Why did file B see file A's increment?"* Because both imported the same evaluated module, not two copies.

---

## PART 10: Re-exporting (barrel files)

A folder can expose one front door:

```js
// utils/index.js
export { add, multiply } from "./math.js";
export { formatDate } from "./dates.js";
export { default as validateEmail } from "./email.js";
```

Then consumers write:

```js
import { add, formatDate } from "./utils/index.js";
```

Benefits: one stable import path; consumers do not need the internal layout.
Costs: it can hide where code really lives, and re-exporting everything can slow tooling and pull in more modules than needed.

`export { default as validateEmail }` is the syntax for renaming a default export into a named one - worth showing because it appears in real code.

---

## PART 11: Dynamic `import()`

Static imports are resolved before the module runs. That is right for code the page always needs.

`import()` is a **function** that loads a module on demand and returns a promise:

```js
async function useMaths() {
  console.log("Before loading");
  let maths = await import("./mathUtils.js");
  console.log("Loaded. 7 + 8 =", maths.add(7, 8));
  console.log("Default export:", maths.default());
}
```

**Output:**
```
Before loading
Loaded. 7 + 8 = 15
Default export: I am mathUtils - I do maths for you!
```

Shape:
- Returns a module object: named exports are properties, default is `.default`.
- Destructuring works: `let { add } = await import("./mathUtils.js");`

Use it for:
- code splitting (load a chart library only when the chart opens),
- optional features,
- tests that need setup before loading,
- plugins chosen at runtime.

It is the lessons 12-13 promise/await pattern applied to code itself. That connection is worth making explicitly.

---

## PART 12: CommonJS

Before ES modules, Node used CommonJS:

```js
// export
module.exports = { add, multiply };

// import
const { add } = require("./mathUtils");
```

Comparison:

| ES modules | CommonJS |
|---|---|
| `import` / `export` | `require` / `module.exports` |
| static, resolved before running | runs at the line where it appears |
| live bindings | copies the value at require time |
| strict mode by default | not strict by default |
| `.mjs` or `"type": "module"` | `.cjs` or Node's default |
| native in browsers | needs a bundler |

Teaching advice: do not spend long here. Students only need to **recognise** `require()` in older tutorials and config files, and know that new code uses `import`/`export`.

Mixing: Node can usually import a CommonJS module from an ES module, but the reverse is limited. In one project, pick one style unless a dependency forces otherwise.

---

## PART 13: Gotchas worth five minutes

1. **Imports are hoisted.** All static imports are processed before any code runs, even if written lower down. Put them at the top for readability.
2. **You cannot `import` inside a function.** Use dynamic `import()` for that.
3. **One default per module.** A second `export default` is a syntax error.
4. **Modules are strict.** `x = 5` without declaring `x` throws.
5. **Paths are case-sensitive on servers.** `MathUtils.js` and `mathUtils.js` are different files on Linux even if Windows forgives it.
6. **Circular imports.** `a.js` imports `b.js`, `b.js` imports `a.js`. Some values will be `undefined` at the moment they are used. If you see "cannot access before initialization", look for a cycle and restructure so only one direction owns the dependency.
7. **Top-level `await`** works in ES modules (`let data = await fetch(...)` at the top level). It delays the whole module, so use it in setup code, not in libraries.

---

## PART 14: The composition example

```js
import { add, multiply, subtract } from "./mathUtils.js";

function calculate(a, operator, b) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    default:  return "Unknown operator: " + operator;
  }
}
```

**Output:** `10`, `2`, `24`, `Unknown operator: /`

`calculate` does no arithmetic itself. It **routes** to imported tools. That is the composition lesson: each module has one job; a higher layer assembles them.

This is exactly how a React app, an Express server or a CLI is structured - many small modules, one layer that wires them together.

---

## PART 15: Tasks and answers

1. **Add `divide`.** Expect `export function divide(a, b) { if (b === 0) throw new Error("Cannot divide by zero"); return a / b; }`, imported and called inside try/catch.
2. **Namespace.** Expect `import * as maths` and three calls.
3. **`greetings.js`.** Expect a default `greet` and a named `farewell`; both imported, one under an alias.
4. **Private counter.** Expect a module-level `let count = 0`, `getGreetingCount()` exported, and a comment/attempt showing the variable itself is not importable.
5. **`VERSION` plus default.** Expect `import greet, { VERSION } from "./greetings.js";`.
6. **Static vs dynamic.** Static: linked before execution, top of file, no promise. Dynamic: a function returning a promise, can run anywhere and later.
7. **Bug hunt.** Missing `./`. `"mathUtils.js"` is treated as a package name; fix is `"./mathUtils.js"`.

---

## Checkpoint questions (with answers)

1. **"What does `export` do? What does `import` do?"** Publishes a binding; requests one.
2. **"How many default exports can a module have?"** Exactly one.
3. **"How do you import a default vs a named export?"** No braces and any name vs `{ exactName }`.
4. **"Is a module evaluated once or once per importer?"** Once; every importer shares the instance.
5. **"Can another file read an unexported variable?"** No - it is private to the module.
6. **"Why do module scripts not need `DOMContentLoaded`?"** They are deferred until the HTML is parsed.
7. **"What is the difference between `import` and `import()`?"** Static and resolved up front vs dynamic, promise-based, on demand.

---

## Common student mistakes

| Mistake | Error / symptom | Fix |
|---|---|---|
| Missing `./` | `ERR_MODULE_NOT_FOUND` / package not found | `"./mathUtils.js"` |
| Missing extension | module not found | include `.js` |
| Running `.js` as CommonJS | `Cannot use import statement outside a module` | `.mjs` or `"type": "module"` |
| Opening HTML via `file://` | CORS error on module load | use a local server |
| Two `export default`s | SyntaxError | one default, rest named |
| `export` inside a function/if | SyntaxError | move to top level |
| Import name typo | `does not provide an export named ...` | match the exported name exactly |
| Reassigning an imported binding | TypeError | use a local variable |
| Expecting a fresh module per import | shared state surprises | it is a singleton; use a factory |
| Circular imports | undefined values / initialization error | restructure dependencies |

---

## Quick summary

1. Modules give each file its own scope with explicit sharing.
2. `export` offers, `import` requests; unexported code stays private.
3. Named exports use `{ exactName }`; default exports use any name and no braces; one default per module.
4. `as` renames; `* as` collects all named exports.
5. Modules are evaluated once and shared (singletons).
6. Re-export to create a single front door; `import()` loads code on demand.
7. Browsers need `<script type="module">` and a server (not `file://`).
8. Node needs `.mjs` or `"type": "module"`; old code uses `require`.
9. Paths need `./` and the file extension; case matters on servers.

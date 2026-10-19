// ============================================================
// 15 - JAVASCRIPT MODULES: SPLITTING CODE INTO FILES
// ============================================================
//
// HOW TO USE THIS FILE:
// Uncomment ONE block at a time and run:
//
//     node 15-modules.js
//
// This folder contains a package.json with "type": "module",
// so Node treats every .js file here as a module.
//
// If you copy this file somewhere else, either rename it to
// 15-modules.mjs or add "type": "module" to that folder's
// package.json. Without that, Node reads .js as CommonJS and
// `import` throws "Cannot use import statement outside a
// module".
//
// To uncomment: select the lines, press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
//
// PARTNER FILE: mathUtils.js (in this folder) is the module
// this lesson imports from. Read it alongside this file.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHY MODULES?
// ------------------------------------------------------------
//
// Imagine one exercise book for every subject in school:
// maths, biology, English, history - all on the same pages.
// Finding yesterday's biology note would be a nightmare, and
// two teachers writing at once would overwrite each other.
//
// A single giant JavaScript file has the same problems:
//
//   1. NAME COLLISIONS
//      Two parts of the program both define `let count` or
//      `function save()`. In one shared global scope, the
//      second silently overwrites the first.
//
//   2. HIDDEN DEPENDENCIES
//      Script tags run in order. Move one <script> and
//      something breaks, because a function that file needed
//      has not been defined yet.
//
//   3. NO PRIVACY
//      Every top-level variable is visible to every other
//      script. Any file can change any value.
//
//   4. NO REUSE
//      You cannot easily take `add()` from one project and
//      drop it into another; it is tangled with everything.
//
// Modules fix all four:
//
//   - Each module has its OWN scope. Top-level variables are
//     private by default.
//   - A module explicitly EXPORTS what it offers and
//     explicitly IMPORTS what it needs. Dependencies are
//     visible at the top of the file, not hidden in load
//     order.
//   - Other modules can only use what is exported.
//   - A module can be copied to another project with its
//     imports and work the same way.
//
// Two words, then:
//
//   EXPORT -> "here is something I offer"
//   IMPORT -> "here is something I need"
//
// A module is just a normal JS file that uses these words.
// There is no special syntax beyond import and export.


// ------------------------------------------------------------
// PART 2: HOW MODULES GET LOADED
// ------------------------------------------------------------
//
// There are two environments to know about.
//
// IN THE BROWSER
//
//   <script src="app.js"></script>
//     -> classic script, shared global scope, runs in order
//
//   <script type="module" src="app.js"></script>
//     -> module script, own scope, strict mode by default
//
//   Module scripts are also DEFERRED: they run after the HTML
//   is parsed. That solves the old "script runs before the
//   element exists" problem from the DOM lessons.
//
//   GOTCHA: opening an HTML file directly (file://) blocks
//   module imports in Chrome with a CORS error, because
//   modules use fetch rules. Serve the folder through a
//   local web server (VS Code Live Server, `npx serve`, or
//   `python -m http.server`) and it works.
//
// IN NODE
//
//   - .mjs            -> always a module
//   - .cjs            -> always CommonJS
//   - .js             -> depends on the nearest package.json
//
//   This folder has package.json with:
//
//     { "type": "module" }
//
//   so `node 15-modules.js` works as a module. Without it,
//   rename the file to .mjs.
//
// ONE MORE DIFFERENCE
//   Modules run in STRICT MODE automatically. Assigning to an
//   undeclared variable throws instead of creating a global.
//   That is a good thing, and it is why module code sometimes
//   behaves differently from old script code.


// ------------------------------------------------------------
// PART 3: NAMED EXPORTS - SHARING BY NAME
// ------------------------------------------------------------
//
// Open mathUtils.js and look at how it exports:
//
//   export function add(a, b) { return a + b; }
//   export const PI = 3.14159;
//   function subtract(a, b) { return a - b; }
//   export { subtract };                 // exported later
//
// Each of those is a NAMED export. To use them, import the
// exact names inside curly braces:
//
// UNCOMMENT BELOW AND RUN IT:

// import { add, multiply, PI } from "./mathUtils.js";

// console.log("add(2, 3):       ", add(2, 3));
// console.log("multiply(4, 5):  ", multiply(4, 5));
// console.log("PI:              ", PI);
//
// EXPECTED OUTPUT:
//   add(2, 3):        5
//   multiply(4, 5):   20
//   PI:               3.14159
//
// THREE DETAILS BEGINNERS TRIP ON
//
//   1. The path needs "./" for a file in the same folder.
//      "mathUtils.js" (without ./) is treated as a package
//      name, not a file, and fails.
//
//   2. Node requires the file extension: "./mathUtils.js".
//      Browsers also want the full path. Do not write
//      "./mathUtils".
//
//   3. Imported names are READ-ONLY in the importing file.
//      `add = 5;` throws a TypeError. You can read the
//      binding, not reassign it.
//
// You can import only what you need. `subtract` exists in
// mathUtils.js, but this import does not bring it in.


// ------------------------------------------------------------
// PART 4: RENAMING WITH "as"
// ------------------------------------------------------------
//
// Two modules can export the same name. `as` gives a local
// nickname and avoids the clash.
//
// UNCOMMENT BELOW AND RUN IT:

// import { add as sum, multiply as times } from "./mathUtils.js";

// console.log("sum(10, 5):  ", sum(10, 5));
// console.log("times(3, 4): ", times(3, 4));
//
// EXPECTED OUTPUT:
//   sum(10, 5):   15
//   times(3, 4):  12
//
// The module still calls it `add`. Only YOUR file calls it
// `sum`. Renaming is a local choice, not a change to the
// export.


// ------------------------------------------------------------
// PART 5: NAMESPACE IMPORT - EVERYTHING IN ONE BOX
// ------------------------------------------------------------
//
// `* as name` collects all NAMED exports into one object.
// Every tool then lives behind a prefix, like a labelled
// drawer.
//
// UNCOMMENT BELOW AND RUN IT:

// import * as maths from "./mathUtils.js";

// console.log("maths.add(1, 2):      ", maths.add(1, 2));
// console.log("maths.PI:             ", maths.PI);
// console.log("maths.subtract(9, 4): ", maths.subtract(9, 4));
// console.log("Available tools:      ", Object.keys(maths));
//
// EXPECTED OUTPUT:
//   maths.add(1, 2):       3
//   maths.PI:              3.14159
//   maths.subtract(9, 4):  5
//   Available tools:       [ 'PI', 'add', 'default', 'multiply',
//                            'subtract' ]
//
// (Node sorts namespace keys. Browsers may display them in a
// different order - do not depend on the order.)
//
// Notice "default" appears in the keys but is NOT one of the
// named exports. The namespace includes it under a property
// called `default`; that is an implementation detail rather
// than normal usage.
//
// WHEN TO USE A NAMESPACE
//   It reads well when you use many tools from one module:
//   maths.add, maths.PI, maths.subtract. It also makes it
//   obvious where each tool came from.
//
// WHEN NOT TO
//   `import * as everything` hides what you actually use.
//   Prefer named imports when you only need two or three
//   things; it documents the dependency better.


// ------------------------------------------------------------
// PART 6: DEFAULT EXPORTS - THE MAIN DISH
// ------------------------------------------------------------
//
// A module can have many named exports but only ONE default.
// mathUtils.js ends with:
//
//   export default function describeModule() {
//     return "I am mathUtils - I do maths for you!";
//   }
//
// A default export is imported WITHOUT curly braces, and you
// choose the name yourself.
//
// UNCOMMENT BELOW AND RUN IT:

// import whateverName from "./mathUtils.js";

// console.log(whateverName());
//
// EXPECTED OUTPUT:
//   I am mathUtils - I do maths for you!
//
// `whateverName` is entirely your choice. The module does
// not care. That is convenient and also dangerous: two files
// can import the same default under different names, which
// makes searching harder. Teams usually agree on a name.
//
// MIXING BOTH IN ONE LINE:

// import describeModule, { add } from "./mathUtils.js";

// console.log(describeModule());
// console.log("100 + 200 =", add(100, 200));
//
// EXPECTED OUTPUT:
//   I am mathUtils - I do maths for you!
//   100 + 200 = 300
//
// WHICH SHOULD YOU USE?
//   Named exports are the safer default: exact names, easy
//   to search, several per file, and tooling can rename them
//   reliably. Use a default export when the module is
//   really ONE thing (a component, a class, a single
//   function) and the name is obvious.


// ------------------------------------------------------------
// PART 7: EXPORTING FROM YOUR OWN FILE
// ------------------------------------------------------------
//
// Any file can be a module. Write the function, add export.
// There are two common styles:
//
//   export function greet(name) { ... }    // inline
//
//   function greet(name) { ... }           // export later
//   export { greet };
//
// Both are fine. The second keeps the export list at the
// bottom, which some teams prefer for scanning.
//
// EXPORTS MUST BE TOP-LEVEL
//   You cannot put `export` inside an if, a function, or a
//   loop. The module's shape must be known before it runs.
//
// UNCOMMENT BELOW AND RUN IT:

// function greet(name) {
//   return "Hello, " + name + "!";
// }

// function shout(name) {
//   return greet(name).toUpperCase();
// }

// export { greet, shout };

// console.log(greet("Ada"));
// console.log(shout("Ada"));
//
// EXPECTED OUTPUT:
//   Hello, Ada!
//   HELLO, ADA!
//
// Another file could now write:
//
//   import { greet } from "./15-modules.js";
//
// A module can export values it imported itself, too (see
// Part 10).
//
// NOTE: `export { greet }` does not run greet. It only
// records that other files may import it. The call happens
// when someone actually calls greet().


// ------------------------------------------------------------
// PART 8: PRIVACY - THE PUBLIC DOOR PATTERN
// ------------------------------------------------------------
//
// Anything NOT exported is private to the file. Other files
// cannot see it, import it, or change it.
//
// This is the real superpower of modules: a small public
// surface over a private engine.
//
// Imagine a bank module:
//
//   let balance = 0;                       // private
//
//   export function deposit(amount) {      // public
//     if (amount <= 0) throw new Error("Invalid amount");
//     balance += amount;
//     return balance;
//   }
//
//   export function getBalance() {         // public
//     return balance;
//   }
//
// From outside:
//   deposit(50)      -> allowed, validated
//   balance = 999999 -> impossible, not exported
//
// The module controls HOW its data changes. That is called
// ENCAPSULATION, and it is why large codebases can survive.
//
// UNCOMMENT BELOW AND RUN IT:

// let secretPassword = "abc123";           // not exported

// function checkPassword(guess) {          // the public door
//   return guess === secretPassword;
// }

// export { checkPassword };

// console.log(checkPassword("abc123"));    // true
// console.log(checkPassword("wrong"));     // false
//
// EXPECTED OUTPUT:
//   true
//   false
//
// There is no way for another file to read secretPassword
// directly. It can only ask checkPassword a yes/no question.
//
// IMPORTANT: this is privacy from OTHER MODULES, not
// security. Anyone with the source can read the string. Use
// it to protect invariants, not secrets.


// ------------------------------------------------------------
// PART 9: MODULES RUN ONCE AND ARE CACHED
// ------------------------------------------------------------
//
// No matter how many files import a module, it is evaluated
// ONCE. Every importer shares the same instance. That makes
// modules natural places for shared state and configuration.
//
// Picture a counter module (counter.js):
//
//   let count = 0;
//
//   export function increment() { count++; return count; }
//   export function getCount()   { return count; }
//
// fileA.js  import { increment } from "./counter.js";
//           increment();          // 1
//
// fileB.js  import { getCount } from "./counter.js";
//           console.log(getCount());   // 1 - same counter!
//
// If you expected a fresh copy in fileB, you would be
// surprised. Modules are SINGLETONS: one evaluation, one
// shared state.
//
// This is also why top-level code in a module runs only once,
// even if five files import it. Keep top-level code limited
// to definitions and setup; put actions inside functions.
//
// (If you need a fresh copy per user, export a factory
// function that RETURNS a new object instead of exporting a
// shared one.)


// ------------------------------------------------------------
// PART 10: RE-EXPORTING - ONE FRONT DOOR
// ------------------------------------------------------------
//
// A folder can have an index.js that collects and re-exports
// its modules, so consumers import from one place:
//
//   // utils/index.js
//   export { add, multiply } from "./math.js";
//   export { formatDate } from "./dates.js";
//   export { default as validateEmail } from "./email.js";
//
// Then:
//
//   import { add, formatDate } from "./utils/index.js";
//
// This pattern is called a "barrel". It is convenient in
// large projects. It can also hide where things really live
// and slow down tooling if every file is re-exported, so use
// it deliberately, not everywhere.
//
// `export { default as validateEmail }` is the syntax for
// turning someone else's default export into a named one.


// ------------------------------------------------------------
// PART 11: DYNAMIC import() - LOADING LATER
// ------------------------------------------------------------
//
// Static `import` is resolved before the module runs. That is
// what you want for code the page always needs.
//
// Sometimes you want a module only when the user asks for it
// (a chart library, a heavy editor, a rarely used page).
// import() is a FUNCTION that returns a promise:
//
// UNCOMMENT BELOW AND RUN IT:

// async function useMaths() {
//   console.log("Before loading");

//   let maths = await import("./mathUtils.js");

//   console.log("Loaded. 7 + 8 =", maths.add(7, 8));
//   console.log("Default export:", maths.default());
// }

// useMaths();
//
// EXPECTED OUTPUT:
//   Before loading
//   Loaded. 7 + 8 = 15
//   Default export: I am mathUtils - I do maths for you!
//
// Notice the shape: import() gives you a module object, so
// named exports are properties (maths.add) and the default
// is maths.default. There is no destructuring magic needed,
// though you can do:
//
//   let { add } = await import("./mathUtils.js");
//
// WHY USE IT
//   - code splitting: do not download the chart library
//     until someone opens the chart
//   - feature flags: load an optional module only when needed
//   - tests: load a module after setting up the environment
//
// It is the same promise/await pattern from lessons 12-13,
// applied to code itself.


// ------------------------------------------------------------
// PART 12: COMMONJS - THE OLDER SYSTEM
// ------------------------------------------------------------
//
// Before ES modules, Node used CommonJS:
//
//   // exporting (old style)
//   module.exports = { add, multiply };
//
//   // importing (old style)
//   const { add } = require("./mathUtils");
//
// Differences you can feel:
//
//   ES MODULES                    COMMONJS
//   ---------------------------   --------------------------
//   import / export               require / module.exports
//   static, resolved up front      dynamic, runs at that line
//   live bindings                 copies the value at require
//   strict mode by default        not strict by default
//   .mjs or type: module          .cjs or default in Node
//   works natively in browsers    does not; needs a bundler
//
// Modern code prefers ES modules. But you WILL meet
// require() in older tutorials, Node scripts, config files
// and existing projects. Recognise it; do not panic.
//
// CAN YOU MIX THEM?
//   Node can import a CommonJS module from an ES module
//   (usually), but the reverse is limited. In one project,
//   pick one style unless a dependency forces your hand.


// ------------------------------------------------------------
// PART 13: GOTCHAS WORTH KNOWING NOW
// ------------------------------------------------------------
//
// 1. IMPORTS ARE HOISTED
//    All static imports run BEFORE the rest of the file,
//    regardless of where they appear. So this works:
//
//      console.log(add(1, 2));
//      import { add } from "./mathUtils.js";
//
//    but it reads badly. Put imports at the top.
//
// 2. YOU CANNOT IMPORT INSIDE A FUNCTION
//      function load() {
//        import { add } from "./mathUtils.js";  // SyntaxError
//      }
//    Use dynamic import() (Part 11) when you need that.
//
// 3. ONE DEFAULT PER MODULE
//    A second `export default` is a SyntaxError. Named
//    exports can be many.
//
// 4. MODULES ARE STRICT
//    `x = 5` without declaring x throws instead of creating
//    a global. Good for bug-finding, surprising the first
//    time.
//
// 5. PATHS ARE CASE-SENSITIVE ON SERVERS
//    "./MathUtils.js" and "./mathUtils.js" are different
//    files on Linux even if Windows forgives you. Match the
//    real filename exactly.
//
// 6. CIRCULAR IMPORTS
//    a.js imports b.js and b.js imports a.js. The engine
//    handles many cases, but the value may be undefined at
//    the moment it is used. If you see "cannot access before
//    initialization", look for a cycle. Restructure so one
//    direction owns the dependency.
//
// 7. TOP-LEVEL await
//    In an ES module you may write:
//
//      let data = await fetch(".../posts/1").then(r => r.json());
//
//    at the top level (no async wrapper). It works in modern
//    Node and browsers, but it delays the whole module. Use
//    it sparingly and prefer it in setup code, not libraries.


// ------------------------------------------------------------
// PART 14: REAL EXAMPLE - COMPOSING A CALCULATOR
// ------------------------------------------------------------
//
// The point of modules is composition: small tools, each with
// one job, assembled into something bigger.
//
// UNCOMMENT BELOW AND RUN IT:

// import { add, multiply } from "./mathUtils.js";
// import { subtract } from "./mathUtils.js";

// function calculate(a, operator, b) {
//   switch (operator) {
//     case "+": return add(a, b);
//     case "-": return subtract(a, b);
//     case "*": return multiply(a, b);
//     default:  return "Unknown operator: " + operator;
//   }
// }

// console.log(calculate(6, "+", 4));
// console.log(calculate(6, "-", 4));
// console.log(calculate(6, "*", 4));
// console.log(calculate(6, "/", 4));
//
// EXPECTED OUTPUT:
//   10
//   2
//   24
//   Unknown operator: /
//
// `calculate` does no arithmetic itself. It ROUTES to
// imported tools. That is how real applications are built:
// small modules with clear jobs, composed by a higher layer.
//
// Note that TWO import lines from the same module are legal,
// though one line is tidier:
//
//   import { add, multiply, subtract } from "./mathUtils.js";


// ------------------------------------------------------------
// PART 15: TRY IT YOURSELF
// ------------------------------------------------------------
//
// 1. Add `divide(a, b)` to mathUtils.js as a named export.
//    Import it here and print divide(20, 4). Then make it
//    throw an Error when b is 0, and catch it.
//
// 2. Import mathUtils with `* as maths` and use three tools.
//
// 3. Create greetings.js with:
//      - a default export function greet(name)
//      - a named export farewell(name)
//    Import both under custom names here and call them.
//
// 4. In greetings.js keep a private counter of how many
//    greetings were sent, expose getGreetingCount(), and
//    prove another file cannot read the counter directly.
//
// 5. Create a file with an `export const VERSION = "1.0.0"`
//    and a default export. Import both in one line here.
//
// 6. Explain the difference between these two, then test
//    both:
//      import { add } from "./mathUtils.js";
//      const maths = await import("./mathUtils.js");
//
// 7. Bug hunt: why does this fail?
//      import { add } from "mathUtils.js";
//
// Write your answers below this line:




// ============================================================
// QUICK SUMMARY (read this out loud at the end)
// ============================================================
//
// 1. Modules split code into files with controlled sharing
//    and their own scope.
// 2. export offers; import requests. No export means private.
// 3. Named exports use { exactName }. Default exports use
//    any name and no braces. One default per module.
// 4. Rename with `as`; collect all named exports with `* as`.
// 5. Modules are evaluated ONCE and shared (singletons).
// 6. Re-export to create a single front door (barrel files).
// 7. import() is dynamic, returns a promise, and loads code
//    on demand.
// 8. In the browser use <script type="module">; that also
//    gives you defer and strict mode.
// 9. In Node use .mjs or "type": "module" in package.json.
// 10. Old Node code uses require()/module.exports. Recognise
//     it, but write ES modules in new code.
// 11. Watch paths: ./ is required, extensions are required,
//     and file names are case-sensitive on servers.
// ============================================================

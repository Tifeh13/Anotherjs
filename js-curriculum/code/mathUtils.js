// ============================================================
// mathUtils.js - A SMALL HELPER MODULE (used by 15-modules.js)
// ============================================================
//
// A module is just a normal JS file that DECIDES what to
// share with other files using "export".


// A NAMED export: files import it by its exact name.
export function add(a, b) {
  return a + b;
}

// Another named export.
export function multiply(a, b) {
  return a * b;
}

// You can also define privately and export at the bottom.
function subtract(a, b) {
  return a - b;
}

// A const can be exported too.
export const PI = 3.14159;

// One list at the bottom keeps exports easy to scan.
export { subtract };

// A DEFAULT export: the "main dish" of this module.
// A file may have many named exports but only ONE default.
export default function describeModule() {
  return "I am mathUtils - I do maths for you!";
}

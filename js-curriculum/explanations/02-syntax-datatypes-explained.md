# 02 - Basic Syntax: Variables, Operators, Data Types (Explained)

Matching file: `code/02-syntax-datatypes.js`

---

## PART 1: Variables — boxes that store values

A variable is a **labelled box** in memory: the label is the name, the content is the value. You can look inside it, print it, or (with `let`) swap the contents later.

```js
let studentName = "Ada";
let age = 20;

console.log(studentName);   // Ada
console.log(age);           // 20
```

- `let` creates the box; `=` puts a value inside it.
- Naming rules: start with a letter/`_`/`$`, no spaces, case-sensitive.

---

## PART 2: let vs const (and why var is old news)

- `let` — a box whose contents **can** be replaced later.
- `const` — a box that is **sealed**: once filled, never changed.
- `var` — the 1995 way. Still works, but modern JS uses `let`/`const`.

```js
let score = 10;
score = 15;              // allowed
console.log(score);      // 15

const birthYear = 2006;
// birthYear = 2007;     // TypeError: Assignment to constant variable.
console.log(birthYear);  // 2006
```

- Re-assigning a `const` crashes the program at that line — the sealed box refuses.

**Output:**
```
15
2006
```

---

## PART 3: Data type — Strings (text)

A string is **text wrapped in quotes** — single or double both work. It is how JS stores words, names, sentences.

```js
let greeting = "Hello, world!";
let city = 'Lagos';

console.log(typeof greeting);   // string
```

- `typeof` is a built-in question: "what type of value is this?"

**Output:**
```
Hello, world!
Lagos
string
```

---

## PART 4: Data type — Numbers

JS has **one** number type for both whole numbers and decimals.

```js
let wholeNumber = 42;
let price = 19.99;
let negative = -7;

console.log(typeof wholeNumber);   // number
```

**Output:**
```
42 19.99 -7
number
```

---

## PART 5: Data type — Booleans (true/false)

A boolean is a **light switch**: ON (`true`) or OFF (`false`). It answers yes/no questions.

```js
let isRaining = false;
let hasTicket = true;

console.log(typeof hasTicket);   // boolean
```

**Output:**
```
false
true
boolean
```

---

## PART 6: Data type — Arrays (ordered lists)

An array is an **egg tray**: several values in one container, each in a numbered slot. **Slots start at 0!**

```js
let fruits = ["mango", "banana", "orange"];

console.log(fruits[0]);      // "mango"  - first slot is 0
console.log(fruits[2]);      // "orange" - third slot
console.log(fruits.length);  // 3
console.log(typeof fruits);  // object
```

- `fruits[1]` is the *second* item — off-by-one confusion is the classic beginner trap.
- `typeof` says "object": arrays are objects with numbered slots.

**Output:**
```
[ 'mango', 'banana', 'orange' ]
mango
orange
3
object
```

---

## PART 7: Data type — Objects (labelled properties)

An object is an **ID card**: one thing with many labelled details attached.

```js
let student = {
  name: "Ada",
  age: 20,
  isEnrolled: true
};

console.log(student.name);     // "Ada"  - dot notation
console.log(student["age"]);   // 20     - bracket notation
console.log(typeof student);   // object
```

- Dot notation is the everyday choice; brackets are needed when the key is in a variable or has spaces.

**Output:**
```
{ name: 'Ada', age: 20, isEnrolled: true }
Ada
20
object
```

---

## PART 8: Operators — doing maths

```js
console.log(10 + 3);   // 13   addition
console.log(10 - 3);   // 7    subtraction
console.log(10 * 3);   // 30   multiplication
console.log(10 / 3);   // 3.33 division
console.log(10 % 3);   // 1    remainder (what is left over)
console.log(2 ** 3);   // 8    power
```

- `%` (remainder) is the secret weapon for "is it even?" (`n % 2 === 0`) and FizzBuzz.

---

## PART 9: Operators — comparing values

Comparisons ask a yes/no question and answer with a **boolean**.

```js
console.log(5 > 3);      // true
console.log(5 === 5);    // true  - strictly equal
console.log(5 !== 4);    // true  - not equal
console.log(5 === "5");  // false - different TYPES (number vs string)
```

- `===` compares **value AND type**. `==` (loose) converts types first and causes weird bugs — always prefer `===`.

**Output:**
```
true
false
true
true
false
```

---

## PART 10: Operators — joining strings and logic

```js
let firstName = "Ada";
let lastName = "Obi";
console.log(firstName + " " + lastName);   // Ada Obi

console.log(true && false);   // false - AND: both must be true
console.log(true || false);   // true  - OR: at least one true
console.log(!true);           // false - NOT: flips it
```

**Output:**
```
Ada Obi
false
true
false
```

---

## PART 11: Try it yourself

Practice tasks — a `const` country plus a `let` population, printing the **last** item of a 4-item array (watch the numbering!), a `car` object, predicting `17 % 5`, and explaining why `10 === "10"` is false. Students write and run these themselves.

---

## Quick summary

1. `let` = changeable box, `const` = sealed box, `var` = old way.
2. Strings = quoted text; numbers = `42`/`19.99`; booleans = `true`/`false`.
3. Arrays = ordered lists starting at index **0**; objects = labelled properties.
4. `typeof` reveals a value's type.
5. Maths: `+ - * / % **`; compare with `===` and `!==`.
6. Logic: `&&` (AND), `||` (OR), `!` (NOT).

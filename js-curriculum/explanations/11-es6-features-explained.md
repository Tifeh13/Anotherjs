# 11 - ES6 Features (Explained)

Matching file: `code/11-es6-features.js`

---

## PART 1: What is ES6?

JavaScript was born in 1995 with some awkward habits. In 2015 it got a huge upgrade called **ES6** (ECMAScript 2015) — think of it as a **phone software update**: same phone, new buttons that make everything easier.

The features here are the ones modern JS developers use **every day**.

---

## PART 2: Template literals — strings with superpowers

```js
let name = "Ada";
let age = 20;

console.log("My name is " + name + " and I am " + age + " years old.");
console.log(`My name is ${name} and I am ${age} years old.`);
console.log(`Next year I will be ${age + 1}.`);

let menu = `1. Rice
2. Beans
3. Yam`;
console.log(menu);
```

- Old way: gluing with `+`, remembering where the spaces go.
- New way: **backticks** (`` ` ``) with `${}` placeholders.
- `${}` holds any **expression** — `age + 1` is calculated before printing.
- Backticks keep **line breaks** exactly as typed — no more `\n`.

**Output:**
```
My name is Ada and I am 20 years old.
My name is Ada and I am 20 years old.
Next year I will be 21.
1. Rice
2. Beans
3. Yam
```

---

## PART 3: Object destructuring — unpack the suitcase

An object is a suitcase with labelled items. Destructuring pulls them out in one line:

```js
let student = { name: "Chinedu", age: 22, course: "Computer Science" };

let { name, age, course } = student;

console.log(name);     // Chinedu
console.log(age);      // 22
console.log(course);   // Computer Science

let { name: fullName } = student;
console.log(fullName); // Chinedu
```

- The variable names must **match** the property names.
- `name: fullName` renames while unpacking — "take `name`, call it `fullName`".

**Output:**
```
Chinedu
22
Computer Science
Chinedu
```

---

## PART 4: Array destructuring — pull by position

```js
let colours = ["red", "green", "blue"];

let [first, second, third] = colours;

console.log(first);    // red
console.log(second);   // green
console.log(third);    // blue

let [, , onlyBlue] = colours;
console.log(onlyBlue); // blue
```

- Objects unpack by **name**, arrays by **position**.
- Commas with holes **skip** positions.

**Output:**
```
red
green
blue
blue
```

---

## PART 5: Default parameters (a spare tyre)

If the caller forgets an argument, the default steps in — no more `undefined` surprises.

```js
function orderDrink(drink = "water", size = "medium") {
  console.log(`One ${size} ${drink}, please!`);
}

orderDrink();                      // One medium water, please!
orderDrink("zobo");                // One medium zobo, please!
orderDrink("smoothie", "large");   // One large smoothie, please!
```

**Output:**
```
One medium water, please!
One medium zobo, please!
One large smoothie, please!
```

---

## PART 6: Spread operator (...) — spread the contents out

The three dots **spread** an array's items out of their container:

```js
let fruits = ["mango", "banana"];
let moreFruits = ["orange", ...fruits];

console.log(moreFruits);   // [ 'orange', 'mango', 'banana' ]

let copy = [...fruits];
copy.push("cherry");

console.log(fruits);   // [ 'mango', 'banana' ]      (untouched!)
console.log(copy);     // [ 'mango', 'banana', 'cherry' ]

let allSubjects = [...[1, 2, 3], ...[4, 5, 6]];
console.log(allSubjects);   // [ 1, 2, 3, 4, 5, 6 ]
```

- `...fruits` in a new array **copies** the items — changes to the copy never touch the original.
- Spread also merges arrays and (in objects) clones properties.

**Output:**
```
[ 'orange', 'mango', 'banana' ]
[ 'mango', 'banana' ]
[ 'mango', 'banana', 'cherry' ]
[ 1, 2, 3, 4, 5, 6 ]
```

---

## PART 7: Rest operator (...) — gather everything in

The **same three dots, the opposite job**: in a parameter list, rest gathers all remaining arguments into one array.

```js
function countEverything(first, ...theRest) {
  console.log("First:", first);
  console.log("The rest:", theRest);
}

countEverything("a", "b", "c", "d");

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2));           // 3
console.log(sum(1, 2, 3, 4, 5));  // 15
```

- Rest must be the **last** parameter.
- It powers functions that accept **any** number of arguments.

**Output:**
```
First: a
The rest: [ 'b', 'c', 'd' ]
3
15
```

---

## PART 8: Spread vs rest — same dots, different jobs

```js
let box = [1, 2, 3];
console.log(...box);       // spread: unpacking the box OUT

function pack(...items) {  // rest: packing items IN
  console.log(items);
}
pack(1, 2, 3);
```

- Position tells you which: in a **call/array** → spread; in a **parameter list** → rest.

**Output:**
```
1 2 3
[ 1, 2, 3 ]
```

---

## PART 9: Real example — clean user profile function

Destructuring + defaults + template literals in one signature:

```js
function printProfile({ name, role = "student", scores = [] }) {
  let total = scores.reduce((sum, s) => sum + s, 0);
  console.log(`${name} (${role}) - total score: ${total}`);
}

printProfile({ name: "Ada", scores: [70, 80, 90] });
printProfile({ name: "Bola" });
```

- The single object parameter is unpacked into named values with defaults — the standard modern pattern for options-style arguments.

**Output:**
```
Ada (student) - total score: 240
Bola (student) - total score: 0
```

---

## PART 10: Try it yourself

Practice tasks — a template-literal sentence from two variables, destructuring `{ title, author }` from a book object, `average(...numbers)` with rest, and merging + copying friend arrays with spread. Students write and run these themselves.

---

## Quick summary

1. ES6 = the big 2015 modernisation of JavaScript.
2. Template literals: backticks + `${expression}` — cleaner strings, multi-line for free.
3. Destructuring: unpack objects by **name** `{ a, b }`, arrays by **position** `[x, y]`.
4. Default parameters fill in for missing arguments.
5. Spread (`...`) unpacks arrays; rest (`...`) gathers arguments. Same dots, opposite jobs.

# 13 - Async/Await (Explained)

Matching file: `code/13-async-await.js`

---

## PART 1: The problem with long .then() chains

Chained `.then()`s work, but deep chains read like a story written as one endless sentence.

`async/await` is **sugar coating**: the same promises underneath, but the code reads **top-to-bottom** like normal steps.

Two magic words:

- **`async`** — marks a function as promise-friendly
- **`await`** — "pause here until the promise settles"

---

## PART 2: async functions always return a promise

```js
async function sayHello() {
  return "Hello from an async function";
}

console.log(sayHello());   // Promise { ... }

sayHello().then(function (message) {
  console.log(message);
});
```

- Putting `async` before a function **wraps its return value in a promise** automatically.
- So an async function can be consumed with `.then` like any other promise.

**Output:** `Promise { 'Hello from an async function' }` then `Hello from an async function`

---

## PART 3: await — waiting without freezing

```js
function waitTwoSeconds() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Finally done waiting!");
    }, 2000);
  });
}

async function run() {
  console.log("Waiting...");
  let message = await waitTwoSeconds();   // pause HERE
  console.log(message);                    // runs 2s later
}

run();

console.log("(The program kept running - proof await is not freezing!)");
```

- `await` pauses **only that async function** — the rest of the program keeps running.
- When the promise settles, the function resumes from exactly where it paused.
- Node keeps the process alive until pending promises finish, so the message still prints.

**Output (order):**
```
Waiting...
(The program kept running - proof await is not freezing!)
Finally done waiting!
```

---

## PART 4: Rewriting a .then() chain with await

```js
function step1() { return Promise.resolve("Step 1 done"); }
function step2(prev) { return prev + " -> Step 2 done"; }
function step3(prev) { return prev + " -> Step 3 done"; }

async function runSteps() {
  let first  = await step1();
  let second = await step2(first);
  let third  = await step3(second);
  console.log(third);
}

runSteps();
```

- Same relay race as promise chaining — but each runner has its **own line**.
- Named intermediates (`first`, `second`) are easier to debug than chain values.

**Output:** `Step 1 done -> Step 2 done -> Step 3 done`

---

## PART 5: Error handling — try/catch comes back

With plain promises we used `.catch()`. With `await`, a rejected promise **throws** — so normal `try-catch` (Lesson 05!) handles it. Same safety net, familiar shape.

```js
function checkAge(age) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (age >= 18) resolve("Access granted");
      else reject(new Error("You must be 18 or older"));
    }, 500);
  });
}

async function tryToEnter(age) {
  try {
    let message = await checkAge(age);
    console.log(message);
  } catch (error) {
    console.log("Caught:", error.message);
  }
}

tryToEnter(16);   // Caught: You must be 18 or older
tryToEnter(21);   // Access granted
```

- `await rejectedPromise` and `throw` are now the same thing to `catch`.

**Output:**
```
Caught: You must be 18 or older
Access granted
```

---

## PART 6: Sequential vs parallel (an important habit)

`await` one-by-one = **sequential** (slow, but needed when step 2 uses step 1's result). Start promises first, await together = **parallel** (fast).

```js
function boil(msg, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(msg), ms));
}

async function sequential() {
  console.time("sequential");
  let a = await boil("rice", 1000);    // finishes at 1s
  let b = await boil("beans", 1000);   // starts AFTER rice! ends at 2s
  console.log(a, b);
  console.timeEnd("sequential");       // ~2000ms
}

async function parallel() {
  console.time("parallel");
  let pa = boil("rice", 1000);         // BOTH start immediately
  let pb = boil("beans", 1000);
  let a = await pa;
  let b = await pb;
  console.log(a, b);
  console.timeEnd("parallel");         // ~1000ms
}

sequential().then(parallel);
```

- The `await` keyword is what forces waiting. **Starting** a promise does not wait — awaiting it does.
- Only go parallel when the tasks are independent of each other.

**Output:** sequential ~2000ms, parallel ~1000ms.

---

## PART 7: Combining async/await with fetch

`fetch` is the browser's built-in way to request data from the internet (Node 18+ has it too). It returns a promise — a perfect partner for `await`.

```js
async function getUser() {
  try {
    let response = await fetch("https://randomuser.me/api/?results=1");
    let data = await response.json();
    let user = data.results[0];
    console.log(`${user.name.first} ${user.name.last} - ${user.email}`);
  } catch (error) {
    console.log("Network problem:", error.message);
  }
}

getUser();
```

- **Two awaits, two waits:** one for the response *arriving*, one for turning the body into JSON.
- Forgetting the second `await` is the #1 beginner mistake — you'd log a promise, not data.

---

## PART 8: Real example — fetch with status check

```js
async function loadUsers() {
  try {
    let response = await fetch("https://randomuser.me/api/?results=3");

    if (!response.ok) {                       // 404, 500, etc.
      throw new Error("HTTP error! Status: " + response.status);
    }

    let data = await response.json();
    data.results.forEach(function (user, i) {
      console.log(`${i + 1}. ${user.name.first} (${user.location.country})`);
    });
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

loadUsers();
```

- **Important:** `fetch` does **not** reject on 404/500 — only on network failure. Always check `response.ok` yourself and throw if it is false.

**Output:** three numbered users with their countries.

---

## PART 9: Try it yourself

Practice tasks — an async function awaiting a 1-second promise, converting `flipCoin` into an awaited try-catch call, fetching one user's email only, and adding `.finally()` to a chain. Students write and run these themselves.

---

## Quick summary

1. `async` marks a function — it **always** returns a promise.
2. `await` pauses that function until the promise settles; code reads top to bottom.
3. `await` is only legal inside `async` functions (or top-level in modules).
4. A rejected awaited promise **throws** — handle it with `try-catch`.
5. Await sequentially when steps depend on each other; start-then-await for parallel speed.
6. `fetch` + `await` + `response.json()` = the daily bread of modern JS. Check `response.ok`!

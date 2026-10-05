# 12 - Promises (Explained)

Matching file: `code/12-promises.js`

---

## PART 1: What is a promise?

Order jollof rice at a restaurant. You do not get food instantly — the waiter hands you a **receipt** that *promises* your food is coming.

Eventually one of two things happens:

- **FULFILLED** — your jollof arrives (success)
- **REJECTED** — "Sorry, we finished jollof." (failure)

A Promise in JavaScript is that **receipt**: an object representing a value you will have **later**. While waiting, the promise is **pending**.

Every promise moves one way: `pending` → `fulfilled` **or** `rejected`, never backwards, never both.

---

## PART 2: Why do we need promises?

Some things take **time**: downloads, file reads, timers. JS does not freeze while waiting — it starts the task, hands you a promise, and moves on.

```js
console.log("1. Order placed");

setTimeout(function () {
  console.log("3. Food arrives (2 seconds later)");
}, 2000);

console.log("2. Meanwhile, I check my phone");
```

- The `setTimeout` callback is registered, and JS **continues immediately** — it does not stand at the counter waiting.

**Output (in this exact order):**
```
1. Order placed
2. Meanwhile, I check my phone
3. Food arrives (2 seconds later)
```

---

## PART 3: Creating a promise

A promise takes a function with two doors: `resolve(value)` = success, `reject(error)` = failure.

```js
let myPromise = new Promise(function (resolve, reject) {
  let foodReady = true;

  if (foodReady) {
    resolve("Here is your jollof rice!");
  } else {
    reject("Sorry, we finished jollof.");
  }
});

console.log(myPromise);
```

- `new Promise(executor)` — the executor runs **immediately** and decides which door to open.
- Whatever is passed to `resolve` becomes the value the `.then` handlers receive.

**Output:** `Promise { 'Here is your jollof rice!' }`

---

## PART 4: .then() and .catch() — collecting the result

```js
let orderFood = new Promise(function (resolve, reject) {
  let kitchenOpen = false;

  if (kitchenOpen) {
    resolve("Food is ready!");
  } else {
    reject("Kitchen is closed.");
  }
});

orderFood
  .then(function (message) {
    console.log("Success:", message);
  })
  .catch(function (error) {
    console.log("Failed:", error);
  });
```

- `.then(fn)` runs **only on success**; `.catch(fn)` **only on failure** — exactly one of them runs.
- Flip `kitchenOpen` to `true` and the `.then` branch fires instead.

**Output:** `Failed: Kitchen is closed.`

---

## PART 5: A real promise — download simulation

In real code, functions **return** promises — callers then decide how to handle them.

```js
function downloadFile(fileName) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`${fileName} downloaded!`);
    }, 1500);
  });
}

console.log("Download starting...");

downloadFile("photo.jpg").then(function (message) {
  console.log(message);
});

console.log("(This prints BEFORE the download finishes)");
```

- Calling the function starts the timer and returns the pending promise at once.
- 1.5 seconds later `resolve` fires and `.then` finally prints.

**Output (order matters):**
```
Download starting...
(This prints BEFORE the download finishes)
photo.jpg downloaded!
```

---

## PART 6: Chaining — one step after another

`.then` returns a **new promise**, so steps line up. Each `.then` receives whatever the previous step **returned** — this is how we escape "callback hell".

```js
function step1() {
  return Promise.resolve("Step 1 done");
}
function step2(previous) {
  return previous + " -> Step 2 done";
}
function step3(previous) {
  return previous + " -> Step 3 done";
}

step1()
  .then(step2)
  .then(step3)
  .then(function (finalResult) {
    console.log(finalResult);
  });
```

- The result flows down the chain like a baton in a relay race.
- A step returning a plain value passes it on; returning a **promise** means the chain waits for it first.

**Output:** `Step 1 done -> Step 2 done -> Step 3 done`

---

## PART 7: Error handling in chains

One `.catch()` at the **end** catches a failure from **any** step above it — one safety net under the whole staircase.

```js
function checkAge(age) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (age >= 18) {
        resolve("Access granted");
      } else {
        reject(new Error("You must be 18 or older"));
      }
    }, 1000);
  });
}

checkAge(16)
  .then(function (message) {
    console.log(message);
    return "Next step ran";
  })
  .then(function (next) {
    console.log(next);
  })
  .catch(function (error) {
    console.log("Caught:", error.message);
  });
```

- The rejection **skips every `.then`** and drops straight to `.catch`.
- Change 16 to 21 and both `.then`s run instead.

**Output:** `Caught: You must be 18 or older`

---

## PART 8: Promise.all — wait for many at once

Run several tasks in **parallel** and wait for all:

```js
let p1 = new Promise((resolve) => setTimeout(() => resolve("Rice ready"), 1000));
let p2 = new Promise((resolve) => setTimeout(() => resolve("Chicken ready"), 2000));
let p3 = new Promise((resolve) => setTimeout(() => resolve("Drinks ready"), 1500));

Promise.all([p1, p2, p3]).then(function (results) {
  console.log(results);
});
```

- Results arrive **in original order**, not completion order.
- Total wait = the **slowest** promise (2s), not the sum (4.5s) — the kitchen cooks everything simultaneously.
- If **one** fails, the whole `Promise.all` fails.

**Output:** `[ 'Rice ready', 'Chicken ready', 'Drinks ready' ]`

---

## PART 9: Try it yourself

Practice tasks — a 3-second resolved promise, `flipCoin()` resolving "HEADS"/rejecting "TAILS" randomly, a three-step 1-second chain ending in "ready -> set -> go", and `Promise.all` with two promises. Students write and run these themselves.

---

## Quick summary

1. A Promise = a receipt for a value you will have later. States: `pending` → fulfilled or rejected.
2. `new Promise((resolve, reject) => {...})` creates one.
3. `.then(success)` / `.catch(failure)` / `.finally(always)`.
4. `.then` chains run steps in order; each receives the previous step's return value.
5. One `.catch` at the end nets every error above it.
6. `Promise.all` waits for many promises in parallel.

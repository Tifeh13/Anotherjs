# 12 - Promises: Handling Things That Take Time

Matching file: [code/12-promises.js](../code/12-promises.js)

**How to run:** `node 12-promises.js` (uncomment one block at a time). Every example finishes in under 2 seconds, so the class never sits waiting.

**What the student should be able to do by the end:**
1. Explain why JavaScript cannot simply "wait" for slow work.
2. Describe a promise as a placeholder for a future value, with three states.
3. Read and write `.then / .catch / .finally`.
4. Explain why a missing `return` breaks a chain.
5. Use `Promise.all` and say when it is faster than awaiting one at a time.

---

## How I would teach this lesson (45-60 minutes)

| Time | What happens |
|---|---|
| 0-5 min | Part 1: run the `setTimeout` order demo. Ask them to predict the order **before** running. |
| 5-10 min | Part 2: show the callback "pyramid" and name the pain. Do not teach callbacks in depth - just let them feel it. |
| 10-20 min | Parts 3-5: the receipt story, the three states, `resolve`/`reject`, `then`/`catch`/`finally`. |
| 20-30 min | Parts 6-8: a function that returns a promise, chaining, `return` bug, one `catch` at the end. |
| 30-40 min | Part 9: `Promise.all`. Do the timing demo and let them see 1.5s, not 3s. |
| 40-50 min | Students attempt Part 11 tasks 1-3 in class; tasks 4-5 as homework. |
| 50-60 min | Recap with the summary, then ask the three checkpoint questions below. |

The one sentence to repeat all lesson:

> **Starting a slow job is not the same as finishing it.**

---

## PART 1: The problem

Start on the board with two columns:

```
SYNCHRONOUS (instant)          ASYNCHRONOUS (takes time)
let x = 2 + 2;                 asking a server for data
Math.max(3, 9);                reading a file
"abc".toUpperCase();           waiting for a click
```

Ask: *"What would happen if the browser stood still for 5 seconds every time a page loaded data?"* Let them answer. The page freezes: no scrolling, no typing, no clicking.

That is why JavaScript never waits. It starts the job, stores a callback, and continues.

```js
console.log("1. I place my order");

setTimeout(function () {
  console.log("3. The food arrives (2 seconds later)");
}, 2000);

console.log("2. While I wait, I check my phone");
```

**Before running**, ask the class to write down the order. Then run it.

**Output:**
```
1. I place my order
2. While I wait, I check my phone
3. The food arrives (2 seconds later)
```

Why line 2 first? `setTimeout` does not sleep. It registers the function with a timer and returns immediately, so the next line runs. The callback is only picked up when the timer fires and the current code has finished.

Two useful words to introduce here:
- **synchronous** - runs now, in order, blocks everything else.
- **asynchronous** - starts now, finishes later, does not block.

If you have a browser open, the DevTools **Sources** panel and a `debugger` statement make this vivid: the program is not sitting inside `setTimeout`.

---

## PART 2: Why callbacks alone were painful

Show the shape, do not run it:

```js
loginUser("ada", function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      showOnPage(comments, function () {
        console.log("Finally done - four levels deep!");
      });
    });
  });
});
```

Name the three problems:
1. It grows **sideways** - the "pyramid of doom".
2. Each level needs its own error handling.
3. Reading order and execution order stop matching.

A promise flattens this into one object with one success path and one failure path.

---

## PART 3: A promise is a receipt

Use the story, then draw it:

```
   You order jollof
         |
         v
   +----------------+        kitchen works...
   |    RECEIPT     |  <-- pending
   +----------------+
        /       \
       /         \
  food arrives   "we finished jollof"
   fulfilled        rejected
```

| State | Restaurant | JavaScript |
|---|---|---|
| `pending` | waiting with the receipt | still working |
| `fulfilled` | the food arrives | succeeded, with a **value** |
| `rejected` | "we finished jollof" | failed, with an **error** |

Three rules to state clearly:
1. A promise is an **object**, not the value. The value arrives later.
2. It moves one way only: `pending` -> `fulfilled` **or** `rejected`.
3. Once settled it never changes. Asking again does not re-run the kitchen.

```js
let receipt = new Promise(function (resolve) {
  resolve("Jollof rice");
});

console.log(receipt);   // Promise { 'Jollof rice' }
```

Note for the class: Node prints `Promise { 'Jollof rice' }`; Chrome prints `Promise {<fulfilled>: 'Jollof rice'}`. Same object, different display.

**Ask:** *"If I print the receipt, have I printed the food?"* No - you printed the container.

---

## PART 4: Creating a promise - two doors

```js
let order = new Promise(function (resolve, reject) {
  let kitchenOpen = true;

  if (kitchenOpen) {
    resolve("Here is your jollof rice!");
  } else {
    reject(new Error("Sorry, we finished jollof."));
  }
});
```

- The function you pass in is the **executor**. It runs **immediately**.
- `resolve(value)` opens the success door; `reject(reason)` opens the failure door.
- Only the **first** call counts. A later `reject()` after `resolve()` is ignored.
- Reject with `new Error(...)`, not a bare string. An Error carries a message and a stack trace, which is what you need when debugging.

Prove the executor runs immediately:

```js
console.log("Before new Promise");

new Promise(function (resolve) {
  console.log("Inside the executor - runs right now!");
  resolve("done");
}).then(function (value) {
  console.log("Then runs later, with:", value);
});

console.log("After new Promise");
```

**Output:**
```
Before new Promise
Inside the executor - runs right now!
After new Promise
Then runs later, with: done
```

This is a good place to say: **`.then` callbacks never interrupt running code. They queue and run after the current code finishes.** That detail explains many "why is my output in this order?" questions later.

Flip `kitchenOpen` to `false` and rerun to show the rejection path.

**Important detail - always chain `.then` and `.catch` together:**

```js
// GOOD - one chain
order
  .then(function (food) { console.log("Success:", food); })
  .catch(function (error) { console.log("Failure:", error.message); });

// RISKY - two separate calls
order.then(function (food) { console.log("Success:", food); });
order.catch(function (error) { console.log("Failure:", error.message); });
```

In the risky version, `order.then(...)` returns a **new** promise that also rejects when `order` rejects, and that derived promise has no handler. The `order.catch(...)` handles the original promise but not the derived one. In the browser you get an extra `Uncaught (in promise)` warning; in Node 24 the process exits with an unhandled-rejection error, even though the catch printed the message. This costs students hours, so teach the chained form from day one.

---

## PART 5: `.then`, `.catch`, `.finally`

```js
function checkResult(score) {
  return new Promise(function (resolve, reject) {
    if (score >= 50) resolve("You passed with " + score);
    else reject(new Error("You scored " + score + " - try again"));
  });
}

checkResult(72)
  .then(function (message) { console.log("Then:   ", message); })
  .catch(function (error)   { console.log("Catch:  ", error.message); })
  .finally(function ()      { console.log("Finally: result checked"); });
```

**Output for 72:**
```
Then:    You passed with 72
Finally: result checked
```

**Output for 30:**
```
Catch:   You scored 30 - try again
Finally: result checked
```

Rules:
- Exactly **one** of `then` / `catch` runs.
- `finally` runs **either way** - use it to hide a spinner, close a file, reset a button.
- The value passed to `resolve` / `reject` arrives as the **parameter** of the callback (`message`, `error`).
- Always add a `.catch`. A rejected promise with no handler shows `Uncaught (in promise)` and can crash Node.

**Checkpoint question:** *"Why does `finally` exist if I could copy the same line into both `then` and `catch`?"* Because then you would have two copies to keep in sync, and an error thrown inside `then` would skip the copy.

---

## PART 6: A function that returns a promise

This is the pattern students will actually meet: the slow work is hidden inside a function, and the caller receives a promise.

```js
function downloadFile(fileName, milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(fileName + " downloaded!");
    }, milliseconds);
  });
}

console.log("Download starting...");

downloadFile("photo.jpg", 1500).then(function (message) {
  console.log(message);
});

console.log("(This prints BEFORE the download finishes)");
```

**Output:**
```
Download starting...
(This prints BEFORE the download finishes)
photo.jpg downloaded!          <- 1.5 seconds later
```

Trace it aloud with the class:
1. `downloadFile` creates the promise, starts the timer, and returns the **pending** promise now.
2. `.then` registers what to do when it settles.
3. The last `console.log` runs.
4. The timer fires, `resolve` runs, `.then` runs.

**Why this design?** The function knows *how* to download; the caller decides *what to do* afterwards. That separation is why `fetch()` returns a promise instead of printing data itself.

---

## PART 7: Chaining - the relay race

```js
function step1() { return Promise.resolve("Step 1 done"); }
function step2(previous) { return previous + " -> Step 2 done"; }
function step3(previous) { return previous + " -> Step 3 done"; }

step1()
  .then(step2)
  .then(step3)
  .then(function (finalResult) {
    console.log(finalResult);
  });
```

**Output:** `Step 1 done -> Step 2 done -> Step 3 done`

Key ideas:
- `.then` returns a **new promise**, which is why chaining works.
- Each `.then` receives whatever the previous one **returned**.
- `Promise.resolve(value)` is shorthand for "an already-fulfilled promise". It is useful for testing and for starting a chain from a plain value.
- If a step returns a **promise**, the chain waits for it before continuing.

Then show the classic bug:

```js
step1()
  .then(function (previous) {
    previous + " -> Step 2 done";     // no return!
  })
  .then(function (result) {
    console.log("BUG:", result);      // undefined
  });
```

A function without `return` produces `undefined`, so the baton is dropped. Have students find this bug in their own code before you show the fix.

The waiting demo:

```js
function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

wait(500)
  .then(function () {
    console.log("first 0.5s passed");
    return wait(500);                 // wait for this too
  })
  .then(function () {
    console.log("second 0.5s passed");
  });
```

If you forget `return wait(500)`, both lines print together at 0.5s. Returning the promise is what sequences the steps. This is the exact habit needed for API calls in lesson 14.

---

## PART 8: Error handling in a chain

```js
checkAge(16)
  .then(function (message) { console.log("Step A:", message); return "Step B ran"; })
  .then(function (next)    { console.log("Step C:", next); })
  .catch(function (error)  { console.log("Caught:", error.message); });
```

**Output (16):** `Caught: You must be 18 or older`

The rejection **skips every `.then`** and lands in the nearest `.catch`.

**Output (21):**
```
Step A: Access granted
Step C: Step B ran
```

Three rules:
1. One `.catch` at the end is a net under the whole staircase.
2. An error **thrown** inside a `.then` also lands in `.catch`.
3. After a `.catch`, the chain **continues**. Whatever `.catch` returns becomes the input to later `.then`s. That is how you build a fallback.

```js
Promise.reject(new Error("Primary server down"))
  .catch(function (error) {
    console.log("Recovering from:", error.message);
    return "Using cached data";
  })
  .then(function (data) {
    console.log("Recovered:", data);
  });
```

**Output:**
```
Recovering from: Primary server down
Recovered: Using cached data
```

Ask: *"Is a `.catch` in the middle the same as a `.catch` at the end?"* No. In the middle it catches errors above it, then the chain keeps going, so later steps still run. At the end it is the final net. Both are valid; choose deliberately.

---

## PART 9: `Promise.all` - many orders at once

```js
function cook(food, milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve(food + " ready"); }, milliseconds);
  });
}

console.time("Promise.all");

Promise.all([
  cook("Rice", 1000),
  cook("Chicken", 1500),
  cook("Drinks", 500)
]).then(function (results) {
  console.log(results);
  console.timeEnd("Promise.all");
});
```

**Output:**
```
[ 'Rice ready', 'Chicken ready', 'Drinks ready' ]
Promise.all: ~1500ms
```

Two things students must notice:
1. Results are in the **original order**, not finish order. Drinks finished first and is still third.
2. Total time is the **slowest** task (1.5s), not the sum (3s). All pots were on the fire at once.

Draw the timeline:

```
0s ────── 0.5s ────── 1.0s ────── 1.5s
          Drinks ✔     Rice ✔      Chicken ✔  -> then runs
```

Then the failure rule: **if any promise rejects, `Promise.all` rejects immediately**, even if the others would have succeeded.

`Promise.allSettled` waits for all and reports each outcome:

```js
Promise.allSettled([
  Promise.resolve("Rice ready"),
  Promise.reject(new Error("Chicken burned")),
  Promise.resolve("Drinks ready")
]).then(function (results) {
  results.forEach(function (result) {
    if (result.status === "fulfilled") console.log("OK:  ", result.value);
    else console.log("FAIL:", result.reason.message);
  });
});
```

**Output:**
```
OK:   Rice ready
FAIL: Chicken burned
OK:   Drinks ready
```

Quick reference table:

| Method | Resolves when | Use for |
|---|---|---|
| `Promise.all` | all succeed | "I need all of this before rendering" |
| `Promise.allSettled` | all settle | "show what loaded, report the rest" |
| `Promise.race` | first settles | timeouts, fastest mirror |
| `Promise.any` | first succeeds | redundant servers |

---

## PART 10: Where they will meet promises

List these on the board so the lesson connects to real work:

- `fetch(url)` -> a promise for a Response (lesson 14).
- `response.json()` -> a promise for parsed data (lesson 14).
- `fs.promises.readFile(path)` -> a promise for file contents.
- database queries, clipboard reads, geolocation, animations.

Then preview lesson 13: async/await is the same promises with a friendlier face.

```js
// Promise style
downloadFile("photo.jpg", 1500)
  .then(function (message) { console.log(message); })
  .catch(function (error)   { console.log(error.message); });

// async/await style (next lesson)
async function showDownload() {
  try {
    let message = await downloadFile("photo.jpg", 1500);
    console.log(message);
  } catch (error) {
    console.log(error.message);
  }
}
```

---

## PART 11: Tasks

1. Write `wait(ms)` returning a promise; call `wait(1000).then(...)`.
2. Write `flipCoin()` resolving `"HEADS"` or rejecting `Error("TAILS")`; run it five times.
3. Chain three `wait(500)` calls to print `ready`, `set`, `go`, half a second apart.
4. Time `Promise.all` with 300ms and 700ms waits; prove the total is ~700ms.
5. Fix the missing-`return` bug.

**Task 5 answer:** add `return` before the string in the first `.then`.

```js
wait(300)
  .then(function () { return "finished"; })
  .then(function (value) { console.log(value); });
```

---

## Checkpoint questions (with the answers you want to hear)

1. **"What are the three states of a promise, and can it go backwards?"**
   Pending, fulfilled, rejected; no - once settled it is final.
2. **"Why does `.then` run after the rest of the current code?"**
   Promise callbacks are queued, not executed immediately; they run when the stack is clear.
3. **"What does a `.then` callback receive?"**
   Whatever the previous step returned - a value or a promise's resolved value.
4. **"Why is `Promise.all` faster than awaiting each task separately?"**
   All tasks start at once; the total wait is the slowest, not the sum.
5. **"What happens to a rejected promise with no `.catch`?"**
   An unhandled rejection warning/error; in Node it can terminate the process.

---

## Common student mistakes and the one-line fix

| Mistake | What they see | Fix |
|---|---|---|
| Forgetting `return` in a `.then` | `undefined` in the next step | return the value or promise |
| Writing `.then` after `await`-style thinking | code runs before data arrives | keep the work inside the callback |
| No `.catch` | `Uncaught (in promise)` | add `.catch` at the end |
| Rejecting with a string | `error.message` is `undefined` | reject with `new Error(...)` |
| Expecting `Promise.all` to return in finish order | wrong index mapping | results keep input order |
| Using `Promise.all` when one failure is acceptable | whole thing fails | use `Promise.allSettled` |

---

## Quick summary

1. Slow work finishes later; JS does not freeze while waiting.
2. A promise is a receipt for a future value: `pending` -> fulfilled or rejected.
3. `new Promise((resolve, reject) => {...})`; the executor runs immediately; only the first call counts.
4. `.then` / `.catch` / `.finally`.
5. `.then` returns a new promise; return values to pass them on, return promises to wait.
6. One `.catch` at the end catches every error above it.
7. `Promise.all` runs tasks in parallel, keeps input order, fails if any one fails.
8. `fetch` and `response.json` are promises - next lesson makes them readable.

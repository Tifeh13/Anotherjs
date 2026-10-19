# 13 - Async/Await: Promises That Read Like Normal Code

Matching file: [code/13-async-await.js](../code/13-async-await.js)

**Before this lesson:** promises (lesson 12). If a student cannot say what `.then` returns, reread lesson 12 first.

**How to run:** `node 13-async-await.js`, one uncommented block at a time. Parts 1-7 need no internet; Part 8 calls a real API.

**What the student should be able to do by the end:**
1. Explain that `async/await` is a nicer syntax for promises, not a new feature.
2. Predict the output order of `await` code.
3. Rewrite a `.then` chain as an `async` function with `try/catch`.
4. Choose sequential vs parallel deliberately.
5. Spot the two most common bugs: a missing `await`, and `await` inside `forEach`.

---

## How I would teach this lesson (45-60 minutes)

| Time | What happens |
|---|---|
| 0-5 min | Part 1: show the same job in both styles. Do not explain every symbol yet. |
| 5-15 min | Parts 2-3: `async` returns a promise; `await` is a bookmark. Run the order demo and trace it line by line. |
| 15-25 min | Part 4: rewrite the lesson 12 chain. Let them compare side by side. |
| 25-35 min | Part 5: `try/catch/finally`, and the mapping table to `.then/.catch/.finally`. |
| 35-45 min | Part 6: timing demo. Ask them to predict both totals before running. |
| 45-52 min | Part 7: the `forEach` trap. This is the one that costs real debugging hours. |
| 52-60 min | Part 8 preview + summary. Do not teach the API details yet - that is lesson 14. |

The sentence to repeat:

> **`await` is a bookmark, not a pause button for the program.**

A second one that lands well with students:

> **`await` does not make things slow. It makes the waiting visible.**

---

## PART 1: The readability problem

Put both versions of the same job on the board:

```js
// Promise chain - you read it "inside out"
getUser()
  .then(function (user) { return getPosts(user); })
  .then(function (posts) { return getComments(posts[0]); })
  .then(function (comments) { console.log(comments); })
  .catch(function (error) { console.log(error); });

// async/await - you read it top to bottom
async function show() {
  try {
    let user     = await getUser();
    let posts    = await getPosts(user);
    let comments = await getComments(posts[0]);
    console.log(comments);
  } catch (error) {
    console.log(error);
  }
}
```

Ask: *"Which one tells you the order of events without following arrows?"* The second.

Define the two words in one line each:
- `async` - "this function will do some waiting, and it always returns a promise."
- `await` - "pause this function until the promise settles, then give me its value."

Then say the thing that prevents the biggest misconception:

> **Nothing new is happening under the hood.** The engine still creates promises and chains `.then` internally. `async/await` is syntax sugar - a more comfortable way to write the same thing.

If a student thinks `await` is some magic blocking feature, they will write `await` everywhere and be surprised by parallel behaviour later.

---

## PART 2: `async` always returns a promise

```js
async function sayHello() {
  return "Hello from an async function";
}

let result = sayHello();
console.log(result);          // Promise { 'Hello from an async function' }

result.then(function (message) {
  console.log("Unwrapped:", message);
});
```

**Output:**
```
Promise { 'Hello from an async function' }
Unwrapped: Hello from an async function
```

The function returned a **string**, but the caller received a **promise**. That is the automatic wrapping.

Three consequences to state:
1. `console.log(sayHello())` will never show the string.
2. Callers must `await` it or `.then` it.
3. An async function is a normal promise, so `Promise.all` accepts it.

**Throwing inside an async function rejects its promise:**

```js
async function explode() {
  throw new Error("Something broke");
}

explode().catch(function (error) {
  console.log("Caught from async function:", error.message);
});
```

**Output:** `Caught from async function: Something broke`

This is a nice bridge to Part 5: you do not need a special `reject` parameter in async functions. `throw` is the reject button.

**Ask:** *"Where did `reject` go?"* Answer: an async function has no `resolve`/`reject` parameters; `return` is resolve, `throw` is reject.

---

## PART 3: `await` - waiting without freezing

This is the critical demo. **Before running it, ask students to predict the order.**

```js
function waitTwoSeconds() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Finally done waiting!");
    }, 2000);
  });
}

async function run() {
  console.log("1. run() started");
  let message = await waitTwoSeconds();   // bookmark
  console.log("3. " + message);
}

run();
console.log("2. The program kept running while run() waited");
```

**Output:**
```
1. run() started
2. The program kept running while run() waited
3. Finally done waiting!          <- after 2 seconds
```

Trace it on the board in four steps:

```
1. run() starts, prints "1", calls waitTwoSeconds()
2. await sees a pending promise -> bookmarks the spot,
   returns control to the caller
3. main program prints "2"
4. timer fires -> promise resolves -> run() resumes at the
   bookmark, prints "3"
```

Point at line 2 and ask: *"If `await` froze the program, where would this line print?"* Last. It prints second, so nothing froze.

Important details:
- `message` is the **string**, not a promise. `await` unwraps it.
- Without `await`, `message` would be a pending promise.
- Node stays alive while the timer is pending; when it fires, the function resumes and the process can exit normally.
- `await` only pauses **its own async function**. Other code, other async functions, and other timers keep going.

Prove that last point:

```js
async function order(food, ms) {
  await new Promise(function (resolve) { setTimeout(resolve, ms); });
  console.log(food + " is ready");
}

order("Rice", 1000);
order("Beans", 1000);
console.log("Both orders started at once");
```

**Output:**
```
Both orders started at once
Rice is ready
Beans is ready
```

Both waited at the same time. They did not queue. That is the seed of Part 6.

---

## PART 4: Rewriting a chain

```js
async function runSteps() {
  let first  = await step1();
  let second = await step2(first);
  let third  = await step3(second);
  console.log(third);
}
```

**Output:** `Step 1 done -> Step 2 done -> Step 3 done`

Why this is better for beginners:
- Each result has a **name**, so you can log it on its own line.
- Reading order equals execution order.
- `try/catch` replaces the trailing `.catch`, and students already know it.
- Adding a branch or a loop does not require restructuring the chain.

The relay-race model is unchanged: each step receives the previous step's value.

**Subtle but important:** the awaits here are sequential because each step uses the previous one. Do not let students conclude "await is slow". Part 6 shows the difference.

---

## PART 5: `try` / `catch` / `finally`

```js
async function tryToEnter(age) {
  console.log("Checking age " + age + "...");
  try {
    let message = await checkAge(age);
    console.log("Success:", message);
  } catch (error) {
    console.log("Caught: ", error.message);
  } finally {
    console.log("Door check finished");
  }
}

tryToEnter(16);
tryToEnter(21);
```

**Output (the middle lines can be in either order because both checks start together):**
```
Checking age 16...
Checking age 21...
Caught:  You must be 18 or older
Door check finished
Success: Access granted
Door check finished
```

The mapping table to write on the board:

| Promises (lesson 12) | async/await (this lesson) |
|---|---|
| `.then(success)` | the lines after `await` |
| `.catch(failure)` | `catch (error) { ... }` |
| `.finally(always)` | `finally { ... }` |
| `reject(new Error(...))` | `throw new Error(...)` |
| `resolve(value)` | `return value` |

Rules:
- A rejected `await` **throws at that line**. Everything below it in `try` is skipped.
- Without `try/catch`, you get `Uncaught (in promise)` and, in Node, the process can exit with a non-zero code.
- `finally` runs whether it succeeded or failed - ideal for hiding a loading spinner.
- `catch` receives the error, so use `error.message` (this is the same Error object from lesson 05).

**Ask:** *"Can I use `.catch()` on an async function call?"* Yes - the function returns a promise, so `tryToEnter(16).catch(...)` is legal. But mixing both styles in one function is confusing. Pick one per layer.

---

## PART 6: Sequential vs parallel

Draw the two timelines before running anything.

```
SEQUENTIAL
0s ──────── 1s ──────── 2s
[ Rice .... ][ Beans .... ]        total ~2s

PARALLEL
0s ──────── 1s
[ Rice .... ]
[ Beans ... ]                      total ~1s
```

```js
async function sequential() {
  let rice  = await boil("Rice", 1000);    // starts now
  let beans = await boil("Beans", 1000);   // starts AFTER rice
  console.log(rice, "|", beans);
}

async function parallel() {
  let ricePromise  = boil("Rice", 1000);   // both start now
  let beansPromise = boil("Beans", 1000);
  let rice  = await ricePromise;
  let beans = await beansPromise;
  console.log(rice, "|", beans);
}

sequential().then(parallel);
```

**Output:** `sequential: ~2000ms`, then `parallel: ~1000ms`.

The key sentence:

> **Calling a function that returns a promise starts the work. `await` is what waits.**

So in `parallel`, both timers were already running before the first `await`.

The idiomatic short form:

```js
let [rice, beans] = await Promise.all([
  boil("Rice", 1000),
  boil("Beans", 1000)
]);
```

When must you stay sequential?
- Step 2 needs step 1's result: `let user = await getUser(id); let posts = await getPosts(user.id);`
- The second action must happen only if the first succeeded.
- You are rate-limited and must not fire requests simultaneously.

When should you go parallel?
- Independent data for one screen: user + posts + settings.
- Several images or files to download.
- Anything where the total time currently equals the sum of waits.

**Ask:** *"If the rice takes 1 second and the beans take 1 second, why is parallel not 0 seconds?"* Because the slowest task still takes 1 second. Parallelism removes the *queue*, not the work.

---

## PART 7: The `forEach` trap

Show the broken code first and ask what is wrong:

```js
foods.forEach(async function (food) {
  await boil(food, 500);
  console.log(food + " done");
});
console.log("All done!");
```

`forEach` calls the callback for each item and **does not wait** for the returned promises. So `"All done!"` can print before any food is ready. Each callback pauses itself; nobody waits for the group.

Two correct tools:

```js
// One at a time, in order
for (let food of foods) {
  let result = await boil(food, 500);
  console.log(result);
}

// All at once, in parallel
let results = await Promise.all(foods.map(function (food) {
  return boil(food, 500);
}));
```

Rule of thumb:
- Order matters, one at a time -> `for...of`.
- Independent, speed matters -> `Promise.all` with `.map`.
- Never `await` inside `forEach` and expect it to pause the loop.

**Ask:** *"Why does `for...of` work but `forEach` does not?"* Because `for...of` is a loop in the async function itself, so `await` pauses the function. `forEach` takes a callback, and the loop does not inspect what the callback returns.

---

## PART 8: First taste of `fetch` (do not over-teach)

Keep this short. Lesson 14 is the API lesson; here you only show that the promise skills apply.

```js
async function getUser() {
  try {
    let response = await fetch("https://randomuser.me/api/?results=1");
    console.log("Status:", response.status);

    let data = await response.json();       // second wait
    let user = data.results[0];
    console.log(user.name.first + " " + user.name.last);
    console.log(user.email);
  } catch (error) {
    console.log("Network problem:", error.message);
  }
}

getUser();
```

Explain the two waits:

```
fetch(url)             -> promise for a RESPONSE (status + headers arrive)
await                  -> response object
response.json()        -> promise for the PARSED BODY
await                  -> real JavaScript object
```

The metaphor students remember:

> **The first await gives you the parcel. The second await opens it.**

The #1 bug:

```js
let data = response.json();      // forgot await
console.log(data.results);       // undefined
```

`data` is a promise, not an object. `data.results` does not exist.

Also preview the trap that lesson 14 solves properly: `fetch` does **not** reject on a 404 or 500. A "not found" answer still resolves, so you must check `response.ok` yourself.

---

## PART 9: Tasks and answers

1. **Async function awaiting a 1-second promise.** Check they return a promise and use `.then` or `await`.
2. **`flipCoin` with try/catch.** Expected shape:
   ```js
   async function play() {
     try { console.log(await flipCoin()); }
     catch (error) { console.log("Bad luck:", error.message); }
   }
   ```
3. **Sequential vs parallel timing.** Expect ~3x difference when the three loads are equal. Ask them to explain the gap in one sentence.
4. **Bug hunt.** The bug is a missing `await` on `fetch`, plus no `.json()` and no `response.ok` check. Fixed:
   ```js
   async function load() {
     let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
     if (!response.ok) throw new Error("HTTP " + response.status);
     let data = await response.json();
     console.log("loaded", data);
   }
   ```
5. **Parallel list.** Expect:
   ```js
   let responses = await Promise.all(ids.map(id =>
     fetch("https://jsonplaceholder.typicode.com/todos/" + id)
   ));
   let todos = await Promise.all(responses.map(r => r.json()));
   console.log(todos.map(t => t.title));
   ```
   Point out the two rounds: first all requests, then all bodies. (Lesson 14 explains why bodies are separate.)

---

## Checkpoint questions (with answers you want to hear)

1. **"What does an async function return?"** Always a promise - even for a plain value.
2. **"Does `await` freeze the whole program?"** No, only the async function it is inside.
3. **"What does `await promise` give you?"** The resolved value, or it throws the rejection.
4. **"How do you catch a rejected await?"** `try/catch` around it; `finally` for cleanup.
5. **"When is sequential correct?"** When a later step needs an earlier result.
6. **"Why is `await` inside `forEach` broken?"** The loop does not wait for the callback's promise.
7. **"What is the difference between `fetch` and `response.json`?"** One waits for the response, the other parses the body; both are promises.

---

## Common student mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| `let data = response.json();` | `undefined` fields | `await response.json()` |
| `await` at the top level of a `.js` file | `SyntaxError: await is only valid...` | wrap in `async function`, or use `.mjs` |
| `await` in `forEach` | loop finishes early, logs out of order | `for...of` or `Promise.all(map)` |
| `async` function called without handling | `Uncaught (in promise)` | `await` it, `.then/.catch` it, or try/catch inside |
| All awaits chained when independent | page loads slowly | start promises first, then await, or `Promise.all` |
| `await` on `fetch` but not on `.json()` | promise printed instead of data | two awaits |

---

## Quick summary

1. `async/await` is promise syntax sugar - same machines, friendlier controls.
2. Async functions always return a promise; `throw` rejects it.
3. `await` bookmarks its own function; the rest of the program keeps running.
4. `await` yields the value; a rejection becomes a `throw`, handled by `try/catch/finally`.
5. Sequential when steps depend on each other; parallel when they do not.
6. `for...of` to await one at a time; `Promise.all` + `map` to await together; never `forEach`.
7. `fetch` first, `response.json()` second - two separate waits, two separate promises.

# 14 - Fetch API (Explained)

Matching files: `code/14-fetch-api.js`, `code/index.html`

**How to run:** browser console on `index.html` (F12 → Console), or Node 18+ in the terminal. Internet access required for the example APIs.

---

## PART 1: What is an API?

A restaurant: you (the app) never walk into the kitchen. You give the **waiter** your order, the waiter goes to the kitchen (the **server**) and brings back your food (the **data**).

An API is that waiter — a structured way for your code to **ask** a server for data and **receive** it.

---

## PART 2: Your first fetch()

`fetch(url)` sends a GET request and returns a **promise** that resolves to a **Response object** — the waiter's tray, not your food yet.

```js
fetch("https://randomuser.me/api/?results=1")
  .then(function (response) {
    console.log(response);          // the full Response object
    console.log(response.status);   // 200 = OK
    console.log(response.ok);       // true when status is 200-299
  });
```

- `status` — the HTTP code (`200` OK, `404` not found, `500` server error).
- `ok` — convenience boolean: `true` when status is 200–299.

**Output:** the Response object, `200`, `true`.

---

## PART 3: The response object (the tray, not the meal)

The response carries `.status`, `.ok`, and **headers** (extra info). The **body** — the actual data — is still packed; you must unpack it.

```js
fetch("https://randomuser.me/api/?results=1")
  .then(function (response) {
    console.log("Status:", response.status);
    console.log("OK?:    ", response.ok);
    console.log("Headers:", response.headers.get("content-type"));
  });
```

**Output:**
```
Status: 200
OK?:     true
Headers: application/json; charset=utf-8
```

---

## PART 4: response.json() — unpacking the data

`.json()` reads the body and parses the JSON **text** into a real JavaScript object. It **also returns a promise** — so we chain another `.then`. (The #1 beginner trap!)

```js
fetch("https://randomuser.me/api/?results=1")
  .then(function (response) {
    return response.json();     // unpack the food!
  })
  .then(function (data) {
    console.log(data);                          // the actual object
    console.log(data.results[0].name.first);    // a name from it
  });
```

- Two waiting steps: response arrives → body becomes JSON.
- Other body readers exist: `.text()` for plain text, `.blob()` for files.

**Output:** the full data object and the user's first name.

---

## PART 5: The same thing with async/await (cleaner)

```js
async function getUser() {
  let response = await fetch("https://randomuser.me/api/?results=1");
  let data = await response.json();
  console.log(`${data.results[0].name.first} - ${data.results[0].email}`);
}

getUser();
```

- Identical steps as Part 4, flat and readable.
- **Two awaits:** 1) response arrives, 2) body becomes JSON.

**Output:** e.g. `Ada - ada@example.com` (random user each run).

---

## PART 6: Handling errors (the .ok trap!)

`fetch` only **rejects on network failure**. A 404 or 500 still **resolves**! You must check `response.ok` yourself.

```js
async function safeFetch(url) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    let data = await response.json();
    console.log("Got data:", data);
  } catch (error) {
    console.log("Fetch failed:", error.message);
  }
}

safeFetch("https://randomuser.me/api/?results=1");       // works
safeFetch("https://randomuser.me/api/DOES-NOT-EXIST");   // 404 caught!
```

- Without the `response.ok` check, the 404 would flow into `data` as if it were real data.

**Output:** the user object, then `Fetch failed: HTTP 404 - Not Found`.

---

## PART 7: Displaying fetched data on the page

Real apps fetch data, then **render** it with the DOM skills from Lessons 06–10.

```js
async function showUser() {
  let box = document.getElementById("user-result");
  box.textContent = "Loading...";

  try {
    let response = await fetch("https://randomuser.me/api/?results=1");
    if (!response.ok) throw new Error("HTTP " + response.status);

    let data = await response.json();
    let user = data.results[0];

    box.innerHTML = `
      <strong>${user.name.first} ${user.name.last}</strong><br>
      ${user.email}<br>
      <img src="${user.picture.medium}" alt="user photo">`;
  } catch (error) {
    box.textContent = "Could not load user: " + error.message;
  }
}

document.getElementById("load-user-btn")
        .addEventListener("click", showUser);
```

- Show a **loading state first** — fetch takes time and users need feedback.
- The template literal injects trusted, app-built HTML — fine for `innerHTML`.
- Click **"Load a random user"** on the page to see it live.

---

## PART 8: Sending data with POST

GET asks **for** data; POST **sends** data. Describe the request with an options object:

```js
async function createPost() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "My first post",
      body: "Written from the browser console!",
      userId: 1
    })
  });

  let data = await response.json();
  console.log(data);   // the fake server echoes it back with an id
}

createPost();
```

- `method` — the verb (`GET` default, `POST`, `PUT`, `DELETE`).
- `headers` — telling the server "this body is JSON".
- `body` — the payload; `JSON.stringify` converts a JS object → JSON **text**. (`response.json()` is the exact reverse.)

**Output:** the created post echoed back, now with an `id: 101`.

---

## PART 9: Real example — loading a list

```js
async function loadPosts() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  let posts = await response.json();

  let ul = document.createElement("ul");
  posts.forEach(function (post) {
    let li = document.createElement("li");
    li.textContent = post.title;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}

loadPosts();
```

- The `?_limit=5` is a **query string** — asking the server for only 5 posts.
- **fetch → json → forEach → createElement → append** — that loop IS modern web development.

**Output:** five post titles as a list at the bottom of the page.

---

## PART 10: Try it yourself

Practice tasks — fetching and logging 5 user names, reading a todo's title and completed status from jsonplaceholder, a try-catch + `response.ok` fetch tested against a bad URL, and rendering 5 users' photos and names with `createElement`/`appendChild`. Students build these themselves.

---

## Quick summary

1. `fetch(url)` asks a server for data; it returns a promise resolving to a Response object.
2. `response.status` / `response.ok` describe the HTTP result.
3. The body needs unpacking: `await response.json()` (also a promise!). `.text()` / `.blob()` for other formats.
4. `fetch` does **not** reject on 404/500 — check `response.ok`.
5. POST sends data: `method` + `headers` + `JSON.stringify` body.
6. Pipeline: **fetch → json → forEach → render with DOM**.

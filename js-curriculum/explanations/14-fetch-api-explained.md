# 14 - APIs and `fetch()`: How Programs Talk to Each Other

Matching files: [code/14-fetch-api.js](../code/14-fetch-api.js), [code/index.html](../code/index.html)

**How to run:** open `index.html`, press F12 -> Console, paste one uncommented part at a time. Parts 1-10, 12 and 13 also run in Node 18+ (`node 14-fetch-api.js`), but parts 11 and 15 need the DOM.

**Internet required.** The examples use free, keyless APIs so students can run everything themselves.

If the school network blocks these hosts, the lesson still works: point the same `fetch` calls at a local mock server (or run them from a phone hotspot). The concepts being taught - status, headers, JSON, 404, POST - are identical; only the host changes.

**What the student should be able to do by the end:**
1. Explain what an API is and why apps use them instead of shipping all data inside the app.
2. Read an endpoint URL and say what each piece does.
3. Choose the right HTTP method for a job (GET vs POST vs PUT/PATCH/DELETE).
4. Read a status code and know whether the fault is theirs (4xx) or the server's (5xx).
5. Write a GET request with `fetch`, parse JSON, and render the result.
6. Explain why `fetch` does not reject on a 404, and handle both kinds of failure.
7. POST JSON to a server correctly, with method, headers and body.
8. Explain API keys, CORS and rate limits at a beginner level.

---

## The lesson in one paragraph (say this first)

> An API is a menu of things another computer lets your program ask for. Your code is the customer, the API's server is the kitchen, and HTTP is the waiter carrying orders and trays. You never enter the kitchen; you choose from the menu, send a request, and get back a response with a status and some data. `fetch()` is the JavaScript function that sends the order, and JSON is how the food usually comes wrapped.

If they remember only that, the rest of the lesson has a place to attach to.

---

## How I would teach this lesson (60-90 minutes)

This is the longest lesson in the block, so split it if your sessions are 45 minutes.

### Session A: the concepts (45 min)

| Time | What happens |
|---|---|
| 0-10 | Part 1: the restaurant story, board drawing. Ask what apps they use that must call an API. |
| 10-18 | Part 2: request/response cycle. Draw the four-step conversation. |
| 18-26 | Part 3: URL anatomy. Put one URL on the board and have students label it. |
| 26-34 | Part 4: methods. The CRUD table. Emphasise "GET never changes data". |
| 34-42 | Part 5: status codes. Quiz them with numbers: "404? 500? 201?" |
| 42-45 | Recap the chain: method + URL -> status + body. |

### Session B: doing it (45 min)

| Time | What happens |
|---|---|
| 0-8 | Part 6: first `fetch`. Show the Response object and the Network tab. |
| 8-16 | Parts 7-8: the second wait. Let them hit the missing-`await` bug on purpose. |
| 16-26 | Part 9: the two kinds of failure. This is the most important part of the lesson. |
| 26-34 | Parts 10-11: query parameters and rendering on the page. |
| 34-42 | Part 12: POST. Run it and point at status 201. |
| 42-45 | Part 14: keys, CORS, rate limits - concepts only, no code-along. |

### Session C: build (45 min)

| Time | What happens |
|---|---|
| 0-5 | Walk through the GitHub finder code in Part 15. |
| 5-25 | Students build it, then extend it (Part 16 task 6). |
| 25-35 | Deliberately break things: wrong username, no internet, rate limit. |
| 35-45 | Checkpoint quiz (below). |

---

## PART 1: What is an API?

Start with something they already understand: ordering food.

```
   YOU                 WAITER                KITCHEN
 (your code)          (HTTP)               (the server)
     |                   |                     |
     |  "one jollof"     |                     |
     |------------------>|-------------------->|
     |                   |                     |
     |                   |<--------------------|
     |<------------------|   tray of food      |
```

Then label the board:

| Restaurant | Programming |
|---|---|
| Menu | API documentation - what you are allowed to ask for |
| Waiter | HTTP - carries the request and the reply |
| Kitchen | The server that owns the data |
| Your order | The request |
| The tray | The response (status + headers + body) |
| The food | The data (usually JSON) |

**The key boundary:** you never touch the server's database. You can only use the doors the API exposes. That is what "interface" means - a controlled surface.

### Why not just put the data in the app?

Ask the class: *"Why doesn't a weather app just include tomorrow's weather in the code?"* Because it changes every few minutes, and one app serves millions of cities. The data lives where it is produced; the app asks for it when needed.

Same for bank balances, football scores, chat messages, your school results.

### What does the data look like?

Most APIs return **JSON** - JavaScript Object Notation. It is a JavaScript object written as text:

```json
{
  "id": 1,
  "title": "hello",
  "done": false,
  "tags": ["school", "demo"]
}
```

Because it is text, any language can produce and consume it. Python, PHP, Java, JavaScript - all speak JSON.

**Say this:** *"JSON is how computers pass notes in class. Everyone can read the same note, even if they speak a different language at home."*

**Common misconception:** students think an API is a website. Clarify: a website returns HTML for humans; an API returns data for programs. The same server can do both, but the endpoint and the format differ.

---

## PART 2: The request/response cycle

Draw this and keep it on the board for the whole lesson:

```
YOUR CODE
   |
   |  REQUEST
   |  method + URL + headers + (body)
   v
+----------------------+
|        SERVER        |
|  who are you?        |
|  what do you want?   |
|  are you allowed?    |
+----------------------+
   |
   |  RESPONSE
   |  status + headers + body
   v
YOUR CODE
   1. check the status
   2. read the body
```

Every single API call in the rest of their career is this shape.

A raw HTTP request is just text:

```
GET /posts/1 HTTP/1.1
Host: jsonplaceholder.typicode.com
Accept: application/json
```

A raw response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{ "id": 1, "title": "..." }
```

You never type this by hand; `fetch` builds it from a URL and an options object. But seeing the raw form removes the magic. If you have curl available, `curl -i https://jsonplaceholder.typicode.com/posts/1` shows the real headers and body - a nice five-minute demo.

### The two waits (plant this seed now)

```
wait 1: the response arrives          (status, headers)
wait 2: the body is read and parsed   (data)
```

Everything confusing about `fetch` comes from merging these two into one mental step. Repeat it when you reach Parts 7-8.

---

**Ask before moving on:** *"If I called this API from my phone's browser, would the request go through my phone or my laptop?"* Through the phone - the client is whichever device runs the code. That makes "client" feel concrete.

---

## PART 3: Anatomy of an endpoint

Put this URL on the board and label it with the class:

```
https://jsonplaceholder.typicode.com/posts/1?userId=1
\___/   \_________________________/\_____/\________/
scheme            host             path     query
```

| Piece | Meaning | In plain English |
|---|---|---|
| `https://` | scheme | how to connect, encrypted |
| `jsonplaceholder.typicode.com` | host | which server |
| `/posts/1` | path | which resource |
| `?userId=1` | query | how to filter/shape it |

An **endpoint** is one specific door: a method + a path. `/posts` is a collection. `/posts/1` is one item in it.

Query strings:
- start with `?`
- are `key=value` pairs
- join multiple pairs with `&`
- never change *which* resource you asked for, only how it comes back

```
/posts?userId=1&_limit=5
```

Read aloud: *"posts, belonging to user 1, only five of them."*

**Board exercise:** write these three URLs and ask what each asks for.

1. `https://jsonplaceholder.typicode.com/comments?postId=1`
2. `https://randomuser.me/api/?results=3&nat=ng`
3. `https://api.open-meteo.com/v1/forecast?latitude=6.52&longitude=3.37&current_weather=true`

Answers: comments on post 1; three Nigerian users; current weather at Lagos coordinates.

**Critical habit:** endpoints come from documentation, not guesswork. Every API has docs listing endpoints, parameters, auth and example responses. Reading documentation is a skill you should practise in class, not hide.

---

## PART 4: HTTP methods - the verbs

Write this table and keep it:

| Method | Job | CRUD | Has a body? | Example |
|---|---|---|---|---|
| `GET` | read | R | no | get post 1 |
| `POST` | create | C | yes | create a post |
| `PUT` | replace | U | yes | replace post 1 entirely |
| `PATCH` | update some fields | U | yes | change post 1's title |
| `DELETE` | remove | D | usually no | delete post 1 |

`fetch(url)` with no options is a GET. That is why the first examples only needed a URL.

**PUT vs PATCH** - use a student record:

```
PUT   /students/7  { name, age, class }   -> everything replaced
PATCH /students/7  { class: "JSS 3" }     -> only class changes
```

If you `PUT` without the name, the name is gone (or reset). If you `PATCH`, the other fields survive. That distinction is worth a minute because it causes real data loss.

**The safety rule:** GET must never change data. Browsers, caches, link previews and crawlers all assume a GET is safe to repeat. Using GET for "delete this" is a genuine bug that can wipe data when a page is prefetched.

**Rest vocabulary:** a `method + path` pair is a REST endpoint. Now they can read a job advert that says "REST API" and know it means exactly this pattern.

---

## PART 5: Status codes

Teach the families first, not the numbers:

| Family | Meaning | Whose fault? |
|---|---|---|
| 2xx | success | nobody's |
| 3xx | moved / redirect | nobody's, follow the new URL |
| 4xx | bad request | **yours** |
| 5xx | server broke | **theirs** |

Then the short list:

| Code | Name | When you meet it |
|---|---|---|
| 200 | OK | normal GET |
| 201 | Created | successful POST |
| 204 | No Content | successful DELETE/PUT with no body |
| 400 | Bad Request | malformed JSON, missing field |
| 401 | Unauthorized | missing/wrong API key or login |
| 403 | Forbidden | valid key, no permission (or rate limit) |
| 404 | Not Found | wrong URL or resource does not exist |
| 429 | Too Many Requests | rate limit exceeded |
| 500 | Internal Server Error | API bug |
| 503 | Service Unavailable | API down/maintenance |

The sentence to chant:

> **4xx = I asked badly. 5xx = they broke.**

Use a school analogy:
- 200: "Here are your results."
- 404: "There is no student with that name."
- 401: "You are not signed in."
- 403: "You are signed in, but this is not your file."
- 500: "The records office caught fire."

**Quiz (30 seconds each):** "You sent a POST with a missing title. 400 or 500?" (400.) "The API is down for maintenance." (503.) "You typed the URL wrong." (404.) "Your free plan ran out of requests." (429/403.)

**The trap to plant before `fetch`:** a 404 is still a *successful HTTP conversation*. `fetch` will not throw. That is the next concept they need.

---

## PART 6: The first GET

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(function (response) {
    console.log(response);
    console.log("Status:", response.status);
    console.log("OK?", response.ok);
    console.log("Content-Type:", response.headers.get("content-type"));
  });
```

**Output:**
```
Response { ... }
Status: 200
OK? true
Content-Type: application/json; charset=utf-8
```

Explain what the Response object is and is not:

- It **is** the status, headers, final URL.
- It is **not** the parsed data. The body is still packed.
- `.ok` is a convenience boolean: `true` for 200-299.

Analogy: the waiter has returned with a covered tray. You can see the receipt taped to it (status) and the label (content-type), but the food is still covered.

**Show the Network tab now.** DevTools -> Network, run the fetch, click the request:

- **Headers**: method, URL, status code
- **Preview**: parsed JSON
- **Response**: raw body text

Say: *"The console tells you what your code received. The Network tab tells you what actually crossed the wire. When an API misbehaves, the Network tab is where you look first."*

This single habit will save them hours.

---

## PART 7: Reading the body

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(function (response) {
    console.log("Step 1 - response arrived:", response.status);
    return response.json();          // must return it
  })
  .then(function (post) {
    console.log("Step 2 - body parsed:");
    console.log("Title:", post.title);
  });
```

**Output:**
```
Step 1 - response arrived: 200
Step 2 - body parsed:
Title: sunt aut facere repellat provident occaecati...
```

Why `.json()` is a second wait: the body arrives as a stream of bytes, and parsing it into an object takes work. So `.json()` returns a **promise**, not an object.

The three body readers:

| Reader | Use for | Result |
|---|---|---|
| `response.json()` | JSON APIs | object/array |
| `response.text()` | HTML, CSV, plain text | string |
| `response.blob()` | images, PDFs, audio | Blob |

**Body can only be read once.** This is a stream, not a stored string. Call `.json()` twice and you get:

```
TypeError: Failed to execute 'json' on 'Response': body stream already read
```

If you need both, read once and keep the result. If you need the raw text AND the object: `let text = await response.text(); let data = JSON.parse(text);`

**The missing-`return` bug:** have students run the broken version and see `undefined`:

```js
fetch(url)
  .then(function (response) {
    response.json();          // forgot return
  })
  .then(function (post) {
    console.log(post.title);  // TypeError: Cannot read properties of undefined
  });
```

Let them break it, then fix it. Bugs they create are remembered.

**If `Content-Type` is not JSON**, `.json()` fails with a parse error. That usually means the URL returned an HTML error page. Check the status and the content type before blaming the parser.

---

## PART 8: The async/await version

```js
async function getPost() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  console.log("Response arrived. Status:", response.status);

  let post = await response.json();
  console.log("Body parsed:", post);
}

getPost();
```

Same two waits, flat and readable. Tie it explicitly back to lesson 13:

```
fetch(url)        -> promise
await             -> Response   (the tray)
response.json()   -> promise
await             -> data       (the food)
```

**The #1 beginner bug:**

```js
let data = response.json();
console.log(data.title);   // undefined - data is a promise
```

Say: *"The first await gives you the parcel. The second await opens it."*

**Ask:** *"Why can't I just do `let post = await fetch(url)` and use `post.title`?"* Because `fetch` resolves to a Response, not the body. The Response has status and headers; the data is inside the body.

---

## PART 9: Two kinds of failure (the most important part)

Draw two columns:

```
KIND 1: the request never happened
  no internet / DNS / server unreachable / CORS blocked / aborted
  -> fetch REJECTS
  -> catch block runs

KIND 2: the request happened, but the answer is bad
  404, 400, 401, 429, 500...
  -> fetch RESOLVES normally
  -> response.ok === false
  -> NOT an exception unless you throw
```

Why did the designers do this? Because a 404 is a valid answer: the server successfully told you "there is nothing here". The network did its job. `fetch` only rejects when the conversation could not happen.

So the standard pattern is:

```js
try {
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error("HTTP " + response.status + " - " + response.statusText);
  }

  let data = await response.json();
  // safe to use data here
} catch (error) {
  // BOTH kinds land here
}
```

Throwing on `!response.ok` converts KIND 2 into the same path as KIND 1. That gives one error-handling place and guarantees the code after the check only sees successful data.

Run the three-call demo:

```js
safeGet("https://jsonplaceholder.typicode.com/posts/1");       // 200
safeGet("https://jsonplaceholder.typicode.com/nope/nope");     // 404
safeGet("https://this-host-does-not-exist-12345.dev/x");       // network
```

**Output:**
```
Failed: HTTP 404 - Not Found
Failed: Failed to fetch
Success: { userId: 1, id: 1, ... }
```

The network failure message differs by browser (`Failed to fetch` in Chrome, `NetworkError when attempting to fetch resource` in Firefox, `fetch failed` in Node). That is worth mentioning so they do not hunt for a phantom difference.

**What if the JSON is invalid?** `await response.json()` throws a SyntaxError, which is also caught by the same `catch`. That is a third failure mode handled for free.

**Ask:** *"If I remove the `if (!response.ok)` check, what happens on a 404?"* `response.json()` runs on the error body, and the code proceeds as if it had real data. On jsonplaceholder a 404 returns `{}`, so fields become `undefined` and the page silently breaks - the worst kind of bug.

---

## PART 10: Query parameters and exploring JSON

```js
let url = "https://jsonplaceholder.typicode.com/posts?_limit=3&userId=1";
let response = await fetch(url);
let posts = await response.json();

console.log("How many?", posts.length);
console.log(JSON.stringify(posts[0], null, 2));
```

Teach the professional habit in three steps:

1. Fetch once.
2. Print the **shape** with `JSON.stringify(data, null, 2)`.
3. Only then write code that reads fields.

Students often invent field names (`data.name`, `data.user.title`) before looking. The shape tells the truth. Show them how to read a nested object:

```js
{
  "results": [
    {
      "name": { "first": "Ada", "last": "Okafor" },
      "email": "ada@example.com"
    }
  ]
}
```

`data.results[0].name.first` is just walking the tree: object -> array -> object -> object -> string.

**Arrays vs wrapped arrays:** some endpoints return `[ ... ]`, others return `{ results: [ ... ] }`. The API decides. Look before you loop.

**URLSearchParams** instead of string gluing:

```js
let params = new URLSearchParams({ results: 3, nat: "ng" });
let url = "https://randomuser.me/api/?" + params;
```

Why: values with spaces, `&`, or non-English characters must be encoded. `URLSearchParams` does it correctly and is less error-prone than `"?" + "results=" + n`.

---

## PART 11: Rendering the result

Walk through the six-step pattern:

```js
async function loadPosts() {
  let box = document.getElementById("posts-result");
  box.textContent = "Loading posts...";        // 1. loading state

  try {
    let response = await fetch(".../posts?_limit=5");   // 2. fetch
    if (!response.ok) throw new Error("HTTP " + response.status); // 3. check
    let posts = await response.json();                  // 4. parse
    box.textContent = "";
    let list = document.createElement("ul");
    posts.forEach(function (post) {                     // 5. render
      let item = document.createElement("li");
      item.textContent = post.title;
      list.appendChild(item);
    });
    box.appendChild(list);
  } catch (error) {
    box.textContent = "Could not load posts: " + error.message; // 6. error
  }
}
```

Why each step, in the order students forget them:

| Step | Why it exists |
|---|---|
| Loading state | the network takes time; a blank box looks broken |
| `response.ok` check | do not parse an error page as if it were data |
| `textContent` | API text is untrusted; `innerHTML` would execute HTML/scripts |
| Error state in the same box | the user sees what happened, not silence |

**Security habit to start now:** data from outside your program is **text** until you deliberately treat it otherwise. This is the beginning of XSS awareness. If a post title were `<img src=x onerror=alert(1)>`, `innerHTML` would run it; `textContent` would print it harmlessly.

**Ask:** *"Why not clear the box before the fetch finishes?"* Because the loading message is the only feedback the user has. Clear it only when you have something to show.

**Duplicate listeners:** if they paste Part 11 three times, the button gets three listeners and each click renders three lists. Refresh the page between tries. This is a real lesson about `addEventListener`.

---

## PART 12: POST - sending data

```js
let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My first post",
    body: "Written from the browser console!",
    userId: 1
  })
});

console.log("Status:", response.status);   // 201
let created = await response.json();
```

Explain the three parts of the options object:

| Piece | Value | Why |
|---|---|---|
| `method` | `"POST"` | without it, fetch sends GET |
| `headers` | `Content-Type: application/json` | tells the server how to read the body |
| `body` | `JSON.stringify(obj)` | the body must be text |

If you forget `Content-Type`, many real servers return 400 or 415 (Unsupported Media Type), or misread the body entirely. jsonplaceholder is forgiving; production is not.

If you forget `JSON.stringify` and pass the object directly, the body becomes `"[object Object]"` - a classic debugging story. Demonstrate it once; the class will laugh and remember.

**Status 201** means created. The response usually contains the new resource with a server-assigned id.

**Honesty about the fake API:** jsonplaceholder does not persist the post. A GET afterwards will not show it. The server is simulating success so students can practise the client side. Real backends validate, authenticate and write to a database, but your `fetch` call looks identical.

**The two-way street:**

```
object  --JSON.stringify-->  JSON text  --HTTP-->  server
object  <--response.json()-- JSON text  <--HTTP--  server
```

Packing and unpacking. Same format, opposite directions.

---

## PART 13: PUT, PATCH, DELETE

Keep this brief and pattern-based: the only things that change are the **method** and whether the response has a body.

```js
// Replace everything
await fetch(".../posts/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: 1, title: "New", body: "New", userId: 1 })
});

// Change one field
await fetch(".../posts/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Just the title" })
});

// Remove it
let response = await fetch(".../posts/1", { method: "DELETE" });
console.log(response.status);   // 200 or 204
```

Rules:
- `204 No Content` has **no body**. Calling `response.json()` on it throws. Check the status first, or only parse when there is content.
- DELETE is often 200 with a small confirmation object, or 204 with nothing. Both are success.
- `response.ok` is still the right check for all of them.

The endpoint + method grid is the mental model:

```
POST   /posts      create
GET    /posts      list
GET    /posts/1    read one
PUT    /posts/1    replace one
PATCH  /posts/1    update one
DELETE /posts/1    delete one
```

---

## PART 14: Keys, CORS, rate limits

These are the three things that make a real API call fail even when the code is right. Teach them as concepts; students only need to recognise the symptoms.

### API keys

An API key identifies **who is asking** (and often bills them).

```js
fetch("https://api.example.com/data", {
  headers: { "Authorization": "Bearer YOUR_API_KEY_HERE" }
});
```

The key is usually sent in the `Authorization` header, sometimes as a query parameter. Prefer the header: URLs leak into browser history, server logs, screenshots and shared links.

**The rule that keeps them out of trouble:**

> A key in front-end code is public. Anyone can open DevTools and copy it. Secret keys belong on a server you control.

So: browser code -> your backend -> the keyed API. Never the key directly in the browser for anything valuable. Some keys are intentionally public and domain-restricted (map tiles, for example); the docs say which kind you have.

### CORS

Browsers block JavaScript from reading a cross-origin response unless that server explicitly allows it:

```
Access-Control-Allow-Origin: *
```

If it is missing, the console shows:

```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

Three things to tell students:
1. CORS is a **browser security rule**, not a server outage. The request may even have reached the server.
2. You cannot fix it in your `fetch` code. No header you add on the client helps.
3. Fix it on the server, use an API that allows your origin, or call it through your own backend/proxy.

This is why an API can work in Postman or Node but fail in the browser. Postman and Node are not browsers and do not enforce CORS.

### Rate limits

Free tiers limit how often you may ask. GitHub unauthenticated allows 60 requests per hour per IP. Exceed it and you get `403` or `429`.

Habits:
- Do not call an endpoint in a loop when one call returns a list.
- Cache what you already fetched.
- Do not hammer refresh while debugging; you will lock yourself out and misdiagnose it as a code bug.
- GitHub sends headers like `X-RateLimit-Remaining`; read them when in doubt.

**Docs checklist** (make them copy this):

- [ ] base URL
- [ ] endpoint and method
- [ ] parameters and which are required
- [ ] auth: key or not, header or query
- [ ] success response shape
- [ ] error codes
- [ ] rate limit

---

## PART 15: Mini project - GitHub profile finder

This combines every idea in the lesson into something they can show someone.

```js
async function loadProfile() {
  let input = document.getElementById("github-username");
  let box = document.getElementById("github-result");
  let username = input.value.trim();

  if (username === "") {
    box.textContent = "Type a GitHub username first.";
    return;
  }

  box.textContent = "Loading " + username + "...";

  try {
    let response = await fetch(
      "https://api.github.com/users/" + encodeURIComponent(username)
    );

    if (response.status === 404) {
      throw new Error("No GitHub user called " + username);
    }
    if (!response.ok) {
      throw new Error("GitHub said HTTP " + response.status);
    }

    let user = await response.json();
    box.textContent = "";

    let img = document.createElement("img");
    img.src = user.avatar_url;
    img.alt = user.login + " avatar";
    img.width = 80;

    let name = document.createElement("h3");
    name.textContent = user.name || user.login;

    let bio = document.createElement("p");
    bio.textContent = user.bio || "No bio.";

    let stats = document.createElement("p");
    stats.textContent =
      user.followers + " followers - " + user.public_repos + " public repos";

    box.append(img, name, bio, stats);
  } catch (error) {
    box.textContent = "Could not load: " + error.message;
  }
}

document.getElementById("github-btn")
        .addEventListener("click", loadProfile);
```

Points to draw out while they build:

1. **Path parameter:** `/users/{username}` - the username is part of the path, not a query string. Both styles exist; docs tell you which.
2. **`encodeURIComponent`** makes user input safe for a URL. Never glue raw input into a URL.
3. **404 is expected**, not exceptional: the user typed a name that does not exist. Handle it with a specific, friendly message.
4. **403** on GitHub usually means rate limit, not permission.
5. **`textContent`**, always. API text is untrusted.
6. **`user.name || user.login`**: not every account has a display name. Defensive reading of real data.
7. **`img.src`** comes from the API. That is fine for an image URL, but do not build HTML strings from API data.

Test cases to run together:
- `octocat` -> profile renders
- `this-user-does-not-exist-9988` -> 404 message
- empty input -> validation message
- disconnect the network -> `Failed to fetch`
- hammer the button 70 times -> GitHub rate limit (do not do this on the school network; explain it instead)

**Extension ideas (Part 16 task 6-7):**
- show location and a link to the profile
- add a "repositories" section using `/users/{username}/repos?sort=updated&per_page=5`
- a "load posts by user" box for jsonplaceholder

---

## PART 16: Tasks and expected answers

1. **Todo by id / completed filter.** Expect `todo.title`, `todo.completed`, then a filtered list length.
2. **Three random users.** Expect a loop over `data.results`, reading `name.first`, `name.last`, `location.country`.
3. **Open-Meteo weather.** Expect `data.current_weather.temperature` (Celsius). Note the nested object; print the shape first.
4. **Error handling.** Expect a try/catch with `if (!response.ok) throw ...` and the message rendered into a div.
5. **POST a comment.** Expect status 201 and a returned object with an `id`. Check `Content-Type` was set.
6. **GitHub extension.** Expect `createElement("a")`, `link.href = user.html_url`, `link.textContent = "View profile"`.
7. **Posts by user.** Expect `?userId=N`, validation for empty input, a specific message for 404, and a generic one for network failure.

---

## Common errors students will hit (and what to say)

| Symptom | Real cause | Fix |
|---|---|---|
| `data is undefined` / fields undefined | missing `await` on `response.json()` | two awaits |
| `Cannot read properties of undefined (reading 'title')` | `.then` without `return` | return the promise |
| `Failed to fetch` | no internet, wrong host, CORS blocked | check Network tab; CORS needs server/proxy |
| 404 treated as success | no `response.ok` check | throw on `!response.ok` |
| `body stream already read` | called `.json()` twice | read once, store the result |
| `Unexpected token '<'` in JSON parse | server returned HTML (usually an error page) | check status and `Content-Type` |
| 401 / 403 | missing or wrong key, no permission, rate limit | check docs and headers |
| 429 | too many requests | wait, cache, reduce calls |
| `[object Object]` sent as body | forgot `JSON.stringify` | stringify the payload |
| 400 on POST | forgot `Content-Type: application/json` or missing fields | add header, validate body |
| `.json()` on a 204 | no body exists | check status first |
| duplicate results after clicking | listener added multiple times | refresh or use a named handler once |

---

## Checkpoint quiz (with answers)

1. **"What is an API?"**
   A documented way for one program to ask another program for data or actions, usually over HTTP.
2. **"What are the four parts of a request?"**
   Method, URL, headers, optional body.
3. **"What does a status code starting with 4 mean? With 5?"**
   Your request is wrong; the server failed.
4. **"What is the difference between `GET /posts` and `GET /posts/1`?"**
   The collection vs one item.
5. **"Why does `fetch` not throw on a 404?"**
   The HTTP conversation succeeded; a 404 is a valid answer. Check `response.ok`.
6. **"Why are there two awaits in a fetch example?"**
   One for the response, one for reading/parsing the body.
7. **"What does `JSON.stringify` do, and what is its opposite?"**
   Object -> JSON text for sending; `response.json()` parses text -> object.
8. **"Which method creates data? Which only reads?"**
   POST creates; GET only reads.
9. **"Why should secret API keys not live in browser code?"**
   Anyone can read the shipped JavaScript and network traffic.
10. **"What does CORS block, and can your fetch code fix it?"**
    It blocks the browser from reading a cross-origin response without permission; no client-side fix.

---

## Quick summary (the version to leave on the board)

1. API = a menu of doors into another program's data.
2. Request = method + URL + headers (+ body). Response = status + headers + body.
3. Endpoint = base URL + path; query string filters the result.
4. GET reads, POST creates, PUT replaces, PATCH updates, DELETE removes. GET never changes data.
5. 2xx success, 3xx moved, 4xx your fault, 5xx theirs.
6. `fetch(url)` -> promise -> Response. Check `status` / `ok` before parsing.
7. Body is a second wait: `await response.json()`. Read it once.
8. `fetch` only rejects on network-level failures (offline, DNS, CORS, abort); throw on `!response.ok` yourself.
9. POST = method + `Content-Type` header + `JSON.stringify` body.
10. Keys, CORS and rate limits are the real-world gatekeepers. Never ship secrets.
11. Render pattern: loading -> fetch -> ok check -> parse -> `textContent` -> error state.

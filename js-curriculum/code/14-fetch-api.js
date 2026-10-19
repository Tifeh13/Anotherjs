// ============================================================
// 14 - APIs AND fetch(): HOW PROGRAMS TALK TO EACH OTHER
// ============================================================
//
// HOW TO USE THIS FILE:
// Most parts need a WEB PAGE and the internet.
//
//   1. Open index.html (in this folder) in your browser.
//   2. Press F12 -> Console tab.
//   3. Uncomment ONE part, paste it into the Console, press
//      Enter. Read the output, explain it, then move on.
//   4. Refresh the page (F5) before Parts 11 and 15 if you
//      pasted them more than once - event listeners stack up.
//
// Parts 1-10, 12 and 13 also run in Node 18+:
//
//     node 14-fetch-api.js
//
// but you must uncomment the block first. Parts 11 and 15 use
// the DOM, so they are browser-only.
//
// To uncomment: select the lines, press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
//
// INTERNET REQUIRED for every fetch example. If the network is
// down, the code will land in its catch block - which is itself
// a useful lesson.
// ============================================================


// ============================================================
// PART 1: WHAT IS AN API?
// ============================================================
//
// An API (Application Programming Interface) is a way for one
// program to ask another program for something.
//
// THE RESTAURANT PICTURE
//
//   You do not walk into the kitchen and cook. You read the
//   MENU, tell the WAITER what you want, and the waiter takes
//   your order to the KITCHEN. Later the waiter brings back a
//   TRAY with your food.
//
//   You (your code)        = the customer
//   The menu               = the API documentation: what you
//                            are allowed to ask for
//   The waiter             = HTTP: the messenger that carries
//                            your request and the reply
//   The kitchen            = the server: the computer that
//                            actually has the data
//   The tray + food        = the response: status, headers,
//                            and the body (the data)
//
// You never touch the server's database. You only use the
// doors the API offers.
//
// WHY THIS MATTERS IN REAL LIFE
//
//   - A weather app does not measure the weather. It calls a
//     weather API.
//   - "Sign in with Google" is an API.
//   - A payment page calls a payment API.
//   - Your school portal calls an API to load your results.
//
// MOST APIs SPEAK JSON
//
//   JSON looks like a JavaScript object written as text:
//
//     {
//       "id": 1,
//       "title": "hello",
//       "done": false
//     }
//
//   JSON is just text, so it can travel between any two
//   computers, whatever language they are written in.
//
// TWO WORDS YOU WILL HEAR
//
//   CLIENT  = the program asking (your browser, your app)
//   SERVER  = the program answering (the API's computer)
//
//   The client sends a REQUEST. The server sends a RESPONSE.


// ============================================================
// PART 2: THE REQUEST / RESPONSE CYCLE
// ============================================================
//
// Every API call is the same four-step conversation:
//
//   YOUR CODE
//      |
//      |  1. REQUEST  (method + URL + headers + maybe a body)
//      v
//   +---------------------+
//   |       SERVER        |
//   |  checks who you are |
//   |  finds the data     |
//   +---------------------+
//      |
//      |  2. RESPONSE (status + headers + body)
//      v
//   YOUR CODE  ->  3. read status   ->  4. read body
//
// A real HTTP request, in text, looks roughly like this:
//
//   GET /posts/1 HTTP/1.1
//   Host: jsonplaceholder.typicode.com
//   Accept: application/json
//
// And the reply:
//
//   HTTP/1.1 200 OK
//   Content-Type: application/json; charset=utf-8
//
//   { "id": 1, "title": "..." }
//
// You will not write that text by hand. fetch() builds it for
// you from a URL and an options object.
//
// KEY IDEA FOR THE WHOLE LESSON:
//   Asking and receiving are TWO separate waits:
//     1. wait for the response to arrive (status + headers)
//     2. wait for the body to be read and parsed
//   That is why every example has either two .then()s or two
//   awaits.


// ============================================================
// PART 3: ANATOMY OF AN API ENDPOINT
// ============================================================
//
// An ENDPOINT is one specific thing an API lets you ask for.
// It is identified by a URL.
//
//   https://jsonplaceholder.typicode.com/posts/1?userId=1
//   \___/   \_________________________/\_____/\________/
//   scheme           host             path     query
//
//   scheme  https://   how to connect (encrypted HTTP)
//   host    the server's address
//   path    /posts/1   WHICH resource you want
//   query   ?userId=1  HOW you want it filtered or shaped
//
// Read it like a sentence:
//
//   "At this server, give me post number 1."
//
// Or:
//
//   https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5
//
//   "At this server, give me posts, where userId is 1, and
//    only 5 of them."
//
// Query strings start with ? and join pairs with &:
//
//   ?key=value&key2=value2
//
// They never change which resource you are asking for - they
// describe HOW you want it.
//
// YOU DO NOT HAVE TO GUESS ENDPOINTS
//   Every API has documentation: a list of endpoints, the
//   parameters each one accepts, and an example response.
//   Reading the docs is a core developer skill. The examples
//   below use APIs whose docs are public and free.
//
// NO API KEY NEEDED FOR TODAY'S EXAMPLES:
//   jsonplaceholder.typicode.com  - fake posts, todos, users
//   randomuser.me/api             - fake people
//   api.open-meteo.com            - real weather, no key
//   api.github.com                - real GitHub data
//
// Some APIs require a key. Part 14 explains that.


// ============================================================
// PART 4: HTTP METHODS - THE VERBS
// ============================================================
//
// The METHOD tells the server WHAT KIND of action you want.
// Think of the menu verbs:
//
//   METHOD    MEANING              EXAMPLE
//   ------    ------------------   ---------------------------
//   GET       read / fetch         get all posts
//   POST      create something new create a post
//   PUT       replace a resource   replace post 1
//   PATCH     update some fields   change post 1's title
//   DELETE    remove a resource    delete post 1
//
// The four data operations are called CRUD:
//
//   C reate -> POST
//   R ead   -> GET
//   U pdate -> PUT or PATCH
//   D elete -> DELETE
//
// HOW TO REMEMBER PUT vs PATCH
//   PUT   = send the WHOLE object again. Anything you leave
//           out is erased or reset.
//   PATCH = send ONLY the fields that changed.
//
// TWO SAFETY RULES
//   1. GET must NEVER change data on the server. It only
//      reads. Browsers, caches and crawlers assume this.
//   2. If you are unsure which method to use, read the API
//      docs. Using GET for something that changes data is a
//      real bug, not a style choice.
//
// fetch(url) with no options sends a GET request. That is why
// every example so far only needed a URL.


// ============================================================
// PART 5: STATUS CODES - THE SERVER'S REPORT CARD
// ============================================================
//
// Every response starts with a three-digit STATUS CODE. The
// first digit tells you the family:
//
//   1xx  informational   (rare in normal app code)
//   2xx  success         the request worked
//   3xx  redirection     the thing moved; follow the new URL
//   4xx  client error    YOUR request was wrong
//   5xx  server error    THEIR side broke
//
// THE ONES YOU WILL ACTUALLY SEE
//
//   200 OK              GET succeeded
//   201 Created         POST succeeded, new thing made
//   204 No Content      DELETE/PUT succeeded, nothing to return
//
//   400 Bad Request     you sent malformed data
//   401 Unauthorized    missing or bad API key / login
//   403 Forbidden       recognised, but not allowed
//   404 Not Found       that endpoint or resource does not exist
//   429 Too Many Requests  rate limit - slow down
//
//   500 Internal Server Error  the API crashed
//   503 Service Unavailable    the API is down/maintenance
//
// THE SENTENCE TO REMEMBER:
//
//   "4xx = I asked badly. 5xx = they broke."
//
// This matters because of a trap in the next part: fetch does
// NOT treat 404 or 500 as an error. It only rejects when the
// request could not be made at all (no network, bad DNS, a
// CORS block, an aborted request). A 404 is a successful
// conversation with a disappointing answer, and you must
// check it yourself.


// ============================================================
// PART 6: YOUR FIRST GET REQUEST
// ============================================================
//
// fetch(url) sends a GET request and returns a PROMISE.
// The promise resolves to a RESPONSE OBJECT.
//
// The Response object is the TRAY, not the food:
//   .status      200, 404, 500...
//   .ok          true when status is 200-299
//   .statusText  "OK", "Not Found"...
//   .headers     extra information (content type, etc.)
//   .url         the final URL after redirects
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// fetch("https://jsonplaceholder.typicode.com/posts/1")
//   .then(function (response) {
//     console.log("Full response object:", response);
//     console.log("Status:", response.status);
//     console.log("OK?", response.ok);
//     console.log("Content-Type:", response.headers.get("content-type"));
//     console.log("Final URL:", response.url);
//   });
//
// EXPECTED OUTPUT:
//   Full response object: Response { ... }
//   Status: 200
//   OK? true
//   Content-Type: application/json; charset=utf-8
//   Final URL: https://jsonplaceholder.typicode.com/posts/1
//
// BROWSER TIP (show this to students):
//   Open DevTools -> Network tab, then run the fetch again.
//   Click the request and look at:
//     Headers  -> the request method, URL, status
//     Preview  -> the parsed JSON body
//     Response -> the raw body text
//   This is how professionals debug API calls. The console
//   shows what your code got; the Network tab shows what
//   actually crossed the wire.
//
// NOTICE: we did NOT get the post's title yet. The response
// arrived, but its BODY is still packed. Next part.


// ============================================================
// PART 7: READING THE BODY - response.json()
// ============================================================
//
// The body is a STREAM of text. It is not a JavaScript object
// yet, and reading it takes a moment. So:
//
//   response.json()  returns a PROMISE for the parsed object.
//
// That is the second wait, and the second .then().
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// fetch("https://jsonplaceholder.typicode.com/posts/1")
//   .then(function (response) {
//     console.log("Step 1 - response arrived:", response.status);
//     return response.json();          // RETURN it, do not forget
//   })
//   .then(function (post) {
//     console.log("Step 2 - body parsed:");
//     console.log("Title:", post.title);
//     console.log("Body: ", post.body);
//     console.log("User: ", post.userId);
//   });
//
// EXPECTED OUTPUT:
//   Step 1 - response arrived: 200
//   Step 2 - body parsed:
//   Title: sunt aut facere repellat provident occaecati...
//   Body:  quia et suscipit...
//   User:  1
//
// WHY `return response.json()`?
//   A .then without a return hands undefined to the next step.
//   The returned promise is what the chain waits for.
//
// OTHER BODY READERS
//
//   response.json()  -> parsed JavaScript object (JSON APIs)
//   response.text()  -> plain string (HTML, CSV, text files)
//   response.blob()  -> binary file (images, PDFs)
//
//   Only ONE of them can be used per response. The body is a
//   stream; once read, it is gone. Calling .json() twice throws
//   "body stream already read". This surprises everyone once.
//
// DOES THE BODY HAVE TO BE JSON? No. The server tells you the
// format in the Content-Type header. jsonplaceholder always
// sends JSON, so .json() is correct there.


// ============================================================
// PART 8: THE SAME REQUEST WITH async/await
// ============================================================
//
// Lesson 13 showed that await is cleaner than chains. Same
// two waits, now readable top to bottom:
//
//   await fetch(...)          -> wait for the response
//   await response.json()     -> wait for the parsed body
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// async function getPost() {
//   let response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts/1"
//   );
//   console.log("Response arrived. Status:", response.status);

//   let post = await response.json();
//   console.log("Body parsed:", post);
// }

// getPost();
//
// EXPECTED OUTPUT: the response line first, then the post object.
//
// THE TWO-WAIT RULE, IN ONE PICTURE:
//
//   fetch(url)          ->  promise
//   await               ->  RESPONSE  (tray)
//   response.json()     ->  promise
//   await               ->  DATA      (food)
//
// If you forget the second await, you log a promise and every
// field you try to read is undefined. That is the most common
// API bug beginners write.


// ============================================================
// PART 9: ERROR HANDLING - TWO DIFFERENT KINDS OF FAILURE
// ============================================================
//
// This is the concept students must not miss. There are TWO
// ways an API call can disappoint you:
//
//   KIND 1: the request never happened
//     - no internet, DNS failure, server unreachable,
//       CORS-blocked, request aborted
//     - fetch REJECTS -> your catch block runs
//
//   KIND 2: the request happened, but the answer is bad
//     - 404 not found, 400 bad request, 401 no key, 500 crash
//     - fetch RESOLVES normally -> it does NOT reject
//     - response.ok is false
//
// So a try/catch around fetch catches only KIND 1. You must
// inspect response.ok yourself for KIND 2.
//
// THE PATTERN YOU WILL USE FOR THE REST OF YOUR CAREER:
//
//   try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("HTTP " + response.status);
//     }
//     let data = await response.json();
//     ...
//   } catch (error) {
//     ...one place for both kinds...
//   }
//
// Throwing on !response.ok turns KIND 2 into the same catch as
// KIND 1, so the rest of your code can assume the data is real.
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// async function safeGet(url) {
//   try {
//     console.log("Requesting:", url);
//     let response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("HTTP " + response.status + " - " + response.statusText);
//     }

//     let data = await response.json();
//     console.log("Success:", data);
//     return data;
//   } catch (error) {
//     console.log("Failed:", error.message);
//   }
// }

// safeGet("https://jsonplaceholder.typicode.com/posts/1");          // works
// safeGet("https://jsonplaceholder.typicode.com/nope/nope");        // 404
// safeGet("https://this-host-does-not-exist-12345.dev/x");          // network
//
// EXPECTED OUTPUT (order may vary because the calls run together):
//   Requesting: https://jsonplaceholder.typicode.com/posts/1
//   Requesting: https://jsonplaceholder.typicode.com/nope/nope
//   Requesting: https://this-host-does-not-exist-12345.dev/x
//   Failed: Failed to fetch
//   Failed: HTTP 404 - Not Found
//   Success: { userId: 1, id: 1, title: '...', body: '...' }
//
// Notice BOTH failures end up in the same catch, while the
// success path continues normally. That is the point: one
// safety net, clear messages.
//
// GOOD ERROR MESSAGES SAY WHAT HAPPENED
//   "HTTP 404 - Not Found"              -> what the server said
//   "Could not load posts: HTTP 500"    -> what YOU were doing
//   Users should never see "undefined".


// ============================================================
// PART 10: QUERY PARAMETERS AND EXPLORING A RESPONSE
// ============================================================
//
// Query strings let you ask for a filtered or shaped result
// without learning new endpoints.
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// async function loadSomePosts() {
//   let url = "https://jsonplaceholder.typicode.com/posts?_limit=3&userId=1";
//   let response = await fetch(url);
//   let posts = await response.json();

//   console.log("How many?", posts.length);
//   console.log("First title:", posts[0].title);
//   console.log("Full first post:\n" + JSON.stringify(posts[0], null, 2));
// }

// loadSomePosts();
//
// EXPECTED OUTPUT:
//   How many? 3
//   First title: sunt aut facere repellat provident...
//   Full first post:
//   {
//     "userId": 1,
//     "id": 1,
//     "title": "...",
//     "body": "..."
//   }
//
// WHY JSON.stringify(post, null, 2)?
//   console.log shows a collapsed object. stringify with
//   indentation prints the whole shape, so you can see which
//   fields exist BEFORE you write code that uses them.
//
//   1. Fetch once.
//   2. Print the shape.
//   3. Only then write field access like post.title.
//
// THIS IS THE PROFESSIONAL HABIT: explore first, code second.
//
// WHAT DID THE PARAMETERS DO?
//   ?_limit=3   -> return only 3 items (jsonplaceholder feature)
//   &userId=1   -> only posts belonging to user 1
//
// Query parameters are defined by the API. `_limit` works on
// jsonplaceholder; it does not exist on randomuser.me (which
// uses ?results=3 instead). Always read the docs.
//
// WHAT YOU GET BACK IS USUALLY AN ARRAY
//   Not every endpoint returns an object. Many return arrays
//   (a list of posts, users, todos), and some wrap the array
//   in an object. randomuser.me returns { results: [...] }.
//   The shape is the API's choice - look at it before coding.
//
// A NOTE ON ENCODING
//   Query values with spaces or special characters must be
//   encoded. URLSearchParams does it for you:
//
//     let params = new URLSearchParams({ results: 3, nat: "ng" });
//     let url = "https://randomuser.me/api/?" + params;
//     // ...?results=3&nat=ng
//
//   Use it instead of gluing strings together by hand.


// ============================================================
// PART 11: PUTTING DATA ON THE PAGE (browser only)
// ============================================================
//
// A fetch that only logs is a demo. A real app renders the
// result. The pattern is the one from lessons 06-10:
//
//   1. show a loading state
//   2. fetch
//   3. check response.ok
//   4. parse
//   5. build DOM with textContent / createElement
//   6. show an error state if anything failed
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT,
// THEN CLICK "Load posts" ON THE PAGE:

// async function loadPosts() {
//   let box = document.getElementById("posts-result");
//   box.textContent = "Loading posts...";

//   try {
//     let response = await fetch(
//       "https://jsonplaceholder.typicode.com/posts?_limit=5"
//     );

//     if (!response.ok) {
//       throw new Error("HTTP " + response.status);
//     }

//     let posts = await response.json();

//     box.textContent = "";                 // clear the loading text
//     let list = document.createElement("ul");

//     posts.forEach(function (post) {
//       let item = document.createElement("li");
//       item.textContent = post.title;      // text, never HTML
//       list.appendChild(item);
//     });

//     box.appendChild(list);
//   } catch (error) {
//     box.textContent = "Could not load posts: " + error.message;
//   }
// }

// document.getElementById("load-posts-btn")
//         .addEventListener("click", loadPosts);
//
// WHY THIS ORDER MATTERS
//   - "Loading..." first: fetch takes time and a blank box
//     looks broken.
//   - response.ok before .json(): do not parse an error page.
//   - textContent, not innerHTML: API text is untrusted. If a
//     post title contained <script>, innerHTML would run it.
//     Rule: data from an API is text until you decide otherwise.
//   - catch writes the error into the same box, so the user
//     sees what happened instead of an empty card.
//
// EXPECTED RESULT: a list of five post titles in the page.
// Click the button again after refreshing to avoid duplicate
// listeners.


// ============================================================
// PART 12: SENDING DATA WITH POST
// ============================================================
//
// GET asks for data. POST sends new data to be created.
//
// A POST needs an OPTIONS OBJECT:
//
//   fetch(url, {
//     method: "POST",                          // the verb
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ ... })            // the payload
//   })
//
// WHY EACH PIECE:
//   method   - without it, fetch sends GET
//   headers  - tells the server the body is JSON text, not a
//              form, not plain text. Servers reject or misread
//              bodies without this.
//   body     - the actual data. It must be TEXT, so we use
//              JSON.stringify to turn the object into JSON.
//
// JSON.stringify: object -> JSON text (packing)
// response.json(): JSON text -> object (unpacking)
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE AND RUN IT:

// async function createPost() {
//   try {
//     let response = await fetch(
//       "https://jsonplaceholder.typicode.com/posts",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: "My first post",
//           body: "Written from the browser console!",
//           userId: 1
//         })
//       }
//     );

//     console.log("Status:", response.status);   // 201 Created

//     if (!response.ok) {
//       throw new Error("HTTP " + response.status);
//     }

//     let created = await response.json();
//     console.log("Server replied with:", created);
//   } catch (error) {
//     console.log("Create failed:", error.message);
//   }
// }

// createPost();
//
// EXPECTED OUTPUT:
//   Status: 201
//   Server replied with: { title: ..., body: ..., userId: 1, id: 101 }
//
// NOTE: jsonplaceholder is a FAKE API. It pretends to create
// the post and echoes it back with an id, but it does not
// really save it. If you GET /posts afterwards, your post will
// not be there. That is normal for a practice API.
//
// STATUS 201 vs 200
//   200 = "here is what you asked for"
//   201 = "created - here is the new thing (often with an id)"
//
// WHAT A REAL BACKEND ADDS
//   validation (is the title empty?), authentication (who are
//   you?), and a database write. The shape of your fetch call
//   stays exactly the same.


// ============================================================
// PART 13: PUT, PATCH AND DELETE (a quick tour)
// ============================================================
//
// Same fetch shape, different method. Read the comments more
// than you run these - jsonplaceholder fakes all of them.
//
// PUT - replace the whole resource:
//
//   await fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       id: 1,
//       title: "Replaced title",
//       body: "Replaced body",
//       userId: 1
//     })
//   });
//
// PATCH - change only some fields:
//
//   await fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "Just the title changed" })
//   });
//
// DELETE - remove it (usually no body to send):
//
//   let response = await fetch(
//     "https://jsonplaceholder.typicode.com/posts/1",
//     { method: "DELETE" }
//   );
//   console.log(response.status);      // 200, or 204 No Content
//
// RULES OF THUMB
//   - PUT/PATCH usually return 200 with the updated object
//     (sometimes 204 with nothing).
//   - DELETE often returns 200 or 204. A 204 has no body, so
//     do NOT call response.json() on it - there is nothing to
//     parse, and it will throw.
//   - Check response.ok the same way. 204 is ok (2xx).
//
// The endpoint and method together describe the action:
//
//   POST   /posts         create a post
//   GET    /posts         list posts
//   GET    /posts/1       read post 1
//   PUT    /posts/1       replace post 1
//   PATCH  /posts/1       update post 1
//   DELETE /posts/1       delete post 1
//
// This style is called REST. You will meet the term in every
// backend job description; now you know what it means.


// ============================================================
// PART 14: API KEYS, AUTH, CORS AND RATE LIMITS
// ============================================================
//
// Not every API is open like jsonplaceholder. Three ideas you
// must understand before using a real service.
//
// 1) API KEYS = WHO IS ASKING
//
//    Many APIs give you a long secret string. You send it with
//    every request, usually in a header:
//
//      fetch("https://api.example.com/data", {
//        headers: {
//          "Authorization": "Bearer YOUR_API_KEY_HERE"
//        }
//      });
//
//    Or sometimes as a query parameter:
//
//      https://api.example.com/data?api_key=YOUR_KEY
//
//    The header form is preferred: URLs end up in logs,
//    browser history and screenshots. Headers do not.
//
//    THE RULE THAT PROTECTS YOUR JOB:
//      A key in front-end code is PUBLIC. Anyone can open
//      DevTools and read it. Never put a secret key in
//      JavaScript that ships to the browser.
//      If a key must stay secret, your own backend holds it
//      and the browser talks to your backend instead.
//
//    Some keys are meant to be public (a map tile key locked
//    to your domain, for example). The API docs tell you
//    which kind you have.
//
// 2) CORS = THE BROWSER'S SECURITY GUARD
//
//    Browsers block JavaScript from reading responses from a
//    different origin unless that server sends permission
//    headers (Access-Control-Allow-Origin).
//
//    That is why some APIs work in Postman or Node but fail
//    in the browser with:
//
//      "blocked by CORS policy"
//
//    CORS is a browser rule, not a server outage. The fix is
//    on the API's side, or you call it through your own
//    backend/proxy. You cannot fix CORS from your fetch code.
//
// 3) RATE LIMITS = HOW OFTEN YOU MAY ASK
//
//    Free APIs limit requests:
//      GitHub unauthenticated: 60 requests per hour
//      Many others: a few hundred per day
//
//    Exceed it and you get 429 Too Many Requests (or 403 with
//    a rate-limit message). Responses often include headers
//    such as X-RateLimit-Remaining.
//
//    Practical habits:
//      - Do not call an API in a loop when one call will do.
//      - Cache results you already have.
//      - Do not refresh in a tight loop while debugging; you
//        will lock yourself out and blame the code.
//
// READING API DOCS - A CHECKLIST
//   [ ] What is the base URL?
//   [ ] Which endpoint and method do I need?
//   [ ] What parameters does it accept?
//   [ ] Does it need a key? Header or query?
//   [ ] What does a successful response look like?
//   [ ] What errors can it return (401, 404, 429)?
//   [ ] Is there a rate limit?


// ============================================================
// PART 15: MINI PROJECT - GITHUB PROFILE FINDER (browser)
// ============================================================
//
// Everything from this lesson in one small app:
//   - an endpoint with a PATH parameter: /users/{username}
//   - a query-free GET
//   - response.ok and a real 404
//   - loading and error states
//   - DOM rendering with textContent
//
// The page already has:
//   <input id="github-username">   <button id="github-btn">
//   <div id="github-result"></div>
//
// UNCOMMENT BELOW, PASTE IN THE CONSOLE,
// TYPE A USERNAME AND CLICK THE BUTTON:

// async function loadProfile() {
//   let input = document.getElementById("github-username");
//   let box = document.getElementById("github-result");
//   let username = input.value.trim();

//   if (username === "") {
//     box.textContent = "Type a GitHub username first.";
//     return;
//   }

//   box.textContent = "Loading " + username + "...";

//   try {
//     let response = await fetch(
//       "https://api.github.com/users/" + encodeURIComponent(username)
//     );

//     // 404 here is NORMAL: the user does not exist.
//     if (response.status === 404) {
//       throw new Error("No GitHub user called " + username);
//     }

//     // 403 on GitHub usually means the rate limit is used up.
//     if (!response.ok) {
//       throw new Error("GitHub said HTTP " + response.status);
//     }

//     let user = await response.json();

//     box.textContent = "";

//     let img = document.createElement("img");
//     img.src = user.avatar_url;
//     img.alt = user.login + " avatar";
//     img.width = 80;

//     let name = document.createElement("h3");
//     name.textContent = user.name || user.login;

//     let bio = document.createElement("p");
//     bio.textContent = user.bio || "No bio.";

//     let stats = document.createElement("p");
//     stats.textContent =
//       user.followers + " followers - " + user.public_repos + " public repos";

//     box.append(img, name, bio, stats);
//   } catch (error) {
//     box.textContent = "Could not load: " + error.message;
//   }
// }

// document.getElementById("github-btn")
//         .addEventListener("click", loadProfile);
//
// TRY THESE THREE RUNS:
//   1. "octocat"          -> profile renders
//   2. "this-user-does-not-exist-9988" -> your 404 message
//   3. empty input        -> your validation message
//
// WHY encodeURIComponent?
//   Usernames normally contain only letters, digits and hyphens.
//   encodeURIComponent makes odd input safe to put in a URL.
//   Never glue user input into a URL without encoding it.
//
// WHY textContent EVERYWHERE?
//   The API's text is data. `innerHTML` would interpret it as
//   HTML and allow script injection. textContent always treats
//   it as text, which is what we want.
//
// WHY CHECK 404 SEPARATELY?
//   Because "user not found" is an expected outcome, not a
//   crash. A good app tells the user precisely what happened.


// ============================================================
// PART 16: TRY IT YOURSELF
// ============================================================
//
// 1. Fetch todo 1 from jsonplaceholder and log its title and
//    whether it is completed. Then fetch /todos?completed=true
//    and log how many came back.
//
// 2. Fetch three randomusers and print "first last (country)"
//    for each. (Endpoint: randomuser.me/api/?results=3)
//
// 3. Fetch Lagos weather from Open-Meteo and log the current
//    temperature:
//
//      https://api.open-meteo.com/v1/forecast
//        ?latitude=6.52&longitude=3.37&current_weather=true
//
//    Print current_weather.temperature. Then try another city.
//
// 4. Wrap task 3 in try/catch with a response.ok check. Break
//    the URL on purpose and show the error message to the user
//    inside a div (not the console).
//
// 5. POST a new comment to jsonplaceholder:
//      POST https://jsonplaceholder.typicode.com/comments
//      body: { name, email, body, postId: 1 }
//    Confirm the status is 201 and log the new id.
//
// 6. Extend the GitHub finder: show the user's location and
//    a link to their profile. Use createElement for the link.
//
// 7. Challenge: build a "Load posts by user" box. An input for
//    a userId, a button, and a list of that user's post titles
//    using ?userId=N. Handle empty input, a 404 and a network
//    failure with three different messages.
//
// Write your answers below this line:




// ============================================================
// QUICK SUMMARY (read this out loud at the end)
// ============================================================
//
// 1. An API is a menu of doors into someone else's data.
//    Your code is the client; the API lives on a server.
// 2. A request = method + URL + headers (+ body for POST).
//    A response = status + headers + body.
// 3. Endpoint = base URL + path. Query string filters and
//    shapes the result: ?userId=1&_limit=5
// 4. Methods: GET reads, POST creates, PUT replaces,
//    PATCH updates, DELETE removes. GET must never change data.
// 5. Status: 2xx success, 3xx moved, 4xx your request is wrong,
//    5xx their side broke. 4xx = I asked badly, 5xx = they broke.
// 6. fetch(url) returns a promise for a Response. Check
//    response.status and response.ok BEFORE parsing.
// 7. The body is a second wait: await response.json().
//    .text() and .blob() read other formats. Read it once only.
// 8. fetch does NOT reject on 404/500. Only network-level
//    failures (offline, DNS, CORS, abort) reject. Throw on
//    !response.ok so one catch handles both.
// 9. POST sends method + Content-Type header + a JSON.stringify
//    body. JSON.stringify packs; response.json() unpacks.
// 10. Keys authenticate you, CORS protects the browser, rate
//     limits protect the server. Never ship a secret key in
//     front-end code.
// 11. Real apps: loading state -> fetch -> ok check -> parse ->
//     render with textContent -> error state.
// ============================================================

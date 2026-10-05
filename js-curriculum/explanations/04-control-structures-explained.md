# 04 - Control Structures: if-else, switch, loops (Explained)

Matching file: `code/04-control-structures.js`

---

## PART 1: Why programs need decisions

Real life is full of IFs — "IF it rains, take an umbrella, ELSE wear sunglasses." Code does the same: it checks a **condition** (a yes/no question that evaluates to a boolean) and picks a path.

---

## PART 2: The if statement

```js
let temperature = 35;

if (temperature > 30) {
  console.log("It is hot today!");
}
```

- The block runs **only** when the condition is `true`.
- With `temperature = 20`, nothing prints — the block is skipped entirely.

**Output:** `It is hot today!`

---

## PART 3: if-else

```js
let hasTicket = true;

if (hasTicket) {
  console.log("Enjoy the movie!");
} else {
  console.log("Sorry, you need a ticket.");
}
```

- Exactly one of the two blocks runs — never both, never neither.

**Output:** `Enjoy the movie!`

---

## PART 4: else if (checking doors in order)

The computer checks conditions **top to bottom** and runs the **first** one that is true; everything after is skipped.

```js
let score = 72;

if (score >= 70) {
  console.log("Grade: A");
} else if (score >= 60) {
  console.log("Grade: B");
} else if (score >= 50) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
```

- Order matters! If the `>= 50` check came first, a score of 90 would wrongly get "C".

**Output:** `Grade: A`

---

## PART 5: switch

Cleaner than a long else-if chain when comparing **one value** against many fixed options.

```js
let day = "Saturday";

switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("It is the weekend!");
    break;
  case "Monday":
    console.log("Back to work.");
    break;
  default:
    console.log("Just a normal weekday.");
}
```

- `switch` uses strict comparison (`===`) on the value.
- **Falling through**: without `break`, execution drips into the next case — Saturday and Sunday deliberately share one block via fall-through.
- `default` is the "none of the above" branch.

**Output:** `It is the weekend!`

---

## PART 6: The for loop

A loop **repeats** work so you never copy-paste code.

```js
for (let i = 1; i <= 5; i++) {
  console.log("Push-up number " + i);
}
```

- `let i = 1` — start. `i <= 5` — keep going while true. `i++` — step after each round.
- Read it as: "start i at 1; while i ≤ 5, do this, then add 1 to i."

**Output:**
```
Push-up number 1
Push-up number 2
Push-up number 3
Push-up number 4
Push-up number 5
```

---

## PART 7: Looping through an array

The classic pattern: start at index 0, continue while the index is below `.length`.

```js
let fruits = ["mango", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}
```

- `i < fruits.length` (not `<=`) — the last index is always length − 1.

**Output:**
```
1. mango
2. banana
3. orange
```

---

## PART 8: The while loop

Use `while` when you do **not** know the round count in advance — only the stopping condition.

```js
let waterInCup = 3;

while (waterInCup > 0) {
  console.log("Sip! Remaining: " + waterInCup);
  waterInCup = waterInCup - 1;
}
```

- **Forgetting the update step = infinite loop** — the classic while-bug. The condition must be able to become false.

**Output:**
```
Sip! Remaining: 3
Sip! Remaining: 2
Sip! Remaining: 1
```

---

## PART 9: break and continue

- `break` — STOP the whole loop now.
- `continue` — skip this round, jump to the next.

```js
for (let i = 1; i <= 10; i++) {
  if (i === 7) {
    console.log("Found 7 - stopping the search!");
    break;
  }
  console.log("Checking " + i);
}

for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log("Round " + i);
}
```

**Output:**
```
Checking 1
Checking 2
Checking 3
Checking 4
Checking 5
Checking 6
Found 7 - stopping the search!
Round 1
Round 2
Round 4
Round 5
```

---

## PART 10: Real example — FizzBuzz

The famous interview question. Numbers 1–15: multiples of 3 print "Fizz", of 5 print "Buzz", of both print "FizzBuzz".

```js
for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

- The **order is the trick**: the `% 15` check must come first, or 15 would print "Fizz".

**Output:**
```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

---

## PART 11: Try it yourself

Practice tasks — pass/fail check, rewriting grading as `switch (true)`, printing only even numbers from 1–20, and a countdown `while` loop ending in "Lift off!". Students write and run these themselves.

---

## Quick summary

1. `if` runs when true; `else` is the fallback; `else if` checks more options in order.
2. `switch` matches one value against cases — `break` stops it, `default` is the fallback.
3. `for` = counted repetition; `while` = repeat while a condition holds (never forget the update!).
4. `break` exits early; `continue` skips one round.
5. Conditions are boolean questions built from `===`, `>`, `<`, `&&`, `||`.

# 05 - Error Handling: try-catch, throwing errors (Explained)

Matching file: `code/05-error-handling.js`

---

## PART 1: Why programs crash

Picture a security guard at a gate. Visitors pass fine — but if someone **jumps the fence**, the whole event shuts down. That is an **uncaught error**: everything after the crash line never runs.

`try-catch` is a **safety net**: if anything goes wrong inside `try`, the program jumps to `catch` and **keeps running**.

---

## PART 2: Seeing a crash happen

```js
console.log("Before the crash");
console.log(nonsensitiveVariable);   // this variable does not exist!
console.log("After the crash");      // NEVER runs
```

- Accessing an undeclared variable throws a `ReferenceError`.
- Execution stops **at the crash line** — "After the crash" never prints.

**Output:**
```
Before the crash
ReferenceError: nonsensitiveVariable is not defined
```

---

## PART 3: Catching the error with try-catch

Same crash, wrapped in a net:

```js
try {
  console.log("Before the crash");
  console.log(nonsensitiveVariable);   // throws ReferenceError
  console.log("This line is skipped");
} catch (error) {
  console.log("Caught an error:", error.message);
}

console.log("After - the program survived!");
```

- When the error is thrown, JS jumps straight to `catch` — the rest of `try` is abandoned.
- The program continues after the whole block.

**Output:**
```
Before the crash
Caught an error: nonsensitiveVariable is not defined
After - the program survived!
```

---

## PART 4: The error object

The `catch` block receives an **error object** with details:

- `.message` — human-readable description.
- `.name` — the error type (`TypeError`, `ReferenceError`, ...).

```js
try {
  let user = null;
  console.log(user.name);   // null has no properties -> TypeError
} catch (error) {
  console.log("Name of error:  ", error.name);
  console.log("Message:       ", error.message);
}
```

- Reading a property of `null` or `undefined` is the most common real-world crash.

**Output:**
```
Name of error:   TypeError
Message:        Cannot read properties of null (reading 'name')
```

---

## PART 5: The finally block

`finally` runs **whether the try succeeded or failed** — the "see you later" block. Perfect for cleanup (closing files, hiding loaders).

```js
try {
  console.log("Trying something risky...");
} catch (error) {
  console.log("It failed:", error.message);
} finally {
  console.log("Finally: I always run, success or failure.");
}
```

**Output:**
```
Trying something risky...
Finally: I always run, success or failure.
```

---

## PART 6: Throwing your own errors

You are not limited to errors JS invents. `throw new Error("message")` raises **your own** alarm when data breaks your rules.

```js
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Insufficient funds!");
  }
  return balance - amount;
}

try {
  console.log(withdraw(5000, 2000));   // 3000 - fine
  console.log(withdraw(5000, 9000));   // throws!
} catch (error) {
  console.log("Bank says:", error.message);
}
```

- A thrown error behaves exactly like a built-in one: it stops the current flow and must be caught.

**Output:**
```
3000
Bank says: Insufficient funds!
```

---

## PART 7: Validation — a real example

Different built-in error types for different rule violations:

```js
function registerUser(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 18) {
    throw new RangeError("Age must be 18 or above");
  }
  console.log("Welcome! Account created for age " + age);
}

try {
  registerUser(21);     // works
  registerUser("old");  // TypeError
} catch (error) {
  console.log(error.name + ": " + error.message);
}
```

**Output:**
```
Welcome! Account created for age 21
TypeError: Age must be a number
```

---

## PART 8: Try it yourself

Practice tasks — a `divide(a, b)` that throws "Cannot divide by zero", calling it inside try-catch both safely and with zero, adding a `finally`, and a `checkPassword(pw)` that throws a `RangeError` under 8 characters. Students write and run these themselves.

---

## Quick summary

1. An uncaught error **stops the whole program**.
2. `try { risky } catch (error) { rescue }` keeps the program alive.
3. `finally` runs no matter what — cleanup lives here.
4. The error object carries `.name` and `.message`.
5. `throw new Error("msg")` raises your own alarm; built-ins like `TypeError` and `RangeError` add precision.
6. Wrap risky work — parsing, network calls — in try-catch.

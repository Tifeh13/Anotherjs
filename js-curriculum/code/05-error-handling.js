// ============================================================
// ERROR HANDLING (TRY-CATCH, THROWING ERRORS) - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 05-error-handling.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHY PROGRAMS CRASH (in the simplest way possible)
// ------------------------------------------------------------
//
// Imagine a security guard at a gate. Normally visitors walk
// through fine. But if someone jumps the fence, the WHOLE
// event shuts down. That is what an UNCAUGHT error does to
// your program: one crash stops everything after it.
//
// try-catch is a SAFETY NET: if anything goes wrong inside
// the try block, the program jumps to catch and KEEPS RUNNING.


// ------------------------------------------------------------
// PART 2: SEEING A CRASH HAPPEN
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// console.log("Before the crash");
// console.log(nonsensitiveVariable);   // this variable does not exist!
// console.log("After the crash");      // NEVER runs - program stopped


// ------------------------------------------------------------
// PART 3: CATCHING THE ERROR WITH TRY-CATCH
// ------------------------------------------------------------
//
// Same crash, but now wrapped in a net. Notice "After" now runs.
//
// UNCOMMENT BELOW AND RUN IT:

// try {
//   console.log("Before the crash");
//   console.log(nonsensitiveVariable);   // throws ReferenceError
//   console.log("This line is skipped");
// } catch (error) {
//   console.log("Caught an error:", error.message);
// }

// console.log("After - the program survived!");

// ------------------------------------------------------------
// PART 4: THE ERROR OBJECT (what is inside the net)
// ------------------------------------------------------------
//
// The catch block receives an ERROR OBJECT with details.
// .message = human-readable description.
// .name    = the type of error (TypeError, ReferenceError...).
//
// UNCOMMENT BELOW AND RUN IT:

// try {
//   let user = null;
//   console.log(user.name);   // null has no properties -> TypeError
// } catch (error) {
//   console.log("Name of error:  ", error.name);
//   console.log("Message:       ", error.message);
// }


// ------------------------------------------------------------
// PART 5: THE FINALLY BLOCK (runs no matter what)
// ------------------------------------------------------------
//
// finally is the "see you later" block: it runs whether the
// try succeeded or failed. Perfect for cleanup.
//
// UNCOMMENT BELOW AND RUN IT:

// try {
//   console.log("Trying something risky...");
// } catch (error) {
//   console.log("It failed:", error.message);
// } finally {
//   console.log("Finally: I always run, success or failure.");
// }


// ------------------------------------------------------------
// PART 6: THROWING YOUR OWN ERRORS (raise the alarm yourself)
// ------------------------------------------------------------
//
// You are not limited to errors JS invents - you can THROW
// your own when data breaks YOUR rules.
//
// UNCOMMENT BELOW AND RUN IT:

// function withdraw(balance, amount) {
//   if (amount > balance) {
//     throw new Error("Insufficient funds!");
//   }
//   return balance - amount;
// }

// try {
//   console.log(withdraw(5000, 2000));   // 3000 - fine
//   console.log(withdraw(5000, 9000));   // throws!
// } catch (error) {
//   console.log("Bank says:", error.message);
// }


// ------------------------------------------------------------
// PART 7: VALIDATION - A REAL EXAMPLE
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// function registerUser(age) {
//   if (typeof age !== "number") {
//     throw new TypeError("Age must be a number");
//   }
//   if (age < 18) {
//     throw new RangeError("Age must be 18 or above");
//   }
//   console.log("Welcome! Account created for age " + age);
// }

// try {
//   registerUser(12);     // works
//   registerUser("old");  // TypeError
// } catch (error) {
//   console.log(error.name + ": " + error.message);
// }


// ------------------------------------------------------------
// PART 8: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Write a function "divide(a, b)" that THROWS an Error with
//    the message "Cannot divide by zero" when b is 0, and
//    returns a / b otherwise.
// 2. Call divide inside a try-catch twice: once safely (10, 2)
//    and once with 0 to trigger the catch.
// 3. Add a finally block that logs "Calculation finished".
// 4. Write a function "checkPassword(pw)" that throws a
//    RangeError if the password is shorter than 8 characters.
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. An uncaught error STOPS the whole program.
// 2. try { risky code } catch (error) { rescue plan }.
// 3. finally runs whether or not there was an error.
// 4. The error object has .name and .message.
// 5. throw new Error("msg") raises your own alarm.
// 6. Wrap risky work (parsing, network calls) in try-catch.
// ============================================================

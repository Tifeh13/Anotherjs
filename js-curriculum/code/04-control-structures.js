// ============================================================
// CONTROL STRUCTURES (IF-ELSE, SWITCH, LOOPS) - BEGINNER LESSON
// ============================================================
//
// HOW TO USE THIS FILE:
// Everything below is commented out in blocks.
// Uncomment ONE block at a time, run it with: node 04-control-structures.js
// Explain it to the students, then move to the next block.
//
// To uncomment: select the lines, then press Ctrl + / (Windows)
// or Cmd + / (Mac). Press it again to re-comment.
// ============================================================


// ------------------------------------------------------------
// PART 1: WHY PROGRAMS NEED TO MAKE DECISIONS
// ------------------------------------------------------------
//
// Real life is full of IFs. "IF it rains, take an umbrella,
// ELSE wear sunglasses." Code does the same thing: it checks
// a condition (a yes/no question) and picks a path.


// ------------------------------------------------------------
// PART 2: THE IF STATEMENT (do this only when...)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// let temperature = 35;
//
// if (temperature > 30) {
//   console.log("It is hot today!");
// }
//
// // Nothing prints if the condition is false - the block is skipped.


// ------------------------------------------------------------
// PART 3: IF-ELSE (this way or that way)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// let hasTicket = true;
//
// if (hasTicket) {
//   console.log("Enjoy the movie!");
// } else {
//   console.log("Sorry, you need a ticket.");
// }


// ------------------------------------------------------------
// PART 4: ELSE IF (checking doors in order)
// ------------------------------------------------------------
//
// The computer checks each condition TOP TO BOTTOM and runs
// the FIRST one that is true. All the rest are skipped.
//
// UNCOMMENT BELOW AND RUN IT:

// let score = 72;
//
// if (score >= 70) {
//   console.log("Grade: A");
// } else if (score >= 60) {
//   console.log("Grade: B");
// } else if (score >= 50) {
//   console.log("Grade: C");
// } else {
//   console.log("Grade: F");
// }


// ------------------------------------------------------------
// PART 5: SWITCH (one value, many possible matches)
// ------------------------------------------------------------
//
// switch is cleaner than a long else-if chain when you are
// comparing ONE value against many fixed options.
//
// UNCOMMENT BELOW AND RUN IT:

// let day = "Saturday";
//
// switch (day) {
//   case "Saturday":
//   case "Sunday":
//     console.log("It is the weekend!");
//     break;                       // break = leave the switch now
//   case "Monday":
//     console.log("Back to work.");
//     break;
//   default:
//     console.log("Just a normal weekday.");
// }
//
// // Try changing day to "Wednesday" and run again.


// ------------------------------------------------------------
// PART 6: THE FOR LOOP (do this 5 times)
// ------------------------------------------------------------
//
// A loop REPEATS work so you do not copy-paste code.
// for (start; keepGoingWhile; step)
//
// UNCOMMENT BELOW AND RUN IT:

// for (let i = 1; i <= 5; i++) {
//   console.log("Push-up number " + i);
// }


// ------------------------------------------------------------
// PART 7: LOOPING THROUGH AN ARRAY
// ------------------------------------------------------------
//
// The classic pattern: start at index 0, keep going while the
// index is less than the array's length.
//
// UNCOMMENT BELOW AND RUN IT:

// let fruits = ["mango", "banana", "orange"];
//
// for (let i = 0; i < fruits.length; i++) {
//   console.log((i + 1) + ". " + fruits[i]);
// }


// ------------------------------------------------------------
// PART 8: THE WHILE LOOP (repeat while this is true)
// ------------------------------------------------------------
//
// Use while when you do NOT know in advance how many rounds
// you need - you only know the STOPPING condition.
//
// UNCOMMENT BELOW AND RUN IT:

// let waterInCup = 3;
//
// while (waterInCup > 0) {
//   console.log("Sip! Remaining: " + waterInCup);
//   waterInCup = waterInCup - 1;   // if you forget this: INFINITE LOOP!
// }


// ------------------------------------------------------------
// PART 9: BREAK AND CONTINUE (loop remote controls)
// ------------------------------------------------------------
//
// break  = STOP the whole loop now.
// continue = SKIP this round, jump to the next one.
//
// UNCOMMENT BELOW AND RUN IT:

// for (let i = 1; i <= 10; i++) {
//   if (i === 7) {
//     console.log("Found 7 - stopping the search!");
//     break;
//   }
//   console.log("Checking " + i);
// }
//
// for (let i = 1; i <= 5; i++) {
//   if (i === 3) continue;    // skip number 3
//   console.log("Round " + i);
// }


// ------------------------------------------------------------
// PART 10: REAL EXAMPLE - FIZZBUZZ (the famous interview question)
// ------------------------------------------------------------
//
// UNCOMMENT BELOW AND RUN IT:

// for (let i = 1; i <= 15; i++) {
//   if (i % 15 === 0) {
//     console.log("FizzBuzz");
//   } else if (i % 3 === 0) {
//     console.log("Fizz");
//   } else if (i % 5 === 0) {
//     console.log("Buzz");
//   } else {
//     console.log(i);
//   }
// }


// ------------------------------------------------------------
// PART 11: TRY IT YOURSELF (give this to students as a task)
// ------------------------------------------------------------
//
// 1. Write an if-else that prints "Pass" for a score of 50 or
//    more, otherwise "Fail".
// 2. Rewrite the grading example using switch (true) instead of
//    else-if. (Tricky - ask me if stuck!)
// 3. Loop from 1 to 20 but print only the EVEN numbers.
// 4. Use a while loop to count DOWN from 5 to 1, then print
//    "Lift off!".
//
// Write your answer below this line:



// ============================================================
// QUICK SUMMARY (read this out loud to students at the end)
// ============================================================
//
// 1. if runs code when a condition is true; else is the
//    fallback; else if checks more options top to bottom.
// 2. switch matches ONE value against cases; break stops it,
//    default is the "none of the above".
// 3. for = counted repetition, while = repeat while a condition
//    holds (never forget the update step!).
// 4. break exits a loop early; continue skips one round.
// 5. Conditions are just boolean questions: ===, >, <, &&, ||.
// ============================================================

# 16 - Media Queries: Building Desktop First, Then Mobile

Matching files: [code/16-media-queries.html](../code/16-media-queries.html), [code/16-media-queries.css](../code/16-media-queries.css)

**How to run:** open `16-media-queries.html` in a browser, then drag the window edge slowly from full width down to phone width. Watch the badge in the bottom-right corner and the card grid. For a real phone test: `F12` → **Toggle device toolbar** (`Ctrl+Shift+M`) → pick a device.

**What the student should be able to do by the end:**
1. Say what a media query is in one sentence.
2. Read `@media (max-width: 600px)` out loud and explain every part.
3. Explain the difference between `max-width` and `min-width`.
4. Write a desktop-first stylesheet that reflows a layout at two breakpoints.
5. Choose breakpoints based on where the *content* breaks, not on device names.
6. Name the mistakes that make media queries "not work".
7. Test a page properly instead of only resizing the browser.

---

## The lesson in one paragraph (say this first)

> A media query is an **`if` statement for CSS**. The normal CSS says "make the cards three across." A media query says "**if** the screen is 600 pixels wide or less, make them one across instead." The HTML stays exactly the same; only the arrangement changes. That is the whole idea. Everything else is syntax and practice.

If the student already knows JavaScript `if`, this comparison does most of the work:

```js
if (window.innerWidth <= 600) {
  // use the phone styles
}
```

```css
@media (max-width: 600px) {
  /* use the phone styles */
}
```

Same sentence, different language.

---

## How I would teach this (45-60 minutes)

| Time | What happens |
|---|---|
| 0-6 | Part 1: show the broken phone version. Let them feel the problem before the fix. |
| 6-12 | Part 2: the `if` statement idea, then the syntax. |
| 12-18 | Part 3: anatomy of one query. Read it out loud together. |
| 18-24 | Part 4: the viewport tag. This is why "it works on my laptop" fails. |
| 24-38 | Part 5: walk through the demo, one layer at a time. Students resize as you go. |
| 38-44 | Part 6: desktop-first vs mobile-first, side by side. |
| 44-50 | Part 7-8: what to change, how to pick breakpoints. |
| 50-60 | Part 9-12: mistakes, testing, exercises, quiz. |

The board drawing for the whole lesson:

```
DESKTOP   1100px   [ card ][ card ][ card ]
TABLET     900px   [  card  ][  card  ]
PHONE      600px   [       card       ]
```

Draw that once and keep pointing at it. Every rule in the stylesheet is one arrow in that drawing.

---

## PART 1: The problem (show, don't tell)

Open the demo at full width. Three cards, nav in one row, big heading. Looks right.

Now grab the window edge and drag it to phone width **with the media queries temporarily disabled**. (In DevTools, untick the media query rules, or comment them out and refresh.)

What the student sees:

- Three columns squeezed into ~375px. Each card is about 100px wide.
- Words break mid-word, or the cards become tall skinny towers.
- The nav and logo fight for the same row.
- A horizontal scrollbar may appear.

**Ask:** *"Is this broken because the HTML is wrong?"*

No. The HTML is fine. The CSS was written for one screen size and never told what to do at other sizes.

**Say:** *"A website is not one picture. It is one set of content that has to look right at every width. Media queries are how we give CSS different instructions for different widths."*

---

## PART 2: What a media query is

A normal CSS rule always applies:

```css
.card-grid {
  grid-template-columns: repeat(3, 1fr);
}
```

A media query wraps rules in a condition:

```css
@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Read it out loud, left to right:

> **"At media — when the width is at most 900 pixels — apply these rules."**

The `@media` part is not a selector. It is a **container for rules**. Think of it as a gate: if the condition is true, the browser walks through the gate and applies everything inside. If it is false, the browser ignores the whole block.

**Ask:** *"If the window is 1200px wide, which version of `grid-template-columns` wins?"* The base one, 3 columns. The 900px block is skipped.

**Ask:** *"If the window is 700px wide? 500px?"* At 700px both the 900px block and the base apply; the 900px block comes later, so 2 columns wins. At 500px all three apply, and the last one (1 column) wins.

That "later wins" behaviour is the **cascade**, the same rule they already met with normal CSS. A media query does not add extra power or specificity. It only adds a condition.

---

## PART 3: Anatomy of one query

Take the phone block and label it:

```css
@media (max-width: 600px) {
/*  ^      ^          ^
    |      |          |
    |      |          +-- the value: 600 CSS pixels
    |      +------------- the feature: viewport width
    +-------------------- at-rule: "this is a media query" */

  .site-header {
    flex-direction: column;
  }
}
```

Four pieces to remember:

| Piece | Meaning |
|---|---|
| `@media` | starts the query |
| `(max-width: 600px)` | the condition: viewport width is 600px or less |
| `{ ... }` | the rules that apply only when the condition is true |
| `600px` | **CSS pixels**, not physical pixels and not the element's width |

The width being tested is the **viewport** — the visible browser window, roughly the phone screen. It is not the width of `.site-header`, and it is not the width of the page content.

**A common confusion:** "Does `max-width: 600px` mean the element can be at most 600px?" In a media query, no. It means *the screen* is at most 600px. The same words mean something different in a normal rule like `max-width: 600px;` on a `.card`, where it limits that element. Point this out explicitly; students mix these up for months.

---

## PART 4: The viewport meta tag (the invisible requirement)

Every HTML file in this lesson starts with:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Without it, a phone browser assumes it is displaying a desktop page about **980px wide**, renders at that width, then shrinks the result to fit the screen. Your `max-width: 600px` query never matches, and the student concludes "media queries don't work on my phone."

With it, the phone reports its real width: `width=device-width`. Now `600px` means 600 real CSS pixels.

**Demonstrate:** in DevTools, delete the meta tag from the Elements panel, then toggle the device toolbar. The page zooms out and the mobile styles disappear. Put it back. That single line is the difference.

**Say:** *"The meta tag is you telling the phone: stop pretending to be a desktop. Tell me your real width."*

This line belongs in the `<head>` of every page, before any stylesheet.

---

## PART 5: Walking through the demo, layer by layer

Open [16-media-queries.css](../code/16-media-queries.css) next to the browser. It is deliberately organised in three layers.

### Layer 1 — base styles (desktop)

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

`repeat(3, 1fr)` means three equal columns. This is the **desktop** arrangement. Nothing here mentions a screen size, so it applies everywhere by default.

Other base decisions:

- `.site-header` is `display: flex` with `justify-content: space-between` → logo left, nav right.
- `.page` has `max-width: 1100px` → the content stops growing on huge monitors.
- `.hero` has `padding: 48px` and `font-size: 3rem`.

**Point out:** the base is not "the desktop query." It is just CSS. Desktop-first means the base *happens to be* the wide version.

### Layer 2 — tablet at 900px

```css
@media (max-width: 900px) {
  .hero { padding: 32px; }
  .hero h1 { font-size: 2.25rem; }
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
```

Resize the window and watch the badge. The moment it reads `900px` or less:

- the hero loses 16px of padding on each side,
- the heading drops from `3rem` to `2.25rem`,
- the grid switches from three columns to two.

**Ask:** *"Which properties did we NOT rewrite?"* Background, colours, gap, border radius, card padding. They are inherited from the base layer. **A media query only needs to contain what changes.** Students often copy the whole rule; that works but hides what actually changed.

### Layer 3 — phone at 600px

```css
@media (max-width: 600px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    flex-direction: column;
    gap: 8px;
  }

  .page { padding: 20px 16px; }
  .hero { padding: 24px 20px; border-radius: 12px; }
  .hero h1 { font-size: 1.75rem; }
  .card-grid { grid-template-columns: 1fr; }
  .card { padding: 18px; }
}
```

Now the important change:

```css
.site-header { flex-direction: column; }
```

The header was a row (`flex-direction` defaults to `row`). On a phone it becomes a column: logo on top, nav underneath. **The HTML did not move a single element.** Flexbox re-ordered the layout.

And the grid:

```css
.card-grid { grid-template-columns: 1fr; }
```

`1fr` is one fraction of the available width — one column. The same three `<article class="card">` elements now stack.

**Ask:** *"Why is it `1fr` and not `100%`?"* Both would work here, but `1fr` is the grid-native way to say "one equal column," and it keeps the `gap` behaviour consistent.

### The full journey

| Window width | Grid | Header | Heading |
|---|---|---|---|
| 1101px+ | 3 columns | logo left, nav right | 3rem |
| 901-1100px | 3 columns | row | 3rem |
| 601-900px | 2 columns | row | 2.25rem |
| 600px and below | 1 column | stacked | 1.75rem |

That table is the lesson. If the student can reproduce it from the CSS, they understand it.

---

## PART 6: Desktop-first vs mobile-first

Both directions produce the same page. The difference is **which version you write first** and which keyword you use.

### Desktop-first (what the demo does)

Start wide, then shrink.

```css
.card-grid { grid-template-columns: repeat(3, 1fr); }   /* base */

@media (max-width: 900px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

- `max-width` = **at most** this wide.
- Breakpoints go from **largest to smallest**.
- The base is the desktop design.

This matches how the student is working: he already built the desktop version. So teach this first.

### Mobile-first

Start narrow, then add.

```css
.card-grid { grid-template-columns: 1fr; }              /* base */

@media (min-width: 600px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

- `min-width` = **from** this wide upwards.
- Breakpoints go from **smallest to largest**.
- The base is the phone design.

### How to explain the difference in one line

> `max-width` asks **"is the screen small enough?"** `min-width` asks **"is the screen big enough?"**

A phone at 375px satisfies *both* `max-width: 900px` and `max-width: 600px`. That is why order matters: the later block overrides the earlier one. On desktop-first, the 600px block must come after the 900px block.

**Ask:** *"What happens if you put the 600px block before the 900px block?"* At 500px both match, and the 900px block wins because it comes later. The phone gets 2 columns instead of 1. Order is not decoration; it is part of the logic.

Which should the student use? Either, consistently. Industry mostly writes mobile-first, but switching mid-project creates exactly the order bugs above. Since he is going desktop → mobile, finish this project desktop-first, then convert one page to mobile-first as an exercise.

---

## PART 7: What actually changes at a breakpoint

Beginners think "responsive" means "make everything smaller." It is really **reflow**. The checklist:

| Change | Desktop | Phone |
|---|---|---|
| Columns | 3 | 1 |
| Flex direction | row | column |
| Padding | 32-48px | 16-20px |
| Heading size | 3rem | 1.75rem |
| Navigation | inline links | stacked (or a hamburger later) |
| Images | fixed width | `max-width: 100%; height: auto;` |
| Tap targets | mouse-sized | at least ~44×44px |

Two rules that prevent most mobile bugs:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Without this, one wide image forces the whole page to scroll sideways.

```css
* {
  box-sizing: border-box;
}
```

With `border-box`, padding is included in an element's width. Without it, `width: 100%` plus padding becomes wider than the screen.

**Do not** solve mobile by shrinking text to 8px or hiding half the page. Reflow first; hide only genuinely non-essential decoration.

---

## PART 8: Choosing breakpoints

Do **not** write a query for every phone model. There are thousands. Write one where the design stops looking right.

The demo uses 900px and 600px because:

- below ~900px, three cards become too narrow to read comfortably;
- below ~600px, two cards are still cramped and the header row no longer fits.

Those are **content** decisions, not device decisions.

Common starting points (not laws):

| Name | Typical range |
|---|---|
| Phone | up to ~600px |
| Tablet | ~600-900px |
| Small laptop | ~900-1200px |
| Desktop | 1200px+ |

**Say:** *"Resize the page slowly. The moment something looks bad, write down the width. That is your breakpoint."*

Two or three breakpoints is normal for a small site. Ten is a sign the base layout is fragile.

Also note: media queries test **CSS pixels**, so they behave the same on a phone, a tablet, and a narrow desktop window. That is why resizing a desktop browser is a valid first test.

---

## PART 9: How to test (and why "it looks fine on my laptop" is not a test)

1. **Drag the window.** Start at full width and go down to ~320px. Watch for:
   - horizontal scrolling,
   - text touching edges,
   - cards becoming unreadably narrow,
   - overlapping elements.
2. **DevTools device toolbar.** `F12` → `Ctrl+Shift+M`. Pick iPhone SE (375px), iPhone 14 (390px), a tablet (768px). This reports the viewport the way a phone does.
3. **Check for sideways scroll** in the console:

   ```js
   document.documentElement.scrollWidth > window.innerWidth
   ```

   `true` means something is wider than the screen. Usually a fixed-width element, a wide image, or padding without `border-box`.
4. **Real phone.** Put the file on a local server or your host and open it on the actual device. Fonts, scrollbars, and touch targets differ from a desktop mockup.
5. **Test between breakpoints**, not only at them: 601px, 899px, 901px. Bugs love the gaps.

---

## PART 10: The mistakes that make students say "it doesn't work"

| Mistake | What happens | Fix |
|---|---|---|
| Missing viewport meta tag | Phone renders at ~980px; queries never match | Add the `<meta name="viewport">` line |
| Fixed widths (`width: 1200px`) | Page overflows on phones | Use `max-width` and percentages/`fr` |
| Query placed **before** the base rule | Base rule wins; nothing appears to change | Put queries after the base styles |
| Mixing `max-width` and `min-width` randomly | Overlapping ranges fight; order bugs | Pick one direction per project |
| Same specificity, wrong order | The wrong block wins | Largest `max-width` first, smallest last |
| Forgetting `box-sizing: border-box` | `width: 100%` + padding overflows | Global `* { box-sizing: border-box; }` |
| Wide images | Horizontal scroll on mobile | `img { max-width: 100%; height: auto; }` |
| Using `!important` to force it | Works once, breaks later overrides | Fix order/specificity instead |
| Testing only at exact breakpoints | Gaps between breakpoints break | Test 320, 375, 600, 601, 900, 901, 1200 |
| Hiding content instead of reflowing | Phone users lose information | Stack/reflow first |

One more, specific to this lesson: **a media query does not make an element responsive by itself.** If the base layout uses fixed pixel widths, the query has to undo all of them. Design the base with `flex`, `grid`, `%`, `fr`, and `max-width`, and the queries stay short.

---

## PART 11: Exercises (with answers)

Do these in [16-media-queries.css](../code/16-media-queries.css), refreshing after each one.

### Exercise 1 — write the phone header from memory

Hide the existing 600px block and write it yourself: stack the header and nav, and reduce the page padding. Then compare.

<details>
<summary>Answer</summary>

```css
@media (max-width: 600px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;
  }

  .site-nav {
    flex-direction: column;
    gap: 8px;
  }

  .page {
    padding: 20px 16px;
  }
}
```

</details>

### Exercise 2 — add a 4-column desktop layout

Add a fourth card in the HTML, make the desktop grid 4 columns, 2 columns at 900px, and 1 column at 600px.

<details>
<summary>Answer</summary>

```css
.card-grid { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 900px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

</details>

### Exercise 3 — shrink the hero at tablet size

At 900px, make the hero padding `24px 32px` and the paragraph `1rem`. Do not touch the desktop values.

<details>
<summary>Answer</summary>

```css
@media (max-width: 900px) {
  .hero { padding: 24px 32px; }
  .hero p { font-size: 1rem; }
}
```

</details>

### Exercise 4 — hide something, carefully

At 600px, hide the footer with `display: none`. Then answer: is hiding it the right choice? What would you do instead?

<details>
<summary>Answer</summary>

```css
@media (max-width: 600px) {
  .site-footer { display: none; }
}
```

Hiding is acceptable for decoration or duplicate information, but not for content the user needs. Better: reduce its padding and font size, or move it. The exercise is about asking the question, not about the `display` value.

</details>

### Exercise 5 — convert to mobile-first

Rewrite the three grid rules using `min-width`, starting from one column.

<details>
<summary>Answer</summary>

```css
.card-grid { grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

The page looks identical. The base is now the phone.

</details>

### Exercise 6 — find the overflow

Add `width: 900px` to `.hero`, resize to phone width, and find the horizontal scrollbar. Then fix it without deleting the hero.

<details>
<summary>Answer</summary>

Replace `width: 900px` with `max-width: 900px` (or `width: 100%; max-width: 900px`). `max-width` lets the element shrink; `width` refuses to.

</details>

---

## PART 12: Checkpoint quiz

1. In one sentence, what is a media query?
2. What does `@media (max-width: 600px)` mean? Which width is being tested?
3. Why must the 600px block come after the 900px block in a desktop-first stylesheet?
4. What does the viewport meta tag do, and what happens without it?
5. Give two layout changes you would make on a phone, and one thing you would **not** do.

<details>
<summary>Answers</summary>

1. A conditional block of CSS that only applies when the screen matches a condition.
2. "When the viewport is 600 CSS pixels wide or less, apply these rules." The browser window/viewport is tested, not the element.
3. At widths ≤600px both blocks match. With equal specificity, the later rule wins, so the phone block must be last to override the tablet block.
4. It tells the browser to use the device's real width (`width=device-width`) at a 1:1 scale. Without it, phones assume a ~980px desktop viewport, so mobile queries do not match and the page is zoomed out.
5. Stack the nav, go from 3 columns to 1, reduce padding, enlarge tap targets. Do **not** shrink body text to unreadable sizes or hide essential content.

</details>

---

## The one-sentence summary

> **Write the desktop layout, then add `@media (max-width: ...)` blocks that override only what needs to change as the screen gets smaller.**

And the debugging sentence, which solves most "it doesn't work" reports:

> **Is the query after the base rule, is the viewport tag present, and is the element actually using a flexible width?**

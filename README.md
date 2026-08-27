C Programming Notes — Unit 1

A digital "notebook style" set of C programming notes covering the complete first-unit syllabus, built as standalone HTML pages with a shared stylesheet and interactive navigation.

📚 What This Is

Each topic is a single HTML page styled to look like a page from a physical notebook (dot-grid background, punch holes, red margin line) with syntax-highlighted code, annotated explanations, worked examples, and common-mistake call-outs. Pages are numbered to follow the syllabus in order and link to each other via a floating navigation bar.

✅ Features
Notebook visual theme — light & dark mode (toggle persists via browser storage)
Prev / Next navigation bar with a jump-to-topic dropdown, plus left/right arrow key navigation
Copy button on every code block
Fully self-contained — no build step, just open index.html in a browser
A merged PDF booklet (C-Programming-Notes-Unit1-Complete.pdf) for printing or offline reading
📂 File Structure
├── index.html                     01. Structure of a C Program
├── 02-compilation.html            02. Compilation and Execution
├── 03-interactive-script.html     03. Interactive and Script Mode
├── 04-comments.html               04. Comments and Documentation
├── 05-tokens.html                 05. Tokens (Keywords, Identifiers, Constants, Strings)
├── 06-datatypes-overview.html     06. Data Types — Part 1: Overview
├── 07-datatypes-integer.html      07. Data Types — Part 2: Integer Types & Size Modifiers
├── 08-datatypes-size.html         08. Data Types — Part 3: Size, Range & sizeof()
├── 09-variables.html              09. Variables
├── 10-constants.html              10. Constants
├── 11-typecasting.html            11. Type Casting
├── 12-operators.html              12. Operators & Expressions
├── 13-operator-precedence.html    13. Operator Precedence and Associativity
├── 14-io-functions.html           14. Input/Output Functions
├── 15-formatted-io.html           15. Formatted Input and Output (printf, scanf)
├── 16-errors-debugging.html       16. Basic Error Messages and Debugging Techniques
├── styles.css                     Shared notebook theme (light + dark mode)
├── notes.js                       Navigation bar, theme toggle, copy buttons, keyboard nav
├── C-Programming-Notes-Unit1-Complete.pdf   All 16 topics merged, in order
└── LICENSE                        Apache License 2.0
👀 How to View

Option 1 — Locally: Download the whole folder and open index.html in any browser. All pages link to each other, so you can browse the full unit from there.

Option 2 — Host it: Push the folder to GitHub Pages, Netlify, or any static host — no server or build step required, since it's plain HTML/CSS/JS.

Option 3 — Print/offline: Open C-Programming-Notes-Unit1-Complete.pdf for a printable version of the full set.

🎯 Syllabus Coverage

Structure of C Program · Compilation and Execution · Interactive and Script Mode · Comments and Documentation · Tokens · Data Types · Variables · Constants · Type Casting · Operators · Operator Precedence and Associativity · Input/Output Functions · Formatted Input and Output · Basic Error Messages and Debugging Techniques

🔧 Adding a New Topic
Copy the closest existing page as a template (keep the <head> links to styles.css and notes.js and the .page / .punch-hole wrapper structure).
Reuse existing CSS component classes where possible: .aim-box, .section-tag, .code-container + .code-box + .explanation-box, .star-box, .cloud-note, .custom-table / .styled-table, .grid-2 + .card-box, .revision-footer-pill, .footer-page.
Add the new page's title and filename to the pages array at the top of notes.js (in the correct syllabus position) so it appears in the nav bar and dropdown.
Regenerate the merged PDF if needed (each page can be converted individually and appended in order).
📋 Tech Stack

Plain HTML5, CSS3 (custom properties for theming), and vanilla JavaScript — no frameworks, no build tools. Fonts via Google Fonts (Comic Neue, Fira Code, Caveat, Outfit).

📋 License

Apache License 2.0 — see LICENSE.

Made for Mukilan.

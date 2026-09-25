/* ==========================================
   AUTHENTIC DIGITAL NOTEBOOK INTERACTIVE JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Detect path prefix depending on where the current HTML file lives
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  let pathPrefix = '';
  if (currentPath.includes('/unit-1/') || currentPath.includes('/unit-2/') || currentPath.includes('/unit-3/')) {
    pathPrefix = '../';
  }

  // Multilevel structure by Units
  const unitsData = [
    {
      id: 'unit1',
      title: 'Unit 1: C Fundamentals & Basics',
      defaultUrl: pathPrefix + 'index.html',
      pages: [
        { title: '01. Structure of a C Program', url: pathPrefix + 'index.html' },
        { title: '02. Compilation & Execution', url: pathPrefix + 'unit-1/02-compilation.html' },
        { title: '03. Interactive & Script Mode', url: pathPrefix + 'unit-1/03-interactive-script.html' },
        { title: '04. Comments & Documentation', url: pathPrefix + 'unit-1/04-comments.html' },
        { title: '05. Tokens', url: pathPrefix + 'unit-1/05-tokens.html' },
        { title: '06. Data Types: Overview', url: pathPrefix + 'unit-1/06-datatypes-overview.html' },
        { title: '07. Data Types: Integer Types', url: pathPrefix + 'unit-1/07-datatypes-integer.html' },
        { title: '08. Data Types: Size & sizeof()', url: pathPrefix + 'unit-1/08-datatypes-size.html' },
        { title: '09. Variables', url: pathPrefix + 'unit-1/09-variables.html' },
        { title: '10. Constants', url: pathPrefix + 'unit-1/10-constants.html' },
        { title: '11. Type Casting', url: pathPrefix + 'unit-1/11-typecasting.html' },
        { title: '12. Operators & Expressions', url: pathPrefix + 'unit-1/12-operators.html' },
        { title: '13. Operator Precedence', url: pathPrefix + 'unit-1/13-operator-precedence.html' },
        { title: '14. Input/Output Functions', url: pathPrefix + 'unit-1/14-io-functions.html' },
        { title: '15. Formatted I/O (printf, scanf)', url: pathPrefix + 'unit-1/15-formatted-io.html' },
        { title: '16. Errors & Debugging', url: pathPrefix + 'unit-1/16-errors-debugging.html' }
      ]
    },
    {
      id: 'unit2',
      title: 'Unit 2: Control Statements & Functions',
      defaultUrl: pathPrefix + 'unit-2/unit2.html',
      pages: [
        { title: '01. Decision Making (if & if-else)', url: pathPrefix + 'unit-2/unit2.html' },
        { title: '02. Decision Making (switch Statement)', url: pathPrefix + 'unit-2/02-Decision-Making-(switch-Statement).html' },
        { title: '03. Looping (while & for Loops)', url: pathPrefix + 'unit-2/03-Looping-(while-&-for-Loops).html' },
        { title: '04. Looping (do-while & Nested Loops)', url: pathPrefix + 'unit-2/04-Looping-(do-while-&-Nested-Loops).html' },
        { title: '05. Jump Statements (break & continue)', url: pathPrefix + 'unit-2/05-Jump-Statements-(break-&-continue).html' },
        { title: '06A. Function Basics', url: pathPrefix + 'unit-2/06-Function-Basics-(Declaration-Definition-Calling-&-Return-Types).html' },
        { title: '06B. 4 Function Categories', url: pathPrefix + 'unit-2/06-B-The-4-Function-Categories.html' },
        { title: '07A. Call by Value', url: pathPrefix + 'unit-2/07-Parameter-Passing-(Call-by-Value).html' },
        { title: '07B. Call by Reference', url: pathPrefix + 'unit-2/07-B-Parameter-Passing-(Call-by-Reference).html' },
        { title: '08. Recursion', url: pathPrefix + 'unit-2/08-Recursion.html' },
        { title: '09. Scope and Lifetime of Variables', url: pathPrefix + 'unit-2/09-Scope-and-Lifetime-of-Variables.html' },
        { title: '10. Header Files', url: pathPrefix + 'unit-2/10-Header-Files.html' }
      ]
    },
    {
      id: 'unit3',
      title: 'Unit 3: Arrays, Pointers, Structures & Files',
      defaultUrl: pathPrefix + 'unit-3/unit3.html',
      pages: [
        { title: '01. 1D Arrays & Operations', url: pathPrefix + 'unit-3/unit3.html' },
        { title: '02. 2D Arrays (Matrices)', url: pathPrefix + 'unit-3/02-2D-Array.html' },
        { title: '03. String Basics & Input', url: pathPrefix + 'unit-3/03-String.html' },
        { title: '04. Built-in String Functions', url: pathPrefix + 'unit-3/04-Built-in-String-Functions.html' },
        { title: '05. Pointers Basics & Dereferencing', url: pathPrefix + 'unit-3/05-pointer.html' },
        { title: '06. Pointer Arithmetic & Arrays', url: pathPrefix + 'unit-3/06-Pointer-Arithmetic.html' },
        { title: '07. Function Pointers & Callbacks', url: pathPrefix + 'unit-3/07-Function-Pointers.html' },
        { title: '08. Dynamic Memory Allocation', url: pathPrefix + 'unit-3/08-Dynamic-Memory-Allocation.html' },
        { title: '09. Structures (struct)', url: pathPrefix + 'unit-3/09-Structures.html' },
        { title: '10. Unions (union)', url: pathPrefix + 'unit-3/10-Unions.html' },
        { title: '11. Array of Structures', url: pathPrefix + 'unit-3/11-Array-of-Structures.html' },
        { title: '12. File Operations (fopen, fclose)', url: pathPrefix + 'unit-3/12-File-Operations.html' },
        { title: '13. Text & Binary Files', url: pathPrefix + 'unit-3/13-Text-and-Binary-Files.html' },
        { title: '14. File Pointers (fseek, ftell)', url: pathPrefix + 'unit-3/14-File-Pointers.html' },
        { title: '15. File Error Handling', url: pathPrefix + 'unit-3/15-Error-Handling.html' },
        { title: '16. Standard C Libraries Summary', url: pathPrefix + 'unit-3/16-Standard-Libraries.html' }
      ]
    }
  ];

  // Determine current filename
  const currentPathParts = window.location.pathname.replace(/\\/g, '/').split('/');
  let currentFilename = currentPathParts.pop();
  if (!currentFilename || currentFilename === '') {
    currentFilename = 'index.html';
  }

  // Find active unit and topic index by checking if page URL ends with the current filename
  let activeUnitIndex = 0;
  let activeTopicIndex = 0;

  unitsData.forEach((u, uIdx) => {
    const tIdx = u.pages.findIndex(p => {
      const pageFile = p.url.split('/').pop();
      return pageFile.toLowerCase() === currentFilename.toLowerCase();
    });
    if (tIdx !== -1) {
      activeUnitIndex = uIdx;
      activeTopicIndex = tIdx;
    }
  });

  const activeUnit = unitsData[activeUnitIndex];
  const pages = activeUnit.pages;

  // Build Floating Navigation Bar with Unit Selector
  createNavigationBar(unitsData, activeUnitIndex, activeTopicIndex);

  // Setup Theme Toggle (Dark/Light mode)
  initTheme();

  // Add Copy Button to Code Blocks
  setupCodeCopyButtons();

  // Keyboard Arrow Navigation within current unit
  setupKeyboardNavigation(pages, activeTopicIndex);
});

/**
 * Creates and injects the top floating toolbar into the page
 */
function createNavigationBar(unitsData, currentUnitIdx, currentTopicIdx) {
  const nav = document.createElement('div');
  nav.className = 'notes-nav-bar';

  const currentUnit = unitsData[currentUnitIdx];
  const pages = currentUnit.pages;

  // 1. Unit Select Dropdown
  const unitSelect = document.createElement('select');
  unitSelect.className = 'unit-select';
  unitSelect.title = 'Select Unit';
  unitsData.forEach((u, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = u.title;
    if (idx === currentUnitIdx) opt.selected = true;
    unitSelect.appendChild(opt);
  });

  unitSelect.addEventListener('change', (e) => {
    const selectedUnitIdx = parseInt(e.target.value, 10);
    const targetUnit = unitsData[selectedUnitIdx];
    window.location.href = targetUnit.defaultUrl;
  });

  // 2. Previous Topic Button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn';
  prevBtn.innerHTML = '&#8592; Prev';
  prevBtn.title = 'Previous Topic (Left Arrow)';
  if (currentTopicIdx === 0) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = '0.5';
    prevBtn.style.cursor = 'not-allowed';
  } else {
    prevBtn.addEventListener('click', () => {
      window.location.href = pages[currentTopicIdx - 1].url;
    });
  }

  // 3. Topic Select Dropdown
  const topicSelect = document.createElement('select');
  topicSelect.className = 'topic-select';
  topicSelect.title = 'Select Topic';
  pages.forEach((p, idx) => {
    const opt = document.createElement('option');
    opt.value = p.url;
    opt.textContent = p.title;
    if (idx === currentTopicIdx) {
      opt.selected = true;
    }
    topicSelect.appendChild(opt);
  });

  topicSelect.addEventListener('change', (e) => {
    window.location.href = e.target.value;
  });

  // 4. Next Topic Button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn';
  nextBtn.innerHTML = 'Next &#8594;';
  nextBtn.title = 'Next Topic (Right Arrow)';
  if (currentTopicIdx === pages.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
  } else {
    nextBtn.addEventListener('click', () => {
      window.location.href = pages[currentTopicIdx + 1].url;
    });
  }

  // 5. Theme Toggle Button
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle-btn';
  themeBtn.innerHTML = '&#127769; Dark';
  themeBtn.title = 'Toggle Dark Mode';
  themeBtn.addEventListener('click', toggleTheme);

  // Assemble navigation toolbar
  nav.appendChild(unitSelect);
  nav.appendChild(prevBtn);
  nav.appendChild(topicSelect);
  nav.appendChild(nextBtn);
  nav.appendChild(themeBtn);

  document.body.insertBefore(nav, document.body.firstChild);
}

/**
 * Manages Dark Mode & Light Mode state with LocalStorage persistence
 */
function initTheme() {
  const savedTheme = localStorage.getItem('notes_theme');
  const themeBtn = document.getElementById('theme-toggle-btn');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeBtn) themeBtn.innerHTML = '&#9728;&#65039; Light';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  const themeBtn = document.getElementById('theme-toggle-btn');

  if (isDark) {
    localStorage.setItem('notes_theme', 'dark');
    if (themeBtn) themeBtn.innerHTML = '&#9728;&#65039; Light';
  } else {
    localStorage.setItem('notes_theme', 'light');
    if (themeBtn) themeBtn.innerHTML = '&#127769; Dark';
  }
}

/**
 * Adds an interactive 'Copy Code' button to all .code-box containers
 */
function setupCodeCopyButtons() {
  const codeBoxes = document.querySelectorAll('.code-box');
  codeBoxes.forEach(box => {
    // Ensure relative positioning
    if (getComputedStyle(box).position === 'static') {
      box.style.position = 'relative';
    }

    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.textContent = 'Copy';

    btn.addEventListener('click', () => {
      // Extract clean text from code snippet
      const textToCopy = box.innerText.replace(/^Copy$/m, '').trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.textContent = 'Copied!';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.background = '';
        }, 1800);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    });

    box.appendChild(btn);
  });
}

/**
 * Enables left/right keyboard arrows to quickly switch between topics
 */
function setupKeyboardNavigation(pages, currentIndex) {
  document.addEventListener('keydown', (e) => {
    // Ignore key presses inside text inputs or select elements
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      window.location.href = pages[currentIndex - 1].url;
    } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
      window.location.href = pages[currentIndex + 1].url;
    }
  });
}

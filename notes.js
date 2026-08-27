/* ==========================================
   AUTHENTIC DIGITAL NOTEBOOK INTERACTIVE JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // List of all notebook pages in sequence
  const pages = [
    { title: '01. Structure of a C Program', url: 'index.html' },
    { title: '02. Compilation & Execution', url: '02-compilation.html' },
    { title: '03. Interactive & Script Mode', url: '03-interactive-script.html' },
    { title: '04. Comments & Documentation', url: '04-comments.html' },
    { title: '05. Tokens', url: '05-tokens.html' },
    { title: '06. Data Types: Overview', url: '06-datatypes-overview.html' },
    { title: '07. Data Types: Integer Types', url: '07-datatypes-integer.html' },
    { title: '08. Data Types: Size & sizeof()', url: '08-datatypes-size.html' },
    { title: '09. Variables', url: '09-variables.html' },
    { title: '10. Constants', url: '10-constants.html' },
    { title: '11. Type Casting', url: '11-typecasting.html' },
    { title: '12. Operators & Expressions', url: '12-operators.html' },
    { title: '13. Operator Precedence', url: '13-operator-precedence.html' },
    { title: '14. Input/Output Functions', url: '14-io-functions.html' },
    { title: '15. Formatted I/O (printf, scanf)', url: '15-formatted-io.html' },
    { title: '16. Errors & Debugging', url: '16-errors-debugging.html' }
  ];

  // Determine current page filename
  let currentFilename = window.location.pathname.split('/').pop();
  if (!currentFilename || currentFilename === '') {
    currentFilename = 'index.html';
  }
  const currentIndex = pages.findIndex(p => p.url.toLowerCase() === currentFilename.toLowerCase());

  // Build Floating Navigation Bar
  createNavigationBar(pages, currentIndex !== -1 ? currentIndex : 0);

  // Setup Theme Toggle (Dark/Light mode)
  initTheme();

  // Add Copy Button to Code Blocks
  setupCodeCopyButtons();

  // Keyboard Arrow Navigation
  setupKeyboardNavigation(pages, currentIndex !== -1 ? currentIndex : 0);
});

/**
 * Creates and injects the top floating toolbar into the page
 */
function createNavigationBar(pages, currentIndex) {
  const nav = document.createElement('div');
  nav.className = 'notes-nav-bar';

  // Previous Page Button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn';
  prevBtn.innerHTML = '&#8592; Prev';
  prevBtn.title = 'Previous Topic (Left Arrow)';
  if (currentIndex === 0) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = '0.5';
    prevBtn.style.cursor = 'not-allowed';
  } else {
    prevBtn.addEventListener('click', () => {
      window.location.href = pages[currentIndex - 1].url;
    });
  }

  // Dropdown Select for Jump Navigation
  const select = document.createElement('select');
  select.title = 'Select Topic';
  pages.forEach((p, idx) => {
    const opt = document.createElement('option');
    opt.value = p.url;
    opt.textContent = p.title;
    if (idx === currentIndex) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    window.location.href = e.target.value;
  });

  // Next Page Button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn';
  nextBtn.innerHTML = 'Next &#8594;';
  nextBtn.title = 'Next Topic (Right Arrow)';
  if (currentIndex === pages.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
  } else {
    nextBtn.addEventListener('click', () => {
      window.location.href = pages[currentIndex + 1].url;
    });
  }

  // Theme Toggle Button
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle-btn';
  themeBtn.innerHTML = '&#127769; Dark';
  themeBtn.title = 'Toggle Dark Mode';
  themeBtn.addEventListener('click', toggleTheme);

  // Assemble navigation toolbar
  nav.appendChild(prevBtn);
  nav.appendChild(select);
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

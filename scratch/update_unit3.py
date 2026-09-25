import glob
import re

files = glob.glob('unit-3/*.html')
print(f"Found {len(files)} files to update.")

for filepath in sorted(files):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove embedded <style>...</style> block
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
    
    # 2. Add styles.css and notes.js links if not present
    if '../styles.css' not in content:
        content = re.sub(r'</head>', '    <link rel="stylesheet" href="../styles.css">\n    <script src="../notes.js" defer></script>\n</head>', content)

    # 3. Replace page-a4 with page
    content = re.sub(r'class=["\']page-a4["\']', 'class="page"', content)

    # 4. Replace page-number with footer-page
    content = re.sub(r'class=["\']page-number["\']', 'class="footer-page"', content)

    # 5. Standardize main-title heading
    content = re.sub(r'<h1 class=["\']main-title["\'].*?>.*?</h1>', '<h1 class="main-title">UNIT 3: C PROGRAMMING</h1>', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully updated all Unit 3 files!")

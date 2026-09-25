import glob
import re

html_files = glob.glob('index.html') + glob.glob('unit-1/*.html') + glob.glob('unit-2/*.html') + glob.glob('unit-3/*.html')
print(f"Total HTML files found: {len(html_files)}")

class_usage = {}

# 1. Parse CSS selectors from styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Extract class selectors like .class-name, body.dark-mode .class-name, etc.
# Match .class-name pattern (letters, numbers, hyphens, underscores)
css_classes = set(re.findall(r'\.([a-zA-Z0-9_-]+)', css_content))
print(f"Total CSS classes found in styles.css: {len(css_classes)}")

# Exclude pseudo-classes or keyframe steps if any
css_classes = {c for c in css_classes if not c.isdigit()}

# 2. Search usage in HTML files
all_html_text = ""
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        all_html_text += f.read() + "\n"

# Also include notes.js in search as JS dynamically creates or references classes
with open('notes.js', 'r', encoding='utf-8') as f:
    all_html_text += f.read() + "\n"

unused_classes = []
used_classes = []

for cls in sorted(css_classes):
    # Regex search for class name in class="..." or JS strings
    pattern = r'\b' + re.escape(cls) + r'\b'
    if re.search(pattern, all_html_text):
        used_classes.append(cls)
    else:
        unused_classes.append(cls)

print(f"Used classes: {len(used_classes)}")
print(f"Unused classes: {len(unused_classes)}")
print("Unused classes list:", unused_classes)

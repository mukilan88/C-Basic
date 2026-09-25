import glob
import re

files = glob.glob('unit-3/*.html')
all_classes = set()
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        classes = re.findall(r'class=["\']([^"\']+)["\']', fp.read())
        for c_str in classes:
            for c in c_str.split():
                all_classes.add(c)

with open('styles.css', 'r', encoding='utf-8') as fp:
    css_content = fp.read()

defined_classes = set(re.findall(r'\.([a-zA-Z0-9_-]+)', css_content))

missing = sorted(all_classes - defined_classes)
print("Missing classes in styles.css for Unit 3:")
for m in missing:
    print(f"- {m}")

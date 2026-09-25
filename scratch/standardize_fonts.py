import glob
import re

files = glob.glob('index.html') + glob.glob('unit-1/*.html') + glob.glob('unit-2/*.html') + glob.glob('unit-3/*.html')
print(f"Standardizing font inline styles across {len(files)} HTML files...")

modified_count = 0
for filepath in sorted(files):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content

    # 1. Standardize inline paragraph font sizes (e.g. font-size: 11.2px, 11px, 12px, 13px -> 15px)
    new_content = re.sub(r'font-size:\s*(?:10|11|11\.2|12|12\.5|13)\s*px', 'font-size: 15px', new_content)

    # 2. Standardize card-title & section font sizes in inline style overrides
    new_content = re.sub(r'font-size:\s*10\.5px', 'font-size: 14px', new_content)
    new_content = re.sub(r'font-size:\s*9\.5px', 'font-size: 13px', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        modified_count += 1

print(f"Finished! Updated typography on {modified_count} HTML pages.")

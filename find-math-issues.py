import re

file_path = r"docs\Resources\Part VI\6.3_DESIGN_OF_CENTRIFUGAL_PUMPS.md"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Looking for potential MDX/acorn issues:\n")

in_math = False
math_start = 0

for i, line in enumerate(lines, 1):
    # Track math blocks
    if '$$' in line:
        if not in_math:
            in_math = True
            math_start = i
        else:
            in_math = False
    
    # Look for problematic patterns
    if in_math:
        # Check for lines starting with { in math mode
        if re.match(r'^\s*\{[^}]*$', line):
            print(f"Line {i}: Possible issue - line starts with {{ in math block")
            print(f"  Content: {line.strip()}")
        
        # Check for & followed by {
        if re.search(r'&\s*\{', line):
            print(f"Line {i}: Possible issue - & followed by {{")
            print(f"  Content: {line.strip()}")
    
    # Check for footnotes directly followed by $$
    if re.search(r'\[\^\d+\]\$\$', line):
        print(f"Line {i}: Footnote directly followed by $$")
        print(f"  Content: {line.strip()}")
    
    # Check for single < or > outside math
    if not in_math and re.search(r'[<>](?![<>=])', line) and not re.search(r'<br/?>', line):
        if '<' in line or '>' in line:
            print(f"Line {i}: Possible stray < or > character")
            print(f"  Content: {line.strip()}")

print("\nDone!")

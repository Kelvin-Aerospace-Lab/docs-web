import os
import re
from pathlib import Path

docs_dir = Path("docs")
issues_found = []

for md_file in docs_dir.rglob("*.md"):
    with open(md_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    in_math = False
    
    for i, line in enumerate(lines, 1):
        # Track math blocks
        if '$$' in line:
            in_math = not in_math
        
        # Check for problematic patterns in math mode
        if in_math:
            # Check for & followed by { without space
            if re.search(r'&\s*\{[^}]*$', line):
                issues_found.append((str(md_file), i, "& followed by { at line end", line.strip()))
        
        # Check for > or < in math that might confuse MDX (not in comparisons)
        if in_math and re.search(r'[0-9]\s*[<>]\s*[A-Z]', line):
            # This is likely a comparison, might need escaping
            issues_found.append((str(md_file), i, "Comparison operator in math", line.strip()))

# Print all issues
if issues_found:
    print(f"Found {len(issues_found)} potential issues:\n")
    for file, line_num, issue_type, content in issues_found:
        print(f"{file}:{line_num}")
        print(f"  Issue: {issue_type}")
        print(f"  Content: {content[:100]}")
        print()
else:
    print("No obvious issues found!")

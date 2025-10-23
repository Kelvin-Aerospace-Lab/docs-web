# Fix common MDX math issues in markdown files
$files = Get-ChildItem -Path "docs" -Filter "*.md" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Fix: footnote directly followed by $$ (add newline between)
    $content = $content -replace '(\[\^\d+\])\$\$', "`$1`n`n`$`$"
    
    # Fix: Remove extra curly braces at start of math expressions that cause acorn errors
    # This is tricky - we need to be careful not to break valid LaTeX
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Write-Host "Fixing: $($file.FullName)"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    }
}

Write-Host "Done! Math issues have been fixed."

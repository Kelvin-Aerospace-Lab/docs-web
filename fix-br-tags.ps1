# Fix <br> tags to <br/> in all markdown files
$files = Get-ChildItem -Path "docs" -Filter "*.md" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace <br> with <br/>
    $content = $content -replace '<br>', '<br/>'
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Write-Host "Fixing: $($file.FullName)"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    }
}

Write-Host "Done! All <br> tags have been replaced with <br/>"

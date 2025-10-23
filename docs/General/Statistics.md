---
title: Statistics
slug: Statistics
sidebar_position: 2
date: 2025-10-22
draft: "true"
---

```dataviewjs
// Get all pages from the /Backup folder
let pages = dv.pages();

// Initialize counters
let imageCount = 0;
let internalLinkCount = 0;
let externalLinkCount = 0;
let articleCount = 0;
let wordCount = 0;
let charCount = 0;

// Create summary object for display
let summary = {
    totalArticles: 0,
    totalWords: 0,
    totalChars: 0,
    totalImages: 0,
    totalInternalLinks: 0,
    totalExternalLinks: 0
};

// Process each page
for (let page of pages) {
    let content = await dv.io.load(page.file.path);
    
    // Count images: Markdown ![]() and HTML <img>
    let imageRegex = /!\[.*?\]\([^)]+\)/g;
    let imageMatches = content.match(imageRegex);
    if (imageMatches) imageCount += imageMatches.length;
    
    // Count external links: HTTP/HTTPS
    let externalRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
    let externalMatches = content.match(externalRegex);
    if (externalMatches) externalLinkCount += externalMatches.length;
    
    // Count internal links: [[...]]
    let internalRegex = /\[\[([^\]\|]+)(\|([^\]]+))?\]\]/g;
    let internalMatches = content.match(internalRegex);
    if (internalMatches) internalLinkCount += internalMatches.length;
    
    // Count articles
    articleCount += 1;
    
    // Clean text for word/character counting
    let cleanText = content
        .replace(/<!--[\s\S]*?-->/g, '')           // Remove HTML comments
        .replace(/```[\s\S]*?```/g, '')           // Remove code blocks
        .replace(/^\s*>\s*/gm, '')                // Remove blockquote markers
        .replace(/\s+/g, ' ');                    // Normalize whitespace
    
    // Count words (supports English and Chinese characters)
    let words = cleanText.match(/\b[a-zA-Z0-9\u4e00-\u9fff]+\b/g);
    wordCount += words ? words.length : 0;
    charCount += cleanText.length;
}

// Update summary
summary.totalArticles = articleCount;
summary.totalWords = wordCount;
summary.totalChars = charCount;
summary.totalImages = imageCount;
summary.totalInternalLinks = internalLinkCount;
summary.totalExternalLinks = externalLinkCount;

// Calculate reading time
const wordsPerMinute = 200;
const totalReadingHours = (summary.totalWords / wordsPerMinute / 60).toFixed(1); // Total reading time in hours
const avgReadingMinutesPerArticle = summary.totalArticles > 0 ? ((summary.totalWords / summary.totalArticles) / wordsPerMinute).toFixed(1) : 0; // Avg reading time per article in minutes

// Create styled HTML output
let htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 20px auto;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: var(--text-normal, #2c3e50); margin: 0; font-weight: 600; font-size: 28px;">
            📁 KAL Docs Content Analysis
        </h2>
        <p style="color: var(--text-muted, #7f8c8d); margin: 5px 0 0 0; font-size: 14px;">
            Generated on ${new Date().toLocaleDateString()}
        </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 20px;">
        <!-- Articles Card -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">📄</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Articles</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1;">${summary.totalArticles.toLocaleString()}</div>
        </div>

        <!-- Words Card -->
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(245, 87, 108, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">📝</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Words</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1;">${summary.totalWords.toLocaleString()}</div>
        </div>

        <!-- Characters Card -->
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(79, 172, 254, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">🔤</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Characters</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1;">${summary.totalChars.toLocaleString()}</div>
        </div>

        <!-- Images Card -->
        <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(250, 112, 154, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">🖼️</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Images</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1;">${summary.totalImages.toLocaleString()}</div>
        </div>

        <!-- Internal Links Card -->
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #2c3e50; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(168, 237, 234, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">🔗</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.5px; color: #2c3e50;">Internal Links</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1; color: #2c3e50;">${summary.totalInternalLinks.toLocaleString()}</div>
        </div>

        <!-- External Links Card -->
        <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); color: #2c3e50; padding: 24px; border-radius: 16px; box-shadow: 0 8px 32px rgba(255, 236, 210, 0.2);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 32px; margin-right: 16px;">🌐</div>
                <div>
                    <div style="font-size: 14px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.5px; color: #2c3e50;">External Links</div>
                </div>
            </div>
            <div style="font-size: 36px; font-weight: 700; line-height: 1; color: #2c3e50;">${summary.totalExternalLinks.toLocaleString()}</div>
        </div>
    </div>

    <!-- Summary Stats -->
    <div style="background: var(--background-primary, white); padding: 24px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-left: 5px solid #3498db;">
        <h3 style="margin: 0 0 16px 0; color: var(--text-normal, #2c3e50); font-size: 18px;">📊 Quick Summary</h3>
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: 600; color: #27ae60;">${totalReadingHours}</div>
                <div style="font-size: 12px; color: var(--text-muted, #7f8c8d); text-transform: uppercase; letter-spacing: 0.5px;">Est. Reading Time (hours)</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: 600; color: #e67e22;">${avgReadingMinutesPerArticle}</div>
                <div style="font-size: 12px; color: var(--text-muted, #7f8c8d); text-transform: uppercase; letter-spacing: 0.5px;">Avg Reading Time per Article (min)</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: 600; color: #e67e22;">${(summary.totalWords / summary.totalArticles || 0).toFixed(0).toLocaleString()}</div>
                <div style="font-size: 12px; color: var(--text-muted, #7f8c8d); text-transform: uppercase; letter-spacing: 0.5px;">Words per Article</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: 600; color: #9b59b6;">${((summary.totalInternalLinks + summary.totalExternalLinks) / summary.totalArticles || 0).toFixed(1)}</div>
                <div style="font-size: 12px; color: var(--text-muted, #7f8c8d); text-transform: uppercase; letter-spacing: 0.5px;">Avg Links per Article</div>
            </div>
        </div>
    </div>
</div>
`;

// Render HTML content using innerHTML
try {
    let container = document.createElement("div");
    container.innerHTML = htmlContent;
    container.className = "content-analysis";
    dv.container.appendChild(container);
} catch (e) {
    // Fallback to table if HTML rendering fails
    dv.paragraph("⚠️ HTML rendering failed. Displaying as table instead:");
    dv.table(
        ["Metric", "Value"],
        [
            ["📄 Articles", summary.totalArticles.toLocaleString()],
            ["📝 Words", summary.totalWords.toLocaleString()],
            ["🔤 Characters", summary.totalChars.toLocaleString()],
            ["🖼️ Images", summary.totalImages.toLocaleString()],
            ["🔗 Internal Links", summary.totalInternalLinks.toLocaleString()],
            ["🌐 External Links", summary.totalExternalLinks.toLocaleString()],
            ["📊 Est. Reading Time (hours)", totalReadingHours],
            ["📊 Avg Reading Time per Article (min)", avgReadingMinutesPerArticle],
            ["📊 Words per Article", (summary.totalWords / summary.totalArticles || 0).toFixed(0).toLocaleString()],
            ["📊 Avg Links per Article", ((summary.totalInternalLinks + summary.totalExternalLinks) / summary.totalArticles || 0).toFixed(1)]
        ]
    );
}
```

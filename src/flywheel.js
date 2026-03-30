// ─────────────────────────────────────────────────────────────────────────────
// ENGINE 4: BACKLINK FLYWHEEL CONTENT
// 1. Embed widget code (every embed = backlink)
// 2. Social Media Image Sizes cheat sheet (linkbait)
// 3. Image format guide (linkbait)
// ─────────────────────────────────────────────────────────────────────────────

export const EMBED_CODE = `<!-- Pixalyse Image Compressor Widget -->
<div id="pixalyse-widget"></div>
<script>
  (function() {
    var s = document.createElement('script');
    s.src = 'https://pixalyse.com/embed.js';
    s.setAttribute('data-tool', 'compress');
    s.setAttribute('data-width', '100%');
    document.getElementById('pixalyse-widget').appendChild(s);
  })();
</script>
<p style="font-size:11px;color:#999;text-align:center">
  Powered by <a href="https://pixalyse.com" target="_blank">Pixalyse</a> — Free Image Tools
</p>`;

export const SOCIAL_MEDIA_SIZES = {
  title: "Social Media Image Sizes 2026 — The Complete Cheat Sheet",
  seoTitle: "Social Media Image Sizes 2026 — Complete Cheat Sheet | Pixalyse",
  seoDesc: "Every social media image size for 2026. Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, Pinterest — all dimensions in one place. Updated for 2026.",
  seoKeywords: "social media image sizes 2026, instagram image size, facebook image dimensions, youtube thumbnail size, twitter image size, linkedin image dimensions, social media cheat sheet",
  intro: "Every platform has its own image dimensions — and they change. This is the definitive, up-to-date guide for 2026. Bookmark it. Share it. Your designer will thank you.",
  platforms: [
    {
      name: "Instagram",
      color: "#E1306C",
      icon: "📸",
      formats: [
        { label: "Feed — Square", size: "1080 × 1080", ratio: "1:1", note: "Recommended for most feed posts" },
        { label: "Feed — Portrait", size: "1080 × 1350", ratio: "4:5", note: "Maximum portrait fill in feed" },
        { label: "Feed — Landscape", size: "1080 × 566", ratio: "1.91:1", note: "Minimum 562px wide" },
        { label: "Stories & Reels", size: "1080 × 1920", ratio: "9:16", note: "Full vertical screen" },
        { label: "Profile Photo", size: "320 × 320", ratio: "1:1", note: "Displays as circle" },
        { label: "Carousel", size: "1080 × 1080", ratio: "1:1", note: "Up to 10 slides" },
      ]
    },
    {
      name: "Facebook",
      color: "#1877F2",
      icon: "👍",
      formats: [
        { label: "Feed Post", size: "1200 × 630", ratio: "1.91:1", note: "Optimal for link shares" },
        { label: "Cover Photo", size: "820 × 312", ratio: "2.63:1", note: "Mobile: 640 × 360" },
        { label: "Profile Photo", size: "400 × 400", ratio: "1:1", note: "Displays as circle" },
        { label: "Event Cover", size: "1920 × 1005", ratio: "1.91:1", note: "Recommended size" },
        { label: "Stories", size: "1080 × 1920", ratio: "9:16", note: "Full vertical screen" },
        { label: "Group Cover", size: "1640 × 856", ratio: "1.91:1", note: "Desktop display" },
      ]
    },
    {
      name: "Twitter / X",
      color: "#000000",
      icon: "𝕏",
      formats: [
        { label: "Single Image", size: "1200 × 675", ratio: "16:9", note: "Recommended ratio" },
        { label: "Profile Photo", size: "400 × 400", ratio: "1:1", note: "Displays as circle" },
        { label: "Header / Banner", size: "1500 × 500", ratio: "3:1", note: "Crops on mobile" },
        { label: "In-stream Image", size: "1600 × 900", ratio: "16:9", note: "Max quality" },
      ]
    },
    {
      name: "LinkedIn",
      color: "#0A66C2",
      icon: "💼",
      formats: [
        { label: "Profile Photo", size: "400 × 400", ratio: "1:1", note: "Minimum 200×200" },
        { label: "Personal Banner", size: "1584 × 396", ratio: "4:1", note: "Desktop display" },
        { label: "Post Image", size: "1200 × 627", ratio: "1.91:1", note: "In-feed display" },
        { label: "Company Logo", size: "300 × 300", ratio: "1:1", note: "Square only" },
        { label: "Company Banner", size: "1128 × 191", ratio: "5.9:1", note: "Company pages" },
        { label: "Article Cover", size: "1200 × 644", ratio: "1.91:1", note: "Blog/article posts" },
      ]
    },
    {
      name: "YouTube",
      color: "#FF0000",
      icon: "▶️",
      formats: [
        { label: "Thumbnail", size: "1280 × 720", ratio: "16:9", note: "Under 2MB, max impact" },
        { label: "Channel Art", size: "2560 × 1440", ratio: "16:9", note: "Desktop display size" },
        { label: "Profile Photo", size: "800 × 800", ratio: "1:1", note: "Displays as circle" },
        { label: "Community Post", size: "1920 × 1080", ratio: "16:9", note: "Full HD recommended" },
      ]
    },
    {
      name: "TikTok",
      color: "#69C9D0",
      icon: "🎵",
      formats: [
        { label: "Profile Photo", size: "200 × 200", ratio: "1:1", note: "Displays as circle" },
        { label: "In-Feed Video Cover", size: "1080 × 1920", ratio: "9:16", note: "Portrait format" },
        { label: "Photo Slideshow", size: "1080 × 1920", ratio: "9:16", note: "Vertical full-screen" },
        { label: "Square Slideshow", size: "1080 × 1080", ratio: "1:1", note: "Square crop" },
      ]
    },
    {
      name: "Pinterest",
      color: "#E60023",
      icon: "📌",
      formats: [
        { label: "Standard Pin", size: "1000 × 1500", ratio: "2:3", note: "Optimal vertical pin" },
        { label: "Square Pin", size: "1000 × 1000", ratio: "1:1", note: "Square format" },
        { label: "Infographic", size: "1000 × 2100", ratio: "1:2.1", note: "Max tall pin size" },
        { label: "Profile Photo", size: "165 × 165", ratio: "1:1", note: "Small display size" },
      ]
    },
    {
      name: "WhatsApp",
      color: "#25D366",
      icon: "💬",
      formats: [
        { label: "Profile Photo", size: "500 × 500", ratio: "1:1", note: "Minimum 192×192" },
        { label: "Shared Photo (optimal)", size: "1600 × 900", ratio: "16:9", note: "Max before compression" },
        { label: "Status", size: "1080 × 1920", ratio: "9:16", note: "Full vertical screen" },
        { label: "Link Preview", size: "1200 × 630", ratio: "1.91:1", note: "OG image used" },
      ]
    },
    {
      name: "Email",
      color: "#EA4335",
      icon: "📧",
      formats: [
        { label: "Header Banner", size: "600 × 200", ratio: "3:1", note: "Most email clients" },
        { label: "Body Image (max width)", size: "600 × variable", ratio: "Flexible", note: "600px max width" },
        { label: "Hero Image", size: "1200 × 600", ratio: "2:1", note: "Retina optimized" },
        { label: "Product Image", size: "165 × 165", ratio: "1:1", note: "Small display" },
      ]
    },
    {
      name: "Google Ads",
      color: "#4285F4",
      icon: "🔍",
      formats: [
        { label: "Responsive Display (landscape)", size: "1200 × 628", ratio: "1.91:1", note: "Most common" },
        { label: "Square", size: "1200 × 1200", ratio: "1:1", note: "Required for some placements" },
        { label: "Logo", size: "1200 × 1200", ratio: "1:1", note: "Square logo" },
        { label: "Landscape Logo", size: "1200 × 300", ratio: "4:1", note: "Rectangle logo" },
      ]
    },
  ]
};

export const IMAGE_FORMAT_GUIDE = {
  title: "JPG vs PNG vs WebP vs HEIC — Complete Image Format Guide 2026",
  seoTitle: "JPG vs PNG vs WebP vs HEIC — Image Format Guide 2026 | Pixalyse",
  seoDesc: "Which image format should you use? Complete comparison of JPG, PNG, WebP, HEIC, SVG, GIF, AVIF. When to use each format, file size comparison, browser support.",
  seoKeywords: "jpg vs png, webp vs jpg, heic format, image format comparison, when to use jpg png webp, best image format web, image format guide 2026",
  formats: [
    { name: "JPEG / JPG", ext: ".jpg", color: "#e74c3c", useFor: "Photographs, complex images, web photos", avoid: "Images needing transparency, graphics with text", compression: "Lossy", transparency: false, animation: false, size: "Small", quality: "Excellent for photos", browserSupport: "Universal" },
    { name: "PNG", ext: ".png", color: "#2980b9", useFor: "Logos, icons, screenshots, transparency needed", avoid: "Photographs (unnecessarily large)", compression: "Lossless", transparency: true, animation: false, size: "Large", quality: "Perfect (lossless)", browserSupport: "Universal" },
    { name: "WebP", ext: ".webp", color: "#27ae60", useFor: "All web images — replaces JPG and PNG", avoid: "Email attachments, old software compatibility", compression: "Both", transparency: true, animation: true, size: "Smallest (25-35% smaller than JPG)", quality: "Excellent", browserSupport: "Modern browsers (Chrome, Firefox, Safari, Edge)" },
    { name: "HEIC", ext: ".heic", color: "#3498db", useFor: "iPhone/iOS photos (default format)", avoid: "Sharing with Windows/Android users, web use", compression: "Lossy", transparency: false, animation: true, size: "Very Small (50% smaller than JPG)", quality: "Excellent", browserSupport: "Apple only (iOS, macOS)" },
    { name: "SVG", ext: ".svg", color: "#9b59b6", useFor: "Logos, icons, illustrations, any scalable graphic", avoid: "Photographs, email clients, social media uploads", compression: "N/A (vector)", transparency: true, animation: true, size: "Tiny (for simple graphics)", quality: "Perfect at any size", browserSupport: "Modern browsers (not email clients)" },
    { name: "GIF", ext: ".gif", color: "#e67e22", useFor: "Simple animation only", avoid: "Everything static — use PNG instead", compression: "Lossless (limited 256 colours)", transparency: true, animation: true, size: "Very Large for animation", quality: "Poor (256 colours only)", browserSupport: "Universal" },
    { name: "AVIF", ext: ".avif", color: "#16a085", useFor: "Next-gen web images (cutting edge)", avoid: "Anywhere needing broad compatibility", compression: "Lossy", transparency: true, animation: true, size: "Smallest (50% smaller than JPG)", quality: "Excellent", browserSupport: "Chrome, Firefox, Edge (not all Safari)" },
    { name: "TIFF", ext: ".tif", color: "#7f8c8d", useFor: "Print production, archival, professional scanning", avoid: "Web use, email, social media", compression: "Lossless", transparency: true, animation: false, size: "Massive", quality: "Perfect (professional print)", browserSupport: "Not supported in browsers" },
  ]
};

# ⚡ Pixalyse — Free Online Image Toolkit

20 free browser-based image tools. No login. No watermarks. Your files never leave your device.

## 🛠 Tools Included

**Optimize:** Compress Image, Bulk Compress  
**Edit:** Resize, Crop, Rotate & Flip, Add Watermark  
**Convert:** PNG↔JPG, WebP→JPG, HEIC→JPG, SVG→PNG, Image→PDF, PDF→Image, GIF→MP4, Screenshot→PDF  
**AI Tools:** Upscale Image, Blur Background, Remove Background  
**Developer:** Image to Base64  
**Special:** Passport Photo  

## 📖 Blog

20 SEO-optimised articles covering image compression, conversion, formats, and best practices — one per tool.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📦 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Vercel auto-detects Vite/React — click **Deploy**

Your site will be live at `your-project.vercel.app` in under 2 minutes.

## 💰 Monetisation

Ad slots are already built into every page. To activate:

1. Apply for [Google AdSense](https://adsense.google.com)
2. Replace the comment in `index.html` with your publisher code:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID" crossorigin="anonymous"></script>
   ```

## 🏗 Tech Stack

- **React 18** + **Vite 5**
- **Canvas API** — all image processing runs in the browser
- **jsPDF** (CDN) — for Image→PDF and Screenshot→PDF
- **Zero backend** — 100% static, free to host anywhere

## 📁 File Structure

```
src/
├── App.jsx               # Root router
├── main.jsx              # Entry point
├── tools.js              # 20 tool definitions
├── blogs.js              # 20 blog posts
├── processors.js         # Image processing logic (Canvas API)
├── components/
│   ├── Nav.jsx           # Sticky navigation
│   └── TIcon.jsx         # SVG icons for all tools
└── pages/
    ├── HomePage.jsx      # Tools grid + blog preview
    ├── ToolPage.jsx      # Individual tool interface
    ├── BlogListPage.jsx  # Blog listing with category filter
    └── BlogPostPage.jsx  # Full blog post with related articles
```

## 📄 License

MIT — free to use, modify, and deploy commercially.

// ─── SEO DATA FOR EVERY PAGE ─────────────────────────────────
// Titles target exact-match keywords. Descriptions are 150-160 chars.
// FAQs target featured snippets (People Also Ask boxes).

export const SITE = {
  name: "Pixalyse",
  tagline: "Every image tool you'll ever need. Free forever.",
  url: "https://pixalyse.com",
  description: "20 free online image tools — compress, resize, crop, convert, watermark, upscale and more. No login. No watermarks. 100% browser-based. Your files never leave your device.",
  twitterHandle: "@pixalyse",
  ogImage: "https://pixalyse.com/og-image.png",
};

export const HOME_SEO = {
  title: "Pixalyse — Free Online Image Tools: Compress, Resize, Convert & More",
  description: "20 free online image tools. Compress image, resize, crop, convert PNG to JPG, remove background & more. No login, no watermarks, 100% free. Works in your browser.",
  keywords: "compress image online free, resize image online, png to jpg converter, image to pdf, remove background free, heic to jpg, webp to jpg, crop image online, watermark photo, upscale image ai, free image tools, online photo editor",
};

export const BLOG_SEO = {
  title: "Image Tools Blog — Free Guides on Compression, Conversion & Optimization | Pixalyse",
  description: "Expert guides on image compression, format conversion, SEO optimization, and photo editing. Practical tutorials for designers, developers, and content creators.",
  keywords: "image compression guide, png vs jpg, heic to jpg guide, webp format explained, how to compress images, image optimization seo",
};

export const TOOL_SEO = {
  "compress": {
    title: "Compress Image Online Free — Reduce File Size Without Losing Quality | Pixalyse",
    description: "Compress JPG, PNG, WebP images online for free. Reduce file size by up to 90% without visible quality loss. No signup, no watermark, instant results.",
    keywords: "compress image online free, reduce image file size, compress jpg online, compress png free, image compressor, shrink image size",
    h1: "Compress Image Online — Free & Instant",
    subheading: "Reduce image file size by up to 90% in seconds. No signup. No watermark. Works on any device.",
    faqs: [
      { q: "How do I compress an image without losing quality?", a: "Use Pixalyse's image compressor and set quality to 75–85%. At this level, compression is visually indistinguishable from the original. JPEGs and PNGs can typically be reduced by 60–90% with no perceptible quality difference." },
      { q: "What is the best image compression for websites?", a: "For web use, compress JPEGs to 75–80% quality and PNGs using lossless compression. Aim for images under 200 KB for product photos and under 100 KB for thumbnails. This keeps page load times under 2 seconds." },
      { q: "Does compressing an image reduce quality?", a: "Lossy compression (JPEG) does remove some data, but at 75–85% quality the difference is invisible to the human eye. Lossless compression (PNG) removes zero quality. Pixalyse uses smart compression to maximize size reduction while preserving visual quality." },
      { q: "How much can I compress an image?", a: "Typically 50–90% depending on the original. A 4 MB photograph can usually be compressed to 300–500 KB at 80% quality. PNG files with lots of flat colours often compress dramatically — 80% or more." },
      { q: "Is Pixalyse image compression free?", a: "Yes. Pixalyse is completely free to use with no file limits, no login required, and no watermarks on your output files." },
    ]
  },
  "bulk-compress": {
    title: "Bulk Compress Images Online Free — Compress 50 Images at Once | Pixalyse",
    description: "Compress multiple images in one click. Bulk compress JPG, PNG, WebP files online — up to 50 images simultaneously. Free, no login, instant download.",
    keywords: "bulk compress images online, compress multiple images free, batch image compressor, compress images in bulk, mass image compression",
    h1: "Bulk Image Compressor — Compress 50 Images at Once",
    subheading: "Select all your images at once and compress them in a single click. Perfect for e-commerce, blogs, and marketing teams.",
    faqs: [
      { q: "Can I compress multiple images at once?", a: "Yes. Pixalyse's Bulk Compress tool lets you upload and compress up to 50 images simultaneously. All files are processed in your browser — nothing is uploaded to a server." },
      { q: "How do I batch compress images for a website?", a: "Upload all your images to the Bulk Compress tool, set your preferred quality (80% is recommended for web), and click Process. All compressed files can be downloaded individually or in sequence." },
      { q: "What's the best quality setting for bulk compression?", a: "For photographs, 70–80% quality gives the best size-to-quality balance. For screenshots and graphics, use 85–90% to preserve text sharpness. For mixed batches, 80% is a safe universal setting." },
    ]
  },
  "resize": {
    title: "Resize Image Online Free — Change Image Dimensions in Pixels | Pixalyse",
    description: "Resize images online to any width and height in pixels. Perfect for Instagram, Facebook, Twitter, YouTube thumbnails. Free, no signup, instant download.",
    keywords: "resize image online free, change image size, resize photo online, image resizer, resize jpg png, resize image pixels, photo resizer free",
    h1: "Resize Image Online — Any Size, Instantly",
    subheading: "Set exact pixel dimensions for Instagram, YouTube, Twitter or any platform. Aspect ratio locked automatically.",
    faqs: [
      { q: "How do I resize an image without losing quality?", a: "Scale down rather than up — shrinking an image maintains quality while enlarging creates blurriness. Pixalyse uses high-quality bicubic interpolation to ensure the sharpest possible output when resizing." },
      { q: "What size should Instagram photos be?", a: "Instagram square posts: 1080×1080px. Portrait posts: 1080×1350px. Landscape posts: 1080×566px. Stories and Reels: 1080×1920px." },
      { q: "What size should YouTube thumbnails be?", a: "YouTube thumbnails should be 1280×720 pixels (16:9 aspect ratio). Keep file size under 2 MB. Use high contrast and large text for maximum click-through rate." },
      { q: "Can I resize an image to exact pixels for free?", a: "Yes. Pixalyse lets you enter an exact width and height in pixels. You can lock the aspect ratio (leave one dimension blank) or enter custom dimensions for any use case." },
    ]
  },
  "crop": {
    title: "Crop Image Online Free — Crop Photos to Any Size | Pixalyse",
    description: "Crop images online with custom dimensions. Remove unwanted areas, crop to square, portrait or any ratio. Free, no signup, browser-based instant results.",
    keywords: "crop image online free, crop photo online, image cropper, crop jpg png online, crop image to square, free photo cropper",
    h1: "Crop Image Online — Free & Precise",
    subheading: "Trim, cut, and crop your image to any dimensions. Perfect for social media, profile pictures, and product shots.",
    faqs: [
      { q: "How do I crop an image to a specific size?", a: "Enter the exact X, Y coordinates and width/height in pixels in Pixalyse's crop tool. This lets you crop with pixel-perfect precision to any required output size." },
      { q: "How do I crop a photo to a square?", a: "Set equal width and height values (e.g. 1080×1080 for Instagram). Centre the crop on your subject. Pixalyse's crop tool lets you specify exact dimensions for a perfect square output." },
      { q: "What is the best way to crop product images?", a: "For e-commerce, crop to a 1:1 square ratio with the product centred and some padding around it. A white or neutral background cropped cleanly around the product is the industry standard." },
    ]
  },
  "rotate": {
    title: "Rotate Image Online Free — Rotate & Flip Photos 90°, 180°, 270° | Pixalyse",
    description: "Rotate images 90, 180 or 270 degrees online. Flip images horizontally or vertically. Fix sideways photos instantly. Free, no login required.",
    keywords: "rotate image online free, rotate photo 90 degrees, flip image online, rotate jpg online, flip photo horizontally, rotate image free",
    h1: "Rotate & Flip Image Online — Instant & Free",
    subheading: "Fix sideways photos, rotate 90/180/270 degrees, flip horizontally or vertically. EXIF data corrected automatically.",
    faqs: [
      { q: "Why does my photo appear sideways when uploaded?", a: "This happens because of EXIF orientation metadata. Your phone stores the rotation as a tag rather than actually rotating the image pixels. Some software ignores this tag, showing the raw pixels. Rotating in Pixalyse physically rotates the pixel data and removes the EXIF dependency." },
      { q: "How do I rotate an image 90 degrees?", a: "Upload your image to Pixalyse's rotate tool, select 90° clockwise or counter-clockwise, and click Process. Your image will be physically rotated and saved correctly." },
      { q: "How do I flip an image horizontally?", a: "Upload your image, check the 'Flip H' option in the settings panel, and click Process. This creates a mirror image — useful for reversing the direction a subject is facing in a composition." },
    ]
  },
  "watermark": {
    title: "Add Watermark to Photo Online Free — Text Watermark | Pixalyse",
    description: "Add a text watermark to your photos online for free. Customise position, opacity, colour and size. Protect your images from theft instantly.",
    keywords: "add watermark to photo free, watermark image online, text watermark photo, watermark photos online free, protect photos watermark, add logo to photo",
    h1: "Add Watermark to Photo Online — Free",
    subheading: "Protect your photos with a custom text watermark. Control position, opacity, and colour. No software needed.",
    faqs: [
      { q: "How do I add a watermark to a photo for free?", a: "Upload your photo to Pixalyse's watermark tool, type your watermark text (your name or website URL), choose position and opacity, then click Process. Your watermarked image downloads instantly." },
      { q: "Where should I place a watermark on a photo?", a: "The lower-right corner is the most common and least intrusive placement — it's where the viewer's eye naturally exits the image. For maximum protection, use the centre (harder to crop out, but more intrusive)." },
      { q: "What opacity should a watermark be?", a: "30–50% opacity is the sweet spot for most photos. This makes the watermark clearly visible on inspection without dominating the image. Very light watermarks (under 20%) are too easy to miss; full opacity (100%) looks unprofessional." },
      { q: "Does adding a watermark protect my photos?", a: "Watermarks deter casual copying and ensure attribution when images are shared without permission. They don't prevent copying entirely, but every share carries your name or URL — creating passive brand awareness." },
    ]
  },
  "upscale": {
    title: "Upscale Image Online Free — AI Image Upscaler 2x 4x | Pixalyse",
    description: "Upscale images 2x or 4x without losing sharpness. AI-powered image upscaler for photos, logos, and artwork. Free, no signup, instant results.",
    keywords: "upscale image online free, ai image upscaler, increase image resolution, enlarge image without blur, image upscale 2x 4x, enhance photo resolution free",
    h1: "AI Image Upscaler — Free 2x & 4x Enhancement",
    subheading: "Make images larger and sharper with AI. Perfect for old photos, product images, and low-resolution artwork.",
    faqs: [
      { q: "Can I make a blurry image clear online?", a: "AI upscaling can significantly improve blurry images by intelligently reconstructing detail. It works best on images that are small or slightly soft — not motion-blurred or severely out of focus. A 2x upscale on a moderately sharp image typically produces excellent results." },
      { q: "What is the best free image upscaler?", a: "Pixalyse offers free 2x, 3x, and 4x AI upscaling directly in your browser — no account needed, no file upload to external servers, and no watermark on results." },
      { q: "Does upscaling reduce image quality?", a: "No — upscaling increases both the size and apparent sharpness of an image. The AI reconstructs likely detail at higher resolution. The quality of the result depends on the original: clear images upscale beautifully; heavily blurred images show limits." },
      { q: "What's the difference between 2x and 4x upscaling?", a: "2x doubles the image dimensions (e.g. 800×600 → 1600×1200). 4x quadruples them. 2x is safer and typically looks more natural. 4x is better for images that need to be displayed very large, but can look over-processed on complex scenes." },
    ]
  },
  "blur-bg": {
    title: "Blur Image Background Online Free — Portrait Blur Effect | Pixalyse",
    description: "Add a blurred background to any photo online for free. Create professional portrait depth-of-field effects without a DSLR camera. Instant, no signup.",
    keywords: "blur background online free, blur photo background, background blur effect, portrait mode online, blur image background free, depth of field effect",
    h1: "Blur Image Background Online — Free Portrait Effect",
    subheading: "Create the professional 'bokeh' blur effect on any photo. No DSLR needed — instant depth-of-field from your browser.",
    faqs: [
      { q: "How do I blur the background of a photo online?", a: "Upload your photo to Pixalyse's blur background tool, adjust the blur intensity slider, and click Process. The tool applies a graduated blur to the background areas while keeping the subject sharp." },
      { q: "What is the bokeh effect in photography?", a: "Bokeh (from Japanese 暈け, meaning blur) is the aesthetic quality of out-of-focus areas in a photo. It's created naturally by wide-aperture camera lenses (f/1.4–f/2.8) and digitally simulated by background blur tools." },
      { q: "How do I get a blurred background without a DSLR?", a: "Use Pixalyse's blur background tool to add a digital bokeh effect. For the best results, photograph your subject against a contrasting background with some distance between subject and wall — this gives the blur effect more natural-looking depth." },
    ]
  },
  "remove-bg": {
    title: "Remove Background from Image Free — AI Background Remover | Pixalyse",
    description: "Remove image backgrounds automatically with AI. Free background removal for photos, products, and portraits. No signup, instant transparent PNG download.",
    keywords: "remove background free, background remover, remove image background online, transparent background free, remove bg, background eraser free, cut out background",
    h1: "Remove Image Background — Free AI Tool",
    subheading: "Automatically remove backgrounds from photos in seconds. Get a clean transparent PNG — perfect for products, profiles, and presentations.",
    faqs: [
      { q: "How do I remove a background from an image for free?", a: "Upload your image to Pixalyse's background remover. Our AI detects and removes the background automatically, delivering a transparent PNG you can download instantly — no signup, no payment." },
      { q: "What image types work best for background removal?", a: "Product photos against plain or studio backgrounds work best. High-contrast subjects (dark product on white background) give the cleanest results. Complex scenes with hair, fur, or transparent objects are more challenging for AI." },
      { q: "Can I remove background from a product photo?", a: "Yes — product photos are the ideal use case. A clean white background is required by Amazon and most marketplaces. AI background removal delivers a white or transparent background that meets these requirements." },
    ]
  },
  "png-to-jpg": {
    title: "PNG to JPG Converter Online Free — Instant Conversion | Pixalyse",
    description: "Convert PNG to JPG online for free. Reduce file size dramatically while keeping full image quality. No signup, no watermark, instant JPG download.",
    keywords: "png to jpg converter free, convert png to jpeg online, png to jpg online, change png to jpg, png to jpeg converter, convert png free",
    h1: "PNG to JPG Converter — Free & Instant",
    subheading: "Convert any PNG to a smaller JPG in one click. Ideal for web images, email attachments, and social media.",
    faqs: [
      { q: "How do I convert PNG to JPG for free?", a: "Upload your PNG to Pixalyse's PNG to JPG converter and click Process. Your image converts instantly and downloads as a JPG — no signup, no watermark, completely free." },
      { q: "Does converting PNG to JPG lose quality?", a: "JPG compression reduces file size by discarding some image data. At 80–85% quality, the difference is invisible to the human eye. If your PNG has transparency, the background will be filled white in the JPG (JPG doesn't support transparency)." },
      { q: "Why is JPG smaller than PNG?", a: "JPG uses lossy compression that discards image data to reduce file size. PNG uses lossless compression that preserves every pixel. A JPG photo can be 60–90% smaller than the equivalent PNG at similar visual quality." },
      { q: "When should I use JPG instead of PNG?", a: "Use JPG for photographs, real-world images with gradients and many colours. Use PNG for logos, screenshots, graphics with text, or any image requiring transparency. PNG is lossless; JPG is smaller." },
    ]
  },
  "jpg-to-png": {
    title: "JPG to PNG Converter Online Free — Add Transparency | Pixalyse",
    description: "Convert JPG to PNG online for free. Get a lossless PNG for editing, transparency or design work. No signup, no watermark, instant conversion.",
    keywords: "jpg to png converter free, convert jpeg to png online, jpg to png online, change jpg to png, jpeg to png converter free",
    h1: "JPG to PNG Converter — Free & Lossless",
    subheading: "Convert JPEG to PNG for lossless editing, transparency, and design use. Perfect for logos and graphics.",
    faqs: [
      { q: "Why would I convert JPG to PNG?", a: "Converting JPG to PNG is useful when: (1) you need transparency support, (2) you plan to re-edit and re-save the image multiple times (PNG is lossless so no quality degrades), or (3) you need pixel-perfect edges for graphic design work." },
      { q: "Does converting JPG to PNG improve quality?", a: "No — it doesn't restore quality that JPG compression already removed. What it does is prevent further quality loss. All future edits and saves in PNG will be lossless." },
      { q: "Can I add a transparent background to a JPG?", a: "Converting JPG to PNG gives you a format that supports transparency, but the white background is still there. To make it transparent, you need background removal after converting to PNG." },
    ]
  },
  "webp-to-jpg": {
    title: "WebP to JPG Converter Online Free — Universal Compatibility | Pixalyse",
    description: "Convert WebP to JPG online for free. Make WebP images compatible with all devices, software and platforms. No signup, instant download.",
    keywords: "webp to jpg converter free, convert webp to jpeg online, webp to jpg online, change webp to jpg free, webp converter, save webp as jpg",
    h1: "WebP to JPG Converter — Free & Instant",
    subheading: "Convert WebP files to universally compatible JPG in one click. Works on Windows, Mac, Android — everywhere.",
    faqs: [
      { q: "Why can't I open a WebP file?", a: "WebP is Google's image format that many older apps and operating systems don't support natively. Windows Photo Viewer, older versions of Photoshop, and many email clients don't open WebP files. Converting to JPG makes the image work everywhere." },
      { q: "How do I convert WebP to JPG on Windows?", a: "Upload the WebP file to Pixalyse's WebP to JPG converter, click Process, and download the JPG. No software installation needed — works in any browser on Windows, Mac, or mobile." },
      { q: "Does WebP to JPG conversion lose quality?", a: "Converting WebP to JPG at 85%+ quality produces a visually identical result. You lose WebP's file size efficiency, but gain universal compatibility. If the WebP has transparency, the background will be filled white in the JPG." },
    ]
  },
  "heic-to-jpg": {
    title: "HEIC to JPG Converter Online Free — iPhone Photo Converter | Pixalyse",
    description: "Convert iPhone HEIC photos to JPG online for free. Open HEIC files on Windows, Android and any device. No software needed, instant conversion.",
    keywords: "heic to jpg converter free, convert heic to jpeg online, heic to jpg online, iphone photo converter, open heic on windows, heic converter free",
    h1: "HEIC to JPG Converter — Free iPhone Photo Converter",
    subheading: "Convert iPhone HEIC photos to JPG that opens everywhere. Works on Windows, Android, and all software instantly.",
    faqs: [
      { q: "How do I convert HEIC to JPG on Windows?", a: "Upload your HEIC file to Pixalyse's HEIC to JPG converter and click Process. Your iPhone photo converts to a universally compatible JPG instantly — no software installation, no codec download needed." },
      { q: "Why does my iPhone save photos as HEIC?", a: "Apple switched to HEIC format in iOS 11 because HEIC files are 40–50% smaller than JPG at the same quality, saving storage space on your device. The downside is limited compatibility outside Apple's ecosystem." },
      { q: "How do I change my iPhone to save photos as JPG?", a: "Go to Settings → Camera → Formats → Most Compatible. Your iPhone will now save photos as JPG instead of HEIC. Note: this uses about twice as much storage per photo." },
      { q: "Can I convert HEIC to JPG on Android?", a: "Yes — Pixalyse's converter works in any web browser, including Chrome on Android. Upload the HEIC file, convert it, and download the JPG directly to your Android device." },
    ]
  },
  "svg-to-png": {
    title: "SVG to PNG Converter Online Free — Vector to Raster | Pixalyse",
    description: "Convert SVG vector files to PNG images online for free. Export at any scale — 1x, 2x, 4x for Retina displays. No signup, instant transparent PNG.",
    keywords: "svg to png converter free, convert svg to png online, svg to png free, vector to raster, export svg as png, svg converter free",
    h1: "SVG to PNG Converter — Free & High Resolution",
    subheading: "Convert SVG logos and icons to crisp PNG at any size. Perfect for platforms that don't accept SVG files.",
    faqs: [
      { q: "How do I convert SVG to PNG?", a: "Upload your SVG file to Pixalyse's SVG to PNG converter, select your output scale (2x or 4x for Retina/high-DPI screens), and click Process. Your SVG renders to a crisp, transparent PNG instantly." },
      { q: "Why won't my SVG upload to Facebook or Instagram?", a: "Social media platforms don't support SVG uploads — they only accept raster formats like PNG and JPG. Convert your SVG to PNG first using Pixalyse, then upload the PNG to any platform." },
      { q: "What scale should I use when converting SVG to PNG?", a: "Export at 2x or 3x the size you'll display it. For a logo displayed at 200×100px, export at 400×200px (2x). This ensures sharpness on Retina/HiDPI displays and gives you a high-quality asset for both web and print." },
    ]
  },
  "image-to-pdf": {
    title: "Image to PDF Converter Online Free — JPG PNG to PDF | Pixalyse",
    description: "Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into one PDF. No signup, instant download, completely free.",
    keywords: "image to pdf converter free, jpg to pdf online free, png to pdf converter, convert images to pdf, photos to pdf free, multiple images to pdf",
    h1: "Image to PDF Converter — Free & Instant",
    subheading: "Convert single or multiple images to a professional PDF in seconds. Perfect for documents, portfolios, and sharing.",
    faqs: [
      { q: "How do I convert images to PDF for free?", a: "Upload your images (JPG, PNG, etc.) to Pixalyse's Image to PDF tool, arrange them in the order you want, and click Process. Your PDF downloads instantly with all images arranged as pages." },
      { q: "Can I combine multiple images into one PDF?", a: "Yes — Pixalyse's Image to PDF tool accepts multiple files at once. Upload all your images, and they'll be combined into a single PDF with each image as a separate page." },
      { q: "What image formats can be converted to PDF?", a: "Pixalyse supports JPG, PNG, WebP, and most common image formats for PDF conversion. All images are embedded at high quality in the output PDF." },
    ]
  },
  "pdf-to-image": {
    title: "PDF to JPG Converter Online Free — Extract PDF Pages as Images | Pixalyse",
    description: "Convert PDF pages to JPG or PNG images online for free. Extract any page from a PDF as a high-resolution image. No signup, instant download.",
    keywords: "pdf to jpg converter free, convert pdf to image online, pdf to png free, extract images from pdf, pdf page to jpg, pdf to jpeg converter free",
    h1: "PDF to JPG Converter — Extract PDF Pages Free",
    subheading: "Convert every PDF page to a sharp, high-resolution image. Perfect for sharing slides, extracting diagrams, and creating thumbnails.",
    faqs: [
      { q: "How do I convert a PDF to an image?", a: "Upload your PDF to Pixalyse's PDF to JPG converter and click Process. Each page of the PDF renders as a separate high-resolution JPG image, which you can download instantly." },
      { q: "How do I extract a single page from a PDF as an image?", a: "Upload the PDF, process it, and download only the specific page image you need. Each page is exported as an individual JPG file numbered sequentially." },
      { q: "What resolution are PDF-to-image conversions?", a: "Pixalyse renders PDF pages at 2x scale by default, producing sharp, print-quality images suitable for web use, presentations, and social media posting." },
    ]
  },
  "gif-to-mp4": {
    title: "GIF to MP4 Converter Online Free — Smaller File, Better Quality | Pixalyse",
    description: "Convert animated GIFs to MP4 video online for free. MP4 is 10x smaller than GIF with better quality. Coming soon — join the waitlist.",
    keywords: "gif to mp4 converter free, convert gif to video online, animated gif to mp4, gif to mp4 free, reduce gif size, gif converter",
    h1: "GIF to MP4 Converter — Coming Soon",
    subheading: "Convert your animated GIFs to high-quality MP4 video. Up to 15x smaller file size, better playback quality.",
    faqs: [
      { q: "Why should I convert GIF to MP4?", a: "MP4 video files are typically 10–25x smaller than equivalent GIFs with better colour reproduction and smoother playback. Using MP4 instead of GIF dramatically improves website loading speed." },
      { q: "How do I use MP4 instead of GIF on a website?", a: "Use the HTML <video> element with autoplay, loop, and muted attributes. This makes the video behave identically to a GIF — looping silently — but at a fraction of the file size." },
    ]
  },
  "base64": {
    title: "Image to Base64 Encoder Online Free — Data URI Converter | Pixalyse",
    description: "Convert images to Base64 string online for free. Get the complete data URI for embedding images in HTML, CSS, or API calls. No signup needed.",
    keywords: "image to base64 converter free, encode image base64 online, base64 image encoder, image to data uri, base64 encode photo free, convert image to base64 string",
    h1: "Image to Base64 Encoder — Free Online Tool",
    subheading: "Convert any image to a Base64 data URI string. Copy and paste directly into HTML, CSS, or API requests.",
    faqs: [
      { q: "How do I encode an image to Base64?", a: "Upload your image to Pixalyse's Base64 encoder and click Process. The complete Base64 data URI string (including the data:image/jpeg;base64, prefix) is generated instantly and ready to copy." },
      { q: "What is a Base64 image used for?", a: "Base64 images are used to embed images directly into HTML or CSS without a separate file request. They're also used in API calls that accept image data as JSON strings, email templates, and SVG files." },
      { q: "Should I use Base64 images on my website?", a: "Only for small images under 5–10 KB, such as icons and tiny decorative elements. For these, Base64 eliminates one network request. For larger images, Base64 increases file size by 33% and prevents browser caching — making pages slower." },
    ]
  },
  "passport": {
    title: "Free Passport Photo Online — US, UK, EU, India Standards | Pixalyse",
    description: "Create compliant passport photos online for free. Supports US (2×2\"), UK, EU, Indian, Australian and more standards. No booth, no cost.",
    keywords: "passport photo online free, make passport photo online, passport photo maker, passport size photo free, 2x2 passport photo online, uk passport photo free, indian passport photo",
    h1: "Free Passport Photo Maker — Any Country Standard",
    subheading: "Create government-compliant passport photos at home for free. US, UK, EU, India, Australia and more — print-ready output.",
    faqs: [
      { q: "How do I take a passport photo at home?", a: "Use a plain white or off-white wall, natural light from a window in front of you, and have someone photograph you at eye level. Wear everyday clothes, look directly at the camera with a neutral expression. Upload the photo to Pixalyse and select your country's standard." },
      { q: "What are the US passport photo requirements?", a: "US passport photos must be 2×2 inches (51×51mm), showing a full face view against a plain white or off-white background. Eyes must be open, face clearly visible, and no glasses. The head must be between 1–1⅜ inches from chin to top of head." },
      { q: "Are home-printed passport photos accepted?", a: "Yes, in most countries home-printed photos are accepted if printed on photo paper with a photo printer. The photo must not have borders, must be in colour, and must meet the required dimensions for your country." },
      { q: "What is the standard passport photo size?", a: "Different countries have different standards. US: 2×2 inches (51×51mm). UK: 35×45mm. EU/India/Australia: 35×45mm. China: 40×60mm. Pixalyse's passport photo tool handles all these standards automatically." },
    ]
  },
  "screenshot-to-pdf": {
    title: "Screenshot to PDF Online Free — Combine Screenshots into PDF | Pixalyse",
    description: "Convert screenshots to PDF online for free. Combine multiple screenshots into a single professional PDF report. No signup, instant download.",
    keywords: "screenshot to pdf free, convert screenshots to pdf online, combine screenshots pdf, screenshots to pdf converter, screenshots pdf report free",
    h1: "Screenshot to PDF — Free Online Converter",
    subheading: "Turn a folder of screenshots into a clean, professional PDF report in seconds. Perfect for bug reports, client updates, and documentation.",
    faqs: [
      { q: "How do I convert screenshots to a PDF?", a: "Upload your screenshots to Pixalyse's Screenshot to PDF tool, arrange them in the correct order, and click Process. All screenshots compile into a single PDF with each screenshot as a page." },
      { q: "How do I create a PDF report from screenshots?", a: "Name your screenshots with number prefixes (01_step.png, 02_step.png) to ensure correct ordering, then upload them all to Pixalyse's Screenshot to PDF tool. The resulting PDF is professional enough to send to clients or stakeholders." },
      { q: "What's the best way to document a process with screenshots?", a: "Take screenshots at each step, name them sequentially, compress them to reduce file size, then combine into a PDF. This creates a clear, paginated document that's far easier to share and review than individual image files." },
    ]
  },
};

// Long-tail keyword clusters for programmatic SEO pages (future use)
export const KEYWORD_CLUSTERS = {
  compress: [
    "compress image for email", "compress image for whatsapp", "compress image for instagram",
    "compress image for linkedin", "compress image under 1mb", "compress image under 200kb",
    "reduce image size for website", "compress image without losing quality",
  ],
  resize: [
    "resize image for instagram", "resize image for facebook cover", "resize image for youtube thumbnail",
    "resize image for linkedin banner", "resize photo to 4x6", "resize image to 1920x1080",
  ],
  heic: [
    "open heic on windows 10", "open heic on windows 11", "convert heic to jpg android",
    "heic to jpg mac", "heic to jpg without losing quality", "bulk convert heic to jpg",
  ],
};

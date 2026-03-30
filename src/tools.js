// 20 Image Processing Tools with metadata
export const tools = [
  // Optimize
  { id: 'compress', category: 'Optimize', name: 'Compress Image', icon: 'compress', description: 'Reduce file size without quality loss' },
  { id: 'bulk-compress', category: 'Optimize', name: 'Bulk Compress', icon: 'files', description: 'Compress multiple images at once' },
  
  // Edit
  { id: 'resize', category: 'Edit', name: 'Resize', icon: 'maximize2', description: 'Change image dimensions' },
  { id: 'crop', category: 'Edit', name: 'Crop', icon: 'crop', description: 'Crop to perfect size' },
  { id: 'rotate', category: 'Edit', name: 'Rotate & Flip', icon: 'rotate-cw', description: 'Rotate or flip your image' },
  { id: 'watermark', category: 'Edit', name: 'Add Watermark', icon: 'type', description: 'Add text watermark to image' },
  
  // Convert
  { id: 'png-jpg', category: 'Convert', name: 'PNG ↔ JPG', icon: 'layers', description: 'Convert between PNG and JPG' },
  { id: 'webp-jpg', category: 'Convert', name: 'WebP → JPG', icon: 'layers', description: 'Convert WebP to JPG' },
  { id: 'heic-jpg', category: 'Convert', name: 'HEIC → JPG', icon: 'layers', description: 'Convert HEIC to JPG' },
  { id: 'svg-png', category: 'Convert', name: 'SVG → PNG', icon: 'layers', description: 'Convert SVG to PNG' },
  { id: 'img-pdf', category: 'Convert', name: 'Image → PDF', icon: 'file-text', description: 'Convert image to PDF' },
  { id: 'pdf-img', category: 'Convert', name: 'PDF → Image', icon: 'file-text', description: 'Convert PDF to image' },
  { id: 'gif-mp4', category: 'Convert', name: 'GIF → MP4', icon: 'film', description: 'Convert GIF to MP4 video' },
  
  // AI Tools
  { id: 'upscale', category: 'AI Tools', name: 'Upscale Image', icon: 'zap', description: 'Enhance and enlarge images' },
  { id: 'blur-bg', category: 'AI Tools', name: 'Blur Background', icon: 'aperture', description: 'Blur background intelligently' },
  { id: 'remove-bg', category: 'AI Tools', name: 'Remove Background', icon: 'trash-2', description: 'Remove background automatically' },
  
  // Developer
  { id: 'base64', category: 'Developer', name: 'Image to Base64', icon: 'code', description: 'Convert image to Base64' },
  
  // Special
  { id: 'passport', category: 'Special', name: 'Passport Photo', icon: 'user', description: 'Create passport-sized photos' },
  { id: 'screenshot-pdf', category: 'Special', name: 'Screenshot → PDF', icon: 'camera', description: 'Convert screenshot to PDF' },
];

export const categories = ['All', 'Optimize', 'Edit', 'Convert', 'AI Tools', 'Developer', 'Special'];

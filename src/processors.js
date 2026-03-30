// Image processing functions using Canvas API and browser APIs
// All processing runs in the browser - zero server calls

export async function compressImage(file, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            resolve({ blob, size: blob.size, url: URL.createObjectURL(blob) });
          },
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function resizeImage(file, width, height) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob), width, height });
          },
          'image/png'
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function cropImage(file, x, y, width, height) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob) });
          },
          'image/png'
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function rotateImage(file, degrees) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const rad = (degrees * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const newWidth = Math.abs(img.width * cos) + Math.abs(img.height * sin);
        const newHeight = Math.abs(img.width * sin) + Math.abs(img.height * cos);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob) });
          },
          'image/png'
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function flipImage(file, axis = 'horizontal') {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (axis === 'horizontal') {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(0, canvas.height);
          ctx.scale(1, -1);
        }
        
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob) });
          },
          'image/png'
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function addWatermark(file, text, fontSize = 24, opacity = 0.5) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height - 30);
        
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob) });
          },
          'image/png'
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function convertFormat(file, targetFormat) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            resolve({ blob, url: URL.createObjectURL(blob), format: targetFormat });
          },
          mimeType,
          0.9
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function imageToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({ base64: e.target.result, size: file.size });
    };
    reader.readAsDataURL(file);
  });
}

// Placeholder for AI tools that would require backend APIs
export function upscaleImage() {
  throw new Error('Upscale requires backend API integration');
}

export function removeBackground() {
  throw new Error('Remove Background requires backend API integration (e.g., remove.bg)');
}

export function blurBackground() {
  throw new Error('Blur Background requires backend API integration');
}

// jsPDF is loaded from CDN in index.html
export async function imageToPDF(file) {
  if (!window.jspdf) throw new Error('jsPDF library not loaded');
  const base64 = await imageToBase64(file);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.addImage(base64.base64, 'JPEG', 10, 10, 190, 190);
  return pdf;
}

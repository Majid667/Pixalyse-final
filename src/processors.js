export async function processImg(id, file, opts = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");

        const done = (ext, q = 0.92) =>
          c.toBlob(
            (b) => { URL.revokeObjectURL(url); resolve({ blob: b, ext }); },
            ext === "png" ? "image/png" : "image/jpeg",
            q
          );

        if (id === "compress") {
          c.width = img.width; c.height = img.height;
          ctx.drawImage(img, 0, 0);
          done("jpg", (opts.quality || 70) / 100);

        } else if (id === "resize") {
          let w = parseInt(opts.w) || img.width;
          let h = parseInt(opts.h) || img.height;
          if (opts.w && !opts.h) h = Math.round(img.height * (w / img.width));
          if (opts.h && !opts.w) w = Math.round(img.width * (h / img.height));
          c.width = w; c.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          done("jpg");

        } else if (id === "rotate") {
          const deg = opts.deg || 90;
          const rad = (deg * Math.PI) / 180;
          const sw = deg === 90 || deg === 270;
          c.width = sw ? img.height : img.width;
          c.height = sw ? img.width : img.height;
          ctx.translate(c.width / 2, c.height / 2);
          ctx.rotate(rad);
          if (opts.fh) ctx.scale(-1, 1);
          if (opts.fv) ctx.scale(1, -1);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          done("jpg");

        } else if (id === "crop") {
          const cx = parseInt(opts.cx) || 0;
          const cy = parseInt(opts.cy) || 0;
          const cw = parseInt(opts.cw) || Math.floor(img.width * 0.7);
          const ch = parseInt(opts.ch) || Math.floor(img.height * 0.7);
          c.width = cw; c.height = ch;
          ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
          done("jpg");

        } else if (["png-to-jpg", "webp-to-jpg", "heic-to-jpg"].includes(id)) {
          c.width = img.width; c.height = img.height;
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0);
          done("jpg");

        } else if (id === "jpg-to-png" || id === "svg-to-png") {
          c.width = img.width; c.height = img.height;
          ctx.drawImage(img, 0, 0);
          done("png");

        } else if (id === "upscale") {
          const sc = opts.scale || 2;
          c.width = img.width * sc; c.height = img.height * sc;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, c.width, c.height);
          done("jpg", 0.95);

        } else if (id === "blur-bg") {
          c.width = img.width; c.height = img.height;
          ctx.filter = `blur(${opts.blur || 10}px)`;
          ctx.drawImage(img, 0, 0);
          ctx.filter = "none";
          const sw = img.width * 0.6, sh = img.height * 0.8;
          const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
          ctx.drawImage(img, sx, sy, sw, sh, sx, sy, sw, sh);
          done("jpg");

        } else if (id === "watermark") {
          c.width = img.width; c.height = img.height;
          ctx.drawImage(img, 0, 0);
          const fs = Math.max(20, Math.round(img.width * 0.06));
          ctx.font = `bold ${fs}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.globalAlpha = opts.opacity || 0.4;
          ctx.fillStyle = opts.color || "#fff";
          ctx.strokeStyle = "rgba(0,0,0,0.4)";
          ctx.lineWidth = 2;
          const pos = opts.pos || "center";
          const tx = pos === "topleft" ? img.width * 0.2 : pos === "bottomright" ? img.width * 0.8 : img.width / 2;
          const ty = pos === "topleft" ? img.height * 0.1 : pos === "bottomright" ? img.height * 0.9 : img.height / 2;
          ctx.strokeText(opts.text || "Pixalyse", tx, ty);
          ctx.fillText(opts.text || "Pixalyse", tx, ty);
          done("jpg");

        } else if (id === "passport") {
          const sizes = { "35x45": [413, 531], "2x2": [600, 600], "40x60": [472, 709] };
          const sz = sizes[opts.size || "35x45"] || [413, 531];
          c.width = sz[0]; c.height = sz[1];
          ctx.drawImage(img, 0, 0, sz[0], sz[1]);
          done("jpg");

        } else {
          c.width = img.width; c.height = img.height;
          ctx.drawImage(img, 0, 0);
          done("jpg", 0.9);
        }

      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };

    img.src = url;
  });
}

export const fmtBytes = (b) => {
  if (!b) return "0 B";
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
  return (b / 1048576).toFixed(2) + " MB";
};

export const outName = (n, e) => n.replace(/\.[^/.]+$/, "") + "_pixalyse." + e;

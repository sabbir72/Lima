import { recordAdminActivity } from './adminAuth';

export interface ImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB raw input limit before compression

/**
 * Reads an image file from phone gallery, camera, or desktop and compresses/resizes
 * it client-side into an optimized Data URL suitable for persistent storage.
 */
export async function processUploadedImage(
  file: File,
  options: ImageUploadOptions = {}
): Promise<string> {
  recordAdminActivity();

  if (!file.type.startsWith('image/')) {
    throw new Error('অনুগ্রহ করে একটি বৈধ ছবির ফাইল (JPG, PNG, WebP, GIF) নির্বাচন করুন।');
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('ছবির সাইজ অনেক বড় (সর্বোচ্চ ২০ MB পর্যন্ত সাপোর্ট করে)।');
  }

  // Keep SVG or animated GIF intact if reasonably small
  if ((file.type === 'image/svg+xml' || file.type === 'image/gif') && file.size <= 1.5 * 1024 * 1024) {
    return readFileAsDataUrl(file);
  }

  const maxWidth = options.maxWidth ?? 1280;
  const maxHeight = options.maxHeight ?? 1280;
  const quality = options.quality ?? 0.82;

  const rawDataUrl = await readFileAsDataUrl(file);

  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.max(1, Math.round(width * ratio));
          height = Math.max(1, Math.round(height * ratio));
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        // Preserve transparency for PNG/WebP, fill white background for JPEG
        const keepAlpha = file.type === 'image/png' || file.type === 'image/webp';
        if (!keepAlpha) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Prefer WebP for compact crisp output with alpha support, fallback to JPEG
        let output = canvas.toDataURL('image/webp', quality);
        if (!output.startsWith('data:image/webp')) {
          output = canvas.toDataURL(keepAlpha ? 'image/png' : 'image/jpeg', quality);
        }

        recordAdminActivity();
        resolve(output);
      } catch (err) {
        resolve(rawDataUrl);
      }
    };
    img.onerror = () => {
      reject(new Error('ছবিটি প্রসেস করা যায়নি। অন্য একটি ছবি চেষ্টা করুন।'));
    };
    img.src = rawDataUrl;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('ছবিটি পড়া যায়নি।'));
      }
    };
    reader.onerror = () => reject(new Error('ছবিটি আপলোড করতে সমস্যা হয়েছে।'));
    reader.readAsDataURL(file);
  });
}

/**
 * Safe URL transformer for ReactMarkdown so Base64 data:image/* and custom upload:* tokens work cleanly.
 */
export function resolveMarkdownImageUrl(
  url: string,
  inlineImages?: Record<string, string>
): string {
  if (!url) return '';
  if (url.startsWith('upload:') && inlineImages) {
    const key = url.slice('upload:'.length);
    return inlineImages[key] || '';
  }
  if (
    url.startsWith('data:image/') ||
    url.startsWith('blob:') ||
    url.startsWith('/') ||
    url.startsWith('./') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('#') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  ) {
    return url;
  }
  return '';
}

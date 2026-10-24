import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, Link as LinkIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { processUploadedImage } from '../utils/imageUpload';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  variant?: 'cover' | 'avatar';
  placeholder?: string;
  helperText?: string;
  allowClear?: boolean;
  presets?: { label: string; url: string }[];
}

export default function ImageUploadInput({
  label = 'Image',
  value,
  onChange,
  variant = 'cover',
  placeholder = 'https://... অথবা /images/...',
  helperText,
  allowClear = true,
  presets,
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDataUrl = Boolean(value && value.startsWith('data:image/'));

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setError(null);
    setIsUploading(true);
    try {
      const optimizedDataUrl = await processUploadedImage(file, {
        maxWidth: variant === 'avatar' ? 640 : 1280,
        maxHeight: variant === 'avatar' ? 640 : 1280,
        quality: variant === 'avatar' ? 0.86 : 0.82,
      });
      onChange(optimizedDataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ছবি আপলোড করতে সমস্যা হয়েছে।');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-2.5">
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>{label}</span>
          </label>

          <button
            type="button"
            onClick={() => setShowUrlInput((prev) => !prev)}
            className="text-[11px] font-mono text-[#9CA3AF] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded-lg bg-white/[0.03] border border-white/10"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Hide Link Box' : 'Use Image Link'}</span>
          </button>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{helperText}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {/* Upload & Preview Surface */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border transition-all p-3.5 ${
          isDragging
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
            : 'border-white/15 bg-white/[0.03]'
        }`}
      >
        <div className={`flex ${variant === 'avatar' ? 'items-center gap-4' : 'flex-col sm:flex-row sm:items-center gap-4'}`}>
          {/* Preview Thumbnail */}
          {value ? (
            <div
              className={`relative overflow-hidden border border-white/20 bg-black/50 shrink-0 ${
                variant === 'avatar'
                  ? 'w-20 h-20 rounded-2xl'
                  : 'w-full sm:w-36 h-32 sm:h-24 rounded-xl'
              }`}
            >
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                }}
              />
              {isDataUrl && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-emerald-300 text-[9px] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Uploaded
                </span>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center border border-dashed border-white/20 hover:border-[var(--color-accent)]/60 bg-black/25 text-[#9CA3AF] cursor-pointer transition-colors shrink-0 ${
                variant === 'avatar'
                  ? 'w-20 h-20 rounded-2xl'
                  : 'w-full sm:w-36 h-24 rounded-xl'
              }`}
            >
              <ImageIcon className="w-5 h-5 mb-1 text-[var(--color-accent)]/80" />
              <span className="text-[10px] font-mono">No Photo</span>
            </div>
          )}

          {/* Direct Action Controls (Mobile-friendly >= 44px touch targets) */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-black font-mono text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>{value ? 'Change Photo' : 'Upload Photo'}</span>
                  </>
                )}
              </button>

              {allowClear && value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <p className="text-[11px] font-mono text-[#9CA3AF]">
              ফোন গ্যালারি, ক্যামেরা অথবা কম্পিউটার থেকে সরাসরি ছবি সিলেক্ট করুন (JPG, PNG, WebP)
            </p>
          </div>
        </div>

        {/* Optional Image Link Input */}
        {showUrlInput && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <input
              type="text"
              value={isDataUrl ? '' : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={isDataUrl ? 'সরাসরি আপলোড করা ছবি যুক্ত আছে — নতুন লিংক দিতে চাইলে এখানে পেস্ট করুন' : placeholder}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs font-mono text-white placeholder:text-white/35 focus:border-[var(--color-accent)] focus:outline-none"
            />
          </div>
        )}

        {/* Optional Presets */}
        {presets && presets.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10">
            <p className="text-[10px] font-mono text-[#9CA3AF] mb-1.5">Quick Presets (Optional):</p>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => onChange(preset.url)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-colors cursor-pointer border ${
                    value === preset.url
                      ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)] font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-[#D1D5DB] border-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

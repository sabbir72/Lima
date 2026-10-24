/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Create / Edit Blog Post Modal
 * Description : Mobile-friendly blog composer with direct photo uploads (cover image,
 *               inline article photos, and author avatar), zero mandatory fields,
 *               and unified single system lock integration.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Save,
  Eye,
  Edit3,
  Image as ImageIcon,
  Tag as TagIcon,
  User,
  Calendar,
  FileText,
  Check,
  AlertCircle,
  Heading,
  Bold,
  Italic,
  List,
  Code,
  Quote,
  Table,
  Link as LinkIcon,
  Folder,
  Upload,
  Loader2,
  Trash2,
  Plus,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost, BLOG_CATEGORIES } from '../data/blogs';
import { upsertBlogPost, generateSlug, calculateReadingTime } from '../utils/blogStore';
import { isSystemActionLocked, LOCKS_UPDATED_EVENT } from '../utils/lockStore';
import { PERSONAL_INFO } from '../data';
import { usePortfolioProfile } from '../utils/usePortfolioProfile';
import { processUploadedImage, resolveMarkdownImageUrl } from '../utils/imageUpload';
import ImageUploadInput from './ImageUploadInput';
import AdminPasscodeModal from './AdminPasscodeModal';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: BlogPost | null;
  onSaved?: (post: BlogPost) => void;
}

// Optional preset cover images for quick selection
const PRESET_COVER_IMAGES = [
  { label: 'Interactive Classroom', url: '/images/showcase_interactive_classroom.jpg' },
  { label: 'Classroom Learning', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200' },
  { label: 'English Pedagogy', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Lesson Planning', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Educational Media', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200' },
];

export default function CreateBlogModal({
  isOpen,
  onClose,
  postToEdit,
  onSaved,
}: CreateBlogModalProps) {
  const profile = usePortfolioProfile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);

  const [isLocked, setIsLocked] = useState<boolean>(() => isSystemActionLocked());
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [inlineImages, setInlineImages] = useState<Record<string, string>>({});
  const [isUploadingInline, setIsUploadingInline] = useState(false);
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [featured, setFeatured] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Author details (all optional)
  const [authorName, setAuthorName] = useState(profile.name || PERSONAL_INFO.name);
  const [authorRole, setAuthorRole] = useState(profile.title || PERSONAL_INFO.title);
  const [authorAvatar, setAuthorAvatar] = useState(
    profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg'
  );
  const [authorBio, setAuthorBio] = useState(profile.objective || PERSONAL_INFO.objective);

  // UI state
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync unified system lock state
  useEffect(() => {
    const syncLock = () => setIsLocked(isSystemActionLocked());
    syncLock();
    window.addEventListener('admin_auth_changed', syncLock);
    window.addEventListener(LOCKS_UPDATED_EVENT, syncLock);
    return () => {
      window.removeEventListener('admin_auth_changed', syncLock);
      window.removeEventListener(LOCKS_UPDATED_EVENT, syncLock);
    };
  }, [isOpen]);

  // Initialize form fields when opening or changing postToEdit
  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab('write');

    if (postToEdit) {
      setTitle(postToEdit.title || '');
      setSlug(postToEdit.slug || '');
      setIsSlugManuallyEdited(Boolean(postToEdit.slug));
      setCategory(postToEdit.category ?? '');
      setDescription(postToEdit.description || '');
      setContent(postToEdit.content || '');
      setCoverImage(postToEdit.coverImage || '');
      setInlineImages(postToEdit.inlineImages || {});
      setStatus(postToEdit.status || 'Published');
      setFeatured(postToEdit.featured || false);
      setPublishDate(postToEdit.publishDate || '');
      setReadingTime(postToEdit.readingTime || '');
      setTagsInput(postToEdit.tags ? postToEdit.tags.join(', ') : '');
      setAuthorName(postToEdit.author?.name || profile.name || PERSONAL_INFO.name);
      setAuthorRole(postToEdit.author?.role ?? profile.title ?? PERSONAL_INFO.title);
      setAuthorAvatar(
        !postToEdit.author?.avatar || postToEdit.author.avatar.includes('sabbir_avatar')
          ? profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg'
          : postToEdit.author.avatar
      );
      setAuthorBio(postToEdit.author?.bio ?? profile.objective ?? PERSONAL_INFO.objective);
    } else {
      const todayFormatted = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      setTitle('');
      setSlug('');
      setIsSlugManuallyEdited(false);
      setCategory('');
      setDescription('');
      setContent('');
      setCoverImage('');
      setInlineImages({});
      setStatus('Published');
      setFeatured(false);
      setPublishDate(todayFormatted);
      setReadingTime('');
      setTagsInput('');
      setAuthorName(profile.name || PERSONAL_INFO.name);
      setAuthorRole(profile.title || PERSONAL_INFO.title);
      setAuthorAvatar(profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg');
      setAuthorBio(profile.objective || PERSONAL_INFO.objective);
    }
  }, [isOpen, postToEdit, profile]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));
    }
  };

  useEffect(() => {
    setReadingTime(content.trim() ? calculateReadingTime(content) : '');
  }, [content]);

  // Insert text or image markdown at current cursor position in textarea
  const insertAtCursor = (snippet: string) => {
    const el = textareaRef.current;
    if (el) {
      const start = el.selectionStart ?? content.length;
      const end = el.selectionEnd ?? content.length;
      const before = content.slice(0, start);
      const after = content.slice(end);
      const needsLeadingNewline = before.length > 0 && !before.endsWith('\n') ? '\n' : '';
      const needsTrailingNewline = after.length > 0 && !after.startsWith('\n') ? '\n' : '';
      const next = `${before}${needsLeadingNewline}${snippet}${needsTrailingNewline}${after}`;
      setContent(next);
      requestAnimationFrame(() => {
        el.focus();
        const cursorPos = start + needsLeadingNewline.length + snippet.length;
        el.setSelectionRange(cursorPos, cursorPos);
      });
    } else {
      setContent((prev) => (prev ? `${prev}\n${snippet}\n` : `${snippet}\n`));
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    insertAtCursor(`${prefix}${suffix}`);
  };

  // Direct inline image upload inside Article Content
  const handleInlinePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg('');
    setIsUploadingInline(true);

    try {
      const newImages: Record<string, string> = {};
      const markdownSnippets: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await processUploadedImage(file, {
          maxWidth: 1280,
          maxHeight: 1280,
          quality: 0.82,
        });
        const imgId = `img_${Date.now()}_${i}`;
        newImages[imgId] = dataUrl;
        const cleanLabel = file.name.replace(/\.[^/.]+$/, '') || 'Photo';
        markdownSnippets.push(`![${cleanLabel}](upload:${imgId})`);
      }

      setInlineImages((prev) => ({ ...prev, ...newImages }));
      insertAtCursor(markdownSnippets.join('\n\n'));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ছবি আপলোড করতে সমস্যা হয়েছে।');
    } finally {
      setIsUploadingInline(false);
      if (inlineImageInputRef.current) {
        inlineImageInputRef.current.value = '';
      }
    }
  };

  const handleRemoveInlineImage = (imgId: string) => {
    setInlineImages((prev) => {
      const next = { ...prev };
      delete next[imgId];
      return next;
    });
    // Also clean markdown reference to this image token
    const escaped = imgId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`!\\[[^\\]]*\\]\\(upload:${escaped}\\)\\n?`, 'g');
    setContent((prev) => prev.replace(regex, '').trim());
  };

  // Submit blog post — ZERO mandatory fields!
  const saveWithStatus = (targetStatus: 'Published' | 'Draft') => {
    setErrorMsg('');
    setSuccessMsg('');

    if (isSystemActionLocked()) {
      setIsLocked(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const saved = upsertBlogPost({
        id: postToEdit ? postToEdit.id : undefined,
        title: title.trim(),
        slug: slug.trim() ? generateSlug(slug) : generateSlug(title),
        category: category.trim(),
        description: description.trim(),
        content: content.trim(),
        coverImage: coverImage.trim(),
        inlineImages: Object.keys(inlineImages).length > 0 ? inlineImages : undefined,
        status: targetStatus,
        featured,
        publishDate: publishDate.trim(),
        readingTime: readingTime.trim(),
        tags: parsedTags,
        author: {
          name: authorName.trim() || profile.name || PERSONAL_INFO.name,
          role: authorRole.trim(),
          avatar: authorAvatar.trim() || profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg',
          bio: authorBio.trim(),
        },
      });

      setStatus(targetStatus);
      setSuccessMsg(
        targetStatus === 'Draft'
          ? 'ড্রাফট হিসেবে ব্লগটি সেভ হয়েছে!'
          : 'ব্লগ পোস্টটি সফলভাবে পাবলিশ/আপডেট হয়েছে!'
      );
      setIsSubmitting(false);

      if (onSaved) {
        onSaved(saved);
      }

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'ব্লগ সেভ করতে সমস্যা হয়েছে।');
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveWithStatus(status);
  };

  if (!isOpen) return null;

  // Unified Single System Lock Challenge (Mobile keyboard-friendly modal)
  if (isLocked) {
    return (
      <AdminPasscodeModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => setIsLocked(false)}
        title="System Lock — Blog Editor"
        description="ব্লগ পোস্ট তৈরি বা এডিট করতে সিস্টেম পাসকোড দিন।"
      />
    );
  }

  const validCategories = BLOG_CATEGORIES.filter((c: string) => c !== 'All');
  const inlineImageEntries = Object.entries(inlineImages);

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[94dvh] bg-[#12151C] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white my-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#181C26] shrink-0 gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-xl text-white truncate">
                  {postToEdit ? 'Edit Blog Post' : 'Create Blog Post'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  All Fields Optional
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#9CA3AF] truncate">
                সরাসরি ছবি আপলোড করুন — কোনো ঘর পূরণ করা বাধ্যতামূলক নয়
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-[#9CA3AF] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 shrink-0">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Row 1: Featured Cover Image Direct Upload */}
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/10">
            <ImageUploadInput
              label="Featured Cover Photo (Optional — Direct Upload)"
              value={coverImage}
              onChange={setCoverImage}
              presets={PRESET_COVER_IMAGES}
              allowClear
            />
          </div>

          {/* Row 2: Title & Slug (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 space-y-1.5">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  <span>Blog Title</span>
                </span>
                <span className="text-[10px] text-[#9CA3AF] font-normal">Optional</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="শিরোনাম লিখুন (অপশনাল)..."
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-sm text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  <span>URL Slug</span>
                </span>
                <span className="text-[10px] text-[#9CA3AF] font-normal">Auto / Optional</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugManuallyEdited(true);
                }}
                placeholder="auto-generated-link"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs font-mono text-amber-300 placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Markdown Content Editor + Direct Inline Photo Upload */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Article Content & Inline Photos</span>
                <span className="text-[10px] text-[#9CA3AF] font-normal">(Optional)</span>
              </label>

              {/* Editor View Toggle Tabs */}
              <div className="flex items-center space-x-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer ${
                    activeTab === 'write'
                      ? 'bg-[var(--color-accent)] text-black font-bold'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-[var(--color-accent)] text-black font-bold'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Hidden File Input for Inline Article Photos */}
            <input
              ref={inlineImageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleInlinePhotoUpload}
              className="hidden"
            />

            {/* Formatting Toolbar + Direct Photo Upload Button */}
            {activeTab === 'write' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#181C26] border border-white/10 text-xs text-[#D1D5DB]">
                <button
                  type="button"
                  disabled={isUploadingInline}
                  onClick={() => inlineImageInputRef.current?.click()}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/30 text-[var(--color-accent)] border border-[var(--color-accent)]/40 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all mr-1 disabled:opacity-60"
                  title="ব্লগের ভেতরে সরাসরি ছবি আপলোড করুন"
                >
                  {isUploadingInline ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo in Post</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting('## Section Heading')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Heading"
                >
                  <Heading className="w-4 h-4 text-[var(--color-accent)]" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('**Bold Text**')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white font-bold cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*Italic Text*')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white italic cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- List item')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> Quote message')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('```\nNotes or snippet\n```')}
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Code Block"
                >
                  <Code className="w-4 h-4 text-emerald-400" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertFormatting('| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |')
                  }
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer"
                  title="Table"
                >
                  <Table className="w-4 h-4" />
                </button>

                {readingTime && (
                  <span className="ml-auto text-[10px] font-mono text-[#9CA3AF] px-1">
                    {readingTime}
                  </span>
                )}
              </div>
            )}

            {/* Attached Inline Photos Thumbnail Strip */}
            {inlineImageEntries.length > 0 && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#D1D5DB]">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>Uploaded Post Photos ({inlineImageEntries.length})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => inlineImageInputRef.current?.click()}
                    className="text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add More</span>
                  </button>
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {inlineImageEntries.map(([imgId, dataUrl]) => (
                    <div
                      key={imgId}
                      className="relative group w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0"
                    >
                      <img src={dataUrl} alt="Inline upload" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => insertAtCursor(`![Photo](upload:${imgId})`)}
                          className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[10px] cursor-pointer"
                          title="Insert into text again"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveInlineImage(imgId)}
                          className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-[10px] cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Editor or Preview Area */}
            {activeTab === 'write' ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder="এখানে আপনার ব্লগ বা নোট লিখুন, অথবা উপরের 'Upload Photo in Post' বাটনে ট্যাপ করে সরাসরি ছবি যুক্ত করুন (অপশনাল)..."
                className="w-full p-4 rounded-xl bg-black/40 border border-white/15 text-base sm:text-sm font-mono text-[#E5E7EB] placeholder:text-white/25 focus:border-[var(--color-accent)] focus:outline-none leading-relaxed"
              />
            ) : (
              <div className="p-5 sm:p-6 rounded-xl bg-[#090A0E] border border-white/15 min-h-[260px] max-h-[480px] overflow-y-auto space-y-4">
                <div className="border-b border-white/10 pb-3 mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold uppercase">
                    Live Preview
                  </span>
                  {title && (
                    <h2 className="font-display font-extrabold text-xl text-white mt-2">{title}</h2>
                  )}
                </div>
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full max-h-64 object-cover rounded-2xl border border-white/10"
                  />
                )}
                <div className="prose prose-invert max-w-none text-sm text-[#D1D5DB] leading-relaxed">
                  {content ? (
                    <ReactMarkdown
                      urlTransform={(url) => resolveMarkdownImageUrl(url, inlineImages)}
                      components={{
                        img: ({ src, alt }) =>
                          src ? (
                            <img
                              src={src}
                              alt={alt || 'Uploaded photo'}
                              className="rounded-2xl border border-white/15 my-4 max-h-[380px] w-auto object-contain mx-auto"
                            />
                          ) : null,
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-[#9CA3AF] italic text-xs">No article text added.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Short Summary (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Short Summary / Excerpt</span>
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-normal">Optional</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="সংক্ষিপ্ত বিবরণ (অপশনাল)..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </div>

          {/* Row 5: Category, Status, Publish Date, Featured (All Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Category (Optional)</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#181C26] border border-white/15 text-base sm:text-xs text-white focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="">No Category (Optional)</option>
                {validCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Visibility</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Published' | 'Draft')}
                className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-base sm:text-xs font-bold focus:outline-none ${
                  status === 'Published'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                }`}
              >
                <option value="Published" className="bg-[#181C26] text-emerald-400">
                  Published (Public)
                </option>
                <option value="Draft" className="bg-[#181C26] text-amber-400">
                  Draft (Saved Privately)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Date (Optional)</span>
              </label>
              <input
                type="text"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                placeholder="October 24, 2026"
                className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-center">
              <label className="text-xs font-mono text-[#D1D5DB] font-semibold">
                Featured Banner
              </label>
              <label className="min-h-[44px] inline-flex items-center space-x-2.5 cursor-pointer text-xs font-mono text-[#D1D5DB]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--color-accent)] cursor-pointer"
                />
                <span>Highlight on Blog Top</span>
              </label>
            </div>
          </div>

          {/* Row 6: Tags Input (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Tags (comma separated)</span>
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-normal">Optional</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. English Pedagogy, Classroom Activity (Optional)"
              className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none"
            />
          </div>

          {/* Row 7: Author Details + Direct Author Avatar Upload (Optional) */}
          <div className="space-y-4 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
            <label className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Author Details & Photo</span>
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-normal">Optional</span>
            </label>

            <ImageUploadInput
              label="Author Avatar Photo (Optional — Direct Upload)"
              variant="avatar"
              value={authorAvatar}
              onChange={setAuthorAvatar}
              allowClear
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Author Name (Optional)"
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none"
              />
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Author Role (Optional)"
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/30 focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#181C26] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D1D5DB] font-mono text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={() => saveWithStatus('Draft')}
              disabled={isSubmitting}
              className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => saveWithStatus('Published')}
              disabled={isSubmitting}
              className="min-h-[44px] shimmer inline-flex items-center space-x-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-black font-mono text-xs font-bold px-5 sm:px-6 py-2.5 rounded-full shadow-lg shadow-[var(--color-accent)]/25 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : postToEdit ? 'Update Post' : 'Publish Blog'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

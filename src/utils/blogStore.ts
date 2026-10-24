/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Blog Store & Persistent LocalStorage Manager
 * Description : Handles persistent storage, CRUD operations, slug generation,
 *               optional fields, inline uploaded images, and reactive state events.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { isSystemActionLocked } from './lockStore';
import { PERSONAL_INFO } from '../data';
import { containsLegacyTestingContent } from './legacyContent';
import { getStoredProfile } from './portfolioStore';

const STORAGE_KEY = 'sabbir_portfolio_blogs_v1';
export const BLOGS_UPDATED_EVENT = 'sabbir_blogs_updated';

/**
 * Normalizes legacy author fields while preserving any custom uploaded author avatar
 */
function normalizeAuthorAvatar(post: BlogPost): BlogPost {
  const profile = getStoredProfile();
  const currentAvatar = (post.author?.avatar || '').trim();
  const authorName = (post.author?.name || '').trim();

  const isLegacyOwnerName =
    authorName === 'Sabbir Ahamed' ||
    authorName.toLowerCase().includes('sabbir');

  const isPortfolioAuthor =
    !authorName ||
    authorName === PERSONAL_INFO.name ||
    authorName === profile.name ||
    isLegacyOwnerName ||
    authorName.toLowerCase().includes('tansom') ||
    authorName.toLowerCase().includes('lima');

  const isLegacyBrokenAvatar =
    !currentAvatar ||
    currentAvatar.includes('sabbir_avatar') ||
    currentAvatar.includes('./assets');

  const resolvedProfileAvatar = profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg';
  const resolvedName = profile.name || PERSONAL_INFO.name;
  const resolvedRole = profile.title || PERSONAL_INFO.title;
  const resolvedBio = profile.objective || PERSONAL_INFO.objective;

  // Keep custom uploaded author photo (data:image/*) or custom non-default URL if user set one
  const hasCustomAuthorAvatar =
    !isLegacyBrokenAvatar &&
    currentAvatar !== '/images/lima.jpeg' &&
    currentAvatar !== PERSONAL_INFO.avatar;

  const finalAvatar = hasCustomAuthorAvatar ? currentAvatar : resolvedProfileAvatar;

  if (isPortfolioAuthor || isLegacyBrokenAvatar) {
    return {
      ...post,
      author: {
        ...post.author,
        name: isLegacyOwnerName || !authorName ? resolvedName : authorName,
        role: post.author?.role || resolvedRole,
        avatar: finalAvatar,
        bio: post.author?.bio || resolvedBio,
      },
    };
  }

  return post;
}

const CANDIDATE_BLOG_KEYS = [
  STORAGE_KEY,
  'sabbir_portfolio_blogs',
  'sabbir_blog_posts',
];

/**
 * Initialize and load blog posts from LocalStorage or default dataset non-destructively
 */
export function getStoredBlogPosts(): BlogPost[] {
  try {
    for (const key of CANDIDATE_BLOG_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: BlogPost[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const synchronizedPosts = parsed
            .filter(
              (post) =>
                !containsLegacyTestingContent(
                  [
                    post.author?.name,
                    post.title,
                    post.category,
                    post.description,
                    post.content,
                    ...(post.tags || []),
                    post.author?.role,
                    post.author?.bio,
                  ].join(' ')
                )
            )
            .map((post) =>
              normalizeAuthorAvatar({
                ...post,
                title: post.title ?? '',
                category: post.category ?? '',
                description: post.description ?? '',
                content: post.content ?? '',
                coverImage: post.coverImage ?? '',
                tags: Array.isArray(post.tags) ? post.tags : [],
                status: post.status || 'Published',
              })
            );

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(synchronizedPosts));
          } catch (err) {
            console.error('Error migrating blog posts in localStorage:', err);
          }

          if (synchronizedPosts.length > 0) return synchronizedPosts;
        }
      }
    }
  } catch (err) {
    console.error('Error reading blog posts from localStorage:', err);
  }

  // First time initialization fallback - load default posts with status 'Published'
  const initialPosts = BLOG_POSTS.map((post: BlogPost) =>
    normalizeAuthorAvatar({
      ...post,
      status: post.status || ('Published' as const),
    })
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    localStorage.setItem('sabbir_portfolio_blogs', JSON.stringify(initialPosts));
  } catch (err) {
    console.error('Error initializing blog posts in localStorage:', err);
  }
  return initialPosts;
}

/**
 * Save full blog posts array to LocalStorage and trigger event listener
 */
export function saveStoredBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event(BLOGS_UPDATED_EVENT));
  } catch (err) {
    console.error('Error saving blog posts to localStorage:', err);
  }
}

/**
 * Find single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getStoredBlogPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Helper to auto-generate a clean URL slug from title
 */
export function generateSlug(title: string): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Helper to calculate reading time from markdown content
 */
export function calculateReadingTime(content: string): string {
  if (!content || !content.trim()) return '';
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return '';
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Create or Update a Blog Post — Zero Mandatory Fields, Unified System Lock Protected
 */
export function upsertBlogPost(postData: Partial<BlogPost>): BlogPost {
  if (isSystemActionLocked()) {
    throw new Error('Unauthorized: System is locked. Please enter the Admin Passcode first.');
  }

  const posts = getStoredBlogPosts();
  const titleVal = (postData.title ?? '').trim();

  // Clean / generate slug even when title is blank
  let cleanSlug = postData.slug
    ? generateSlug(postData.slug)
    : titleVal
    ? generateSlug(titleVal)
    : '';

  if (!cleanSlug) {
    cleanSlug = `post-${Date.now()}`;
  }

  // Ensure unique slug if new post or changing slug
  let finalSlug = cleanSlug;
  let counter = 1;
  while (posts.some((p) => p.slug === finalSlug && p.id !== postData.id)) {
    finalSlug = `${cleanSlug}-${counter}`;
    counter++;
  }

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const profile = getStoredProfile();
  const defaultAvatar = profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg';

  if (postData.id) {
    // UPDATE existing post — respect empty strings/arrays when cleared by user
    const index = posts.findIndex((p) => p.id === postData.id);
    if (index !== -1) {
      const existing = posts[index];
      const nextContent = postData.content !== undefined ? postData.content : existing.content;
      const updatedPost: BlogPost = {
        ...existing,
        ...postData,
        id: existing.id,
        title: postData.title !== undefined ? postData.title : existing.title,
        slug: postData.slug || postData.title ? finalSlug : existing.slug || finalSlug,
        content: nextContent,
        category: postData.category !== undefined ? postData.category : existing.category,
        description: postData.description !== undefined ? postData.description : existing.description,
        coverImage: postData.coverImage !== undefined ? postData.coverImage : existing.coverImage,
        inlineImages: postData.inlineImages !== undefined ? postData.inlineImages : existing.inlineImages,
        publishDate: postData.publishDate !== undefined ? postData.publishDate : (existing.publishDate || formattedDate),
        readingTime:
          postData.readingTime !== undefined
            ? postData.readingTime
            : calculateReadingTime(nextContent),
        tags: postData.tags !== undefined ? postData.tags : (existing.tags || []),
        featured: postData.featured ?? existing.featured ?? false,
        status: postData.status || existing.status || 'Published',
        author: {
          name:
            postData.author?.name !== undefined
              ? postData.author.name || profile.name || PERSONAL_INFO.name
              : existing.author?.name || profile.name || PERSONAL_INFO.name,
          role:
            postData.author?.role !== undefined
              ? postData.author.role
              : existing.author?.role ?? profile.title ?? PERSONAL_INFO.title,
          avatar:
            postData.author?.avatar !== undefined
              ? postData.author.avatar || defaultAvatar
              : existing.author?.avatar || defaultAvatar,
          bio:
            postData.author?.bio !== undefined
              ? postData.author.bio
              : existing.author?.bio ?? profile.objective ?? PERSONAL_INFO.objective,
        },
      };

      posts[index] = updatedPost;
      saveStoredBlogPosts(posts);
      return updatedPost;
    }
  }

  // CREATE new post — all fields optional!
  const contentVal = postData.content ?? '';
  const newPost: BlogPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: titleVal,
    slug: finalSlug,
    category: postData.category ?? '',
    description: postData.description ?? '',
    content: contentVal,
    coverImage: postData.coverImage ?? '',
    inlineImages: postData.inlineImages,
    publishDate: postData.publishDate ?? formattedDate,
    readingTime: postData.readingTime ?? calculateReadingTime(contentVal),
    tags: Array.isArray(postData.tags) ? postData.tags : [],
    featured: postData.featured || false,
    status: postData.status || 'Published',
    author: {
      name: postData.author?.name || profile.name || PERSONAL_INFO.name,
      role: postData.author?.role ?? profile.title ?? PERSONAL_INFO.title,
      avatar: postData.author?.avatar || defaultAvatar,
      bio: postData.author?.bio ?? profile.objective ?? PERSONAL_INFO.objective,
    },
  };

  const updatedList = [newPost, ...posts];
  saveStoredBlogPosts(updatedList);
  return newPost;
}

/**
 * Delete a Blog Post by ID
 */
export function deleteBlogPost(id: string): boolean {
  if (isSystemActionLocked()) {
    console.warn('Unauthorized attempt to delete blog post.');
    return false;
  }

  const posts = getStoredBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length !== posts.length) {
    saveStoredBlogPosts(filtered);
    return true;
  }
  return false;
}

/**
 * Reset posts to default sample dataset
 */
export function resetStoredBlogPosts(): BlogPost[] {
  if (isSystemActionLocked()) {
    console.warn('Unauthorized attempt to reset blog posts.');
    return getStoredBlogPosts();
  }

  const defaults = BLOG_POSTS.map((post: BlogPost) => ({
    ...post,
    status: 'Published' as const,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  window.dispatchEvent(new Event(BLOGS_UPDATED_EVENT));
  return defaults;
}

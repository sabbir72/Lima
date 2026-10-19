/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Blog Store & Persistent LocalStorage Manager
 * Description : Handles persistent storage, CRUD operations, slug generation,
 *               and reactive state events for blog articles.
 * Author      : Sabbir Ahamed
 * Last Updated: 2026-08-04
 * -----------------------------------------
 */

import { BlogPost, BLOG_POSTS } from '../data/blogs';
import { isAdminAuthenticated } from './adminAuth';
import { PERSONAL_INFO } from '../data';
import { containsLegacyTestingContent } from './legacyContent';
import { getStoredProfile } from './portfolioStore';

const STORAGE_KEY = 'sabbir_portfolio_blogs_v1';
export const BLOGS_UPDATED_EVENT = 'sabbir_blogs_updated';

/**
 * Normalizes author avatar to always reflect the main profile avatar from PERSONAL_INFO
 */
function normalizeAuthorAvatar(post: BlogPost): BlogPost {
  const profile = getStoredProfile();
  const currentAvatar = post.author?.avatar || '';
  const authorName = (post.author?.name || '').trim();
  const isPortfolioAuthor = !authorName ||
    authorName === PERSONAL_INFO.name ||
    authorName === profile.name ||
    authorName === 'Sabbir Ahamed' ||
    authorName.toLowerCase().includes('tansom') ||
    authorName.toLowerCase().includes('lima') ||
    authorName.toLowerCase().includes('sabbir');
  const isInternalAvatar = currentAvatar.includes('sabbir_avatar') || currentAvatar.includes('./assets') || !currentAvatar;

  const resolvedAvatar = profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg';
  const resolvedName = profile.name || PERSONAL_INFO.name;
  const resolvedRole = profile.title || PERSONAL_INFO.title;
  const resolvedBio = profile.objective || PERSONAL_INFO.objective;

  if (isPortfolioAuthor || isInternalAvatar) {
    return {
      ...post,
      author: {
        ...post.author,
        name: isPortfolioAuthor ? resolvedName : post.author?.name || resolvedName,
        role: isPortfolioAuthor ? resolvedRole : post.author?.role || resolvedRole,
        avatar: resolvedAvatar,
        bio: isPortfolioAuthor ? resolvedBio : post.author?.bio || resolvedBio,
      },
    };
  }
  return post;
}

const CANDIDATE_BLOG_KEYS = [
  STORAGE_KEY,
  'sabbir_portfolio_blogs',
  'sabbir_blog_posts'
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
            .filter(post => !containsLegacyTestingContent([
              post.author?.name,
              post.title,
              post.category,
              post.description,
              post.content,
              ...(post.tags || []),
              post.author?.role,
              post.author?.bio,
            ].join(' ')))
            .map(post => normalizeAuthorAvatar({
            ...post,
            status: post.status || 'Published',
          }));

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
  const initialPosts = BLOG_POSTS.map((post: BlogPost) => normalizeAuthorAvatar({
    ...post,
    status: post.status || ('Published' as const),
  }));
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
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Create or Update a Blog Post (Restricted strictly to authenticated Admin)
 */
export function upsertBlogPost(postData: Partial<BlogPost> & { title: string; content: string }): BlogPost {
  if (!isAdminAuthenticated()) {
    throw new Error('Unauthorized: Admin authentication required to create or modify blog posts.');
  }

  const posts = getStoredBlogPosts();
  
  // Clean / generate slug
  let cleanSlug = postData.slug ? generateSlug(postData.slug) : generateSlug(postData.title);
  if (!cleanSlug) {
    cleanSlug = `blog-${Date.now()}`;
  }

  // Ensure unique slug if new post or changing slug
  let finalSlug = cleanSlug;
  let counter = 1;
  while (posts.some(p => p.slug === finalSlug && p.id !== postData.id)) {
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

  if (postData.id) {
    // UPDATE existing post
    const index = posts.findIndex(p => p.id === postData.id);
    if (index !== -1) {
      const existing = posts[index];
      const updatedPost: BlogPost = {
        ...existing,
        ...postData,
        id: existing.id,
        title: postData.title,
        slug: finalSlug,
        content: postData.content,
        category: postData.category || existing.category || 'English Pedagogy',
        description: postData.description || existing.description || '',
        coverImage: postData.coverImage || existing.coverImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
        publishDate: postData.publishDate || existing.publishDate || formattedDate,
        readingTime: postData.readingTime || calculateReadingTime(postData.content),
        tags: postData.tags || existing.tags || ['English Pedagogy'],
        featured: postData.featured ?? existing.featured ?? false,
        status: postData.status || existing.status || 'Published',
        author: {
          name: postData.author?.name || existing.author?.name || profile.name || PERSONAL_INFO.name,
          role: postData.author?.role || existing.author?.role || profile.title || PERSONAL_INFO.title,
          avatar: postData.author?.avatar || existing.author?.avatar || profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg',
          bio: postData.author?.bio || existing.author?.bio || profile.objective || PERSONAL_INFO.objective,
        },
      };

      posts[index] = updatedPost;
      saveStoredBlogPosts(posts);
      return updatedPost;
    }
  }

  // CREATE new post
  const newPost: BlogPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: postData.title,
    slug: finalSlug,
    category: postData.category || 'English Pedagogy',
    description: postData.description || '',
    content: postData.content,
    coverImage: postData.coverImage || '/images/showcase_interactive_classroom.jpg',
    publishDate: postData.publishDate || formattedDate,
    readingTime: postData.readingTime || calculateReadingTime(postData.content),
    tags: postData.tags && postData.tags.length > 0 ? postData.tags : ['English Pedagogy'],
    featured: postData.featured || false,
    status: postData.status || 'Published',
    author: {
      name: postData.author?.name || profile.name || PERSONAL_INFO.name,
      role: postData.author?.role || profile.title || PERSONAL_INFO.title,
      avatar: postData.author?.avatar || profile.avatar || PERSONAL_INFO.avatar || '/images/lima.jpeg',
      bio: postData.author?.bio || profile.objective || PERSONAL_INFO.objective,
    },
  };

  // Add to beginning of array
  const updatedList = [newPost, ...posts];
  saveStoredBlogPosts(updatedList);
  return newPost;
}

/**
 * Delete a Blog Post by ID (Restricted strictly to authenticated Admin)
 */
export function deleteBlogPost(id: string): boolean {
  if (!isAdminAuthenticated()) {
    console.warn('Unauthorized attempt to delete blog post.');
    return false;
  }

  const posts = getStoredBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length !== posts.length) {
    saveStoredBlogPosts(filtered);
    return true;
  }
  return false;
}

/**
 * Reset posts to default sample dataset (Restricted strictly to authenticated Admin)
 */
export function resetStoredBlogPosts(): BlogPost[] {
  if (!isAdminAuthenticated()) {
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

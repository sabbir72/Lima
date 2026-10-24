/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Blog List Main Page (Reader Index)
 * Description : Clean Blog Index view with direct New Post composer access,
 *               optional field resilience, category filters, and search.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  X,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
} from 'lucide-react';
import { BlogPost, BLOG_CATEGORIES } from '../data/blogs';
import { getStoredBlogPosts, BLOGS_UPDATED_EVENT } from '../utils/blogStore';
import { PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStore';
import { isSystemActionLocked, LOCKS_UPDATED_EVENT } from '../utils/lockStore';
import { PERSONAL_INFO } from '../data';
import { usePortfolioProfile } from '../utils/usePortfolioProfile';
import CreateBlogModal from './CreateBlogModal';
import AdminPasscodeModal from './AdminPasscodeModal';

const getPostPreviewImage = (post: BlogPost): string => {
  if (post.coverImage) return post.coverImage;
  if (post.inlineImages) {
    const firstInline = Object.values(post.inlineImages)[0];
    if (firstInline) return firstInline;
  }
  return '';
};

const getAuthorAvatar = (author?: { name?: string; avatar?: string }, fallbackAvatar?: string) => {
  const defaultAvatar = fallbackAvatar || PERSONAL_INFO.avatar || '/images/lima.jpeg';
  const raw = (author?.avatar || '').trim();
  if (!raw || raw.includes('sabbir_avatar') || raw.includes('./assets')) {
    return defaultAvatar;
  }
  if (raw !== '/images/lima.jpeg' && raw !== PERSONAL_INFO.avatar) {
    return raw;
  }
  return defaultAvatar;
};

interface BlogListProps {
  onSelectPost: (slug: string) => void;
}

export default function BlogList({ onSelectPost }: BlogListProps) {
  const profile = usePortfolioProfile();
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);

  useEffect(() => {
    const refreshPosts = () => {
      setPosts(getStoredBlogPosts());
    };

    window.addEventListener(BLOGS_UPDATED_EVENT, refreshPosts);
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, refreshPosts);
    window.addEventListener(LOCKS_UPDATED_EVENT, refreshPosts);
    return () => {
      window.removeEventListener(BLOGS_UPDATED_EVENT, refreshPosts);
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, refreshPosts);
      window.removeEventListener(LOCKS_UPDATED_EVENT, refreshPosts);
    };
  }, []);

  useEffect(() => {
    document.title = 'Teaching & Media Journal | Tansom Akther Lima';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleOpenNewPost = () => {
    if (!isSystemActionLocked()) {
      setIsCreateModalOpen(true);
    } else {
      setIsPasscodeModalOpen(true);
    }
  };

  const publishedPosts = useMemo(() => {
    return posts.filter((p) => p.status !== 'Draft');
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const list = publishedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || (post.category || '') === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        (post.title || '').toLowerCase().includes(query) ||
        (post.description || '').toLowerCase().includes(query) ||
        (post.content || '').toLowerCase().includes(query) ||
        (post.category || '').toLowerCase().includes(query) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query))) ||
        (post.author?.name && post.author.name.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    return list.sort((a, b) => {
      if (sortBy === 'newest') {
        return (new Date(b.publishDate || 0).getTime() || 0) - (new Date(a.publishDate || 0).getTime() || 0);
      } else if (sortBy === 'oldest') {
        return (new Date(a.publishDate || 0).getTime() || 0) - (new Date(b.publishDate || 0).getTime() || 0);
      } else if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });
  }, [publishedPosts, searchQuery, selectedCategory, sortBy]);

  const featuredArticle = useMemo(() => {
    return publishedPosts.find((p) => p.featured) || publishedPosts[0];
  }, [publishedPosts]);

  const displayGridPosts = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery && featuredArticle) {
      return filteredPosts.filter((p) => p.id !== featuredArticle.id);
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredArticle]);

  const totalPublishedCount = publishedPosts.length;
  const featuredPreviewImg = featuredArticle ? getPostPreviewImage(featuredArticle) : '';

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-dark-card,#141E2A)] text-[#F3F4F6] relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* ==================== HERO SECTION & TOP SUMMARY ==================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teaching & Media Journal</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              My <span className="text-[var(--color-accent)]">Blog</span>
            </h1>

            <p className="text-[#9CA3AF] text-xs sm:text-sm font-light leading-relaxed">
              Reflections on classroom practice, student motivation, lesson planning, digital teaching support, and creative media work in education.
            </p>
          </div>

          {/* Published Articles Metric & Direct New Post Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D1D5DB] shadow-sm">
              <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
              <span>
                <strong>{totalPublishedCount}</strong> Posts
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenNewPost}
              className="min-h-[44px] shimmer inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-black font-mono text-xs font-bold shadow-lg shadow-[var(--color-accent)]/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Blog / Photo Post</span>
            </button>
          </div>
        </div>

        {/* ==================== SEARCH & CATEGORY CONTROLS ==================== */}
        <div className="space-y-6 bg-[#12151C]/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, teaching topic, classroom practice, or tags..."
                className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-base sm:text-xs text-white placeholder:text-white/40 focus:border-[var(--color-accent)] focus:bg-white/[0.08] focus:outline-none transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                  title="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
              <div className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D1D5DB]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#181C26] text-white">
                    Newest First
                  </option>
                  <option value="oldest" className="bg-[#181C26] text-white">
                    Oldest First
                  </option>
                  <option value="title" className="bg-[#181C26] text-white">
                    Title (A-Z)
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs font-mono text-[#9CA3AF] uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[var(--color-accent)]" /> Category:
            </span>
            {BLOG_CATEGORIES.map((cat: string) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-black shadow-lg shadow-[var(--color-accent)]/25 font-bold scale-105'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-[#D1D5DB] border border-white/10 hover:border-white/25'
                  }`}
                >
                  {isActive && <CheckCircle2 className="w-3 h-3" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================== FEATURED ARTICLE BANNER ==================== */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div className="group relative bg-[#12151C] border border-white/15 rounded-3xl overflow-hidden shadow-2xl hover:border-[var(--color-accent)]/50 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {featuredPreviewImg && (
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden bg-black/40">
                  <img
                    src={featuredPreviewImg}
                    alt={featuredArticle.title || 'Featured Post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#12151C]" />

                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-accent)] text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured Entry</span>
                    </span>
                  </div>
                </div>
              )}

              <div
                className={`${
                  featuredPreviewImg ? 'lg:col-span-5' : 'lg:col-span-12'
                } p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#9CA3AF]">
                    {featuredArticle.category && (
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[var(--color-accent)] font-bold">
                        {featuredArticle.category}
                      </span>
                    )}
                    {featuredArticle.publishDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        {featuredArticle.publishDate}
                      </span>
                    )}
                    {featuredArticle.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        {featuredArticle.readingTime}
                      </span>
                    )}
                  </div>

                  {featuredArticle.title && (
                    <h2
                      onClick={() => onSelectPost(featuredArticle.slug)}
                      className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug cursor-pointer"
                    >
                      {featuredArticle.title}
                    </h2>
                  )}

                  {(featuredArticle.description || featuredArticle.content) && (
                    <p className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {featuredArticle.description ||
                        featuredArticle.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').slice(0, 180)}
                    </p>
                  )}

                  {featuredArticle.tags && featuredArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {featuredArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-[#D1D5DB] border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={getAuthorAvatar(featuredArticle.author, profile.avatar)}
                      alt={featuredArticle.author?.name || profile.name}
                      className="w-8 h-8 rounded-full border border-[var(--color-accent)] object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/lima.jpeg';
                      }}
                    />
                    <span className="text-xs font-mono text-white font-medium">
                      {featuredArticle.author?.name || profile.name}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPost(featuredArticle.slug)}
                    className="inline-flex items-center space-x-2 shimmer bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-black font-mono font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-[var(--color-accent)]/20 transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Read Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== BLOG POSTS CATALOG ==================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-display font-extrabold text-xl text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
              <span>
                {selectedCategory === 'All' ? 'Articles Catalog' : `${selectedCategory} Articles`}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-[var(--color-accent)] font-bold ml-2">
                {displayGridPosts.length}
              </span>
            </h3>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-mono text-[var(--color-accent)] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {displayGridPosts.length === 0 ? (
            <div className="text-center py-16 bg-[#12151C] rounded-3xl border border-white/10 p-8 space-y-4">
              <BookOpen className="w-12 h-12 text-[#9CA3AF] mx-auto stroke-1" />
              <h4 className="font-display font-bold text-lg text-white">No articles found</h4>
              <p className="text-xs font-mono text-[#9CA3AF] max-w-md mx-auto">
                No published entries matched your current filter.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                {(searchQuery || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayGridPosts.map((post) => {
                const previewImg = getPostPreviewImage(post);
                const cleanSnippet =
                  post.description ||
                  (post.content ? post.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim() : '');

                return (
                  <article
                    key={post.id}
                    className="group bg-[#12151C] border border-white/10 hover:border-[var(--color-accent)]/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10 cursor-pointer relative"
                    onClick={() => onSelectPost(post.slug)}
                  >
                    {previewImg && (
                      <div className="relative h-48 overflow-hidden bg-black/40">
                        <img
                          src={previewImg}
                          alt={post.title || 'Blog Post'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />

                        {post.category && (
                          <div className="absolute top-3 left-3 flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[var(--color-accent)] font-mono text-[10px] font-bold uppercase tracking-wider">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {!previewImg && post.category && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent)] font-mono text-[10px] font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        )}

                        {(post.publishDate || post.readingTime) && (
                          <div className="flex items-center space-x-3 text-[11px] font-mono text-[#9CA3AF]">
                            {post.publishDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-[var(--color-accent)]" />
                                {post.publishDate}
                              </span>
                            )}
                            {post.publishDate && post.readingTime && <span>•</span>}
                            {post.readingTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[var(--color-accent)]" />
                                {post.readingTime}
                              </span>
                            )}
                          </div>
                        )}

                        {post.title && (
                          <h4 className="font-display font-bold text-lg text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                        )}

                        {cleanSnippet && (
                          <p className="text-[#9CA3AF] text-xs font-light leading-relaxed line-clamp-3">
                            {cleanSnippet}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4 pt-3 border-t border-white/10">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#D1D5DB] border border-white/5"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--color-accent)]">
                          <span className="group-hover:underline flex items-center gap-1">
                            Open Post
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Direct Blog / Photo Post Composer */}
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaved={(saved) => {
          onSelectPost(saved.slug);
        }}
      />

      {/* Unified System Passcode Challenge */}
      <AdminPasscodeModal
        isOpen={isPasscodeModalOpen}
        onClose={() => setIsPasscodeModalOpen(false)}
        onSuccess={() => {
          setIsPasscodeModalOpen(false);
          setIsCreateModalOpen(true);
        }}
        title="System Lock — New Blog Post"
        description="নতুন ব্লগ বা ছবি পোস্ট করতে সিস্টেম পাসকোড দিন।"
      />
    </div>
  );
}

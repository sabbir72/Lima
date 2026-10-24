/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Blog Section Component (Home Page)
 * Description : Showcases featured blog posts on the main portfolio page with
 *               graceful support for optional fields and uploaded images.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { getStoredBlogPosts, BLOGS_UPDATED_EVENT } from '../utils/blogStore';
import { PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStore';
import { PERSONAL_INFO } from '../data';
import { usePortfolioProfile } from '../utils/usePortfolioProfile';

const getPostPreviewImage = (post?: BlogPost): string => {
  if (!post) return '';
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

interface BlogSectionProps {
  onSelectPost: (slug: string) => void;
  onViewAllBlog: () => void;
}

export default function BlogSection({ onSelectPost, onViewAllBlog }: BlogSectionProps) {
  const profile = usePortfolioProfile();
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(BLOGS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const publishedPosts = posts.filter((p) => p.status !== 'Draft');
  const featuredPost = publishedPosts.find((p) => p.featured) || publishedPosts[0];
  const secondaryPosts = publishedPosts.filter((p) => p.id !== featuredPost?.id).slice(0, 3);
  const featuredImg = getPostPreviewImage(featuredPost);

  return (
    <section
      id="blog"
      className="py-20 relative bg-[#0B0D12] border-t border-white/10 overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teaching & Media Highlights</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Featured <span className="text-[var(--color-accent)]">Blog & Reflections</span>
            </h2>
            <p className="text-[#9CA3AF] text-sm font-light leading-relaxed">
              Classroom insights, educational practices, student growth stories, media support, and creative learning experiences from Tansom Akther Lima.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="view-all-blogs-btn"
              onClick={onViewAllBlog}
              className="inline-flex items-center space-x-2 shimmer bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-black font-mono font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-[var(--color-accent)]/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Blog Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Post */}
          {featuredPost && (
            <div
              onClick={() => onSelectPost(featuredPost.slug)}
              className="lg:col-span-7 group cursor-pointer bg-[#12151C] border border-white/10 hover:border-[var(--color-accent)]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10 flex flex-col"
            >
              {featuredImg && (
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <img
                    src={featuredImg}
                    alt={featuredPost.title || 'Featured Post'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--color-accent)] text-black shadow-md">
                      Featured
                    </span>
                  </div>
                  {(featuredPost.publishDate || featuredPost.readingTime) && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
                      {featuredPost.publishDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                          {featuredPost.publishDate}
                        </span>
                      )}
                      {featuredPost.publishDate && featuredPost.readingTime && <span>•</span>}
                      {featuredPost.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                          {featuredPost.readingTime}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {featuredPost.category && (
                    <span className="text-xs font-mono text-[var(--color-accent)] font-bold uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                  )}
                  {featuredPost.title && (
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {featuredPost.title}
                    </h3>
                  )}
                  {(featuredPost.description || featuredPost.content) && (
                    <p className="text-[#9CA3AF] text-sm font-light leading-relaxed line-clamp-3">
                      {featuredPost.description ||
                        featuredPost.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').slice(0, 160)}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={getAuthorAvatar(featuredPost.author, profile.avatar)}
                      alt={featuredPost.author?.name || profile.name}
                      className="w-7 h-7 rounded-full border border-[var(--color-accent)] object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/lima.jpeg';
                      }}
                    />
                    <span className="text-xs font-mono text-[#D1D5DB]">
                      {featuredPost.author?.name || profile.name}
                    </span>
                  </div>
                  <div className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Posts List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {secondaryPosts.map((post) => {
              const thumb = getPostPreviewImage(post);
              const snippet =
                post.description ||
                (post.content ? post.content.replace(/!\[[^\]]*\]\([^)]+\)/g, '').trim() : '');

              return (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post.slug)}
                  className="group cursor-pointer bg-[#12151C] border border-white/10 hover:border-[var(--color-accent)]/40 rounded-2xl p-5 transition-all duration-200 hover:bg-[#181C26] flex items-start gap-4"
                >
                  {thumb && (
                    <img
                      src={thumb}
                      alt={post.title || 'Post'}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/10 group-hover:border-[var(--color-accent)]/30 transition-colors"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {(post.category || post.readingTime) && (
                      <div className="flex items-center space-x-2 text-[11px] font-mono text-[#9CA3AF]">
                        {post.category && (
                          <span className="text-[var(--color-accent)] font-bold">
                            {post.category}
                          </span>
                        )}
                        {post.category && post.readingTime && <span>•</span>}
                        {post.readingTime && <span>{post.readingTime}</span>}
                      </div>
                    )}
                    {post.title && (
                      <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                    )}
                    {snippet && (
                      <p className="text-[#9CA3AF] text-xs font-light line-clamp-2 leading-relaxed">
                        {snippet}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom Explore Card */}
            <div
              onClick={onViewAllBlog}
              className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent border border-[var(--color-accent)]/20 flex items-center justify-between group cursor-pointer hover:border-[var(--color-accent)]/50 transition-all"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
                  Want to explore more reflections?
                </span>
                <p className="text-xs text-[#9CA3AF] font-light">
                  Browse ideas across English pedagogy, classroom leadership, educational media, and student growth.
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[var(--color-accent)]/20">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

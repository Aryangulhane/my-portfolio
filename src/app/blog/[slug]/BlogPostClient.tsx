// src/components/BlogPostClient.tsx
"use client";

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { portableTextComponents } from '@/components/PortableTextComponents';
import { urlFor } from '@/lib/sanity';
import { 
  FaTwitter, FaLinkedin, FaFacebook, FaReddit, FaWhatsapp, 
  FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaPrint, 
  FaFont, FaEye, FaClock, FaComments, FaShareAlt, FaCopy,
  FaChevronUp, FaLightbulb, FaCheckCircle
} from 'react-icons/fa';
import { Post, RelatedPost } from '@/lib/sanity';

// --- TypeScript Interfaces ---
interface Heading {
  _key: string;
  style: 'h2' | 'h3';
  children: { text: string }[];
}

interface BlogPostClientProps {
  post: Post;
  relatedPosts: RelatedPost[];
  headings: Heading[];
}

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Client Component ---
export default function BlogPostClient({ post, relatedPosts, headings }: BlogPostClientProps) {
  const [fontSize, setFontSize] = useState(18);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const readingTime = Math.ceil(JSON.stringify(post.body).split(/\s+/).length / 200);

  // Parallax effect for header image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      if (articleRef.current) {
        const windowHeight = window.innerHeight;
        const documentHeight = articleRef.current.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setReadingProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ReadingProgressBar />
      
      {/* Floating Action Buttons */}
      <FloatingActionButtons 
        fontSize={fontSize}
        setFontSize={setFontSize}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        handlePrint={handlePrint}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Share Menu Modal */}
      {showShareMenu && (
        <ShareMenuModal 
          title={post.title}
          slug={post.slug.current}
          onClose={() => setShowShareMenu(false)}
          handleCopyLink={handleCopyLink}
          copied={copied}
        />
      )}

      <motion.article
        ref={articleRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 sm:py-24"
      >
        <PostHeader post={post} readingTime={readingTime} y={y} opacity={opacity} />

        {/* Article Stats Bar */}
        <motion.div 
          variants={itemVariants}
          className="mx-auto mb-8 max-w-4xl flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaEye className="text-primary" />
              <span className="text-sm">1.2K views</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <span className="text-sm">{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <FaComments className="text-primary" />
              <span className="text-sm">23 comments</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareMenu(true)}
              className="rounded-full bg-primary/10 p-2 transition-colors hover:bg-primary/20"
            >
              <FaShareAlt />
            </motion.button>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Table of Contents - Enhanced */}
          {headings.length > 0 && (
            <TableOfContents headings={headings} readingProgress={readingProgress} />
          )}
          
          {/* Main Content with Dynamic Font Size */}
          <div 
            className={`prose prose-lg max-w-none dark:prose-invert ${headings.length > 0 ? 'lg:col-span-8' : 'lg:col-span-10 lg:col-start-2'}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <PortableText value={post.body} components={portableTextComponents} />
            
            {/* Call to Action Box */}
            <motion.div
              variants={itemVariants}
              className="not-prose my-12 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-8"
            >
              <div className="flex items-start gap-4">
                <FaLightbulb className="mt-1 text-3xl text-primary" />
                <div>
                  <h3 className="mb-2 text-2xl font-bold">Key Takeaway</h3>
                  <p className="text-muted-foreground">
                    Found this article helpful? Subscribe to our newsletter for more insights and updates delivered directly to your inbox.
                  </p>
                  <button className="mt-4 rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground transition-transform hover:scale-105">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Social Share Sidebar */}
          <SocialShare 
            title={post.title} 
            slug={post.slug.current}
            isLiked={isLiked}
            handleLike={handleLike}
            likes={likes}
          />
        </div>

        {/* Author Bio Section */}
        <AuthorBio />

        {/* Comments Section Preview */}
        <CommentsSection />

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Related Posts - Enhanced */}
        {relatedPosts.length > 0 && <RelatedPostsSection posts={relatedPosts} />}

        {/* Tags Section */}
        <TagsSection tags={post.categories || []} />
      </motion.article>
    </>
  );
}

// --- Enhanced Helper Components ---

const PostHeader = ({ post, readingTime, y, opacity }: any) => (
  <header className="relative mx-auto mb-16 max-w-5xl">
    {post.mainImage && (
      <motion.div
        style={{ y, opacity }}
        className="relative mb-8 h-[400px] overflow-hidden rounded-3xl"
      >
        <Image
          src={urlFor(post.mainImage)?.url() || ''}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>
    )}
    
    <div className="text-center">
      <motion.div variants={itemVariants} className="mb-4 flex flex-wrap justify-center gap-2">
        {post.categories?.map((cat: string) => (
          <span key={cat} className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            {cat}
          </span>
        ))}
      </motion.div>
      
      <motion.h1 
        variants={itemVariants} 
        className="glow-text cyber-text mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
      >
        {post.title}
      </motion.h1>
      
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
        <span>•</span>
        <span className="flex items-center gap-1">
          <FaClock className="text-primary" />
          {readingTime} min read
        </span>
        <span>•</span>
        <span>Updated recently</span>
      </motion.div>
    </div>
  </header>
);

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').slice(0, 200);

const TableOfContents = ({ headings, readingProgress }: { headings: Heading[]; readingProgress: number }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0px -80% 0px' }
    );

    headings.forEach((h) => {
      const id = slugify(h.children[0]?.text || '');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="hidden lg:col-span-3 lg:block">
      <div className="sticky top-28">
        <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Table of Contents
            </h2>
            <span className="text-xs font-medium text-primary">{Math.round(readingProgress)}%</span>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-4 h-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${readingProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <ul className="space-y-2">
            {headings.map((heading) => {
              const id = slugify(heading.children[0]?.text || '');
              const isActive = activeId === id;
              return (
                <li key={heading._key}>
                  <a
                    href={`#${id}`}
                    className={`block rounded-lg border-l-2 py-2 pl-4 pr-2 text-sm transition-all ${
                      heading.style === 'h3' ? 'ml-4' : ''
                    } ${
                      isActive
                        ? 'border-primary bg-primary/10 font-medium text-primary'
                        : 'border-transparent text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    {heading.children[0]?.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

const SocialShare = ({ title, slug, isLiked, handleLike, likes }: any) => {
  const url = `https://yourdomain.com/blog/${slug}`;
  const shareLinks = [
    { Icon: FaTwitter, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`, color: 'hover:text-[#1DA1F2]' },
    { Icon: FaLinkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, color: 'hover:text-[#0A66C2]' },
    { Icon: FaFacebook, url: `https://www.facebook.com/sharer/sharer.php?u=${url}`, color: 'hover:text-[#1877F2]' },
    { Icon: FaReddit, url: `https://reddit.com/submit?url=${url}&title=${encodeURIComponent(title)}`, color: 'hover:text-[#FF4500]' },
    { Icon: FaWhatsapp, url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, color: 'hover:text-[#25D366]' },
  ];

  return (
    <div className="hidden lg:col-span-1 lg:block">
      <div className="sticky top-32">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Share</span>
          {shareLinks.map(({ Icon, url, color }, index) => (
            <motion.a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`text-muted-foreground transition-colors ${color}`}
            >
              <Icon size={22} />
            </motion.a>
          ))}
          
          <div className="my-2 h-px w-full bg-border" />
          
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex flex-col items-center gap-1"
          >
            {isLiked ? <FaHeart className="text-red-500" size={22} /> : <FaRegHeart className="text-muted-foreground" size={22} />}
            <span className="text-xs font-medium">{likes}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const FloatingActionButtons = ({ fontSize, setFontSize, isBookmarked, setIsBookmarked, handlePrint, showScrollTop, scrollToTop }: any) => (
  <>
    {/* Font Size Control */}
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-24 left-4 z-40 flex flex-col gap-2 rounded-2xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-sm"
    >
      <button
        onClick={() => setFontSize(Math.min(fontSize + 2, 24))}
        className="rounded-lg p-2 transition-colors hover:bg-primary/10"
        aria-label="Increase font size"
      >
        <FaFont className="text-lg" />
        <span className="text-xs">A+</span>
      </button>
      <button
        onClick={() => setFontSize(Math.max(fontSize - 2, 14))}
        className="rounded-lg p-2 transition-colors hover:bg-primary/10"
        aria-label="Decrease font size"
      >
        <FaFont className="text-sm" />
        <span className="text-xs">A-</span>
      </button>
    </motion.div>

    {/* Bookmark & Print */}
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-24 right-4 z-40 flex flex-col gap-2 rounded-2xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-sm"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsBookmarked(!isBookmarked)}
        className="rounded-lg p-2 transition-colors hover:bg-primary/10"
        aria-label="Bookmark"
      >
        {isBookmarked ? <FaBookmark className="text-primary" size={20} /> : <FaRegBookmark size={20} />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrint}
        className="rounded-lg p-2 transition-colors hover:bg-primary/10"
        aria-label="Print"
      >
        <FaPrint size={20} />
      </motion.button>
    </motion.div>

    {/* Scroll to Top */}
    {showScrollTop && (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 rounded-full bg-primary p-4 text-primary-foreground shadow-2xl transition-colors hover:bg-primary/90"
        aria-label="Scroll to top"
      >
        <FaChevronUp size={24} />
      </motion.button>
    )}
  </>
);

const ShareMenuModal = ({ title, slug, onClose, handleCopyLink, copied }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="mb-6 text-2xl font-bold">Share this article</h3>
      <div className="grid grid-cols-3 gap-4">
        <ShareButton icon={FaTwitter} label="Twitter" color="bg-[#1DA1F2]" />
        <ShareButton icon={FaLinkedin} label="LinkedIn" color="bg-[#0A66C2]" />
        <ShareButton icon={FaFacebook} label="Facebook" color="bg-[#1877F2]" />
        <ShareButton icon={FaReddit} label="Reddit" color="bg-[#FF4500]" />
        <ShareButton icon={FaWhatsapp} label="WhatsApp" color="bg-[#25D366]" />
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 transition-all hover:border-primary hover:bg-primary/5"
        >
          {copied ? <FaCheckCircle className="text-2xl text-green-500" /> : <FaCopy className="text-2xl" />}
          <span className="text-xs">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const ShareButton = ({ icon: Icon, label, color }: any) => (
  <button className={`flex flex-col items-center gap-2 rounded-2xl ${color} p-4 text-white transition-transform hover:scale-105`}>
    <Icon className="text-2xl" />
    <span className="text-xs">{label}</span>
  </button>
);

const AuthorBio = () => (
  <motion.section
    variants={itemVariants}
    className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border bg-gradient-to-r from-primary/5 to-primary/10 p-8"
  >
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-primary/20">
        <div className="h-full w-full bg-gradient-to-br from-primary to-primary/50" />
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-2xl font-bold">About the Author</h3>
        <p className="mb-4 text-muted-foreground">
          John Doe is a senior developer and technical writer with over 10 years of experience in web development. 
          He specializes in React, Next.js, and modern web technologies.
        </p>
        <div className="flex gap-4">
          <button className="rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground transition-transform hover:scale-105">
            Follow
          </button>
          <button className="rounded-full border border-border px-6 py-2 font-semibold transition-colors hover:bg-primary/10">
            View Profile
          </button>
        </div>
      </div>
    </div>
  </motion.section>
);

const CommentsSection = () => (
  <motion.section
    variants={itemVariants}
    className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm"
  >
    <h3 className="mb-6 text-2xl font-bold">Comments (23)</h3>
    <div className="mb-6 space-y-4">
      <textarea
        placeholder="Add a comment..."
        className="w-full rounded-2xl border border-border bg-background p-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        rows={4}
      />
      <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">
        Post Comment
      </button>
    </div>
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-4 rounded-2xl border border-border bg-background/50 p-6">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/50" />
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">User {i}</span>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm text-muted-foreground">Great article! Very informative and well-written.</p>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const NewsletterSignup = () => (
  <motion.section
    variants={itemVariants}
    className="mx-auto mt-16 max-w-4xl rounded-3xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-background p-12 text-center"
  >
    <h3 className="mb-4 text-3xl font-bold">Stay Updated</h3>
    <p className="mb-8 text-muted-foreground">
      Subscribe to our newsletter and get the latest articles delivered directly to your inbox.
    </p>
    <div className="mx-auto flex max-w-md gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 rounded-full border border-border bg-background px-6 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">
        Subscribe
      </button>
    </div>
  </motion.section>
);

const RelatedPostsSection = ({ posts }: { posts: RelatedPost[] }) => (
  <section className="mt-24 border-t border-border pt-16">
    <h2 className="mb-12 text-center text-3xl font-bold">You Might Also Like</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((related) => (
        <Link href={`/blog/${related.slug.current}`} key={related._id} className="group">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass h-full overflow-hidden rounded-2xl border border-border p-6 transition-all hover:border-primary/50 hover:shadow-2xl"
          >
            <div className="mb-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5" />
            <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">{related.title}</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {related.categories?.map((cat) => (
                <span key={cat} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {cat}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read More <FaChevronUp className="rotate-90" />
            </span>
          </motion.div>
        </Link>
      ))}
    </div>
  </section>
);

const TagsSection = ({ tags }: { tags: string[] }) => (
  <motion.section
    variants={itemVariants}
    className="mx-auto mt-16 max-w-4xl"
  >
    <h3 className="mb-6 text-xl font-bold">Tags</h3>
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag.toLowerCase()}`}
          className="rounded-full border border-border bg-card px-6 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/10"
        >
          #{tag}
        </Link>
      ))}
    </div>
  </motion.section>
);
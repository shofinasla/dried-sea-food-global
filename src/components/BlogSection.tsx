import { useState, useRef, FormEvent } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight, 
  X, 
  MessageSquare, 
  Share2, 
  Check, 
  Send,
  ChevronRight,
  ChevronLeft,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { BlogPost } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { getCategoryLabel } from '../i18n/categoryLabels';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenAdmin?: () => void;
  onAddComment: (postId: string, comment: { author: string; email: string; content: string }) => void;
  onNavigateInsights?: () => void;
}

export default function BlogSection({ posts, onAddComment, onNavigateInsights }: BlogSectionProps) {
  const { currentLang } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Comment input form inside modal
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Slider reference for bottom 4 articles
  const sliderRef = useRef<HTMLDivElement>(null);

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  // Top featured article
  const latestPost = posts[0] || null;
  // Next 4 articles for the horizontal slidebar
  const otherPosts = posts.slice(1, 5).length > 0 ? posts.slice(1, 5) : posts.slice(0, 4);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = 320;
    if (direction === 'left') {
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentText.trim() || !commentName.trim()) return;

    onAddComment(selectedPost.id, {
      author: commentName,
      email: commentEmail,
      content: commentText
    });

    setCommentSubmitted(true);
    setCommentText('');
    setCommentName('');
    setCommentEmail('');
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleViewAllArticles = () => {
    if (onNavigateInsights) {
      onNavigateInsights();
    } else {
      window.location.href = '/insights';
    }
  };

  return (
    <section id="blog" className="py-8 sm:py-12 bg-white text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>MARKET INTELLIGENCE &amp; TRADE GUIDES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase font-sans">
            Blog &amp; Wawasan Ekspor Hasil Laut
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            Panduan mendalam mengenai standar kualitas ekspor ikan asin, kepatuhan karantina internasional BKIPM, teknologi pengeringan higienis, serta peluang pasar diaspora di Asia &amp; Amerika.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 1. TOP HERO: LATEST ARTICLE (ARTIKEL TERBARU)                */}
        {/* ============================================================ */}
        {latestPost && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#009bb3]">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{isIndonesian ? 'ARTIKEL TERBARU' : isArabic ? 'أحدث مقال تحليلي' : 'LATEST FEATURED ARTICLE'}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {latestPost.publishedAt}
              </span>
            </div>

            <div 
              onClick={() => setSelectedPost(latestPost)}
              className="bg-slate-50 border-2 border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-2xs hover:shadow-md group cursor-pointer transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center p-2.5 sm:p-0"
            >
              {/* Cover Image */}
              <div className="lg:col-span-7 h-48 sm:h-72 lg:h-[320px] rounded-2xl sm:rounded-none overflow-hidden relative bg-slate-100">
                <img 
                  src={latestPost.coverImage} 
                  alt={latestPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent lg:hidden" />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-[10px] sm:text-xs font-black px-3 py-0.5 rounded-full shadow-md">
                  {getCategoryLabel('blog', latestPost.category, currentLang).toUpperCase()}
                </span>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 p-2 sm:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500">
                  <span className="text-[#009bb3] font-bold">{getCategoryLabel('blog', latestPost.category, currentLang)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {latestPost.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">{latestPost.publishedAt}</span>
                </div>

                <h3 className="text-sm sm:text-xl lg:text-2xl font-black text-slate-950 group-hover:text-[#009bb3] transition-colors leading-snug line-clamp-2 sm:line-clamp-none">
                  {latestPost.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {latestPost.excerpt}
                </p>

                <div className="pt-2 sm:pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={latestPost.author.avatar} 
                      alt={latestPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border border-teal-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block truncate">{latestPost.author.name}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{latestPost.author.role}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#009bb3] text-white text-[11px] font-bold group-hover:bg-[#0d8a9e] transition-colors shrink-0 shadow-2xs">
                    <span>{isIndonesian ? 'Baca' : isArabic ? 'اقرأ' : 'Read'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. BOTTOM SLIDEBAR: 4 OTHER ARTICLES                         */}
        {/*    Mobile: Clean horizontal card (~25% photo, neat text)     */}
        {/*    Desktop: Responsive horizontal carousel                   */}
        {/* ============================================================ */}
        <div>
          
          {/* Slidebar Controls Header */}
          <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
            <div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                {isIndonesian ? 'EKSPLORASI WAWASAN LAINNYA' : isArabic ? 'مقالات إضافية' : 'MORE TRADE ARTICLES'}
              </div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900">
                {isIndonesian ? 'Koleksi Artikel & Panduan Terpilih' : isArabic ? 'دليل ورؤى تصدير الأسماك' : 'Selected Industry Insights'}
              </h3>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider('left')}
                id="btn-slide-blog-prev"
                aria-label="Previous articles"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 hover:bg-[#009bb3] text-slate-700 hover:text-white border border-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                id="btn-slide-blog-next"
                aria-label="Next articles"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 hover:bg-[#009bb3] text-slate-700 hover:text-white border border-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Horizontal Slide Bar Container */}
          <div 
            ref={sliderRef}
            className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {otherPosts.map((post) => (
              <div
                key={post.id}
                id={`blog-slide-${post.id}`}
                onClick={() => setSelectedPost(post)}
                className="min-w-[270px] max-w-[290px] sm:min-w-[300px] sm:max-w-[320px] bg-slate-50 border border-slate-200 hover:border-[#009bb3] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-row sm:flex-col justify-between snap-start shrink-0 p-2.5 sm:p-0 gap-3 sm:gap-0"
              >
                {/* Mobile Photo (Left ~25%) / Desktop Photo (Top) */}
                <div className="relative w-20 h-20 sm:w-full sm:h-40 shrink-0 rounded-xl sm:rounded-none overflow-hidden bg-slate-100">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                  <span className="hidden sm:block absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#009bb3] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    {getCategoryLabel('blog', post.category, currentLang)}
                  </span>
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between sm:p-3.5">
                  <div>
                    {/* Mobile Category Tag */}
                    <div className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-[#009bb3] mb-0.5 truncate">
                      {getCategoryLabel('blog', post.category, currentLang)}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors line-clamp-2 mb-1 leading-snug">
                      {post.title}
                    </h4>

                    <p className="hidden sm:block text-slate-600 text-xs leading-relaxed line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Metadata Footer */}
                  <div className="pt-1.5 sm:border-t sm:border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[110px] sm:max-w-[130px]">{post.author.name}</span>
                    <span className="text-[#009bb3] font-bold inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>Baca</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* View All Articles Action Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            type="button"
            onClick={handleViewAllArticles}
            id="btn-view-all-articles"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-100 hover:bg-[#009bb3] text-slate-800 hover:text-white border border-slate-200 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <span>
              {isIndonesian
                ? `Lihat Semua Artikel & Panduan Ekspor (${posts.length} Artikel)`
                : isArabic
                ? `عرض جميع المقالات والأدلة (${posts.length} مقالات)`
                : `View All Articles & Market Intelligence (${posts.length} Articles)`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* FULL ARTICLE READER MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-7 relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-56 mb-5 border border-slate-200 relative bg-slate-100">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs px-3 py-0.5 rounded-full shadow-xs">
                  {getCategoryLabel('blog', selectedPost.category, currentLang)}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-teal-300"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{selectedPost.author.name}</span>
                      <span className="text-[11px] text-slate-500">{selectedPost.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#009bb3]" />
                      {selectedPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#009bb3]" />
                      {selectedPost.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="py-4 space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Tags & Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-t border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleShareArticle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
                </button>
              </div>

              {/* Discussion & Comments */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#009bb3]" />
                  <h3 className="text-base font-bold text-slate-900">
                    Diskusi &amp; Tanggapan Pembeli ({selectedPost.comments?.length || 0})
                  </h3>
                </div>

                {/* Existing Comments */}
                <div className="space-y-2.5">
                  {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{c.author}</span>
                          <span className="text-slate-400">{c.createdAt}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{c.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada tanggapan. Jadilah yang pertama berkomentar!</p>
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-2.5 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tulis Tanggapan:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Nama Lengkap / Instansi *"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#009bb3]"
                    />
                    <input
                      type="email"
                      placeholder="Email Bisnis *"
                      required
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#009bb3]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Tulis pesan atau tanggapan Anda..."
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#009bb3]"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-xs font-bold hover:opacity-95 transition-opacity shadow-2xs cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Kirim</span>
                    </button>
                    {commentSubmitted && (
                      <span className="text-xs text-emerald-600 font-bold animate-fadeIn">
                        ✓ Komentar berhasil ditambahkan!
                      </span>
                    )}
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

import { useState, FormEvent } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  X, 
  MessageSquare, 
  Share2, 
  Check, 
  Send,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenAdmin: () => void;
  onAddComment: (postId: string, comment: { author: string; email: string; content: string }) => void;
}

export default function BlogSection({ posts, onOpenAdmin, onAddComment }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Comment input form inside modal
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Artikel' },
    { id: 'Ekspor & Pasar', label: 'Ekspor & Pasar Global' },
    { id: 'Teknologi Pengolahan', label: 'Teknologi & Solar Dome' },
    { id: 'Regulasi & Sertifikasi', label: 'Regulasi & Karantina KKP' },
    { id: 'Kualitas & Higienitas', label: 'Standar Mutu & Higienitas' },
    { id: 'Nelayan & Keberlanjutan', label: 'Kemitraan Nelayan & ESG' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured) || posts[0];

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

  return (
    <section id="blog" className="py-20 bg-white text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>MARKET INTELLIGENCE & EXPORT GUIDES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
              Blog & Wawasan Ekspor Hasil Laut
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Panduan mendalam mengenai standar kualitas ekspor ikan asin, kepatuhan karantina internasional BKIPM, teknologi pengeringan higienis, serta peluang pasar diaspora di Asia & Amerika.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            id="btn-admin-blog-shortcut"
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#009bb3] text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>Tulis Artikel Baru (Admin CMS)</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`blog-cat-${cat.id}`}
                className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari topik atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="input-blog-search"
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009bb3] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Featured Blog Card (if no search active) */}
        {featuredPost && searchQuery === '' && selectedCategory === 'all' && (
          <div 
            onClick={() => setSelectedPost(featuredPost)}
            className="mb-12 bg-slate-50 border border-slate-200 hover:border-[#009bb3]/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-md group cursor-pointer transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-7 h-72 lg:h-96 overflow-hidden relative">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md">
                FEATURED INSIGHT
              </span>
            </div>

            <div className="lg:col-span-5 p-6 lg:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="text-[#009bb3] font-bold">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 group-hover:text-[#009bb3] transition-colors leading-tight">
                {featuredPost.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-teal-300"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{featuredPost.author.name}</span>
                    <span className="text-[11px] text-slate-500">{featuredPost.author.role}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#009bb3] group-hover:translate-x-1 transition-transform">
                  <span>Baca Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-slate-200 hover:border-[#009bb3]/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#009bb3] text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium truncate max-w-[140px]">{post.author.name}</span>
                </div>
                <span className="text-[#009bb3] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Baca</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FULL ARTICLE READER MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-64 mb-6 border border-slate-200 relative bg-slate-100">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                  {selectedPost.category}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-4 pb-6 border-b border-slate-100">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-teal-300"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">{selectedPost.author.name}</span>
                      <span className="text-xs text-slate-500">{selectedPost.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{selectedPost.publishedAt}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                    <button
                      onClick={handleShareArticle}
                      className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:text-[#009bb3] hover:bg-slate-200 transition-colors ml-2 cursor-pointer"
                      title="Bagikan Artikel"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content in Clean Typography */}
              <div className="py-6 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mb-8">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#009bb3]" />
                  <span>Diskusi & Tanggapan ({selectedPost.comments?.length || 0})</span>
                </h4>

                {/* List existing comments */}
                <div className="space-y-3">
                  {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <strong className="text-[#009bb3]">{comment.author}</strong>
                          <span className="text-[11px] text-slate-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama memberikan tanggapan.</p>
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tinggalkan Komentar Profesional</h5>
                  
                  {commentSubmitted && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Komentar Anda telah terkirim dan disimpan!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Lengkap & Jabatan"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#009bb3] focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Kerja (Opsional)"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#009bb3] focus:outline-none"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Tuliskan pandangan atau pertanyaan Anda terkait artikel ini..."
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#009bb3] focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold px-4 py-2 rounded-xl text-xs transition-opacity hover:opacity-90 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Komentar</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}

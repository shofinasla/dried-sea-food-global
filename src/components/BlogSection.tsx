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
    <section id="blog" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Market Intelligence & Export Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Blog & Wawasan Industri Hasil Laut Ekspor
            </h2>
            <p className="mt-2 text-slate-300 text-base max-w-2xl">
              Panduan mendalam mengenai standar kualitas ekspor ikan asin, kepatuhan karantina internasional BKIPM, teknologi pengeringan higienis, serta peluang pasar diaspora di Asia & Amerika.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            id="btn-admin-blog-shortcut"
            className="self-start md:self-auto inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
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
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Featured Blog Card (if no search active) */}
        {featuredPost && searchQuery === '' && selectedCategory === 'all' && (
          <div 
            onClick={() => setSelectedPost(featuredPost)}
            className="mb-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-7 h-72 lg:h-96 overflow-hidden relative">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                FEATURED INSIGHT
              </span>
            </div>

            <div className="lg:col-span-5 p-6 lg:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-amber-400 font-bold">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                {featuredPost.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-amber-400/40"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">{featuredPost.author.name}</span>
                    <span className="text-[11px] text-slate-400">{featuredPost.author.role}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
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
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded">
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

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-auto flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium truncate max-w-[140px]">{post.author.name}</span>
                </div>
                <span className="text-amber-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Baca</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FULL ARTICLE READER MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-64 mb-6 border border-slate-700 relative">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-md">
                  {selectedPost.category}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-4 pb-6 border-b border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                    />
                    <div>
                      <span className="text-sm font-bold text-white block">{selectedPost.author.name}</span>
                      <span className="text-xs text-slate-400">{selectedPost.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{selectedPost.publishedAt}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                    <button
                      onClick={handleShareArticle}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors ml-2"
                      title="Bagikan Artikel"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content in Clean Typography */}
              <div className="py-6 text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 mb-8">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="space-y-6 pt-6 border-t border-slate-800">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>Diskusi & Tanggapan ({selectedPost.comments?.length || 0})</span>
                </h4>

                {/* List existing comments */}
                <div className="space-y-3">
                  {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <strong className="text-amber-400">{comment.author}</strong>
                          <span className="text-[11px] text-slate-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama memberikan tanggapan.</p>
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Tinggalkan Komentar Profesional</h5>
                  
                  {commentSubmitted && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
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
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Kerja (Opsional)"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Tuliskan pandangan atau pertanyaan Anda terkait artikel ini..."
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
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

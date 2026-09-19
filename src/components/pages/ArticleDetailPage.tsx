import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Tag, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BlogPost } from '../../types';

interface ArticleDetailPageProps {
  article: BlogPost;
  allArticles: BlogPost[];
  onSelectArticle: (a: BlogPost) => void;
  onRequestQuote: () => void;
  onNavigateInsights: () => void;
  onNavigateHome: () => void;
}

export default function ArticleDetailPage({
  article,
  allArticles,
  onSelectArticle,
  onRequestQuote,
  onNavigateInsights,
  onNavigateHome
}: ArticleDetailPageProps) {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [comments, setComments] = useState(article.comments || []);
  const [submitted, setSubmitted] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentBody.trim()) return;
    const newComm = {
      id: `c-${Date.now()}`,
      author: commentName.trim(),
      email: commentEmail.trim(),
      content: commentBody.trim(),
      createdAt: 'Just now'
    };
    setComments([newComm, ...comments]);
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const related = allArticles.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={onNavigateInsights} className="hover:text-[#009bb3] transition-colors">
              Insights
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        {/* Back Link */}
        <button
          onClick={onNavigateInsights}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#009bb3] mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all insights</span>
        </button>

        {/* Title Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#009bb3] text-[11px] font-bold uppercase tracking-wider mb-3">
            {article.category}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display leading-tight">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full object-cover" />
              <span>{article.author.name}</span>
              <span className="text-slate-400">({article.author.role})</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedAt}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-6 aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Excerpt Lead */}
          <p className="mt-8 text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
            {article.excerpt}
          </p>

          {/* Article Body */}
          <div className="mt-8 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {article.tags.map((tg, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                  #{tg}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mid-Article B2B Quote Banner */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-cyan-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold font-serif-display">Procuring Indonesian Dried Seafood?</h3>
            <p className="text-xs text-slate-300 mt-1">Get certified direct export supply from PT Samdura Bara Persada.</p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-5 py-2.5 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs transition shrink-0"
          >
            Request Quotation (RFQ)
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <MessageSquare className="w-4 h-4 text-[#009bb3]" />
            <span>Comments ({comments.length})</span>
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 mb-8 pb-8 border-b border-slate-100">
            {submitted && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Thank you! Your comment has been submitted.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={commentName}
                onChange={e => setCommentName(e.target.value)}
                placeholder="Your Name *"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3]"
              />
              <input
                type="email"
                value={commentEmail}
                onChange={e => setCommentEmail(e.target.value)}
                placeholder="Your Email (Optional)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3]"
              />
            </div>
            <textarea
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              placeholder="Write your comment or question..."
              rows={3}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#009bb3] transition"
            >
              Post Comment
            </button>
          </form>

          {/* List of Comments */}
          <div className="space-y-4">
            {comments.map((cm, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{cm.author}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{cm.createdAt}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{cm.content}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

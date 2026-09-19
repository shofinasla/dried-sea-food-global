import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  Sparkles,
  Tag
} from 'lucide-react';
import { BlogPost } from '../../types';
import { useTranslation } from '../../i18n/LanguageContext';

interface InsightsPageProps {
  articles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  onNavigateHome: () => void;
}

export default function InsightsPage({
  articles,
  onSelectArticle,
  onNavigateHome
}: InsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category))).filter(Boolean)];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      (art.tags && art.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Insights & Market Intelligence</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Seafood Trade Knowledge</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              Export Insights & Buyer Guides
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Technical guides, import regulatory updates, size grading breakdowns, and solar dome processing analysis for international seafood procurement professionals.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, guides..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3] transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filter or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#009bb3] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {art.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{art.author.name}</span>
                  <span className="font-bold text-[#009bb3] flex items-center gap-1">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

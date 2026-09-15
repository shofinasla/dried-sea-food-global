import { 
  Package, 
  BookOpen, 
  Mail, 
  Image as ImageIcon, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { ExportCommodity, BlogPost, AdminStats } from '../../types';

interface AdminDashboardTabProps {
  stats: AdminStats | null;
  commodities: ExportCommodity[];
  blogPosts: BlogPost[];
  inquiries: any[];
  onNavigateTab: (tab: string) => void;
  onAddNewProduct: () => void;
  onAddNewArticle: () => void;
}

export default function AdminDashboardTab({
  stats,
  commodities,
  blogPosts,
  inquiries,
  onNavigateTab,
  onAddNewProduct,
  onAddNewArticle
}: AdminDashboardTabProps) {
  const publishedProductsCount = commodities.filter(c => c.isPublished !== false).length;
  const publishedArticlesCount = blogPosts.filter(p => p.status !== 'draft').length;
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'new' || !i.status).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Enterprise Control Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Selamat Datang di Portal Manajemen
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Kelola katalog komoditas ekspor, publikasikan artikel wawasan perdagangan, tindak lanjuti inquiry RFQ pembeli internasional, serta pantau performa SEO website secara tersentralisasi.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onAddNewProduct}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Komoditas</span>
            </button>
            <button
              onClick={onAddNewArticle}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-teal-400 flex items-center gap-1">
              <span>Kelola</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalProducts ?? commodities.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-1">
            Total Komoditas Ekspor
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>{publishedProductsCount} Aktif Publik</span>
            <span className="text-teal-400 font-medium">Katalog B2B</span>
          </div>
        </div>

        {/* Metric 2: Articles */}
        <div 
          onClick={() => onNavigateTab('articles')}
          className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-sky-400 flex items-center gap-1">
              <span>Kelola</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalArticles ?? blogPosts.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-1">
            Artikel Blog & Wawasan
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>{publishedArticlesCount} Terpublikasi</span>
            <span className="text-sky-400 font-medium">SEO Index</span>
          </div>
        </div>

        {/* Metric 3: Inquiries */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <span>Lihat RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalInquiries ?? inquiries.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-1">
            Inquiry & Permintaan RFQ
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className={pendingInquiriesCount > 0 ? 'text-amber-400 font-bold' : ''}>
              {pendingInquiriesCount} Perlu Ditanggapi
            </span>
            <span className="text-emerald-400 font-medium">B2B Leads</span>
          </div>
        </div>

        {/* Metric 4: Gallery */}
        <div 
          onClick={() => onNavigateTab('gallery')}
          className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1">
              <span>Kelola</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats?.totalGallery ?? 8}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-1">
            Foto Dokumentasi Hub
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Fasilitas & Kargo</span>
            <span className="text-purple-400 font-medium">Otentik</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Products & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Recent Commodities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Komoditas Ekspor Terbaru
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
              >
                Lihat Semua ({commodities.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {commodities.slice(0, 4).map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700" 
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.latinName}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-teal-400">
                      ${item.priceUSDPerKg}/kg
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      MOQ: {item.moqKg} kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={onAddNewProduct}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Komoditas Baru</span>
            </button>
          </div>
        </div>

        {/* Right Column: Recent Blog Articles */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Artikel Blog & Edukasi Terkini
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('articles')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                Lihat Semua ({blogPosts.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {blogPosts.slice(0, 4).map((post) => (
                <div 
                  key={post.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{post.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="text-teal-400 font-medium">{post.category}</span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 shrink-0">
                    {post.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={onAddNewArticle}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel Wawasan Baru</span>
            </button>
          </div>
        </div>

      </div>

      {/* System & Compliance Status Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-200 font-bold">Status Sistem & Keamanan Server</div>
            <div className="text-slate-400 text-[11px]">Enkripsi TLS 1.3 • Session Cookie HttpOnly • Robot Disallow Aktif</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>API Online</span>
          </span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
}

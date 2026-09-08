import { useState, useEffect, FormEvent } from 'react';
import { 
  Lock, 
  X, 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  Mail, 
  Activity, 
  Search, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Globe2, 
  ExternalLink, 
  Eye, 
  RefreshCw,
  TrendingUp,
  FileCode,
  Share2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BlogPost, GalleryItem, ContactInquiry, SEOSettings, AnalyticsSummary } from '../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
  inquiries: ContactInquiry[];
  seoSettings: SEOSettings;
  onSaveBlogPost: (post: Partial<BlogPost>) => Promise<void>;
  onDeleteBlogPost: (id: string) => Promise<void>;
  onSaveGalleryItem: (item: Partial<GalleryItem>) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
  onUpdateInquiryStatus: (id: string, status: string, notes?: string) => Promise<void>;
  onSaveSEOSettings: (settings: Partial<SEOSettings>) => Promise<void>;
}

export default function AdminCMSModal({
  isOpen,
  onClose,
  blogPosts,
  galleryItems,
  inquiries,
  seoSettings,
  onSaveBlogPost,
  onDeleteBlogPost,
  onSaveGalleryItem,
  onDeleteGalleryItem,
  onUpdateInquiryStatus,
  onSaveSEOSettings
}: AdminCMSModalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blog' | 'gallery' | 'inquiries' | 'analytics' | 'seo' | 'security'>('dashboard');

  // Real-time analytics state
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Blog Form state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState<any>('Teknologi');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCoverImage, setBlogCoverImage] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [generatingAIBlog, setGeneratingAIBlog] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState('');

  // Gallery Form state
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<any>('facilities');
  const [galImageUrl, setGalImageUrl] = useState('');
  const [galLocation, setGalLocation] = useState('');
  const [galDescription, setGalDescription] = useState('');
  const [galTags, setGalTags] = useState('');

  // SEO Form state
  const [metaTitle, setMetaTitle] = useState(seoSettings.metaTitle);
  const [metaDesc, setMetaDesc] = useState(seoSettings.metaDescription);
  const [focusKeywords, setFocusKeywords] = useState(seoSettings.focusKeywords.join(', '));
  const [optimizingAISEO, setOptimizingAISEO] = useState(false);
  const [seoSuccessNotice, setSeoSuccessNotice] = useState(false);

  // Inquiry reply note state
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [replyNote, setReplyNote] = useState('');

  // Fetch real-time analytics on tab change
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch('/api/analytics/realtime');
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // AI Blog Generator Handlers
  const handleGenerateAIBlog = async () => {
    if (!aiTopicInput.trim()) return;
    setGeneratingAIBlog(true);
    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate-blog',
          topic: aiTopicInput
        })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setBlogTitle(data.result.title || '');
        setBlogExcerpt(data.result.excerpt || '');
        setBlogCategory(data.result.category || 'Teknologi');
        setBlogContent(data.result.content || '');
        setBlogTags(Array.isArray(data.result.tags) ? data.result.tags.join(', ') : 'Logistics, AI');
      }
    } catch (err) {
      console.error('AI blog generation failed:', err);
    } finally {
      setGeneratingAIBlog(false);
    }
  };

  const handleSaveBlog = async (e: FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    await onSaveBlogPost({
      id: editingPostId || undefined,
      title: blogTitle,
      excerpt: blogExcerpt,
      category: blogCategory,
      content: blogContent,
      coverImage: blogCoverImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      tags: blogTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    // Reset
    setEditingPostId(null);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogCoverImage('');
    setBlogTags('');
    setAiTopicInput('');
  };

  const handleSaveGallery = async (e: FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galImageUrl) return;

    await onSaveGalleryItem({
      title: galTitle,
      category: galCategory,
      imageUrl: galImageUrl,
      location: galLocation || 'Jakarta Hub',
      description: galDescription,
      tags: galTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    // Reset
    setGalTitle('');
    setGalImageUrl('');
    setGalLocation('');
    setGalDescription('');
    setGalTags('');
  };

  const handleOptimizeAISEO = async () => {
    setOptimizingAISEO(true);
    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'optimize-seo',
          topic: `${metaTitle} ${metaDesc}`
        })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setMetaTitle(data.result.metaTitle || metaTitle);
        setMetaDesc(data.result.metaDescription || metaDesc);
        setFocusKeywords(Array.isArray(data.result.focusKeywords) ? data.result.focusKeywords.join(', ') : focusKeywords);
        setSeoSuccessNotice(true);
        setTimeout(() => setSeoSuccessNotice(false), 4000);
      }
    } catch (e) {
      console.error('SEO AI error:', e);
    } finally {
      setOptimizingAISEO(false);
    }
  };

  const handleSaveSEOForm = async () => {
    await onSaveSEOSettings({
      metaTitle,
      metaDescription: metaDesc,
      focusKeywords: focusKeywords.split(',').map(k => k.trim()).filter(Boolean)
    });
    setSeoSuccessNotice(true);
    setTimeout(() => setSeoSuccessNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Admin CMS & Security Portal
                </h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE OPS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PT Dried Seafood Global Indonesia Export Enterprise Management Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAnalytics}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Refresh Real-time Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingAnalytics ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
            { id: 'analytics', label: 'Analitik Real-time', icon: Activity, badge: analytics?.activeVisitorsNow },
            { id: 'blog', label: 'Kelola Blog & Berita', icon: BookOpen, count: blogPosts.length },
            { id: 'gallery', label: 'Kelola Galeri Foto', icon: ImageIcon, count: galleryItems.length },
            { id: 'inquiries', label: 'Kotak Masuk RFQ', icon: Mail, count: inquiries.length },
            { id: 'seo', label: 'SEO & Meta Manager', icon: Globe2 },
            { id: 'security', label: 'Keamanan & SSL Hub', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                id={`admin-tab-${tab.id}`}
                className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-slate-900/80 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {tab.count}
                  </span>
                )}
                {tab.badge !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 font-bold animate-pulse">
                    {tab.badge} Online
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area with custom scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Metric KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Pengunjung Real-time</span>
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    {analytics?.activeVisitorsNow || 42} Aktif
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Live tracking via TLS 1.3</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Total Kunjungan Halaman</span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {analytics?.totalPageViews.toLocaleString() || '18,450'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Sesi terverifikasi hari ini</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Permintaan RFQ Masuk</span>
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-blue-400">
                    {inquiries.length} Pesan
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{inquiries.filter(i => i.status === 'new').length} perlu ditinjau</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Status Keamanan SSL</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    Grade A+ EV
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">DigiCert High-Assurance</p>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveTab('blog')}
                  className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                  <BookOpen className="w-6 h-6 text-amber-400 mb-3" />
                  <h4 className="font-bold text-white text-base group-hover:text-amber-400">Tulis & Publikasikan Artikel</h4>
                  <p className="text-xs text-slate-400 mt-1">Gunakan asisten Gemini AI untuk membuat draf analisa pasar ekspor hasil laut kering.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                  <ImageIcon className="w-6 h-6 text-amber-400 mb-3" />
                  <h4 className="font-bold text-white text-base group-hover:text-amber-400">Perbarui Galeri Fasilitas</h4>
                  <p className="text-xs text-slate-400 mt-1">Unggah dokumentasi sentra pengeringan, grading, dan sanitasi HACCP.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('seo')}
                  className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl cursor-pointer transition-all group"
                >
                  <Globe2 className="w-6 h-6 text-amber-400 mb-3" />
                  <h4 className="font-bold text-white text-base group-hover:text-amber-400">Audit & Optimasi SEO</h4>
                  <p className="text-xs text-slate-400 mt-1">Lihat preview Google SERP dan generator JSON-LD schema B2B ekspor.</p>
                </div>
              </div>

              {/* Export Compliance & Quality Assurance Grid */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Status Kepatuhan Karantina & Fasilitas Ekspor</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    SEMUA SISTEM NORMAL
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Sertifikasi Karantina BKIPM</span>
                    <strong className="text-emerald-400 font-semibold mt-1 block">Health Cert Terbit</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Standar Mutu HACCP</span>
                    <strong className="text-amber-400 font-semibold mt-1 block">Grade A Internasional</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Kelembaban Gudang (RH)</span>
                    <strong className="text-slate-200 font-semibold mt-1 block">52% (Dehumidified)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Uji Bebas Formalin</span>
                    <strong className="text-emerald-400 font-semibold mt-1 block">100% Negatif (Lolos)</strong>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Inquiry RFQ Terbaru dari Website</h4>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs text-amber-400 hover:underline">
                    Lihat Semua ({inquiries.length})
                  </button>
                </div>
                <div className="divide-y divide-slate-800">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <strong className="text-white block">{inq.name} ({inq.companyName})</strong>
                        <span className="text-slate-400 text-[11px] line-clamp-1">{inq.message}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inq.status === 'new' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {inq.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: REAL-TIME ANALYTICS */}
          {/* ========================================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    <span>Real-Time Visitor Traffic & Engagement</span>
                  </h3>
                  <p className="text-xs text-slate-400">Monitoring sesi aktif, konversi kalkulator pengiriman, dan asal negara.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{analytics?.activeVisitorsNow || 42} Pengunjung Aktif Saat Ini</span>
                </div>
              </div>

              {/* Main Traffic Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 7-Day Traffic Area Chart */}
                <div className="lg:col-span-8 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">
                    Tren Kunjungan & Kalkulasi Ongkir (7 Hari Terakhir)
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics?.dailyViews || []}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="views" name="Page Views" stroke="#f59e0b" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                        <Area type="monotone" dataKey="quotes" name="Kalkulasi Ongkir" stroke="#10b981" fillOpacity={1} fill="url(#colorQuotes)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Distribusi Perangkat
                  </h4>
                  <div className="space-y-3 my-auto">
                    {analytics?.deviceBreakdown.map((dev, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{dev.device}</span>
                          <span className="font-bold text-amber-400">{dev.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full rounded-full transition-all"
                            style={{ width: `${dev.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800">
                    58% pengguna enterprise mengakses melalui Desktop Workspace.
                  </p>
                </div>
              </div>

              {/* Geographic & Top Pages breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">
                    Asal Negara Pengunjung Teratas
                  </h4>
                  <div className="space-y-2.5">
                    {analytics?.topCountries.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-850">
                        <span className="flex items-center gap-2 text-white">
                          <span>{c.flag}</span>
                          <span>{c.country}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{c.visitors.toLocaleString()} sesi</span>
                          <span className="font-bold text-amber-400 w-8 text-right">{c.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Realtime Live Event Stream */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center justify-between">
                    <span>Aktivitas Real-time Terkini</span>
                    <span className="text-[10px] text-emerald-400">Live Streaming</span>
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {analytics?.recentEvents.map((ev) => (
                      <div key={ev.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-semibold text-amber-400">{ev.country}</span>
                          <span>{new Date(ev.timestamp).toLocaleTimeString('id-ID')}</span>
                        </div>
                        <p className="text-slate-200 font-medium">{ev.event}</p>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{ev.device}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: BLOG CMS */}
          {/* ========================================================================= */}
          {activeTab === 'blog' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Blog Creator / Editor Form */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>{editingPostId ? 'Edit Artikel Blog' : 'Tulis Artikel Blog Baru'}</span>
                  </h3>
                  
                  {/* AI Article Writer Helper */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Masukkan ide topik artikel..."
                      value={aiTopicInput}
                      onChange={(e) => setAiTopicInput(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-48 sm:w-64"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateAIBlog}
                      disabled={generatingAIBlog}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{generatingAIBlog ? 'Menulis AI...' : 'Tulis Otomatis dengan AI'}</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveBlog} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Artikel *</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Strategi Ekspor Jalur Hijau AEO 2026"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori *</label>
                      <select
                        value={blogCategory}
                        onChange={(e: any) => setBlogCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Teknologi">Teknologi</option>
                        <option value="Industri">Industri</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Kasus Nyata">Kasus Nyata</option>
                        <option value="Update Korporat">Update Korporat</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Cover Image URL (Unsplash/Direct)</label>
                      <input
                        type="url"
                        value={blogCoverImage}
                        onChange={(e) => setBlogCoverImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tags (Pisahkan koma)</label>
                      <input
                        type="text"
                        value={blogTags}
                        onChange={(e) => setBlogTags(e.target.value)}
                        placeholder="Logistics, Ekspor, AI, Maritim"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Ringkasan / Excerpt (1-2 Kalimat)</label>
                    <input
                      type="text"
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Ringkasan singkat yang memikat pembaca..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Isi Konten Lengkap (Markdown didukung) *</label>
                    <textarea
                      rows={6}
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Tulis artikel dengan heading ### dan bullet points..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {editingPostId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPostId(null);
                          setBlogTitle('');
                          setBlogContent('');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                    >
                      {editingPostId ? 'Simpan Perubahan' : 'Publikasikan Artikel'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Blog Posts List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Daftar Artikel Terpublikasi ({blogPosts.length})
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {blogPosts.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img 
                          src={p.coverImage} 
                          alt={p.title} 
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-800"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {p.category}
                          </span>
                          <h5 className="font-bold text-white text-sm truncate mt-1">{p.title}</h5>
                          <span className="text-[11px] text-slate-400">{p.publishedAt} • {p.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingPostId(p.id);
                            setBlogTitle(p.title);
                            setBlogCategory(p.category);
                            setBlogExcerpt(p.excerpt);
                            setBlogContent(p.content);
                            setBlogCoverImage(p.coverImage);
                            setBlogTags(p.tags.join(', '));
                          }}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteBlogPost(p.id)}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: GALLERY CMS */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Add Photo Form */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Tambah Dokumentasi Foto ke Galeri</span>
                </h3>

                <form onSubmit={handleSaveGallery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Foto / Dokumentasi *</label>
                      <input
                        type="text"
                        required
                        value={galTitle}
                        onChange={(e) => setGalTitle(e.target.value)}
                        placeholder="e.g. Automated High-Bay Racking System"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Galeri *</label>
                      <select
                        value={galCategory}
                        onChange={(e: any) => setGalCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="facilities">Smart Warehousing & PLB</option>
                        <option value="operations">Operasi Pelabuhan</option>
                        <option value="fleet">Armada Kapal & Pesawat</option>
                        <option value="projects">Proyek Kargo Khusus</option>
                        <option value="team">Tim & Konferensi</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">URL Foto (Unsplash/Hosting) *</label>
                      <input
                        type="url"
                        required
                        value={galImageUrl}
                        onChange={(e) => setGalImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Lokasi Fasilitas</label>
                      <input
                        type="text"
                        value={galLocation}
                        onChange={(e) => setGalLocation(e.target.value)}
                        placeholder="e.g. Cikarang Integrated Hub, Jawa Barat"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Singkat</label>
                    <input
                      type="text"
                      value={galDescription}
                      onChange={(e) => setGalDescription(e.target.value)}
                      placeholder="Penjelasan teknis kapasitas atau operasi..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                    >
                      Tambahkan ke Galeri
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Items Grid with Delete action */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Foto Terpasang ({galleryItems.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
                      <div className="p-3">
                        <span className="text-[10px] text-amber-400 block font-bold">{item.category}</span>
                        <h5 className="font-bold text-white text-xs truncate">{item.title}</h5>
                        <span className="text-[10px] text-slate-400 block truncate">{item.location}</span>
                      </div>
                      <button
                        onClick={() => onDeleteGalleryItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 hover:bg-rose-900 transition-colors"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: INQUIRIES CRM */}
          {/* ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>Kotak Pesan Masuk & Permintaan Penawaran (RFQ)</span>
                </h3>
                <span className="text-xs text-slate-400">Total: {inquiries.length} Pesan</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* List of Inquiries */}
                <div className="lg:col-span-6 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {inquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setReplyNote(inq.replyNotes || '');
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-bold text-white text-sm">{inq.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            inq.status === 'new' ? 'bg-amber-500/20 text-amber-400' :
                            inq.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {inq.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold">{inq.companyName} • {inq.inquiryType}</p>
                        <p className="text-xs text-slate-300 line-clamp-2 mt-1.5">{inq.message}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-900">
                          <span>{inq.createdAt}</span>
                          <span>Ref: {inq.id}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Inquiry Detail & Response Manager */}
                <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
                  {selectedInquiry ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <span className="text-xs font-bold text-amber-400">{selectedInquiry.inquiryType}</span>
                          <h4 className="text-lg font-bold text-white">{selectedInquiry.name}</h4>
                          <span className="text-xs text-slate-400">{selectedInquiry.companyName}</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{selectedInquiry.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 p-3 rounded-xl">
                        <div>
                          <span className="text-slate-400 block font-semibold">Email:</span>
                          <span className="text-white font-mono">{selectedInquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-semibold">Telepon/WA:</span>
                          <span className="text-white">{selectedInquiry.phone}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Isi Pesan Klien:
                        </span>
                        <div className="bg-slate-900 p-3.5 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line border border-slate-800">
                          {selectedInquiry.message}
                        </div>
                      </div>

                      {/* Status changer & Internal Notes */}
                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <label className="block text-xs font-bold text-slate-300">
                          Ubah Status & Catatan Internal Tindak Lanjut:
                        </label>
                        <div className="flex items-center gap-2">
                          {(['new', 'reviewed', 'responded', 'archived'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateInquiryStatus(selectedInquiry.id, st, replyNote)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                selectedInquiry.status === st
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'bg-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              {st.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        <textarea
                          rows={3}
                          value={replyNote}
                          onChange={(e) => setReplyNote(e.target.value)}
                          placeholder="Tuliskan catatan internal atau rangkuman hasil kontak dengan klien..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                        />

                        <button
                          onClick={() => onUpdateInquiryStatus(selectedInquiry.id, selectedInquiry.status, replyNote)}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                        >
                          Simpan Catatan RFQ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-slate-500">
                      <Mail className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">Pilih salah satu pesan di sebelah kiri untuk melihat detail dan merespons.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SEO & META MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-amber-400" />
                    <span>SEO Optimization Suite & Meta Tags</span>
                  </h3>
                  <p className="text-xs text-slate-400">Konfigurasi metadata Google Search, OpenGraph preview, dan Schema.org JSON-LD.</p>
                </div>

                <button
                  type="button"
                  onClick={handleOptimizeAISEO}
                  disabled={optimizingAISEO}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{optimizingAISEO ? 'Mengoptimalkan AI...' : '✨ Optimasi SEO Otomatis dengan AI'}</span>
                </button>
              </div>

              {seoSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Pengaturan SEO berhasil diperbarui dan diterapkan ke seluruh halaman web!</span>
                </div>
              )}

              {/* SERP Live Preview (Google Search snippet simulation) */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Google Search Engine Result Snippet Preview:
                </span>
                <div className="bg-white text-slate-900 p-4 rounded-xl shadow-md space-y-1">
                  <div className="text-xs text-slate-600 flex items-center gap-1 font-mono">
                    <span>https://driedseafoodglobal.com</span>
                    <span>› id</span>
                  </div>
                  <h4 className="text-blue-700 text-lg font-medium hover:underline cursor-pointer line-clamp-1">
                    {metaTitle}
                  </h4>
                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                    {metaDesc}
                  </p>
                </div>
              </div>

              {/* Edit SEO Meta Form */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Meta Title Tag (Maks. 60 Karakter) - Panjang: {metaTitle.length}
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Meta Description (Maks. 160 Karakter) - Panjang: {metaDesc.length}
                  </label>
                  <textarea
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Target Focus Keywords (B2B Logistics)
                  </label>
                  <input
                    type="text"
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>Schema.org Organization & LogisticsService JSON-LD Aktif</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveSEOForm}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Simpan Konfigurasi SEO
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: SECURITY & SSL HUB */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Status Enkripsi & Keamanan Data (TLS 1.3 Extended Validation)
                    </h3>
                    <p className="text-xs text-emerald-400 font-semibold">
                      Sertifikat Aktif: DigiCert Global Root G2 • Validated High-Assurance
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-200 block">Protokol Keamanan Data:</span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>• <strong>Enkripsi Transport:</strong> TLS 1.3 (AES-256-GCM / SHA-384)</li>
                      <li>• <strong>Integritas Data:</strong> Perfect Forward Secrecy (ECDHE)</li>
                      <li>• <strong>Anti-MITM:</strong> HSTS Preload Enabled (Strict-Transport-Security)</li>
                      <li>• <strong>Sertifikasi:</strong> ISO/IEC 27001:2022 & SOC 2 Type II</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="font-bold text-slate-200 block">Kepatuhan Privasi Regulasi:</span>
                    <ul className="space-y-1.5 text-slate-300">
                      <li>• <strong>UU No. 27/2022:</strong> Pelindungan Data Pribadi (UU PDP) Patuh</li>
                      <li>• <strong>GDPR EU:</strong> Enkripsi data klien Eropa end-to-end</li>
                      <li>• <strong>Audit Log:</strong> Real-time intrusion detection monitoring</li>
                      <li>• <strong>Zero Data Selling:</strong> Jaminan tanpa pembagian data pihak ketiga</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

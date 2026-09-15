import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  Mail, 
  Image as ImageIcon, 
  Globe2, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink, 
  User, 
  Lock,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { COMPANY_PROFILE } from '../../data/initialData';
import { ExportCommodity, BlogPost, ExportInquiry, GalleryItem, SeoConfig, AdminStats } from '../../types';

import AdminDashboardTab from './AdminDashboardTab';
import AdminProductsTab from './AdminProductsTab';
import AdminArticlesTab from './AdminArticlesTab';
import AdminInquiriesTab from './AdminInquiriesTab';
import AdminGalleryTab from './AdminGalleryTab';
import AdminSeoTab from './AdminSeoTab';
import AdminSecurityTab from './AdminSecurityTab';

interface AdminLayoutProps {
  currentUser: { id: string; username: string; name: string; role: string };
  onLogout: () => void;
}

export default function AdminLayout({ currentUser, onLogout }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [commodities, setCommodities] = useState<ExportCommodity[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [inquiries, setInquiries] = useState<ExportInquiry[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [seoConfig, setSeoConfig] = useState<SeoConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Set noindex robot meta tag and tab title for admin portal
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Admin Control Panel | Dried Seafood Global';

    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let createdMeta = false;

    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
      createdMeta = true;
    }
    const prevRobotsContent = metaRobots.content;
    metaRobots.content = 'noindex,nofollow,noarchive';

    return () => {
      document.title = originalTitle;
      if (metaRobots) {
        if (createdMeta) {
          metaRobots.remove();
        } else {
          metaRobots.content = prevRobotsContent || 'index,follow';
        }
      }
    };
  }, []);

  const loadAllAdminData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const [
        statsRes,
        prodRes,
        artRes,
        inqRes,
        galRes,
        seoRes
      ] = await Promise.all([
        fetch('/api/admin/stats', { credentials: 'include' }).then(r => r.json()).catch(() => ({ stats: null })),
        fetch('/api/admin/products', { credentials: 'include' }).then(r => r.json()).catch(() => ({ products: [] })),
        fetch('/api/admin/articles', { credentials: 'include' }).then(r => r.json()).catch(() => ({ articles: [] })),
        fetch('/api/admin/inquiries', { credentials: 'include' }).then(r => r.json()).catch(() => ({ inquiries: [] })),
        fetch('/api/admin/gallery', { credentials: 'include' }).then(r => r.json()).catch(() => ({ gallery: [] })),
        fetch('/api/admin/seo', { credentials: 'include' }).then(r => r.json()).catch(() => ({ seo: null }))
      ]);

      if (statsRes.stats) setStats(statsRes.stats);
      if (prodRes.products) setCommodities(prodRes.products);
      if (artRes.articles) setBlogPosts(artRes.articles);
      if (inqRes.inquiries) setInquiries(inqRes.inquiries);
      if (galRes.gallery) setGalleryItems(galRes.gallery);
      if (seoRes.seo) setSeoConfig(seoRes.seo);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'products', label: 'Komoditas Ekspor', icon: Package, badge: commodities.length },
    { id: 'articles', label: 'Artikel & Wawasan', icon: BookOpen, badge: blogPosts.length },
    { id: 'inquiries', label: 'Permintaan RFQ', icon: Mail, badge: inquiries.filter(i => i.status === 'new' || !i.status).length || null },
    { id: 'gallery', label: 'Galeri Fasilitas', icon: ImageIcon, badge: galleryItems.length },
    { id: 'seo', label: 'Pengaturan SEO', icon: Globe2, badge: null },
    { id: 'security', label: 'Keamanan Akun', icon: ShieldCheck, badge: null }
  ];

  const handleLogoutClick = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      // continue
    }
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white uppercase">DSG Control Panel</div>
              <div className="text-[10px] text-teal-400 font-medium hidden sm:block">
                {COMPANY_PROFILE.legalName}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions, User Profile & Logout */}
        <div className="flex items-center gap-3">
          
          {/* Refresh Data Button */}
          <button
            onClick={() => loadAllAdminData(true)}
            disabled={refreshing}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 text-xs"
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-teal-400' : ''}`} />
            <span>{refreshing ? 'Sinkron...' : 'Sinkronkan'}</span>
          </button>

          {/* View Website Link */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/60 hidden md:flex"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
          </a>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[11px]">
              {currentUser.name.charAt(0)}
            </div>
            <span className="font-bold text-white hidden sm:inline">{currentUser.name}</span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">({currentUser.role})</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>

        </div>

      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900/60 p-4 shrink-0 justify-between">
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Menu Navigasi
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.id === 'inquiries' && item.badge > 0
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Info */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>TLS 1.3 Active</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Protected Session ID: <span className="font-mono text-teal-300">{currentUser.username}</span>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="w-64 h-full bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                  <div className="font-bold text-xs text-white">Menu Control Panel</div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-500 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge !== undefined && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleLogoutClick}
                className="w-full py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
              <div className="text-xs">Memuat data control panel...</div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboardTab
                  stats={stats}
                  commodities={commodities}
                  blogPosts={blogPosts}
                  inquiries={inquiries}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onAddNewProduct={() => setActiveTab('products')}
                  onAddNewArticle={() => setActiveTab('articles')}
                />
              )}

              {activeTab === 'products' && (
                <AdminProductsTab
                  commodities={commodities}
                  onRefresh={() => loadAllAdminData(true)}
                />
              )}

              {activeTab === 'articles' && (
                <AdminArticlesTab
                  blogPosts={blogPosts}
                  onRefresh={() => loadAllAdminData(true)}
                />
              )}

              {activeTab === 'inquiries' && (
                <AdminInquiriesTab
                  inquiries={inquiries}
                  onRefresh={() => loadAllAdminData(true)}
                />
              )}

              {activeTab === 'gallery' && (
                <AdminGalleryTab
                  galleryItems={galleryItems}
                  onRefresh={() => loadAllAdminData(true)}
                />
              )}

              {activeTab === 'seo' && (
                <AdminSeoTab
                  seoConfig={seoConfig}
                  onRefresh={() => loadAllAdminData(true)}
                />
              )}

              {activeTab === 'security' && (
                <AdminSecurityTab
                  currentUser={currentUser}
                />
              )}
            </>
          )}
        </main>

      </div>

    </div>
  );
}

import { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Package, 
  Calculator, 
  FileCheck2, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  Compass, 
  Globe2, 
  ArrowRight,
  ExternalLink,
  Lock
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
}

export default function NotFoundPage({
  onBackToHome,
  onScrollToSection,
  onOpenAdmin,
  onOpenSSLModal,
  onOpenCatalogModal
}: NotFoundPageProps) {
  const { t, currentLang } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 - Halaman Tidak Ditemukan | Dried Seafood Global Supplier';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Quick directory topics to assist lost visitors
  const helpfulDestinations = [
    {
      title: currentLang === 'id' ? 'Katalog Komoditas Global' : 'Global Product Catalog',
      desc: currentLang === 'id' ? 'Teri Nasi Medan, Jambal Roti, Cumi Kering & Fish Maw Grade AAA.' : 'Premium dried whitebait, salted catfish, sun-dried squid & fish maw.',
      icon: Package,
      badge: 'Grade AAA',
      action: () => onScrollToSection('#komoditas')
    },
    {
      title: currentLang === 'id' ? 'Kalkulator Biaya Kontainer' : 'Shipping Freight Calculator',
      desc: currentLang === 'id' ? 'Simulasi tarif pengiriman Reefer FCL & LCL Port-to-Port global.' : 'Instant freight cost estimation for ocean and air cargo.',
      icon: Calculator,
      badge: 'Instant Quote',
      action: () => onScrollToSection('#kalkulator')
    },
    {
      title: currentLang === 'id' ? 'Sertifikasi Karantina & Mutu' : 'Official Certifications',
      desc: currentLang === 'id' ? 'Sertifikat Karantina BKIPM, HACCP Grade A, dan Health Certificate.' : 'BKIPM quarantine health certificate and HACCP Grade A accreditations.',
      icon: FileCheck2,
      badge: 'HACCP Grade A',
      action: () => onScrollToSection('#alur-ekspor')
    },
    {
      title: currentLang === 'id' ? 'Permintaan Penawaran (RFQ)' : 'Request for Quotation (RFQ)',
      desc: currentLang === 'id' ? 'Kirim spesifikasi pesanan B2B langsung ke tim trade desk kami.' : 'Submit institutional purchase inquiries directly to our trade managers.',
      icon: Mail,
      badge: '24h Response',
      action: () => onScrollToSection('#kontak')
    }
  ];

  // Filtered destinations based on user keyword search
  const filteredDestinations = helpfulDestinations.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-[#009bb3] selection:text-white">
      {/* Top Professional Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToHome}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#009bb3] to-[#519992] flex items-center justify-center text-white shadow-xs">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base block">
                DRIED SEAFOOD GLOBAL
              </span>
              <span className="text-[10px] text-[#009bb3] font-bold uppercase tracking-wider block">
                Indonesian Seafood Enterprise
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenSSLModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 EV Verified</span>
            </button>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{currentLang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-[#009bb3] hover:bg-teal-100 border border-teal-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 404 Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col justify-center items-center text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-wide uppercase shadow-2xs mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>HTTP 404 • {currentLang === 'id' ? 'Rute Navigasi Terputus' : 'Route Not Located'}</span>
        </div>

        {/* Large Aesthetic 404 Visual Display */}
        <div className="relative mb-4">
          <div className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#009bb3] via-[#357a74] to-slate-800 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Compass className="w-40 h-40 text-teal-800 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
        </div>

        {/* Primary Message Headings */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight max-w-2xl mb-4 font-serif-display">
          {currentLang === 'id' 
            ? 'Koordinat Halaman Tidak Ditemukan' 
            : 'Trade Resource Coordinates Not Found'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed mb-8">
          {currentLang === 'id'
            ? 'Tautan dokumen, katalog spesifik, atau halaman yang Anda tuju telah dipindahkan ke direktori baru, diperbarui demi kepatuhan regulasi ekspor, atau alamat URL yang dimasukkan kurang tepat.'
            : 'The document link or trade directory you are looking for might have been updated, relocated under international standards, or the URL address was misspelled.'}
        </p>

        {/* Primary Interactive Search Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'id' ? 'Cari komoditas, kalkulator, atau sertifikat...' : 'Search commodities, shipping calculator, or certs...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009bb3] focus:border-[#009bb3] shadow-xs transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-sm font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{currentLang === 'id' ? 'Kembali ke Beranda Utama' : 'Return to Home'}</span>
          </button>

          <button
            onClick={() => onScrollToSection('#komoditas')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-bold shadow-2xs hover:border-[#009bb3] transition-all cursor-pointer"
          >
            <Package className="w-4 h-4 text-[#009bb3]" />
            <span>{currentLang === 'id' ? 'Jelajahi Katalog Komoditas' : 'Explore Commodities'}</span>
          </button>

          <button
            onClick={() => onScrollToSection('#kontak')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#009bb3] border border-teal-200 text-sm font-bold transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{currentLang === 'id' ? 'Hubungi Trade Desk' : 'Contact Trade Desk'}</span>
          </button>
        </div>

        {/* Quick Directory Grid (Helpful Suggestions) */}
        <div className="w-full text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {currentLang === 'id' ? 'Rekomendasi Rute Navigasi Global' : 'Recommended Global Destinations'}
            </h2>
            <span className="text-[11px] text-slate-400">
              {filteredDestinations.length} {currentLang === 'id' ? 'direktori tersedia' : 'available'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDestinations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={item.action}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#009bb3] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#009bb3] group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#009bb3] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#009bb3]">
                    <span>{currentLang === 'id' ? 'Buka Halaman' : 'Visit Page'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assistance Card */}
        <div className="w-full mt-10 p-5 rounded-2xl bg-gradient-to-r from-teal-50/70 to-slate-100 border border-teal-100 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {currentLang === 'id' ? 'Membutuhkan Bantuan Langsung?' : 'Need Direct Commercial Assistance?'}
              </h4>
              <p className="text-xs text-slate-600">
                {currentLang === 'id' 
                  ? `Hubungi hotline ekspor 24/7 kami di ${COMPANY_PROFILE.hotline} atau email ${COMPANY_PROFILE.supportEmail}`
                  : `Contact our 24/7 trade desk at ${COMPANY_PROFILE.hotline} or email ${COMPANY_PROFILE.supportEmail}`}
              </p>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-all shrink-0 shadow-2xs"
          >
            {COMPANY_PROFILE.hotline}
          </a>
        </div>

      </main>

      {/* Corporate Compliance Sub-footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {COMPANY_PROFILE.legalName}. {t.footer?.rightsReserved || 'All Rights Reserved'}.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 DigiCert EV SSL</span>
            </span>
            <span>•</span>
            <span className="text-slate-600">HACCP Grade A Certified</span>
            <span>•</span>
            <button onClick={onBackToHome} className="text-[#009bb3] hover:underline font-semibold cursor-pointer">
              {currentLang === 'id' ? 'Kembali ke Beranda' : 'Return to Home'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { 
  Fish, 
  ShieldCheck, 
  Lock, 
  Calculator, 
  Image as ImageIcon, 
  BookOpen, 
  MapPin, 
  Mail, 
  Menu, 
  X,
  PhoneCall,
  ChevronDown,
  FileText,
  Star,
  Award,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSSLModal: () => void;
  onScrollTo?: (id: string) => void;
  activeSection?: string;
  activeVisitors?: number;
}

export default function Navbar({ 
  onOpenAdmin, 
  onOpenSSLModal, 
  onScrollTo, 
  activeSection = 'hero', 
  activeVisitors = 42 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary streamlined desktop nav items
  const primaryNavLinks = [
    { label: 'Beranda', href: '#hero', id: 'hero' },
    { label: 'Tentang & Mutu', href: '#tentang', id: 'tentang' },
    { label: 'Katalog Produk', href: '#komoditas', id: 'komoditas' },
    { label: 'Alur Ekspor', href: '#alur-ekspor', id: 'alur-ekspor' },
    { label: 'Estimasi Ongkir', href: '#kalkulator', id: 'kalkulator' }
  ];

  // Secondary items grouped in a clean dropdown to avoid overcrowding
  const explorationLinks = [
    { 
      label: 'Galeri Sentra & Fasilitas', 
      desc: 'Dokumentasi Solar Dome, grading, & gudang higienis', 
      href: '#galeri', 
      id: 'galeri', 
      icon: ImageIcon 
    },
    { 
      label: 'Peta Sentra & Hub Ekspor', 
      desc: 'Lokasi kantor Jakarta, Belawan, Cilacap, & Surabaya', 
      href: '#lokasi', 
      id: 'lokasi', 
      icon: MapPin 
    },
    { 
      label: 'Testimoni Importir Global', 
      desc: 'Ulasan pembeli dari Singapura, Taiwan, AS, & UEA', 
      href: '#testimoni', 
      id: 'testimoni', 
      icon: Star 
    },
    { 
      label: 'Wawasan & Riset Pasar', 
      desc: 'Panduan regulasi karantina BKIPM & tren komoditas', 
      href: '#blog', 
      id: 'blog', 
      icon: BookOpen 
    }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (onScrollTo) {
      onScrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isExplorationActive = explorationLinks.some(link => link.id === activeSection);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300 shadow-2xl">
      
      {/* 1. TOP ENTERPRISE DASHBOARD STATUS BAR */}
      <div className="bg-slate-950 border-b border-slate-850 py-1.5 px-3 sm:px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Security & Live Export Operational Badges */}
          <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto scrollbar-none py-0.5">
            {/* SSL Verification Badge */}
            <button 
              onClick={onOpenSSLModal}
              id="top-ssl-badge-btn"
              title="Klik untuk melihat rincian sertifikat Extended Validation (EV) SSL"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="whitespace-nowrap">TLS 1.3 EV SSL Terverifikasi</span>
            </button>

            {/* Live Traffic Metric */}
            <div className="hidden sm:inline-flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Monitor: <strong className="text-slate-200 font-mono">{activeVisitors}</strong> Buyer Online</span>
            </div>

            {/* Quality Standard Chip */}
            <div className="hidden lg:inline-flex items-center gap-1 text-[11px] text-amber-300/90 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full shrink-0">
              <Award className="w-3 h-3 text-amber-400" />
              <span>HACCP Grade A • Karantina BKIPM</span>
            </div>
          </div>

          {/* Right: Hotline, Language & Admin Portal */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto">
            {/* 24/7 Hotline Direct Dial */}
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
              id="top-hotline-link"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span className="text-slate-400">Hotline 24/7:</span>
              <strong className="text-white font-mono tracking-tight">{COMPANY_PROFILE.hotline}</strong>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button 
                onClick={() => setCurrentLang('ID')}
                id="btn-lang-id"
                aria-label="Bahasa Indonesia"
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  currentLang === 'ID' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ID
              </button>
              <button 
                onClick={() => setCurrentLang('EN')}
                id="btn-lang-en"
                aria-label="English"
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  currentLang === 'EN' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Admin CMS Portal Button */}
            <button 
              onClick={onOpenAdmin}
              id="btn-open-admin-top"
              title="Buka Portal Manajemen Ekspor & CMS Admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-400 px-2.5 py-1 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Portal Admin</span>
              <span className="sm:hidden">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Identity */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            id="brand-logo-link"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all border border-amber-400/40 shrink-0">
              <Fish className="w-6 h-6 text-slate-950 transition-transform group-hover:rotate-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors font-serif">
                  DRIED SEAFOOD
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wider">
                  GLOBAL
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-wide text-slate-400 uppercase leading-none mt-0.5">
                Eksportir Ikan & Hasil Laut Khas Indonesia
              </p>
            </div>
          </a>

          {/* Streamlined Desktop Navigation (Fits perfectly without wrapping) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {primaryNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Dropdown for Secondary Links (Galeri, Peta, Testimoni, Blog) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                id="nav-dropdown-toggle"
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isExplorationActive || dropdownOpen
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent'
                }`}
              >
                <span>Dokumentasi & Hub</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                    Eksplorasi & Wawasan Ekspor
                  </div>
                  {explorationLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        id={`dropdown-link-${item.id}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300' 
                            : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                          isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.label}</div>
                          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RFQ Direct Contact Link */}
            <a
              href="#kontak"
              id="nav-link-kontak"
              onClick={(e) => { e.preventDefault(); handleNavClick('#kontak'); }}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                activeSection === 'kontak'
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent'
              }`}
            >
              Kontak RFQ
            </a>
          </nav>

          {/* Quick CTA Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button: RFQ Quotation Request */}
            <button
              onClick={() => handleNavClick('#kontak')}
              id="btn-nav-rfq-cta"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Minta Penawaran (RFQ)</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPREHENSIVE RESPONSIVE MOBILE MENU SHEET */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-8 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          {/* Section 1: Main Commercial Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-3 py-1">
              Navigasi Utama
            </div>
            {primaryNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                id={`mobile-nav-link-${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 font-bold'
                    : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Section 2: Exploration & Visual Documentation */}
          <div className="space-y-1 pt-2 border-t border-slate-850">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Dokumentasi & Hub Ekspor
            </div>
            {explorationLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  id={`mobile-dropdown-link-${item.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === item.id
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Section 3: Contact & Direct Action Buttons */}
          <div className="pt-3 border-t border-slate-850 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#kontak'); }}
              id="mobile-btn-rfq"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Minta Penawaran Harga (RFQ)</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#kalkulator'); }}
              id="mobile-btn-calculator"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-800"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Cek Estimasi Ongkir Kargo</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              id="mobile-btn-admin-open"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900/60 border border-slate-800 text-slate-300 font-medium py-2 rounded-xl text-xs hover:bg-slate-800 hover:text-amber-400"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Buka Admin CMS Management Portal</span>
            </button>
          </div>

          {/* Mobile Direct Phone Dial */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Hotline Ekspor 24 Jam:</span>
            </div>
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`} 
              className="text-white font-bold font-mono hover:text-amber-400"
            >
              {COMPANY_PROFILE.hotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

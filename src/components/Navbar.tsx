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
  Star,
  Award,
  Globe2,
  Check
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
  onScrollTo?: (id: string) => void;
  activeSection?: string;
  activeVisitors?: number;
}

export default function Navbar({ 
  onOpenAdmin, 
  onOpenSSLModal, 
  onOpenCatalogModal,
  onScrollTo, 
  activeSection = 'hero', 
  activeVisitors = 42 
}: NavbarProps) {
  const { currentLang, setLanguage, t, availableLanguages, currentLanguageOption } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick navigation items matching Shrimora categories (SALTED, NATURAL, DRIED, PACKED)
  const categoryShortcuts = [
    { label: 'SALTED', href: '#komoditas', id: 'komoditas-salted' },
    { label: 'NATURAL', href: '#komoditas', id: 'komoditas-natural' },
    { label: 'DRIED', href: '#komoditas', id: 'komoditas-dried' },
    { label: 'PACKED', href: '#komoditas', id: 'komoditas-packed' }
  ];

  // Primary streamlined desktop nav items
  const primaryNavLinks = [
    { label: t.nav.home, href: '#hero', id: 'hero' },
    { label: t.nav.about, href: '#tentang', id: 'tentang' },
    { label: t.nav.products, href: '#komoditas', id: 'komoditas' },
    { label: t.nav.workflow, href: '#alur-ekspor', id: 'alur-ekspor' },
    { label: t.nav.shippingCalc, href: '#kalkulator', id: 'kalkulator' }
  ];

  // Secondary items grouped in a clean dropdown
  const explorationLinks = [
    { 
      label: t.nav.gallery, 
      desc: t.nav.galleryDesc, 
      href: '#galeri', 
      id: 'galeri', 
      icon: ImageIcon 
    },
    { 
      label: t.nav.mapHubs, 
      desc: t.nav.mapHubsDesc, 
      href: '#lokasi', 
      id: 'lokasi', 
      icon: MapPin 
    },
    { 
      label: t.nav.testimonials, 
      desc: t.nav.testimonialsDesc, 
      href: '#testimoni', 
      id: 'testimoni', 
      icon: Star 
    },
    { 
      label: t.nav.insights, 
      desc: t.nav.insightsDesc, 
      href: '#blog', 
      id: 'blog', 
      icon: BookOpen 
    }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setLangDropdownOpen(false);
    if (onScrollTo) {
      onScrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const isExplorationActive = explorationLinks.some(link => link.id === activeSection);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 transition-all duration-300 shadow-sm">
      
      {/* 1. TOP ENTERPRISE DASHBOARD STATUS BAR */}
      <div className="bg-[#f0f9f8] border-b border-teal-100/80 py-1.5 px-2.5 sm:px-6 text-xs text-slate-600 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Left: Security & Live Export Operational Badges */}
          <div className="flex items-center gap-1.5 sm:gap-4 min-w-0 overflow-hidden py-0.5">
            {/* SSL Verification Badge */}
            <button 
              onClick={onOpenSSLModal}
              id="top-ssl-badge-btn"
              title="Click to view Extended Validation (EV) SSL certificate details"
              className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-semibold bg-teal-50 border border-teal-200 hover:border-teal-400 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#009bb3] shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t.topBar.sslVerified}</span>
              <span className="sm:hidden whitespace-nowrap font-bold">TLS 1.3 EV SSL</span>
            </button>

            {/* Live Traffic Metric */}
            <button
              onClick={onOpenAdmin}
              id="top-bar-live-analytics-btn"
              title="Lihat Detail Analitik Pengunjung Real-Time & Integrasi Google"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-400 px-2.5 py-0.5 rounded-full shrink-0 transition-all cursor-pointer shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009bb3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009bb3]"></span>
              </span>
              <span>{t.topBar.liveMonitor}: <strong className="text-[#009bb3] font-mono font-bold">{activeVisitors}</strong> {t.topBar.buyersOnline}</span>
            </button>

            {/* Quality Standard Chip */}
            <div className="hidden lg:inline-flex items-center gap-1 text-[11px] text-teal-800 font-semibold bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full shrink-0">
              <Award className="w-3 h-3 text-[#009bb3]" />
              <span>{t.topBar.qualityBadge}</span>
            </div>
          </div>

          {/* Right: Hotline, Multilingual Selector & Admin Portal */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 ml-auto">
            {/* 24/7 Hotline Direct Dial */}
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
              id="top-hotline-link"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-[#009bb3] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#009bb3]" />
              <span className="text-slate-500">{t.topBar.hotlineLabel}</span>
              <strong className="text-slate-900 font-mono tracking-tight">{COMPANY_PROFILE.hotline}</strong>
            </a>

            {/* Global Multilingual Selector Dropdown (5 Languages) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="btn-lang-selector-top"
                aria-label="Change Website Language & Country Locale"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-teal-400 text-slate-700 hover:text-slate-900 transition-all cursor-pointer text-xs font-semibold shadow-xs"
              >
                <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
                <span className="font-bold text-[11px] text-[#009bb3] uppercase tracking-wide">{currentLanguageOption.code}</span>
                <span className="hidden sm:inline text-slate-600 text-[11px]">({currentLanguageOption.name})</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180 text-[#009bb3]' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-[#009bb3] uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center gap-1.5">
                    <Globe2 className="w-3 h-3" />
                    <span>Select Language / 语言 / 言語 / لغة</span>
                  </div>
                  {availableLanguages.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all text-left cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-50 text-[#009bb3] font-bold border border-teal-200' 
                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <div>
                            <div className="font-semibold text-slate-900">{lang.nativeName}</div>
                            <div className="text-[10px] text-slate-500">{lang.region}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Admin CMS Portal Button */}
            <button 
              onClick={onOpenAdmin}
              id="btn-open-admin-top"
              title="Open Export Management Portal & CMS"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 hover:border-teal-300 px-2 sm:px-2.5 py-1 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#009bb3]" />
              <span className="hidden sm:inline">{t.topBar.adminPortal}</span>
              <span className="sm:hidden font-bold">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Identity (SHRIMORA Marine Emblem) */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            id="brand-logo-link"
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0 max-w-[calc(100%-54px)] sm:max-w-none cursor-pointer"
          >
            {/* Stylized Shrimora Fish & Marine Seal in Sea-Green */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#eef7f6] border-2 border-[#519992] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all shrink-0">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 text-[#519992]" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" />
                {/* Stylized fish curve */}
                <path d="M 28 45 C 38 28 65 28 75 42 C 65 42 50 48 35 48" stroke="currentColor" strokeWidth="5" />
                <path d="M 35 55 C 50 55 65 60 75 58 C 65 72 38 72 28 55 Z" fill="#519992" fillOpacity="0.18" stroke="currentColor" strokeWidth="5" />
                <circle cx="65" cy="40" r="3.5" fill="#519992" />
                <path d="M 72 50 C 80 48 86 44 88 40" stroke="currentColor" strokeWidth="4" />
                <path d="M 72 54 C 80 56 86 60 88 64" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-[#009bb3] transition-colors truncate font-sans">
                  SHRIMORA
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 tracking-wider shrink-0">
                  EXPORT
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-slate-500 uppercase leading-none mt-0.5 truncate">
                DRIED SEAFOOD INDONESIA
              </p>
            </div>
          </a>

          {/* Quick Shrimora Category Shortcuts from Image (SALTED, NATURAL, DRIED, PACKED) */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-widest text-slate-600 uppercase">
            {categoryShortcuts.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick('#komoditas')}
                className="hover:text-[#009bb3] transition-colors py-1 cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Streamlined Desktop Navigation */}
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
                      ? 'text-[#009bb3] bg-teal-50 border border-teal-200 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
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
                    ? 'text-[#009bb3] bg-teal-50 border border-teal-200 font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <span>{t.nav.docsHub}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#009bb3]' : 'text-slate-400'}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#009bb3] uppercase tracking-wider border-b border-slate-100 mb-1">
                    {t.nav.docsHub}
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
                            ? 'bg-teal-50 border border-teal-200 text-teal-900' 
                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                          isActive ? 'bg-teal-100 text-[#009bb3]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.label}</div>
                          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* The Signature SHRIMORA Teal Gradient Pill CTA Button (From Image) */}
            <button
              onClick={onOpenCatalogModal || (() => handleNavClick('#komoditas'))}
              id="nav-btn-shrimora-cta"
              className="ml-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-black text-xs tracking-widest uppercase shadow-md shadow-teal-500/20 hover:shadow-teal-500/35 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              SHRIMORA
            </button>
          </nav>

          {/* Mobile Right: Pill CTA & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenCatalogModal || (() => handleNavClick('#komoditas'))}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-extrabold text-[11px] tracking-wider uppercase shadow-sm"
            >
              SHRIMORA
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bb3] cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#009bb3]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPREHENSIVE RESPONSIVE MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-xl">
          
          {/* Mobile Quick Category Shortcuts */}
          <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-100">
            <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider mb-2">
              Kategori Komoditas Cepat
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoryShortcuts.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('#komoditas')}
                  className="px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-800 font-bold text-xs hover:border-[#009bb3] transition-all text-center"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-[#009bb3] uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Select Language / Bahasa / 语言</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                    currentLang === lang.code
                      ? 'bg-[#009bb3] text-white font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="truncate">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Main Commercial Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider px-3 py-1">
              Menu Utama
            </div>
            {primaryNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                id={`mobile-nav-link-${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'text-[#009bb3] bg-teal-50 border border-teal-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Section 2: Exploration & Visual Documentation */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1">
              {t.nav.docsHub}
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
                      ? 'text-[#009bb3] bg-teal-50 border border-teal-200 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#009bb3] shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Section 3: Contact & Direct Action Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCatalogModal ? onOpenCatalogModal() : handleNavClick('#komoditas'); }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
            >
              <span>Buka Katalog Produk Shrimora</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#kalkulator'); }}
              id="mobile-btn-calculator"
              className="w-full inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50"
            >
              <Calculator className="w-4 h-4 text-[#009bb3]" />
              <span>{t.nav.shippingCalc}</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              id="mobile-btn-admin-open"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium py-2 rounded-xl text-xs hover:bg-slate-100"
            >
              <Lock className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>{t.nav.adminOpen}</span>
            </button>
          </div>

          {/* Mobile Direct Phone Dial */}
          <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#009bb3]" />
              <span>{t.nav.hotline24h}</span>
            </div>
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`} 
              className="text-slate-900 font-bold font-mono hover:text-[#009bb3]"
            >
              {COMPANY_PROFILE.hotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

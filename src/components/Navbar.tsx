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

  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll to add shadow and ensure sticky navbar stays visible
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-xs'}`}>
      
      {/* 1. TOP ENTERPRISE STATUS & COMPLIANCE BAR */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-1.5 px-3 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Security & Official Export Accreditations */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={onOpenSSLModal}
              id="top-ssl-badge-btn"
              title="Sertifikat Ekspor Resmi: HACCP Grade A, KKP RI & TLS 1.3 EV SSL"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-bold text-slate-900 text-[11px] sm:text-xs">HACCP Grade A</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-600 hidden sm:inline">KKP RI Certified</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px] hidden md:inline">TLS 1.3 EV</span>
            </button>

            <span className="text-slate-300 hidden md:inline">|</span>

            {/* Live Global Activity Indicator */}
            <button
              onClick={onOpenAdmin}
              id="top-bar-live-analytics-btn"
              title="Lihat Telemetri & Aktivitas Buyer Global Real-Time"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span><strong className="text-teal-700 font-mono font-bold">{activeVisitors}</strong> {t.topBar.buyersOnline}</span>
            </button>
          </div>

          {/* Right: Hotline, Multilingual Selector & Admin Portal */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto">
            {/* 24/7 Direct Export Desk Phone */}
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
              id="top-hotline-link"
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-teal-700 transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-teal-600" />
              <span className="text-slate-500">{t.topBar.hotlineLabel}</span>
              <strong className="text-slate-900 font-mono tracking-tight">{COMPANY_PROFILE.hotline}</strong>
            </a>

            {/* Global Multilingual Selector Dropdown - Hidden on Mobile to keep top bar uncluttered; available in Mobile Menu */}
            <div className="relative hidden sm:block" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="btn-lang-selector-top"
                aria-label="Change Website Language & Country Locale"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-teal-500 text-slate-700 hover:text-slate-900 transition-all cursor-pointer text-xs font-semibold shadow-2xs"
              >
                <Globe2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="font-bold text-[11px] text-teal-700 uppercase tracking-wide">{currentLanguageOption.code}</span>
                <span className="hidden md:inline text-slate-600 text-[11px]">({currentLanguageOption.name})</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 animate-fadeIn max-h-88 overflow-y-auto">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold text-teal-700 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                    <div className="flex items-center gap-1.5">
                      <Globe2 className="w-3 h-3 text-teal-600" />
                      <span>Select Language ({availableLanguages.length})</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-normal">Global Export</span>
                  </div>
                  <div className="space-y-0.5">
                    {availableLanguages.map((lang) => {
                      const isSelected = lang.code === currentLang;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left cursor-pointer ${
                            isSelected 
                              ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200' 
                              : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{lang.flag}</span>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 truncate leading-tight">{lang.nativeName}</div>
                              <div className="text-[10px] text-slate-500 truncate">{lang.name} • {lang.region}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Portal Button */}
            <button 
              onClick={onOpenAdmin}
              id="btn-open-admin-top"
              title="Buka Portal Manajemen Ekspor & CMS"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-md transition-all shadow-2xs cursor-pointer"
            >
              <Lock className="w-3 h-3 text-teal-600" />
              <span className="hidden sm:inline">{t.topBar.adminPortal}</span>
              <span className="sm:hidden font-bold">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Corporate Identity (Fixed width, never truncated) */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            id="brand-logo-link"
            className="flex items-center gap-3 shrink-0 cursor-pointer group"
          >
            {/* Marine Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-xs group-hover:border-teal-400 group-hover:scale-105 transition-all shrink-0">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" />
                <path d="M 28 45 C 38 28 65 28 75 42 C 65 42 50 48 35 48" stroke="currentColor" strokeWidth="5" />
                <path d="M 35 55 C 50 55 65 60 75 58 C 65 72 38 72 28 55 Z" fill="#0d9488" fillOpacity="0.18" stroke="currentColor" strokeWidth="5" />
                <circle cx="65" cy="40" r="3.5" fill="#0d9488" />
                <path d="M 72 50 C 80 48 86 44 88 40" stroke="currentColor" strokeWidth="4" />
                <path d="M 72 54 C 80 56 86 60 88 64" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            
            {/* Full Unclipped Brand Name & Subtitle */}
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors font-sans whitespace-nowrap">
                  SHRIMORA
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 tracking-wider">
                  EXPORT
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap leading-tight">
                DRIED SEAFOOD INDONESIA
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-auto">
            {primaryNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-teal-800 bg-teal-50/90 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isExplorationActive || dropdownOpen
                    ? 'text-teal-800 bg-teal-50/90 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{t.nav.docsHub}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-teal-700' : 'text-slate-400'}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-teal-700 uppercase tracking-wider border-b border-slate-100 mb-1">
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
                          isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'
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

            {/* High-Converting Executive RFQ Quote CTA Button */}
            <button
              onClick={() => handleNavClick('#kontak')}
              id="nav-btn-rfq-cta"
              className="ml-2 inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs xl:text-[13px] shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t.nav.requestRfqBtn}</span>
            </button>
          </nav>

          {/* Mobile Right: RFQ CTA & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('#kontak')}
              className="px-3 py-1.5 rounded-lg bg-teal-700 text-white font-bold text-xs shadow-xs"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-teal-700" /> : <Menu className="w-5 h-5" />}
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
            <div className="flex items-center justify-between text-[11px] font-bold text-[#009bb3] uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Language / Bahasa ({availableLanguages.length})</span>
              </div>
              <span className="text-[10px] text-slate-600 font-normal">Global</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-0.5">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all text-left ${
                    currentLang === lang.code
                      ? 'bg-[#009bb3] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base shrink-0">{lang.flag}</span>
                  <div className="min-w-0">
                    <div className="truncate font-semibold leading-tight">{lang.nativeName}</div>
                    <div className={`text-[9px] truncate ${currentLang === lang.code ? 'text-teal-100' : 'text-slate-500'}`}>{lang.name}</div>
                  </div>
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

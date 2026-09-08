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
              title="Click to view Extended Validation (EV) SSL certificate details"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="whitespace-nowrap">{t.topBar.sslVerified}</span>
            </button>

            {/* Live Traffic Metric */}
            <div className="hidden sm:inline-flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.topBar.liveMonitor}: <strong className="text-slate-200 font-mono">{activeVisitors}</strong> {t.topBar.buyersOnline}</span>
            </div>

            {/* Quality Standard Chip */}
            <div className="hidden lg:inline-flex items-center gap-1 text-[11px] text-amber-300/90 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full shrink-0">
              <Award className="w-3 h-3 text-amber-400" />
              <span>{t.topBar.qualityBadge}</span>
            </div>
          </div>

          {/* Right: Hotline, Multilingual Selector & Admin Portal */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 ml-auto">
            {/* 24/7 Hotline Direct Dial */}
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
              id="top-hotline-link"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span className="text-slate-400">{t.topBar.hotlineLabel}</span>
              <strong className="text-white font-mono tracking-tight">{COMPANY_PROFILE.hotline}</strong>
            </a>

            {/* Global Multilingual Selector Dropdown (5 Languages) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="btn-lang-selector-top"
                aria-label="Change Website Language & Country Locale"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-750 hover:border-amber-500/50 text-slate-200 hover:text-white transition-all cursor-pointer text-xs font-semibold shadow-sm"
              >
                <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
                <span className="font-bold text-[11px] text-amber-400 uppercase tracking-wide">{currentLanguageOption.code}</span>
                <span className="hidden sm:inline text-slate-300 text-[11px]">({currentLanguageOption.name})</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center gap-1.5">
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
                            ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30' 
                            : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <div>
                            <div className="font-semibold text-slate-100">{lang.nativeName}</div>
                            <div className="text-[10px] text-slate-400">{lang.region}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-400 px-2.5 py-1 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">{t.topBar.adminPortal}</span>
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
                INDONESIA CERTIFIED EXPORT TRADING
              </p>
            </div>
          </a>

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
                <span>{t.nav.docsHub}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
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
              {t.nav.contactRfq}
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPREHENSIVE RESPONSIVE MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-8 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          
          {/* Mobile Language Switcher Row */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
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
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-850 text-slate-200 hover:bg-slate-800'
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
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-3 py-1">
              Main Menu
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
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#kalkulator'); }}
              id="mobile-btn-calculator"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-800"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.nav.shippingCalc}</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              id="mobile-btn-admin-open"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900/60 border border-slate-800 text-slate-300 font-medium py-2 rounded-xl text-xs hover:bg-slate-800 hover:text-amber-400"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.adminOpen}</span>
            </button>
          </div>

          {/* Mobile Direct Phone Dial */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{t.nav.hotline24h}</span>
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

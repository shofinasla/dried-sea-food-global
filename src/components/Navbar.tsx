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
  Check,
  Building2,
  Package,
  Layers,
  Sparkles,
  Ship
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface NavbarProps {
  onOpenAdmin?: () => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
  onScrollTo?: (id: string) => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
  activeSection?: string;
  activeVisitors?: number;
}

export default function Navbar({ 
  onOpenSSLModal, 
  onOpenCatalogModal,
  onScrollTo, 
  onNavigate,
  currentPath = '/',
  activeSection = 'hero', 
  activeVisitors = 42 
}: NavbarProps) {
  const { currentLang, setLanguage, t, availableLanguages, currentLanguageOption } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll
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
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (path: string, anchorId?: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setLangDropdownOpen(false);

    if (path.startsWith('/#') || (path.startsWith('#') && (currentPath === '/' || currentPath === '/index.html'))) {
      const anchor = path.startsWith('/#') ? path.slice(1) : path;
      if (currentPath === '/' || currentPath === '/index.html') {
        if (onScrollTo) {
          onScrollTo(anchor);
        } else {
          const el = document.querySelector(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }

    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    if (onNavigate) {
      if (code === 'en') {
        onNavigate('/');
      } else {
        onNavigate(`/${code}`);
      }
    }
  };

  const productSubmenu = [
    { label: 'All Export Commodities', path: '/products', desc: 'Full B2B catalog & specifications' },
    { label: 'Super White Anchovy (Teri Nasi)', path: '/products/dried-anchovy', desc: 'Grade AAA, sun-dried, 0% formalin' },
    { label: 'Sun-Dried Squid (Cumi Sero)', path: '/products/dried-squid', desc: 'Whole dried calamari, moisture <14%' },
    { label: 'Dried Shrimp / Ebi Premium', path: '/products/dried-shrimp', desc: 'Clean, headless, natural sea-red' },
    { label: 'Salted Giant Catfish (Jambal Roti)', path: '/products/dried-fish', desc: 'Thick fillet, flaky texture, gourmet export' },
    { label: 'Premium Fish Maw (Gelembung Ikan)', path: '/products/fish-maw', desc: 'High collagen, vacuum packed' },
    { label: 'Dried Sea Cucumber (Teripang Pasir)', path: '/products/sea-cucumber', desc: 'Sandfish / teatfish, premium grade' }
  ];

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Articles', path: '/insights' }
  ];

  const isCurrentActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html')) return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-xs'}`}>
      
      {/* 1. TOP ENTERPRISE STATUS & COMPLIANCE BAR */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-1.5 px-3 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Security & Official Accreditations */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={onOpenSSLModal}
              id="top-ssl-badge-btn"
              title="Official Certifications: HACCP Grade A, BKIPM KKP RI, TLS 1.3 EV SSL"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#009bb3] font-medium transition-colors cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
              <span className="font-bold text-slate-900 text-[11px] sm:text-xs"></span>
              <span className="text-slate-300"></span>
              <span className="text-[11px] text-slate-600 hidden sm:inline"></span>
              <span className="text-slate-300 hidden sm:inline"></span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px] hidden md:inline"></span>
            </button>

            <span className="text-slate-300 hidden md:inline">|</span>

            {/* Live Global Activity Indicator */}
            <div
              id="top-bar-live-analytics-badge"
              title="Live Active Importers & Buyers"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-600 shrink-0 select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009bb3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009bb3]"></span>
              </span>
              <span><strong className="text-[#009bb3] font-mono font-bold">{activeVisitors}</strong> Verified Buyers Online</span>
            </div>
          </div>

          {/* Right: Direct Hotline & International Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a 
              href={`tel:${COMPANY_PROFILE.hotline.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-700 hover:text-[#009bb3] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#009bb3]" />
              <span className="font-semibold text-[11px]">Hotline: {COMPANY_PROFILE.hotline}</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="language-selector-btn"
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#009bb3]" />
                <span>{currentLanguageOption.name}</span>
                <span className="text-xs uppercase font-mono font-bold text-slate-500">({currentLang})</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-2 py-1 text-[9px] font-bold text-[#009bb3] uppercase tracking-wider border-b border-slate-100 mb-1">
                    Select Language / Bahasa
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
                              ? 'bg-cyan-50 text-[#009bb3] font-bold border border-cyan-200' 
                              : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{lang.flag}</span>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 truncate leading-tight flex items-center gap-1.5">
                                <span>{lang.nativeName}</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                                  {lang.code === 'en' ? '/' : `/${lang.code}/`}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">{lang.name} • {lang.region}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#009bb3] shrink-0 ml-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Corporate Identity */}
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}
            id="brand-logo-link"
            className="flex items-center gap-3 shrink-0 cursor-pointer group"
            aria-label="Dried Seafood Global home"
          >
            <img
              src="/logo-dsg.png"
              alt="Dried Seafood Global logo"
              className="h-10 w-auto sm:h-11 object-contain drop-shadow-sm transition-transform group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Clean Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-auto">
            {/* Home */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                isCurrentActive('/') && !currentPath.includes('/products') && !currentPath.includes('/export') && !currentPath.includes('/quality') && !currentPath.includes('/facility') && !currentPath.includes('/about') && !currentPath.includes('/markets') && !currentPath.includes('/insights') && !currentPath.includes('/request-quote')
                  ? 'text-[#009bb3] bg-cyan-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div className="relative" ref={productsDropdownRef}>
              <button
                type="button"
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  currentPath.startsWith('/products') || productsDropdownOpen
                    ? 'text-[#009bb3] bg-cyan-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-[#009bb3]' : 'text-slate-400'}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#009bb3] uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span>Export Commodities</span>
                    <button 
                      onClick={() => handleLinkClick('/products')}
                      className="text-slate-500 hover:text-[#009bb3] text-[10px] font-semibold"
                    >
                      View All Catalog &rarr;
                    </button>
                  </div>
                  {productSubmenu.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => handleLinkClick(sub.path)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50/70 transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-100/60 text-[#009bb3] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#009bb3] group-hover:text-white transition">
                        <Fish className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors">{sub.label}</div>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{sub.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Nav Items */}
            {navLinks.slice(1).map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                  isCurrentActive(link.path)
                    ? 'text-[#009bb3] bg-cyan-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Contact Us CTA Button */}
            <button
              onClick={() => handleLinkClick('/request-quote')}
              id="nav-btn-rfq-cta"
              className="ml-2 inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs xl:text-[13px] shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>CONTACT US</span>
            </button>
          </nav>

          {/* Mobile Right: Contact Us CTA & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('/request-quote')}
              className="px-3 py-1.5 rounded-lg bg-[#009bb3] text-white font-bold text-xs shadow-xs"
            >
              Contact Us
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#009bb3] cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#009bb3]" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-xl">
          {/* Main Links */}
          <div className="space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-cyan-50"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('/products')}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-cyan-50"
            >
              Products Catalog
            </button>
            <div className="pl-4 space-y-1 border-l-2 border-cyan-100 ml-2">
              <button
                onClick={() => handleLinkClick('/products/dried-anchovy')}
                className="w-full text-left text-xs py-1 text-slate-600 hover:text-[#009bb3]"
              >
                • Super White Anchovy (Teri Nasi)
              </button>
              <button
                onClick={() => handleLinkClick('/products/dried-squid')}
                className="w-full text-left text-xs py-1 text-slate-600 hover:text-[#009bb3]"
              >
                • Sun-Dried Squid (Cumi Sero)
              </button>
              <button
                onClick={() => handleLinkClick('/products/dried-shrimp')}
                className="w-full text-left text-xs py-1 text-slate-600 hover:text-[#009bb3]"
              >
                • Dried Shrimp (Ebi Super)
              </button>
              <button
                onClick={() => handleLinkClick('/products/dried-fish')}
                className="w-full text-left text-xs py-1 text-slate-600 hover:text-[#009bb3]"
              >
                • Salted Dried Fish (Jambal Roti)
              </button>
            </div>
            <button
              onClick={() => handleLinkClick('/about')}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-cyan-50"
            >
              About Company
            </button>
            <button
              onClick={() => handleLinkClick('/insights')}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-slate-800 hover:bg-cyan-50"
            >
              Articles
            </button>
            <button
              onClick={() => handleLinkClick('/request-quote')}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-sm text-[#009bb3] bg-cyan-50"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Language Selection */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Language</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => handleSelectLanguage('en')}
                className={`p-2 rounded-lg border text-center font-bold ${currentLang === 'en' ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50' : 'border-slate-200 text-slate-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => handleSelectLanguage('id')}
                className={`p-2 rounded-lg border text-center font-bold ${currentLang === 'id' ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50' : 'border-slate-200 text-slate-700'}`}
              >
                ID
              </button>
              <button
                onClick={() => handleSelectLanguage('ar')}
                className={`p-2 rounded-lg border text-center font-bold ${currentLang === 'ar' ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50' : 'border-slate-200 text-slate-700'}`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

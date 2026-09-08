import { useState } from 'react';
import { 
  Fish, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Calculator, 
  Image as ImageIcon, 
  BookOpen, 
  MapPin, 
  Mail, 
  Menu, 
  X,
  PhoneCall,
  Activity
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenSSLModal: () => void;
  onScrollTo?: (id: string) => void;
  activeSection?: string;
  activeVisitors?: number;
}

export default function Navbar({ onOpenAdmin, onOpenSSLModal, onScrollTo, activeSection = 'hero', activeVisitors = 42 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ID' | 'EN'>('ID');

  const navLinks = [
    { label: 'Beranda', href: '#hero', id: 'hero' },
    { label: 'Profil & Layanan', href: '#tentang', id: 'tentang' },
    { label: 'Katalog Komoditas', href: '#komoditas', id: 'komoditas' },
    { label: 'Alur Ekspor', href: '#alur-ekspor', id: 'alur-ekspor' },
    { label: 'Estimasi Ongkir', href: '#kalkulator', id: 'kalkulator' },
    { label: 'Galeri Foto', href: '#galeri', id: 'galeri' },
    { label: 'Peta & Hub', href: '#lokasi', id: 'lokasi' },
    { label: 'Testimoni Global', href: '#testimoni', id: 'testimoni' },
    { label: 'Blog & Riset', href: '#blog', id: 'blog' },
    { label: 'Kontak RFQ', href: '#kontak', id: 'kontak' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onScrollTo) {
      onScrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      {/* Top Banner: Enterprise Security & Live Global Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-4 flex-wrap">
            <button 
              onClick={onOpenSSLModal}
              id="top-ssl-badge-btn"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-0.5 rounded-full"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 256-Bit SSL Enkripsi Terverifikasi</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Trafik Real-time: <strong className="text-slate-200">{activeVisitors}</strong> Pengunjung Aktif</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 ml-auto sm:ml-0">
            <span className="hidden md:inline-flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-slate-400" />
              Hotline 24/7: <strong className="text-slate-200">{COMPANY_PROFILE.hotline}</strong>
            </span>
            <div className="flex items-center bg-slate-800/80 rounded-md p-0.5 border border-slate-700/60">
              <button 
                onClick={() => setCurrentLang('ID')}
                id="btn-lang-id"
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  currentLang === 'ID' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ID
              </button>
              <button 
                onClick={() => setCurrentLang('EN')}
                id="btn-lang-en"
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  currentLang === 'EN' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>
            <button 
              onClick={onOpenAdmin}
              id="btn-open-admin-top"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-400 font-medium transition-colors bg-slate-800/90 border border-slate-700 hover:border-amber-500/50 px-2.5 py-0.5 rounded-md"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            id="brand-logo-link"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform border border-amber-400/40">
              <Fish className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-100 group-hover:text-amber-400 transition-colors">
                  DRIED SEAFOOD
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  GLOBAL
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                Ekspor Produk Ikan Khas Indonesia
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-amber-400 bg-slate-800/80 shadow-sm border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Quick CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#kalkulator')}
              id="btn-nav-calculate"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Cek Estimasi Ongkir</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={`mobile-nav-link-${link.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                activeSection === link.id
                  ? 'text-amber-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('#kalkulator'); }}
              id="mobile-btn-estimate"
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung Biaya Pengiriman Global</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              id="mobile-btn-admin"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 font-medium py-2 rounded-xl text-sm"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Buka Admin CMS Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

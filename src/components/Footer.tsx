import { 
  ShieldCheck, 
  Ship, 
  Plane, 
  Warehouse, 
  FileCheck, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Heart,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { COMPANY_PROFILE, CERTIFICATIONS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenCompany: () => void;
  onOpenPartners: () => void;
  onOpenSSLModal: () => void;
  onOpenAdmin?: () => void;
  onOpen404?: () => void;
}

export default function Footer({ onScrollTo, onOpenCompany, onOpenPartners, onOpenSSLModal, onOpen404 }: FooterProps) {
  const { t, currentLang, setLanguage } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200 overflow-hidden">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#009bb3] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#009bb3]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-sm">{t.footer?.securityTitle || 'Enterprise Security Guaranteed'}</span>
              <span className="text-[11px] text-slate-500">{t.footer?.securityDesc || 'TLS 1.3 256-Bit DigiCert Encryption'}</span>
            </div>
          </div>

          <button
            onClick={onOpenSSLModal}
            className="px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer"
          >
            TLS 1.3 DigiCert EV SSL
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('#hero');
              }}
              id="footer-brand-logo-link"
              className="inline-flex items-center gap-3 group cursor-pointer"
              aria-label="Dried Seafood Global"
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:border-teal-400 transition-all">
                <img
                  src="/logo-dsg.png"
                  alt="Dried Seafood Global - PT Samdura Bara Persada"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              {t.footer?.description || t.footer?.tagline || ''}
            </p>

            <div className="pt-2 text-xs space-y-2">
              <p className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>{COMPANY_PROFILE.headquarters}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>{t.topBar?.hotlineLabel || 'Hotline:'} <strong className="text-slate-900">{COMPANY_PROFILE.hotline}</strong></span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>Email RFQ: <strong className="text-slate-900">{COMPANY_PROFILE.supportEmail}</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{t.footer?.productsTitle || 'Products & Services'}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Dried Whitebait (Teri Nasi)</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Salted Giant Catfish (Jambal)</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Sun-Dried Squid (Cumi Sero)</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Fish Maw (Gelembung Ikan)</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Dried Sea Cucumber (Teripang)</button></li>
              <li><button onClick={() => onScrollTo('#alur-ekspor')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">BKIPM Quarantine Certificate</button></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{t.footer?.quickLinks || 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onScrollTo('#hero')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.home || 'Home'}</button></li>
              <li><button onClick={() => onScrollTo('#tentang')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.about || 'About'}</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.products || 'Products'}</button></li>
              <li><button onClick={() => onScrollTo('#kalkulator')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.shippingCalc || 'Shipping'}</button></li>
              <li><button onClick={() => onScrollTo('#galeri')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.gallery || 'Facility'}</button></li>
              <li><button onClick={() => onScrollTo('#lokasi')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.mapHubs || 'Ports'}</button></li>
              <li><button onClick={() => onScrollTo('#kontak')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">{t.nav?.contactRfq || 'Contact'}</button></li>
              <li><button onClick={onOpenPartners} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">Mitra Strategis</button></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Certifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{t.footer?.complianceTitle || 'Compliance & Ports'}</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenSSLModal} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer">TLS 1.3 EV SSL Certificate</button></li>
              <li><span className="text-slate-400">HACCP Grade A Certified</span></li>
              <li><span className="text-slate-400">BPJPH Halal Indonesia</span></li>
              <li><span className="text-slate-400">BKIPM Quarantine Health Cert</span></li>
            </ul>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#009bb3]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

          {/* Col 5: Multilingual Regional Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{t.footer?.regionalPortals || 'Regional Portals'}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => { e.preventDefault(); setLanguage('en'); onScrollTo('#hero'); }}
                  className={`flex items-center justify-between transition-colors ${currentLang === 'en' ? 'text-teal-700 font-bold' : 'text-slate-600 hover:text-[#009bb3]'}`}
                >
                  <span>Global (English)</span>
                  <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-100 text-slate-500">/</span>
                </a>
              </li>
              <li>
                <a 
                  href="/id/" 
                  onClick={(e) => { e.preventDefault(); setLanguage('id'); onScrollTo('#hero'); }}
                  className={`flex items-center justify-between transition-colors ${currentLang === 'id' ? 'text-teal-700 font-bold' : 'text-slate-600 hover:text-[#009bb3]'}`}
                >
                  <span>Indonesia (Bahasa)</span>
                  <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-100 text-slate-500">/id/</span>
                </a>
              </li>
              <li>
                <a 
                  href="/ar/" 
                  onClick={(e) => { e.preventDefault(); setLanguage('ar'); onScrollTo('#hero'); }}
                  className={`flex items-center justify-between transition-colors ${currentLang === 'ar' ? 'text-teal-700 font-bold' : 'text-slate-600 hover:text-[#009bb3]'}`}
                >
                  <span>الشرق الأوسط (العربية)</span>
                  <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-100 text-slate-500">/ar/</span>
                </a>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <button 
                  onClick={onOpenCompany}
                  className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left block"
                >
                  {currentLang === 'ar' ? 'الملف التعريفي للشركة' : currentLang === 'id' ? 'Profil Legal Perusahaan' : 'Corporate Legal Profile'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPartners}
                  className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left block"
                >
                  {currentLang === 'ar' ? 'الشركاء الاستراتيجيون' : currentLang === 'id' ? 'Mitra Strategis & Jaringan' : 'Strategic Export Partners'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()}{' '}
            <button
              type="button"
              onClick={onOpenCompany}
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#009bb3]"
            >
              {COMPANY_PROFILE.legalName}
            </button>
            . {t.footer?.rightsReserved || 'All Rights Reserved'}.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenSSLModal} className="hover:text-[#009bb3] cursor-pointer">TLS 1.3 Verified</button>
            <span>•</span>
            <button onClick={() => onScrollTo('#kontak')} className="hover:text-[#009bb3] cursor-pointer">Contact & RFQ</button>
            {onOpen404 && (
              <>
                <span>•</span>
                <button onClick={onOpen404} className="hover:text-[#009bb3] cursor-pointer text-slate-400">Halaman 404</button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}


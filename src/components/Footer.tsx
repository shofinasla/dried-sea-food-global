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
  onNavigate?: (path: string) => void;
  onOpenCompany: () => void;
  onOpenPartners: () => void;
  onOpenSSLModal: () => void;
  onOpenAdmin?: () => void;
  onOpen404?: () => void;
}

export default function Footer({ 
  onScrollTo, 
  onNavigate,
  onOpenCompany, 
  onOpenPartners, 
  onOpenSSLModal, 
  onOpen404 
}: FooterProps) {
  const { t, currentLang, setLanguage } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200 overflow-hidden">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-[#009bb3] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#009bb3]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-sm">International Food Safety & Export Standard</span>
              <span className="text-[11px] text-slate-500">HACCP Grade A • BKIPM Quarantine Certified • 0% Formalin Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSSLModal}
              className="px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold hover:bg-cyan-100 transition-colors cursor-pointer"
            >
              TLS 1.3 256-Bit DigiCert EV SSL
            </button>
            <button
              onClick={() => handleNav('/request-quote')}
              className="px-5 py-2 rounded-full bg-[#009bb3] text-white text-xs font-bold hover:bg-[#0d8a9e] transition shadow-xs cursor-pointer"
            >
              Request Quote (RFQ)
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              id="footer-brand-logo-link"
              className="inline-flex items-center gap-3 group cursor-pointer"
              aria-label="Dried Seafood Global"
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:border-cyan-400 transition-all">
                <img
                  src="/logo-dsg.png"
                  alt="Dried Seafood Global - PT Samdura Bara Persada"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              PT Samdura Bara Persada is a premier Indonesian marine export enterprise delivering Grade AAA sun-dried white anchovy, squid, shrimp, salted catfish, and fish maw directly from Indonesian coastal fishing hubs to international wholesale markets.
            </p>

            <div className="pt-2 text-xs space-y-2">
              <p className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>{COMPANY_PROFILE.headquarters}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>Export Desk: <strong className="text-slate-900">{COMPANY_PROFILE.hotline}</strong></span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span>Email RFQ: <strong className="text-slate-900">{COMPANY_PROFILE.supportEmail}</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Export Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Export Products</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('/products/dried-anchovy')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Dried White Anchovy (Teri Nasi)</button></li>
              <li><button onClick={() => handleNav('/products/dried-squid')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Sun-Dried Squid (Cumi Sero)</button></li>
              <li><button onClick={() => handleNav('/products/dried-shrimp')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Dried Shrimp / Ebi Super</button></li>
              <li><button onClick={() => handleNav('/products/dried-fish')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Salted Giant Catfish (Jambal)</button></li>
              <li><button onClick={() => handleNav('/products/fish-maw')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Premium Fish Maw (Gelembung Ikan)</button></li>
              <li><button onClick={() => handleNav('/products/sea-cucumber')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Dried Sea Cucumber (Teripang)</button></li>
              <li><button onClick={() => handleNav('/products')} className="text-[#009bb3] font-bold transition-colors cursor-pointer text-left">View All Products Catalog &rarr;</button></li>
            </ul>
          </div>

          {/* Col 3: Export & Facility */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Export & Operations</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('/export-process')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Export Process (9 Steps)</button></li>
              <li><button onClick={() => handleNav('/quality')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Quality & Lab Standards</button></li>
              <li><button onClick={() => handleNav('/facility')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Muara Baru Facilities</button></li>
              <li><button onClick={() => handleNav('/markets')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Global Export Markets</button></li>
              <li><button onClick={() => handleNav('/insights')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Industry Insights & Guides</button></li>
              <li><button onClick={() => handleNav('/request-quote')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left font-bold text-[#009bb3]">Contact Us</button></li>
              <li><button onClick={() => handleNav('/buyer-inquiry')} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">Buyer Sample Request</button></li>
            </ul>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#009bb3]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()}{' '}
            <button
              type="button"
              onClick={() => handleNav('/about')}
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#009bb3]"
            >
              {COMPANY_PROFILE.legalName}
            </button>
            . All Rights Reserved. Indonesian Seafood Marine Exporter.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenSSLModal} className="hover:text-[#009bb3] cursor-pointer">TLS 1.3 Verified</button>
            <span>•</span>
            <button onClick={() => handleNav('/request-quote')} className="hover:text-[#009bb3] cursor-pointer">Official RFQ</button>
            <span>•</span>
            <button onClick={() => handleNav('/admin')} className="text-slate-400 hover:text-slate-600 cursor-pointer">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

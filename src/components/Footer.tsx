import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
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
  onNavigate,
  onOpenSSLModal
}: FooterProps) {
  const { currentLang } = useTranslation();
  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

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

  const footerTexts = {
    standardTitle: isIndonesian 
      ? 'Standar Keamanan Pangan & Mutu Ekspor Internasional' 
      : isArabic 
      ? 'معايير سلامة الأغذية وجودة التصدير الدولية' 
      : 'International Food Safety & Export Standard',
    standardSubtitle: isIndonesian
      ? 'HACCP Grade A • Sertifikasi Karantina BKIPM • 0% Formalin Terverifikasi'
      : isArabic
      ? 'HACCP الفئة A • معتمد من الحجر الصحي BKIPM • فحص 0% فورمالين'
      : 'HACCP Grade A • BKIPM Quarantine Certified • 0% Formalin Verified',
    rfqBtn: isIndonesian ? 'Minta Penawaran (RFQ)' : isArabic ? 'طلب عرض أسعار (RFQ)' : 'Request Quote (RFQ)',
    desc: isIndonesian
      ? 'PT Samdura Bara Persada adalah perusahaan eksportir hasil laut terkemuka Indonesia yang memasok teri nasi super, cumi kering, udang rebon, ikan asin jambal, dan gelembung ikan langsung dari sentra nelayan pesisir ke pasar grosir global.'
      : isArabic
      ? 'شركة PT Samdura Bara Persada هي شركة رائدة في تصدير المنتجات البحرية الإندونيسية، تقدم الأنشوجة البيضاء، الحبار، الروبيان، والأسماك المجففة الفاخرة إلى الأسواق العالمية.'
      : 'PT Samdura Bara Persada is a premier Indonesian marine export enterprise delivering Grade AAA sun-dried white anchovy, squid, shrimp, salted catfish, and fish maw directly from Indonesian coastal fishing hubs to international wholesale markets.',
    deskLabel: isIndonesian ? 'Meja Ekspor:' : isArabic ? 'مكتب التصدير:' : 'Export Desk:',
    emailLabel: isIndonesian ? 'Email Penawaran:' : isArabic ? 'البريد الإلكتروني:' : 'Email RFQ:',
    productsTitle: isIndonesian ? 'Katalog Komoditas Ekspor' : isArabic ? 'منتجات التصدير' : 'Export Products',
    operationsTitle: isIndonesian ? 'Operasional & Standar Ekspor' : isArabic ? 'التصدير والعمليات' : 'Export & Operations',
    allProductsBtn: isIndonesian ? 'Lihat Semua Katalog Komoditas →' : isArabic ? 'عرض جميع منتجات التصدير ←' : 'View All Products Catalog →',
    backToTop: isIndonesian ? 'Kembali ke Atas' : isArabic ? 'العودة للأعلى' : 'Back to Top',
    rightsReserved: isIndonesian ? 'Hak Cipta Dilindungi. Eksportir Hasil Laut Indonesia.' : isArabic ? 'جميع الحقوق محفوظة. مصدّر المأكولات البحرية الإندونيسية.' : 'All Rights Reserved. Indonesian Seafood Marine Exporter.'
  };

  const productLinks = [
    { label: isIndonesian ? 'Teri Nasi Super (Grade AAA)' : isArabic ? 'أنشوجة بيضاء مجففة سوبر' : 'Dried White Anchovy (Teri Nasi)', path: '/products/dried-anchovy' },
    { label: isIndonesian ? 'Cumi Kering Sero Alami' : isArabic ? 'حبار كاليماري طبيعي مجفف' : 'Sun-Dried Squid (Cumi Sero)', path: '/products/dried-squid' },
    { label: isIndonesian ? 'Udang Rebon / Ebi Kering Super' : isArabic ? 'روبيان بحري أحمر مجفف' : 'Dried Shrimp / Ebi Super', path: '/products/dried-shrimp' },
    { label: isIndonesian ? 'Ikan Asin Jambal Roti' : isArabic ? 'سمك الثريدفين المملح (جامبال)' : 'Salted Giant Catfish (Jambal)', path: '/products/dried-fish' },
    { label: isIndonesian ? 'Gelembung Ikan (Fish Maw)' : isArabic ? 'حويصلات الأسماك (فيش ماو)' : 'Premium Fish Maw (Gelembung Ikan)', path: '/products/fish-maw' },
    { label: isIndonesian ? 'Teripang Pasir Super' : isArabic ? 'خيار البحر المجفف الطبيعي' : 'Dried Sea Cucumber (Teripang)', path: '/products/sea-cucumber' }
  ];

  const operationLinks = [
    { label: isIndonesian ? 'Alur & SOP Ekspor (9 Tahap)' : isArabic ? 'مراحل وإجراءات التصدير' : 'Export Process (9 Steps)', path: '/export-process' },
    { label: isIndonesian ? 'Standar Mutu & Uji Laboratorium' : isArabic ? 'معايير الجودة والمختبر' : 'Quality & Lab Standards', path: '/quality' },
    { label: isIndonesian ? 'Fasilitas Sentra & Solar Dome' : isArabic ? 'مرافق التجفيف والتخزين' : 'Muara Baru & Drying Facilities', path: '/facility' },
    { label: isIndonesian ? 'Pasar Ekspor Global & Pelabuhan' : isArabic ? 'أسواق التصدير العالمية' : 'Global Export Markets', path: '/markets' },
    { label: isIndonesian ? 'Artikel & Wawasan Ekspor' : isArabic ? 'المقالات والرؤى التجارية' : 'Industry Insights & Guides', path: '/insights' },
    { label: isIndonesian ? 'Hubungi Kami (B2B Desk)' : isArabic ? 'تواصل معنا' : 'Contact Us (B2B)', path: '/request-quote', isHighlight: true },
    { label: isIndonesian ? 'Permintaan Sampel Mutu' : isArabic ? 'طلب عينات تجريبية' : 'Buyer Sample Request', path: '/buyer-inquiry' }
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200 overflow-hidden">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-200 py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 text-[#009bb3] flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#009bb3]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs sm:text-sm">{footerTexts.standardTitle}</span>
              <span className="text-[11px] text-slate-500">{footerTexts.standardSubtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSSLModal}
              className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-semibold hover:bg-cyan-100 transition-colors cursor-pointer"
            >
              TLS 1.3 256-Bit SSL
            </button>
            <button
              onClick={() => handleNav('/request-quote')}
              className="px-4 py-1.5 rounded-full bg-[#009bb3] text-white text-xs font-bold hover:bg-[#0d8a9e] transition shadow-2xs cursor-pointer"
            >
              {footerTexts.rfqBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
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
              <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:border-cyan-400 transition-all">
                <img
                  src="/logo-dsg.png"
                  alt="Dried Seafood Global - PT Samdura Bara Persada"
                  className="h-9 sm:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              {footerTexts.desc}
            </p>

            <div className="pt-1 text-xs space-y-1.5">
              <p className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                <span>{COMPANY_PROFILE.headquarters}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                <span>{footerTexts.deskLabel} <strong className="text-slate-900">{COMPANY_PROFILE.hotline}</strong></span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                <span>{footerTexts.emailLabel} <strong className="text-slate-900">{COMPANY_PROFILE.supportEmail}</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Export Products */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{footerTexts.productsTitle}</h4>
            <ul className="space-y-1.5">
              {productLinks.map((item, i) => (
                <li key={i}>
                  <button onClick={() => handleNav(item.path)} className="text-slate-600 hover:text-[#009bb3] transition-colors cursor-pointer text-left">
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button onClick={() => handleNav('/products')} className="text-[#009bb3] font-bold transition-colors cursor-pointer text-left">
                  {footerTexts.allProductsBtn}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Export & Facility */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">{footerTexts.operationsTitle}</h4>
            <ul className="space-y-1.5">
              {operationLinks.map((item, i) => (
                <li key={i}>
                  <button onClick={() => handleNav(item.path)} className={`hover:text-[#009bb3] transition-colors cursor-pointer text-left ${item.isHighlight ? 'text-[#009bb3] font-bold' : 'text-slate-600'}`}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#009bb3]" />
                <span>{footerTexts.backToTop}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()}{' '}
            <button
              type="button"
              onClick={() => handleNav('/about')}
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#009bb3]"
            >
              {COMPANY_PROFILE.legalName}
            </button>
            . {footerTexts.rightsReserved}
          </p>
          <div className="flex items-center gap-3">
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

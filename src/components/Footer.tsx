import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';
import { trackMetaEvent } from '../utils/analytics';

// Official Vector Social Media Icons
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ThreadsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 192 192" fill="currentColor" className={className} aria-hidden="true">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.8228C81.1894 64.767 89.2624 61.2721 97.222 61.2721C97.3005 61.2721 97.3791 61.2721 97.4576 61.2728C110.151 61.3541 120.315 70.3662 122.259 89.5441C114.735 88.2285 106.879 87.8427 98.8184 88.3846C70.6277 90.2796 52.8809 105.772 53.6493 125.753C54.4079 145.474 72.8229 159.255 93.9926 159.255C108.978 159.255 120.941 152.474 126.969 140.71C132.067 151.724 141.442 157.962 155.059 157.962C165.736 157.962 173.882 154.214 179.919 146.425C186.134 138.406 189.297 126.793 189.297 111.96C189.297 78.4727 172.932 44.7443 129.562 44.7443C103.541 44.7443 83.1891 53.2201 68.9689 69.1232C53.6841 86.2163 45.4851 110.198 45.4851 137.962C45.4851 184.225 78.2917 215.255 129.562 215.255C148.974 215.255 166.429 209.689 179.972 199.309L169.837 186.237C159.043 194.502 144.974 198.727 129.562 198.727C88.6666 198.727 62.0131 173.188 62.0131 137.962C62.0131 114.779 68.7479 94.6713 81.3323 80.5966C93.0039 67.5422 109.434 60.5382 129.562 60.5382C163.666 60.5382 172.769 88.0833 172.769 111.96C172.769 123.364 170.528 131.782 166.242 137.311C162.247 142.463 156.452 144.962 149.387 144.962C138.835 144.962 133.099 138.749 133.099 126.855V107.03C133.099 97.4335 129.839 88.9883 122.259 88.9883M122.259 105.772V126.855C122.259 134.407 116.899 142.727 105.778 142.727C94.6568 142.727 88.8353 133.407 88.8353 124.636C88.8353 109.962 99.8887 104.974 122.259 105.772Z"/>
    </svg>
  );
}

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

            {/* Official Social Media Channels */}
            <div className="pt-2.5">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-2">
                {isIndonesian ? 'Media Sosial Resmi:' : isArabic ? 'وسائل التواصل الرسمية:' : 'Official Social Media:'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* Instagram */}
                <a
                  href={COMPANY_PROFILE.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Instagram', contact_channel: 'Instagram' })}
                  id="footer-social-instagram"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent transition-all shadow-2xs text-xs font-semibold cursor-pointer"
                  title="Follow Dried Seafood Global on Instagram"
                  aria-label="Instagram Dried Seafood Global"
                >
                  <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Instagram</span>
                </a>

                {/* Facebook */}
                <a
                  href={COMPANY_PROFILE.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Facebook', contact_channel: 'Facebook' })}
                  id="footer-social-facebook"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shadow-2xs text-xs font-semibold cursor-pointer"
                  title="Follow Dried Seafood Global on Facebook"
                  aria-label="Facebook Dried Seafood Global"
                >
                  <FacebookIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Facebook</span>
                </a>

                {/* Threads */}
                <a
                  href={COMPANY_PROFILE.socialMedia.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Threads', contact_channel: 'Threads' })}
                  id="footer-social-threads"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-black hover:border-black transition-all shadow-2xs text-xs font-semibold cursor-pointer"
                  title="Follow Dried Seafood Global on Threads"
                  aria-label="Threads Dried Seafood Global"
                >
                  <ThreadsIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Threads</span>
                </a>
              </div>
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
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-slate-500 text-xs">
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Quick Social Icons */}
            <div className="flex items-center gap-1.5 mr-2">
              <a
                href={COMPANY_PROFILE.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Instagram', contact_channel: 'Instagram' })}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                title="Instagram @driedseafoodglobal"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_PROFILE.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Facebook', contact_channel: 'Facebook' })}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                title="Facebook Dried Seafood Global"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_PROFILE.socialMedia.threads}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMetaEvent('Contact', { content_name: 'Social Media - Threads', contact_channel: 'Threads' })}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-black hover:border-black flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                title="Threads @driedseafoodglobal"
                aria-label="Threads"
              >
                <ThreadsIcon className="w-3.5 h-3.5" />
              </a>
            </div>

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

import { ArrowRight, Anchor, Download } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal?: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({ onScrollTo, onOpenCatalogModal }: HeroProps) {
  const { currentLang } = useTranslation();

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  // Localized copy adapted to international B2B buyers while maintaining exact visual structure
  const getHeroContent = () => {
    if (isIndonesian) {
      return {
        badge: 'HASIL LAUT SEGAR & KERING • STANDAR SFDA & BKIPM',
        titlePrefix: 'Menghadirkan',
        titleHighlight: 'Kesegaran Samudra',
        titleSuffix: 'ke Meja Anda',
        description:
          'Hasil laut premium pilihan, dipasok langsung dari perairan pesisir Indonesia tepercaya dan dikirimkan dengan standar mutu terjamin ke Arab Saudi dan pasar internasional.',
        ctaExplore: 'Lihat Koleksi Ikan',
        ctaStory: 'Profil Kami',
        ctaB2B: 'Permintaan Grosir B2B',
        stats: [
          { value: '150+ Ton', label: 'Kapasitas Pasokan Bulanan' },
          { value: 'Sertifikasi SFDA', label: 'Standar Keamanan Pangan' },
          { value: '25+ Spesies', label: 'Varietas Hasil Laut' },
          { value: 'Sejak 2015', label: 'Reputasi Terpercaya' },
        ],
      };
    }
    if (isArabic) {
      return {
        badge: 'مأكولات بحرية طازجة ومجففة • معتمدة من SFDA',
        titlePrefix: 'نقدم لكم',
        titleHighlight: 'نضارة أعماق المحيط',
        titleSuffix: 'إلى مائدتكم',
        description:
          'مأكولات بحرية فاخرة يتم توريدها مباشرة من مياه إندونيسيا الموثوقة وتسليمها بعناية عبر المملكة العربية السعودية والأسواق العالمية.',
        ctaExplore: 'استكشف منتجات الأسماك',
        ctaStory: 'قصتنا',
        ctaB2B: 'استفسارات الجملة B2B',
        stats: [
          { value: '+150 طن', label: 'إمداد شهري منتظم' },
          { value: 'معتمد من SFDA', label: 'أعلى معايير السلامة' },
          { value: '+25 نوعاً', label: 'تشكيلة بحرية متنوعة' },
          { value: 'تأسس 2015', label: 'خبرة وموثوقية عريقة' },
        ],
      };
    }
    return {
      badge: 'FRESH AND FROZEN FISH • SFDA APPROVED',
      titlePrefix: 'Delivering the',
      titleHighlight: 'Freshness of the Ocean',
      titleSuffix: 'to Your Table',
      description:
        'Premium seafood, sourced directly from trusted waters around the world and delivered with care across Saudi Arabia.',
      ctaExplore: 'Explore our Fish',
      ctaStory: 'Our Story',
      ctaB2B: 'B2B Wholesale Inquiry',
      stats: [
        { value: '150+ Tons', label: 'Monthly Supply' },
        { value: 'SFDA Certified', label: 'Safety Approved' },
        { value: '25+ Species', label: 'Seafood Varieties' },
        { value: 'Est. 2015', label: 'Trusted Heritage' },
      ],
    };
  };

  const content = getHeroContent();

  return (
    <section
      id="hero"
      data-section="top"
      className="relative min-h-[calc(100vh-95px)] lg:min-h-[calc(100vh-105px)] flex flex-col justify-between overflow-hidden text-white"
    >
      {/* ============================================================ */}
      {/* PURE ORIGINAL BACKGROUND IMAGE (NO COLOR OVERLAYS)           */}
      {/* ============================================================ */}
      <img
        src="/images/hero/tempat-penjemuran-ikan.png"
        alt="Dried Seafood Global - Ocean Sourcing & Processing"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* ============================================================ */}
      {/* FOREGROUND CONTENT LAYER (Z-INDEX 10)                        */}
      {/* Compact top spacing aligning directly below sticky navbar     */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between pt-7 sm:pt-9 lg:pt-10 pb-7 sm:pb-9">
        
        {/* Main Headline & Action Content */}
        <div className="max-w-4xl">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-xs animate-pulse" />
            <span>{content.badge}</span>
          </div>

          {/* Heading H1 (72px / Bold with Italic Serif Accent) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white tracking-tight leading-[1.08] font-sans drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]">
            <span className="block">{content.titlePrefix}</span>
            <span className="block font-serif italic font-normal text-[#fcfbf9] my-1 sm:my-1.5 tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {content.titleHighlight}
            </span>
            <span className="block">{content.titleSuffix}</span>
          </h1>

          {/* Lead Description (20px / Light / 90% Opacity) */}
          <p className="mt-4 sm:mt-5 text-white/95 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {content.description}
          </p>

          {/* CTA Action Pill Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5">
            
            {/* Primary Pill: Explore our Fish */}
            <button
              type="button"
              onClick={() => onScrollTo('#komoditas')}
              id="hero-explore-fish-btn"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#f8f6f0] hover:bg-white text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer min-h-[46px]"
            >
              <span>{content.ctaExplore}</span>
              <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Pill: Our Story */}
            <button
              type="button"
              onClick={() => onScrollTo('#tentang')}
              id="hero-our-story-btn"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/30 text-white font-medium text-sm sm:text-base hover:border-white/50 transition-all cursor-pointer min-h-[46px]"
            >
              <span>{content.ctaStory}</span>
            </button>

            {/* Tertiary Pill: B2B Wholesale Inquiry */}
            <button
              type="button"
              onClick={() => onScrollTo('#kontak')}
              id="hero-b2b-inquiry-btn"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0c4a6e]/75 hover:bg-[#0c4a6e]/95 backdrop-blur-md border border-cyan-400/40 text-cyan-50 font-medium text-sm sm:text-base shadow-sm hover:border-cyan-300 transition-all cursor-pointer min-h-[46px]"
            >
              <Anchor className="w-4 h-4 text-cyan-300" />
              <span>{content.ctaB2B}</span>
            </button>

            {/* Discreet Specification Catalog Modal Trigger */}
            {onOpenCatalogModal && (
              <button
                type="button"
                onClick={onOpenCatalogModal}
                id="hero-catalog-download-btn"
                title="Download Export Specifications (PDF)"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white text-xs font-semibold transition-all cursor-pointer min-h-[46px]"
              >
                <Download className="w-4 h-4" />
                <span>PDF Catalog</span>
              </button>
            )}

          </div>

        </div>

        {/* ============================================================ */}
        {/* STATS BAR (4-COLUMN GRID)                                    */}
        {/* Values: 18px-22px / Bold, Labels: 12px-14px / 70% Opacity    */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-7 border-t border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-white/70 font-normal mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

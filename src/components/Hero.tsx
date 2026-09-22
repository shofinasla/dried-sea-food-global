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
          'Makanan laut kering premium dari Indonesia, dipilih secara cermat dari nelayan tepercaya dan diproses secara alami untuk menjaga cita rasa, kualitas, dan karakteristik aslinya.',
        ctaExplore: 'Lihat Koleksi Ikan',
        ctaStory: 'Profil Kami',
        ctaB2B: 'Permintaan Grosir B2B',
        stats: [
          { value: '1000+ Ton', label: 'Kapasitas Pasokan Bulanan' },
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
          { value: '+1000 طن', label: 'إمداد شهري منتظم' },
          { value: 'معتمد من SFDA', label: 'أعلى معايير السلامة' },
          { value: '+25 نوعاً', label: 'تشكيلة بحرية متنوعة' },
          { value: 'تأسس 2015', label: 'خبرة وموثوقية عريقة' },
        ],
      };
    }
    return {
      badge: '',
      titlePrefix: 'Welcome To',
      titleHighlight: 'Dried Seafood Global',
      titleSuffix: '',
      description:
        'Premium dried seafood from Indonesia, carefully selected from trusted fishermen and naturally processed to preserve its authentic taste, quality, and character.',
      ctaExplore: 'Explore our Fish',
      ctaStory: 'Our Story',
      ctaB2B: 'B2B Wholesale Inquiry',
      stats: [
        { value: '1000+ Tons', label: 'Monthly Supply' },
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

          {/* Lead Description (20px / Shadow configured to 8px) */}
          <p className="mt-4 sm:mt-5 text-white text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]">
            {content.description}
          </p>

          {/* CTA Action Pill Buttons with Deep Thick Shadows 
           <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5">
            
            {/* Primary Pill: Explore our Fish */}
            {/* <button
              type="button"
              onClick={() => onScrollTo('#komoditas')}
              id="hero-explore-fish-btn"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#f8f6f0] hover:bg-white text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(0,0,0,0.7),_0_3px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] hover:scale-[1.02] transition-all cursor-pointer min-h-[46px]"
            > 
              <span>{content.ctaExplore}</span>
              <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Pill: Our Story 
            <button
              type="button"
              onClick={() => onScrollTo('#tentang')}
              id="hero-our-story-btn"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-slate-950/70 hover:bg-slate-950/90 backdrop-blur-md border border-white/40 text-white font-medium text-sm sm:text-base shadow-[0_8px_25px_rgba(0,0,0,0.7),_0_3px_10px_rgba(0,0,0,0.5)] hover:border-white/70 transition-all cursor-pointer min-h-[46px]"
            >
              <span>{content.ctaStory}</span>
            </button> 

            {/* Tertiary Pill: B2B Wholesale Inquiry 
            <button
              type="button"
              onClick={() => onScrollTo('#kontak')}
              id="hero-b2b-inquiry-btn"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0c4a6e]/90 hover:bg-[#0c4a6e] backdrop-blur-md border border-cyan-400/50 text-cyan-50 font-medium text-sm sm:text-base shadow-[0_8px_25px_rgba(0,0,0,0.7),_0_3px_10px_rgba(0,0,0,0.5)] hover:border-cyan-300 transition-all cursor-pointer min-h-[46px]"
            >
              <Anchor className="w-4 h-4 text-cyan-300" />
              <span>{content.ctaB2B}</span>
            </button> */}

            {/* Discreet Specification Catalog Modal Trigger
            {onOpenCatalogModal && (
              <button
                type="button"
                onClick={onOpenCatalogModal}
                id="hero-catalog-download-btn"
                title="Download Export Specifications (PDF)"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-3.5 rounded-full bg-slate-950/60 hover:bg-slate-950/80 backdrop-blur-md border border-white/30 text-white/90 hover:text-white text-xs font-semibold shadow-[0_8px_25px_rgba(0,0,0,0.7),_0_3px_10px_rgba(0,0,0,0.5)] transition-all cursor-pointer min-h-[46px]"
              >
                <Download className="w-4 h-4" />
                <span>PDF Catalog</span>
              </button>
            )}

          </div> */}

        </div>

        {/* ============================================================ */}
        {/* STATS BAR (4-COLUMN GRID WITH 8PX SHADOWS)                   */}
        {/* Values: 18px-22px / Bold, Labels: 12px-14px / 85% Opacity    */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-7 border-t border-white/25 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.85))]">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-white/90 font-medium mt-1 [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
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

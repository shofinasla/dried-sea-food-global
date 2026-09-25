import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onScrollTo?: (id: string) => void;
  onOpenSSLModal?: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({}: HeroProps) {
  const { currentLang } = useTranslation();

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  const getStats = () => {
    if (isIndonesian) {
      return [
        { value: '1.000+ Ton', label: 'Kapasitas Pasokan Bulanan' },
        { value: 'Sertifikasi SFDA', label: 'Standar Keamanan Pangan' },
        { value: '25+ Spesies', label: 'Varietas Hasil Laut' },
        { value: 'Sejak 2015', label: 'Reputasi Terpercaya' },
      ];
    }
    if (isArabic) {
      return [
        { value: '+1000 طن', label: 'إمداد شهري منتظم' },
        { value: 'معتمد من SFDA', label: 'أعلى معايير السلامة' },
        { value: '+25 نوعاً', label: 'تشكيلة بحرية متنوعة' },
        { value: 'تأسس 2015', label: 'خبرة وموثوقية عريقة' },
      ];
    }
    return [
      { value: '1,000+ Tons', label: 'Monthly Supply' },
      { value: 'SFDA Certified', label: 'Food Safety Approved' },
      { value: '25+ Species', label: 'Seafood Varieties' },
      { value: 'Est. 2015', label: 'Trusted Heritage' },
    ];
  };

  const stats = getStats();

  return (
    <section
      id="hero"
      data-section="top"
      className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[calc(100vh-80px)] max-h-[820px] flex flex-col justify-between overflow-hidden text-white"
    >
      {/* ============================================================ */}
      {/* HERO BACKGROUND IMAGE                                        */}
      {/* ============================================================ */}
      <img
        src="/images/hero/tempat-penjemuran-ikan.png"
        alt="Dried Seafood Global - Ocean Sourcing & Processing"
        className="absolute inset-0 w-full h-full object-cover object-center scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Scrim Gradient for Crisp Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/30" />

      {/* ============================================================ */}
      {/* FOREGROUND CONTENT LAYER                                     */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        
        {/* Main Clean Headline */}
        <div className="max-w-3xl my-auto">
          <h1 className="text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1 sm:mb-2 font-sans">
              Welcome To
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl font-serif italic font-normal text-[#fcfbf9] tracking-normal drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
              Dried Seafood Global
            </span>
          </h1>
        </div>

        {/* ============================================================ */}
        {/* STATS BAR (4-COLUMN GRID)                                    */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight tabular-nums drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
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

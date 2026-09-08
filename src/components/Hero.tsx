import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Ship, 
  Plane, 
  Award, 
  Globe2, 
  Clock, 
  Warehouse, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { COMPANY_PROFILE, CERTIFICATIONS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({ onScrollTo, onOpenSSLModal, onOpenCatalogModal }: HeroProps) {
  const { t, currentLang } = useTranslation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Multilingual carousel slides
  const heroSlides = [
    {
      title: t.hero.titlePart1,
      highlight: t.hero.titleHighlight,
      titlePart2: t.hero.titlePart2,
      badge: t.hero.badge,
      subtitle: t.hero.description,
      imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1600&q=85',
      accent: 'amber'
    },
    {
      title: currentLang === 'id' ? 'Katalog Komoditas Ikan Asin & Teri Medan Super' :
             currentLang === 'zh' ? '特级印尼白饭鱼与深海咸马友鱼出口' :
             currentLang === 'ja' ? '極上チリメンジャコ・白子干し＆塩干魚輸出' :
             currentLang === 'ar' ? 'كتالوج تصدير أسماك الأنشوجة البيضاء والأسماك المملحة' :
             'Premium Indonesian Whitebait Anchovy & Salted Giant Catfish',
      highlight: currentLang === 'id' ? 'Higienis Tanpa Formalin' :
                 currentLang === 'zh' ? '纯天然零化学添加' :
                 currentLang === 'ja' ? '無添加・天然乾燥' :
                 currentLang === 'ar' ? 'طبيعي بدون فورمالين' :
                 'Zero Chemical Preservatives',
      titlePart2: currentLang === 'id' ? 'Proses Solar Dome Mutu Ekspor' :
                  currentLang === 'zh' ? '太阳能干燥大棚标准化出品' :
                  currentLang === 'ja' ? 'ソーラードーム衛生乾燥' :
                  currentLang === 'ar' ? 'تجفيف شمسي بمعايير عالمية' :
                  'Solar Dome Dried to International Specs',
      badge: 'HACCP Grade A • BKIPM Certified',
      subtitle: t.hero.trust1Desc,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
      accent: 'emerald'
    },
    {
      title: currentLang === 'id' ? 'Gudang Dehumidified Kering & Laboratorium Mutu Terpadu' :
             currentLang === 'zh' ? '恒温恒湿干燥仓储与严苛出口品控实验室' :
             currentLang === 'ja' ? '定温除湿型メガストレージ＆品質検査ラボ' :
             currentLang === 'ar' ? 'مستودعات مجهزة بالتحكم في الرطوبة ومختبرات معتمدة' :
             'Dehumidified Storage & Integrated Quality Laboratory',
      highlight: currentLang === 'id' ? 'Kelembaban Terkontrol (<55% RH)' :
                 currentLang === 'zh' ? '低湿度防潮防变质' :
                 currentLang === 'ja' ? '低湿度管理' :
                 currentLang === 'ar' ? 'رطوبة منضبطة تماماً' :
                 'Controlled Humidity (<55% RH)',
      titlePart2: currentLang === 'id' ? 'Menjaga Garing Alami & Bebas Jamur' :
                  currentLang === 'zh' ? '确保跨洋远航成色稳定' :
                  currentLang === 'ja' ? '長期海上航行でも変質なし' :
                  currentLang === 'ar' ? 'حماية فائقة خلال الرحلات البحرية' :
                  'Safeguarding Freshness on Transoceanic Routes',
      badge: 'Climate Controlled Logistics',
      subtitle: t.hero.trust2Desc,
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      accent: 'blue'
    },
    {
      title: currentLang === 'id' ? 'Fish Maw (Gelembung Ikan) & Teripang Kering Mewah' :
             currentLang === 'zh' ? '印尼特级花胶鱼鳔与名贵干海参国际直供' :
             currentLang === 'ja' ? '高級魚鰾（花胶）＆干しナマコ国際航空直送' :
             currentLang === 'ar' ? 'حويصلات الأسماك الفاخرة وخيار البحر عالي الجودة' :
             'Export Grade Fish Maw & Premium Sea Cucumber',
      highlight: currentLang === 'id' ? 'Kargo Udara Kilat & FCL Kontainer' :
                 currentLang === 'zh' ? '空运极速与整柜海运' :
                 currentLang === 'ja' ? '航空便＆海上コンテナ' :
                 currentLang === 'ar' ? 'شحن جوي سريع وحاويات بحرية' :
                 'Priority Air Freight & Ocean FCL',
      titlePart2: currentLang === 'id' ? 'Direct ke Hong Kong, Taiwan, LA, & Dubai' :
                  currentLang === 'zh' ? '直达香港、台湾、洛杉矶与迪拜' :
                  currentLang === 'ja' ? '香港・台湾・米国・ドバイへ直送' :
                  currentLang === 'ar' ? 'مباشرة إلى الخليج، آسيا، وأمريكا' :
                  'Direct to Hong Kong, Taiwan, LA, & Dubai',
      badge: 'Luxury Seafood Trade',
      subtitle: t.hero.trust4Desc,
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1600&q=85',
      accent: 'purple'
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="hero" className="relative pt-6 pb-20 overflow-hidden bg-slate-950 border-b border-slate-800">
      
      {/* Background Visual Carousel Banner with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlideIndex === idx ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-90"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HACCP Grade A • KKP RI Health Certificate • Halal Certified</span>
          </div>
          <a
            href={`tel:${COMPANY_PROFILE.hotline.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 text-xs font-bold transition-colors shadow-sm"
          >
            <span>{t.topBar.hotlineLabel} <strong>{COMPANY_PROFILE.hotline}</strong></span>
          </a>
          <button
            onClick={onOpenSSLModal}
            id="hero-ssl-badge"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-600/60 text-emerald-400 text-xs font-bold hover:bg-emerald-900/60 transition-colors shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.topBar.sslVerified}</span>
          </button>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Active Carousel Badge Tag */}
          <div className="inline-block px-4 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
            {heroSlides[currentSlideIndex].badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] font-serif">
            {heroSlides[currentSlideIndex].title}{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              {heroSlides[currentSlideIndex].highlight}
            </span>{' '}
            {heroSlides[currentSlideIndex].titlePart2}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {heroSlides[currentSlideIndex].subtitle}
          </p>

          {/* Call-to-action buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => onScrollTo('#komoditas')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>{t.nav.products}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onScrollTo('#kalkulator')}
              id="hero-cta-shipping"
              className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold px-6 py-3.5 rounded-2xl text-sm border border-amber-500/30 hover:border-amber-500 transition-all shadow-lg cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.hero.ctaCalculator}</span>
            </button>

            <button
              onClick={() => onScrollTo('#kontak')}
              id="hero-cta-rfq"
              className="inline-flex items-center gap-2 bg-slate-950/80 hover:bg-slate-900 text-slate-200 font-semibold px-5 py-3.5 rounded-2xl text-sm border border-slate-700 hover:border-slate-500 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t.hero.ctaRfq}</span>
            </button>
          </div>

          {/* Visual Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlideIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Global Trade Routes Live Ticker */}
        <div className="mt-12 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 max-w-4xl mx-auto backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="uppercase tracking-wider">
                {currentLang === 'id' ? 'Rute Ekspor Utama:' :
                 currentLang === 'zh' ? '核心外贸直达航线:' :
                 currentLang === 'ja' ? '主要国際コンテナ航路:' :
                 currentLang === 'ar' ? 'خطوط الشحن البحري الرئيسية:' :
                 'Primary Global Trade Routes:'}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-slate-300 font-semibold text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Jakarta / Belawan ⇄ Hong Kong & Kaohsiung</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">✈️ CGK Express Air ⇄ Singapore & Tokyo Narita</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Tanjung Perak ⇄ Los Angeles USA</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Tanjung Priok ⇄ Jebel Ali Dubai & Jeddah</span>
            </div>
          </div>
        </div>

        {/* Key Operational KPI Metric Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                {t.hero.statCountriesLabel}
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {t.hero.statCountries}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                Asia, Americas, Europe, Middle East
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                {t.hero.statVolumeLabel}
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Ship className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {t.hero.statVolume}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                FCL Ocean & Air Shipments
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                {t.hero.statSatisfactionLabel}
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {t.hero.statSatisfaction}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                Strict Moisture & COA Compliance
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                {t.hero.statFarmsLabel}
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Warehouse className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                {t.hero.statFarms}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                Fair Trade Coastal Cooperatives
              </div>
            </div>
          </div>
        </div>

        {/* Global Certifications Showcase Ticker */}
        <div className="mt-10 pt-6 border-t border-slate-800/80">
          <p className="text-center text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3">
            {t.about.certSectionTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded-xl text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-slate-200">{cert.name}</span>
                <span className="text-slate-400 hidden sm:inline">• {cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

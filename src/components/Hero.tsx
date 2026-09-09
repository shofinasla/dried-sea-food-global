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
  Download,
  Mail
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
             currentLang === 'ko' ? '특급 인도네시아산 백자멸치 & 염장 삼치' :
             currentLang === 'ar' ? 'كتالوج تصدير أسماك الأنشوجة البيضاء والأسماك المملحة' :
             currentLang === 'es' ? 'Catálogo de Anchoas Blancas y Pescado Salado' :
             currentLang === 'fr' ? 'Catalogue d\'Anchois Blancs & Poissons Salés' :
             currentLang === 'de' ? 'Katalog für Premium-Sardellen & Salzfisch' :
             currentLang === 'vi' ? 'Danh Mục Cá Cơm Trắng & Cá Mặn Cao Cấp' :
             currentLang === 'ru' ? 'Каталог Белого Анчоуса и Соленой Рыбы' :
             'Premium Indonesian Whitebait Anchovy & Salted Giant Catfish',
      highlight: currentLang === 'id' ? 'Higienis Tanpa Formalin' :
                 currentLang === 'zh' ? '纯天然零化学添加' :
                 currentLang === 'ja' ? '無添加・天然乾燥' :
                 currentLang === 'ko' ? '무방부제·100% 천연건조' :
                 currentLang === 'ar' ? 'طبيعي بدون فورمالين' :
                 currentLang === 'es' ? '100% Natural Sin Conservantes' :
                 currentLang === 'fr' ? 'Hygiénique Sans Conservateur' :
                 currentLang === 'de' ? '100% Ohne Konservierungsstoffe' :
                 currentLang === 'vi' ? 'Vệ Sinh 100% Không Formol' :
                 currentLang === 'ru' ? 'Без Формалина и Консервантов' :
                 'Zero Chemical Preservatives',
      titlePart2: currentLang === 'id' ? 'Proses Solar Dome Mutu Ekspor' :
                  currentLang === 'zh' ? '太阳能干燥大棚标准化出品' :
                  currentLang === 'ja' ? 'ソーラードーム衛生乾燥' :
                  currentLang === 'ko' ? '솔라돔 위생 건조 국제표준 규격' :
                  currentLang === 'ar' ? 'تجفيف شمسي بمعايير عالمية' :
                  currentLang === 'es' ? 'Secado en Domo Solar para Exportación' :
                  currentLang === 'fr' ? 'Séchage Solar Dome Normes Export' :
                  currentLang === 'de' ? 'Solar-Dome-Trocknung nach Exportstandard' :
                  currentLang === 'vi' ? 'Sấy Vòm Solar Dome Tiêu Chuẩn Xuất Khẩu' :
                  currentLang === 'ru' ? 'Купольная Сушка Экспортного Стандарта' :
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
             currentLang === 'ko' ? '저습도 제습 메가 창고 및 수출 품질검사 랩' :
             currentLang === 'ar' ? 'مستودعات مجهزة بالتحكم في الرطوبة ومختبرات معتمدة' :
             currentLang === 'es' ? 'Almacenes Deshumidificados y Laboratorio de Calidad' :
             currentLang === 'fr' ? 'Entrepôts Déshumidifiés et Laboratoire de Contrôle Qualité' :
             currentLang === 'de' ? 'Entfeuchtete Lagerhallen & Integriertes Qualitätslabor' :
             currentLang === 'vi' ? 'Kho Hút Ẩm Tiêu Chuẩn & Phòng Lab Kiểm Nghiệm Chất Lượng' :
             currentLang === 'ru' ? 'Склады с Осушением и Аккредитованная Лаборатория' :
             'Dehumidified Storage & Integrated Quality Laboratory',
      highlight: currentLang === 'id' ? 'Kelembaban Terkontrol (<55% RH)' :
                 currentLang === 'zh' ? '低湿度防潮防变质' :
                 currentLang === 'ja' ? '低湿度管理' :
                 currentLang === 'ko' ? '제어된 항습도 (<55% RH)' :
                 currentLang === 'ar' ? 'رطوبة منضبطة تماماً' :
                 currentLang === 'es' ? 'Humedad Controlada (<55% HR)' :
                 currentLang === 'fr' ? 'Humidité Contrôlée (<55 % HR)' :
                 currentLang === 'de' ? 'Kontrollierte Luftfeuchte (<55% rF)' :
                 currentLang === 'vi' ? 'Độ Ẩm Kiểm Soát (<55% RH)' :
                 currentLang === 'ru' ? 'Контролируемая Влажность (<55% RH)' :
                 'Controlled Humidity (<55% RH)',
      titlePart2: currentLang === 'id' ? 'Menjaga Garing Alami & Bebas Jamur' :
                  currentLang === 'zh' ? '确保跨洋远航成色稳定' :
                  currentLang === 'ja' ? '長期海上航行でも変质なし' :
                  currentLang === 'ko' ? '대양 횡단 항해 중 변질 및 곰팡이 방지' :
                  currentLang === 'ar' ? 'حماية فائقة خلال الرحلات البحرية' :
                  currentLang === 'es' ? 'Preservando la Frescura en Rutas Oceánicas' :
                  currentLang === 'fr' ? 'Préservation de la Fraîcheur sur Longues Traversées' :
                  currentLang === 'de' ? 'Sichert Frische auf Transozeanischen Routen' :
                  currentLang === 'vi' ? 'Giữ Độ Giòn Tự Nhiên Suốt Hành Trình Vận Chuyển' :
                  currentLang === 'ru' ? 'Защита от Влаги и Плесени при Трансокеанской Доставке' :
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
             currentLang === 'ko' ? '수출 특급 생선 부레(화교) 및 최고급 건해삼' :
             currentLang === 'ar' ? 'حويصلات الأسماك الفاخرة وخيار البحر عالي الجودة' :
             currentLang === 'es' ? 'Buches de Pescado de Exportación y Pepino de Mar Prémium' :
             currentLang === 'fr' ? 'Vessies Natatoires d\'Exportation & Holothuries de Luxe' :
             currentLang === 'de' ? 'Export-Fischblasen (Fish Maw) & Edle Seegurken' :
             currentLang === 'vi' ? 'Bong Bóng Cá Xuất Khẩu & Hải Sâm Khô Thượng Hạng' :
             currentLang === 'ru' ? 'Рыбьи Пузыри Экспортного Класса и Морской Огурец' :
             'Export Grade Fish Maw & Premium Sea Cucumber',
      highlight: currentLang === 'id' ? 'Kargo Udara Kilat & FCL Kontainer' :
                 currentLang === 'zh' ? '空运极速与整柜海运' :
                 currentLang === 'ja' ? '航空便＆海上コンテナ' :
                 currentLang === 'ko' ? '항공 특송 및 FCL 컨테이너' :
                 currentLang === 'ar' ? 'شحن جوي سريع وحاويات بحرية' :
                 currentLang === 'es' ? 'Flete Aéreo Prioritario y FCL Marítimo' :
                 currentLang === 'fr' ? 'Fret Aérien Prioritaire & FCL Maritime' :
                 currentLang === 'de' ? 'Prioritäre Luftfracht & FCL-Seefracht' :
                 currentLang === 'vi' ? 'Vận Chuyển Hàng Không Hỏa Tốc & Container FCL' :
                 currentLang === 'ru' ? 'Приоритетный Авиафрахт и Морские FCL' :
                 'Priority Air Freight & Ocean FCL',
      titlePart2: currentLang === 'id' ? 'Direct ke Hong Kong, Taiwan, LA, & Dubai' :
                  currentLang === 'zh' ? '直达香港、台湾、洛杉矶与迪拜' :
                  currentLang === 'ja' ? '香港・台湾・米国・ドバイへ直送' :
                  currentLang === 'ko' ? '홍콩, 대만, 미국 LA, 두바이 직배송' :
                  currentLang === 'ar' ? 'مباشرة إلى الخليج، آسيا، وأمريكا' :
                  currentLang === 'es' ? 'Directo a Hong Kong, Taiwán, LA y Dubái' :
                  currentLang === 'fr' ? 'Direct vers Hong Kong, Taïwan, LA et Dubaï' :
                  currentLang === 'de' ? 'Direkt nach Hongkong, Taiwan, LA & Dubai' :
                  currentLang === 'vi' ? 'Giao Trực Tiếp Đến Hồng Kông, Đài Loan, LA & Dubai' :
                  currentLang === 'ru' ? 'Прямые Рейсы в Гонконг, Тайвань, Лос-Анджелес и Дубай' :
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
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden bg-white border-b border-slate-200">
      
      {/* Background Soft Oceanic Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-50/70 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN HERO SPLIT: COASTAL SUN DRYING PANORAMA (LEFT) + EXPORT OVERVIEW & VALUE PILLARS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Coastal Beach Drying Scene */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=85"
                alt="Pengeringan Ikan Teri Tradisional Pesisir Indonesia"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Soft Oceanic Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 text-slate-800 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                      Sentra Pesisir Nusantara
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">
                      Penjemuran Alami & Higienis oleh Nelayan Tradisional
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-extrabold text-[10px] tracking-wider uppercase shrink-0">
                    100% NATURAL
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Quality Stamp */}
            <div className="absolute -top-4 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white shadow-xl border border-teal-100">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-black">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Kadar Air Terkontrol</div>
                <div className="text-xs font-black text-slate-900">Moisture &lt; 12% Max</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Localized Title, Brand Emblem, Vignettes & Value Pillars */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Display Headline */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15] font-sans">
                {t.hero.titlePart1}{' '}
                <span className="text-teal-700">
                  {t.hero.titleHighlight}
                </span>{' '}
                {t.hero.titlePart2}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* Brand Emblem & 3 Circular Photographic Vignettes */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 py-1">
              
              {/* SHRIMORA Sea-Green Circular Emblem */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-50/70 border-2 border-teal-600 flex items-center justify-center shadow-md p-1.5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-teal-700" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5" />
                    <path d="M 26 44 C 36 26 65 26 76 40 C 66 40 50 46 34 46" stroke="currentColor" strokeWidth="4.5" />
                    <path d="M 34 54 C 50 54 66 60 76 58 C 66 74 36 74 26 56 Z" fill="#0d9488" fillOpacity="0.2" stroke="currentColor" strokeWidth="4.5" />
                    <circle cx="67" cy="38" r="3.5" fill="#0d9488" />
                    <path d="M 74 48 C 82 46 88 42 90 38" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M 74 52 C 82 54 88 58 90 62" stroke="currentColor" strokeWidth="3.5" />
                  </svg>
                </div>
                <span className="text-[11px] font-black tracking-wider text-teal-700 mt-1 uppercase">
                  SHRIMORA
                </span>
              </div>

              {/* 3 Circular Photographic Vignettes */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="group relative">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-teal-600 transition-all">
                    <img 
                      src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=200&q=80" 
                      alt="Nelayan & Perahu Tradisional" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 block text-center mt-1">Nelayan</span>
                </div>

                <div className="group relative">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-teal-600 transition-all">
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80" 
                      alt="Rak Penjemuran Surya" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 block text-center mt-1">Penjemuran</span>
                </div>

                <div className="group relative">
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-teal-600 transition-all">
                    <img 
                      src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=200&q=80" 
                      alt="Sortasi & Laboratorium Higienis" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 block text-center mt-1">Sortasi</span>
                </div>
              </div>
            </div>

            {/* 4 Core Export Value Pillars */}
            <div className="w-full pt-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto lg:mx-0">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center hover:border-teal-400 transition-colors">
                  <div className="text-[11px] sm:text-xs font-black text-teal-800 tracking-wider uppercase">QUALITY</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Grade A Certified</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center hover:border-teal-400 transition-colors">
                  <div className="text-[11px] sm:text-xs font-black text-teal-800 tracking-wider uppercase">CONSISTENCY</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Moisture &lt;12%</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center hover:border-teal-400 transition-colors">
                  <div className="text-[11px] sm:text-xs font-black text-teal-800 tracking-wider uppercase">TRACEABILITY</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Lot & Batch QR</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center hover:border-teal-400 transition-colors">
                  <div className="text-[11px] sm:text-xs font-black text-teal-800 tracking-wider uppercase">RELIABILITY</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">FCL Container</div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <button
                onClick={() => onScrollTo('#kontak')}
                className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{t.hero.ctaRfq}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onScrollTo('#komoditas')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm border border-slate-200 shadow-2xs transition-all cursor-pointer"
              >
                <Package className="w-4 h-4 text-teal-700" />
                <span>{t.hero.ctaCatalog}</span>
              </button>

              {onOpenCatalogModal && (
                <button
                  onClick={onOpenCatalogModal}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-teal-50 text-teal-800 font-medium px-4 py-3 rounded-xl text-xs border border-teal-200 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>PDF Spec</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Key Operational KPI Metric Cards in Clean White Theme */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 hover:border-[#009bb3]/40 p-4 sm:p-5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                {t.hero.statCountriesLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#009bb3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.hero.statCountries}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                Asia, Americas, Europe, Middle East
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 hover:border-[#009bb3]/40 p-4 sm:p-5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                {t.hero.statVolumeLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#009bb3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Ship className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.hero.statVolume}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                FCL Ocean & Air Cargo
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 hover:border-[#009bb3]/40 p-4 sm:p-5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                {t.hero.statSatisfactionLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#009bb3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.hero.statSatisfaction}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                Strict Moisture & COA Compliance
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 hover:border-[#009bb3]/40 p-4 sm:p-5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                {t.hero.statFarmsLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#009bb3] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Warehouse className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.hero.statFarms}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                Kemitraan Nelayan Pesisir
              </div>
            </div>
          </div>
        </div>

        {/* Global Certifications Showcase Ticker */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mb-3">
            {t.about.certSectionTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CERTIFICATIONS.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-900">{cert.name}</span>
                <span className="text-slate-500 hidden sm:inline">• {cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

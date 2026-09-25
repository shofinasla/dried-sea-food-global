import { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { BUYER_TESTIMONIALS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';
import { getLocalizedTestimonial } from '../utils/localizedData';

export default function BuyerTestimonials() {
  const { t, currentLang } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  const localizedTestimonials = BUYER_TESTIMONIALS.map(item => getLocalizedTestimonial(item, currentLang));
  const totalSlides = localizedTestimonials.length;

  const getGlobalDestinations = () => {
    if (isIndonesian) {
      return [
        { country: 'Amerika Serikat', flag: '🇺🇸', ports: 'Long Beach & New York', volume: '1.200+ TEUs/Thn' },
        { country: 'Jerman & Eropa', flag: '🇩🇪', ports: 'Hamburg & Rotterdam', volume: '950+ TEUs/Thn' },
        { country: 'Uni Emirat Arab', flag: '🇦🇪', ports: 'Jebel Ali Port (Dubai)', volume: '800+ TEUs/Thn' },
        { country: 'Jepang & Asia Timur', flag: '🇯🇵', ports: 'Yokohama & Tokyo Port', volume: '650+ TEUs/Thn' },
        { country: 'Australia & NZ', flag: '🇦🇺', ports: 'Sydney & Melbourne', volume: '420+ TEUs/Thn' },
        { country: 'Prancis & Swiss', flag: '🇫🇷', ports: 'Le Havre & Marseille', volume: '380+ TEUs/Thn' }
      ];
    }
    if (isArabic) {
      return [
        { country: 'الولايات المتحدة', flag: '🇺🇸', ports: 'لونغ بيتش ونيويورك', volume: '+1,200 حاوية/سنة' },
        { country: 'ألمانيا وأوروبا', flag: '🇩🇪', ports: 'هامبورغ وروتردام', volume: '+950 حاوية/سنة' },
        { country: 'الإمارات العربية المتحدة', flag: '🇦🇪', ports: 'ميناء جبل علي (دبي)', volume: '+800 حاوية/سنة' },
        { country: 'اليابان وشرق آسيا', flag: '🇯🇵', ports: 'يوكوهاما وطوكيو', volume: '+650 حاوية/سنة' },
        { country: 'أستراليا ونيوزيلندا', flag: '🇦🇺', ports: 'سيدني وملبورن', volume: '+420 حاوية/سنة' },
        { country: 'فرنسا وسويسرا', flag: '🇫🇷', ports: 'لو هافر ومارسيليا', volume: '+380 حاوية/سنة' }
      ];
    }
    return [
      { country: 'United States', flag: '🇺🇸', ports: 'Long Beach & New York', volume: '1,200+ TEUs/Yr' },
      { country: 'Germany & Europe', flag: '🇩🇪', ports: 'Hamburg & Rotterdam', volume: '950+ TEUs/Yr' },
      { country: 'United Arab Emirates', flag: '🇦🇪', ports: 'Jebel Ali Port (Dubai)', volume: '800+ TEUs/Yr' },
      { country: 'Japan & East Asia', flag: '🇯🇵', ports: 'Yokohama & Tokyo Port', volume: '650+ TEUs/Yr' },
      { country: 'Australia & NZ', flag: '🇦🇺', ports: 'Sydney & Melbourne', volume: '420+ TEUs/Yr' },
      { country: 'France & Switzerland', flag: '🇫🇷', ports: 'Le Havre & Marseille', volume: '380+ TEUs/Yr' }
    ];
  };

  const globalDestinations = getGlobalDestinations();

  const labels = {
    verifiedBuyer: isArabic ? 'مستورد ومشتري معتمد' : isIndonesian ? 'Verified Importer / Buyer' : 'Verified Importer / Buyer',
    commodityPurchased: isArabic ? 'السلعة المشتراة:' : isIndonesian ? 'Komoditas Dibeli:' : 'Commodity Purchased:',
    annualVolume: isArabic ? 'حجم التعاقد الدوري:' : isIndonesian ? 'Volume Kontrak Rutin:' : 'Contracted Volume:',
    bannerTitle: isArabic ? 'هل ترغب في أن تصبح مستورداً أو شريكاً رسمياً لنا؟' : isIndonesian ? 'Ingin Menjadi Mitra Importir atau Pembeli Resmi Kami?' : 'Become an Official Importer or Buying Partner',
    bannerDesc: isArabic ? 'استشر فريق التجارة الدولية حول مواصفات الشحنات وعينات المختبر وخيارات الدفع عبر الاعتماد المستندي (L/C).' : isIndonesian ? 'Konsultasikan spesifikasi kargo, sampel uji laboratorium, dan skema pembayaran L/C dengan divisi perdagangan ekspor.' : 'Consult cargo specifications, laboratory test samples, and L/C payment structures directly with our export division.',
    bannerCta: isArabic ? 'تواصل مع فريق التصدير' : isIndonesian ? 'Hubungi Tim Ekspor' : 'Contact Export Team',
    slideAutoNote: isIndonesian ? 'Otomatis bergeser setiap 5 detik' : isArabic ? 'يتحرك تلقائياً كل 5 ثوانٍ' : 'Auto-advances every 5 seconds'
  };

  // Next & Prev handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const handleGoTo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // 5-second interval timer with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const step = (intervalMs / 5000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, currentIndex]);

  const currentTestimonial = localizedTestimonials[currentIndex];

  return (
    <section 
      id="testimoni" 
      className="py-20 bg-slate-50 relative border-t border-slate-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>{t.testimonials?.badge || (isArabic ? 'آراء شركائنا الموثوقين' : isIndonesian ? 'PENILAIAN & KEPERCAYAAN IMPORTIR' : 'GLOBAL PARTNERSHIPS & BUYER TRUST')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight uppercase font-sans">
            {t.testimonials?.title || (isArabic ? 'ماذا يقول المستوردون الدوليون عن جودتنا' : isIndonesian ? 'Dipercaya oleh Ratusan Importir & Distributor Pasar Global' : 'Trusted by Importers & Distributors Worldwide')}
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t.testimonials?.subtitle || (isArabic ? 'تقييمات واقعية وموثقة من مديري المشتريات ومستوردي الأغذية في الشرق الأوسط، آسيا، وأمريكا الشمالية.' : isIndonesian ? 'Penilaian bintang 5 dari para importir resmi terhadap mutu komoditas, keandalan jadwal pelayaran, serta jaminan perlindungan kontrak dagang internasional.' : '5-star reviews from verified international buyers and food distributors across North America, Asia, and the Middle East.')}
          </p>
        </div>

        {/* Global Destination Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {globalDestinations.map((dest, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#009bb3]/40 transition-all text-center shadow-xs"
            >
              <span className="text-xl block mb-0.5">{dest.flag}</span>
              <h4 className="text-[11px] font-bold text-slate-900 truncate">{dest.country}</h4>
              <p className="text-[9px] text-slate-500 truncate mt-0.5">{dest.ports}</p>
              <span className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-[9px] font-bold">
                {dest.volume}
              </span>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 5-STAR REVIEWS AUTO SLIDER CONTAINER (5 SECONDS TIMER)        */}
        {/* ============================================================ */}
        <div className="max-w-4xl mx-auto">
          
          {/* Main Slide Card */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#009bb3]/50 rounded-3xl p-6 sm:p-10 shadow-sm relative transition-all duration-500 overflow-hidden group">
            
            {/* Top 5-Second Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#009bb3] to-[#519992] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-14 sm:w-20 sm:h-20 text-teal-50 pointer-events-none group-hover:text-teal-100 transition-colors" />

            <div className="relative z-10">
              
              {/* Rating + Badge + Slide Counter Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                
                {/* 5-Star Indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                    {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-black text-amber-800">5.0</span>
                  </div>

                  {currentTestimonial.verifiedTransaction && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{labels.verifiedBuyer}</span>
                    </span>
                  )}
                </div>

                {/* Counter & Play/Pause status indicator */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                  <span className="text-[#009bb3] text-sm font-bold">0{currentIndex + 1}</span>
                  <span>/</span>
                  <span>0{totalSlides}</span>
                  <span className="hidden sm:inline text-[10px] text-slate-400 font-sans font-normal ml-2">
                    ({labels.slideAutoNote})
                  </span>
                </div>
              </div>

              {/* Review Quote Text */}
              <blockquote className="text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-medium italic min-h-[90px] flex items-center">
                "{currentTestimonial.comment}"
              </blockquote>

              {/* Purchase Spec Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">{labels.commodityPurchased}</span>
                  <span className="text-[#009bb3] font-bold truncate max-w-[220px]">{currentTestimonial.commodityPurchased}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">{labels.annualVolume}</span>
                  <span className="text-slate-800 font-bold">{currentTestimonial.volumeAnnually}</span>
                </div>
              </div>

              {/* Buyer Profile + Carousel Controls Footer */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Buyer Identity */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={currentTestimonial.avatarUrl}
                    alt={currentTestimonial.buyerName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-100 shrink-0 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{currentTestimonial.buyerName}</h4>
                      <span className="text-base shrink-0">{currentTestimonial.flag}</span>
                    </div>
                    <p className="text-xs text-[#009bb3] font-semibold truncate">
                      {currentTestimonial.buyerRole}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <Building className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{currentTestimonial.companyName} • {currentTestimonial.country}</span>
                    </p>
                  </div>
                </div>

                {/* Slider Controls (Prev / Next / Dots) */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={handlePrev}
                    id="btn-testimonial-prev"
                    aria-label="Previous Testimonial"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#009bb3] text-slate-700 hover:text-white border border-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5 px-2">
                    {localizedTestimonials.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => handleGoTo(dotIdx)}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          dotIdx === currentIndex
                            ? 'w-7 bg-[#009bb3]'
                            : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    id="btn-testimonial-next"
                    aria-label="Next Testimonial"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#009bb3] text-slate-700 hover:text-white border border-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-[#009bb3] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#009bb3]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{labels.bannerTitle}</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{labels.bannerDesc}</p>
            </div>
          </div>
          <a
            href="#kontak"
            className="px-5 py-2.5 rounded-full bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs whitespace-nowrap transition-all shadow-xs cursor-pointer"
          >
            {labels.bannerCta}
          </a>
        </div>

      </div>
    </section>
  );
}

import { 
  ArrowRight, 
  Globe2, 
  Ship, 
  Award, 
  Warehouse, 
  CheckCircle2,
  Sparkles,
  Package,
  Mail,
  Download
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({ onScrollTo, onOpenSSLModal, onOpenCatalogModal }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:py-20 overflow-hidden bg-white border-b border-slate-200">
      
      {/* Background Soft Oceanic Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-50/50 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN HERO SPLIT: COASTAL VISUAL (LEFT) + VALUE PROPOSITION & ACTIONS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Coastal Beach Drying Scene */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/images/hero/tempat-penjemuran-ikan.png"
                alt="Sentra Pengeringan Hasil Laut Pesisir Indonesia"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Soft Oceanic Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />
              
              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 text-slate-800 shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider">
                      Sentra Pengolahan Pesisir Indonesia
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-950 mt-0.5">
                      Penjemuran Surya Alami & Pengeringan Solar Dome Higienis
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] font-black text-[10px] tracking-wider uppercase shrink-0">
                    100% ALAMI
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Quality Stamp */}
            <div className="absolute -top-3 -left-2 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white shadow-lg border border-teal-100">
              <div className="w-7 h-7 rounded-full bg-teal-50 text-[#009bb3] flex items-center justify-center font-black text-xs">
                ✓
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kadar Air Terkontrol</div>
                <div className="text-xs font-black text-slate-950">Moisture &le; 12% Max</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Localized Title, Brand Identity, Scannable Narrative & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Display Headline */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
                <span>{t.hero.badge}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15] font-sans">
                {t.hero.titlePart1}{' '}
                <span className="text-[#009bb3]">
                  {t.hero.titleHighlight}
                </span>{' '}
                {t.hero.titlePart2}
              </h1>

              {/* Strict Max 600-680px Reading Measure */}
              <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* Brand Logo & Source Process Vignettes */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 py-1">
              
              {/* Dried Seafood Global official logo */}
              <div className="flex flex-col items-center shrink-0">
                <img
                  src="/logo-dsg.png"
                  alt="Dried Seafood Global logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* 3 Circular Photographic Vignettes */}
              <div className="flex items-center gap-3">
                <div className="group text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-[#009bb3] transition-all">
                    <img 
                      src="/images/hero/nelayan-perahu-tradisional.png" 
                      alt="Nelayan Tangkap" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 block mt-1">Sourcing</span>
                </div>

                <div className="group text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-[#009bb3] transition-all">
                    <img 
                      src="/images/hero/penjemur-surya.png" 
                      alt="Penjemuran Higienis" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 block mt-1">Drying</span>
                </div>

                <div className="group text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs group-hover:border-[#009bb3] transition-all">
                    <img 
                      src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=200&q=80" 
                      alt="Quality Control Laboratorium" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 block mt-1">QC & Lab</span>
                </div>
              </div>
            </div>

            {/* 4 Core Value Attributes */}
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto lg:mx-0">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-teal-300 transition-colors">
                  <div className="text-xs font-black text-[#009bb3] uppercase tracking-wider">GRADE A</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">Bebas Bahan Kimia</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-teal-300 transition-colors">
                  <div className="text-xs font-black text-[#009bb3] uppercase tracking-wider">KADAR AIR</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">Moisture &le; 12%</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-teal-300 transition-colors">
                  <div className="text-xs font-black text-[#009bb3] uppercase tracking-wider">LEGALITAS</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">NIB & BKIPM</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:border-teal-300 transition-colors">
                  <div className="text-xs font-black text-[#009bb3] uppercase tracking-wider">LOGISTIK</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">FCL & Udara</div>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <button
                onClick={() => onScrollTo('#kontak')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-extrabold px-6 py-3.5 rounded-full text-xs sm:text-sm tracking-wide shadow-md shadow-teal-500/20 transition-all cursor-pointer min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>{t.hero.ctaRfq}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => onScrollTo('#komoditas')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3.5 rounded-full text-xs sm:text-sm border border-slate-200 shadow-xs transition-all cursor-pointer min-h-[44px]"
              >
                <Package className="w-4 h-4 text-[#009bb3]" />
                <span>{t.hero.ctaCatalog}</span>
              </button>

              {onOpenCatalogModal && (
                <button
                  onClick={onOpenCatalogModal}
                  className="inline-flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-[#009bb3] font-bold px-4 py-3.5 rounded-full text-xs border border-teal-200 transition-all cursor-pointer min-h-[44px]"
                >
                  <Download className="w-3.5 h-3.5 text-[#009bb3]" />
                  <span>Katalog PDF</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Key Operational KPI Metric Cards in Clean High-Contrast Light Theme */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 hover:border-[#009bb3]/40 p-5 rounded-2xl transition-all group shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.hero.statCountriesLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[#009bb3] flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {t.hero.statCountries}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Asia, Amerika, Eropa, Timur Tengah
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 hover:border-[#009bb3]/40 p-5 rounded-2xl transition-all group shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.hero.statVolumeLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[#009bb3] flex items-center justify-center">
                <Ship className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {t.hero.statVolume}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                FCL Kontainer & Kargo Udara
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 hover:border-[#009bb3]/40 p-5 rounded-2xl transition-all group shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.hero.statSatisfactionLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[#009bb3] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {t.hero.statSatisfaction}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Kepatuhan COA & Sertifikasi BKIPM
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 hover:border-[#009bb3]/40 p-5 rounded-2xl transition-all group shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.hero.statFarmsLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[#009bb3] flex items-center justify-center">
                <Warehouse className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {t.hero.statFarms}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Kemitraan Nelayan & Sentra Pengeringan
              </div>
            </div>
          </div>
        </div>

        {/* Global Certifications & Standards Row */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mb-3">
            {t.about.certSectionTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CERTIFICATIONS.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs text-slate-700 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                <span className="font-bold text-slate-900">{cert.name}</span>
                <span className="text-slate-500 hidden sm:inline">&bull; {cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import { ArrowRight, Package, Download } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({ onScrollTo, onOpenCatalogModal }: HeroProps) {
  const { t, currentLang } = useTranslation();

  const isIndonesian = currentLang === 'id';

  // Factual trust points backed strictly by verified company data
  const trustPoints = [
    {
      label: isIndonesian ? 'ASAL' : 'ORIGIN',
      value: 'Indonesia',
      desc: isIndonesian ? 'Sentra Sourcing Pesisir Nusantara' : 'Direct Coastal Fishery Sourcing'
    },
    {
      label: isIndonesian ? 'FOKUS BISNIS' : 'BUSINESS FOCUS',
      value: isIndonesian ? 'Ekspor B2B' : 'B2B Export Supply',
      desc: isIndonesian ? 'Importir, Distributor & Industri' : 'Importers, Wholesalers & Industry'
    },
    {
      label: isIndonesian ? 'KOMODITAS' : 'PRODUCT FOCUS',
      value: isIndonesian ? 'Hasil Laut Kering' : 'Dried Seafood',
      desc: isIndonesian ? 'Ikan Asin, Teri Nasi, Cumi & Fish Maw' : 'Salted Fish, Anchovy, Squid & Maw'
    },
    {
      label: isIndonesian ? 'KEPATUHAN' : 'COMPLIANCE',
      value: 'NIB & BKIPM Resmi',
      desc: isIndonesian ? 'Health Certificate & Sertifikasi Karantina' : 'Official Quarantine Health Certificate'
    }
  ];

  return (
    <section id="hero" className="relative bg-white border-b border-slate-200 pt-8 pb-14 lg:pt-14 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP TWO-COLUMN LAYOUT (50/50) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Business Message */}
          <div className="col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
              <span>{t.hero.badge || (isIndonesian ? 'HASIL LAUT KERING INDONESIA' : 'INDONESIAN DRIED SEAFOOD')}</span>
            </div>

            {/* Dominant H1 (Scale ~56-64px) */}
            <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-slate-950 leading-[1.12] font-sans">
              <span className="block">{t.hero.titlePart1}</span>
              <span className="block text-[#009bb3]">{t.hero.titleHighlight}</span>
              <span className="block text-slate-900">{t.hero.titlePart2}</span>
            </h1>

            {/* Concise Supporting Description (1-2 sentences, max-w-xl) */}
            <p className="mt-6 text-base xl:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.hero.description}
            </p>

            {/* CTA Hierarchy */}
            <div className="mt-8 flex items-center gap-3">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => onScrollTo('#kontak')}
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#009bb3] hover:bg-[#008399] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer min-h-[44px]"
              >
                <span>{t.hero.ctaRfq || (isIndonesian ? 'Minta Penawaran (RFQ)' : 'Request a Quote')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => onScrollTo('#komoditas')}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-2xs transition-all cursor-pointer min-h-[44px]"
              >
                <Package className="w-4 h-4 text-slate-500" />
                <span>{t.hero.ctaCatalog || (isIndonesian ? 'Lihat Produk' : 'Explore Products')}</span>
              </button>

              {/* Discreet Catalog PDF Option */}
              {onOpenCatalogModal && (
                <button
                  type="button"
                  onClick={onOpenCatalogModal}
                  id="hero-catalog-modal-btn"
                  title="Unduh Katalog Spesifikasi Produk Ekspor (PDF)"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Premium Real Company/Sourcing Visual */}
          <div className="col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-sm aspect-[4/3] xl:aspect-[16/11]">
              <img
                src="/images/hero/tempat-penjemuran-ikan.png"
                alt="Sentra Penjemuran Hasil Laut Kering Pesisir Indonesia"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Minimal, elegant photo caption */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200/90 text-slate-800 flex items-center justify-between shadow-2xs">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#009bb3]">
                    {isIndonesian ? 'Sentra Pengeringan Alami Nusantara' : 'Indonesian Coastal Drying Center'}
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                    {isIndonesian ? 'Penjemuran Surya Alami & Higienitas Terkontrol' : 'Natural Sun-Drying & Controlled Moisture'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {isIndonesian ? '100% Alami' : '100% Natural'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* DEDICATED MOBILE LAYOUT */}
        {/* Sequence: EYEBROW -> H1 -> SHORT DESCRIPTION -> PRIMARY CTA -> SECONDARY CTA -> IMAGE -> TRUST STRIP */}
        <div className="block lg:hidden text-left">
          
          {/* 1. Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
            <span>{t.hero.badge || (isIndonesian ? 'HASIL LAUT KERING INDONESIA' : 'INDONESIAN DRIED SEAFOOD')}</span>
          </div>

          {/* 2. Dominant H1 (Scale ~36-44px) */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 leading-[1.18] font-sans">
            <span className="block">{t.hero.titlePart1}</span>
            <span className="block text-[#009bb3]">{t.hero.titleHighlight}</span>
            <span className="block text-slate-900">{t.hero.titlePart2}</span>
          </h1>

          {/* 3. Short Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.hero.description}
          </p>

          {/* 4. Action Buttons (Primary & Secondary) */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => onScrollTo('#kontak')}
              id="hero-mobile-primary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#009bb3] hover:bg-[#008399] text-white font-bold text-sm shadow-sm transition-all cursor-pointer min-h-[48px]"
            >
              <span>{t.hero.ctaRfq || (isIndonesian ? 'Minta Penawaran (RFQ)' : 'Request a Quote')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onScrollTo('#komoditas')}
              id="hero-mobile-secondary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-2xs transition-all cursor-pointer min-h-[48px]"
            >
              <Package className="w-4 h-4 text-slate-500" />
              <span>{t.hero.ctaCatalog || (isIndonesian ? 'Lihat Produk' : 'Explore Products')}</span>
            </button>
          </div>

          {/* 5. Real Visual Image (Placed below CTAs to prevent pushing essential content below fold) */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-[16/10]">
            <img
              src="/images/hero/tempat-penjemuran-ikan.png"
              alt="Sentra Penjemuran Hasil Laut Kering Pesisir Indonesia"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 text-[11px] truncate">
                {isIndonesian ? 'Sentra Pengeringan Pesisir Indonesia' : 'Indonesian Coastal Drying Center'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium shrink-0 ml-2">
                {isIndonesian ? 'Kadar Air Terstandarisasi' : 'Standardized Moisture'}
              </span>
            </div>
          </div>

        </div>

        {/* 6. SUBTLE FACTUAL TRUST STRIP (Desktop & Mobile) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {trustPoints.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <div className="text-sm sm:text-base font-black text-slate-950 mt-1">
                    {item.value}
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5 leading-tight">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

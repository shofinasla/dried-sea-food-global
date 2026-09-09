import { useState } from 'react';
import { 
  Package, 
  Layers, 
  CheckCircle2, 
  Award, 
  Globe2, 
  ExternalLink, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Search,
  Eye,
  X,
  Send,
  ShieldCheck,
  Download
} from 'lucide-react';
import { EXPORT_COMMODITIES } from '../data/initialData';
import { ExportCommodity } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface ExportCommoditiesProps {
  onSelectCommodityForQuote: (commodityName: string) => void;
  onOpenCatalogModal: () => void;
}

export default function ExportCommodities({ 
  onSelectCommodityForQuote,
  onOpenCatalogModal 
}: ExportCommoditiesProps) {
  const { t, currentLang } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCommodity, setActiveModalCommodity] = useState<ExportCommodity | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: t.commodities?.filterAll || 'All Products' },
    { id: 'Ikan Kering & Asin', label: t.commodities?.filterFish || 'Dried & Salted Fish' },
    { id: 'Cumi & Gurita Kering', label: t.commodities?.filterSquid || 'Dried Squid & Octopus' },
    { id: 'Fish Maw & Mewah', label: t.commodities?.filterMaw || 'Fish Maw & Luxury' },
    { id: 'Udang Kering & Ebi', label: t.commodities?.filterShrimp || 'Dried Shrimp & Ebi' }
  ];

  const filteredCommodities = EXPORT_COMMODITIES.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indonesianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openCommodityDetail = (commodity: ExportCommodity) => {
    setActiveModalCommodity(commodity);
    setActiveImageIndex(0);
  };

  return (
    <section id="komoditas" className="py-24 bg-slate-900/60 relative border-t border-slate-800/80 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.commodities?.badge || 'EXPORT GRADE COMMODITIES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-serif">
              {t.commodities?.title || 'Flagship Commodities'}
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.commodities?.subtitle || ''}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalogModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.commodities?.downloadCatalog || 'Download Export Catalog (PDF)'}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.commodities?.searchPlaceholder || 'Search commodities...'}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommodities.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              <div>
                {/* Photo with badges and zoom overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                  
                  {/* Category & Origin Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 text-[10px] font-extrabold uppercase">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase shadow-sm">
                        Top Export
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-mono">
                      HS: {item.hsCode}
                    </span>
                  </div>

                  {/* Quick View Button on Image */}
                  <button
                    onClick={() => openCommodityDetail(item)}
                    className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-slate-900/90 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors shadow-lg border border-slate-700 flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Foto & Spek</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-amber-500/90 font-medium mt-0.5 mb-3">
                    {item.indonesianName}
                  </p>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  {/* Specs Quick Matrix */}
                  <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 space-y-2 mb-4 text-[11px]">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>{t.commodities.origin}:</span>
                      <span className="text-slate-200 font-medium text-right max-w-[180px] truncate">{item.origin}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>{t.commodities.grade}:</span>
                      <span className="text-amber-300 font-bold">{item.specification.grade}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>{t.commodities.moq}:</span>
                      <span className="text-slate-200 font-semibold">{item.specification.moq}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>{t.commodities.supplyCapacity}:</span>
                      <span className="text-emerald-400 font-bold">{item.supplyCapacity}</span>
                    </div>
                  </div>

                  {/* Certifications badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                      {t.commodities.certifications}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.certifications.slice(0, 3).map((cert, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-[10px] font-medium flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{cert}</span>
                        </span>
                      ))}
                      {item.certifications.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px]">
                          +{item.certifications.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => openCommodityDetail(item)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-colors text-center cursor-pointer"
                >
                  {t.commodities.specs}
                </button>
                <button
                  onClick={() => onSelectCommodityForQuote(item.name)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                >
                  <span>{t.commodities.requestQuote}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal with High-Res Photo Gallery & Technical Spec Sheet */}
      {activeModalCommodity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCommodity(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Column: Visual Gallery Carousel */}
              <div className="p-6 sm:p-8 bg-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-4 border border-slate-800">
                    <img
                      src={activeModalCommodity.galleryImages[activeImageIndex] || activeModalCommodity.imageUrl}
                      alt={activeModalCommodity.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-[11px] font-mono text-amber-400 border border-slate-700">
                      Foto {activeImageIndex + 1} dari {activeModalCommodity.galleryImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex items-center gap-2">
                    {activeModalCommodity.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Export Highlights */}
                <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-2 font-bold uppercase tracking-wider text-[10px]">
                    Destinasi Utama Ekspor Komoditas Ini:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalCommodity.keyMarkets.map((market, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-amber-400" />
                        <span>{market}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Complete Technical Specifications & IncoTerms */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                      HS Code: {activeModalCommodity.hsCode}
                    </span>
                    <span className="text-xs text-slate-400">
                      Kategori: {activeModalCommodity.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {activeModalCommodity.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mb-4">
                    {activeModalCommodity.indonesianName}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {activeModalCommodity.description}
                  </p>

                  {/* Detailed Spec Sheet Table */}
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                    Lembar Spesifikasi Mutu Ekspor:
                  </h4>
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                    <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                      <span className="text-slate-400">Wilayah Asal:</span>
                      <span className="col-span-2 text-slate-200 font-medium">{activeModalCommodity.origin}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                      <span className="text-slate-400">Standar Grade:</span>
                      <span className="col-span-2 text-amber-400 font-bold">{activeModalCommodity.specification.grade}</span>
                    </div>
                    {activeModalCommodity.specification.moisture && (
                      <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                        <span className="text-slate-400">Kadar Air (Moisture):</span>
                        <span className="col-span-2 text-slate-200">{activeModalCommodity.specification.moisture}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                      <span className="text-slate-400">Standar Kemasan:</span>
                      <span className="col-span-2 text-slate-200">{activeModalCommodity.specification.packaging}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                      <span className="text-slate-400">Minimum Order (MOQ):</span>
                      <span className="col-span-2 text-emerald-400 font-bold">{activeModalCommodity.specification.moq}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-900">
                      <span className="text-slate-400">Kapasitas Pasokan:</span>
                      <span className="col-span-2 text-slate-200">{activeModalCommodity.supplyCapacity}</span>
                    </div>
                    {activeModalCommodity.specification.colorTexture && (
                      <div className="grid grid-cols-3 py-1">
                        <span className="text-slate-400">Karakteristik Fisik:</span>
                        <span className="col-span-2 text-slate-300">{activeModalCommodity.specification.colorTexture}</span>
                      </div>
                    )}
                  </div>

                  {/* Certifications Row */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                      Sertifikat & Izin Laboratorium Tersedia:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeModalCommodity.certifications.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onSelectCommodityForQuote(activeModalCommodity.name);
                      setActiveModalCommodity(null);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Minta Penawaran Harga (FOB / CIF / CFR)</span>
                  </button>
                  <button
                    onClick={() => setActiveModalCommodity(null)}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Tutup
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

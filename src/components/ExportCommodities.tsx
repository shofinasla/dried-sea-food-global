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
    <section id="komoditas" className="py-24 bg-white relative border-t border-b border-slate-200 overflow-hidden">
      {/* Background Decorative Soft Tint */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Inspiration from Image 1: KATALOG PRODUK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>KATALOG PRODUK EKSPOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight uppercase font-sans">
              Koleksi Komoditas Hasil Laut Kering Kualitas Ekspor
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Diproses dengan higienitas ketat, kadar garam terstandarisasi, dan pengemasan vakum multi-lapis untuk menjaga aroma, tekstur, serta daya simpan maksimal bagi importir mancanegara.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalogModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Katalog Ekspor (PDF)</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
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
              placeholder="Cari nama ikan, cumi, HS Code..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#009bb3] focus:ring-2 focus:ring-teal-100 transition-all"
            />
          </div>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommodities.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Photo with badges and zoom overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />
                  
                  {/* Category & Origin Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[10px] font-extrabold uppercase shadow-xs">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-[10px] font-extrabold uppercase shadow-sm">
                        Top Export
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                      HS: {item.hsCode}
                    </span>
                  </div>

                  {/* 4 Pillars Mini Tag Bar Inspired by Image 1 */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] font-black text-slate-800 uppercase shadow-xs">
                      SALTED
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] font-black text-[#009bb3] uppercase shadow-xs">
                      NATURAL
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] font-black text-[#519992] uppercase shadow-xs">
                      DRIED
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] font-black text-slate-800 uppercase shadow-xs">
                      PACKED
                    </span>
                  </div>

                  {/* Quick View Button on Image */}
                  <button
                    onClick={() => openCommodityDetail(item)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/95 hover:bg-[#009bb3] text-slate-800 hover:text-white transition-colors shadow-md flex items-center justify-center cursor-pointer"
                    title="Lihat Foto & Spek"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-[#009bb3] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#519992] font-bold mt-0.5 mb-3">
                    {item.indonesianName}
                  </p>
                  
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  {/* Specs Quick Matrix */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-2 mb-4 text-[11px]">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Asal Perairan:</span>
                      <span className="text-slate-800 font-semibold text-right max-w-[180px] truncate">{item.origin}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Standar Grade:</span>
                      <span className="text-[#009bb3] font-black">{item.specification.grade}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Min. Order (MOQ):</span>
                      <span className="text-slate-800 font-bold">{item.specification.moq}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Kapasitas Pasokan:</span>
                      <span className="text-[#519992] font-black">{item.supplyCapacity}</span>
                    </div>
                  </div>

                  {/* Certifications badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">
                      Sertifikasi Mutu:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.certifications.slice(0, 3).map((cert, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#009bb3] text-[10px] font-bold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{cert}</span>
                        </span>
                      ))}
                      {item.certifications.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
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
                  className="flex-1 py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors text-center cursor-pointer"
                >
                  Spesifikasi Teknis
                </button>
                <button
                  onClick={() => onSelectCommodityForQuote(item.name)}
                  className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-md shadow-teal-500/20 cursor-pointer"
                >
                  <span>Minta Penawaran</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal with High-Res Photo Gallery & Technical Spec Sheet */}
      {activeModalCommodity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-800">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCommodity(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Column: Visual Gallery Carousel */}
              <div className="p-6 sm:p-8 bg-slate-50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 mb-4 border border-slate-200">
                    <img
                      src={activeModalCommodity.galleryImages[activeImageIndex] || activeModalCommodity.imageUrl}
                      alt={activeModalCommodity.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-[11px] font-mono text-white">
                      Foto {activeImageIndex + 1} dari {activeModalCommodity.galleryImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex items-center gap-2">
                    {activeModalCommodity.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'border-[#009bb3] scale-105 shadow-md' : 'border-slate-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Export Highlights */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-xs">
                  <span className="text-slate-500 block mb-2 font-extrabold uppercase tracking-wider text-[10px]">
                    Destinasi Utama Ekspor Komoditas Ini:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalCommodity.keyMarkets.map((market, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs flex items-center gap-1 shadow-xs">
                        <Globe2 className="w-3 h-3 text-[#009bb3]" />
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
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold">
                      HS Code: {activeModalCommodity.hsCode}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Kategori: {activeModalCommodity.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 mb-1">
                    {activeModalCommodity.name}
                  </h3>
                  <p className="text-xs text-[#519992] font-bold mb-4">
                    {activeModalCommodity.indonesianName}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {activeModalCommodity.description}
                  </p>

                  {/* Detailed Spec Sheet Table */}
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2.5">
                    Lembar Spesifikasi Mutu Ekspor:
                  </h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">Wilayah Asal:</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{activeModalCommodity.origin}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">Standar Grade:</span>
                      <span className="col-span-2 text-[#009bb3] font-black">{activeModalCommodity.specification.grade}</span>
                    </div>
                    {activeModalCommodity.specification.moisture && (
                      <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                        <span className="text-slate-500">Kadar Air (Moisture):</span>
                        <span className="col-span-2 text-slate-800">{activeModalCommodity.specification.moisture}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">Standar Kemasan:</span>
                      <span className="col-span-2 text-slate-800">{activeModalCommodity.specification.packaging}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">Minimum Order (MOQ):</span>
                      <span className="col-span-2 text-[#519992] font-black">{activeModalCommodity.specification.moq}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">Kapasitas Pasokan:</span>
                      <span className="col-span-2 text-slate-800">{activeModalCommodity.supplyCapacity}</span>
                    </div>
                    {activeModalCommodity.specification.colorTexture && (
                      <div className="grid grid-cols-3 py-1">
                        <span className="text-slate-500">Karakteristik Fisik:</span>
                        <span className="col-span-2 text-slate-700">{activeModalCommodity.specification.colorTexture}</span>
                      </div>
                    )}
                  </div>

                  {/* Certifications Row */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">
                      Sertifikat & Izin Laboratorium Tersedia:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeModalCommodity.certifications.map((c, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#009bb3]" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onSelectCommodityForQuote(activeModalCommodity.name);
                      setActiveModalCommodity(null);
                    }}
                    className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Minta Penawaran Harga (FOB / CIF / CFR)</span>
                  </button>
                  <button
                    onClick={() => setActiveModalCommodity(null)}
                    className="py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
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

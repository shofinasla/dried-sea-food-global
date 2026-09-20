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
import { ExportCommodity } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { getCategoryLabel } from '../i18n/categoryLabels';
import { getLocalizedCommodity } from '../utils/localizedData';

interface ExportCommoditiesProps {
  products: ExportCommodity[];
  onSelectCommodityForQuote: (commodityName: string) => void;
  onOpenCatalogModal: () => void;
  onNavigateProducts?: () => void;
}

export default function ExportCommodities({ 
  products,
  onSelectCommodityForQuote,
  onOpenCatalogModal,
  onNavigateProducts
}: ExportCommoditiesProps) {
  const { t, currentLang } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCommodity, setActiveModalCommodity] = useState<ExportCommodity | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const localizedProducts = products.map(item => getLocalizedCommodity(item, currentLang));

  const categories = [
    { id: 'all', label: t.commodities?.filterAll || 'All Products' },
    ...Array.from(new Set(localizedProducts.map(item => item.category.trim()).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second))
      .map(category => ({ id: category, label: getCategoryLabel('product', category, currentLang) }))
  ];

  const filteredCommodities = localizedProducts.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.trim() === selectedCategory.trim();
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indonesianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Limit display to exactly 6 products on the main page
  const displayedCommodities = filteredCommodities.slice(0, 6);

  const uiTexts = {
    topProduct: currentLang === 'id' ? 'Produk Unggulan' : currentLang === 'ar' ? 'منتج رئيسي' : 'Top Product',
    viewSpecs: currentLang === 'id' ? 'Lihat Foto & Spek' : currentLang === 'ar' ? 'عرض الصور والمواصفات' : 'View Photos & Specs',
    viewDetails: currentLang === 'id' ? 'Detail Produk' : currentLang === 'ar' ? 'تفاصيل المنتج' : 'View Details',
    requestQuote: currentLang === 'id' ? 'Minta Penawaran' : currentLang === 'ar' ? 'طلب تسعير' : 'Request Quote',
    viewAllProducts: currentLang === 'id' ? 'Lihat Semua Katalog Komoditas' : currentLang === 'ar' ? 'عرض جميع منتجات التصدير' : 'View All Export Commodities',
    showingCount: (count: number, total: number) => {
      if (currentLang === 'id') return `Menampilkan ${count} dari ${total} komoditas ekspor unggulan`;
      if (currentLang === 'ar') return `عرض ${count} من أصل ${total} سلعة تصدير رئيسية`;
      return `Showing ${count} of ${total} featured export commodities`;
    },
    noResults: currentLang === 'id' ? 'Tidak ada produk yang cocok dengan pencarian Anda.' : currentLang === 'ar' ? 'لم يتم العثور على منتجات مطابقة لبحثك.' : 'No products matched your search.',
    resetFilter: currentLang === 'id' ? 'Reset Filter' : currentLang === 'ar' ? 'إعادة ضبط التصفية' : 'Reset Filters',
    photoCount: (current: number, total: number) => {
      if (currentLang === 'ar') return `صورة ${current} من ${total}`;
      if (currentLang === 'id') return `Foto ${current} dari ${total}`;
      return `Photo ${current} of ${total}`;
    },
    destinations: currentLang === 'id' ? 'Destinasi Utama Ekspor Komoditas Ini:' : currentLang === 'ar' ? 'وجهات التصدير الرئيسية لهذه السلعة:' : 'Key Export Destinations for this Commodity:',
    category: currentLang === 'id' ? 'Kategori:' : currentLang === 'ar' ? 'التصنيف:' : 'Category:',
    specSheet: currentLang === 'id' ? 'Lembar Spesifikasi Mutu Ekspor:' : currentLang === 'ar' ? 'ورقة المواصفات الفنية للتصدير:' : 'Export Quality Specification Sheet:',
    origin: currentLang === 'id' ? 'Wilayah Asal:' : currentLang === 'ar' ? 'ميناء المنشأ:' : 'Origin Region:',
    grade: currentLang === 'id' ? 'Standar Grade:' : currentLang === 'ar' ? 'معيار الجودة:' : 'Grade Standard:',
    moisture: currentLang === 'id' ? 'Kadar Air (Moisture):' : currentLang === 'ar' ? 'نسبة الرطوبة:' : 'Moisture Content:',
    packaging: currentLang === 'id' ? 'Standar Kemasan:' : currentLang === 'ar' ? 'طريقة التعبئة والتغليف:' : 'Packaging Standard:',
    moq: currentLang === 'id' ? 'Minimum Order (MOQ):' : currentLang === 'ar' ? 'الحد الأدنى للطلب (MOQ):' : 'Minimum Order (MOQ):',
    supplyCapacity: currentLang === 'id' ? 'Kapasitas Pasokan:' : currentLang === 'ar' ? 'طاقة الإمداد:' : 'Supply Capacity:',
    characteristics: currentLang === 'id' ? 'Karakteristik Fisik:' : currentLang === 'ar' ? 'الخصائص الفيزيائية:' : 'Physical Characteristics:',
    certifications: currentLang === 'id' ? 'Sertifikat & Izin Laboratorium Tersedia:' : currentLang === 'ar' ? 'الشهادات والتحاليل المخبرية المتوفرة:' : 'Available Certificates & Lab Permits:',
    modalRfq: currentLang === 'id' ? 'Minta Penawaran Harga (FOB / CIF / CFR)' : currentLang === 'ar' ? 'طلب عرض أسعار رسمي (FOB / CIF / CFR)' : 'Request Price Quotation (FOB / CIF / CFR)',
    close: currentLang === 'id' ? 'Tutup' : currentLang === 'ar' ? 'إغلاق' : 'Close'
  };

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
              <span>{t.commodities?.badge || 'KATALOG PRODUK EKSPOR'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight uppercase font-sans">
              {t.commodities?.title || 'Koleksi Komoditas Hasil Laut Kering Kualitas Ekspor'}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.commodities?.subtitle || 'Diproses dengan higienitas ketat, kadar garam terstandarisasi, dan pengemasan vakum multi-lapis untuk menjaga aroma, tekstur, serta daya simpan maksimal bagi importir mancanegara.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalogModal}
              id="btn-open-catalog-top"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#009bb3] hover:bg-[#008399] text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.commodities?.downloadCatalog || 'Unduh Katalog Ekspor (PDF)'}</span>
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
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#009bb3] text-white shadow-2xs'
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
              placeholder={t.commodities?.searchPlaceholder || 'Cari nama ikan, cumi, HS Code...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#009bb3] focus:ring-2 focus:ring-teal-100 transition-all"
            />
          </div>
        </div>

        {/* Commodity Cards Grid - 2 columns on mobile, 3 on desktop */}
        {displayedCommodities.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {displayedCommodities.map((item) => (
              <div
                key={`${item.id}-${item.category}`}
                className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-0.5 sm:hover:-translate-y-1"
              >
                <div>
                  {/* Photo with badges and zoom overlay */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    
                    {/* Category & Origin Tags */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5 max-w-[70%]">
                      <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[8px] sm:text-[10px] font-extrabold uppercase shadow-2xs truncate">
                        {getCategoryLabel('product', item.category, currentLang)}
                      </span>
                      {item.featured && (
                        <span className="hidden xs:inline-flex sm:inline-flex px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-[8px] sm:text-[10px] font-extrabold uppercase shadow-sm">
                          {uiTexts.topProduct}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-mono">
                        HS: {item.hsCode}
                      </span>
                    </div>

                    {/* Quick View Button on Image */}
                    <button
                      onClick={() => openCommodityDetail(item)}
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/95 hover:bg-[#009bb3] text-slate-800 hover:text-white transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                      title={uiTexts.viewSpecs}
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Content Details */}
                  <div className="p-2.5 sm:p-6">
                    <h3 className="text-xs sm:text-base md:text-lg font-bold sm:font-black text-slate-950 group-hover:text-[#009bb3] transition-colors line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#519992] font-bold mt-0.5 mb-1.5 sm:mb-3 line-clamp-1">
                      {item.indonesianName}
                    </p>
                    
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2 sm:mb-4 hidden sm:block">
                      {item.description}
                    </p>

                    {/* Specs Quick Matrix */}
                    <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border border-slate-100 space-y-1 sm:space-y-2 mb-2 sm:mb-4 text-[9px] sm:text-[11px]">
                      <div className="flex justify-between items-center text-slate-500 gap-1">
                        <span className="shrink-0">{t.commodities?.grade || (currentLang === 'ar' ? 'الجودة:' : 'Grade:')}</span>
                        <span className="text-[#009bb3] font-black truncate">{item.specification.grade}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-500 gap-1">
                        <span className="shrink-0">{t.commodities?.moq || (currentLang === 'ar' ? 'الطلب:' : 'MOQ:')}</span>
                        <span className="text-slate-800 font-bold truncate">{item.specification.moq}</span>
                      </div>
                      <div className="hidden sm:flex justify-between items-center text-slate-500 gap-1">
                        <span className="shrink-0">{t.commodities?.origin || (currentLang === 'ar' ? 'المنشأ:' : 'Asal:')}</span>
                        <span className="text-slate-800 font-semibold text-right max-w-[140px] truncate">{item.origin}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-500 gap-1">
                        <span className="shrink-0">{t.commodities?.supplyCapacity || (currentLang === 'ar' ? 'الإمداد:' : 'Pasokan:')}</span>
                        <span className="text-[#519992] font-black truncate">{item.supplyCapacity}</span>
                      </div>
                    </div>

                    {/* Certifications badges */}
                    <div className="space-y-1 sm:space-y-1.5 hidden xs:block sm:block">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">
                        {t.commodities?.certifications || (currentLang === 'ar' ? 'شهادات الجودة:' : 'Sertifikasi Mutu:')}
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {item.certifications.slice(0, 2).map((cert, idx) => (
                          <span 
                            key={idx}
                            className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#009bb3] text-[8px] sm:text-[10px] font-bold flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                            <span className="truncate max-w-[75px] sm:max-w-none">{cert}</span>
                          </span>
                        ))}
                        {item.certifications.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[8px] sm:text-[10px] font-bold">
                            +{item.certifications.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-2.5 sm:p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => openCommodityDetail(item)}
                    className="w-full sm:flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-xs font-bold transition-colors text-center cursor-pointer"
                  >
                    {uiTexts.viewDetails}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCommodityForQuote(item.name)}
                    className="w-full sm:flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#009bb3] hover:bg-[#008399] text-white text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs hover:shadow-sm cursor-pointer"
                  >
                    <span>{uiTexts.requestQuote}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 rtl:rotate-180" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold text-sm mb-4">{uiTexts.noResults}</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#009bb3] transition-colors"
            >
              {uiTexts.resetFilter}
            </button>
          </div>
        )}

        {/* View All Commodities CTA Banner */}
        {onNavigateProducts && (
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200">
            <div className="text-center sm:text-left">
              <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                {uiTexts.showingCount(displayedCommodities.length, filteredCommodities.length)}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500">
                {currentLang === 'id' ? 'Tersedia ragam komoditas hasil laut kering standar ekspor dengan dokumen karantina lengkap.' : 'Explore full collection with technical specs, moisture limits, and export compliance documents.'}
              </span>
            </div>
            <button
              type="button"
              onClick={onNavigateProducts}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#009bb3] hover:bg-[#008399] text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <span>{uiTexts.viewAllProducts}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        )}

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
                      {uiTexts.photoCount(activeImageIndex + 1, activeModalCommodity.galleryImages.length)}
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

                {/* Country Trade Highlights */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-xs">
                  <span className="text-slate-500 block mb-2 font-extrabold uppercase tracking-wider text-[10px]">
                    {uiTexts.destinations}
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
                      {uiTexts.category} {getCategoryLabel('product', activeModalCommodity.category, currentLang)}
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
                    {uiTexts.specSheet}
                  </h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">{uiTexts.origin}</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{activeModalCommodity.origin}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">{uiTexts.grade}</span>
                      <span className="col-span-2 text-[#009bb3] font-black">{activeModalCommodity.specification.grade}</span>
                    </div>
                    {activeModalCommodity.specification.moisture && (
                      <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                        <span className="text-slate-500">{uiTexts.moisture}</span>
                        <span className="col-span-2 text-slate-800">{activeModalCommodity.specification.moisture}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">{uiTexts.packaging}</span>
                      <span className="col-span-2 text-slate-800">{activeModalCommodity.specification.packaging}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">{uiTexts.moq}</span>
                      <span className="col-span-2 text-[#519992] font-black">{activeModalCommodity.specification.moq}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-slate-200">
                      <span className="text-slate-500">{uiTexts.supplyCapacity}</span>
                      <span className="col-span-2 text-slate-800">{activeModalCommodity.supplyCapacity}</span>
                    </div>
                    {activeModalCommodity.specification.colorTexture && (
                      <div className="grid grid-cols-3 py-1">
                        <span className="text-slate-500">{uiTexts.characteristics}</span>
                        <span className="col-span-2 text-slate-700">{activeModalCommodity.specification.colorTexture}</span>
                      </div>
                    )}
                  </div>

                  {/* Certifications Row */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">
                      {uiTexts.certifications}
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
                    <span>{uiTexts.modalRfq}</span>
                  </button>
                  <button
                    onClick={() => setActiveModalCommodity(null)}
                    className="py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {uiTexts.close}
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

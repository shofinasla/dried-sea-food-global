import { useState } from 'react';
import { 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Tag, 
  X, 
  Share2, 
  Check, 
  Filter, 
  Maximize2,
  ArrowRight
} from 'lucide-react';
import { GalleryItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { getAllCategoryLabel, getCategoryLabel } from '../i18n/categoryLabels';

interface PhotoGalleryProps {
  items: GalleryItem[];
  onOpenAdmin?: () => void;
  onNavigateFacility?: () => void;
}

export default function PhotoGallery({ items, onNavigateFacility }: PhotoGalleryProps) {
  const { currentLang } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  const categories = [
    { id: 'all', label: getAllCategoryLabel('gallery', currentLang) },
    { id: 'processing', label: getCategoryLabel('gallery', 'processing', currentLang) },
    { id: 'commodities', label: getCategoryLabel('gallery', 'commodities', currentLang) },
    { id: 'storage', label: getCategoryLabel('gallery', 'storage', currentLang) },
    { id: 'shipping', label: getCategoryLabel('gallery', 'shipping', currentLang) },
    { id: 'sustainability', label: getCategoryLabel('gallery', 'sustainability', currentLang) }
  ];

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Display only 4 photos on the homepage
  const displayedItems = filteredItems.slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleViewAllFacilities = () => {
    if (onNavigateFacility) {
      onNavigateFacility();
    } else {
      window.location.href = '/facility';
    }
  };

  return (
    <section id="galeri" className="py-8 sm:py-12 bg-slate-50 text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
              <ImageIcon className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>DOKUMENTASI LAPANGAN &amp; KUALITAS OTENTIK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase font-sans">
              Galeri Fasilitas &amp; Pengiriman Ekspor
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Dokumentasi autentik fasilitas Solar Dome Dryer higienis, seleksi mutu ikan asin, gudang kelembaban rendah, serta pemuatan kontainer ekspor berpendingin.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`filter-gal-${cat.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid:
            - Mobile: Compact horizontal row card (~25% photo thumbnail on left, non-overlapping text on right)
            - Desktop: 4-Column vertical card grid
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-card-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="bg-white border border-slate-200 hover:border-[#009bb3]/60 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-row sm:flex-col p-2.5 sm:p-0 gap-3 sm:gap-0"
            >
              {/* Photo Box: ~25% width on mobile, full width top on desktop */}
              <div className="relative w-24 h-24 sm:w-full sm:h-48 shrink-0 rounded-xl sm:rounded-none overflow-hidden bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Desktop Zoom Overlay */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Category Badge on desktop */}
                <span className="hidden sm:block absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#009bb3] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  {getCategoryLabel('gallery', item.category, currentLang).toUpperCase()}
                </span>
              </div>

              {/* Text Information Container */}
              <div className="flex-1 min-w-0 flex flex-col justify-between sm:p-4">
                <div>
                  {/* Category Badge on mobile */}
                  <div className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-[#009bb3] mb-0.5 truncate">
                    {getCategoryLabel('gallery', item.category, currentLang)}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors truncate sm:line-clamp-1 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                    {item.description}
                  </p>
                </div>

                {/* Metadata Row */}
                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 gap-2">
                  <span className="inline-flex items-center gap-1 truncate max-w-[120px] sm:max-w-none">
                    <MapPin className="w-3 h-3 text-[#009bb3] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                  <span className="shrink-0 font-mono">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Documents / Gallery Action Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={handleViewAllFacilities}
            id="btn-view-all-gallery-docs"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
          >
            <span>
              {isIndonesian
                ? `Lihat Seluruh Fasilitas & Dokumentasi Ekspor (${items.length} Foto)`
                : isArabic
                ? `عرض جميع مرافق التجهيز والتوثيق (${items.length} صور)`
                : `View All Processing Facilities & Export Documentation (${items.length} Photos)`}
            </span>
            <ArrowRight className="w-4 h-4 text-[#009bb3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* LIGHTBOX MODAL */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-7 relative">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-5 border border-slate-200 bg-slate-50 flex items-center justify-center max-h-[50vh]">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[50vh] object-contain"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-[#009bb3] px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                      {getCategoryLabel('gallery', activeItem.category, currentLang)}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 mt-1.5">
                      {activeItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
                  </button>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                    <span><strong>Lokasi:</strong> {activeItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                    <span><strong>Tanggal:</strong> {activeItem.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                  {activeItem.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

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
  Sparkles,
  Maximize2
} from 'lucide-react';
import { GalleryItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { getAllCategoryLabel, getCategoryLabel } from '../i18n/categoryLabels';

interface PhotoGalleryProps {
  items: GalleryItem[];
  onOpenAdmin: () => void;
}

export default function PhotoGallery({ items, onOpenAdmin }: PhotoGalleryProps) {
  const { currentLang } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="galeri" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <ImageIcon className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>DOKUMENTASI LAPANGAN & KUALITAS OTENTIK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
              Galeri Fasilitas & Pengiriman Ekspor
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Dokumentasi autentik fasilitas Solar Dome Dryer higienis, seleksi mutu ikan asin, gudang kelembaban rendah, serta pemuatan kontainer ekspor berpendingin.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            id="btn-admin-gallery-shortcut"
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#009bb3] text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>Kelola Galeri (Admin CMS)</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`filter-gal-${cat.id}`}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-card-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="bg-white border border-slate-200 hover:border-[#009bb3]/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Overlay Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white flex items-center justify-center shadow-xl">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#009bb3] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  {getCategoryLabel('gallery', item.category, currentLang).toUpperCase()}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors line-clamp-1 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3 h-3 text-[#009bb3] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                  <span className="shrink-0 text-slate-400 font-mono">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-slate-50 flex items-center justify-center max-h-[55vh]">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[55vh] object-contain"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#009bb3] px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200">
                      Kategori: {getCategoryLabel('gallery', activeItem.category, currentLang)}
                    </span>
                    <h3 className="text-2xl font-black text-slate-950 mt-2">
                      {activeItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Foto'}</span>
                  </button>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-[#009bb3] shrink-0" />
                    <span><strong>Lokasi Fasilitas:</strong> {activeItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-[#009bb3] shrink-0" />
                    <span><strong>Tanggal Dokumentasi:</strong> {activeItem.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Tag className="w-4 h-4 text-slate-400 mt-1" />
                  {activeItem.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
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

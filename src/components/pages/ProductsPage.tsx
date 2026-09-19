import React, { useState, useMemo } from 'react';
import { 
  Fish, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Package, 
  Globe2, 
  FileText,
  SlidersHorizontal,
  Anchor
} from 'lucide-react';
import { ExportCommodity } from '../../types';
import { useTranslation } from '../../i18n/LanguageContext';

interface ProductsPageProps {
  products: ExportCommodity[];
  onSelectProduct: (product: ExportCommodity) => void;
  onRequestQuote: (commodityName?: string) => void;
  onRequestSample?: (product: ExportCommodity) => void;
  onOpenCatalogModal?: () => void;
  onNavigateHome: () => void;
}

export default function ProductsPage({
  products,
  onSelectProduct,
  onRequestQuote,
  onRequestSample,
  onOpenCatalogModal,
  onNavigateHome
}: ProductsPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
    return ['all', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        product.name.toLowerCase().includes(q) ||
        product.indonesianName.toLowerCase().includes(q) ||
        (product.hsCode && product.hsCode.toLowerCase().includes(q)) ||
        (product.origin && product.origin.toLowerCase().includes(q)) ||
        (product.description && product.description.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Top Breadcrumb & Title Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Products</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
                <Fish className="w-3.5 h-3.5" />
                <span>Indonesian Marine Export Commodities</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
                Certified Dried Seafood Products
              </h1>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Direct export supply of Indonesian dried anchovy (teri nasi), sun-dried squid, dried shrimp, salted catfish, and premium fish maw processed with solar dome technology under strict HACCP standards.
              </p>
            </div>

            {/* Catalog Download & RFQ Top Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenCatalogModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition shadow-sm"
              >
                <Download className="w-4 h-4 text-[#009bb3]" />
                <span>E-Catalog</span>
              </button>
              <button
                onClick={() => onRequestQuote()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#009bb3] text-white text-sm font-bold hover:bg-[#0d8a9e] transition shadow-md shadow-[#009bb3]/20"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commodity, HS code, origin..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3] transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> export-grade commodities
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All lots tested 0% Formalin & compliant with BKIPM</span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No products match your search</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your category filter or keyword search, or contact our export desk for custom sourcing.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#009bb3] bg-cyan-50 hover:bg-cyan-100 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const targetSlug = product.slug || product.id;
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#009bb3] hover:shadow-xl hover:shadow-[#009bb3]/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={product.imageUrl || '/images/products/exp-teri-nasi-1.png'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {product.category}
                      </div>
                      {product.hsCode && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                          HS {product.hsCode}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#009bb3] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {product.indonesianName}
                      </p>

                      <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key Export Specs Chips */}
                      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Moisture</span>
                          <span className="font-semibold text-slate-800">{product.specification?.moisture || 'Standard Low'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Grade</span>
                          <span className="font-semibold text-slate-800 truncate block">{product.specification?.grade || 'Export Grade'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Origin</span>
                          <span className="font-semibold text-slate-800 truncate block">{product.origin || 'Indonesia'}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Min. Order (MOQ)</span>
                          <span className="font-semibold text-slate-800 truncate block">{product.specification?.moq || 'Contact us'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009bb3] hover:text-[#0d8a9e] transition"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRequestQuote(product.name)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-[#009bb3] transition shadow-sm"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom B2B Reassurance Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#009bb3]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Wholesale Orders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-serif-display">
              Looking for Custom Packaging or Private Label (OEM)?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              We supply vacuum pouches (100g to 5kg) and 10–20kg corrugated export master cartons with buyer-branded multi-language nutrition labeling compliant with US FDA, GCC, and ASEAN food standards.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => onRequestQuote('Custom Packaging / Private Label')}
                className="px-6 py-3 rounded-xl bg-[#009bb3] text-white font-bold text-sm hover:bg-[#0d8a9e] transition shadow-lg shadow-[#009bb3]/30"
              >
                Inquire Private Label
              </button>
              <button
                onClick={onOpenCatalogModal}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition"
              >
                Download Full Specifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

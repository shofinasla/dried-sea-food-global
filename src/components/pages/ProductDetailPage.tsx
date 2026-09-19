import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Package, 
  Globe2, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  Download, 
  Share2, 
  MessageSquare, 
  ChevronRight, 
  HelpCircle,
  Award,
  Sparkles,
  Layers,
  Calendar,
  Warehouse
} from 'lucide-react';
import { ExportCommodity } from '../../types';
import { SITE_CONFIG } from '../../data/seoConfig';

interface ProductDetailPageProps {
  product: ExportCommodity;
  allProducts: ExportCommodity[];
  onSelectProduct: (p: ExportCommodity) => void;
  onRequestQuote: (productName: string) => void;
  onRequestSample: (productName: string) => void;
  onNavigateProducts: () => void;
  onNavigateHome: () => void;
}

export default function ProductDetailPage({
  product,
  allProducts,
  onSelectProduct,
  onRequestQuote,
  onRequestSample,
  onNavigateProducts,
  onNavigateHome
}: ProductDetailPageProps) {
  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.imageUrl || '/images/products/exp-teri-nasi-1.png'];
    
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'packaging' | 'compliance' | 'faq'>('specs');

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const productFaqs = [
    {
      q: `What is the standard production and dispatch lead time for ${product.name}?`,
      a: `Standard export preparation takes 7 to 14 business days from Purchase Order & L/C confirmation for 20ft FCL shipments. Express air freight for priority commodities can be dispatched within 4 to 6 business days.`
    },
    {
      q: `Can you customize the packaging with our private label (OEM)?`,
      a: `Yes. We provide full OEM packaging options ranging from 100g, 250g, 500g, 1kg retail vacuum pouches with your branding and multi-language nutrition panels, up to 10kg/20kg corrugated master export cartons.`
    },
    {
      q: `What documentation is supplied with this export consignment?`,
      a: `Each shipment is accompanied by an official Health Certificate from BKIPM (Fish Quarantine and Inspection Agency), Certificate of Origin (COO Form E / AK / D), Commercial Invoice, Packing List, Bill of Lading, and KAN-accredited Certificate of Analysis (COA).`
    },
    {
      q: `What are your standard export payment terms?`,
      a: `We accept Irrevocable Letter of Credit (L/C at sight) from prime international banks and Telegraphic Transfer (T/T Wire Transfer: 30% advance, 70% against copy of shipping documents & Bill of Lading).`
    }
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello Dried Seafood Global Export Desk, I would like to inquire about specifications, pricing, and availability for: ${product.name} (HS Code: ${product.hsCode || '0305'}).`
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={onNavigateProducts} className="hover:text-[#009bb3] transition-colors">
              Products
            </button>
            <span>/</span>
            <span className="text-slate-400">{product.category}</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={images[activeImageIndex] || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  {product.category}
                </div>
                {product.hsCode && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-md text-xs font-mono font-bold shadow-sm">
                    HS Code: {product.hsCode}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx 
                        ? 'border-[#009bb3] ring-2 ring-[#009bb3]/20 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Seals Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Export Quality Certifications</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(product.certifications || ['HACCP Grade A', 'Health Certificate BKIPM', 'SKP KKP RI', 'Halal BPJPH']).map((cert, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-900 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & B2B Action Box (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Indonesian Origin Export Grade</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif-display leading-snug">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-slate-500 italic mt-1">
                {product.indonesianName}
              </p>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Fast Specs Matrix */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Grade</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.specification?.grade || 'Super AAA'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Moisture</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.specification?.moisture || '10% - 12% Max'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Min. Order (MOQ)</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.specification?.moq || '500 Kg LCL / 20ft FCL'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Origin</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.origin || 'Belawan & Java Sea'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Capacity</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.supplyCapacity || '80 MT / Month'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Shelf Life</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{product.specification?.shelfLife || '12 Months'}</span>
                </div>
              </div>

              {/* Action Box: RFQ & Sample Request */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onRequestQuote(product.name)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#009bb3] text-white font-bold text-sm hover:bg-[#0d8a9e] transition shadow-lg shadow-[#009bb3]/25"
                  >
                    <span>Request Quotation (RFQ)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRequestSample(product.name)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition shadow-sm"
                  >
                    <Package className="w-4 h-4 text-cyan-400" />
                    <span>Request Sample</span>
                  </button>

                  <a
                    href={`https://wa.me/6288985582838?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-sm"
                    title="Direct WhatsApp Export Desk"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Direct manufacturer pricing
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    International container freight support
                  </span>
                </div>
              </div>
            </div>

            {/* Key Markets Badges */}
            {product.keyMarkets && product.keyMarkets.length > 0 && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                <Globe2 className="w-4 h-4 text-[#009bb3] shrink-0" />
                <span className="font-bold text-slate-700 shrink-0">Regular Export Markets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyMarkets.map((market, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                      {market}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Tabs: Full Specifications, Packaging, Quality, FAQ */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Specifications
            </button>
            <button
              onClick={() => setActiveTab('packaging')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'packaging'
                  ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Packaging & Logistics
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'compliance'
                  ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Quality & Compliance
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-[#009bb3] text-[#009bb3] bg-cyan-50/40'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              B2B FAQs
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Technical Product Specification Sheet</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-700 w-1/3">Commercial Name</td>
                        <td className="py-3 px-4 text-slate-900">{product.name}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-700">Indonesian Local Name</td>
                        <td className="py-3 px-4 text-slate-900">{product.indonesianName}</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-700">Harmonized System (HS) Code</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{product.hsCode}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-700">Origin / Catch Area</td>
                        <td className="py-3 px-4 text-slate-900">{product.origin}</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-700">Grade & Size Grading</td>
                        <td className="py-3 px-4 text-slate-900">{product.specification?.grade || 'Super AAA Grade'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-700">Moisture Content</td>
                        <td className="py-3 px-4 text-slate-900">{product.specification?.moisture || '10% - 12% Max'}</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-700">Appearance & Sensory Profile</td>
                        <td className="py-3 px-4 text-slate-900">{product.specification?.colorTexture || 'Natural hue, crisp texture, 0% chemicals'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-700">Chemical / Preservative Additives</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">100% Free of Formalin, Borax, and Bleaching Agents</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-700">Shelf Life & Storage</td>
                        <td className="py-3 px-4 text-slate-900">{product.specification?.shelfLife || '12 Months in clean, dry ambient environment'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-700">Monthly Sustainable Capacity</td>
                        <td className="py-3 px-4 text-slate-900">{product.supplyCapacity || '80 Metric Tons / Month'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'packaging' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Packaging Specifications & Container Loading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Package className="w-4 h-4 text-[#009bb3]" />
                      <span>Primary Retail / Foodservice Options</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                      <li>Vacuum pouch: 100g, 250g, 500g, and 1,000g food-grade multilayer nylon</li>
                      <li>Nitrogen-flushed retail pillow bags for extended shelf freshness</li>
                      <li>Private label OEM packaging available upon buyer artwork approval</li>
                      <li>Multi-language nutrition facts compliant with FDA / EU / GCC labeling</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Warehouse className="w-4 h-4 text-[#009bb3]" />
                      <span>Master Outer Export Packaging</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                      <li>5-ply corrugated heavy-duty export carton (10 Kg or 20 Kg net)</li>
                      <li>Desiccant silica gel packets included in every master carton</li>
                      <li>Stretch-wrapped and strapped on heat-treated standard ISPM-15 wooden pallets</li>
                      <li>Custom outer shipping marks, barcodes, and QR tracking codes</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-cyan-950">
                    <Globe2 className="w-4 h-4 text-[#009bb3]" />
                    <span>Incoterms Supported: <strong>FOB Tanjung Priok (Jakarta), CIF, CFR, or Air Freight EXW</strong></span>
                  </div>
                  <button 
                    onClick={() => onRequestQuote(product.name)}
                    className="font-bold text-[#009bb3] hover:underline"
                  >
                    Calculate Freight Rates &rarr;
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Quarantine, Hygiene & Laboratory Verification</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every production lot undergoes stringent multi-stage inspection starting from fresh fish landing at Muara Baru port, solar dome moisture reduction, manual optical sorting, to independent KAN-accredited lab testing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 text-center space-y-2">
                    <Award className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-xs text-slate-900">BKIPM Quarantine</h4>
                    <p className="text-[11px] text-slate-500">Official Health Certificate issued for every export container lot.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 text-center space-y-2">
                    <ShieldCheck className="w-8 h-8 text-[#009bb3] mx-auto" />
                    <h4 className="font-bold text-xs text-slate-900">HACCP Grade A</h4>
                    <p className="text-[11px] text-slate-500">Certified hazard analysis critical control points processing line.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 text-center space-y-2">
                    <FileCheck2 className="w-8 h-8 text-indigo-600 mx-auto" />
                    <h4 className="font-bold text-xs text-slate-900">0% Formalin Lab Test</h4>
                    <p className="text-[11px] text-slate-500">Negative chemical test results with detailed COA report available.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions for Importers</h3>
                <div className="divide-y divide-slate-100">
                  {productFaqs.map((faq, idx) => (
                    <div key={idx} className="py-4 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-[#009bb3] shrink-0" />
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-xs text-slate-600 pl-5.5 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif-display">
                  Related Export Commodities
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Complementary dried seafood varieties available for consolidated container shipping.</p>
              </div>
              <button
                onClick={onNavigateProducts}
                className="text-xs font-bold text-[#009bb3] hover:underline flex items-center gap-1"
              >
                <span>View All Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-[#009bb3] hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={rel.imageUrl || '/images/products/exp-teri-nasi-1.png'}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-bold text-[#009bb3] uppercase">{rel.category}</div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#009bb3] transition-colors mt-1 line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {rel.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>MOQ: {rel.specification?.moq || '500 Kg'}</span>
                    <span className="text-[#009bb3] flex items-center gap-1">
                      View Specs <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

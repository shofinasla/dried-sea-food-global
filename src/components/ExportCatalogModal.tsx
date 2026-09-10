import { useState } from 'react';
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  ExternalLink,
  BookOpen,
  Printer,
  Sparkles
} from 'lucide-react';
import { EXPORT_COMMODITIES, COMPANY_PROFILE } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface ExportCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommodityForQuote: (commodityName: string) => void;
}

export default function ExportCatalogModal({
  isOpen,
  onClose,
  onSelectCommodityForQuote
}: ExportCatalogModalProps) {
  const { t, currentLang } = useTranslation();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCatalog = () => {
    setDownloading(true);

    // Track download in analytics API
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'download_catalog',
        label: `Official Product Catalog (${currentLang.toUpperCase()})`,
        path: window.location.pathname
      })
    }).catch(() => {});

    // Generate real downloadable text/spec summary document
    const catalogHeader = `================================================================================
PT DRIED SEAFOOD GLOBAL INDONESIA - OFFICIAL B2B PRODUCT CATALOG 2026
Supplier & Processor: Dried Seafood, Salted Fish, Fish Maw & Marine Products
Legal: ${COMPANY_PROFILE.registrationNo} | Tax ID: ${COMPANY_PROFILE.taxId}
HQ: ${COMPANY_PROFILE.headquarters}
Hotline: ${COMPANY_PROFILE.hotline} | Email: ${COMPANY_PROFILE.salesEmail}
Web: https://driedseafoodglobal.com | Quality Standard: HACCP Grade A & BKIPM
================================================================================

CERTIFICATIONS:
1. HACCP Grade A (Food Safety Hazard Analysis Critical Control Point)
2. Official Sanitary & Health Certificate from BKIPM KKP RI
3. Halal MUI / BPJPH Certified 100%
4. US FDA Foreign Supplier Verification Program (FSVP) Compliant
5. Clean Solar Dome Dehydrated - Zero Formalin / No Chemical Preservatives

================================================================================
FLAGSHIP PRODUCTS & SPECIFICATIONS
================================================================================
${EXPORT_COMMODITIES.map((c, i) => `
[${i + 1}] ${c.name.toUpperCase()} (${c.indonesianName})
Category: ${c.category}
HS Code: ${c.hsCode}
Harvest Origin: ${c.origin}
Quality Grade: ${c.specification.grade}
Moisture Content: ${c.specification.moisture || 'Standard'}
Shelf Life: ${c.specification.shelfLife || '12 - 24 Months'}
Packaging: ${c.specification.packaging}
Minimum Order (MOQ): ${c.specification.moq}
Supply Capacity: ${c.supplyCapacity}
Certifications: ${c.certifications.join(', ')}
Target Markets: ${c.keyMarkets.join(', ')}
Description: ${c.description}
--------------------------------------------------------------------------------`).join('\n')}

================================================================================
SUPPORTED INCOTERMS 2020:
- FOB (Free on Board): Jakarta (Tanjung Priok), Surabaya (Tanjung Perak), Belawan
- CFR (Cost & Freight): Direct to Destination Port
- CIF (Cost, Insurance & Freight): Comprehensive Marine Cargo Insurance Included
- Air Freight Express: Via Soekarno-Hatta International Airport (CGK)

PAYMENT TERMS:
- Irrevocable Letter of Credit (L/C at Sight)
- Telegraphic Transfer (T/T: 30% Deposit, 70% against Bill of Lading copy)
================================================================================
© 2026 PT Dried Seafood Global Indonesia. All Rights Reserved.
================================================================================`;

    const blob = new Blob([catalogHeader], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `E-Katalog-Ekspor-Dried-Seafood-Global-2026-${currentLang.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getCatalogTitle = () => {
    switch (currentLang) {
      case 'zh': return '2026年 印尼优质干鱼与海产出口官方电子目录';
      case 'ja': return '2026年 インドネシア産海産乾物・塩魚 輸出公式カタログ';
      case 'ar': return 'الكتالوج الرسمي لتصدير الأسماك المجففة والمأكولات البحرية 2026';
      case 'id': return 'E-Katalog Komoditas Ikan Asin & Hasil Laut Kering 2026';
      default: return '2026 Official Indonesian Dried Seafood & Salted Fish Product Catalog';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#009bb3] flex items-center justify-center shadow-xs">
            <BookOpen className="w-6 h-6 text-[#009bb3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                E-Katalog Komoditas Ikan Asin & Hasil Laut Kering 2026
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-teal-50 text-[#009bb3] border border-teal-200">
                OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dokumen Resmi {COMPANY_PROFILE.legalName} (Edisi Lengkap)
            </p>
          </div>
        </div>

        {/* Catalog Content Overview */}
        <div className="space-y-6 text-xs text-slate-600">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-[#009bb3] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>Daftar Komoditas Siap Ekspor (Ready-to-Ship Commodities):</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXPORT_COMMODITIES.map((c, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{c.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">HS Code: {c.hsCode} • MOQ: {c.specification.moq}</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCommodityForQuote(c.name);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-[#009bb3] text-[#009bb3] hover:text-white text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    RFQ
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Terms & Incoterms */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ketentuan Perdagangan & Incoterms 2020 yang Didukung:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-[#009bb3] block text-sm">FOB</span>
                <span className="text-[10px] text-slate-500">Free on Board (Priok/Perak)</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-[#009bb3] block text-sm">CIF</span>
                <span className="text-[10px] text-slate-500">Cost, Insurance & Freight</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-[#009bb3] block text-sm">CFR</span>
                <span className="text-[10px] text-slate-500">Cost and Freight</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-[#009bb3] block text-sm">DDP / DAP</span>
                <span className="text-[10px] text-slate-500">Delivered Duty Paid</span>
              </div>
            </div>
          </div>

          {/* Download Action Section */}
          {downloadSuccess ? (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-center space-y-1 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-[#009bb3] mx-auto" />
              <p className="font-bold text-xs">
                {currentLang === 'id' ? 'E-Katalog Resmi Berhasil Diunduh!' : 'Official Product Catalog Downloaded Successfully!'}
              </p>
              <p className="text-[11px] text-slate-600">
                {currentLang === 'id' ? 'File dokumen berisi seluruh spesifikasi teknis kadar air/garam, HS Code, dan sertifikasi karantina BKIPM.' : 'The file includes full technical specifications, moisture/salt tolerances, HS codes, and quarantine certifications.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-teal-50/60 to-slate-50 border border-teal-100">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#009bb3] shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    {currentLang === 'id' ? 'Unduh E-Katalog & Spesifikasi Produk' : 'Download Complete Product Catalog'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Official Edition • {currentLang.toUpperCase()} & English
                  </span>
                </div>
              </div>
              <button
                onClick={handleDownloadCatalog}
                disabled={downloading}
                id="btn-download-catalog-file"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Preparing File...' : (t.commodities?.downloadCatalog || 'Download Catalog (PDF/Spec)')}</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Trade Desk Hotline: <strong className="text-slate-800">{COMPANY_PROFILE.hotline}</strong></span>
          <button
            onClick={onClose}
            id="btn-close-catalog-footer"
            className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
          >
            {currentLang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  BookOpen,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';
import { ExportCommodity } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { generateOfficialCatalogPdf } from '../utils/generatePdfCatalog';

interface ExportCatalogModalProps {
  isOpen: boolean;
  products: ExportCommodity[];
  onClose: () => void;
  onSelectCommodityForQuote: (commodityName: string) => void;
}

export default function ExportCatalogModal({
  isOpen,
  products,
  onClose,
  onSelectCommodityForQuote
}: ExportCatalogModalProps) {
  const { t, currentLang } = useTranslation();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCatalog = async () => {
    try {
      setDownloading(true);

      // Track download in analytics API
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'download_catalog_pdf',
          label: 'Official Product Catalog PDF (Shrimora - Dried Seafood Global)',
          path: window.location.pathname
        })
      }).catch(() => {});

      // Generate the official 10-page PDF matching the uploaded catalog
      const pdfBlob = await generateOfficialCatalogPdf();
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Product-Catalog-Shrimora-Dried-Seafood-Global.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 6000);
    } catch (err) {
      console.error('Error generating PDF catalog:', err);
      setDownloading(false);
    }
  };

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-fadeIn">
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
                {isIndonesian ? 'E-Katalog Produk Ekspor (PDF Asli)' : isArabic ? 'كتالوج المنتجات التصديرية الرسمي (PDF)' : 'Official Export Product Catalog (PDF)'}
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-teal-50 text-[#009bb3] border border-teal-200">
                OFFICIAL PDF
              </span>
            </div>
            <p className="text-xs text-slate-500">
              SHRIMORA • {COMPANY_PROFILE.legalName} (10 Halaman Lengkap)
            </p>
          </div>
        </div>

        {/* Catalog Content Overview */}
        <div className="space-y-5 text-xs text-slate-600">
          
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-[#009bb3] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>{isIndonesian ? 'Komoditas & Konten Dalam File PDF:' : 'Catalog Content & Product Highlights:'}</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Natural Dried Anchovy (3–5 cm)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Salt Dried Anchovy (4–6 cm)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Dried Whole Anchovy (5–7 cm)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Sambal Teri Balado Siap Santap (24 Pcs)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Dokumen Legalitas: NIB & P-IRT</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009bb3]" />
                <span className="font-semibold">Ketentuan MOQ, Incoterms FOB/CIF & Lead Time</span>
              </div>
            </div>
          </div>

          {/* Download Action Box */}
          {downloadSuccess ? (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-center space-y-1 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-[#009bb3] mx-auto" />
              <p className="font-bold text-xs">
                {isIndonesian ? 'File PDF E-Katalog Resmi Berhasil Diunduh!' : 'Official PDF Product Catalog Downloaded Successfully!'}
              </p>
              <p className="text-[11px] text-slate-600">
                {isIndonesian 
                  ? 'File PDF 10 halaman berisi seluruh spesifikasi teknis kadar air/garam, HS Code negara tujuan, sertifikasi karantina, dan portofolio kemasan.' 
                  : 'The 10-page PDF document includes technical specifications, moisture/salt parameters, HS codes, and packaging details.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-teal-50/70 via-cyan-50/40 to-slate-50 border border-teal-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-teal-200 text-[#009bb3] shadow-2xs">
                  <FileText className="w-7 h-7 text-[#009bb3]" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                    {isIndonesian ? 'Unduh E-Katalog Produk Resmi (PDF)' : 'Download Official Product Catalog (PDF)'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Format: PDF Dokumen Lengkap (10 Halaman) • Shrimora
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadCatalog}
                disabled={downloading}
                id="btn-download-catalog-file"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? (isIndonesian ? 'Menyiapkan PDF...' : 'Preparing PDF...') : (isIndonesian ? 'Download E-Katalog (PDF)' : 'Download Product Catalog (PDF)')}</span>
              </button>
            </div>
          )}

          {/* Security and Legal Notice */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#009bb3] shrink-0" />
            <span>
              {isIndonesian
                ? 'Dokumen resmi terverifikasi: NIB 1408230135849 • P-IRT 5023315010556-31 • Standar Karantina BKIPM & HACCP'
                : 'Official verified trade document: NIB 1408230135849 • P-IRT 5023315010556-31 • BKIPM & HACCP'}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Desk: <strong className="text-slate-800">{COMPANY_PROFILE.salesEmail}</strong></span>
          <button
            onClick={onClose}
            id="btn-close-catalog-footer"
            className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
          >
            {isIndonesian ? 'Tutup' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}

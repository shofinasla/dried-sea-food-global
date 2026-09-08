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
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                E-Katalog Komoditas Ikan Asin & Hasil Laut Kering 2026
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                OFFICIAL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Dokumen Resmi {COMPANY_PROFILE.legalName} (Edisi Lengkap Ekspor)
            </p>
          </div>
        </div>

        {/* Catalog Content Overview */}
        <div className="space-y-6 text-xs text-slate-300">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Komoditas Siap Ekspor (Ready-to-Ship Commodities):</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXPORT_COMMODITIES.map((c, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">HS Code: {c.hsCode} • MOQ: {c.specification.moq}</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectCommodityForQuote(c.name);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 text-[10px] font-bold transition-colors"
                  >
                    RFQ
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Terms & Incoterms */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ketentuan Perdagangan & Incoterms 2020 yang Didukung:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">FOB</span>
                <span className="text-[10px] text-slate-400">Free on Board (Priok/Perak)</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">CIF</span>
                <span className="text-[10px] text-slate-400">Cost, Insurance & Freight</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">CFR</span>
                <span className="text-[10px] text-slate-400">Cost and Freight</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-amber-400 block text-sm">DDP / DAP</span>
                <span className="text-[10px] text-slate-400">Delivered Duty Paid</span>
              </div>
            </div>
          </div>

          {/* Download Simulation message */}
          {downloadSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-center space-y-1 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="font-bold text-xs">E-Katalog Resmi Dried Seafood Global 2026 Siap Diunduh!</p>
              <p className="text-[11px] text-slate-300">File PDF berukuran 8.4 MB berisi seluruh spesifikasi teknis, hasil uji lab COA, dan panduan kemasan ekspor.</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/20 border border-slate-800">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Unduh Format PDF Lengkap</span>
                  <span className="text-[11px] text-slate-400">Edisi Digital (PDF • 8.4 MB • Bahasa Indonesia & English)</span>
                </div>
              </div>
              <button
                onClick={handleSimulateDownload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Unduh E-Katalog PDF</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Kontak Departemen Ekspor: {COMPANY_PROFILE.hotline}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}

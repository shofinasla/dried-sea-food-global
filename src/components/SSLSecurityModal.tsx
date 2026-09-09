import { ShieldCheck, Lock, CheckCircle2, X, KeyRound, Server, FileCheck2, Globe2 } from 'lucide-react';
import { SSL_CERTIFICATE_INFO, COMPANY_PROFILE } from '../data/initialData';

interface SSLSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SSLSecurityModal({ isOpen, onClose }: SSLSecurityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full shadow-2xl p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#009bb3] flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-7 h-7 text-[#009bb3]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Sertifikat Keamanan SSL / TLS 1.3
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-teal-50 text-[#009bb3] border border-teal-200">
                GRADE A+
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Validasi Identitas Perusahaan Extended Validation (EV)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <span className="text-slate-500">Penerbit Resmi (Issuer):</span>
              <span className="text-[#009bb3] font-bold">{SSL_CERTIFICATE_INFO.issuer}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <span className="text-slate-500">Tingkat Enkripsi:</span>
              <span className="text-slate-900 font-bold">{SSL_CERTIFICATE_INFO.encryptionLevel}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <span className="text-slate-500">Protokol Cipher:</span>
              <span className="text-slate-900 font-bold break-all">{SSL_CERTIFICATE_INFO.protocol} ({SSL_CERTIFICATE_INFO.cipherSuite})</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <span className="text-slate-500">Masa Berlaku Sertifikat:</span>
              <span className="text-slate-700">{SSL_CERTIFICATE_INFO.validUntil}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <span className="text-slate-500">Subject / Organization:</span>
              <span className="text-slate-700">{COMPANY_PROFILE.legalName}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Proteksi Data Klien yang Dijamin:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                <span className="text-slate-700">Enkripsi Formulir RFQ & Dokumen Ekspor-Impor</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                <span className="text-slate-700">Perlindungan Anti-Man-In-The-Middle (HSTS)</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                <span className="text-slate-700">Kepatuhan Penuh UU PDP No. 27 Tahun 2022</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                <span className="text-slate-700">Audit Berkala Standar Keamanan ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Tutup & Verifikasi Aman
          </button>
        </div>
      </div>
    </div>
  );
}

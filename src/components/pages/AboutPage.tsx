import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Globe2, 
  FileCheck2, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  Handshake,
  Anchor
} from 'lucide-react';
import { COMPANY_PROFILE, STRATEGIC_PARTNERS } from '../../data/initialData';
import { useTranslation } from '../../i18n/LanguageContext';

interface AboutPageProps {
  onRequestQuote: () => void;
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export default function AboutPage({
  onRequestQuote,
  onNavigateHome,
  onNavigateProducts
}: AboutPageProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">About Company</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>PT Samdura Bara Persada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              Indonesian Marine Export Corporation
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Operating under the trade brand Dried Seafood Global, PT Samdura Bara Persada connects rich Indonesian coastal fishing waters with demanding international wholesale, distribution, and food manufacturing markets.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Company Overview & Legal Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-serif-display">
              Heritage, Coastal Stewardship & Modern Processing
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Indonesia is the world’s largest archipelagic state, endowed with some of the most biodiverse marine fishing grounds across the Java Sea, Maluku, Riau, and the Sunda Strait. PT Samdura Bara Persada was founded to modernize traditional Indonesian fish drying practices through scientific hygiene control, enclosed solar dome technology, and seamless export documentation.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              By working directly with artisanal coastal fishing cooperatives in Belawan, Juwana, Bangka, and Muara Baru, we ensure fair landing compensation for local fishermen while guaranteeing continuous, non-seasonal export volume for our international partners.
            </p>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Headquarters</span>
                <span className="font-bold text-slate-800 block mt-0.5">Muara Baru, Jakarta Utara</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Export Dispatch Port</span>
                <span className="font-bold text-slate-800 block mt-0.5">Port of Tanjung Priok (IDTPP)</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Trade Registry</span>
                <span className="font-bold text-slate-800 block mt-0.5">AHU-0034189.AH.01.01.2014</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Food Safety</span>
                <span className="font-bold text-emerald-700 block mt-0.5">HACCP Grade A & BKIPM</span>
              </div>
            </div>
          </div>

          {/* Legal Credentials Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#009bb3] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#009bb3]" />
              <span>Verified Corporate Credentials</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Legal Business Certifications</h3>
            
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Nomor Induk Berusaha (NIB)</span>
                <span className="font-mono text-xs font-bold text-slate-900 block mt-0.5">1408230135849</span>
                <span className="text-[10px] text-slate-500">Kementerian Investasi / BKPM Republik Indonesia</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Sertifikat P-IRT</span>
                <span className="font-mono text-xs font-bold text-slate-900 block mt-0.5">5023315010556-31</span>
                <span className="text-[10px] text-slate-500">Dinas Kesehatan & Pengawasan Pangan Industri Rumah Tangga</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Quarantine Registration</span>
                <span className="font-mono text-xs font-bold text-emerald-800 block mt-0.5">BKIPM Jakarta I Active Registration</span>
                <span className="text-[10px] text-slate-500">Badan Karantina Ikan, Pengendalian Mutu KKP RI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Partners */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>Ecosystem & Commercial Alliances</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif-display">
              Strategic Operating Brands & Partnerships
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Collaborating across coastal sourcing, export packaging, and domestic culinary distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRATEGIC_PARTNERS.map((partner) => (
              <div key={partner.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-sm font-mono shadow-sm">
                  {partner.initials}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider">{partner.category}</span>
                  <h4 className="text-sm font-bold text-slate-900">{partner.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact & Action */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black font-serif-display">Partner with a Verified Indonesian Seafood Exporter</h3>
            <p className="text-xs text-slate-300 mt-1">Connect directly with our corporate export management team for commercial agreements.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs transition shadow-lg shadow-[#009bb3]/30"
            >
              Request Corporate Quotation
            </button>
            <button
              onClick={onNavigateProducts}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

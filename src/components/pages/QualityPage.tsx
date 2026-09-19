import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck2, 
  Sun, 
  Microscope, 
  Sparkles, 
  ArrowRight,
  Droplets,
  ThermometerSun,
  Flame,
  Check
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

interface QualityPageProps {
  onRequestQuote: () => void;
  onRequestSample: () => void;
  onNavigateHome: () => void;
}

export default function QualityPage({
  onRequestQuote,
  onRequestSample,
  onNavigateHome
}: QualityPageProps) {
  const pillars = [
    {
      icon: Droplets,
      title: '1. Strict Raw Material Selection',
      desc: 'We inspect daily coastal landings at Muara Baru port within minutes of boat arrivals. Only whole, undamaged, crystal-fresh catch with clear eyes and firm flesh is accepted into the sorting bay.'
    },
    {
      icon: Sun,
      title: '2. Polycarbonate Solar Dome Drying',
      desc: 'Replacing open-air road drying, our sealed solar dome dryers utilize greenhouse thermal convection. Products are 100% shielded from coastal dust, vehicle exhaust, insect contamination, and unexpected rainfall.'
    },
    {
      icon: Sparkles,
      title: '3. Hand Sorting & Precision Grading',
      desc: 'Trained sorting personnel inspect dried seafood across calibrated optical sorting lines, removing broken pieces, impurities, or discoloration to guarantee uniform export Grade AAA.'
    },
    {
      icon: Microscope,
      title: '4. Laboratory & Chemical Testing',
      desc: 'Each production lot is tested with digital moisture meters (10–12% target) and verified for 0% Formalin, 0% Borax, and safe histamine levels before release to packaging.'
    },
    {
      icon: ShieldCheck,
      title: '5. Food-Grade Vacuum Sealing',
      desc: 'Multilayer nylon barrier vacuum pouches prevent lipid oxidation, preserve natural golden appearance, and extend shelf stability for up to 12–24 months in international distribution.'
    },
    {
      icon: FileCheck2,
      title: '6. Government Quarantine Inspection',
      desc: 'BKIPM (Balai Karantina Ikan, Pengendalian Mutu dan Keamanan Hasil Perikanan) inspectors perform pre-shipment lot sampling, issuing official Health Certificates for customs clearance.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Quality & Standards</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>International Food Safety Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              Uncompromising Seafood Quality & Hygiene
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Discover how PT Samdura Bara Persada combines Indonesian artisanal drying heritage with modern enclosed solar dome drying, digital moisture verification, and zero-chemical lab testing.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Pillars of Quality Assurance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#009bb3] transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#009bb3] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{pillar.title}</h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Real Lab & Hygiene Visual Cards */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-black text-slate-900 font-serif-display">
              Verified Testing & Certifications
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Every shipment is backed by laboratory documentation, meeting stringent standards for importation into the United States, European Union, Japan, GCC, and East Asian nations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                <img
                  src="/images/gallery/lab-testing-formalin.png"
                  alt="Formalin and chemical testing laboratory"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900">0% Formalin & Borax Guarantee</h4>
                <p className="text-xs text-slate-500 mt-1">Rigorous test kits verify zero chemical additives or artificial preservatives.</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                <img
                  src="/images/gallery/solar-dome-dryer.png"
                  alt="Solar dome drying facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900">Dust-Free Solar Dome Driers</h4>
                <p className="text-xs text-slate-500 mt-1">Enclosed greenhouse environment prevents contamination from birds, flies, and coastal dust.</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                <img
                  src="/images/gallery/inspeksi-karantina-bkipm.png"
                  alt="BKIPM quarantine inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900">Official BKIPM Clearance</h4>
                <p className="text-xs text-slate-500 mt-1">Government fish quarantine health certificates provided with every bill of lading.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black font-serif-display">Want to inspect laboratory test reports or order samples?</h3>
            <p className="text-xs text-slate-300 mt-1">Contact our quality assurance desk for complete specification certificates.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={onRequestSample}
              className="px-6 py-3 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs transition shadow-md"
            >
              Order Quality Samples
            </button>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              Request Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

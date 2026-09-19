import React from 'react';
import { 
  Building2, 
  Warehouse, 
  Sun, 
  ShieldCheck, 
  Truck, 
  Award, 
  MapPin, 
  Package, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

interface FacilityPageProps {
  onRequestQuote: () => void;
  onNavigateHome: () => void;
}

export default function FacilityPage({ onRequestQuote, onNavigateHome }: FacilityPageProps) {
  const facilities = [
    {
      title: 'Solar Dome Drying Center',
      location: 'Kawasan Pesisir Muara Baru, Jakarta Utara',
      image: '/images/gallery/solar-dome-drying.png',
      desc: 'Enclosed UV-stabilized polycarbonate solar domes operating at 40°C - 55°C internal temperature with automated exhaust ventilation. Ensures rapid, uniform moisture extraction while fully protecting seafood from airborne particulate and pests.'
    },
    {
      title: 'Manual Optical Sorting & Grading Room',
      location: 'Muara Baru Processing Hub',
      image: '/images/gallery/surtir-teri-nasi-super.png',
      desc: 'Temperature-controlled grading hall equipped with stainless steel tables, LED inspection lighting, and trained sorters who calibrate catch by millimeter size, color purity, and structural integrity.'
    },
    {
      title: 'Hygienic Vacuum Sealing & Packaging Line',
      location: 'Muara Baru Processing Plant',
      image: '/images/gallery/pengemasan-kedap-udara.png',
      desc: 'Industrial chamber vacuum packaging machines capable of processing 100g retail consumer pouches up to 5kg bulk vacuum bags, flushed with inert food-grade nitrogen where required.'
    },
    {
      title: 'Quality Control & Formalin Inspection Lab',
      location: 'In-House Laboratory Facilities',
      image: '/images/gallery/laboratorium-mutu.png',
      desc: 'Rapid test station monitoring salt salinity percentages, digital water activity (aw), digital moisture percentage meters, and spectrophotometric screening for zero formalin or heavy metals.'
    },
    {
      title: 'Cold Storage & Intermediate Warehousing',
      location: 'Marunda Logistics Terminal',
      image: '/images/gallery/grading-fish-maw.png',
      desc: 'Dehumidified intermediate warehouse maintained at 15°C - 18°C for delicate commodities like fish maw and dried squid, plus 0°C cold room capacity for finished packed inventories.'
    },
    {
      title: 'Container Loading & Stuffing Terminal',
      location: 'Pelabuhan Tanjung Priok Access Corridor',
      image: '/images/gallery/pemuatan-kontainer.png',
      desc: 'Direct loading bays accommodating 20ft and 40ft standard and refrigerated (reefer) sea freight containers, supervised by tallymen to verify carton counts, pallet wrapping, and customs seals.'
    }
  ];

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
            <span className="text-slate-900 font-semibold">Processing Facility</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Muara Baru & Marunda Operations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              Hygienic Processing Facilities
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Take an inside look at our integrated production facilities at Kawasan Industri Maritim Muara Baru, Jakarta Utara. Built to exceed HACCP Grade A standards and accommodate high-volume international export contracts.
            </p>
          </div>
        </div>
      </div>

      {/* Facility Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-[#009bb3] hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#009bb3] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{fac.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{fac.title}</h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{fac.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  HACCP Monitored
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Area #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Invitation Banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black font-serif-display">Planning a Factory Audit or Site Visit?</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We welcome international buyers, trade attachés, and third-party inspection agencies (SGS, Bureau Veritas, Intertek) to tour our Muara Baru facilities.
            </p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3 rounded-xl bg-[#009bb3] text-white font-bold text-xs hover:bg-[#0d8a9e] transition shrink-0 shadow-lg shadow-[#009bb3]/30"
          >
            Schedule Facility Audit / Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}

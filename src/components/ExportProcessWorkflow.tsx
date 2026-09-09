import { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  Ship, 
  Truck, 
  Warehouse, 
  Anchor, 
  BadgeCheck,
  Plane,
  Sparkles
} from 'lucide-react';
import { EXPORT_WORKFLOW_STEPS } from '../data/initialData';

export default function ExportProcessWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="alur-ekspor" className="py-24 bg-slate-50 relative border-t border-b border-slate-200 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full bg-teal-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>SOP & ALUR KERJA EKSPOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight uppercase font-sans">
            Alur Proses Ekspor Terstruktur Berstandar Internasional
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Menjamin keamanan mutu produk, sertifikasi karantina ikan BKIPM, ketepatan jadwal kontainer, dan pelaporan rantai dingin dari pelabuhan muat Indonesia hingga tiba di gudang tujuan.
          </p>
        </div>

        {/* Step Navigation Pill Selector (Desktop / Tablet) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {EXPORT_WORKFLOW_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-white border-2 border-[#009bb3] shadow-md -translate-y-1'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              {activeStepIndex === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009bb3] to-[#519992]" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black font-mono ${activeStepIndex === idx ? 'text-[#009bb3]' : 'text-slate-400'}`}>
                  TAHAP {step.stepNumber}
                </span>
                {activeStepIndex === idx && (
                  <span className="w-2 h-2 rounded-full bg-[#009bb3] animate-pulse" />
                )}
              </div>
              <h4 className={`text-xs font-bold line-clamp-1 ${activeStepIndex === idx ? 'text-slate-950' : 'text-slate-600'}`}>
                {step.title}
              </h4>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {step.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Active Step Feature Highlight Showcase Card */}
        {(() => {
          const currentStep = EXPORT_WORKFLOW_STEPS[activeStepIndex];
          return (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Visual Photography of the Process */}
                <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
                  <img
                    src={currentStep.imageUrl}
                    alt={currentStep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white text-xs font-black tracking-wider uppercase shadow-md">
                    Langkah {currentStep.stepNumber} dari {EXPORT_WORKFLOW_STEPS.length}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs shadow-sm">
                    <span className="text-[#009bb3] font-black block mb-0.5">Dokumen Legalitas & Audit:</span>
                    <span className="text-slate-700 font-mono text-[11px]">{currentStep.complianceDoc}</span>
                  </div>
                </div>

                {/* Right: Detailed Description & Standards */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-black text-[#009bb3] uppercase tracking-widest block mb-1">
                      {currentStep.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      {currentStep.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentStep.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#519992] flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-[#009bb3]" />
                      <span>Standar Eksekusi & Quality Control:</span>
                    </span>
                    <p className="text-xs text-slate-600 leading-normal pl-5">
                      {currentStep.keyAction}
                    </p>
                  </div>

                  {/* Step Control Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                      className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      ← Tahap Sebelumnya
                    </button>

                    <span className="text-xs text-slate-400 font-mono font-bold">
                      {activeStepIndex + 1} / {EXPORT_WORKFLOW_STEPS.length}
                    </span>

                    <button
                      disabled={activeStepIndex === EXPORT_WORKFLOW_STEPS.length - 1}
                      onClick={() => setActiveStepIndex(prev => Math.min(EXPORT_WORKFLOW_STEPS.length - 1, prev + 1))}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 disabled:opacity-30 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
                    >
                      <span>Tahap Berikutnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}

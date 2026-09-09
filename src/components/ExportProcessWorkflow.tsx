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
    <section id="alur-ekspor" className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alur Kerja & Standard Operating Procedure (SOP)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-serif">
            Alur Proses Ekspor Terstruktur Berstandar Internasional
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Menjamin keamanan barang, ketepatan jadwal berlayar, kelengkapan sertifikat karantina, dan efisiensi biaya logistik dari origin Indonesia hingga gudang pembeli global.
          </p>
        </div>

        {/* Step Navigation Pill Selector (Desktop / Tablet) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {EXPORT_WORKFLOW_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                activeStepIndex === idx
                  ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 -translate-y-1'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              {activeStepIndex === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-400" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-black font-mono ${activeStepIndex === idx ? 'text-amber-400' : 'text-slate-500'}`}>
                  TAHAP {step.stepNumber}
                </span>
                {activeStepIndex === idx && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <h4 className={`text-xs font-bold line-clamp-1 ${activeStepIndex === idx ? 'text-white' : 'text-slate-400'}`}>
                {step.title}
              </h4>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                {step.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Active Step Feature Highlight Showcase Card */}
        {(() => {
          const currentStep = EXPORT_WORKFLOW_STEPS[activeStepIndex];
          return (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Visual Photography of the Process */}
                <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
                  <img
                    src={currentStep.imageUrl}
                    alt={currentStep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black tracking-wider uppercase shadow-md">
                    Langkah {currentStep.stepNumber} dari {EXPORT_WORKFLOW_STEPS.length}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs">
                    <span className="text-amber-400 font-bold block mb-0.5">Dokumen Legalitas & Audit:</span>
                    <span className="text-slate-300 font-mono text-[11px]">{currentStep.complianceDoc}</span>
                  </div>
                </div>

                {/* Right: Detailed Description & Standards */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
                      {currentStep.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {currentStep.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentStep.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-amber-400" />
                      <span>Standar Eksekusi & Quality Control:</span>
                    </span>
                    <p className="text-xs text-slate-400 leading-normal pl-5">
                      {currentStep.keyAction}
                    </p>
                  </div>

                  {/* Step Control Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      ← Tahap Sebelumnya
                    </button>

                    <span className="text-xs text-slate-500 font-mono">
                      {activeStepIndex + 1} / {EXPORT_WORKFLOW_STEPS.length}
                    </span>

                    <button
                      disabled={activeStepIndex === EXPORT_WORKFLOW_STEPS.length - 1}
                      onClick={() => setActiveStepIndex(prev => Math.min(EXPORT_WORKFLOW_STEPS.length - 1, prev + 1))}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
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

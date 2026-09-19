import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Anchor, 
  Clock, 
  FileCheck2, 
  Package, 
  Globe2, 
  Truck, 
  Award,
  Layers
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

interface ExportProcessPageProps {
  onRequestQuote: () => void;
  onRequestSample: () => void;
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export default function ExportProcessPage({
  onRequestQuote,
  onRequestSample,
  onNavigateHome,
  onNavigateProducts
}: ExportProcessPageProps) {
  const { t } = useTranslation();

  const steps = [
    {
      num: '01',
      title: 'Inquiry & Requirement Assessment',
      desc: 'Buyer submits RFQ indicating commodity type (dried anchovy, squid, shrimp, fish maw), estimated tonnage, packaging preference, and target discharge port.',
      duration: '1 - 2 Business Days',
      icon: FileText
    },
    {
      num: '02',
      title: 'Product & Specification Confirmation',
      desc: 'Our export desk verifies harvest seasonality, moisture grading, size sorting, and technical parameters against the importing nation’s standards.',
      duration: '1 Business Day',
      icon: CheckCircle2
    },
    {
      num: '03',
      title: 'Formal Commercial Quotation (FOB / CIF)',
      desc: 'We issue an official Proforma Invoice (PI) detailing product price per kg/ton, estimated ocean freight, insurance, and agreed Incoterms.',
      duration: '24 Hours',
      icon: Layers
    },
    {
      num: '04',
      title: 'Pre-Shipment Sample Dispatch (Optional)',
      desc: 'For new institutional buyers, representative production batch samples are dispatched via DHL/FedEx for physical sensory and lab inspection.',
      duration: '3 - 5 Days Delivery',
      icon: Package
    },
    {
      num: '05',
      title: 'Purchase Order & Payment Confirmation',
      desc: 'Buyer returns countersigned PI and establishes Letter of Credit (L/C at sight) or Telegraphic Transfer (T/T down payment) via prime international bank.',
      duration: 'Contract Milestone',
      icon: Award
    },
    {
      num: '06',
      title: 'Processing, Solar Dome Drying & Grading',
      desc: 'Raw fish is hygienically cleaned, solar dome dried, and hand-sorted under strict HACCP Grade A supervision to ensure 0% chemicals and exact moisture levels.',
      duration: '7 - 10 Days',
      icon: Clock
    },
    {
      num: '07',
      title: 'Vacuum Sealing & Export Master Packaging',
      desc: 'Commodities are packed into food-grade retail vacuum bags or heavy-duty 5-ply corrugated export cartons with desiccants and buyer shipping marks.',
      duration: '2 - 3 Days',
      icon: Package
    },
    {
      num: '08',
      title: 'Container Stuffing & Port Dispatch',
      desc: 'Containers are loaded at our Muara Baru logistics depot and transferred to Tanjung Priok Port (Jakarta) for customs export clearance (PEB).',
      duration: '1 - 2 Days',
      icon: Truck
    },
    {
      num: '09',
      title: 'Export Quarantine & Documentation Release',
      desc: 'BKIPM quarantine officers inspect cargo and issue Health Certificates. Full shipping document suite (BL, COO Form E, Invoice, Packing List) is surrendered.',
      duration: 'Concurrently with Sail Date',
      icon: FileCheck2
    }
  ];

  const documents = [
    {
      name: 'Health Certificate (Sertifikat Kesehatan Ikan)',
      authority: 'BKIPM - Kementerian Kelautan dan Perikanan (KKP)',
      desc: 'Mandatory government certificate verifying that the dried seafood is fit for human consumption and free from pathogenic organisms.'
    },
    {
      name: 'Certificate of Origin (COO / Form E / AK / D)',
      authority: 'Kementerian Perdagangan RI / Indonesian Chamber of Commerce',
      desc: 'Enables preferential tariff rates (zero or reduced import duties) under ASEAN, China-ASEAN, and bilateral trade pacts.'
    },
    {
      name: 'Certificate of Analysis (COA)',
      authority: 'Accredited Independent Testing Laboratory (KAN / ISO 17025)',
      desc: 'Verifies moisture content %, sodium chloride %, histamine level, and 0% formalin/borax negative test results.'
    },
    {
      name: 'Commercial Invoice & Detailed Packing List',
      authority: 'PT Samdura Bara Persada (Dried Seafood Global)',
      desc: 'Standard commercial documentation indicating net weight, gross weight, HS codes, carton count, and container seals.'
    },
    {
      name: 'Ocean Bill of Lading (B/L) or Air Waybill (AWB)',
      authority: 'International Shipping Line (Maersk, ONE, CMA CGM, Evergreen)',
      desc: 'Official freight receipt and document of title for cargo release at the destination port of discharge.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Export Process</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Anchor className="w-3.5 h-3.5" />
              <span>International Trade & Logistics Workflow</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              End-to-End B2B Export Process
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              From raw catch landing at Muara Baru port to customs clearance and ocean vessel dispatch, discover our standardized 9-step export workflow designed for international wholesalers, distributors, and food processors.
            </p>
          </div>
        </div>
      </div>

      {/* 9-Step Process Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-900 font-serif-display">
            The 9-Step Export Journey
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Structured for operational transparency, strict quality assurance, and timely international port delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#009bb3] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#009bb3] font-mono">{step.num}</span>
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-[#009bb3]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Timeline:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-medium">{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Export Documentation Suite */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Regulatory Compliance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-display">
              Export Shipping Documentation Package
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Every international container is supported by legitimate government and quarantine documents to ensure smooth customs entry at destination ports worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <FileCheck2 className="w-4 h-4 text-[#009bb3] shrink-0" />
                  <span>{doc.name}</span>
                </div>
                <div className="text-[11px] font-semibold text-cyan-800">{doc.authority}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Port Connections Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-2xl font-black font-serif-display tracking-tight">
              Ready to Initiate a Trial Consignment or Request a Quotation?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our bilingual export desk (English, Indonesian, Mandarin, Arabic) provides responsive trade quotations within 24 business hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-[#009bb3] text-white font-bold text-xs hover:bg-[#0d8a9e] transition shadow-lg shadow-[#009bb3]/30"
            >
              Request Formal Quotation (RFQ)
            </button>
            <button
              onClick={onRequestSample}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              Order Quality Samples
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

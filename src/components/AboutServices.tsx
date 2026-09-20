import React from 'react';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Ship, 
  Plane, 
  Warehouse, 
  FileCheck, 
  Truck, 
  Sparkles,
  Anchor,
  Globe2,
  FileCheck2,
  BadgeCheck,
  Flame
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface AboutServicesProps {
  onSelectServiceForQuote?: (serviceTitle: string) => void;
  onNavigate?: (path: string) => void;
}

export default function AboutServices({ onSelectServiceForQuote, onNavigate }: AboutServicesProps) {
  const { t, currentLang } = useTranslation();

  const handleOpenCorporateProfile = () => {
    if (onNavigate) {
      onNavigate('/about');
    } else {
      window.location.href = '/about';
    }
  };

  // Certified compliance & ecosystem badges for running marquee row 1
  // TIP: Masukkan logo asli Anda ke folder public (misal: /images/logos/haccp.png) 
  // lalu isi properti logoUrl di bawah. Jika logoUrl kosong, icon Lucide akan otomatis tampil sebagai fallback.
  interface MarqueeItem {
    id: string;
    name: string;
    label: string;
    icon: any;
    color: string;
    logoUrl?: string; // Tautan/path gambar logo asli (SVG / PNG / WebP)
  }

  const marqueeRow1: MarqueeItem[] = [
    {
      id: 'kkp',
      name: 'Kementerian Kelautan & Perikanan (KKP)',
      label: 'Sertifikasi & Karantina Hasil Laut BKIPM',
      icon: ShieldCheck,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      logoUrl: '/images/logos/kkp.png'
    },
    {
      id: 'halal',
      name: 'Halal Indonesia (BPJPH)',
      label: 'Sertifikasi Halal Resmi Kemenag RI',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      logoUrl: '/images/logos/halal.svg'
    },
    {
      id: 'kemendag',
      name: 'Kementerian Perdagangan (Kemendag)',
      label: 'Registrasi Eksportir & Fasilitasi Dagang Internasional',
      icon: Building2,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      logoUrl: '/images/logos/kemendag.png'
    },
    {
      id: 'kemenkumham',
      name: 'Kemenkumham RI',
      label: 'Legalitas Badan Usaha PT Samdura Bara Persada',
      icon: BadgeCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      logoUrl: '/images/logos/kemenkumham.png'
    },
    {
      id: 'inaexport',
      name: 'InaExport Kemendag',
      label: 'Portal Resmi Eksportir Terverifikasi RI',
      icon: Globe2,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      logoUrl: '/images/logos/inaexport.png'
    },
    {
      id: 'haccp',
      name: 'HACCP Grade A Standard',
      label: 'Hazard Analysis & Critical Control Point',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      logoUrl: ''
    }
  ];

  // Maritime hubs & logistics capabilities for running marquee row 2
  const marqueeRow2: MarqueeItem[] = [
    {
      id: 'inaexport-alt',
      name: 'InaExport Verified Exporter',
      label: 'B2B Trade Directory Kemendag RI',
      icon: Globe2,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      logoUrl: '/images/logos/inaexport.png'
    },
    {
      id: 'kkp-alt',
      name: 'Badan Karantina Ikan KKP',
      label: 'Health Certificate & Sanitary Clearance',
      icon: ShieldCheck,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      logoUrl: '/images/logos/kkp.png'
    },
    {
      id: 'halal-alt',
      name: 'Halal Certified Supply Chain',
      label: '100% Halal Verified Sourcing & Process',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      logoUrl: '/images/logos/halal.svg'
    },
    {
      id: 'priok',
      name: 'Port of Tanjung Priok (IDTPP)',
      label: 'Main Sea Freight Dispatch & Terminal',
      icon: Ship,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      logoUrl: ''
    },
    {
      id: 'solardome',
      name: 'Solar Dome Dryer Tech',
      label: 'Hygienic Dehydration & Moisture ≤ 12-18%',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      logoUrl: ''
    },
    {
      id: 'zerochem',
      name: '100% Bebas Formalin',
      label: 'Nol Pengawet Kimia & Garam Laut Alami',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      logoUrl: ''
    },
    {
      id: 'ssl',
      name: 'DigiCert EV TLS 1.3',
      label: '256-Bit Encrypted B2B Trade Portal',
      icon: ShieldCheck,
      color: 'text-slate-800 bg-slate-100 border-slate-300',
      logoUrl: ''
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHORT COMPANY INTRODUCTION (Dried Seafood Global & PT Samdura Bara Persada) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 mb-14 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>{currentLang === 'id' ? 'PROFIL PERUSAHAAN' : 'CORPORATE INTRODUCTION'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {currentLang === 'id' 
                ? 'Dried Seafood Global — Dioperasikan oleh PT Samdura Bara Persada'
                : 'Dried Seafood Global — Operated by PT Samdura Bara Persada'}
            </h2>
            
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentLang === 'id'
                ? 'Platform dan perusahaan ekspor hasil laut kering asal Indonesia yang berfokus melayani importir internasional, distributor grosir, dan industri pengolahan pangan melalui rantai pasok terstandarisasi, kadar air terkontrol, serta kepatuhan karantina resmi.'
                : 'A dedicated Indonesian dried seafood export platform operated by PT Samdura Bara Persada, supplying international importers, wholesalers, and food manufacturers with standardized quality, controlled moisture, and official quarantine clearance.'}
            </p>
          </div>

          {/* 3 Key Verified Facts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider mb-1">
                {currentLang === 'id' ? 'FAKTA 1 • SOURCING PESISIR' : 'FACT 1 • COASTAL SOURCING'}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                {currentLang === 'id' ? 'Kemitraan 1.200+ Nelayan' : '1,200+ Partner Fishermen'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentLang === 'id'
                  ? 'Pasokan langsung dari sentra nelayan pesisir Pantura Jawa, Sumatra, dan Sulawesi dengan metode tangkap selektif.'
                  : 'Direct coastal sourcing across Java, Sumatra, and Sulawesi with selective artisanal fishing practices.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider mb-1">
                {currentLang === 'id' ? 'FAKTA 2 • MUTU & HIGIENITAS' : 'FACT 2 • QUALITY & HYGIENE'}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                {currentLang === 'id' ? '100% Bebas Bahan Kimia' : '100% Zero Formalin / Additives'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentLang === 'id'
                  ? 'Pengeringan surya alami dan kubah tertutup dengan kadar air terstandarisasi ≤ 12-18% dan garam laut murni.'
                  : 'Natural sun-drying & enclosed solar domes with moisture controlled ≤ 12-18% using pure sea salt.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider mb-1">
                {currentLang === 'id' ? 'FAKTA 3 • LEGALITAS RESMI' : 'FACT 3 • OFFICIAL COMPLIANCE'}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                {currentLang === 'id' ? 'NIB & Karantina BKIPM' : 'NIB & Quarantine Certified'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentLang === 'id'
                  ? 'Terdaftar resmi NIB 1408230135849 dengan Health Certificate resmi dari BKIPM KKP untuk setiap pengiriman.'
                  : 'Registered NIB 1408230135849 with official Health Certificates issued by BKIPM Marine Fisheries.'}
              </p>
            </div>
          </div>

          {/* Learn More Action Button */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {currentLang === 'id' ? 'Badan Hukum Resmi: PT Samdura Bara Persada' : 'Official Operating Entity: PT Samdura Bara Persada'}
            </span>
            <button
              type="button"
              onClick={handleOpenCorporateProfile}
              id="hero-learn-corporate-btn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009bb3] hover:text-[#008399] transition-colors cursor-pointer"
            >
              <span>{currentLang === 'id' ? 'Pelajari Profil Lengkap & Legalitas' : 'Learn More About Corporate Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 CORE PILLARS: TERPERCAYA, KOMPETITIF, EFISIEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Terpercaya */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                JAMINAN LEGALITAS
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                TERPERCAYA
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mitra dagang resmi berizin ekspor terdaftar di KKP RI dengan sertifikasi kesehatan karantina, sertifikat halal BPJPH, serta standar Hazard Analysis Critical Control Point (HACCP Grade A).
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full Trade Documentation &amp; COA</span>
            </div>
          </div>

          {/* Card 2: Kompetitif */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                HARGA SENTRA PERTAMA
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                KOMPETITIF
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pasokan langsung dari sentra nelayan pesisir Jawa, Sumatra, dan Kalimantan tanpa mata rantai tengkulak berlebih, memberikan margin terbaik dan stabilitas harga jangka panjang bagi importir.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Direct Sourcing &amp; Fair Trade</span>
            </div>
          </div>

          {/* Card 3: Efisien */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Ship className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                DISTRIBUSI CEPAT
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                EFISIEN
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Manajemen logistik multimoda via kapal laut (FCL/LCL) dan kargo udara ekspres dari pelabuhan utama Indonesia, didukung sistem monitoring kelembaban kontainer hingga ke dermaga tujuan.
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ocean &amp; Air Freight Global Logistics</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RUNNING LOGO / ICON MARQUEE SECTION                          */}
        {/* Replacing old static tabs with live continuous running icons */}
        {/* ============================================================ */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header of Running Ticker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#009bb3] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentLang === 'id' ? 'STANDAR AKREDITASI & EKOSISTEM LOGISTIK' : 'GLOBAL ACCREDITATION & MARITIME ECOSYSTEM'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentLang === 'id' 
                  ? 'Sertifikasi Mutu, Pelabuhan & Legalitas Terverifikasi' 
                  : 'Certified Compliance, Global Ports & Official Standards'}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleOpenCorporateProfile}
              id="btn-view-full-profile-marquee"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer self-start sm:self-center shrink-0"
            >
              <span>{currentLang === 'id' ? 'Buka Profil & Legalitas Lengkap' : 'View Full Corporate Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Gradient Edge Masks for Smooth Fade */}
          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Row 1: Running Left */}
            <div className="flex overflow-hidden mb-4">
              <div className="animate-marquee flex gap-4 items-center">
                {[...marqueeRow1, ...marqueeRow1].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`row1-${item.id}-${idx}`}
                      className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-[#009bb3] hover:bg-white transition-all shrink-0 cursor-default group"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} shadow-2xs shrink-0 overflow-hidden bg-white p-1.5`}>
                        {item.logoUrl ? (
                          <img
                            src={item.logoUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // If image fails to load, replace with parent icon
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-slate-900 block whitespace-nowrap group-hover:text-[#009bb3] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Running Right (Reverse) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-reverse flex gap-4 items-center">
                {[...marqueeRow2, ...marqueeRow2].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`row2-${item.id}-${idx}`}
                      className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-[#009bb3] hover:bg-white transition-all shrink-0 cursor-default group"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} shadow-2xs shrink-0 overflow-hidden bg-white p-1.5`}>
                        {item.logoUrl ? (
                          <img
                            src={item.logoUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-slate-900 block whitespace-nowrap group-hover:text-[#009bb3] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Micro Footer Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seluruh sertifikat mutu karantina dan uji laboratorium (COA) diterbitkan resmi per batch keberangkatan.</span>
            </span>
            <button
              type="button"
              onClick={handleOpenCorporateProfile}
              className="text-[#009bb3] font-bold hover:underline cursor-pointer"
            >
              Pelajari Struktur Manajemen & Layanan Perusahaan &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Compass, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Ship, 
  Plane, 
  Warehouse, 
  FileCheck, 
  Truck, 
  Linkedin,
  Sparkles
} from 'lucide-react';
import { COMPANY_PROFILE, SERVICES_LIST, LEADERSHIP_TEAM, CERTIFICATIONS } from '../data/initialData';
import { ServiceItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface AboutServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export default function AboutServices({ onSelectServiceForQuote }: AboutServicesProps) {
  const { t, currentLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'leadership' | 'certifications'>('services');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, any> = {
    Ship,
    Plane,
    Warehouse,
    FileCheck,
    Truck,
    ShieldCheck
  };

  return (
    <section id="tentang" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Image 2 Inspiration: TENTANG KAMI */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>TENTANG KAMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase font-sans">
            Solusi Ekspor Hasil Laut Berkualitas dari Indonesia
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Menghubungkan sentra nelayan pesisir Nusantara dengan pasar kuliner & distributor internasional melalui standarisasi mutu kering higienis, legalitas resmi, dan rantai pasok terpercaya.
          </p>
        </div>

        {/* MODERN PROCESSING FACILITY HERO BANNER (Direct from Image 2) */}
        <div className="mb-14 relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <img 
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=85" 
              alt="Fasilitas Pengolahan dan Sortasi Higienis Shrimora"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/80 text-white font-bold text-xs uppercase tracking-wider mb-2 backdrop-blur-sm">
                  HIGIENIS & STERIL
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Standarisasi Pengolahan & Pengemasan Ekspor Internasional
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                  Pekerja bersertifikasi dengan seragam steril dan meja stainless steel SUS-304 guna menjamin mutu ikan asin dan hasil laut kering bebas kontaminasi.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold whitespace-nowrap">
                  HACCP Grade A
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold whitespace-nowrap">
                  Zero Formalin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 CORE PILLARS FROM IMAGE 2: TERPERCAYA, KOMPETITIF, EFISIEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Terpercaya */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                JAMINAN LEGALITAS
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase mb-3">
                TERPERCAYA
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mitra dagang resmi berizin ekspor terdaftar di KKP RI dengan sertifikasi kesehatan karantina, sertifikat halal BPJPH, serta standar Hazard Analysis Critical Control Point (HACCP Grade A).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Trade Documentation & COA</span>
            </div>
          </div>

          {/* Card 2: Kompetitif */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                HARGA SENTRA PERTAMA
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase mb-3">
                KOMPETITIF
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pasokan langsung dari sentra nelayan pesisir Jawa, Sumatra, dan Kalimantan tanpa mata rantai tengkulak berlebih, memberikan margin terbaik dan stabilitas harga jangka panjang bagi importir.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Sourcing & Fair Trade</span>
            </div>
          </div>

          {/* Card 3: Efisien */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <Ship className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                DISTRIBUSI CEPAT
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase mb-3">
                EFISIEN
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Manajemen logistik multimoda via kapal laut (FCL/LCL) dan kargo udara ekspres dari pelabuhan utama Indonesia, didukung sistem monitoring kelembaban kontainer hingga ke dermaga tujuan.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ocean & Air Freight Global Logistics</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex-wrap gap-1 justify-center max-w-full">
            <button
              onClick={() => setActiveTab('services')}
              id="tab-btn-services"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.about?.tabs?.services || (currentLang === 'id' ? 'Layanan & Operasional' : 'Services & Capabilities')}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              id="tab-btn-profile"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.about?.tabs?.profile || (currentLang === 'id' ? 'Profil Perusahaan' : 'Corporate Profile')}
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              id="tab-btn-leadership"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'leadership'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.about?.tabs?.leadership || (currentLang === 'id' ? 'Tim Manajemen' : 'Executive Team')}
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              id="tab-btn-certifications"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'certifications'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.about?.tabs?.certifications || (currentLang === 'id' ? 'Sertifikasi & Legalitas' : 'Accreditation & Compliance')}
            </button>
          </div>
        </div>

        {/* TAB 1: SERVICES GRID */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {SERVICES_LIST.map((service) => {
              const Icon = iconMap[service.icon] || Ship;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {service.category}
                    </span>
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-r from-[#009bb3] to-[#519992] text-white flex items-center justify-center font-bold shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#009bb3] transition-colors mb-2 line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {service.metrics.map((m, i) => (
                          <div key={i} className="text-center">
                            <span className="text-[11px] text-slate-500 block">{m.label}</span>
                            <span className="text-xs font-black text-[#009bb3]">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedService(service)}
                        id={`btn-detail-${service.id}`}
                        className="text-xs font-bold text-[#009bb3] hover:text-teal-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Pelajari Spesifikasi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        id={`btn-quote-${service.id}`}
                        className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#009bb3] hover:text-white text-slate-700 transition-all cursor-pointer"
                      >
                        Minta Penawaran
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: PROFILE, VISION & MISSION */}
        {activeTab === 'profile' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Story & Legacy */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[#009bb3] font-bold tracking-widest text-xs uppercase">
                    Sejak 2012 • 14 Tahun Dedikasi Maritim Nusantara
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    Membawa Cita Rasa & Standar Ikan Kering Nusantara ke Seluruh Dunia
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Didirikan pada tahun 2012 di kawasan Pelabuhan Perikanan Samudera Jakarta, PT Dried Seafood Global Indonesia berakar dari kecintaan terhadap keanekaragaman bahari Nusantara dan kepedulian terhadap kesejahteraan nelayan tradisional.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Kini, kami mengoperasikan sentra pengeringan modern bertenaga surya (Solar Dome Dryer) dan gudang penyimpanan berkelembaban rendah di Belawan, Muara Baru, dan Surabaya, serta jaringan distribusi ekspor ke 28 negara di Asia, Timur Tengah, dan Amerika.
                  </p>
                </div>
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                  <img 
                    src="/images/products/exp-teri-nasi-1.png" 
                    alt="Sentra Pengolahan Dried Seafood Global"
                    referrerPolicy="no-referrer"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <div className="text-xs text-white">
                      <span className="font-bold text-teal-300">Sentra Penjemuran & Ekspor:</span> Muara Baru & Belawan Terminal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">Visi Perusahaan</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Menjadi eksportir produk ikan olahan dan hasil laut kering terdepan di Asia Tenggara yang diakui dunia atas kemurnian produk, kebersihan higienis standar HACCP, dan integritas rantai pasok maritim yang adil.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">Misi Strategis</h4>
                <ul className="text-slate-600 space-y-2.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>Menjamin 100% ikan kering bebas bahan pengawet kimia berbahaya (nol formalin & boraks).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>Menerapkan teknologi pengeringan ramah lingkungan Solar Dome Dryer untuk menjaga nutrisi dan higienitas optimal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>Memperkuat kemitraan langsung dengan kelompok nelayan pesisir demi perdagangan yang berkelanjutan dan adil.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEADERSHIP */}
        {activeTab === 'leadership' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {LEADERSHIP_TEAM.map((leader) => (
              <div
                key={leader.id}
                id={`leader-card-${leader.id}`}
                className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md p-5 flex flex-col items-center text-center group transition-all"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-teal-200 group-hover:border-[#009bb3] group-hover:scale-105 transition-all shadow-md">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-base font-black text-slate-900 group-hover:text-[#009bb3] transition-colors">
                  {leader.name}
                </h4>
                <span className="text-xs font-bold text-[#519992] mb-3 block">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                  {leader.bio}
                </p>
                <a
                  href={leader.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-6 rounded-3xl flex items-start gap-4 hover:border-[#009bb3] transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">{cert.name}</h4>
                  <p className="text-xs font-bold text-[#519992] mb-2">Lembaga: {cert.issuer}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-[#009bb3] text-xs font-bold border border-teal-200">
                {selectedService.category}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-950 mb-3">
              {selectedService.title}
            </h3>

            <div className="rounded-2xl overflow-hidden h-52 mb-6 border border-slate-200">
              <img 
                src={selectedService.imageUrl} 
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <h4 className="text-xs font-extrabold text-[#009bb3] uppercase tracking-wider mb-3">
              Fitur & Keunggulan Khusus:
            </h4>
            <ul className="space-y-2.5 mb-6">
              {selectedService.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-150 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(title);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-sm shadow-md hover:opacity-95 cursor-pointer"
              >
                Minta Penawaran Spesifikasi Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

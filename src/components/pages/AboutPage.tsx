import React, { useState } from 'react';
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
  Anchor,
  Ship,
  Plane,
  Warehouse,
  FileCheck,
  Truck,
  Linkedin,
  Sparkles,
  Eye,
  Target,
  X
} from 'lucide-react';
import { 
  COMPANY_PROFILE, 
  STRATEGIC_PARTNERS, 
  SERVICES_LIST, 
  LEADERSHIP_TEAM, 
  CERTIFICATIONS, 
  OFFICIAL_COMPLIANCE_DOCUMENTS 
} from '../../data/initialData';
import { ServiceItem } from '../../types';
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
  const { t, currentLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'leadership' | 'certifications'>('profile');
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
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Top Breadcrumb & Corporate Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Corporate Profile & Capabilities</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>PT Samdura Bara Persada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif-display">
              {currentLang === 'id' 
                ? 'Profil Perusahaan & Standar Ekspor Bahari' 
                : 'Corporate Profile & Maritime Export Standards'}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentLang === 'id'
                ? 'Dioperasikan oleh PT Samdura Bara Persada dengan merek dagang Dried Seafood Global, menghubungkan hasil laut tangkapan nelayan pesisir Indonesia dengan jaringan importir, distributor grosir, dan industri pangan global.'
                : 'Operating under the trade brand Dried Seafood Global, PT Samdura Bara Persada connects pristine Indonesian artisanal fishing waters with demanding international wholesale, distribution, and food manufacturing markets.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Navigation Tabs Container */}
        <div id="about-tabs-container" className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex-wrap gap-1 justify-center max-w-full">
            <button
              onClick={() => setActiveTab('profile')}
              id="tab-btn-profile"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {currentLang === 'id' ? 'Profil Perusahaan' : 'Corporate Profile'}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              id="tab-btn-services"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {currentLang === 'id' ? 'Layanan & Kapabilitas' : 'Services & Capabilities'}
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
              {currentLang === 'id' ? 'Tim Eksekutif' : 'Executive Team'}
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
              {currentLang === 'id' ? 'Akreditasi & Kepatuhan' : 'Accreditation & Compliance'}
            </button>
          </div>
        </div>

        {/* TAB 1: CORPORATE PROFILE (Story, Vision & Mission, Key Facts) */}
        {activeTab === 'profile' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Story & Legacy Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[#009bb3] font-bold tracking-widest text-xs uppercase">
                    Sejak 2012 • 14 Tahun Dedikasi Maritim Nusantara
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                    Membawa Cita Rasa & Standar Ikan Kering Nusantara ke Seluruh Dunia
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Didirikan pada tahun 2012 di kawasan Pelabuhan Perikanan Samudera Jakarta, PT Samdura Bara Persada berakar dari kecintaan terhadap keanekaragaman bahari Nusantara dan kepedulian terhadap kesejahteraan nelayan tradisional.
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

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Visi Perusahaan</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Menjadi eksportir produk ikan olahan dan hasil laut kering terdepan di Asia Tenggara yang diakui dunia atas kemurnian produk, kebersihan higienis standar HACCP, dan integritas rantai pasok maritim yang adil.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Misi Strategis</h3>
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

            {/* Corporate Registered Identity Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Informasi Badan Hukum & Fasilitas Operasional</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Badan Usaha</span>
                  <span className="font-bold text-slate-900 text-sm block mt-1">PT Samdura Bara Persada</span>
                  <span className="text-slate-500 mt-1 block">Akta Notaris & SK Kemenkumham RI</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Kantor Operasional & Hub</span>
                  <span className="font-bold text-slate-900 text-sm block mt-1">Muara Baru, Jakarta Utara</span>
                  <span className="text-slate-500 mt-1 block">Pelabuhan Perikanan Samudera</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Pelabuhan Muat Ekspor</span>
                  <span className="font-bold text-slate-900 text-sm block mt-1">Tanjung Priok (IDTPP)</span>
                  <span className="text-slate-500 mt-1 block">FCL & LCL Reefer / Dry Sea Freight</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Standar Karantina</span>
                  <span className="font-bold text-emerald-700 text-sm block mt-1">BKIPM KKP Certified</span>
                  <span className="text-slate-500 mt-1 block">Health Certificate Resmi Tiap Lot</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & CAPABILITIES */}
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
                        onClick={onRequestQuote}
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

        {/* TAB 3: EXECUTIVE TEAM */}
        {activeTab === 'leadership' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {LEADERSHIP_TEAM.map((leader) => (
              <div
                key={leader.id}
                id={`leader-card-${leader.id}`}
                className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md p-6 flex flex-col items-center text-center group transition-all"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-teal-200 group-hover:border-[#009bb3] group-hover:scale-105 transition-all shadow-md">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#009bb3] transition-colors">
                  {leader.name}
                </h3>
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

        {/* TAB 4: ACCREDITATION & COMPLIANCE */}
        {activeTab === 'certifications' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Nomor Induk Berusaha (NIB)</h3>
                    <p className="text-[11px] text-slate-400">Dokumen legalitas ekspor resmi Kemeninves/BKPM</p>
                  </div>
                </div>
                <p className="text-2xl font-black tracking-[0.12em] text-teal-300 font-mono">{OFFICIAL_COMPLIANCE_DOCUMENTS.nib}</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Sertifikat P-IRT</h3>
                    <p className="text-[11px] text-slate-400">Izin edar resmi dinas kesehatan pangan</p>
                  </div>
                </div>
                <p className="text-2xl font-black tracking-[0.12em] text-amber-300 font-mono">{OFFICIAL_COMPLIANCE_DOCUMENTS.pirt}</p>
              </div>
            </div>

            {/* HS Code Reference Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-black text-slate-950">Legalitas & Spesifikasi HS Code Ekspor</h3>
                <p className="mt-1 text-xs text-slate-500">Referensi klasifikasi komoditas hasil laut kering untuk kepabeanan internasional.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-5 py-3 font-bold">Negara / Kawasan</th>
                      <th className="px-5 py-3 font-bold">HS Code Resmi</th>
                      <th className="px-5 py-3 font-bold">Deskripsi Komoditas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OFFICIAL_COMPLIANCE_DOCUMENTS.hsCodes.map((item) => (
                      <tr key={item.country} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-5 py-3 font-bold text-slate-800">{item.flag} {item.country}</td>
                        <td className="px-5 py-3 font-mono font-bold text-[#009bb3]">{item.code}</td>
                        <td className="px-5 py-3 text-slate-600">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        )}

        {/* Strategic Ecosystem Partners */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>Ecosystem & Commercial Alliances</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif-display">
              Mitra Strategis & Ekosistem Ekspor
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Kolaborasi terpercaya di bidang penangkapan, logistik dingin, sertifikasi mutu, dan distribusi internasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRATEGIC_PARTNERS.map((partner) => (
              <div key={partner.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-sm font-mono shadow-sm">
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

        {/* Bottom CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif-display">
              {currentLang === 'id' ? 'Bermitra dengan Eksportir Bahari Indonesia Resmi' : 'Partner with a Verified Indonesian Seafood Exporter'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              {currentLang === 'id'
                ? 'Dapatkan penawaran harga FOB/CIF, dokumen sertifikat analisis (COA), serta pengiriman sampel uji laboratorium untuk kebutuhan bisnis Anda.'
                : 'Receive official FOB/CIF rate quotations, Certificate of Analysis (COA), and laboratory evaluation sample batches.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs sm:text-sm transition shadow-lg hover:opacity-95 cursor-pointer"
            >
              {currentLang === 'id' ? 'Minta Penawaran Resmi (RFQ)' : 'Request Corporate RFQ'}
            </button>
            <button
              onClick={onNavigateProducts}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              {currentLang === 'id' ? 'Lihat Katalog Produk' : 'Explore Commodities'}
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
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
                  setSelectedService(null);
                  onRequestQuote();
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-sm shadow-md hover:opacity-95 cursor-pointer"
              >
                Minta Penawaran Spesifikasi Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

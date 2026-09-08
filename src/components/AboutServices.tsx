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
    <section id="tentang" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            {t.about.title}
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            {t.about?.description || t.about?.subtitle || ''}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('services')}
              id="tab-btn-services"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.about?.tabs?.services || (currentLang === 'id' ? 'Layanan & Operasional' : 'Services & Capabilities')}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              id="tab-btn-profile"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.about?.tabs?.profile || (currentLang === 'id' ? 'Profil Perusahaan' : 'Corporate Profile')}
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              id="tab-btn-leadership"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'leadership'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.about?.tabs?.leadership || (currentLang === 'id' ? 'Tim Manajemen' : 'Executive Team')}
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              id="tab-btn-certifications"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'certifications'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">
                      {service.category}
                    </span>
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2 line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        {service.metrics.map((m, i) => (
                          <div key={i} className="text-center">
                            <span className="text-[11px] text-slate-400 block">{m.label}</span>
                            <span className="text-xs font-extrabold text-amber-400">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => setSelectedService(service)}
                        id={`btn-detail-${service.id}`}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Pelajari Spesifikasi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        id={`btn-quote-${service.id}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-all"
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 lg:p-10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">
                    Sejak 2012 • 14 Tahun Dedikasi Maritim
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Membawa Cita Rasa & Kualitas Ikan Kering Nusantara ke Seluruh Dunia
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Didirikan pada tahun 2012 di kawasan Pelabuhan Perikanan Samudera Jakarta, PT Dried Seafood Global Indonesia berakar dari kecintaan terhadap keanekaragaman bahari Nusantara dan kepedulian terhadap kesejahteraan nelayan tradisional.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Kini, kami mengoperasikan sentra pengeringan modern bertenaga surya (Solar Dome Dryer) dan gudang penyimpanan berkelembaban rendah di Belawan, Muara Baru, dan Surabaya, serta jaringan distribusi ekspor ke 28 negara di Asia, Timur Tengah, dan Amerika.
                  </p>
                </div>
                <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80" 
                    alt="Sentra Pengolahan Dried Seafood Global"
                    referrerPolicy="no-referrer"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-4">
                    <div className="text-xs text-slate-200">
                      <span className="font-bold text-amber-400">Sentra Pengeringan & Ekspor:</span> Muara Baru & Belawan Terminal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Visi Perusahaan</h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Menjadi eksportir produk ikan olahan dan hasil laut kering terdepan di Asia Tenggara yang diakui dunia atas kemurnian produk, kebersihan higienis standar HACCP, dan integritas rantai pasok maritim yang adil.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Misi Strategis</h4>
                <ul className="text-slate-300 space-y-2.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Menjamin 100% ikan kering bebas bahan pengawet kimia berbahaya (nol formalin & boraks).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>Menerapkan teknologi pengeringan ramah lingkungan Solar Dome Dryer untuk menjaga nutrisi dan higienitas optimal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
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
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg p-5 flex flex-col items-center text-center group"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-amber-500/40 group-hover:scale-105 transition-transform shadow-lg">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {leader.name}
                </h4>
                <span className="text-xs font-semibold text-amber-400/90 mb-3 block">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-1">
                  {leader.bio}
                </p>
                <a
                  href={leader.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-lg"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
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
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4 hover:border-amber-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                  <p className="text-xs font-semibold text-amber-400 mb-2">Lembaga: {cert.issuer}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/40">
                {selectedService.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {selectedService.title}
            </h3>

            <div className="rounded-xl overflow-hidden h-52 mb-6 border border-slate-700">
              <img 
                src={selectedService.imageUrl} 
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Fitur & Keunggulan Khusus:
            </h4>
            <ul className="space-y-2.5 mb-6">
              {selectedService.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-sm"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(title);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md"
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

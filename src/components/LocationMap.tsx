import { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  Globe2, 
  ExternalLink, 
  Navigation,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/initialData';
import { OfficeLocation } from '../types';

export default function LocationMap() {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(OFFICE_LOCATIONS[0]);

  return (
    <section id="lokasi" className="py-20 bg-slate-900/70 text-slate-100 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sentra Pengolahan & Kantor Ekspor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Peta Lokasi Kantor Pusat, Sentra Pengeringan & Hub Ekspor
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Kunjungi kantor pusat ekspor kami di Jakarta serta fasilitas sentra pengeringan higienis dan gudang di Belawan (Medan), Cilacap, dan Surabaya.
          </p>
        </div>

        {/* Global Hub Switcher Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {OFFICE_LOCATIONS.map((office) => {
            const isSelected = selectedOffice.id === office.id;
            return (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(office)}
                id={`hub-tab-${office.id}`}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>{office.city}</span>
                {office.isHQ && (
                  <span className="bg-slate-950/80 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold">
                    HQ
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Map & Office Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Visualization / Embed */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">Live GPS Coordinates:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {selectedOffice.coordinates.lat.toFixed(6)}, {selectedOffice.coordinates.lng.toFixed(6)}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{selectedOffice.timeZone}</span>
            </div>

            {/* Simulated Interactive Vector Map Canvas & Embedded OpenStreetMap iframe */}
            <div className="relative flex-1 min-h-[360px] bg-slate-950">
              <iframe
                title={`Map of ${selectedOffice.city}`}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[360px] border-0 filter invert contrast-125 opacity-85"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedOffice.coordinates.lng - 0.04}%2C${selectedOffice.coordinates.lat - 0.03}%2C${selectedOffice.coordinates.lng + 0.04}%2C${selectedOffice.coordinates.lat + 0.03}&layer=mapnik&marker=${selectedOffice.coordinates.lat}%2C${selectedOffice.coordinates.lng}`}
              />

              {/* Custom Map Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{selectedOffice.city}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {selectedOffice.address}
                </p>
              </div>

              {/* Direct Directions Button on Map */}
              <div className="absolute top-4 right-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-open-google-maps"
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs shadow-lg transition-transform transform hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Office Specs & Contact Card */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  {selectedOffice.country}
                </span>
                {selectedOffice.isHQ && (
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Global Headquarters
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedOffice.city}
              </h3>
              <p className="text-slate-400 text-xs font-mono mb-6">
                Kode Pos: {selectedOffice.postalCode} • Zona Waktu: {selectedOffice.timeZone}
              </p>

              <div className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Alamat Lengkap Kantor:</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">{selectedOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Jam Operasional Layanan:</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">{selectedOffice.hours}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">Telepon Kantor:</span>
                      <a href={`tel:${selectedOffice.phone}`} className="text-xs font-bold text-slate-200 hover:text-amber-400">
                        {selectedOffice.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">Email Cabang:</span>
                      <a href={`mailto:${selectedOffice.email}`} className="text-xs font-bold text-slate-200 hover:text-amber-400 truncate block max-w-[150px]">
                        {selectedOffice.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Protocol & Security Assurance */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Protokol keamanan terdaftar ISPS Code & Visitor Badging terenkripsi.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

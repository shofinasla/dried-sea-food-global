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
    <section id="lokasi" className="py-20 bg-white text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>SENTRA PENGOLAHAN & HUB EKSPOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
            Peta Lokasi Kantor Pusat & Sentra Pengeringan
          </h2>
          <p className="mt-3 text-slate-600 text-base">
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
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>{office.city}</span>
                {office.isHQ && (
                  <span className="bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded font-black">
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
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#009bb3] animate-ping" />
                <span className="font-bold text-slate-900">Live GPS Coordinates:</span>
                <span className="font-mono text-[#009bb3] font-bold">
                  {selectedOffice.coordinates.lat.toFixed(6)}, {selectedOffice.coordinates.lng.toFixed(6)}
                </span>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">{selectedOffice.timeZone}</span>
            </div>

            {/* Simulated Interactive Vector Map Canvas & Embedded OpenStreetMap iframe */}
            <div className="relative flex-1 min-h-[360px] bg-slate-100">
              <iframe
                title={`Map of ${selectedOffice.city}`}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[360px] border-0 opacity-95"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedOffice.coordinates.lng - 0.04}%2C${selectedOffice.coordinates.lat - 0.03}%2C${selectedOffice.coordinates.lng + 0.04}%2C${selectedOffice.coordinates.lat + 0.03}&layer=mapnik&marker=${selectedOffice.coordinates.lat}%2C${selectedOffice.coordinates.lng}`}
              />

              {/* Custom Map Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-lg max-w-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#009bb3] mb-1">
                  <MapPin className="w-4 h-4 text-[#009bb3]" />
                  <span>{selectedOffice.city}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
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
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold px-3.5 py-2 rounded-full text-xs shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Office Specs & Contact Card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold">
                  {selectedOffice.country}
                </span>
                {selectedOffice.isHQ && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Global Headquarters
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-950 mb-2">
                {selectedOffice.city}
              </h3>
              <p className="text-slate-500 text-xs font-mono mb-6">
                Kode Pos: {selectedOffice.postalCode} • Zona Waktu: {selectedOffice.timeZone}
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <MapPin className="w-5 h-5 text-[#009bb3] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Alamat Lengkap Kantor:</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">{selectedOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Clock className="w-5 h-5 text-[#009bb3] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Jam Operasional Layanan:</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{selectedOffice.hours}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <Phone className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-slate-500 block font-semibold">Telepon Kantor:</span>
                      <a href={`tel:${selectedOffice.phone}`} className="text-xs font-bold text-slate-800 hover:text-[#009bb3]">
                        {selectedOffice.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <Mail className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] text-slate-500 block font-semibold">Email Cabang:</span>
                      <a href={`mailto:${selectedOffice.email}`} className="text-xs font-bold text-slate-800 hover:text-[#009bb3] truncate block max-w-[150px]">
                        {selectedOffice.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Protocol & Security Assurance */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protokol keamanan terdaftar ISPS Code & Visitor Badging terenkripsi.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

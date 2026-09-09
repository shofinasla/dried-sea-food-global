import { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  TrendingUp, 
  Building,
  Award,
  Sparkles
} from 'lucide-react';
import { BUYER_TESTIMONIALS } from '../data/initialData';

export default function BuyerTestimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'verified'>('all');

  const globalDestinations = [
    { country: 'Amerika Serikat', flag: '🇺🇸', ports: 'Long Beach & New York', volume: '1.200+ TEUs/Thn' },
    { country: 'Jerman & Eropa', flag: '🇩🇪', ports: 'Hamburg & Rotterdam', volume: '950+ TEUs/Thn' },
    { country: 'Uni Emirat Arab', flag: '🇦🇪', ports: 'Jebel Ali Port (Dubai)', volume: '800+ TEUs/Thn' },
    { country: 'Jepang & Asia Timur', flag: '🇯🇵', ports: 'Yokohama & Tokyo Port', volume: '650+ TEUs/Thn' },
    { country: 'Australia & NZ', flag: '🇦🇺', ports: 'Sydney & Melbourne', volume: '420+ TEUs/Thn' },
    { country: 'Prancis & Swiss', flag: '🇫🇷', ports: 'Le Havre & Marseille', volume: '380+ TEUs/Thn' }
  ];

  return (
    <section id="testimoni" className="py-24 bg-slate-900/40 relative border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kemitraan Global & Kepercayaan Pembeli Dunia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-serif">
            Dipercaya oleh Ratusan Importir, Roastery, & Konglomerasi Industri Global
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Transparansi mutu komoditas, keandalan jadwal pelayaran, serta jaminan perlindungan kontrak dagang internasional dengan kepatuhan Letter of Credit (L/C).
          </p>
        </div>

        {/* Global Export Destination Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {globalDestinations.map((dest, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-colors text-center"
            >
              <span className="text-2xl block mb-1">{dest.flag}</span>
              <h4 className="text-xs font-bold text-white truncate">{dest.country}</h4>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{dest.ports}</p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                {dest.volume}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUYER_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl relative group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800 group-hover:text-amber-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {test.verifiedTransaction && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Importer / Buyer</span>
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{test.comment}"
                </p>

                {/* Commodity & Volume Metric */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Komoditas Dibeli:</span>
                    <span className="text-amber-400 font-bold text-right max-w-[200px] truncate">{test.commodityPurchased}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume Kontrak Rutin:</span>
                    <span className="text-slate-200 font-semibold">{test.volumeAnnually}</span>
                  </div>
                </div>
              </div>

              {/* Buyer Profile Header */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={test.avatarUrl}
                  alt={test.buyerName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{test.buyerName}</h4>
                    <span className="text-base">{test.flag}</span>
                  </div>
                  <p className="text-xs text-amber-400 font-medium">
                    {test.buyerRole}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>{test.companyName} • {test.country}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-14 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Ingin Menjadi Mitra Importir atau Pembeli Resmi Kami?</h4>
              <p className="text-xs text-slate-400">Konsultasikan spesifikasi kargo, sampel uji laboratorium, dan skema pembayaran L/C dengan divisi perdagangan ekspor.</p>
            </div>
          </div>
          <a
            href="#kontak"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs whitespace-nowrap transition-all shadow-lg"
          >
            Hubungi Tim Ekspor
          </a>
        </div>

      </div>
    </section>
  );
}

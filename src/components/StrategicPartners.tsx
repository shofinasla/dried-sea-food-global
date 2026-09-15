import { ArrowRight, Handshake } from 'lucide-react';
import { STRATEGIC_PARTNERS } from '../data/initialData';

interface StrategicPartnersProps {
  onOpenPartners: () => void;
}

export default function StrategicPartners({ onOpenPartners }: StrategicPartnersProps) {
  return (
    <section id="mitra" className="border-b border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#009bb3]">
              <Handshake className="h-4 w-4" />
              Jaringan Kolaborasi
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Mitra Strategis Dried Seafood Global
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Kolaborasi terpercaya untuk memperkuat kualitas produk, distribusi, dan pertumbuhan ekosistem hasil laut Nusantara.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenPartners}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#009bb3] transition-colors hover:text-slate-950"
          >
            Lihat seluruh mitra
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {STRATEGIC_PARTNERS.map((partner) => (
            <article key={partner.id} className="flex items-center gap-5 border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-teal-300 sm:p-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-center text-sm font-black leading-tight text-[#009bb3]">{partner.initials}</span>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#009bb3]">{partner.category}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950">{partner.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{partner.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

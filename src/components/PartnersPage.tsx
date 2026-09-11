import { ArrowLeft, Handshake } from 'lucide-react';
import { STRATEGIC_PARTNERS } from '../data/initialData';

interface PartnersPageProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export default function PartnersPage({ onBackToHome, onOpenContact }: PartnersPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#009bb3]">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009bb3]">Dried Seafood Global</p>
              <h1 className="text-base font-black text-slate-950 sm:text-lg">Mitra Strategis</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-[#009bb3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#009bb3]">Jaringan Kolaborasi</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Mitra yang Bertumbuh Bersama</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Dried Seafood Global membangun jaringan kolaborasi yang saling melengkapi untuk menghadirkan produk hasil laut Indonesia dengan jangkauan dan nilai yang lebih baik.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {STRATEGIC_PARTNERS.map((partner) => (
            <article key={partner.id} className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-center text-lg font-black leading-tight text-[#009bb3]">{partner.initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#009bb3]">{partner.category}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{partner.name}</h3>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">{partner.description}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 border border-teal-200 bg-teal-50 p-6 sm:p-8">
          <h3 className="text-lg font-black text-slate-950">Menjadi mitra berikutnya</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Kami terbuka untuk kolaborasi brand, distribusi, kuliner, logistik, dan pengembangan produk hasil laut.
          </p>
          <button
            type="button"
            onClick={onOpenContact}
            className="mt-5 rounded-full bg-[#009bb3] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-950"
          >
            Hubungi tim kemitraan
          </button>
        </section>
      </main>
    </div>
  );
}

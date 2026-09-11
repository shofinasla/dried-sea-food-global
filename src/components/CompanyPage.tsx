import { ArrowLeft, Building2, Mail, MapPin, Phone } from 'lucide-react';

interface CompanyPageProps {
  onBackToHome: () => void;
}

export default function CompanyPage({ onBackToHome }: CompanyPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#009bb3]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009bb3]">Corporate Profile</p>
              <h1 className="text-base font-black text-slate-950 sm:text-lg">PT Samdura Bara Persada Indonesia</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-[#009bb3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#009bb3]">Informasi Perusahaan</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            PT Samdura Bara Persada Indonesia
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Halaman resmi informasi perusahaan dan identitas korporat Dried Seafood Global untuk kebutuhan mitra,
            pembeli internasional, dan korespondensi bisnis.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-slate-200 bg-white p-5 shadow-sm">
            <MapPin className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">Kantor Pusat</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Jakarta, Indonesia</p>
          </div>
          <div className="border border-slate-200 bg-white p-5 shadow-sm">
            <Phone className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">Hotline</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">+62 889-8558-2838</p>
          </div>
          <div className="border border-slate-200 bg-white p-5 shadow-sm">
            <Mail className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">Email</h3>
            <p className="mt-2 break-words text-sm leading-6 text-slate-600">info@driedseafoodglobal.com</p>
          </div>
        </section>

        <section className="mt-10 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-bold text-slate-950">Identitas Legal</h3>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-500">Nama badan usaha</dt>
              <dd className="mt-1 text-slate-800">PT Samdura Bara Persada Indonesia</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Nama website</dt>
              <dd className="mt-1 text-slate-800">Dried Seafood Global</dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}

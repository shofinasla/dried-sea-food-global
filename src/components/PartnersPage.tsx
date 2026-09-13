import { ArrowLeft, Handshake } from 'lucide-react';
import { STRATEGIC_PARTNERS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface PartnersPageProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export default function PartnersPage({ onBackToHome, onOpenContact }: PartnersPageProps) {
  const { currentLang, dir } = useTranslation();

  const isAr = currentLang === 'ar';
  const isId = currentLang === 'id';

  const content = {
    badge: isAr ? 'شبكة الشراكات الاستراتيجية' : isId ? 'Jaringan Kolaborasi' : 'Strategic Network',
    title: isAr 
      ? 'شركاء النمو واللوجستيات' 
      : isId 
        ? 'Mitra yang Bertumbuh Bersama' 
        : 'Strategic Export & Industry Partners',
    desc: isAr
      ? 'تبني مؤسسة Dried Seafood Global شبكة تحالفات تكاملية رائدة لتقديم أرقى المنتجات البحرية الإندونيسية المجففة بأعلى معايير الجودة العالمية وسلاسل التوريد الموثوقة.'
      : isId
        ? 'Dried Seafood Global membangun jaringan kolaborasi yang saling melengkapi untuk menghadirkan produk hasil laut Indonesia dengan jangkauan dan nilai yang lebih baik.'
        : 'Dried Seafood Global builds comprehensive collaborative networks to supply authentic Indonesian premium dried seafood commodities with high reliability, strict quarantine compliance, and optimal value.',
    backBtn: isAr ? 'العودة إلى الرئيسية' : isId ? 'Kembali ke Beranda' : 'Back to Home',
    connectTitle: isAr ? 'هل ترغب في الانضمام لشبكة شركائنا؟' : isId ? 'Ingin Menjadi Mitra Strategis Kami?' : 'Explore Strategic Collaboration',
    connectDesc: isAr
      ? 'نرحب بالمستوردين، الشركات اللوجستية، والموزعين في دول الخليج وكافة أنحاء العالم لبناء علاقات توريد مستدامة.'
      : isId
        ? 'Kami terbuka untuk kolaborasi pasokan, perikanan berkelanjutan, dan distribusi ekspor hasil laut Indonesia.'
        : 'We welcome qualified importers, logistics partners, and international wholesale distributors worldwide.',
    connectBtn: isAr ? 'تواصل مع قسم العلاقات التجارية' : isId ? 'Hubungi Tim Kemitraan' : 'Contact Partnership Desk'
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 ${dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={dir}>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#009bb3]">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009bb3]">Dried Seafood Global</p>
              <h1 className="text-base font-black text-slate-950 sm:text-lg">
                {isAr ? 'الشركاء الاستراتيجيون' : isId ? 'Mitra Strategis' : 'Strategic Partners'}
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-[#009bb3] cursor-pointer shadow-2xs"
          >
            <ArrowLeft className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            <span>{content.backBtn}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#009bb3]">{content.badge}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            {content.desc}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {STRATEGIC_PARTNERS.map((partner) => (
            <article key={partner.id} className="border border-slate-200 bg-white p-6 shadow-2xs sm:p-8 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  {partner.logoUrl ? (
                    <img 
                      src={partner.logoUrl} 
                      alt={`${partner.name} logo`} 
                      className="h-full w-full object-contain" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-center text-lg font-black leading-tight text-[#009bb3]">{partner.initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#009bb3]">
                    {isAr ? partner.categoryAr || partner.category : isId ? partner.category : partner.categoryEn || partner.category}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{partner.name}</h3>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {isAr ? partner.descriptionAr || partner.description : isId ? partner.description : partner.descriptionEn || partner.description}
              </p>
            </article>
          ))}
        </div>

        {/* Partnership Contact Callout */}
        <div className="mt-12 rounded-2xl border border-teal-200 bg-teal-50/70 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900">{content.connectTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">{content.connectDesc}</p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            {content.connectBtn}
          </button>
        </div>
      </main>
    </div>
  );
}

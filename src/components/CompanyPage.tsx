import { ArrowLeft, Building2, Mail, MapPin, Phone, FileCheck2, Award } from 'lucide-react';
import { OFFICIAL_COMPLIANCE_DOCUMENTS } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';

interface CompanyPageProps {
  onBackToHome: () => void;
}

export default function CompanyPage({ onBackToHome }: CompanyPageProps) {
  const { currentLang, dir } = useTranslation();

  const isAr = currentLang === 'ar';
  const isId = currentLang === 'id';

  const content = {
    badge: isAr ? 'الملف التعريفي للشركة' : isId ? 'Informasi Perusahaan' : 'Corporate Profile',
    title: isAr 
      ? 'شركة PT Samdura Bara Persada Indonesia' 
      : isId 
        ? 'PT Samdura Bara Persada Indonesia' 
        : 'PT Samdura Bara Persada Indonesia',
    desc: isAr
      ? 'الصفحة الرسمية لبيانات الشركة والهوية القانونية لمؤسسة Dried Seafood Global للتواصل مع الشركاء والمشترين الدوليين والمراسلات التجارية الرسمية.'
      : isId
        ? 'Halaman resmi informasi perusahaan dan identitas korporat Dried Seafood Global untuk kebutuhan mitra, pembeli internasional, dan korespondensi bisnis.'
        : 'Official corporate profile and legal identity page of Dried Seafood Global for global trade partners, international buyers, and official business correspondence.',
    backBtn: isAr ? 'العودة إلى الرئيسية' : isId ? 'Kembali ke Beranda' : 'Back to Home',
    hqTitle: isAr ? 'المقر الرئيسي' : isId ? 'Kantor Pusat' : 'Headquarters',
    hqValue: isAr ? 'جاكرتا، إندونيسيا' : isId ? 'Jakarta, Indonesia' : 'Jakarta, Indonesia',
    hotlineTitle: isAr ? 'الخط الساخن 24/7' : isId ? 'Hotline Ekspor' : 'Trade Desk Hotline',
    emailTitle: isAr ? 'البريد الرسمي' : isId ? 'Email Resmi' : 'Official Email',
    legalTitle: isAr ? 'الهوية القانونية والتراخيص الرسمية' : isId ? 'Identitas Legal' : 'Legal & Corporate Identity',
    legalEntityLabel: isAr ? 'اسم الكيان التجاري القانوني' : isId ? 'Nama badan usaha' : 'Registered Business Entity',
    brandNameLabel: isAr ? 'العلامة التجارية والمنصة' : isId ? 'Nama website & Brand' : 'Trade Brand & Platform',
    nibLabel: isAr ? 'رقم السجل التجاري الوطني (NIB)' : isId ? 'Nomor Induk Berusaha (NIB)' : 'Business Identification Number (NIB)',
    pirtLabel: isAr ? 'رقم تصريح تداول الأغذية (P-IRT)' : isId ? 'Nomor P-IRT' : 'Food Production & Distribution Permit (P-IRT)',
    nibBoxTitle: isAr ? 'سجل NIB المعتمد' : isId ? 'Dokumen NIB Resmi' : 'Official NIB License',
    nibBoxDesc: isAr ? 'رقم الهوية القانونية المعتمد الصادر من وزارة الاستثمار وجمهورية إندونيسيا.' : isId ? 'Nomor identitas legal usaha resmi dari Kementerian Investasi / BKPM RI.' : 'Official business identification number issued by the Ministry of Investment / BKPM Indonesia.',
    pirtBoxTitle: isAr ? 'ترخيص P-IRT لسلامة الأغذية' : isId ? 'Dokumen P-IRT Pangan' : 'P-IRT Food Safety License',
    pirtBoxDesc: isAr ? 'رقم ترخيص سلامة وتداول المنتجات الغذائية والمصائد البحرية المجففة وفق اللوائح الإندونيسية.' : isId ? 'Nomor izin edar pangan resmi yang tercantum pada dokumen perizinan mutu perusahaan.' : 'Official food distribution & safety permit for commercial dried seafood commodities.'
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 ${dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={dir}>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#009bb3]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009bb3]">{content.badge}</p>
              <h1 className="text-base font-black text-slate-950 sm:text-lg">PT Samdura Bara Persada Indonesia</h1>
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

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#009bb3]">{content.badge}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            {content.desc}
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-slate-200 bg-white p-5 shadow-2xs rounded-xl">
            <MapPin className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">{content.hqTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{content.hqValue}</p>
          </div>
          <div className="border border-slate-200 bg-white p-5 shadow-2xs rounded-xl">
            <Phone className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">{content.hotlineTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 font-mono">+62 889-8558-2838</p>
          </div>
          <div className="border border-slate-200 bg-white p-5 shadow-2xs rounded-xl">
            <Mail className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">{content.emailTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 font-mono">kontak@driedseafoodglobal.com</p>
          </div>
        </section>

        <section className="mt-10 border border-slate-200 bg-white p-6 shadow-2xs sm:p-8 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-950">{content.legalTitle}</h3>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-500">{content.legalEntityLabel}</dt>
              <dd className="mt-1 text-slate-800 font-medium">PT Samdura Bara Persada Indonesia</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">{content.brandNameLabel}</dt>
              <dd className="mt-1 text-slate-800 font-medium">Dried Seafood Global</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">{content.nibLabel}</dt>
              <dd className="mt-1 font-mono font-bold text-[#009bb3]">{OFFICIAL_COMPLIANCE_DOCUMENTS.nib}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">{content.pirtLabel}</dt>
              <dd className="mt-1 font-mono font-bold text-[#009bb3]">{OFFICIAL_COMPLIANCE_DOCUMENTS.pirt}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-teal-200 bg-teal-50/70 p-5 shadow-2xs rounded-xl">
            <FileCheck2 className="h-5 w-5 text-[#009bb3]" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">{content.nibBoxTitle}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600">{content.nibBoxDesc}</p>
          </div>
          <div className="border border-amber-200 bg-amber-50/70 p-5 shadow-2xs rounded-xl">
            <Award className="h-5 w-5 text-amber-600" />
            <h3 className="mt-4 text-sm font-bold text-slate-950">{content.pirtBoxTitle}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600">{content.pirtBoxDesc}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

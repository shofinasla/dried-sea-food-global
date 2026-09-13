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
import { COMPANY_PROFILE, SERVICES_LIST, LEADERSHIP_TEAM, CERTIFICATIONS, OFFICIAL_COMPLIANCE_DOCUMENTS } from '../data/initialData';
import { ServiceItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { getLocalizedServiceItem, getLocalizedLeader } from '../utils/localizedData';

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

  const getAboutTexts = () => {
    switch (currentLang) {
      case 'ar':
        return {
          corpBadge: 'نبذة عن الشركة ومؤسستها',
          corpTitle: 'Dried Seafood Global — تشغلها شركة PT Samdura Bara Persada',
          corpDesc: 'منصة وشركة إندونيسية رائدة في تصدير المنتجات البحرية المجففة، متخصصة في تزويد المستوردين الدوليين وتجار الجملة وسلاسل المطاعم العالمية بمنتجات معيارية خالية من المواد الكيميائية ومطابقة لاشتراطات الحجر الصحي.',
          facts: [
            {
              badge: 'الحقيقة 1 • توريد ساحلي مباشر',
              title: 'شراكة مع أكثر من 1,200 صياد',
              desc: 'توريد مباشر من مراكز الصيد الساحلية في جاوة وسومطرة وسولاويزي بأساليب صيد حرفية انتقائية ومستدامة.'
            },
            {
              badge: 'الحقيقة 2 • جودة ونظافة فائقة',
              title: 'خالٍ 100% من الفورمالين والمواد الحافظة',
              desc: 'تجفيف طبيعي تحت أشعة الشمس وفي قباب الطاقة الشمسية المعزولة مع ضبط نسبة الرطوبة ≤ 12-18% بملح بحري نقي.'
            },
            {
              badge: 'الحقيقة 3 • تراخيص رسمية كاملة',
              title: 'سجل تجاري NIB وشهادة حجر BKIPM',
              desc: 'ترخيص رسمي NIB 1408230135849 مع شهادات صحية بيطرية رسمية من وزارة الشؤون البحرية والمصايد لكل شحنة.'
            }
          ],
          operatingEntity: 'الكيان التجاري الرسمي المشغل: PT Samdura Bara Persada',
          learnMoreBtn: 'الاطلاع على الملف المؤسسي والتراخيص',
          pillars: {
            reliable: {
              badge: 'ضمان الامتثال القانوني',
              title: 'شريك موثوق',
              desc: 'شركة تصدير مرخصة رسمياً ومسجلة لدى وزارة المصايد الإندونيسية مع شهادات الحجر الصحي، وشهادة الحلال BPJPH، ومعايير HACCP الفئة A.',
              sub: 'وثائق تجارية كاملة وشهادات تحليل COA'
            },
            competitive: {
              badge: 'أسعار المصدر الأول',
              title: 'أسعار تنافسية',
              desc: 'توريد مباشر من موانئ الإنزال دون وسطاء متعددين، مما يمنح المستوردين أعلى هوامش ربحية واستقراراً سعرياً طويل الأمد.',
              sub: 'توريد مباشر وتجارة عادلة'
            },
            efficient: {
              badge: 'شحن لوجستي سريع',
              title: 'كفاءة وسرعة',
              desc: 'إدارة سلاسل الإمداد والشحن عبر الحاويات البحرية (FCL/LCL) والشحن الجوي السريع مع أنظمة عزل الرطوبة وحماية البضائع.',
              sub: 'شحن جوي وبحري وتغطية عالمية'
            }
          },
          tabs: {
            services: 'الخدمات والعمليات',
            profile: 'الملف المؤسسي',
            leadership: 'فريق القيادة',
            certifications: 'الشهادات والامتثال'
          },
          learnSpecs: 'مواصفات الخدمة',
          requestQuote: 'طلب عرض أسعار',
          story: {
            badge: 'منذ عام 2012 • 14 عاماً من الخبرة البحرية الإندونيسية',
            title: 'نقل جودة المأكولات البحرية الإندونيسية المجففة إلى العالم',
            p1: 'تأسست الشركة عام 2012 في منطقة ميناء الصيد البحري بجاكرتا، انطلاقاً من الشغف بالثروة البحرية الإندونيسية ودعم مجتمعات الصيادين المحليين.',
            p2: 'واليوم، نشغل مرافق تجفيف شمسية متطورة (Solar Dome Dryers) ومستودعات مضبوطة الرطوبة في بيلاوان وموارا بارو وسورابايا، مع شبكة تصدير تمتد لأكثر من 28 دولة في آسيا والشرق الأوسط وأمريكا.',
            locTag: 'مراكز التجفيف والتصدير:',
            locValue: 'ميناء موارا بارو ومحطة بيلاوان'
          },
          visionMission: {
            visionTitle: 'رؤية الشركة',
            visionDesc: 'أن نكون المصدر الرائد للمنتجات البحرية والأسماك المجففة في جنوب شرق آسيا، المعترف به عالمياً بنقاء المنتجات ومعايير السلامة HACCP وسلاسل الإمداد العادلة والمستدامة.',
            missionTitle: 'رسالتنا الاستراتيجية',
            m1: 'ضمان خلو الأسماك المجففة 100% من الفورمالين والبورق والمواد الكيميائية الضارة.',
            m2: 'استخدام تقنيات التجفيف الصديقة للبيئة في قباب الطاقة الشمسية للحفاظ على القيمة الغذائية والنظافة التامة.',
            m3: 'تعزيز الشراكات المباشرة مع الصيادين لترسيخ مبادئ التجارة العادلة والاستدامة البحرية.'
          },
          compliance: {
            nibTitle: 'رقم السجل التجاري الموحد (NIB)',
            nibSub: 'وثيقة الهوية القانونية والتجارية الرسمية',
            pirtTitle: 'ترخيص تداول الأغذية (P-IRT)',
            pirtSub: 'رقم الترخيص الصحي لإنتاج وتداول الأغذية',
            hsTitle: 'التصنيف الجمركي وبنود HS Code للتصدير',
            hsSub: 'دليل التصنيف الجمركي للمنتجات البحرية المجففة للأسواق الدولية المستهدفة.',
            colCountry: 'الدولة / الإقليم',
            colCode: 'رمز HS Code',
            colDesc: 'الوصف والبيان الجمركي',
            certIssuer: 'الجهة المصدرة:'
          },
          modal: {
            featuresTitle: 'المزايا والمواصفات الفنية:',
            closeBtn: 'إغلاق',
            requestBtn: 'طلب عرض أسعار لهذه الخدمة'
          }
        };
      case 'id':
        return {
          corpBadge: 'PROFIL PERUSAHAAN',
          corpTitle: 'Dried Seafood Global — Dioperasikan oleh PT Samdura Bara Persada',
          corpDesc: 'Platform dan perusahaan ekspor hasil laut kering asal Indonesia yang berfokus melayani importir internasional, distributor grosir, dan industri pengolahan pangan melalui rantai pasok terstandarisasi, kadar air terkontrol, serta kepatuhan karantina resmi.',
          facts: [
            {
              badge: 'FAKTA 1 • SOURCING PESISIR',
              title: 'Kemitraan 1.200+ Nelayan',
              desc: 'Pasokan langsung dari sentra nelayan pesisir Pantura Jawa, Sumatra, dan Sulawesi dengan metode tangkap selektif.'
            },
            {
              badge: 'FAKTA 2 • MUTU & HIGIENITAS',
              title: '100% Bebas Bahan Kimia',
              desc: 'Pengeringan surya alami dan kubah tertutup dengan kadar air terstandarisasi ≤ 12-18% dan garam laut murni.'
            },
            {
              badge: 'FAKTA 3 • LEGALITAS RESMI',
              title: 'NIB & Karantina BKIPM',
              desc: 'Terdaftar resmi NIB 1408230135849 dengan Health Certificate resmi dari BKIPM KKP untuk setiap pengiriman.'
            }
          ],
          operatingEntity: 'Badan Hukum Resmi: PT Samdura Bara Persada',
          learnMoreBtn: 'Pelajari Profil Lengkap & Legalitas',
          pillars: {
            reliable: {
              badge: 'JAMINAN LEGALITAS',
              title: 'TERPERCAYA',
              desc: 'Mitra dagang resmi berizin ekspor terdaftar di KKP RI dengan sertifikasi kesehatan karantina, sertifikat halal BPJPH, serta standar Hazard Analysis Critical Control Point (HACCP Grade A).',
              sub: 'Full Trade Documentation & COA'
            },
            competitive: {
              badge: 'HARGA SENTRA PERTAMA',
              title: 'KOMPETITIF',
              desc: 'Pasokan langsung dari sentra nelayan pesisir Jawa, Sumatra, dan Kalimantan tanpa mata rantai tengkulak berlebih, memberikan margin terbaik dan stabilitas harga jangka panjang bagi importir.',
              sub: 'Direct Sourcing & Fair Trade'
            },
            efficient: {
              badge: 'DISTRIBUSI CEPAT',
              title: 'EFISIEN',
              desc: 'Manajemen logistik multimoda via kapal laut (FCL/LCL) dan kargo udara ekspres dari pelabuhan utama Indonesia, didukung sistem monitoring kelembaban kontainer hingga ke dermaga tujuan.',
              sub: 'Ocean & Air Freight Global Logistics'
            }
          },
          tabs: {
            services: 'Layanan & Operasional',
            profile: 'Profil Perusahaan',
            leadership: 'Tim Manajemen',
            certifications: 'Sertifikasi & Legalitas'
          },
          learnSpecs: 'Pelajari Spesifikasi',
          requestQuote: 'Minta Penawaran',
          story: {
            badge: 'Sejak 2012 • 14 Tahun Dedikasi Maritim Nusantara',
            title: 'Membawa Cita Rasa & Standar Ikan Kering Nusantara ke Seluruh Dunia',
            p1: 'Didirikan pada tahun 2012 di kawasan Pelabuhan Perikanan Samudera Jakarta, PT Samdura Bara Persada berakar dari kecintaan terhadap keanekaragaman bahari Nusantara dan kepedulian terhadap kesejahteraan nelayan tradisional.',
            p2: 'Kini, kami mengoperasikan sentra pengeringan modern bertenaga surya (Solar Dome Dryer) dan gudang penyimpanan berkelembaban rendah di Belawan, Muara Baru, dan Surabaya, serta jaringan distribusi ekspor ke 28 negara di Asia, Timur Tengah, dan Amerika.',
            locTag: 'Sentra Penjemuran & Ekspor:',
            locValue: 'Muara Baru & Belawan Terminal'
          },
          visionMission: {
            visionTitle: 'Visi Perusahaan',
            visionDesc: 'Menjadi eksportir produk ikan olahan dan hasil laut kering terdepan di Asia Tenggara yang diakui dunia atas kemurnian produk, kebersihan higienis standar HACCP, dan integritas rantai pasok maritim yang adil.',
            missionTitle: 'Misi Strategis',
            m1: 'Menjamin 100% ikan kering bebas bahan pengawet kimia berbahaya (nol formalin & boraks).',
            m2: 'Menerapkan teknologi pengeringan ramah lingkungan Solar Dome Dryer untuk menjaga nutrisi dan higienitas optimal.',
            m3: 'Memperkuat kemitraan langsung dengan kelompok nelayan pesisir demi perdagangan yang berkelanjutan dan adil.'
          },
          compliance: {
            nibTitle: 'Nomor Induk Berusaha (NIB)',
            nibSub: 'Dokumen identitas legal usaha',
            pirtTitle: 'P-IRT',
            pirtSub: 'Nomor izin edar pangan',
            hsTitle: 'Legalitas & Spesifikasi HS Code Ekspor',
            hsSub: 'Referensi klasifikasi komoditas hasil laut kering untuk pasar tujuan.',
            colCountry: 'Negara',
            colCode: 'HS Code',
            colDesc: 'Deskripsi',
            certIssuer: 'Lembaga:'
          },
          modal: {
            featuresTitle: 'Fitur & Keunggulan Khusus:',
            closeBtn: 'Tutup',
            requestBtn: 'Minta Penawaran Spesifikasi Ini'
          }
        };
      default:
        return {
          corpBadge: 'CORPORATE INTRODUCTION',
          corpTitle: 'Dried Seafood Global — Operated by PT Samdura Bara Persada',
          corpDesc: 'A premier Indonesian dried seafood export platform operated by PT Samdura Bara Persada, supplying international importers, wholesalers, and food processors with standardized quality, controlled moisture, and official quarantine clearances.',
          facts: [
            {
              badge: 'FACT 1 • COASTAL SOURCING',
              title: '1,200+ Partner Fishermen',
              desc: 'Direct coastal sourcing across Java, Sumatra, and Sulawesi with selective artisanal fishing practices.'
            },
            {
              badge: 'FACT 2 • QUALITY & HYGIENE',
              title: '100% Zero Formalin / Additives',
              desc: 'Natural sun-drying & enclosed solar domes with moisture controlled ≤ 12-18% using pure sea salt.'
            },
            {
              badge: 'FACT 3 • OFFICIAL COMPLIANCE',
              title: 'NIB & Quarantine Certified',
              desc: 'Registered NIB 1408230135849 with official Health Certificates issued by BKIPM Marine Fisheries.'
            }
          ],
          operatingEntity: 'Official Operating Entity: PT Samdura Bara Persada',
          learnMoreBtn: 'Learn More About Corporate Profile',
          pillars: {
            reliable: {
              badge: 'LEGALITY ASSURANCE',
              title: 'RELIABLE',
              desc: 'Fully licensed Indonesian fishery export partner with official BKIPM Health Certificates, Halal certification, and HACCP Grade A compliance.',
              sub: 'Full Trade Documentation & COA'
            },
            competitive: {
              badge: 'FIRST-HAND PRICING',
              title: 'COMPETITIVE',
              desc: 'Direct procurement from coastal landing sites across Indonesia without intermediary markups, securing maximum margins and long-term price stability.',
              sub: 'Direct Sourcing & Fair Trade'
            },
            efficient: {
              badge: 'EXPEDITED LOGISTICS',
              title: 'EFFICIENT',
              desc: 'Multimodal logistics management via ocean freight (FCL/LCL) and priority air cargo with active container humidity control and global tracking.',
              sub: 'Ocean & Air Freight Global Logistics'
            }
          },
          tabs: {
            services: 'Services & Operations',
            profile: 'Corporate Profile',
            leadership: 'Executive Team',
            certifications: 'Accreditation & Compliance'
          },
          learnSpecs: 'View Specifications',
          requestQuote: 'Request Quote',
          story: {
            badge: 'Since 2012 • 14 Years of Maritime Heritage',
            title: 'Bringing Indonesian Marine Excellence to the Global Table',
            p1: 'Established in 2012 at the Jakarta Oceanic Fishery Port, PT Samdura Bara Persada was founded on a passion for Indonesia\'s rich maritime resources and a dedication to coastal fishing communities.',
            p2: 'Today, we operate state-of-the-art Solar Dome Drying facilities and dehumidified storage warehouses in Belawan, Muara Baru, and Surabaya, serving buyers in over 28 countries across Asia, the Middle East, and the Americas.',
            locTag: 'Drying & Export Hubs:',
            locValue: 'Muara Baru & Belawan Marine Terminals'
          },
          visionMission: {
            visionTitle: 'Corporate Vision',
            visionDesc: 'To be Southeast Asia\'s leading exporter of premium dried seafood products, recognized globally for non-chemical purity, HACCP Grade A safety, and ethical maritime supply chains.',
            missionTitle: 'Strategic Mission',
            m1: 'Guaranteeing 100% dried seafood products free from harmful chemicals, formalin, or bleaching agents.',
            m2: 'Employing sustainable solar dome drying technologies to optimize hygiene, nutritional value, and shelf stability.',
            m3: 'Empowering coastal artisanal fishing groups through direct fair-trade partnerships and sustainable harvesting.'
          },
          compliance: {
            nibTitle: 'Business Identification Number (NIB)',
            nibSub: 'Official Corporate Registration Document',
            pirtTitle: 'P-IRT Food Registration',
            pirtSub: 'Food Safety Circulation Permit',
            hsTitle: 'Export HS Code Classifications & Regulatory Standards',
            hsSub: 'Reference tariff codes and official commodity classifications for global destination markets.',
            colCountry: 'Country / Market',
            colCode: 'HS Code',
            colDesc: 'Commodity Description',
            certIssuer: 'Issuing Body:'
          },
          modal: {
            featuresTitle: 'Key Features & Capabilities:',
            closeBtn: 'Close',
            requestBtn: 'Request Quote for This Specification'
          }
        };
    }
  };

  const texts = getAboutTexts();
  const localizedServices = SERVICES_LIST.map(s => getLocalizedServiceItem(s, currentLang));
  const localizedLeaders = LEADERSHIP_TEAM.map(l => getLocalizedLeader(l, currentLang));

  return (
    <section id="tentang" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHORT COMPANY INTRODUCTION (Dried Seafood Global & PT Samdura Bara Persada) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 mb-14 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>{texts.corpBadge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {texts.corpTitle}
            </h2>
            
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {texts.corpDesc}
            </p>
          </div>

          {/* 3 Key Verified Facts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-100">
            {texts.facts.map((fact, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-bold text-[#009bb3] uppercase tracking-wider mb-1">
                  {fact.badge}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {fact.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Learn More Action Button */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              {texts.operatingEntity}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveTab('profile');
                const tabsElement = document.getElementById('about-tabs-container');
                if (tabsElement) {
                  tabsElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009bb3] hover:text-[#008399] transition-colors cursor-pointer"
            >
              <span>{texts.learnMoreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 CORE PILLARS: TERPERCAYA, KOMPETITIF, EFISIEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Reliable */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                {texts.pillars.reliable.badge}
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                {texts.pillars.reliable.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {texts.pillars.reliable.desc}
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{texts.pillars.reliable.sub}</span>
            </div>
          </div>

          {/* Card 2: Competitive */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                {texts.pillars.competitive.badge}
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                {texts.pillars.competitive.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {texts.pillars.competitive.desc}
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{texts.pillars.competitive.sub}</span>
            </div>
          </div>

          {/* Card 3: Efficient */}
          <div className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef7f6] text-[#519992] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Ship className="w-6 h-6" />
              </div>
              <div className="inline-block text-[11px] font-extrabold text-[#009bb3] uppercase tracking-widest mb-1">
                {texts.pillars.efficient.badge}
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase mb-2.5">
                {texts.pillars.efficient.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {texts.pillars.efficient.desc}
              </p>
            </div>
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#519992]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{texts.pillars.efficient.sub}</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div id="about-tabs-container" className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex-wrap gap-1 justify-center max-w-full">
            <button
              onClick={() => setActiveTab('services')}
              id="tab-btn-services"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {texts.tabs.services}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              id="tab-btn-profile"
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#009bb3] to-[#519992] text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {texts.tabs.profile}
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
              {texts.tabs.leadership}
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
              {texts.tabs.certifications}
            </button>
          </div>
        </div>

        {/* TAB 1: SERVICES GRID */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {localizedServices.map((service) => {
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
                        <span>{texts.learnSpecs}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        id={`btn-quote-${service.id}`}
                        className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#009bb3] hover:text-white text-slate-700 transition-all cursor-pointer"
                      >
                        {texts.requestQuote}
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
            <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[#009bb3] font-bold tracking-widest text-xs uppercase">
                    {texts.story.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {texts.story.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {texts.story.p1}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {texts.story.p2}
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
                      <span className="font-bold text-teal-300">{texts.story.locTag}</span> {texts.story.locValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{texts.visionMission.visionTitle}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {texts.visionMission.visionDesc}
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#009bb3] flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{texts.visionMission.missionTitle}</h4>
                <ul className="text-slate-600 space-y-2.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>{texts.visionMission.m1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>{texts.visionMission.m2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#009bb3] mt-0.5 shrink-0" />
                    <span>{texts.visionMission.m3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEADERSHIP */}
        {activeTab === 'leadership' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {localizedLeaders.map((leader) => (
              <div
                key={leader.id}
                id={`leader-card-${leader.id}`}
                className="bg-white border border-slate-200 hover:border-[#009bb3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md p-5 flex flex-col items-center text-center group transition-all"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-teal-200 group-hover:border-[#009bb3] group-hover:scale-105 transition-all shadow-md">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-base font-black text-slate-900 group-hover:text-[#009bb3] transition-colors">
                  {leader.name}
                </h4>
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

        {/* TAB 4: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{texts.compliance.nibTitle}</h3>
                    <p className="text-[11px] text-slate-400">{texts.compliance.nibSub}</p>
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
                    <h3 className="text-sm font-black text-white">{texts.compliance.pirtTitle}</h3>
                    <p className="text-[11px] text-slate-400">{texts.compliance.pirtSub}</p>
                  </div>
                </div>
                <p className="text-2xl font-black tracking-[0.12em] text-amber-300 font-mono">{OFFICIAL_COMPLIANCE_DOCUMENTS.pirt}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-black text-slate-950">{texts.compliance.hsTitle}</h3>
                <p className="mt-1 text-xs text-slate-500">{texts.compliance.hsSub}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-5 py-3 font-bold">{texts.compliance.colCountry}</th>
                      <th className="px-5 py-3 font-bold">{texts.compliance.colCode}</th>
                      <th className="px-5 py-3 font-bold">{texts.compliance.colDesc}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OFFICIAL_COMPLIANCE_DOCUMENTS.hsCodes.map((item) => (
                      <tr key={item.country} className="border-b border-slate-100 last:border-0">
                        <td className="px-5 py-3 font-bold text-slate-800">{item.flag} {item.country}</td>
                        <td className="px-5 py-3 font-mono font-bold text-[#009bb3]">{item.code}</td>
                        <td className="px-5 py-3 text-slate-600">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
                    <p className="text-xs font-bold text-[#519992] mb-2">{texts.compliance.certIssuer} {cert.issuer}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SERVICE DETAIL MODAL */}
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
              {texts.modal.featuresTitle}
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
                {texts.modal.closeBtn}
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(title);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-sm shadow-md hover:opacity-95 cursor-pointer"
              >
                {texts.modal.requestBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

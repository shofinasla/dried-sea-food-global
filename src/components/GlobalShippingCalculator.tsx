import { useState } from 'react';
import { 
  Plane, 
  Ship, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  ArrowRight
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface GlobalShippingCalculatorProps {
  onBookInquiry?: (bookingDetails: {
    origin: string;
    destination: string;
    weight: number;
    courierName: string;
    estimatedPriceUSD: number;
  }) => void;
}

function CourierLogo({ logoUrl, brand, name }: { logoUrl?: string; brand: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  const isFedEx = brand.toLowerCase().includes('fedex') || (logoUrl ? logoUrl.toLowerCase().includes('fedex') : false);

  if (!imgError && logoUrl) {
    return (
      <div className="h-10 sm:h-12 flex items-center justify-start">
        <img
          src={logoUrl}
          alt={name}
          onError={() => setImgError(true)}
          className={`h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-[150px] object-contain ${
            isFedEx ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]' : ''
          }`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 ${
      isFedEx ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : ''
    }`}>
      {brand}
    </div>
  );
}

export default function GlobalShippingCalculator({ onBookInquiry }: GlobalShippingCalculatorProps) {
  const { currentLang } = useTranslation();
  const [selectedCourier, setSelectedCourier] = useState<string>('dhl');

  const isIndonesian = currentLang === 'id';
  const isArabic = currentLang === 'ar';

  // Courier Partners Configuration
  // TIP: Masukkan file logo asli Anda ke folder public (misal: /images/logos/dhl.svg / /images/logos/fedex.png)
  const courierPartners = [
    {
      id: 'dhl',
      name: 'DHL Express Worldwide',
      brand: 'DHL',
      serviceType: isIndonesian ? 'Kargo Udara Kilat Prioritas (Air Express)' : isArabic ? 'شحن جوي سريع دولي' : 'Priority Global Air Express',
      transitTime: isIndonesian ? '2 – 4 Hari Kerja' : isArabic ? '2 - 4 أيام عمل' : '2 – 4 Business Days',
      reach: isIndonesian ? '220+ Negara & Teritori Global' : isArabic ? '+220 دولة ومنطقة' : '220+ Countries & Territories',
      logoUrl: '/images/logos/dhl.svg',
      accentColor: 'border-amber-300 hover:border-amber-500 bg-amber-500/5',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      tagline: isIndonesian ? 'Pengiriman ekspres global tercepat dengan pemantauan suhu & kelembaban' : 'Fastest global express dispatch with temperature & humidity monitoring',
      features: [
        isIndonesian ? 'Live GPS & Satelit Flight Tracking Real-Time' : 'Live Real-Time Satellite Flight Tracking',
        isIndonesian ? 'On-Demand Delivery (ODD) & Signature on Delivery' : 'On-Demand Delivery (ODD) & Signature Release',
        isIndonesian ? 'Kepatuhan Karantina Ikan Internasional Cepat' : 'Expedited Quarantine & Customs Clearance',
        isIndonesian ? 'Kemasan Khusus Insulasi Termal & Desiccant Food-Grade' : 'Specialized Thermal Insulation & Food-Grade Desiccant'
      ]
    },
    {
      id: 'fedex',
      name: 'FedEx International Priority',
      brand: 'FedEx',
      serviceType: isIndonesian ? 'Pengiriman Cepat Internasional (Priority Freight)' : isArabic ? 'شحن دولي ذو أولوية فائقة' : 'International Priority Freight',
      transitTime: isIndonesian ? '2 – 5 Hari Kerja' : isArabic ? '2 - 5 أيام عمل' : '2 – 5 Business Days',
      reach: isIndonesian ? '140+ Destinasi Utama Dunia' : isArabic ? '+140 وجهة عالمية' : '140+ Global Destinations',
      logoUrl: '/images/logos/fedex.png',
      accentColor: 'border-purple-300 hover:border-purple-500 bg-purple-500/5',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      tagline: isIndonesian ? 'Solusi logistik hasil laut bernilai tinggi dengan pengawasan IoT SenseAware' : 'High-value marine cargo logistics with SenseAware IoT surveillance',
      features: [
        isIndonesian ? 'SenseAware IoT Multi-Sensor Monitoring (Suhu/Kelembaban)' : 'SenseAware IoT Multi-Sensor Environmental Monitoring',
        isIndonesian ? 'Customs Pre-Clearance & Jalur Prioritas Ekspor' : 'Customs Pre-Clearance & Export Priority Lane',
        isIndonesian ? 'Penanganan Kargo Bernilai Tinggi (Fish Maw & Ebi Super)' : 'Dedicated High-Value Marine Cargo Handling',
        isIndonesian ? 'Jaminan Ketepatan Waktu & Garansi Pengiriman Internasional' : 'Money-Back Guarantee & Timed Delivery Commitment'
      ]
    }
  ];

  return (
    <section id="kalkulator" className="py-8 sm:py-12 bg-white border-b border-slate-200 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
            <Globe2 className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>
              {isIndonesian 
                ? 'JASA PENGIRIMAN & LOGISTIK GLOBAL' 
                : isArabic 
                ? 'خدمات الشحن واللوجستيات العالمية' 
                : 'GLOBAL EXPEDITION & FREIGHT PARTNERS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase font-sans">
            {isIndonesian 
              ? 'Mitra Jasa Pengiriman Internasional' 
              : isArabic 
              ? 'شركاء الشحن الجوي والبحري الدولي' 
              : 'International Freight & Courier Partners'}
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isIndonesian 
              ? 'Pengiriman cepat, aman, dan higienis ke lebih dari 140 negara tujuan di seluruh dunia melalui maskapai ekspedisi resmi terpercaya dengan dukungan sertifikat karantina dan kontrol suhu.' 
              : isArabic 
              ? 'توصيل سريع وآمن ومعقم إلى أكثر من 140 وجهة حول العالم عبر كبرى شركات الشحن الدولية المعتمدة مع التوثيق الكامل.' 
              : 'Fast, secure, and moisture-controlled international dispatch to over 140 countries via premier certified global freight carriers.'}
          </p>
        </div>

        {/* Courier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 sm:mb-10">
          {courierPartners.map((courier) => (
            <div
              key={courier.id}
              className={`rounded-3xl border-2 p-5 sm:p-7 transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between relative group ${
                selectedCourier === courier.id 
                  ? 'border-[#009bb3] bg-teal-50/20' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                
                {/* Header: Logo on Top, Title & Subtitle Below (No dark background box) */}
                <div className="pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <CourierLogo
                      logoUrl={courier.logoUrl}
                      brand={courier.brand}
                      name={courier.name}
                    />
                    
                    <span className="p-2 rounded-xl bg-teal-50 text-[#009bb3] shrink-0 border border-teal-100/80">
                      <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
                      {courier.name}
                    </h3>
                    <span className="text-xs text-[#009bb3] font-semibold block mt-1">
                      {courier.serviceType}
                    </span>
                  </div>
                </div>

                {/* Key Metrics: Transit Time & Reach */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#009bb3]" />
                      <span>{isIndonesian ? 'Estimasi Transit' : 'Transit Time'}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block">
                      {courier.transitTime}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                      <Globe2 className="w-3.5 h-3.5 text-[#009bb3]" />
                      <span>{isIndonesian ? 'Jangkauan Wilayah' : 'Global Reach'}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block">
                      {courier.reach}
                    </span>
                  </div>
                </div>

                {/* Tagline Description */}
                <p className="text-xs text-slate-600 mb-5 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                  {courier.tagline}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2 mb-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                    {isIndonesian ? 'Layanan & Keamanan Prioritas:' : 'Key Service & Security Capabilities:'}
                  </span>
                  {courier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#009bb3] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button: Book / RFQ */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  {isIndonesian ? 'Door-to-Door / Airport Delivery' : 'Door-to-Door / Port Delivery'}
                </span>
                
                <a
                  href="#kontak"
                  id={`btn-select-courier-${courier.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#009bb3] hover:bg-[#0d8a9e] text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <span>{isIndonesian ? 'Pilih Jasa Kirim Ini' : 'Inquire with Courier'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Ocean Freight Notice / Container Shipping */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#009bb3] shrink-0">
              <Ship className="w-5 h-5 text-[#009bb3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {isIndonesian 
                  ? 'Kargo Laut Kontainer Penuh (FCL & LCL Reefer Container)' 
                  : 'Ocean Freight Reefer Container Dispatch (FCL & LCL)'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isIndonesian
                  ? 'Tersedia pengiriman kontainer berpendingin 20ft & 40ft melalui Pelabuhan Tanjung Priok (IDTPP) dan Tanjung Emas (IDSRG).'
                  : '20ft & 40ft refrigerated container shipments departing weekly via Port of Tanjung Priok and Tanjung Emas.'}
              </p>
            </div>
          </div>

          <a
            href="#kontak"
            id="btn-ocean-freight-inquiry"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <span>{isIndonesian ? 'Konsultasi Kontainer' : 'FCL Container RFQ'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#009bb3]" />
          </a>
        </div>

      </div>
    </section>
  );
}

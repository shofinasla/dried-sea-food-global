import { useState, FormEvent, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { COMPANY_PROFILE, GLOBAL_COUNTRIES } from '../data/initialData';
import { useTranslation } from '../i18n/LanguageContext';
import { ContactInquiry } from '../types';

interface ContactSectionProps {
  prefilledService?: string;
  prefilledBooking?: {
    origin: string;
    destination: string;
    weight: number;
    courierName: string;
    estimatedPriceUSD: number;
  } | null;
  onOpenSSLModal: () => void;
  onInquirySubmitted?: (newInquiry: ContactInquiry) => void;
}

export default function ContactSection({ 
  prefilledService, 
  prefilledBooking, 
  onOpenSSLModal,
  onInquirySubmitted
}: ContactSectionProps) {
  const { t, currentLang } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [inquiryType, setInquiryType] = useState<string>('Permintaan Penawaran (RFQ)');
  const [originCountry, setOriginCountry] = useState('ID');
  const [destinationCountry, setDestinationCountry] = useState('US');
  const [estimatedWeight, setEstimatedWeight] = useState<string>('50');
  const [message, setMessage] = useState('');

  // Math Captcha Anti-Spam
  const [captchaNum1] = useState(7);
  const [captchaNum2] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto populate if booking or service was provided
  useEffect(() => {
    if (prefilledBooking) {
      setMessage(`[RFQ DARI KALKULATOR ONGKIR]
Rute: ${prefilledBooking.origin} -> ${prefilledBooking.destination}
Berat Kargo: ${prefilledBooking.weight} kg
Pilihan Kurir Rekanan: ${prefilledBooking.courierName}
Estimasi Biaya: USD $${prefilledBooking.estimatedPriceUSD}
Mohon jadwalkan penjemputan kargo (cargo pickup) dan pengurusan dokumen ekspor.`);
      setInquiryType('Permintaan Penawaran (RFQ)');
    } else if (prefilledService) {
      setMessage(`Halo Tim Dried Seafood Global, kami tertarik untuk mendiskusikan pembelian komoditas / layanan "${prefilledService}" untuk kebutuhan pasokan ekspor perusahaan kami.`);
      setInquiryType('Permintaan Penawaran (RFQ)');
    }
  }, [prefilledBooking, prefilledService]);

  // Multilingual helper labels
  const getLabels = () => {
    switch (currentLang) {
      case 'zh':
        return {
          badge: 'TLS 1.3 端到端高强度加密表单',
          title: '出口咨询与正式报价申请 (RFQ)',
          subtitle: '我们的国际水产出口专员将在2个工作小时内为您提供FOB/CIF正式海运或空运报价。',
          cardTitle: '国际客户服务与出口报价中心',
          cardDesc: '我们的出口贸易团队随时协助提供检验样本、水分/盐度化验报告(COA)、印尼BKIPM检疫证书以及FCL/LCL冷藏集装箱方案。',
          hotlineLabel: '24/7 全球商务热线:',
          emailLabel: '出口报价咨询邮箱:',
          slaLabel: '服务承诺 (SLA): 2个工作小时内快速响应',
          securityTitle: '保密协议与 SSL 银行级加密',
          securityDesc: '您提交的所有公司信息、采购数量及提单数据均受256位DigiCert EV SSL证书保护。',
          fullName: '采购负责人姓名 *',
          emailField: '公司电子邮箱 *',
          phoneField: '联系电话 / WhatsApp',
          companyField: '公司或机构全称',
          inquiryTypeLabel: '采购需求类型 *',
          originLabel: '启运国 / 港口',
          destLabel: '目的国 / 港口',
          weightLabel: '预估货重 (公斤 / 货柜)',
          messageLabel: '产品需求与规格说明 *',
          messagePlaceholder: '请填写所需的鱼类品种、等级、目标水分含量、包装形式及预计装运期...',
          antiSpam: '防垃圾验证:',
          btnSubmit: '提交加密询盘 (RFQ)',
          btnSubmitting: '正在安全传输数据...',
          successTitle: '您的报价申请已成功提交！',
          successDesc: '感谢您的信任。系统已生成官方参考追踪编码：',
          successContact: '我们指定的区域出口客户经理将尽快通过邮件或电话与您对接。',
          btnAnother: '提交另一条询盘'
        };
      case 'ja':
        return {
          badge: 'TLS 1.3 エンドツーエンド暗号化フォーム',
          title: '輸出ご相談・公式見積依頼 (RFQ)',
          subtitle: 'インドネシア産高級塩魚・乾物のFOB/CIF見積書を2営業時間以内に専任スタッフよりご案内いたします。',
          cardTitle: '国際カスタマーデスク & 輸出見積センター',
          cardDesc: 'サンプル発送、水分・塩分分析証明書(COA)、インドネシアBKIPM検疫証明書、FCL/LCL輸送の手配を承ります。',
          hotlineLabel: '24時間対応ホットライン:',
          emailLabel: '見積専用メールアドレス:',
          slaLabel: 'SLA保証: 2営業時間以内の迅速回答',
          securityTitle: '機密保持 & SSL銀行級暗号化',
          securityDesc: 'ご入力いただいたすべての法人データは、256ビットEV SSLにより安全に保護されています。',
          fullName: 'ご担当者様氏名 *',
          emailField: '法人メールアドレス *',
          phoneField: 'お電話番号 / WhatsApp',
          companyField: '貴社名 / 組織名',
          inquiryTypeLabel: 'お問い合わせ項目 *',
          originLabel: '積出港 / 国',
          destLabel: '仕向地 / 国',
          weightLabel: '予定貨物重量 (kg / コンテナ)',
          messageLabel: 'ご要望詳細・製品スペック *',
          messagePlaceholder: '希望魚種、水分率、包装形態、希望納期などをご記入ください...',
          antiSpam: 'セキュリティ認証:',
          btnSubmit: '暗号化して見積を依頼する',
          btnSubmitting: 'データ送信中...',
          successTitle: '見積依頼を正常に受け付けました！',
          successDesc: 'お問い合わせありがとうございます。受付番号：',
          successContact: '担当アカウントマネージャーよりご連絡いたします。',
          btnAnother: '別のお問い合わせを送信'
        };
      case 'ar':
        return {
          badge: 'نموذج مشفر بالكامل بتقنية TLS 1.3',
          title: 'استشارة تجارية وطلب عرض أسعار (RFQ)',
          subtitle: 'احصل على عرض أسعار رسمي (FOB / CIF) للأسماك المجففة والمملحة خلال ساعتي عمل.',
          cardTitle: 'مركز خدمة العملاء وطلبات التصدير',
          cardDesc: 'فريق التصدير لدينا جاهز لتقديم العينات وشهادات الجودة والتحاليل المخبرية وشهادات الحجر الصحي المعتمدة.',
          hotlineLabel: 'الخط الساخن التجاري 24/7:',
          emailLabel: 'البريد الإلكتروني للطلبات:',
          slaLabel: 'اتفاقية مستوى الخدمة: استجابة خلال ساعتين',
          securityTitle: 'ضمان السرية وتشفير SSL المصرفي',
          securityDesc: 'جميع البيانات محمية بتشفير 256-bit DigiCert EV SSL المتوافق مع المعايير الدولية.',
          fullName: 'اسم المسؤول *',
          emailField: 'البريد الإلكتروني للشركة *',
          phoneField: 'رقم الهاتف / واتساب',
          companyField: 'اسم الشركة / المؤسسة',
          inquiryTypeLabel: 'نوع الطلب *',
          originLabel: 'بلد الشحن',
          destLabel: 'بلد الوصول',
          weightLabel: 'الوزن التقريبي (كجم / حاوية)',
          messageLabel: 'تفاصيل الطلب والمواصفات *',
          messagePlaceholder: 'يرجى ذكر أنواع الأسماك المطلوبة، نسبة الرطوبة، ونوع التعبئة والتغليف...',
          antiSpam: 'التحقق الأمني:',
          btnSubmit: 'إرسال طلب السعر المشفر',
          btnSubmitting: 'جارٍ إرسال البيانات...',
          successTitle: 'تم إرسال طلب السعر بنجاح!',
          successDesc: 'شكراً لثقتكم. رقم المرجع الرسمي للطلب:',
          successContact: 'سيتواصل معكم مسؤول التصدير المختص في أقرب وقت.',
          btnAnother: 'إرسال طلب آخر'
        };
      case 'id':
        return {
          badge: 'FORMULIR TERENKRIPSI END-TO-END TLS 1.3',
          title: 'Konsultasi & Permintaan Penawaran (RFQ)',
          subtitle: 'Dapatkan penawaran harga FOB/CIF komoditas ikan asin & hasil laut kering Nusantara dalam waktu kurang dari 2 jam kerja dari tim spesialis ekspor kami.',
          cardTitle: 'Pusat Layanan Klien & RFQ Ekspor',
          cardDesc: 'Tim ekspor kami siap membantu permintaan sampel, spesifikasi uji lab kadar air/garam, sertifikat karantina BKIPM, serta opsi pengiriman FCL/LCL kontainer berpendingin atau kargo udara express.',
          hotlineLabel: 'Hotline Korporat 24/7:',
          emailLabel: 'Email Permintaan RFQ:',
          slaLabel: 'Respon Penawaran < 2 Jam Kerja',
          securityTitle: 'Jaminan Kerahasiaan & Enkripsi SSL',
          securityDesc: 'Seluruh data perusahaan, dokumen manifest, dan estimasi nilai kargo yang Anda masukkan dilindungi dengan sertifikat SSL Extended Validation 256-bit kelas perbankan.',
          fullName: 'Nama Lengkap / PIC Pengadaan *',
          emailField: 'Email Perusahaan (Corporate Email) *',
          phoneField: 'Nomor Telepon / WhatsApp',
          companyField: 'Nama Perusahaan / Institusi',
          inquiryTypeLabel: 'Jenis Kebutuhan / Topik Permintaan *',
          originLabel: 'Negara Asal',
          destLabel: 'Negara Tujuan',
          weightLabel: 'Est. Berat (Kg / Ton)',
          messageLabel: 'Detail Pesan / Spesifikasi Kargo *',
          messagePlaceholder: 'Tuliskan detail komoditas kargo, estimasi jadwal keberangkatan, dan kebutuhan penanganan khusus...',
          antiSpam: 'Verifikasi Anti-Spam:',
          btnSubmit: 'Kirim Permintaan Penawaran',
          btnSubmitting: 'Mengirim Data Terenkripsi...',
          successTitle: 'Permintaan Penawaran Anda Berhasil Terkirim!',
          successDesc: 'Terima kasih atas kepercayaan Anda. Tiket penawaran resmi telah dibuat dengan kode referensi:',
          successContact: 'Account Manager spesialis rute Anda akan menghubungi melalui email/telepon dalam waktu kurang dari 2 jam kerja.',
          btnAnother: 'Kirim Permintaan Penawaran Lainnya'
        };
      default:
        return {
          badge: 'TLS 1.3 END-TO-END ENCRYPTED INQUIRY FORM',
          title: 'Request for Quotation (RFQ) & Consultation',
          subtitle: 'Receive official FOB/CIF freight and commodity price quotes for Indonesian dried seafood within 2 business hours from our export desk.',
          cardTitle: 'Client Concierge & Export RFQ Desk',
          cardDesc: 'Our trade desk coordinates laboratory COA testing, moisture verification, BKIPM sanitary quarantine clearances, and reefers/air cargo logistics worldwide.',
          hotlineLabel: '24/7 Export Trade Hotline:',
          emailLabel: 'Direct RFQ Inquiries:',
          slaLabel: 'SLA Guarantee: Official Response < 2 Hours',
          securityTitle: 'Non-Disclosure & High-Assurance SSL Encryption',
          securityDesc: 'All corporate information, shipment estimates, and manifest parameters are secured with banking-grade 256-Bit DigiCert EV SSL.',
          fullName: 'Full Name / Procurement Officer *',
          emailField: 'Corporate Email Address *',
          phoneField: 'Direct Phone / WhatsApp',
          companyField: 'Company or Organization Name',
          inquiryTypeLabel: 'Inquiry Category / Scope *',
          originLabel: 'Departure Country / Port',
          destLabel: 'Destination Country / Port',
          weightLabel: 'Est. Weight (Kg / Ton / FCL)',
          messageLabel: 'Detailed Cargo Specifications & Quantity *',
          messagePlaceholder: 'Provide targeted fish species, grade, moisture tolerances, packaging preference, and incoterm...',
          antiSpam: 'Anti-Spam Verification:',
          btnSubmit: 'Submit Encrypted RFQ',
          btnSubmitting: 'Encrypting & Transmitting...',
          successTitle: 'Your RFQ Has Been Transmitted Successfully!',
          successDesc: 'Thank you for your business inquiry. Your official quotation tracking ID is:',
          successContact: 'A dedicated trade specialist will reach out to you via corporate email and phone within 2 hours.',
          btnAnother: 'Submit Another Inquiry'
        };
    }
  };

  const labels = getLabels();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCaptchaError(false);
    setErrorMessage('');

    if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
      setCaptchaError(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          companyName,
          inquiryType,
          message,
          originCountry,
          destinationCountry,
          estimatedWeight: Number(estimatedWeight) || 0
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setSubmittedRefId(data.inquiry.id);
        onInquirySubmitted?.(data.inquiry);
        setName('');
        setEmail('');
        setPhone('');
        setCompanyName('');
        setMessage('');
        setCaptchaAnswer('');
      } else {
        setErrorMessage(data.error || 'Terjadi kendala saat mengirim pesan.');
      }
    } catch (err) {
      setErrorMessage('Koneksi terganggu. Silakan hubungi hotline langsung.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>{labels.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
            {labels.title}
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            {labels.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Concierge & Security Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-xs space-y-5">
              <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#009bb3]" />
                <span>{labels.cardTitle}</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {labels.cardDesc}
              </p>

              <div className="space-y-3.5 pt-2 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Phone className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">{labels.hotlineLabel}</span>
                    <strong className="text-slate-900 text-sm">{COMPANY_PROFILE.hotline}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Mail className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">{labels.emailLabel}</span>
                    <strong className="text-slate-900 text-sm">{COMPANY_PROFILE.salesEmail}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Service Level Agreement:</span>
                    <span className="text-xs text-emerald-700 font-bold block">{labels.slaLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 border border-teal-200 p-6 rounded-3xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#009bb3] font-bold text-sm">
                  <Lock className="w-4 h-4 text-[#009bb3]" />
                  <span>{labels.securityTitle}</span>
                </div>
                <button
                  onClick={onOpenSSLModal}
                  id="btn-open-ssl-info"
                  className="text-[11px] text-[#009bb3] underline font-semibold hover:text-[#519992] cursor-pointer"
                >
                  TLS 1.3 EV
                </button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                {labels.securityDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact & RFQ Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
            
            {submitSuccess ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  {labels.successTitle}
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  {labels.successDesc}
                </p>
                <div className="inline-block bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl text-[#009bb3] font-mono font-bold text-sm">
                  {submittedRefId}
                </div>
                <p className="text-xs text-slate-500">
                  {labels.successContact}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    id="btn-submit-another-inquiry"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
                  >
                    {labels.btnAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {labels.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Tan / Hendra Wijaya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="contact-input-name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {labels.emailField}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. trade@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="contact-input-email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {labels.phoneField}
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +65 9123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="contact-input-phone"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {labels.companyField}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Global Foods Trading Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      id="contact-input-company"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {labels.inquiryTypeLabel}
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e: any) => setInquiryType(e.target.value)}
                    id="contact-select-type"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Permintaan Penawaran (RFQ)">Request for Quotation (RFQ) - Ocean / Air Freight</option>
                    <option value="Kemitraan Strategis">Long-Term Supply Partnership & Contract Sourcing</option>
                    <option value="Dukungan Logistik">Quality Inspection, Lab COA & Quarantine Assistance</option>
                    <option value="Konsultasi Ekspor-Impor">Import Regulations & Customs Tariff Advisory</option>
                    <option value="Lainnya">General Trade Inquiry</option>
                  </select>
                </div>

                {/* Trade Lane (Origin - Destination - Weight) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">{labels.originLabel}</label>
                    <select
                      value={originCountry}
                      onChange={(e) => setOriginCountry(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      {GLOBAL_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">{labels.destLabel}</label>
                    <select
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      {GLOBAL_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">{labels.weightLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. 500 kg / 1 FCL"
                      value={estimatedWeight}
                      onChange={(e) => setEstimatedWeight(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {labels.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={labels.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="contact-input-message"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Anti-spam validation */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="font-bold text-[#009bb3]">{labels.antiSpam}</span>
                    <span>{captchaNum1} + {captchaNum2} = ?</span>
                    <input
                      type="number"
                      required
                      placeholder="?"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      id="contact-captcha-input"
                      className="w-16 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center text-slate-900 focus:border-[#009bb3] focus:outline-none font-bold"
                    />
                    {captchaError && (
                      <span className="text-rose-600 text-xs font-medium">Wrong answer</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    id="btn-submit-contact-form"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-black px-7 py-3 rounded-full text-sm shadow-md shadow-teal-500/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? labels.btnSubmitting : labels.btnSubmit}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

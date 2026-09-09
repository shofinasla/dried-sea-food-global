import { useState, FormEvent } from 'react';
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
}

export default function ContactSection({ prefilledService, prefilledBooking, onOpenSSLModal }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [inquiryType, setInquiryType] = useState<'Permintaan Penawaran (RFQ)' | 'Kemitraan Strategis' | 'Dukungan Logistik' | 'Konsultasi Ekspor-Impor' | 'Lainnya'>('Permintaan Penawaran (RFQ)');
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

  // Auto-populate if booking or service is pre-selected
  useState(() => {
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
  });

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
            <span>FORMULIR TERENKRIPSI END-TO-END TLS 1.3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
            Konsultasi & Permintaan Penawaran (RFQ)
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Dapatkan penawaran harga FOB/CIF komoditas ikan asin & hasil laut kering Nusantara dalam waktu kurang dari 2 jam kerja dari tim spesialis ekspor kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Concierge & Security Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-xs space-y-5">
              <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#009bb3]" />
                <span>Pusat Layanan Klien & RFQ Ekspor</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tim ekspor kami siap membantu permintaan sampel, spesifikasi uji lab kadar air/garam, sertifikat karantina BKIPM, serta opsi pengiriman FCL/LCL kontainer berpendingin atau kargo udara express.
              </p>

              <div className="space-y-3.5 pt-2 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Phone className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Hotline Korporat 24/7:</span>
                    <strong className="text-slate-900 text-sm">{COMPANY_PROFILE.hotline}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Mail className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Email Permintaan RFQ:</span>
                    <strong className="text-slate-900 text-sm">{COMPANY_PROFILE.salesEmail}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-[#009bb3] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Service Level Agreement (SLA):</span>
                    <span className="text-xs text-emerald-700 font-bold block">Respon Penawaran &lt; 2 Jam Kerja</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 border border-teal-200 p-6 rounded-3xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#009bb3] font-bold text-sm">
                  <Lock className="w-4 h-4 text-[#009bb3]" />
                  <span>Jaminan Kerahasiaan & Enkripsi SSL</span>
                </div>
                <button
                  onClick={onOpenSSLModal}
                  id="btn-open-ssl-info"
                  className="text-[11px] text-[#009bb3] underline font-semibold hover:text-[#519992] cursor-pointer"
                >
                  Detail Sertifikat
                </button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Seluruh data perusahaan, dokumen manifest, dan estimasi nilai kargo yang Anda masukkan dilindungi dengan sertifikat SSL Extended Validation 256-bit kelas perbankan dan tunduk pada UU Pelindungan Data Pribadi (UU PDP) serta standar ISO 27001.
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
                  Permintaan Penawaran Anda Berhasil Terkirim!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Terima kasih atas kepercayaan Anda. Tiket penawaran resmi telah dibuat dengan kode referensi:
                </p>
                <div className="inline-block bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl text-[#009bb3] font-mono font-bold text-sm">
                  {submittedRefId}
                </div>
                <p className="text-xs text-slate-500">
                  Account Manager spesialis rute Anda akan menghubungi melalui email/telepon dalam waktu kurang dari 2 jam kerja.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    id="btn-submit-another-inquiry"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#009bb3] to-[#519992] text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Kirim Pesan atau RFQ Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Lengkap Narahubung *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi Hartono"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="contact-input-name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Perusahaan (Corporate Email) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. budi@perusahaan.co.id"
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
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +62 812 3456 7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="contact-input-phone"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Perusahaan / Institusi
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pacific Seafoods Ltd / Tokyo Fish Trading Co."
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
                    Jenis Kebutuhan / Topik Permintaan *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e: any) => setInquiryType(e.target.value)}
                    id="contact-select-type"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Permintaan Penawaran (RFQ)">Permintaan Penawaran Tarif Kargo (RFQ)</option>
                    <option value="Kemitraan Strategis">Kemitraan Rantai Pasok Multinasional</option>
                    <option value="Dukungan Logistik">Dukungan Operasional & Pergudangan PLB</option>
                    <option value="Konsultasi Ekspor-Impor">Konsultasi Regulasi Kepabeanan AEO</option>
                    <option value="Lainnya">Pertanyaan Umum Korporat</option>
                  </select>
                </div>

                {/* Optional Trade Lane (Origin - Destination - Weight) */}
                {inquiryType === 'Permintaan Penawaran (RFQ)' && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Negara Asal</label>
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
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Negara Tujuan</label>
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
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Est. Berat (Kg / Ton)</label>
                      <input
                        type="text"
                        placeholder="e.g. 500 kg / 2 FCL"
                        value={estimatedWeight}
                        onChange={(e) => setEstimatedWeight(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Detail Pesan / Spesifikasi Kargo *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan detail komoditas kargo, estimasi jadwal keberangkatan, dan kebutuhan penanganan khusus..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="contact-input-message"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#009bb3] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Anti-spam validation */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="font-bold text-[#009bb3]">Verifikasi Anti-Spam:</span>
                    <span>Berapa {captchaNum1} + {captchaNum2}?</span>
                    <input
                      type="number"
                      required
                      placeholder="Jawaban"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      id="contact-captcha-input"
                      className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center text-slate-900 focus:border-[#009bb3] focus:outline-none font-bold"
                    />
                    {captchaError && (
                      <span className="text-rose-600 text-xs font-medium">Jawaban salah</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    id="btn-submit-contact-form"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-black px-7 py-3 rounded-full text-sm shadow-md shadow-teal-500/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Mengirim Data Terenkripsi...' : 'Kirim Permintaan Penawaran'}</span>
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

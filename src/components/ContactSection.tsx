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
    <section id="kontak" className="py-20 bg-slate-900/80 text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Formulir Terenkripsi End-to-End TLS 1.3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Konsultasi & Permintaan Penawaran (RFQ)
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Dapatkan penawaran harga FOB/CIF komoditas ikan asin & hasil laut kering Nusantara dalam waktu kurang dari 2 jam kerja dari tim spesialis ekspor kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Concierge & Security Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Pusat Layanan Klien & RFQ Ekspor</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tim ekspor kami siap membantu permintaan sampel, spesifikasi uji lab kadar air/garam, sertifikat karantina BKIPM, serta opsi pengiriman FCL/LCL kontainer berpendingin atau kargo udara express.
              </p>

              <div className="space-y-3.5 pt-2 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Hotline Korporat 24/7:</span>
                    <strong className="text-white text-sm">{COMPANY_PROFILE.hotline}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Email Permintaan RFQ:</span>
                    <strong className="text-white text-sm">{COMPANY_PROFILE.salesEmail}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Service Level Agreement (SLA):</span>
                    <span className="text-xs text-emerald-400 font-bold block">Respon Penawaran &lt; 2 Jam Kerja</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/60 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Jaminan Kerahasiaan & Enkripsi SSL</span>
                </div>
                <button
                  onClick={onOpenSSLModal}
                  id="btn-open-ssl-info"
                  className="text-[11px] text-emerald-300 underline font-semibold hover:text-white"
                >
                  Detail Sertifikat
                </button>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Seluruh data perusahaan, dokumen manifest, dan estimasi nilai kargo yang Anda masukkan dilindungi dengan sertifikat SSL Extended Validation 256-bit kelas perbankan dan tunduk pada UU Pelindungan Data Pribadi (UU PDP) serta standar ISO 27001.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact & RFQ Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
            
            {submitSuccess ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Permintaan Penawaran Anda Berhasil Terkirim!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Terima kasih atas kepercayaan Anda. Tiket penawaran resmi telah dibuat dengan kode referensi:
                </p>
                <div className="inline-block bg-slate-950 border border-slate-700 px-4 py-2 rounded-xl text-amber-400 font-mono font-bold text-sm">
                  {submittedRefId}
                </div>
                <p className="text-xs text-slate-400">
                  Account Manager spesialis rute Anda akan menghubungi melalui email/telepon dalam waktu kurang dari 2 jam kerja.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    id="btn-submit-another-inquiry"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Kirim Pesan atau RFQ Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nama Lengkap Narahubung *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi Hartono"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="contact-input-name"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Email Perusahaan (Corporate Email) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. budi@perusahaan.co.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="contact-input-email"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +62 812 3456 7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="contact-input-phone"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nama Perusahaan / Institusi
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pacific Seafoods Ltd / Tokyo Fish Trading Co."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      id="contact-input-company"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Jenis Kebutuhan / Topik Permintaan *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e: any) => setInquiryType(e.target.value)}
                    id="contact-select-type"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
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
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Negara Asal</label>
                      <select
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        {GLOBAL_COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Negara Tujuan</label>
                      <select
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        {GLOBAL_COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Est. Berat (Kg / Ton)</label>
                      <input
                        type="text"
                        placeholder="e.g. 500 kg / 2 FCL"
                        value={estimatedWeight}
                        onChange={(e) => setEstimatedWeight(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Detail Pesan / Spesifikasi Kargo *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan detail komoditas kargo, estimasi jadwal keberangkatan, dan kebutuhan penanganan khusus..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="contact-input-message"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Anti-spam validation */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="font-bold text-amber-400">Verifikasi Anti-Spam:</span>
                    <span>Berapa {captchaNum1} + {captchaNum2}?</span>
                    <input
                      type="number"
                      required
                      placeholder="Jawaban"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      id="contact-captcha-input"
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-center text-white focus:border-amber-500 focus:outline-none font-bold"
                    />
                    {captchaError && (
                      <span className="text-rose-400 text-xs">Jawaban salah</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    id="btn-submit-contact-form"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-3 rounded-xl text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
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

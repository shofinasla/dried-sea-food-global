import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Building2, 
  Globe2, 
  Package, 
  Clock, 
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ExportCommodity } from '../../types';
import { useTranslation } from '../../i18n/LanguageContext';

interface RequestQuotePageProps {
  initialCommodity?: string;
  isSampleMode?: boolean;
  products: ExportCommodity[];
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export default function RequestQuotePage({
  initialCommodity = '',
  isSampleMode = false,
  products,
  onNavigateHome,
  onNavigateProducts
}: RequestQuotePageProps) {
  const { t } = useTranslation();

  const [inquiryType, setInquiryType] = useState<string>(
    isSampleMode ? 'Product Sample Request' : 'Price Quotation (RFQ)'
  );
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(initialCommodity || 'Super White Anchovy / Teri Nasi Belawan Grade AAA');
  const [quantity, setQuantity] = useState('');
  const [packaging, setPackaging] = useState('10 Kg Export Master Carton');
  const [destinationPort, setDestinationPort] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // anti-spam bot trap

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard bot

    if (!name.trim() || !company.trim() || !email.trim() || !phone.trim() || !country.trim()) {
      setErrorMessage('Please complete all required fields (*).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        name: name.trim(),
        contactPerson: name.trim(),
        companyName: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        destinationCountry: country.trim(),
        commodity: selectedProduct,
        inquiryType: inquiryType,
        quantity: quantity,
        packaging: packaging,
        destinationPort: destinationPort,
        deliveryDate: targetDate,
        message: message.trim(),
        createdAt: new Date().toISOString()
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && (data.success || data.id)) {
        setSubmittedSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(data.error || 'Unable to transmit quotation request. Please check your connection or contact our WhatsApp export desk directly.');
      }
    } catch (err: any) {
      setErrorMessage('Connection error. Please contact our direct export desk via WhatsApp: +62 889-8558-2838');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dried Seafood Global Export Desk, I would like to request an official ${inquiryType} for ${selectedProduct}. Company: ${company || '[My Company]'}, Country: ${country || '[My Country]'}.`
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
            <button onClick={onNavigateHome} className="hover:text-[#009bb3] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">
              {inquiryType === 'Product Sample Request' ? 'Sample Request' : 'Request a Quote'}
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Export Commercial Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              {inquiryType === 'Product Sample Request'
                ? 'Request Quality Export Samples'
                : 'Request an Official B2B Export Quotation (RFQ)'}
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Submit your commodity specifications, volume requirements, and destination port. Our export logistics team will prepare a formal Proforma Invoice (PI) and freight schedule within 24 business hours.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {submittedSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-serif-display">
              Quotation Request Transmitted Successfully
            </h2>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Thank you, <strong>{name}</strong> from <strong>{company}</strong>. Your inquiry has been registered with our international trade desk (PT Samdura Bara Persada). A representative will contact your business email (<strong>{email}</strong>) and WhatsApp within 24 hours.
            </p>

            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-2 text-left">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">Submission Summary</div>
              <div>• <strong>Commodity:</strong> {selectedProduct}</div>
              <div>• <strong>Volume / Units:</strong> {quantity || 'Standard MOQ'}</div>
              <div>• <strong>Destination Port:</strong> {destinationPort || country}</div>
              <div>• <strong>Packaging:</strong> {packaging}</div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/6288985582838?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md"
              >
                Chat Instant WhatsApp Export Desk
              </a>
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setName('');
                  setQuantity('');
                  setMessage('');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Form (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Commercial Inquiry Form</h3>
                  <p className="text-xs text-slate-500">Fields marked with an asterisk (*) are mandatory.</p>
                </div>
                {/* Mode Selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setInquiryType('Price Quotation (RFQ)')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      inquiryType === 'Price Quotation (RFQ)'
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Price Quote (RFQ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType('Product Sample Request')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      inquiryType === 'Product Sample Request'
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Request Sample
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot hidden input for bots */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Section 1: Contact Information */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-[#009bb3]">
                    1. Contact & Corporate Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Robert Zhang / Sarah Al-Mansoor"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company / Importer Name *</label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="e.g. Pacific Seafood Wholesale Ltd."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="purchasing@company.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+852 9123 4567 / +971 50 123 4567"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Destination Country *</label>
                      <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="e.g. Hong Kong, Singapore, UAE, United States, Japan"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Commodity & Volume */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-[#009bb3]">
                    2. Product & Logistics Requirements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Commodity *</label>
                      <select
                        value={selectedProduct}
                        onChange={e => setSelectedProduct(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                        <option value="Consolidated Mixed Dried Seafood Container">
                          Consolidated Mixed Container (Anchovy + Squid + Shrimp)
                        </option>
                        <option value="Custom Marine Commodity / Sourcing Inquiry">
                          Custom Sourcing Inquiry / Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Required Volume *</label>
                      <input
                        type="text"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        placeholder="e.g. 500 Kg (Sample/LCL), 1x20ft FCL (12 MT), 1x40ft FCL"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Packaging Preference</label>
                      <select
                        value={packaging}
                        onChange={e => setPackaging(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      >
                        <option value="10 Kg Export Master Carton (Bulk)">10 Kg Export Master Carton (Bulk)</option>
                        <option value="20 Kg Export Master Carton (Bulk)">20 Kg Export Master Carton (Bulk)</option>
                        <option value="Retail Vacuum Pouch 250g / 500g">Retail Vacuum Pouch 250g / 500g</option>
                        <option value="Private Label OEM Packaging (Custom Branding)">Private Label OEM Packaging (Custom Branding)</option>
                        <option value="Priority Air Cargo Moisture-Proof Pack">Priority Air Cargo Moisture-Proof Pack</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Target Port of Discharge</label>
                      <input
                        type="text"
                        value={destinationPort}
                        onChange={e => setDestinationPort(e.target.value)}
                        placeholder="e.g. Port of Singapore, Jebel Ali, Los Angeles"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Target Shipment Schedule</label>
                      <input
                        type="text"
                        value={targetDate}
                        onChange={e => setTargetDate(e.target.value)}
                        placeholder="e.g. Immediate dispatch, Next month, Quarterly contract"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Additional Specifications / Quality Notes</label>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Describe target moisture percentage, size grading tolerance, L/C conditions, or special quarantine test requirements..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#009bb3] focus:ring-1 focus:ring-[#009bb3]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>256-bit TLS encrypted & strictly confidential trade inquiry.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs transition shadow-lg shadow-[#009bb3]/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Quotation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side Support Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Export Desk Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#009bb3] uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Direct Export Desk</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Need Immediate Commercial Assistance?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our bilingual trade officers assist wholesale buyers across multiple timezones. Connect directly via official WhatsApp.
                </p>

                <a
                  href={`https://wa.me/6288985582838?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Export Desk (+62 889-8558-2838)</span>
                </a>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Export Desk:</span>
                    <strong className="text-slate-800">Mon - Sat (08:00 - 18:00 WIB / UTC+7)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Corporate Email:</span>
                    <strong className="text-slate-800">sales@driedseafoodglobal.com</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response Time:</span>
                    <strong className="text-emerald-700">&lt; 24 Business Hours</strong>
                  </div>
                </div>
              </div>

              {/* Verified Legal Identity */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Verified Legal Entity</span>
                </div>
                <h4 className="text-sm font-bold font-serif-display">PT Samdura Bara Persada</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lapangan, Morodemak, Kec. Bonang, Kabupaten Demak, Jawa Tengah 59552, Indonesia.
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                  <div>NIB: 1408230135849</div>
                  <div>P-IRT: 5023315010556-31</div>
                  <div>AHU: AHU-0034189.AH.01.01.2014</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

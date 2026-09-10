import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Globe, 
  Package, 
  Plane, 
  Ship, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Download, 
  Check, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Boxes,
  HelpCircle
} from 'lucide-react';
import { GLOBAL_COUNTRIES } from '../data/initialData';
import { ShippingCalculationResult, CountryInfo } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface GlobalShippingCalculatorProps {
  onBookInquiry: (bookingDetails: {
    origin: string;
    destination: string;
    weight: number;
    courierName: string;
    estimatedPriceUSD: number;
  }) => void;
}

export default function GlobalShippingCalculator({ onBookInquiry }: GlobalShippingCalculatorProps) {
  const { t, currentLang } = useTranslation();
  const [originCode, setOriginCode] = useState('ID');
  const [destinationCode, setDestinationCode] = useState('US');
  const [weightKg, setWeightKg] = useState<number>(5);
  const [lengthCm, setLengthCm] = useState<number>(30);
  const [widthCm, setWidthCm] = useState<number>(25);
  const [heightCm, setHeightCm] = useState<number>(20);
  const [itemType, setItemType] = useState<'parcel' | 'document' | 'fragile' | 'perishable' | 'dangerous_goods' | 'heavy_machinery'>('parcel');
  const [declaredValueUSD, setDeclaredValueUSD] = useState<number>(250);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [expressClearance, setExpressClearance] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ShippingCalculationResult | null>(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('dhl-express');
  const [customsAdvisory, setCustomsAdvisory] = useState<any | null>(null);
  const [loadingAdvisory, setLoadingAdvisory] = useState<boolean>(false);
  const [copiedSlip, setCopiedSlip] = useState<boolean>(false);

  // Auto calculate initial quote on mount
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/shipping/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originCode,
          destinationCode,
          weightKg: Number(weightKg) || 1,
          lengthCm: Number(lengthCm) || 10,
          widthCm: Number(widthCm) || 10,
          heightCm: Number(heightCm) || 10,
          itemType,
          declaredValueUSD: Number(declaredValueUSD) || 100,
          includeInsurance,
          expressClearance
        })
      });
      const data: ShippingCalculationResult = await res.json();
      setResult(data);
      if (data.quotes && data.quotes.length > 0) {
        setSelectedQuoteId(data.quotes[0].courierId);
      }
    } catch (err) {
      console.error('Failed to calculate shipping:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskCustomsAI = async () => {
    setLoadingAdvisory(true);
    try {
      const originCountry = GLOBAL_COUNTRIES.find(c => c.code === originCode)?.name || originCode;
      const destinationCountry = GLOBAL_COUNTRIES.find(c => c.code === destinationCode)?.name || destinationCode;
      
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'customs-advisory',
          originCountry,
          destinationCountry
        })
      });
      const data = await res.json();
      setCustomsAdvisory(data.result);
    } catch (e) {
      console.error('Customs AI error:', e);
    } finally {
      setLoadingAdvisory(false);
    }
  };

  const selectedQuote = result?.quotes.find(q => q.courierId === selectedQuoteId) || result?.quotes[0];

  const handleCopyQuoteSlip = () => {
    if (!result || !selectedQuote) return;
    const slipText = `=================================================
OFFICIAL FREIGHT & SHIPPING ESTIMATE - DRIED SEAFOOD GLOBAL
Ref ID: ${selectedQuote.bookingReference}
Date: ${new Date().toLocaleDateString('en-US')}
Route: ${result.origin.name} (${result.origin.code}) -> ${result.destination.name} (${result.destination.code})
Carrier Partner: ${selectedQuote.courierName} (${selectedQuote.serviceTier})
Actual Weight: ${result.actualWeightKg} kg | Volumetric: ${result.volumetricWeightKg} kg
Chargeable Weight: ${result.chargeableWeightKg} kg
Dimensions: ${lengthCm}x${widthCm}x${heightCm} cm
Transit Estimate: ${selectedQuote.estimatedDeliveryDays} (Est: ${selectedQuote.estimatedDeliveryDate})
Total Estimated Cost: USD $${selectedQuote.totalUSD} (Rp ${selectedQuote.totalIDR.toLocaleString('id-ID')})
Encrypted Transaction: TLS 1.3 256-Bit DigiCert Verified
=================================================`;
    navigator.clipboard.writeText(slipText);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 3000);
  };

  const handleProceedBooking = () => {
    if (!result || !selectedQuote) return;
    onBookInquiry({
      origin: result.origin.name,
      destination: result.destination.name,
      weight: result.chargeableWeightKg,
      courierName: selectedQuote.courierName,
      estimatedPriceUSD: selectedQuote.totalUSD
    });
  };

  return (
    <section id="kalkulator" className="py-20 bg-white border-b border-slate-200 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-[#009bb3]" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight uppercase font-sans">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Calculator Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form Parameters */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#009bb3]" />
                Parameter Kargo & Rute
              </span>
              <span className="text-[11px] text-[#009bb3] font-bold bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                Live Currency Rate USD/IDR
              </span>
            </div>

            {/* Country Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Negara Asal (Origin)
                </label>
                <select
                  value={originCode}
                  onChange={(e) => setOriginCode(e.target.value)}
                  id="select-origin-country"
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009bb3] transition-colors shadow-xs"
                >
                  {GLOBAL_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Negara Tujuan (Destination)
                </label>
                <select
                  value={destinationCode}
                  onChange={(e) => setDestinationCode(e.target.value)}
                  id="select-destination-country"
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009bb3] transition-colors shadow-xs"
                >
                  {GLOBAL_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Package Type & Actual Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kategori Kargo / Barang
                </label>
                <select
                  value={itemType}
                  onChange={(e: any) => setItemType(e.target.value)}
                  id="select-item-type"
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009bb3] shadow-xs"
                >
                  <option value="parcel">Paket Standar Komersil</option>
                  <option value="document">Dokumen / Kontrak Bisnis</option>
                  <option value="fragile">Pecah Belah / Elektronik</option>
                  <option value="perishable">Cold Chain / Pangan / Vaksin</option>
                  <option value="dangerous_goods">Dangerous Goods (DGR IATA)</option>
                  <option value="heavy_machinery">Alat Berat / Komponen Mesin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Berat Aktual (Kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    id="input-weight-kg"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 text-sm pr-10 focus:outline-none focus:border-[#009bb3] font-semibold shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">KG</span>
                </div>
              </div>
            </div>

            {/* Dimensions (Length, Width, Height) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dimensi Paket (P x L x T dalam cm)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Math.max(1, parseInt(e.target.value) || 1))}
                    id="input-length-cm"
                    placeholder="P"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs text-center font-semibold focus:border-[#009bb3] focus:outline-none shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-0.5">Panjang (cm)</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Math.max(1, parseInt(e.target.value) || 1))}
                    id="input-width-cm"
                    placeholder="L"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs text-center font-semibold focus:border-[#009bb3] focus:outline-none shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-0.5">Lebar (cm)</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(1, parseInt(e.target.value) || 1))}
                    id="input-height-cm"
                    placeholder="T"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs text-center font-semibold focus:border-[#009bb3] focus:outline-none shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-0.5">Tinggi (cm)</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Rumus Volumetrik IATA: <code className="text-[#009bb3] font-mono font-bold">(P×L×T)/5000</code> = {((lengthCm * widthCm * heightCm) / 5000).toFixed(2)} Kg
              </p>
            </div>

            {/* Declared Value & Value Additions */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nilai Deklarasi Barang (Declared Value USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min="10"
                    value={declaredValueUSD}
                    onChange={(e) => setDeclaredValueUSD(Math.max(0, parseFloat(e.target.value) || 0))}
                    id="input-declared-value"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-[#009bb3] font-semibold shadow-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    id="check-insurance"
                    className="rounded border-slate-300 text-[#009bb3] focus:ring-[#009bb3] bg-white"
                  />
                  <span>Sertakan Asuransi All-Risk Maritim & Udara Klausul A (+1.5% nilai barang)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={expressClearance}
                    onChange={(e) => setExpressClearance(e.target.checked)}
                    id="check-express-clearance"
                    className="rounded border-slate-300 text-[#009bb3] focus:ring-[#009bb3] bg-white"
                  />
                  <span>Prioritas Fast-Track Jalur Hijau AEO Kepabeanan (+$15)</span>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              id="btn-trigger-estimate"
              className="w-full bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-black py-3 rounded-xl text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Calculator className="w-4 h-4" />
              <span>{loading ? 'Menghitung Rute & Tarif...' : 'Hitung Semua Opsi Kurir Global'}</span>
            </button>

            {/* AI Customs Advisor Trigger */}
            <button
              onClick={handleAskCustomsAI}
              disabled={loadingAdvisory}
              id="btn-ai-customs-advisory"
              className="w-full bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-[#009bb3] text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#009bb3]" />
              <span>{loadingAdvisory ? 'Menganalisis Regulasi Bea Cukai...' : 'Konsultasi Regulasi Bea Cukai AI untuk Rute Ini'}</span>
            </button>
          </div>

          {/* Right Column: Comparative Courier Rates & Official Quote Slip */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Weight Summary Banner */}
            {result && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Rute Pengiriman:</span>
                  <span className="font-bold text-slate-900">{result.origin.flag} {result.origin.name} ➔ {result.destination.flag} {result.destination.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                    Aktual: <strong className="text-slate-900">{result.actualWeightKg} kg</strong>
                  </span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                    Volumetrik: <strong className="text-slate-900">{result.volumetricWeightKg} kg</strong>
                  </span>
                  <span className="bg-teal-50 border border-teal-200 text-[#009bb3] px-2.5 py-1 rounded-md font-bold">
                    Chargeable: {result.chargeableWeightKg} kg
                  </span>
                </div>
              </div>
            )}

            {/* Comparative Courier Option Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Pilihan Layanan & Tarif Kurir Internasional</span>
                <span className="text-xs text-slate-400 font-normal">Klik untuk memilih</span>
              </h3>

              {result?.quotes.map((quote) => {
                const isSelected = quote.courierId === selectedQuoteId;
                return (
                  <div
                    key={quote.courierId}
                    id={`quote-card-${quote.courierId}`}
                    onClick={() => setSelectedQuoteId(quote.courierId)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/60 border-2 border-[#009bb3] shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          isSelected ? 'bg-gradient-to-br from-[#009bb3] to-[#519992] text-white shadow-xs' : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {quote.serviceTier === 'Ocean Cargo' ? <Ship className="w-5 h-5" /> : <Plane className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">{quote.courierName}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {quote.serviceTier}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                            <Clock className="w-3.5 h-3.5 text-[#009bb3]" />
                            <span>Transit: <strong>{quote.estimatedDeliveryDays}</strong></span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500">Est. Tiba: {quote.estimatedDeliveryDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                        <div className="text-lg font-black text-[#009bb3]">
                          USD ${quote.totalUSD.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          Rp {quote.totalIDR.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <div className="flex items-center gap-3">
                        {quote.features.map((feat, i) => (
                          <span key={i} className="inline-flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                      <span className="text-slate-400 font-mono">Ref: {quote.bookingReference}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Quote Breakdown Slip & Actions */}
            {selectedQuote && (
              <div className="bg-white border-2 border-[#009bb3]/30 p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-[#009bb3] font-bold uppercase tracking-wider">
                      Official Freight Quotation Slip
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{selectedQuote.courierName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Kode Referensi:</span>
                    <span className="text-xs font-mono font-bold text-[#009bb3]">{selectedQuote.bookingReference}</span>
                  </div>
                </div>

                {/* Price components breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Tarif Dasar Freight:</span>
                    <strong className="text-slate-900 font-bold">${selectedQuote.basePriceUSD}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Fuel Surcharge:</span>
                    <strong className="text-slate-900 font-bold">${selectedQuote.fuelSurchargeUSD}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Est. Pajak / Bea Masuk:</span>
                    <strong className="text-slate-900 font-bold">${selectedQuote.customsDutyEstimatedUSD}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Asuransi All-Risk:</span>
                    <strong className="text-slate-900 font-bold">${selectedQuote.insuranceUSD}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-600">
                      Enkripsi SSL TLS 1.3 Terjamin • Dijamin Sesuai Ketentuan Kepabeanan
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyQuoteSlip}
                      id="btn-copy-quote"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSlip ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{copiedSlip ? 'Tersalin ke Clipboard!' : 'Salin Slip Penawaran'}</span>
                    </button>

                    <button
                      onClick={handleProceedBooking}
                      id="btn-book-quote"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#009bb3] to-[#519992] hover:opacity-95 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
                    >
                      <span>Lanjutkan Pemesanan RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Customs Advisory Card (if generated) */}
            {customsAdvisory && (
              <div className="bg-teal-50/60 border border-teal-200 p-5 rounded-2xl animate-fadeIn space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#009bb3] font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-[#009bb3]" />
                    <span>Panduan Regulasi Bea Cukai AI ({customsAdvisory.route})</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-teal-800 border border-teal-200 font-medium">
                    Tingkat Risiko: {customsAdvisory.riskLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Dokumen Wajib:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {customsAdvisory.requiredDocuments?.map((doc: string, i: number) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Tips Kelancaran Pabean:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {customsAdvisory.customsTips?.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {customsAdvisory.preferentialTradeAgreements && (
                  <p className="text-[11px] text-teal-900 bg-white p-2.5 rounded-xl border border-teal-200">
                    <strong>Fasilitas Perdagangan:</strong> {customsAdvisory.preferentialTradeAgreements}
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

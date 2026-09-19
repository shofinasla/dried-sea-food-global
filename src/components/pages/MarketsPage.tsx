import React from 'react';
import { 
  Globe2, 
  Ship, 
  Plane, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Anchor,
  Compass,
  Layers
} from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

interface MarketsPageProps {
  onRequestQuote: () => void;
  onNavigateHome: () => void;
}

export default function MarketsPage({ onRequestQuote, onNavigateHome }: MarketsPageProps) {
  const regions = [
    {
      region: 'East Asia & Greater China',
      destinations: ['Hong Kong (Sheung Wan Market)', 'Taiwan (Kaohsiung / Keelung)', 'Japan (Tokyo / Osaka)', 'South Korea (Busan / Incheon)', 'Guangdong (China)'],
      commodities: 'Super White Anchovy (Teri Nasi AAA), Sun-Dried Squid, Dried Shrimp (Ebi), Imperial Fish Maw, Sea Cucumber',
      desc: 'High demand for ultra-clean white anchovies and premium collagen-rich fish maw. Custom bilingual traditional Chinese carton labels provided.'
    },
    {
      region: 'Southeast Asia (ASEAN)',
      destinations: ['Singapore (Jurong Port)', 'Malaysia (Port Klang / Penang)', 'Brunei Darussalam (Muara Port)', 'Thailand (Laem Chabang)'],
      commodities: 'Salted Catfish (Jambal Roti), Dried Spanish Mackerel, Dried Squid, Baby Cuttlefish',
      desc: 'Short transit times (2–4 days from Tanjung Priok). Supported by Form D / AK Certificate of Origin for 0% preferential customs tariff.'
    },
    {
      region: 'Middle East & GCC Countries',
      destinations: ['United Arab Emirates (Jebel Ali, Dubai)', 'Saudi Arabia (Jeddah Islamic Port)', 'Qatar (Hamad Port)', 'Oman (Sohar)'],
      commodities: 'Dried Anchovy, Sun-Dried Prawns, Salted Dried Fish',
      desc: '100% Halal BPJPH certified production lots. Arabic-English dual labeling compliant with GCC standardization organization (GSO) requirements.'
    },
    {
      region: 'North America & Europe',
      destinations: ['United States (Los Angeles / New York)', 'Canada (Vancouver / Toronto)', 'Netherlands (Rotterdam)', 'Australia (Sydney / Melbourne)'],
      commodities: 'Retail-Packaged Dried Anchovy, Dried Salted Catfish, Dried Squid',
      desc: 'Servicing large Asian supermarket chains, diaspora food distributors, and ethnic food wholesalers with US FDA compliant retail vacuum packs.'
    }
  ];

  const departurePorts = [
    {
      port: 'Port of Tanjung Priok (IDTPP) - Jakarta',
      desc: 'Our primary maritime gateway. Daily feeder and direct liner services to Singapore, Hong Kong, Busan, and Shanghai.'
    },
    {
      port: 'Port of Belawan (IDBLW) - North Sumatra',
      desc: 'Strategic northern hub for high-volume Belawan super white anchovy and Malacca Strait catch.'
    },
    {
      port: 'Soekarno-Hatta Int’l Airport (CGK) Cargo',
      desc: 'Dedicated cold and express air cargo dispatch for high-value fish maw, dried sea cucumber, and fast sample couriers.'
    }
  ];

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
            <span className="text-slate-900 font-semibold">Global Markets</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#009bb3] text-xs font-bold uppercase tracking-wider mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Worldwide Shipping & Export Reach</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif-display">
              Export Markets & International Ports
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Supplying international seafood importers, wholesalers, grocery distributors, and food processors across Asia, the Middle East, North America, and Europe.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Market Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((reg, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#009bb3] transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#009bb3] uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#009bb3]" />
                  <span>Trade Corridor #{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif-display leading-snug">{reg.region}</h3>
                
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Regular Ports of Discharge</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{reg.destinations.join(' • ')}</p>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Commodities</span>
                  <p className="text-xs text-[#009bb3] font-semibold mt-0.5">{reg.commodities}</p>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                  {reg.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Customs Compliant
                </span>
                <button
                  onClick={onRequestQuote}
                  className="text-[#009bb3] hover:underline flex items-center gap-1 font-bold"
                >
                  Inquire Freight Rates &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Departure Hubs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-serif-display">
              Indonesian Departure Gateways
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Direct container departures from Indonesia’s major deep-sea terminals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departurePorts.map((dp, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Ship className="w-4 h-4 text-[#009bb3]" />
                  <span>{dp.port}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{dp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black font-serif-display">Looking to Import Indonesian Dried Seafood to Your Country?</h3>
            <p className="text-xs text-slate-300 mt-1">Submit your port of discharge for a detailed CIF ocean freight quotation.</p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3 rounded-xl bg-[#009bb3] hover:bg-[#0d8a9e] text-white font-bold text-xs transition shrink-0 shadow-lg shadow-[#009bb3]/30"
          >
            Get Port-to-Port Quotation
          </button>
        </div>
      </div>
    </div>
  );
}

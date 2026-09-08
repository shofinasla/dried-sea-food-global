import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Ship, 
  Plane, 
  Award, 
  Globe2, 
  Clock, 
  Warehouse, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { COMPANY_STATS, COMPANY_PROFILE, CERTIFICATIONS } from '../data/initialData';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal: () => void;
  onOpenCatalogModal?: () => void;
}

export default function Hero({ onScrollTo, onOpenSSLModal, onOpenCatalogModal }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = [
    {
      title: 'Eksportir Resmi Produk Ikan & Hasil Laut Khas Indonesia',
      badge: 'Indonesian Dried Seafood Exporter',
      subtitle: 'Menyediakan Teri Nasi Super Belawan, Ikan Asin Jambal Roti, Cumi Kering Sero, & Gelembung Ikan (Fish Maw) ke 28+ Negara',
      imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1600&q=85',
      accent: 'amber'
    },
    {
      title: 'Katalog Komoditas Ikan Asin & Teri Medan Super',
      badge: 'Kualitas Nelayan Nusantara',
      subtitle: 'Proses Pengeringan Higienis Solar Dome Tanpa Pemutih Kimiawi, 0% Formalin, & Sertifikasi HACCP KKP RI',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
      accent: 'emerald'
    },
    {
      title: 'Gudang Dehumidified Kering & Laboratorium Mutu Terpadu',
      badge: 'HACCP Grade A & Karantina KKP',
      subtitle: 'Penyimpanan Kelembaban Rendah (<55% RH) Menjaga Tekstur Garing Alami, Bebas Jamur, & Health Certificate Resmi',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      accent: 'blue'
    },
    {
      title: 'Fish Maw (Gelembung Ikan) & Teripang Kering Mewah',
      badge: 'Luxury Seafood Trade',
      subtitle: 'Pengiriman Prioritas Kargo Udara dan Kontainer Laut Bersegel ke Hong Kong, Singapura, Taiwan, & Los Angeles',
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1600&q=85',
      accent: 'purple'
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const iconMap: Record<string, any> = {
    Award,
    Globe2,
    Ship,
    Clock,
    Warehouse,
    ShieldCheck
  };

  return (
    <section id="hero" className="relative pt-6 pb-20 overflow-hidden bg-slate-950 border-b border-slate-800">
      
      {/* Background Visual Carousel Banner with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlideIndex === idx ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-90"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Eksportir Resmi Terdaftar KKP RI & Sertifikat Halal BPJPH</span>
          </div>
          <a
            href={`tel:${COMPANY_PROFILE.hotline}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 text-xs font-bold transition-colors shadow-sm"
          >
            <span>Hotline 24/7: <strong>{COMPANY_PROFILE.hotline}</strong></span>
          </a>
          <button
            onClick={onOpenSSLModal}
            id="hero-ssl-badge"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-600/60 text-emerald-400 text-xs font-bold hover:bg-emerald-900/60 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enkripsi SSL 256-Bit TLS 1.3 Terverifikasi</span>
          </button>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Active Carousel Badge Tag */}
          <div className="inline-block px-4 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
            {heroSlides[currentSlideIndex].badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-serif">
            {heroSlides[currentSlideIndex].title}{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Mutu Ekspor Terbaik
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {heroSlides[currentSlideIndex].subtitle}
          </p>

          {/* Call-to-action buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => onScrollTo('#komoditas')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Lihat Katalog Komoditas Ekspor</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onScrollTo('#kalkulator')}
              id="hero-cta-shipping"
              className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold px-6 py-3.5 rounded-2xl text-sm border border-amber-500/30 hover:border-amber-500 transition-all shadow-lg"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Hitung Ongkir Multi-Kurir Global</span>
            </button>

            <button
              onClick={() => onScrollTo('#kontak')}
              id="hero-cta-rfq"
              className="inline-flex items-center gap-2 bg-slate-950/80 hover:bg-slate-900 text-slate-200 font-semibold px-5 py-3.5 rounded-2xl text-sm border border-slate-700 hover:border-slate-500 transition-all"
            >
              <span>Permintaan RFQ</span>
            </button>
          </div>

          {/* Visual Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlideIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Pindah ke slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Global Trade Routes Live Ticker */}
        <div className="mt-12 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 max-w-4xl mx-auto backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="uppercase tracking-wider">Rute Ekspor Hasil Laut Utama:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-slate-300 font-semibold text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Belawan & Priok ⇄ Sheung Wan Hong Kong</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">✈️ Soekarno-Hatta ⇄ Jurong Singapura & Taipei</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Tanjung Perak ⇄ Los Angeles USA</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">🚢 Tanjung Priok ⇄ Guangzhou & Shenzhen</span>
            </div>
          </div>
        </div>

        {/* Key Operational KPI Metric Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {COMPANY_STATS.map((stat) => {
            const Icon = iconMap[stat.iconName] || Globe2;
            return (
              <div 
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                    {stat.label}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-100 tracking-tight text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Certifications Showcase Ticker */}
        <div className="mt-10 pt-6 border-t border-slate-800/80">
          <p className="text-center text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3">
            Terakreditasi & Tersertifikasi Standar Mutu Ekspor Internasional
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded-xl text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-slate-200">{cert.name}</span>
                <span className="text-slate-400 hidden sm:inline">• {cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

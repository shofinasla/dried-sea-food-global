import { 
  ShieldCheck, 
  Globe2, 
  Ship, 
  Plane, 
  Warehouse, 
  FileCheck, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Heart,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { COMPANY_PROFILE, CERTIFICATIONS } from '../data/initialData';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenSSLModal: () => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onScrollTo, onOpenSSLModal, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-900 py-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Keamanan Transaksi & Data Korporat Terjamin</span>
              <span className="text-[11px] text-slate-400">Enkripsi TLS 1.3 256-Bit • Bersertifikasi ISO 9001:2015, ISO 27001, & AEO Gold</span>
            </div>
          </div>

          <button
            onClick={onOpenSSLModal}
            className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
          >
            Lihat Validasi Sertifikat SSL
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block">
                  DRIED SEAFOOD GLOBAL
                </span>
                <span className="text-[10px] text-amber-400 tracking-widest uppercase font-semibold">
                  INDONESIAN DRIED SEAFOOD EXPORTER
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Eksportir resmi terkemuka hasil laut kering dan ikan asin khas Nusantara. Menghubungkan kekayaan laut Indonesia ke pasar internasional dengan standar higienis HACCP, bebas formalin, dan sertifikasi karantina resmi.
            </p>

            <div className="pt-2 text-xs space-y-1.5">
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{COMPANY_PROFILE.headquarters}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Hotline Korporat 24/7: <strong>{COMPANY_PROFILE.hotline}</strong></span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Permintaan RFQ: <strong>{COMPANY_PROFILE.supportEmail}</strong></span>
              </p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Produk & Layanan</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Ikan Teri Nasi Super Belawan</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Ikan Asin Jambal Roti Cilacap</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Cumi Kering Sero Telur</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Fish Maw (Gelembung Ikan) Gulama</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Teripang Kering Koro Super</button></li>
              <li><button onClick={() => onScrollTo('#alur-ekspor')} className="hover:text-amber-400 transition-colors">Pengurusan Karantina & Health Certificate</button></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Perusahaan</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onScrollTo('#hero')} className="hover:text-amber-400 transition-colors">Beranda</button></li>
              <li><button onClick={() => onScrollTo('#tentang')} className="hover:text-amber-400 transition-colors">Profil & Standar Pengolahan</button></li>
              <li><button onClick={() => onScrollTo('#komoditas')} className="hover:text-amber-400 transition-colors">Katalog Hasil Laut Kering</button></li>
              <li><button onClick={() => onScrollTo('#kalkulator')} className="hover:text-amber-400 transition-colors">Kalkulator Ongkir Global</button></li>
              <li><button onClick={() => onScrollTo('#galeri')} className="hover:text-amber-400 transition-colors">Galeri Foto Sentra Nelayan</button></li>
              <li><button onClick={() => onScrollTo('#lokasi')} className="hover:text-amber-400 transition-colors">Peta Hub & Pelabuhan Muat</button></li>
              <li><button onClick={() => onScrollTo('#kontak')} className="hover:text-amber-400 transition-colors">Permintaan RFQ Ekspor</button></li>
            </ul>
          </div>

          {/* Col 4: Portals & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kepatuhan & Sertifikasi</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenAdmin} className="text-amber-400 hover:underline font-bold">Admin CMS & Trafik Real-Time</button></li>
              <li><button onClick={onOpenSSLModal} className="hover:text-amber-400 transition-colors">Sertifikat Enkripsi SSL TLS 1.3</button></li>
              <li><span className="text-slate-500">HACCP Certified KKP RI</span></li>
              <li><span className="text-slate-500">Halal BPJPH Kemenag RI</span></li>
              <li><span className="text-slate-500">Health Certificate BKIPM Perikanan</span></li>
            </ul>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5 text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs">
          <p>
            © {new Date().getFullYear()} {COMPANY_PROFILE.legalName}. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenSSLModal} className="hover:text-slate-200">Enkripsi SSL</button>
            <span>•</span>
            <button onClick={() => onScrollTo('#kontak')} className="hover:text-slate-200">Kontak Korporat</button>
            <span>•</span>
            <button onClick={onOpenAdmin} className="text-amber-400 hover:underline">Sistem Manajemen Konten</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

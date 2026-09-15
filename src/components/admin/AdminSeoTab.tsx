import { useState, FormEvent } from 'react';
import { 
  Globe2, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  ShieldCheck, 
  FileCode, 
  ExternalLink 
} from 'lucide-react';
import { SeoConfig } from '../../types';

interface AdminSeoTabProps {
  seoConfig: SeoConfig | null;
  onRefresh: () => void;
}

export default function AdminSeoTab({ seoConfig, onRefresh }: AdminSeoTabProps) {
  const [siteTitle, setSiteTitle] = useState(seoConfig?.siteTitle || seoConfig?.metaTitle || 'Dried Seafood Global | Eksportir Ikan Asin Higienis Demak Indonesia');
  const [metaDescription, setMetaDescription] = useState(seoConfig?.metaDescription || 'Eksportir hasil laut dan ikan asin kering higienis standar ekspor dari Demak, Jawa Tengah. Fasilitas pengeringan solar dome, sertifikasi HACCP, lab bebas formalin, melayani pasar B2B global.');
  const [keywords, setKeywords] = useState(
    seoConfig?.keywords?.join(', ') || 
    (Array.isArray(seoConfig?.focusKeywords) ? seoConfig.focusKeywords.join(', ') : '') || 
    'eksportir ikan asin, dried seafood indonesia, salted fish exporter, ikan jambal roti, teri nasi medan, solar dome dryer, haccp seafood'
  );
  const [author, setAuthor] = useState(seoConfig?.author || 'PT Global Maritim Samudera');
  const [canonicalUrl, setCanonicalUrl] = useState(seoConfig?.canonicalUrl || 'https://driedseafoodglobal.com');

  const [saving, setSaving] = useState(false);
  const [optimizingAi, setOptimizingAi] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOptimizeWithAi = async () => {
    setOptimizingAi(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'seo-audit',
          currentTitle: siteTitle,
          currentDescription: metaDescription
        })
      });
      const data = await response.json();
      if (data.success && data.result) {
        if (data.result.title) setSiteTitle(data.result.title);
        if (data.result.metaDescription) setMetaDescription(data.result.metaDescription);
        if (data.result.keywords && Array.isArray(data.result.keywords)) {
          setKeywords(data.result.keywords.join(', '));
        }
        setSuccessMsg('Meta Title dan Description dioptimalkan sesuai algoritma SEO Google & B2B intent!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      setErrorMsg('Gagal memanggil AI SEO Optimizer.');
    } finally {
      setOptimizingAi(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          siteTitle: siteTitle.trim(),
          metaDescription: metaDescription.trim(),
          keywords: keywords.split(',').map(s => s.trim()).filter(Boolean),
          author: author.trim(),
          canonicalUrl: canonicalUrl.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMsg('Pengaturan SEO & Meta Tags berhasil diperbarui!');
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error || 'Gagal menyimpan SEO config.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat menyimpan pengaturan SEO.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-teal-400" />
            <span>Pengaturan SEO & Metadata Global</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola tag pencarian Google, deskripsi SERP, Open Graph sosial media, dan index bot.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOptimizeWithAi}
          disabled={optimizingAi}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{optimizingAi ? 'Mengoptimasi...' : 'Optimasi SEO via AI'}</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SERP Preview Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          <Search className="w-3.5 h-3.5 text-teal-400" />
          <span>Google Search SERP Preview (Desktop)</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <span>{canonicalUrl}</span>
            <span>›</span>
            <span>beranda</span>
          </div>
          <div className="text-base font-semibold text-sky-400 hover:underline cursor-pointer">
            {siteTitle || 'Judul Halaman Belum Diatur'}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {metaDescription || 'Deskripsi meta belum dikonfigurasi.'}
          </p>
        </div>
      </div>

      {/* Form Settings */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300">
              Site Meta Title (Maks 60-70 karakter disarankan)
            </label>
            <span className={`text-[11px] font-mono ${siteTitle.length > 70 ? 'text-amber-400' : 'text-slate-500'}`}>
              {siteTitle.length} karakter
            </span>
          </div>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300">
              Meta Description (Maks 150-160 karakter disarankan)
            </label>
            <span className={`text-[11px] font-mono ${metaDescription.length > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
              {metaDescription.length} karakter
            </span>
          </div>
          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            required
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Target Focus Keywords (pisahkan koma)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Author / Badan Usaha
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Canonical URL
            </label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Security & Robots Information Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="text-slate-200 font-bold">Robots.txt & Sitemap Status</div>
            <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
              Semua halaman publik diindex dengan prioritas 1.0. Portal <code className="text-teal-300">/admin</code> telah diproteksi dengan aturan <code className="text-amber-300">Disallow: /admin</code> dan meta tag <code className="text-amber-300">noindex,nofollow</code> sehingga tidak akan pernah diindex bot pencari.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? 'Menyimpan...' : 'Simpan Konfigurasi SEO'}
          </button>
        </div>
      </form>

    </div>
  );
}

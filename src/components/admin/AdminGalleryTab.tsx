import { useState, FormEvent, ChangeEvent } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Upload, 
  Check, 
  X, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import { GalleryItem } from '../../types';

interface AdminGalleryTabProps {
  galleryItems: GalleryItem[];
  onRefresh: () => void;
}

export default function AdminGalleryTab({ galleryItems, onRefresh }: AdminGalleryTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'processing' | 'commodities' | 'storage' | 'shipping' | 'sustainability'>('processing');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formLocation, setFormLocation] = useState('Hub Semarang, Jawa Tengah');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState('Solar Dome, Higienis, Ekspor');

  const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('File harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 5 MB.');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ dataUrl, filename: file.name })
        });
        const data = await response.json();
        if (data.success) {
          setFormImageUrl(data.url);
          setSuccessMsg('Foto berhasil diunggah!');
          setTimeout(() => setSuccessMsg(null), 3000);
        } else {
          setErrorMsg(data.error || 'Gagal memproses foto.');
        }
      } catch (err) {
        setErrorMsg('Gagal mengunggah foto ke server.');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formTitle.trim() || !formImageUrl.trim()) {
      setErrorMsg('Judul foto dan URL / upload gambar wajib diisi.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: formTitle.trim(),
          category: formCategory,
          imageUrl: formImageUrl.trim(),
          location: formLocation.trim(),
          description: formDescription.trim(),
          tags: formTags.split(',').map(s => s.trim()).filter(Boolean)
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal menambahkan foto ke galeri.');
        setSaving(false);
        return;
      }

      setSuccessMsg('Foto dokumentasi berhasil ditambahkan ke galeri publik!');
      setIsModalOpen(false);
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini dari galeri publik?')) return;
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg('Foto berhasil dihapus.');
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      setErrorMsg('Gagal menghapus foto.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <span>Dokumentasi Galeri Fasilitas & Pengiriman</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dokumentasi autentik fasilitas Solar Dome Dryer, gudang kelembaban rendah, serta pemuatan kontainer ekspor.
          </p>
        </div>

        <button
          onClick={() => {
            setFormTitle('');
            setFormImageUrl('');
            setFormDescription('');
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Foto Baru</span>
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">{item.description}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                title="Hapus Foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PHOTO MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              <span>Tambah Foto Galeri Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Dokumentasi *</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Pemuatan Kontainer Reefer Ekspor"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="processing">Pengolahan & Pengeringan</option>
                    <option value="commodities">Seleksi Komoditas</option>
                    <option value="storage">Gudang & Pengemasan</option>
                    <option value="shipping">Pengiriman & Kontainer</option>
                    <option value="sustainability">Nelayan & Kemitraan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lokasi Fasilitas</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Pelabuhan Tanjung Emas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Penjelasan singkat tentang proses pada foto..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Foto (URL atau Unggah File)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                  />
                  <label className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold shadow-lg"
                >
                  {saving ? 'Menyimpan...' : 'Tambahkan ke Galeri'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

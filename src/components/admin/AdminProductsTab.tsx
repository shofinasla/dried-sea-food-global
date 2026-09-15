import { useState, FormEvent, ChangeEvent } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Upload, 
  Image as ImageIcon,
  AlertCircle, 
  DollarSign, 
  FileText,
  Sparkles,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { ExportCommodity } from '../../types';

interface AdminProductsTabProps {
  commodities: ExportCommodity[];
  onRefresh: () => void;
}

export default function AdminProductsTab({ commodities, onRefresh }: AdminProductsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExportCommodity | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formLatinName, setFormLatinName] = useState('');
  const [formCategory, setFormCategory] = useState('ikan-asin');
  const [formSku, setFormSku] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriceUSD, setFormPriceUSD] = useState<number>(12);
  const [formPriceIDR, setFormPriceIDR] = useState<number>(185000);
  const [formMoq, setFormMoq] = useState<number>(50);
  const [formImage, setFormImage] = useState('');
  const [formHsCode, setFormHsCode] = useState('0305.59.00');
  const [formOrigin, setFormOrigin] = useState('Pelabuhan Tanjung Emas, Jawa Tengah');
  const [formMoisture, setFormMoisture] = useState('< 15% (Ekspor Standar)');
  const [formSalt, setFormSalt] = useState('4 - 8% (Rendah Bau)');
  const [formShelfLife, setFormShelfLife] = useState('12 - 18 Bulan');
  const [formPackaging, setFormPackaging] = useState('Vacuum Pack 500g / 1kg / Bulk Master Carton 10kg');
  const [formCertificates, setFormCertificates] = useState<string[]>(['HACCP Grade A', 'Health Certificate KKP RI', 'Certificate of Origin (COO)']);
  const [formIsPublished, setFormIsPublished] = useState(true);

  const categoriesList = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'ikan-asin', label: 'Ikan Asin Kering' },
    { id: 'teri-nasi', label: 'Teri Nasi Medan' },
    { id: 'cumi-kering', label: 'Cumi Kering' },
    { id: 'fish-maw', label: 'Fish Maw (Gelembung Ikan)' },
    { id: 'olahan-laut', label: 'Hasil Laut Asap & Lainnya' }
  ];

  const availableCerts = [
    'HACCP Grade A',
    'Health Certificate KKP RI',
    'Certificate of Origin (COO)',
    'Halal Indonesia',
    'BPOM RI',
    'Lab Test Free Formalin',
    'FDA Export Compliant'
  ];

  const filteredItems = commodities.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormLatinName('');
    setFormCategory('ikan-asin');
    setFormSku(`DSG-PRD-${Math.floor(100 + Math.random() * 900)}`);
    setFormDescription('');
    setFormPriceUSD(12);
    setFormPriceIDR(185000);
    setFormMoq(50);
    setFormImage('https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80');
    setFormHsCode('0305.59.00');
    setFormOrigin('Pelabuhan Tanjung Emas, Jawa Tengah');
    setFormMoisture('< 15% (Ekspor Standar)');
    setFormSalt('4 - 8% (Sesuai Standar KKP)');
    setFormShelfLife('12 - 18 Bulan');
    setFormPackaging('Vacuum Pack 500g / 1kg / Master Carton 10kg');
    setFormCertificates(['HACCP Grade A', 'Health Certificate KKP RI', 'Certificate of Origin (COO)']);
    setFormIsPublished(true);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExportCommodity) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormLatinName(item.latinName);
    setFormCategory(item.category);
    setFormSku(item.sku || `DSG-${item.id.toUpperCase()}`);
    setFormDescription(item.description);
    setFormPriceUSD(item.priceUSDPerKg);
    setFormPriceIDR(item.priceIDRPerKg);
    setFormMoq(item.moqKg);
    setFormImage(item.image);
    setFormHsCode(item.hsCode || '0305.59.00');
    setFormOrigin(item.specifications?.origin || 'Pelabuhan Tanjung Emas, Semarang');
    setFormMoisture(item.specifications?.moistureContent || '< 15%');
    setFormSalt(item.specifications?.saltContent || '5 - 8%');
    setFormShelfLife(item.specifications?.shelfLife || '12 Bulan');
    setFormPackaging(
      Array.isArray(item.packaging) 
        ? item.packaging.join(', ') 
        : (item.packaging || (typeof item.specification?.packaging === 'string' ? item.specification.packaging : 'Master Carton 10kg'))
    );
    setFormCertificates(item.certifications || ['HACCP Grade A', 'Health Certificate KKP RI']);
    setFormIsPublished(item.isPublished !== false);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('File yang diunggah harus berformat gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file gambar maksimal 5 MB.');
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
          setFormImage(data.url);
          setSuccessMsg('Gambar berhasil diunggah!');
          setTimeout(() => setSuccessMsg(null), 3000);
        } else {
          setErrorMsg(data.error || 'Gagal memproses gambar.');
        }
      } catch (err) {
        setErrorMsg('Gagal mengunggah gambar ke server.');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleCertificate = (cert: string) => {
    if (formCertificates.includes(cert)) {
      setFormCertificates(formCertificates.filter(c => c !== cert));
    } else {
      setFormCertificates([...formCertificates, cert]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formName.trim() || !formDescription.trim()) {
      setErrorMsg('Nama komoditas dan deskripsi wajib diisi.');
      return;
    }

    setSaving(true);

    const payload = {
      name: formName.trim(),
      latinName: formLatinName.trim() || formName.trim(),
      category: formCategory,
      sku: formSku.trim(),
      description: formDescription.trim(),
      priceUSDPerKg: Number(formPriceUSD) || 10,
      priceIDRPerKg: Number(formPriceIDR) || 160000,
      moqKg: Number(formMoq) || 25,
      image: formImage.trim() || 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
      hsCode: formHsCode.trim(),
      specifications: {
        moistureContent: formMoisture.trim(),
        saltContent: formSalt.trim(),
        shelfLife: formShelfLife.trim(),
        origin: formOrigin.trim(),
        dryingMethod: 'Solar Dome Dryer & Higienis 100%'
      },
      packaging: formPackaging.split(',').map(s => s.trim()).filter(Boolean),
      certifications: formCertificates,
      isPublished: formIsPublished
    };

    try {
      let response;
      if (editingItem) {
        response = await fetch(`/api/admin/products/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal menyimpan data komoditas.');
        setSaving(false);
        return;
      }

      setSuccessMsg(editingItem ? 'Komoditas berhasil diperbarui!' : 'Komoditas baru berhasil ditambahkan!');
      setIsModalOpen(false);
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan saat menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg('Komoditas berhasil dihapus dari katalog.');
        setDeleteConfirmId(null);
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error || 'Gagal menghapus komoditas.');
      }
    } catch (err) {
      setErrorMsg('Gagal menghapus komoditas.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-400" />
            <span>Manajemen Komoditas Ekspor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola spesifikasi kadar air, garam, sertifikasi, harga ekspor USD/IDR, dan status katalog.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Komoditas Baru</span>
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

      {/* Filters & Search Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, latin, SKU, atau spek..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Commodity Table / Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Komoditas & SKU</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Harga & MOQ</th>
                <th className="py-3.5 px-4">Spesifikasi</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    Tidak ada komoditas yang sesuai dengan pencarian/kategori.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Commodity Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700 shrink-0" 
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm truncate">{item.name}</div>
                          <div className="text-[11px] text-slate-400 italic truncate">{item.latinName}</div>
                          <div className="text-[10px] text-teal-400 font-mono mt-0.5">{item.sku || `SKU: ${item.id}`}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-teal-400 font-bold text-sm">${item.priceUSDPerKg}/kg</div>
                      <div className="text-[11px] text-slate-400">Rp {item.priceIDRPerKg.toLocaleString('id-ID')}/kg</div>
                      <div className="text-[10px] text-slate-500">MOQ: {item.moqKg} kg</div>
                    </td>

                    {/* Specs */}
                    <td className="py-3.5 px-4">
                      <div className="text-[11px] text-slate-300">Air: {item.specifications?.moistureContent || '<15%'}</div>
                      <div className="text-[11px] text-slate-400">Garam: {item.specifications?.saltContent || '4-8%'}</div>
                      <div className="text-[10px] text-slate-500">Simpan: {item.specifications?.shelfLife || '12 Bln'}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {item.isPublished !== false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                          <Check className="w-3 h-3" />
                          <span>Publik</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold">
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Komoditas"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                          title="Hapus Komoditas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-400" />
                <span>{editingItem ? 'Edit Komoditas Ekspor' : 'Tambah Komoditas Ekspor Baru'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lengkapi seluruh data teknis agar spesifikasi komoditas siap ditampilkan kepada pembeli B2B internasional.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Latin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Komoditas (Indonesia) *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Ikan Asin Jambal Roti Super"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Latin / Biologis
                  </label>
                  <input
                    type="text"
                    value={formLatinName}
                    onChange={(e) => setFormLatinName(e.target.value)}
                    placeholder="Contoh: Arius thalassinus"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500 italic"
                  />
                </div>
              </div>

              {/* Row 2: Category & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori Komoditas
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="ikan-asin">Ikan Asin Kering</option>
                    <option value="teri-nasi">Teri Nasi Medan</option>
                    <option value="cumi-kering">Cumi Kering</option>
                    <option value="fish-maw">Fish Maw (Gelembung Ikan)</option>
                    <option value="olahan-laut">Hasil Laut Asap & Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kode SKU / Batch Ref
                  </label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    placeholder="DSG-PRD-101"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi & Keunggulan Mutu *
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Jelaskan tekstur daging, higienitas pengeringan solar dome, bebas pengawet berbahaya, dan daya tahan ekspor..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500 leading-relaxed"
                />
              </div>

              {/* Row 3: Pricing & MOQ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Harga USD / kg
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formPriceUSD}
                    onChange={(e) => setFormPriceUSD(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Harga IDR / kg
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={formPriceIDR}
                    onChange={(e) => setFormPriceIDR(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    MOQ (Minimum Order kg)
                  </label>
                  <input
                    type="number"
                    value={formMoq}
                    onChange={(e) => setFormMoq(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Row 4: Specs Moisture, Salt, Shelf Life, HS Code */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Kadar Air
                  </label>
                  <input
                    type="text"
                    value={formMoisture}
                    onChange={(e) => setFormMoisture(e.target.value)}
                    placeholder="< 15%"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Kadar Garam
                  </label>
                  <input
                    type="text"
                    value={formSalt}
                    onChange={(e) => setFormSalt(e.target.value)}
                    placeholder="4 - 8%"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Masa Simpan
                  </label>
                  <input
                    type="text"
                    value={formShelfLife}
                    onChange={(e) => setFormShelfLife(e.target.value)}
                    placeholder="12 - 18 Bln"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    HS Code Ekspor
                  </label>
                  <input
                    type="text"
                    value={formHsCode}
                    onChange={(e) => setFormHsCode(e.target.value)}
                    placeholder="0305.59.00"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Packaging & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Spesifikasi Kemasan (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={formPackaging}
                    onChange={(e) => setFormPackaging(e.target.value)}
                    placeholder="Vacuum 500g, Vacuum 1kg, Master Carton 10kg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hub Asal / Pelabuhan Muat
                  </label>
                  <input
                    type="text"
                    value={formOrigin}
                    onChange={(e) => setFormOrigin(e.target.value)}
                    placeholder="Tanjung Emas Semarang / Tanjung Priok Jakarta"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Image URL & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Foto Komoditas (URL atau Unggah File)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500 font-mono"
                  />
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Mengunggah...' : 'Pilih File'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileUpload}
                      className="hidden" 
                    />
                  </label>
                </div>
                {formImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img 
                      src={formImage} 
                      alt="Preview" 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-800" 
                    />
                    <span className="text-[11px] text-slate-400">Preview foto komoditas</span>
                  </div>
                )}
              </div>

              {/* Certifications Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Sertifikasi Kepatuhan Ekspor
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableCerts.map((cert) => {
                    const isChecked = formCertificates.includes(cert);
                    return (
                      <button
                        type="button"
                        key={cert}
                        onClick={() => toggleCertificate(cert)}
                        className={`p-2 rounded-xl text-[11px] font-semibold text-left border flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-teal-500/10 border-teal-500 text-teal-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <span className="truncate">{cert}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Status Publikasi Katalog</div>
                  <div className="text-[11px] text-slate-400">Jika aktif, komoditas langsung tampil di halaman depan website.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsPublished(!formIsPublished)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    formIsPublished ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    formIsPublished ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{editingItem ? 'Simpan Perubahan' : 'Terbitkan Komoditas'}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Hapus Komoditas Ekspor?</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Tindakan ini akan menghapus komoditas dari katalog publik website dan API RFQ.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

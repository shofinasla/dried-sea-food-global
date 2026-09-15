import { useState, FormEvent, ChangeEvent } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Upload, 
  AlertCircle, 
  Sparkles, 
  Tag, 
  Eye, 
  Clock, 
  User, 
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { BlogPost } from '../../types';
import { normalizeBlogCategory } from '../../i18n/categoryLabels';

interface AdminArticlesTabProps {
  blogPosts: BlogPost[];
  onRefresh: () => void;
}

export default function AdminArticlesTab({ blogPosts, onRefresh }: AdminArticlesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'write' | 'preview'>('write');

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formCategory, setFormCategory] = useState('ekspor-pasar');
  const [formAuthorName, setFormAuthorName] = useState('Tim Riset Dried Seafood Global');
  const [formAuthorRole, setFormAuthorRole] = useState('Fisheries Trade Analyst');
  const [formTags, setFormTags] = useState('Dried Seafood, Ekspor Ikan Asin, HACCP, BKIPM');
  const [formReadTime, setFormReadTime] = useState('5 menit baca');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDescription, setFormMetaDescription] = useState('');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'ekspor-pasar', label: 'Ekspor & Pasar' },
    { id: 'teknologi-pengolahan', label: 'Teknologi Pengolahan' },
    { id: 'regulasi-sertifikasi', label: 'Regulasi & Sertifikasi' },
    { id: 'kualitas-higienitas', label: 'Kualitas & Higienitas' },
    { id: 'nelayan-keberlanjutan', label: 'Nelayan & Keberlanjutan' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const postNorm = normalizeBlogCategory(post.category);
    const selNorm = selectedCategory === 'all' ? null : normalizeBlogCategory(selectedCategory);
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory || (selNorm && postNorm.slug === selNorm.slug);
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormContent(`### Standar Mutu Ekspor Hasil Laut Kering Indonesia

Dalam lanskap perdagangan hasil laut internasional, sertifikasi higienis dan konsistensi kadar air menjadi faktor utama penerimaan di pasar ekspor seperti Taiwan, Singapura, Amerika Serikat, dan Uni Emirat Arab.

#### 1. Keunggulan Solar Dome Dryer
* Pengeringan tertutup bebas debu, lalat, dan kontaminasi udara.
* Suhu terukur menjaga protein dan tekstur daging tetap kenyal.

#### 2. Kepatuhan Standar Karantina
* Memenuhi batas uji mikrobiologi bebas Salmonella dan E. coli.
* Sertifikasi Health Certificate resmi BKIPM KKP RI.`);
    setFormCoverImage('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80');
    setFormCategory('ekspor-pasar');
    setFormAuthorName('Tim Redaksi Dried Seafood Global');
    setFormAuthorRole('Fisheries & Export Intelligence');
    setFormTags('Ekspor Ikan Asin, Solar Dome Dryer, HACCP, Pasar B2B');
    setFormReadTime('5 menit baca');
    setFormStatus('published');
    setFormFeatured(false);
    setFormMetaTitle('');
    setFormMetaDescription('');
    setErrorMsg(null);
    setActiveViewMode('write');
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug || generateSlug(post.title));
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormCoverImage(post.coverImage);
    setFormCategory(normalizeBlogCategory(post.category).slug || 'ekspor-pasar');
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormTags(post.tags.join(', '));
    setFormReadTime(post.readTime);
    setFormStatus(post.status || 'published');
    setFormFeatured(Boolean(post.featured));
    setFormMetaTitle(post.metaTitle || post.title);
    setFormMetaDescription(post.metaDescription || post.excerpt);
    setErrorMsg(null);
    setActiveViewMode('write');
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      setFormSlug(generateSlug(val));
    }
  };

  const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format file harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file cover maksimal 5 MB.');
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
          setFormCoverImage(data.url);
          setSuccessMsg('Cover artikel berhasil diunggah!');
          setTimeout(() => setSuccessMsg(null), 3000);
        } else {
          setErrorMsg(data.error || 'Gagal memproses gambar.');
        }
      } catch (err) {
        setErrorMsg('Gagal mengunggah cover ke server.');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateWithAi = async () => {
    if (!formTitle.trim()) {
      setErrorMsg('Masukkan topik atau draft judul artikel terlebih dahulu.');
      return;
    }

    setGeneratingAi(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate-blog',
          topic: formTitle,
          targetAudience: 'Importir Asia, Pembeli Diaspora Pangan, Distributor Seafood'
        })
      });

      const data = await response.json();
      if (data.success && data.result) {
        const res = data.result;
        if (res.title) setFormTitle(res.title);
        if (res.title) setFormSlug(generateSlug(res.title));
        if (res.excerpt) setFormExcerpt(res.excerpt);
        if (res.content) setFormContent(res.content);
        if (res.category) setFormCategory(res.category);
        if (res.tags && Array.isArray(res.tags)) setFormTags(res.tags.join(', '));
        if (res.readTime) setFormReadTime(res.readTime);
        setSuccessMsg('Konten artikel & wawasan berhasil digenerate oleh Gemini AI!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      setErrorMsg('Gagal memanggil asisten AI.');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formTitle.trim() || !formContent.trim()) {
      setErrorMsg('Judul dan isi artikel wajib diisi.');
      return;
    }

    setSaving(true);

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || generateSlug(formTitle),
      excerpt: formExcerpt.trim() || formContent.substring(0, 160) + '...',
      content: formContent.trim(),
      coverImage: formCoverImage.trim() || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      category: formCategory,
      author: {
        name: formAuthorName.trim() || 'Tim Riset Dried Seafood Global',
        role: formAuthorRole.trim() || 'Fisheries Intelligence',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      tags: formTags.split(',').map(s => s.trim()).filter(Boolean),
      readTime: formReadTime.trim() || '4 menit baca',
      status: formStatus,
      featured: formFeatured,
      metaTitle: formMetaTitle.trim() || formTitle.trim(),
      metaDescription: formMetaDescription.trim() || formExcerpt.trim()
    };

    try {
      let response;
      if (editingPost) {
        response = await fetch(`/api/admin/articles/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error || 'Gagal menyimpan artikel.');
        setSaving(false);
        return;
      }

      setSuccessMsg(editingPost ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!');
      setIsModalOpen(false);
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan saat menyimpan artikel.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg('Artikel berhasil dihapus.');
        setDeleteConfirmId(null);
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error || 'Gagal menghapus artikel.');
      }
    } catch (err) {
      setErrorMsg('Gagal menghapus artikel.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>Manajemen Artikel & Wawasan Ekspor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Publikasikan panduan regulasi ekspor, teknologi solar dome, standar mutu HACCP, dan wawasan pasar global.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
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

      {/* Filters & Search */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, tag, atau topik..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Judul Artikel & Tanggal</th>
                <th className="py-3.5 px-4">Kategori & Tag</th>
                <th className="py-3.5 px-4">Penulis</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    Tidak ada artikel yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Article Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700 shrink-0" 
                        />
                        <div className="min-w-0 max-w-md">
                          <div className="font-bold text-white text-sm truncate flex items-center gap-2">
                            <span>{post.title}</span>
                            {post.featured && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">{post.excerpt}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{post.publishedAt} • {post.readTime}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Tags */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-sky-400 text-[11px] mb-1">
                        {normalizeBlogCategory(post.category).label}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium text-[11px]">{post.author.name}</div>
                      <div className="text-slate-500 text-[10px]">{post.author.role}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {post.status !== 'draft' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                          <Check className="w-3 h-3" />
                          <span>Publik</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(post.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                          title="Hapus Artikel"
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

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-10">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span>{editingPost ? 'Edit Artikel Wawasan' : 'Tulis Artikel Wawasan Baru'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Format konten mendukung heading Markdown (###), bullet points (*), dan tips teknis.
                </p>
              </div>

              {/* Gemini AI Auto-Drafter Button */}
              <button
                type="button"
                onClick={handleGenerateWithAi}
                disabled={generatingAi}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{generatingAi ? 'Menulis via AI...' : 'Tulis Otomatis via AI'}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Contoh: Standar Higienitas Solar Dome Dryer Ekspor Ikan Asin"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="standar-higienitas-solar-dome-dryer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-sky-500 text-slate-300"
                  />
                </div>
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="ekspor-pasar">Ekspor & Pasar</option>
                    <option value="teknologi-pengolahan">Teknologi Pengolahan</option>
                    <option value="regulasi-sertifikasi">Regulasi & Sertifikasi</option>
                    <option value="kualitas-higienitas">Kualitas & Higienitas</option>
                    <option value="nelayan-keberlanjutan">Nelayan & Keberlanjutan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimasi Waktu Baca
                  </label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="5 menit baca"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as 'published' | 'draft')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="published">Langsung Publikasikan (Live)</option>
                    <option value="draft">Simpan sebagai Draft</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ringkasan / Excerpt (untuk preview & meta search)
                </label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Ringkasan 2 kalimat tentang topik artikel..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>

              {/* Content Editor with Write / Preview Tabs */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Isi Konten Artikel (Markdown) *
                  </label>
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveViewMode('write')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        activeViewMode === 'write' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveViewMode('preview')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        activeViewMode === 'preview' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {activeViewMode === 'write' ? (
                  <textarea
                    rows={10}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Gunakan Markdown: ### Heading, * Poin-poin, **teks tebal**..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-sky-500"
                  />
                ) : (
                  <div className="w-full min-h-[200px] max-h-[300px] overflow-y-auto px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed space-y-3 prose prose-invert">
                    <div className="whitespace-pre-wrap font-sans">
                      {formContent}
                    </div>
                  </div>
                )}
              </div>

              {/* Cover Image URL & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Foto Cover Artikel
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 font-mono"
                  />
                  <label className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Mengunggah...' : 'Unggah Cover'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileUpload}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Author & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Jabatan / Role Penulis
                  </label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tags (pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Ekspor, HACCP, Ikan Asin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Jadikan Artikel Unggulan (Featured Post)</div>
                  <div className="text-[11px] text-slate-400">Artikel akan disorot pada header utama blog publik.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormFeatured(!formFeatured)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    formFeatured ? 'bg-sky-500' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    formFeatured ? 'left-7' : 'left-1'
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
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-lg shadow-sky-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{editingPost ? 'Simpan Perubahan' : 'Terbitkan Artikel'}</span>
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
            <h3 className="text-base font-bold text-white mb-2">Hapus Artikel Wawasan?</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Tindakan ini akan menghapus artikel dari blog publik website.
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

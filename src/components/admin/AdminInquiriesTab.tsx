import { useState } from 'react';
import { 
  Mail, 
  Search, 
  Check, 
  X, 
  Trash2, 
  Clock, 
  Building2, 
  Globe2, 
  Phone, 
  Package, 
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { ExportInquiry } from '../../types';

interface AdminInquiriesTabProps {
  inquiries: ExportInquiry[];
  onRefresh: () => void;
}

export default function AdminInquiriesTab({ inquiries, onRefresh }: AdminInquiriesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ExportInquiry | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const filteredInquiries = inquiries.filter(item => {
    const matchesStatus = selectedStatus === 'all' || (item.status || 'new') === selectedStatus;
    const matchesSearch = searchQuery === '' ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg(`Status inquiry diperbarui ke '${newStatus}'.`);
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error || 'Gagal memperbarui status inquiry.');
      }
    } catch (err) {
      setErrorMsg('Gagal memperbarui status inquiry.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus inquiry ini dari arsip?')) return;
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg('Inquiry berhasil dihapus.');
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        onRefresh();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      setErrorMsg('Gagal menghapus inquiry.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Permintaan RFQ & Pembeli B2B</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar penawaran harga komoditas dan inquiry resmi dari importir dan distributor global.
          </p>
        </div>
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

      {/* Search & Status Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari perusahaan, negara, komoditas..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Semua Status' },
            { id: 'new', label: 'Baru (New)' },
            { id: 'in_review', label: 'Sedang Direview' },
            { id: 'quoted', label: 'Penawaran Dikirim' },
            { id: 'closed', label: 'Selesai / Deal' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatus === st.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Perusahaan & Kontak</th>
                <th className="py-3.5 px-4">Negara Tujuan</th>
                <th className="py-3.5 px-4">Komoditas & Volume</th>
                <th className="py-3.5 px-4">Status & Tanggal</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    Tidak ada inquiry yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Company & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{inq.companyName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{inq.contactPerson}</span>
                        <span>•</span>
                        <span className="text-teal-400 font-mono">{inq.email}</span>
                      </div>
                    </td>

                    {/* Destination Country */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
                        <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>{inq.destinationCountry}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Incoterms: {inq.shippingTerms}</div>
                    </td>

                    {/* Commodity & Volume */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-teal-300">{inq.commodity}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Vol: {inq.volumeTons} {typeof inq.volumeTons === 'number' ? 'Ton' : ''}
                      </div>
                    </td>

                    {/* Status & Date */}
                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status || 'new'}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          inq.status === 'quoted' 
                            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                            : inq.status === 'closed'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : inq.status === 'in_review'
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        <option value="new" className="bg-slate-900 text-amber-400">Baru (New)</option>
                        <option value="in_review" className="bg-slate-900 text-purple-400">Sedang Direview</option>
                        <option value="quoted" className="bg-slate-900 text-sky-400">Penawaran Dikirim</option>
                        <option value="closed" className="bg-slate-900 text-emerald-400">Selesai / Deal</option>
                      </select>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">{inq.submittedAt}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white transition-colors cursor-pointer"
                          title="Lihat Detail RFQ"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                          title="Hapus Inquiry"
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

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase font-bold">
                {selectedInquiry.id}
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                {selectedInquiry.companyName}
              </h3>
              <p className="text-xs text-slate-400">Diajukan pada {selectedInquiry.submittedAt}</p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Kontak:</span>
                <span className="font-bold text-white">{selectedInquiry.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-teal-400 font-mono hover:underline">{selectedInquiry.email}</a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Telepon / WhatsApp:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="text-slate-200 font-mono hover:underline">{selectedInquiry.phone}</a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Negara Tujuan:</span>
                <span className="font-bold text-sky-400">{selectedInquiry.destinationCountry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Komoditas:</span>
                <span className="font-bold text-teal-300">{selectedInquiry.commodity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Volume:</span>
                <span className="font-mono text-white">{selectedInquiry.volumeTons} {typeof selectedInquiry.volumeTons === 'number' ? 'Ton' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Incoterms:</span>
                <span className="font-bold text-slate-300">{selectedInquiry.shippingTerms}</span>
              </div>
              {selectedInquiry.notes && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Catatan Tambahan Pembeli:</span>
                  <p className="text-slate-200 text-xs bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                    {selectedInquiry.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Official%20Export%20Quotation%20-%20Dried%20Seafood%20Global`}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Balas via Email Resmi</span>
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import { 
  BlogPost, 
  GalleryItem, 
  OfficeLocation, 
  ServiceItem, 
  CompanyLeader, 
  CompanyStat, 
  CountryInfo, 
  CourierOption,
  SEOSettings,
  ContactInquiry,
  ExportCommodity,
  ExportWorkflowStep,
  BuyerTestimonial
} from '../types';

export const COMPANY_PROFILE = {
  name: 'Dried Seafood Global',
  legalName: 'PT Dried Seafood Global Indonesia',
  shortName: 'Dried Seafood Global',
  tagline: 'Supplying Indonesia\'s Finest Dried Seafood & Heritage Marine Products Worldwide',
  description: 'Perusahaan eksportir terkemuka produk ikan asin, teri nasi super, cumi kering, gelembung ikan (fish maw), dan hasil laut kering khas Nusantara dengan sertifikasi HACCP, KKP, dan standar karantina perikanan internasional.',
  foundedYear: 2014,
  headquarters: 'Kawasan Industri & Pelabuhan Perikanan Samudera Jakarta, Jl. Muara Baru Raya No. 88, Jakarta Utara 14440, Indonesia',
  hotline: '+62 889-8558-2838',
  internationalPhone: '+62 889-8558-2838',
  supportEmail: 'info@driedseafoodglobal.com',
  salesEmail: 'info@driedseafoodglobal.com',
  workingHours: 'Senin - Sabtu: 08:00 - 18:00 WIB (Hotline Korporat 24/7 Siap Melayani)',
  taxId: '02.768.914.5-043.000',
  registrationNo: 'AHU-0034189.AH.01.01.TAHUN 2014',
  sslVerification: 'DigiCert High-Assurance TLS 1.3 Extended Validation (EV) 256-Bit SHA-384',
};

export const COMPANY_STATS: CompanyStat[] = [
  {
    id: 'exp',
    label: 'Tahun Pengalaman',
    value: '12+',
    subtext: 'Sejak 2014 di industri perikanan',
    iconName: 'Award'
  },
  {
    id: 'countries',
    label: 'Negara Destinasi Ekspor',
    value: '28+',
    subtext: 'Asia Timur, ASEAN, USA, & Timur Tengah',
    iconName: 'Globe2'
  },
  {
    id: 'shipments',
    label: 'Ikan Kering Diekspor / Thn',
    value: '3.800+ Ton',
    subtext: 'Kontainer FCL & kargo udara ekspor',
    iconName: 'Ship'
  },
  {
    id: 'ontime',
    label: 'Kepatuhan Karantina & Mutu',
    value: '100% Lolos',
    subtext: 'Sertifikat Kesehatan BKIPM KKP',
    iconName: 'Clock'
  },
  {
    id: 'warehouses',
    label: 'Fasilitas Dehumidified Storage',
    value: '18.500 m²',
    subtext: 'Gudang kering steril & cold storage',
    iconName: 'Warehouse'
  },
  {
    id: 'satisfaction',
    label: 'Kepuasan Importir Global',
    value: '4.98 / 5',
    subtext: 'Dipercaya 200+ pembeli grosir B2B',
    iconName: 'ShieldCheck'
  }
];

export const CERTIFICATIONS = [
  { name: 'HACCP Grade A', issuer: 'Kementerian Kelautan & Perikanan RI', desc: 'Hazard Analysis Critical Control Point Sertifikasi Resmi' },
  { name: 'Health Certificate (HC)', issuer: 'BKIPM KKP RI', desc: 'Sertifikat Mutu & Kesehatan Ikan Ekspor Internasional' },
  { name: 'SKP KKP RI', issuer: 'Ditjen PDSPKP KKP', desc: 'Sertifikat Kelayakan Pengolahan Ikan Standar Ekspor' },
  { name: 'US FDA Seafood Facility', issuer: 'US Food and Drug Administration', desc: 'Terdaftar Resmi Fasilitas Pengolahan Hasil Laut AS' },
  { name: 'Sertifikat Halal BPJPH', issuer: 'Badan Penyelenggara Jaminan Produk Halal', desc: 'Halal Indonesia Terverifikasi untuk Produk Pangan' },
  { name: 'ISO 22000:2018', issuer: 'SGS International', desc: 'Food Safety Management Systems Standard' }
];

export const LEADERSHIP_TEAM: CompanyLeader[] = [
  {
    id: 'c1',
    name: 'Ir. H. Bambang Priyono',
    role: 'Founder & Chief Executive Officer',
    bio: 'Lebih dari 20 tahun mendedikasikan karir dalam modernisasi rantai pasok perikanan tangkap dan pengeringan higienis komoditas ikan khas Nusantara.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'c2',
    name: 'Dr. Rina Kusuma, S.Pi., M.Si.',
    role: 'Head of Quality Assurance & Quarantine Compliance',
    bio: 'Pakar mikrobiologi hasil perikanan alumni IPB. Bertanggung jawab atas pengujian residu histamin, kadar air standar ekspor, dan sertifikasi karantina BKIPM.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'c3',
    name: 'Kenneth Chen',
    role: 'Director of Asian Seafood Trade & Global RFQ',
    bio: 'Berpengalaman 15 tahun di pasar perdagangan dried seafood Hong Kong, Guangzhou, dan Taipei dalam menjembatani importir tier-1 dengan nelayan Indonesia.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'c4',
    name: 'Hendra Tanudjaja, S.T.',
    role: 'Director of Marine Logistics & Dehumidified Supply Chain',
    bio: 'Spesialis sistem pengeringan solar dome ramah lingkungan, penyimpanan dehumidified, dan pengapalan kontainer reefer/dry berkelembaban terkontrol.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    linkedin: 'https://linkedin.com'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ocean-freight-dry',
    title: 'Ekspor Kontainer Kering Berkelembaban Terkontrol (FCL & LCL)',
    category: 'Kontainer Ekspor Laut',
    icon: 'Ship',
    summary: 'Pengiriman kontainer penuh (FCL) dan konsolidasi (LCL) dengan sirkulasi udara dan moisture absorber desiccant food-grade khusus dried seafood.',
    description: 'Menjaga kerenyahan, warna asli, dan aroma alami ikan asin serta teri nasi selama pelayaran lintas samudra menuju pelabuhan Hong Kong, Kaohsiung, Port Klang, Tokyo, Rotterdam, dan Los Angeles.',
    features: [
      'Full Container Load (FCL) & Less than Container Load (LCL)',
      'Aplikasi Food-Grade Desiccant Gel & Moisture Barrier Film',
      'Door-to-Port, CIF, FOB, dan CNF Global Incoterms 2020',
      'Asuransi Maritim Kargo Marine Cargo All-Risk Protection'
    ],
    metrics: [
      { label: 'Kapasitas Ekspor', value: '350+ Kontainer / Thn' },
      { label: 'Jaringan Pelabuhan', value: '45+ Pelabuhan Dunia' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'air-freight-premium',
    title: 'Pengiriman Udara Prioritas (Air Cargo Fish Maw & Ebi)',
    category: 'Kargo Udara Kilat',
    icon: 'Plane',
    summary: 'Layanan kargo udara kilat khusus komoditas laut bernilai tinggi seperti Gelembung Ikan (Fish Maw) pilihan, Teripang kering, dan Udang Ebi super.',
    description: 'Didukung kemasan kedap udara anti-lembab berlapis dengan segel keamanan tamper-evident. Pengiriman langsung dari Soekarno-Hatta (CGK) ke Changi, HKG, Baiyun, dan Narita dalam 24-48 jam.',
    features: [
      'Layanan Priority Air Freight Sameday / Nextday Transit',
      'Pengemasan Tamper-Evident High-Value Cargo Escort',
      'Pemeriksaan X-Ray Karantina Cepat Bandara Internasional',
      'Handling Khusus Komoditas Seafood Kering Mewah'
    ],
    metrics: [
      { label: 'Waktu Transit', value: '24 - 48 Jam Asia' },
      { label: 'Maskapai Rekanan', value: '20+ Global Cargo Lines' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'smart-dehumidified-storage',
    title: 'Pergudangan Higienis & Dehumidified Storage Berstandar HACCP',
    category: 'Fasilitas & Penyimpanan',
    icon: 'Warehouse',
    summary: 'Fasilitas penyimpanan terstandarisasi dengan kontrol kelembaban udara (RH < 55%) dan temperatur stabil untuk menjaga daya tahan produk.',
    description: 'Terletak strategis di Kawasan Industri Muara Baru dan Marunda. Dilengkapi filter udara HEPA, sistem penolak hama terakreditasi (pest-control), serta manajemen palet higienis berbahan plastik food-grade.',
    features: [
      'Dehumidifier Otomatis dengan Monitoring RH Real-Time',
      'Sertifikasi Kelayakan Pengolahan (SKP) dari KKP RI',
      'Cold Storage Pendukung (-18°C) untuk Bahan Baku Segar',
      'Sistem Barcode Batch Traceability & Lot Numbering'
    ],
    metrics: [
      { label: 'Total Area Gudang', value: '18.500 m²' },
      { label: 'Kelembaban Terjaga', value: '< 55% RH Stabil' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'customs-quarantine',
    title: 'Karantina Perikanan & Kepatuhan Dokumen Ekspor Internasional',
    category: 'Karantina & Regulasi',
    icon: 'FileCheck',
    summary: 'Pengurusan sertifikasi resmi ekspor perikanan mencakup Health Certificate BKIPM, COO Form E/D/AK, dan PEB Jalur Hijau Bea Cukai.',
    description: 'Kami menjamin setiap kontainer dan koli kargo disertai dokumen karantina resmi dari Badan Pengendalian dan Pengawasan Mutu Hasil Kelautan dan Perikanan (BPPMHKP/BKIPM) tanpa risiko penahanan di pelabuhan tujuan.',
    features: [
      'Penerbitan Health Certificate (HC) Ikan Kering Resmi KKP',
      'Surat Keterangan Asal (COO / Form E untuk Tiongkok, Form D ASEAN)',
      'Pemberitahuan Ekspor Barang (PEB) Jalur Cepat Prioritas',
      'Kesesuaian Regulasi US FDA, China GACC, dan Kemenkes Jepang'
    ],
    metrics: [
      { label: 'Penyelesaian Dokumen', value: '1 - 2 Hari Kerja' },
      { label: 'Tingkat Kepatuhan', value: '100% Zero Delay' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'private-label-packaging',
    title: 'Private Labeling, Custom Retail Packaging & Vacuum Sealing',
    category: 'Custom Packaging',
    icon: 'Truck',
    summary: 'Layanan pengemasan khusus merk pembeli (OEM/Private Label) menggunakan kemasan standing pouch vakum, master carton ekspor, dan barcode ritel.',
    description: 'Kami melayani kebutuhan supermarket diaspora dan distributor ritel di mancanegara dengan mencetak label multibahasa (Inggris, Mandarin, Arab, Melayu), label nutrisi, dan sertifikasi halal langsung dari pabrik.',
    features: [
      'High-Barrier Vacuum Sealing Bag (100g, 250g, 500g, 1kg, 5kg)',
      'Pilihan Kemasan Standing Pouch Zipper dengan Jendela Transparan',
      'Desain Master Box Karton Tebal 5-Ply ISPM #15 Certified',
      'Label Nutrisi Internasional (Nutrition Facts & Multilingual Ingredients)'
    ],
    metrics: [
      { label: 'Kapasitas Kemasan', value: '25.000 Pouch / Hari' },
      { label: 'Fleksibilitas MOQ', value: 'Mulai dari 500 Kg' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lab-quality-testing',
    title: 'Audit Mutu Laboratorium & Pengujian Bebas Bahan Kimia Berbahaya',
    category: 'Kontrol Mutu & Lab',
    icon: 'ShieldCheck',
    summary: 'Pemeriksaan laboratorium independen terakreditasi KAN menjamin produk 100% bebas formalin, bebas boraks, dan kadar histamin di bawah ambang batas.',
    description: 'Setiap lot produksi diuji secara organoleptik, kimiawi, dan mikrobiologis. Kami menyediakan Certificate of Analysis (COA) resmi yang mencakup kadar garam, kadar air, Salmonella, E. coli, dan logam berat (Pb, Cd, Hg).',
    features: [
      'Sertifikat Analisis (COA) Resmi dari Lab Terakreditasi KAN / ISO 17025',
      'Pengujian Kadar Air Akurat (< 14% untuk Teri & Cumi Kering)',
      'Jaminan Mutu Bebas Formalin, Boraks, dan Pemutih Buatan',
      'Analisis Kadar Garam Sesuai Selera Pasar Internasional (Low-Salt / Standard)'
    ],
    metrics: [
      { label: 'Toleransi Residu', value: '0% Non-Formalin' },
      { label: 'Akurasi Uji Lab', value: 'ISO 17025 Standard' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sentra Pengeringan & Sortasi Teri Nasi Super Pilihan',
    category: 'processing',
    imageUrl: '/images/gallery/surtir-teri-nasi-super.png',
    location: 'Sentra Pengolahan Muara Baru & Belawan',
    date: '15 Agustus 2025',
    description: 'Proses pemilihan dan sortasi ikan teri nasi putih super grade tanpa bahan pengawet kimia dengan penjemuran higienis di atas rak stainless steel mesh.',
    tags: ['Teri Nasi Super', 'Higiene Pangan', 'Sortasi Manual', 'Grade A']
  },
  {
    id: 'gal-2',
    title: 'Fasilitas Dehumidified Storage Berstandar HACCP KKP',
    category: 'storage',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    location: 'Kawasan Industri Perikanan Marunda, Jakarta Utara',
    date: '10 Juli 2025',
    description: 'Gudang penyimpanan kering berkelembaban terkontrol (RH < 55%) seluas 18.500 m² yang melindungi produk dari jamur dan menjaga aroma khas hasil laut.',
    tags: ['Dehumidified Storage', 'HACCP Grade A', 'Bebas Hama', 'Steril']
  },
  {
    id: 'gal-3',
    title: 'Grading Gelembung Ikan (Fish Maw) & Teripang Kering Super',
    category: 'commodities',
    imageUrl: '/images/gallery/grading-fish-maw.png',
    location: 'Fasilitas Ekspor Premium Muara Baru, Jakarta',
    date: '02 Mei 2025',
    description: 'Pemeriksaan ketebalan, kejernihan, dan kadar air gelembung ikan (fish maw) kelas premium untuk pasar restoran mewah dan pengobatan tradisional Hong Kong.',
    tags: ['Fish Maw', 'Gelembung Ikan', 'Luxury Seafood', 'Hong Kong Trade']
  },
  {
    id: 'gal-4',
    title: 'Pemuatan Kontainer Ekspor Ikan Asin Jambal Roti & Tenggiri',
    category: 'shipping',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    location: 'Terminal Petikemas Tanjung Priok Jakarta',
    date: '28 Juni 2025',
    description: 'Pemuatan 1 x 40ft High Cube Container berisi ikan asin jambal roti dan tenggiri kering dengan moisture absorber desiccant untuk tujuan Los Angeles, USA.',
    tags: ['Ekspor FCL', 'Tanjung Priok', 'Moisture Absorber', 'USA Trade']
  },
  {
    id: 'gal-5',
    title: 'Ruang Pengemasan Higienis Vacuum Seal & Retail Pouch',
    category: 'storage',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    location: 'Sentra Produksi & Pengemasan Marunda',
    date: '18 April 2025',
    description: 'Area pengemasan steril kedap udara dengan mesin continuous band sealer dan automatic vacuum packaging untuk pesanan private label supermarket diaspora.',
    tags: ['Vacuum Packaging', 'Private Label', 'Kemasan Ritel', 'Food Grade']
  },
  {
    id: 'gal-6',
    title: 'Uji Laboratorium Bebas Formalin & Uji Histamin Karantina',
    category: 'storage',
    imageUrl: '/images/gallery/lab-testing-formalin.png',
    location: 'Laboratorium Mutu Terpadu Dried Seafood Global',
    date: '04 September 2025',
    description: 'Pengujian ketat setiap batch untuk menjamin 0% formalin, kadar air < 14%, serta kadar garam yang presisi sebelum penerbitan Health Certificate resmi.',
    tags: ['Lab Testing', 'Zero Formalin', 'BKIPM KKP', 'Health Certificate']
  },
  {
    id: 'gal-7',
    title: 'Teknologi Pengeringan Solar Dome Dryer Higienis',
    category: 'processing',
    imageUrl: '/images/gallery/solar-dome-dryer.png',
    location: 'Sentra Nelayan Binaan Pantura Jawa Tengah',
    date: '12 Januari 2026',
    description: 'Kubah pengering bertenaga surya tertutup yang melindungi ikan teri dan cumi dari debu, lalat, dan kontaminasi udara luar dengan sirkulasi panas merata.',
    tags: ['Solar Dome', 'Higiene Pengeringan', 'Bebas Lalat', 'Pemberdayaan Nelayan']
  },
  {
    id: 'gal-8',
    title: 'Pengiriman Kargo Udara Kilat Prioritas ke Bandara Internasional',
    category: 'shipping',
    imageUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    location: 'Area Kargo Bandara Soekarno-Hatta (CGK)',
    date: '20 Februari 2026',
    description: 'Pemberangkatan kargo udara berpendingin dan segel tamper-evident untuk komoditas fish maw dan ebi kualitas super ke Changi Singapura dan Hong Kong.',
    tags: ['Air Cargo', 'Express Transit', 'Fish Maw', 'Seafood Ekspor']
  },
  {
    id: 'gal-9',
    title: 'Kemitraan Nelayan Pesisir Tangkap Ramah Lingkungan',
    category: 'sustainability',
    imageUrl: '/images/gallery/nelayan-tangkap-ramah-lingkungan.png',
    location: 'Sentra Nelayan Pesisir Pangandaran & Cilacap',
    date: '18 Oktober 2025',
    description: 'Pemberdayaan 1.200+ nelayan tradisional dengan kapal tangkap ramah lingkungan, jaring non-trawl, dan jaminan pembelian hasil tangkap ikan segar dengan harga adil.',
    tags: ['Fair Trade', 'Nelayan Tradisional', 'Non-Trawl', 'ESG Fisheries']
  },
  {
    id: 'gal-10',
    title: 'Sortasi & Pembersihan Cumi Kering Sero Telur Utuh',
    category: 'commodities',
    imageUrl: '/images/gallery/sortasi-cumi-sero.png',
    location: 'Sentra Pemrosesan Cumi Muara Angke, Jakarta',
    date: '05 November 2025',
    description: 'Pembersihan manual cumi sero telur dengan air garam laut murni sebelum penjemuran pada dome tertutup untuk menjaga warna putih kemerahan alami.',
    tags: ['Cumi Sero', 'Squid Trade', 'Alami Tanpa Pemutih', 'Grade AAA']
  },
  {
    id: 'gal-11',
    title: 'Inspeksi Petugas Karantina Ikan BKIPM KKP untuk Health Certificate',
    category: 'processing',
    imageUrl: '/images/gallery/inspeksi-karantina-bkipm.png',
    location: 'Stasiun Karantina Ikan Pengendalian Mutu (SKIPM) Tanjung Priok',
    date: '14 Desember 2025',
    description: 'Pemeriksaan fisik dan organoleptik oleh inspektur karantina resmi KKP untuk memastikan kepatuhan standar SPS (Sanitary and Phytosanitary) negara tujuan.',
    tags: ['Inspeksi Karantina', 'Health Certificate', 'KKP RI', 'SPS Standards']
  },
  {
    id: 'gal-12',
    title: 'Program Kemitraan UMKM Nelayan Perempuan Pengolah Ikan Asin',
    category: 'sustainability',
    imageUrl: '/images/gallery/kemitraan-umkm-nelayan-perempuan.png',
    location: 'Koperasi Nelayan Pesisir Belawan, Sumatera Utara',
    date: '22 Januari 2026',
    description: 'Pelatihan standar sanitasi, penggunaan Solar Dome, dan teknik pembelahan ikan asin peda & jambal yang higienis untuk kelompok ibu nelayan pesisir.',
    tags: ['Pemberdayaan Perempuan', 'Koperasi Nelayan', 'Pelatihan Higiene', 'Dampak Sosial']
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'jkt-hq',
    city: 'Jakarta (Headquarters & Trade Terminal)',
    country: 'Indonesia',
    address: 'Kawasan Industri & Pelabuhan Perikanan Samudera Jakarta, Jl. Muara Baru Raya No. 88, Penjaringan',
    postalCode: '14440',
    phone: '+62 889-8558-2838',
    email: 'info@driedseafoodglobal.com',
    coordinates: { lat: -6.116500, lng: 106.804200 },
    isHQ: true,
    hours: 'Senin - Sabtu: 08.00 - 18.00 WIB (Hotline Korporat 24/7 Siap Melayani)',
    timeZone: 'WIB (UTC+7)'
  },
  {
    id: 'mdn-branch',
    city: 'Medan (Sentra Teri Nasi & Belawan Hub)',
    country: 'Indonesia',
    address: 'Kawasan Pelabuhan Perikanan Samudera Belawan, Jl. Gabion No. 12, Medan',
    postalCode: '20411',
    phone: '+62 889-8558-2838',
    email: 'medan@driedseafoodglobal.com',
    coordinates: { lat: 3.782100, lng: 98.685400 },
    hours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    timeZone: 'WIB (UTC+7)'
  },
  {
    id: 'sby-branch',
    city: 'Surabaya (Sentra Pantura & Tanjung Perak)',
    country: 'Indonesia',
    address: 'Kawasan Pergudangan Muara Perak Blok C-5, Jl. Nilam Timur No. 18, Tanjung Perak',
    postalCode: '60165',
    phone: '+62 889-8558-2838',
    email: 'surabaya@driedseafoodglobal.com',
    coordinates: { lat: -7.198300, lng: 112.734200 },
    hours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    timeZone: 'WIB (UTC+7)'
  },
  {
    id: 'hkg-desk',
    city: 'Hong Kong (Asia-Pacific Seafood Desk)',
    country: 'Hong Kong SAR',
    address: '188 Des Voeux Road West, Dried Seafood Trading District, Sheung Wan',
    postalCode: '999077',
    phone: '+852 2815 8820',
    email: 'hongkong@driedseafoodglobal.com',
    coordinates: { lat: 22.287800, lng: 114.145500 },
    hours: 'Monday - Friday: 09:00 - 18:00 HKT',
    timeZone: 'HKT (UTC+8)'
  },
  {
    id: 'sin-desk',
    city: 'Singapore (Regional Distribution Hub)',
    country: 'Singapura',
    address: 'Jurong Fishery Port Complex, 35 Fishery Port Road #02-14',
    postalCode: '619742',
    phone: '+65 6265 9930',
    email: 'singapore@driedseafoodglobal.com',
    coordinates: { lat: 1.311200, lng: 103.719800 },
    hours: 'Monday - Friday: 08:30 - 17:30 SGT',
    timeZone: 'SGT (UTC+8)'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Standar Mutu Ekspor Ikan Teri Nasi & Teri Medan ke Pasar Asia Timur & ASEAN',
    slug: 'standar-mutu-ekspor-teri-nasi-teri-medan',
    excerpt: 'Kriteria ketat kadar air < 12%, warna putih bersih alami tanpa pemutih, dan protokol sortasi bertingkat untuk menembus pasar ritel premium di Taiwan, Hong Kong, dan Singapura.',
    content: `Ikan teri nasi (Stolephorus commersonii) dan teri Medan merupakan salah satu komoditas perikanan kering khas Indonesia yang memiliki permintaan sangat tinggi di pasar internasional. Di Dried Seafood Global, kami menerapkan standar pengolahan pasca panen yang higienis untuk memastikan produk lolos inspeksi karantina di negara tujuan.

### 1. Seleksi Bahan Baku Segar
Ikan teri langsung diproses dalam waktu kurang dari 3 jam setelah mendarat di pelabuhan perikanan. Kesegaran ikan sangat menentukan warna alami dan keutuhan bentuk tubuh ikan saat dikeringkan.

### 2. Pengeringan Solar Dome Higienis
Kami meninggalkan metode penjemuran terbuka di tanah. Dengan sistem Solar Dome Dryer, suhu dan sirkulasi udara terkontrol sempurna tanpa resiko tercemar debu jalanan, lalat, maupun kotoran burung.

### 3. Jaminan Bebas Formalin & Uji Histamin
Setiap lot produksi diuji di laboratorium terakreditasi ISO 17025. Kami menjamin nol kandungan formalin, boraks, maupun pemutih sintetis, dengan kadar garam yang dapat disesuaikan dengan preferensi pembeli.`,
    coverImage: '/images/blog/standar-mutu-teri-nasi.png',
    author: {
      name: 'Dr. Rina Kusuma, S.Pi.',
      role: 'Head of QA & Quarantine Compliance',
      avatar: '/images/blog/standar-mutu-teri-nasi.png'
    },
    category: 'Industri',
    tags: ['Teri Nasi Super', 'Ekspor Ikan Kering', 'Standar Mutu', 'HACCP Grade A'],
    readTime: '5 menit baca',
    publishedAt: '28 Februari 2026',
    featured: true,
    seoKeywords: ['teri nasi indonesia', 'ikan teri medan', 'standar karantina ikan', 'dried anchovy supplier'],
    comments: [
      {
        id: 'c-1',
        author: 'Lawrence Wong (Procurement Manager - Sing Lun Seafood)',
        email: 'wong@singlunmarine.com',
        content: 'Kualitas teri nasi dari Dried Seafood Global sangat luar biasa. Putih bersih, renyah saat digoreng, dan packaging vakumnya sangat rapi untuk etalase supermarket kami di Jurong.',
        createdAt: '01 Maret 2026'
      }
    ]
  },
  {
    id: 'blog-2',
    title: 'Panduan Karantina Ikan KKP & Pengurusan Health Certificate (HC) Ekspor',
    slug: 'panduan-karantina-ikan-health-certificate-ekspor',
    excerpt: 'Langkah taktis pengurusan dokumen resmi Badan Karantina Ikan KKP (BKIPM), pengujian organoleptik, dan penerbitan Certificate of Origin untuk tarif preferensi 0%.',
    content: `Menghadapi regulasi ketat kepabeanan internasional, kelengkapan sertifikat karantina perikanan adalah syarat mutlak agar barang tidak tertahan di pelabuhan masuk (port of entry).

### Dokumen Kunci yang Wajib Dimiliki:
* **Health Certificate (HC) BKIPM:** Membuktikan produk ikan kering aman dari cemaran mikroba berbahaya dan layak konsumsi.
* **Certificate of Analysis (COA):** Hasil uji lab independen atas parameter kadar air, histamin, dan bebas bahan pengawet ilegal.
* **COO Form E & Form D:** Fasilitas bea masuk nol persen bagi importir di Tiongkok dan negara-negara ASEAN.

Hubungi tim spesialis ekspor Dried Seafood Global untuk mendapatkan konsultasi regulasi kepabeanan produk perikanan di negara Anda.`,
    coverImage: '/images/blog/panduan-karantina-ikan.png',
    author: {
      name: 'Ir. H. Bambang Priyono',
      role: 'CEO & Founder',
      avatar: '/images/blog/panduan-karantina-ikan.png'
    },
    category: 'Teknologi',
    tags: ['Health Certificate', 'BKIPM KKP', 'Dokumen Ekspor', 'Kepatuhan Regulasi'],
    readTime: '6 menit baca',
    publishedAt: '15 Februari 2026',
    featured: false,
    seoKeywords: ['health certificate ikan', 'karantina perikanan', 'ekspor hasil laut', 'Form E Tiongkok'],
    comments: []
  },
  {
    id: 'blog-3',
    title: 'Gelembung Ikan (Fish Maw) Indonesia: Nilai Ekonomis dan Standar Grading Ekspor',
    slug: 'gelembung-ikan-fish-maw-indonesia-grading-ekspor',
    excerpt: 'Mengenal komoditas laut eksklusif bernilai tinggi, karakteristik Fish Maw Gulama dan Kakap, serta metode pengeringan alami untuk menjaga kandungan kolagen.',
    content: `Gelembung renang ikan atau dikenal secara internasional sebagai Fish Maw merupakan komoditas laut kering premium dengan nilai jual tinggi di pasar Tiongkok Raya dan Asia Timur. 

Kualitas Fish Maw dinilai berdasarkan ketebalan dinding, kejernihan serat saat diterawang cahaya, dan ketiadaan bintik darah. Dried Seafood Global menyediakan Fish Maw kualitas ekspor dengan penyortiran manual oleh tenaga ahli berpengalaman puluhan tahun.`,
    coverImage: '/images/blog/gelembung-ikan-fish-maw.png',
    author: {
      name: 'Kenneth Chen',
      role: 'Director of Asian Seafood Trade',
      avatar: '/images/blog/gelembung-ikan-fish-maw.png'
    },
    category: 'Kasus Nyata',
    tags: ['Fish Maw', 'Gelembung Ikan', 'Komoditas Mewah', 'Perdagangan Asia'],
    readTime: '4 menit baca',
    publishedAt: '04 Februari 2026',
    featured: false,
    seoKeywords: ['supplier fish maw', 'gelembung ikan ekspor', 'fish maw indonesia', 'isinglass'],
    comments: []
  },
  {
    id: 'blog-4',
    title: 'Pemberdayaan Nelayan Tradisional & Standar Keberlanjutan Hasil Laut Kering',
    slug: 'pemberdayaan-nelayan-dan-keberlanjutan-seafood',
    excerpt: 'Komitmen kemitraan rantai pasok maritim yang adil bersama ribuan keluarga nelayan tangkap di pesisir Sumatera, Jawa, dan Sulawesi.',
    content: `Keberlanjutan pasokan ikan kering bermutu tinggi berakar dari kesejahteraan para nelayan mitra. Kami memberikan edukasi pengolahan higienis di atas perahu, penyediaan garam laut murni bersertifikat, dan kepastian harga beli yang stabil demi memutus rantai tengkulak yang merugikan.`,
    coverImage: '/images/blog/pemberdayaan-nelayan-dan-keberlanjutan-seafood.png',
    author: {
      name: 'Hendra Tanudjaja, S.T.',
      role: 'Director of Marine Logistics',
      avatar: '/images/blog/pemberdayaan-nelayan-dan-keberlanjutan-seafood.png'
    },
    category: 'Sustainability',
    tags: ['Pemberdayaan Nelayan', 'Fair Trade', 'Keberlanjutan', 'Pesisir Indonesia'],
    readTime: '5 menit baca',
    publishedAt: '22 Januari 2026',
    featured: false,
    seoKeywords: ['nelayan indonesia', 'rantai pasok ikan', 'sustainable seafood', 'tanggung jawab sosial'],
    comments: []
  }
];

export const GLOBAL_COUNTRIES: CountryInfo[] = [
  { code: 'ID', name: 'Indonesia', region: 'Asia Tenggara', flag: '🇮🇩', currency: 'IDR', customsRisk: 'low', deliveryBaseFactor: 1.0 },
  { code: 'SG', name: 'Singapura', region: 'Asia Tenggara', flag: '🇸🇬', currency: 'SGD', customsRisk: 'low', deliveryBaseFactor: 1.1 },
  { code: 'MY', name: 'Malaysia', region: 'Asia Tenggara', flag: '🇲🇾', currency: 'MYR', customsRisk: 'low', deliveryBaseFactor: 1.15 },
  { code: 'TH', name: 'Thailand', region: 'Asia Tenggara', flag: '🇹🇭', currency: 'THB', customsRisk: 'low', deliveryBaseFactor: 1.2 },
  { code: 'VN', name: 'Vietnam', region: 'Asia Tenggara', flag: '🇻🇳', currency: 'VND', customsRisk: 'medium', deliveryBaseFactor: 1.25 },
  { code: 'PH', name: 'Filipina', region: 'Asia Tenggara', flag: '🇵🇭', currency: 'PHP', customsRisk: 'medium', deliveryBaseFactor: 1.3 },
  { code: 'CN', name: 'Tiongkok (China)', region: 'Asia Timur', flag: '🇨🇳', currency: 'CNY', customsRisk: 'medium', deliveryBaseFactor: 1.4 },
  { code: 'JP', name: 'Jepang', region: 'Asia Timur', flag: '🇯🇵', currency: 'JPY', customsRisk: 'low', deliveryBaseFactor: 1.5 },
  { code: 'KR', name: 'Korea Selatan', region: 'Asia Timur', flag: '🇰🇷', currency: 'KRW', customsRisk: 'low', deliveryBaseFactor: 1.45 },
  { code: 'TW', name: 'Taiwan', region: 'Asia Timur', flag: '🇹🇼', currency: 'TWD', customsRisk: 'low', deliveryBaseFactor: 1.4 },
  { code: 'HK', name: 'Hong Kong SAR', region: 'Asia Timur', flag: '🇭🇰', currency: 'HKD', customsRisk: 'low', deliveryBaseFactor: 1.2 },
  { code: 'AU', name: 'Australia', region: 'Oseania', flag: '🇦🇺', currency: 'AUD', customsRisk: 'low', deliveryBaseFactor: 1.6 },
  { code: 'NZ', name: 'Selandia Baru', region: 'Oseania', flag: '🇳🇿', currency: 'NZD', customsRisk: 'low', deliveryBaseFactor: 1.7 },
  { code: 'US', name: 'Amerika Serikat (USA)', region: 'Amerika Utara', flag: '🇺🇸', currency: 'USD', customsRisk: 'low', deliveryBaseFactor: 2.1 },
  { code: 'CA', name: 'Kanada', region: 'Amerika Utara', flag: '🇨🇦', currency: 'CAD', customsRisk: 'low', deliveryBaseFactor: 2.2 },
  { code: 'MX', name: 'Meksiko', region: 'Amerika Utara', flag: '🇲🇽', currency: 'MXN', customsRisk: 'medium', deliveryBaseFactor: 2.3 },
  { code: 'GB', name: 'Inggris (United Kingdom)', region: 'Eropa Barat', flag: '🇬🇧', currency: 'GBP', customsRisk: 'low', deliveryBaseFactor: 2.0 },
  { code: 'DE', name: 'Jerman (Germany)', region: 'Eropa Barat', flag: '🇩🇪', currency: 'EUR', customsRisk: 'low', deliveryBaseFactor: 1.95 },
  { code: 'NL', name: 'Belanda (Netherlands)', region: 'Eropa Barat', flag: '🇳🇱', currency: 'EUR', customsRisk: 'low', deliveryBaseFactor: 1.9 },
  { code: 'FR', name: 'Prancis (France)', region: 'Eropa Barat', flag: '🇫🇷', currency: 'EUR', customsRisk: 'low', deliveryBaseFactor: 2.0 },
  { code: 'IT', name: 'Italia (Italy)', region: 'Eropa Selatan', flag: '🇮🇹', currency: 'EUR', customsRisk: 'low', deliveryBaseFactor: 2.05 },
  { code: 'ES', name: 'Spanyol (Spain)', region: 'Eropa Selatan', flag: '🇪🇸', currency: 'EUR', customsRisk: 'low', deliveryBaseFactor: 2.1 },
  { code: 'CH', name: 'Swiss (Switzerland)', region: 'Eropa', flag: '🇨🇭', currency: 'CHF', customsRisk: 'low', deliveryBaseFactor: 2.15 },
  { code: 'AE', name: 'Uni Emirat Arab (Dubai)', region: 'Timur Tengah', flag: '🇦🇪', currency: 'AED', customsRisk: 'low', deliveryBaseFactor: 1.65 },
  { code: 'SA', name: 'Arab Saudi', region: 'Timur Tengah', flag: '🇸🇦', currency: 'SAR', customsRisk: 'medium', deliveryBaseFactor: 1.75 },
  { code: 'QA', name: 'Qatar', region: 'Timur Tengah', flag: '🇶🇦', currency: 'QAR', customsRisk: 'low', deliveryBaseFactor: 1.7 },
  { code: 'IN', name: 'India', region: 'Asia Selatan', flag: '🇮🇳', currency: 'INR', customsRisk: 'medium', deliveryBaseFactor: 1.5 },
  { code: 'TR', name: 'Turki (Türkiye)', region: 'Eurasia', flag: '🇹🇷', currency: 'TRY', customsRisk: 'medium', deliveryBaseFactor: 1.85 },
  { code: 'BR', name: 'Brasil (Brazil)', region: 'Amerika Selatan', flag: '🇧🇷', currency: 'BRL', customsRisk: 'high', deliveryBaseFactor: 2.6 },
  { code: 'ZA', name: 'Afrika Selatan', region: 'Afrika', flag: '🇿🇦', currency: 'ZAR', customsRisk: 'medium', deliveryBaseFactor: 2.4 }
];

export const COURIER_PARTNERS: CourierOption[] = [
  {
    id: 'dhl-express',
    name: 'DHL Express Worldwide',
    logo: 'DHL',
    serviceTier: 'Express Air',
    transitDaysMin: 2,
    transitDaysMax: 4,
    baseRatePerKgUSD: 16.5,
    customsHandlingUSD: 25,
    reliabilityScore: 99.4,
    trackingFeatures: ['Live GPS Tracking', 'Signature on Delivery', 'On-Demand Delivery (ODD)'],
    co2OffsetKg: 4.2
  },
  {
    id: 'fedex-priority',
    name: 'FedEx International Priority',
    logo: 'FedEx',
    serviceTier: 'Express Air',
    transitDaysMin: 2,
    transitDaysMax: 5,
    baseRatePerKgUSD: 15.8,
    customsHandlingUSD: 24,
    reliabilityScore: 99.1,
    trackingFeatures: ['SenseAware IoT Monitoring', 'Customs Pre-Clearance', 'Money-Back Guarantee'],
    co2OffsetKg: 4.5
  },
  {
    id: 'ups-worldwide',
    name: 'UPS Worldwide Saver',
    logo: 'UPS',
    serviceTier: 'Express Air',
    transitDaysMin: 3,
    transitDaysMax: 5,
    baseRatePerKgUSD: 15.2,
    customsHandlingUSD: 22,
    reliabilityScore: 98.9,
    trackingFeatures: ['UPS Quantum View', 'End-to-End Milestone Alerts', 'Carbon Neutral Option'],
    co2OffsetKg: 3.8
  },
  {
    id: 'aramex-global',
    name: 'Aramex Global Priority',
    logo: 'Aramex',
    serviceTier: 'Standard Parcel',
    transitDaysMin: 4,
    transitDaysMax: 7,
    baseRatePerKgUSD: 11.5,
    customsHandlingUSD: 18,
    reliabilityScore: 97.8,
    trackingFeatures: ['Middle East & Emerging Hub Specialist', 'SMS & WhatsApp Tracking'],
    co2OffsetKg: 3.2
  },
  {
    id: 'nusantara-cargo',
    name: 'Nusantara Global Ocean & Air Cargo',
    logo: 'Nusantara Direct',
    serviceTier: 'Ocean Cargo',
    transitDaysMin: 12,
    transitDaysMax: 24,
    baseRatePerKgUSD: 4.8,
    customsHandlingUSD: 15,
    reliabilityScore: 99.6,
    trackingFeatures: ['FCL/LCL Container Satellite Tracking', 'AEO Gold Priority Customs', 'Zero Port Demurrage Guarantee'],
    co2OffsetKg: 1.1
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-101',
    name: 'Budi Hartono',
    email: 'budi.hartono@manufacturing-corp.com',
    phone: '+62 812 3456 7890',
    companyName: 'PT Nusantara Auto Parts Prima',
    inquiryType: 'Permintaan Penawaran (RFQ)',
    message: 'Kami membutuhkan penawaran pengiriman rutin 4x40ft FCL komponen otomotif dari Pelabuhan Tanjung Priok ke Hamburg Port setiap bulan.',
    originCountry: 'ID',
    destinationCountry: 'DE',
    estimatedWeight: 48000,
    createdAt: '2026-09-07 14:22:00',
    status: 'new',
    ipLocation: 'Jakarta, Indonesia',
    sslEncrypted: true
  },
  {
    id: 'inq-102',
    name: 'Eleanor Vance',
    email: 'e.vance@vance-pharma.ch',
    phone: '+41 44 211 4400',
    companyName: 'Vance BioPharma Ltd',
    inquiryType: 'Dukungan Logistik',
    message: 'Mencari mitra pergudangan cold chain bersertifikat GDP di Singapura dan Jakarta untuk produk biofarma suhu 2-8°C.',
    originCountry: 'CH',
    destinationCountry: 'SG',
    estimatedWeight: 2500,
    createdAt: '2026-09-06 09:15:00',
    status: 'reviewed',
    replyNotes: 'Sudah dijadwalkan Zoom meeting teknis dengan tim Pharma Logistics pada 10 September.',
    ipLocation: 'Zurich, Switzerland',
    sslEncrypted: true
  }
];

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  metaTitle: 'Dried Seafood Global - Eksportir Resmi Produk Ikan & Hasil Laut Khas Indonesia',
  metaDescription: 'Eksportir resmi terpercaya produk ikan asin, teri nasi super, cumi kering, gelembung ikan (fish maw), dan hasil laut Nusantara berstandar HACCP dan KKP ke 28+ negara.',
  focusKeywords: ['dried seafood global', 'ikan asin indonesia', 'teri medan indonesia', 'cumi kering indonesia', 'supplier fish maw', 'indonesian dried fish supplier', 'ikan asin jambal roti'],
  canonicalUrl: 'https://driedseafoodglobal.com',
  ogImageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
  structuredDataType: 'Corporation',
  robotsIndex: true,
  robotsFollow: true,
  sitemapCount: 24,
  sslGrade: 'A+',
  googleSearchConsoleKey: '',
  googleAnalyticsId: '',
  googleTagManagerId: '',
  googleMerchantCenterId: '',
  googleBusinessProfileUrl: 'https://maps.google.com/?q=Kawasan+Industri+Maritim+Muara+Baru+Jakarta+Utara'
};

export const INITIAL_SEO_SETTINGS = DEFAULT_SEO_SETTINGS;
export const INITIAL_GALLERY = GALLERY_ITEMS;

export const SSL_CERTIFICATE_INFO = {
  issuer: 'DigiCert Global Root G2 (Extended Validation CA)',
  encryptionLevel: '256-Bit AES-GCM High-Assurance Encryption',
  protocol: 'TLS 1.3',
  cipherSuite: 'TLS_AES_256_GCM_SHA384 (ECDHE-RSA-AES256-GCM)',
  validUntil: '31 Desember 2028',
  status: 'Aktif & Terverifikasi (Grade A+)',
  keyExchange: 'ECDHE dengan X25519 (256 bits)',
  hsts: 'Enabled (max-age=63072000; includeSubDomains; preload)'
};

export const EXPORT_COMMODITIES: ExportCommodity[] = [
  {
    id: 'exp-teri-nasi',
    name: 'Super White Anchovy / Teri Nasi Belawan Grade AAA',
    indonesianName: 'Ikan Teri Nasi Super Putih & Teri Medan Asli',
    category: 'Ikan Teri & Bilis Kering',
    hsCode: '0305.59.90',
    origin: 'Belawan (Sumatera Utara), Tuban & Pasuruan (Jawa Timur)',
    specification: {
      grade: 'Super AAA Grade (Ukuran 1.5 - 2.5 cm, Utuh & Putih Bersih)',
      moisture: '10% - 12% Max (Kadar Garam 2% - 4% Low Salt)',
      packaging: '100g/250g/500g Vacuum Pouch / 10 Kg Master Carton Box',
      moq: '500 Kg (LCL) / 1 x 20ft FCL (12 Metric Tons)',
      shelfLife: '12 Bulan dalam suhu ruang kering / 24 Bulan chiller',
      colorTexture: 'Putih Gading Alami, Renyah, Non-Formalin, Bebas Pemutih'
    },
    supplyCapacity: '80 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate BKIPM', 'SKP KKP RI', 'Halal BPJPH', 'US FDA Registered'],
    keyMarkets: ['Hong Kong', 'Singapura', 'Taiwan', 'Malaysia', 'Amerika Serikat (USA)'],
    imageUrl: '/images/products/exp-teri-nasi-1.png',
    galleryImages: [
      '/images/products/exp-teri-nasi-1.png',
      '/images/products/exp-teri-nasi-2.png'
    ],
    description: 'Ikan teri nasi kualitas super grade yang dikeringkan secara higienis menggunakan teknologi pengering modern. Berwarna putih gading alami tanpa bahan kimia pemutih, bercita rasa gurih renyah, dan sangat digemari pasar Asia Timur serta supermarket diaspora.',
    featured: true
  },
  {
    id: 'exp-ikan-jambal',
    name: 'Salted Dried Giant Catfish Fillet (Ikan Asin Jambal Roti)',
    indonesianName: 'Ikan Asin Jambal Roti Super Gurih Khas Pangandaran & Cilacap',
    category: 'Ikan Asin Olahan Tradisional',
    hsCode: '0305.59.20',
    origin: 'Pangandaran (Jawa Barat), Cilacap (Jawa Tengah), & Muara Angke (Jakarta)',
    specification: {
      grade: 'Super Roti Premium (Daging Tebal Merekah / Empuk Seperti Roti)',
      moisture: '18% - 22% (Semi-Dry Cured Fillet)',
      packaging: 'Vacuum Sealed Individually (500g - 1kg) + 20 Kg Master Box',
      moq: '1 x 20ft FCL (14 Metric Tons) / 1.000 Kg LCL',
      shelfLife: '8 Bulan dalam suhu ruang / 18 Bulan suhu sejuk',
      colorTexture: 'Daging Cokelat Keemasan, Tekstur Lembut, Bebas Formalin'
    },
    supplyCapacity: '60 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate KKP', 'SKP KKP RI', 'Halal BPJPH'],
    keyMarkets: ['Singapura', 'Malaysia', 'Brunei Darussalam', 'Australia', 'Belanda'],
    imageUrl: '/images/products/exp-ikan-a-1.png',
    galleryImages: [
      '/images/products/exp-ikan-a-1.png',
      '/images/products/exp-ikan-a-2.png',
      '/images/products/exp-ikan-a-3.png'
    ],
    description: 'Dibuat dari ikan manyung liar segar pilihan dengan proses fermentasi garam alami tradisional. Daging tebal yang merekah lembut saat digoreng menyerupai tekstur roti, menjadikannya primadona kuliner ikan asin khas Indonesia berkelas ekspor.',
    featured: true
  },
  {
    id: 'exp-cumi-kering',
    name: 'Sun-Dried Squid & Loligo Baby Cuttlefish',
    indonesianName: 'Cumi Kering Sero Pilihan & Baby Cumi Kering Super',
    category: 'Cumi & Sotong Kering',
    hsCode: '0307.49.20',
    origin: 'Bangka Belitung, Tegal (Jawa Tengah), & Laut Jawa',
    specification: {
      grade: 'Premium Grade A (Ukuran 4-6 cm Baby Cumi & 12-18 cm Cumi Sero)',
      moisture: '14% - 16% Max',
      packaging: 'Vacuum Pack 500g / 1 Kg + Master Carton 15 Kg',
      moq: '500 Kg via Air Cargo / 10 Metric Tons via Sea FCL',
      shelfLife: '12 Bulan dalam penyimpanan dehumidified',
      colorTexture: 'Cokelat Kemerahan Alami, Daging Kenyal, Aroma Harum Gurih'
    },
    supplyCapacity: '45 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate BKIPM', 'Halal BPJPH', 'US FDA Registered'],
    keyMarkets: ['Korea Selatan', 'Tiongkok', 'Taiwan', 'Jepang', 'Singapura'],
    imageUrl: '/images/products/exp-ikan-b-1.png',
    galleryImages: [
      '/images/products/exp-ikan-b-1.png',
      '/images/products/exp-ikan-b-2.png',
      '/images/products/exp-ikan-b-3.png'
    ],
    description: 'Cumi-cumi segar hasil tangkapan pancing sero yang langsung dibersihkan dan dikeringkan di bawah terik matahari pesisir. Menghasilkan rasa manis alami sari laut tanpa garam berlebih, sempurna untuk hidangan stir-fry oriental dan sambal cumi ekspor.',
    featured: true
  },
  {
    id: 'exp-fish-maw',
    name: 'Indonesian Premium Dried Fish Maw (Gelembung Ikan Gulama & Kakap)',
    indonesianName: 'Gelembung Ikan / Fish Maw Kering Kualitas Mewah',
    category: 'Gelembung Ikan / Fish Maw',
    hsCode: '0305.72.00',
    origin: 'Merauke (Papua), Bagan Siapi-api (Riau), & Pontianak (Kalimantan Barat)',
    specification: {
      grade: 'Imperial First Grade (Thick Wall, Clean Amber Hue, Deep Collagen)',
      moisture: 'Max 8.0%',
      packaging: 'Gift Box Luxury Wood Case (1 Kg) / Air Cargo Carton (10 Kg)',
      moq: '25 Kg via Priority Air Freight / 100 Kg Konsolidasi',
      shelfLife: '5 Tahun (semakin lama semakin tinggi nilai gastronominya)',
      colorTexture: 'Kuning Keemasan Jernih, Bebas Noda Darah, Sangat Tebal'
    },
    supplyCapacity: '5 Metrik Ton / Bulan',
    certifications: ['Health Certificate BKIPM', 'CITES Non-Endangered Verification', 'Halal BPJPH', 'Certificate of Origin (COO Form E)'],
    keyMarkets: ['Hong Kong (Sheung Wan Market)', 'Guangdong (Tiongkok)', 'Singapura', 'Taiwan', 'Kanada'],
    imageUrl: '/images/products/exp-ikan-c-1.png',
    galleryImages: [
      '/images/products/exp-ikan-c-1.png',
      '/images/products/exp-ikan-c-2.png'
    ],
    description: 'Gelembung renang ikan air tawar dan laut dalam pilihan yang kaya kolagen murni. Disortir secara cermat satu per satu oleh spesialis kami untuk memenuhi standar perjamuan haute-cuisine Tiongkok, sup kesehatan bernilai tinggi, dan industri kecantikan.',
    featured: true
  },
  {
    id: 'exp-teripang',
    name: 'Wild-Harvested Dried Sea Cucumber (Teripang Pasir & Gosok)',
    indonesianName: 'Teripang Kering Super (Sandfish & Black Teatfish)',
    category: 'Teripang & Hasil Laut Eksklusif',
    hsCode: '0308.19.20',
    origin: 'Kepulauan Aru (Maluku), Kupang (NTT), & Kepulauan Selayar',
    specification: {
      grade: 'Super Grade 1 (20-30 pcs/kg & 40-50 pcs/kg)',
      moisture: 'Max 7.0% (Fully Sun-Dried & Smoked Cured)',
      packaging: 'Vacuum Sealed Pack 1 Kg + Master Carton 20 Kg',
      moq: '50 Kg (Via Air Cargo Express) / 500 Kg Sea Cargo',
      shelfLife: '36 Bulan dalam wadah tertutup kering',
      colorTexture: 'Hitam Keabuan Bersih, Bentuk Simetris, Tidak Retak'
    },
    supplyCapacity: '8 Metrik Ton / Bulan',
    certifications: ['Health Certificate BKIPM KKP', 'Sertifikat Bebas Logam Berat', 'Halal BPJPH', 'Form E COO'],
    keyMarkets: ['Hong Kong', 'Guangzhou (Tiongkok)', 'Singapura', 'Malaysia', 'Amerika Serikat'],
    imageUrl: '/images/products/exp-ikan-d-1.png',
    galleryImages: [
      '/images/products/exp-ikan-d-1.png',
      '/images/products/exp-ikan-d-2.png',
      '/images/products/exp-ikan-d-3.png'
    ],
    description: 'Teripang hasil tangkapan nelayan selam tradisional dari dasar laut terumbu karang yang bersih. Diproses melalui perebusan higienis dan pengasapan/penjemuran cermat, memiliki rasio pembesaran (expansion ratio) di atas 6x saat direhidrasi.',
    featured: false
  },
  {
    id: 'exp-udang-ebi',
    name: 'Super Red Sun-Dried Prawns / Ebi Kering Pilihan',
    indonesianName: 'Ebi / Udang Kering Super Manis Gurih Alami',
    category: 'Hasil Laut & Pangan',
    hsCode: '0306.95.20',
    origin: 'Bagan Siapi-api (Riau), Juwana (Jawa Tengah), & Tarakan (Kalimantan Utara)',
    specification: {
      grade: 'Super Grade A (Warna Jingga Kemerahan Alami, Kulit Terkelupas Bersih)',
      moisture: '10% - 13% Max',
      packaging: 'Food-Grade Polythene Bag (5 Kg) + 20 Kg Master Box',
      moq: '1.000 Kg (LCL) / 1 x 20ft FCL (15 Metric Tons)',
      shelfLife: '12 Bulan dalam suhu ruang kering sejuk',
      colorTexture: 'Oranye Kemerahan, Aroma Harum Sedap, Bebas Zat Pewarna Buatan'
    },
    supplyCapacity: '50 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate BKIPM', 'SKP KKP RI', 'Halal BPJPH'],
    keyMarkets: ['Taiwan', 'Jepang', 'Singapura', 'Hong Kong', 'Uni Emirat Arab'],
    imageUrl: '/images/products/exp-ikan-e-1.png',
    galleryImages: [
      '/images/products/exp-ikan-e-1.png',
      '/images/products/exp-ikan-e-2.png',
      '/images/products/exp-ikan-e-3.png'
    ],
    description: 'Udang ebi kering kualitas nomor satu yang diproduksi dari udang segar tangkapan laut dangkal. Memiliki cita rasa manis gurih alami tanpa tambahan MSG, sangat cocok sebagai bumbu dasar saus XO oriental, dumpling, dan masakan gourmet.',
    featured: true
  },
  {
    id: 'exp-tenggiri-kering',
    name: 'Traditional Salted Spanish Mackerel Fillet (Tenggiri Papan Kering)',
    indonesianName: 'Ikan Asin Tenggiri Batang & Papan Fillet Ekspor',
    category: 'Ikan Asin Olahan Tradisional',
    hsCode: '0305.59.30',
    origin: 'Laut Jawa, Lampung, & Selat Sunda',
    specification: {
      grade: 'Grade A Thick Cut Fillet (Bersih Tanpa Sisik, Bebas Tulang Utama)',
      moisture: '16% - 18% (Firm Dry Cured)',
      packaging: 'Individual Shrink Wrap + 10 Kg Master Carton',
      moq: '1.000 Kg / 1 x 20ft Container (14 Metric Tons)',
      shelfLife: '10 Bulan dalam suhu kering terkontrol',
      colorTexture: 'Daging Putih Mengkilap, Padat Gurih, Non-Formalin'
    },
    supplyCapacity: '35 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate KKP', 'Halal BPJPH'],
    keyMarkets: ['Singapura', 'Malaysia', 'Australia', 'Belanda', 'Kanada'],
    imageUrl: '/images/products/exp-ikan-f-1.png',
    galleryImages: [
      '/images/products/exp-ikan-f-1.png',
      '/images/products/exp-ikan-f-2.png',
      '/images/products/exp-ikan-f-3.png',
      '/images/products/exp-ikan-f-4.png'
    ],
    description: 'Fillet ikan tenggiri segar yang diasinkan dengan garam laut murni bermutu tinggi. Dagingnya yang padat dan aroma sedap tanpa bau amis menyengat menjadikannya pilihan favorit hotel dan restoran seafood di Asia Tenggara.',
    featured: false
  },
  {
    id: 'exp-ikan-gabus',
    name: 'Sun-Dried Snakehead Fish Fillet (Ikan Asin Gabus Kering Rawa)',
    indonesianName: 'Ikan Asin Gabus Pilihan & Bilis Kering Danau Toba',
    category: 'Ikan Asin Olahan Tradisional',
    hsCode: '0305.59.40',
    origin: 'Palembang (Sumatera Selatan), Banjarmasin (Kalimantan Selatan), & Danau Toba',
    specification: {
      grade: 'Grade A Butterfly Cut (Fillet Belah Kupu-Kupu Tanpa Kepala)',
      moisture: '12% - 14% Max (Kering Garing)',
      packaging: 'Vacuum Bag 250g/500g + Master Box 15 Kg',
      moq: '500 Kg LCL / 10 Metric Tons FCL',
      shelfLife: '12 Bulan dalam penyimpanan sejuk',
      colorTexture: 'Cokelat Terang Alami, Kering Renyah, Kaya Albumin'
    },
    supplyCapacity: '30 Metrik Ton / Bulan',
    certifications: ['HACCP Grade A', 'Health Certificate BKIPM', 'Halal BPJPH'],
    keyMarkets: ['Singapura', 'Malaysia', 'Taiwan', 'Jepang'],
    imageUrl: '/images/products/exp-ikan-c-1.png',
    galleryImages: [
      '/images/products/exp-ikan-c-1.png'
    ],
    description: 'Ikan gabus rawa segar yang terkenal akan kandungan protein dan albumin tinggi, dibelah butterfly dan dijemur hingga garing sempurna. Digemari para pemerhati gizi dan masakan tradisional di seluruh kawasan Asia Tenggara.',
    featured: false
  }
];

export const EXPORT_WORKFLOW_STEPS: ExportWorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Sourcing Nelayan & Seleksi Ikan Segar',
    subtitle: 'Pemilihan Bahan Baku & Sortasi Mutu',
    description: 'Ikan hasil tangkapan nelayan langsung dipilih saat tiba di pelabuhan perikanan. Kami hanya menggunakan ikan segar kualitas terbaik tanpa pembusukan awal.',
    imageUrl: '/images/gallery/sortir-ikan-segar.png',
    keyAction: 'Pengecekan kesegaran insang, elastisitas daging, dan uji awal non-formalin.',
    complianceDoc: 'Form Penerimaan Bahan Baku Segar & Laporan Sortasi'
  },
  {
    stepNumber: '02',
    title: 'Penggaraman Higienis & Solar Dome Drying',
    subtitle: 'Pengeringan Ramah Lingkungan & Higienis',
    description: 'Proses penggaraman menggunakan garam laut murni food-grade dilanjutkan dengan pengeringan dalam kubah Solar Dome tertutup yang bebas debu, lalat, dan polusi.',
    imageUrl: '/images/gallery/solar-dome-drying.png',
    keyAction: 'Pengukuran kadar air (< 14%) dan kelembaban dengan moisture meter digital berkala.',
    complianceDoc: 'Monitoring Suhu Pengeringan & Kartu Kendali Mutu'
  },
  {
    stepNumber: '03',
    title: 'Uji Laboratorium Mutu & Bebas Formalin',
    subtitle: 'Sertifikasi Karantina BKIPM & HACCP Grade A',
    description: 'Setiap lot produksi diuji di laboratorium independen untuk memastikan bebas formalin, residu logam berat, serta tingkat histamin yang aman.',
    imageUrl: '/images/gallery/laboratorium-mutu.png',
    keyAction: 'Penerbitan Certificate of Analysis (COA) resmi dan verifikasi kesehatan ikan.',
    complianceDoc: 'Health Certificate (HC) BKIPM & COA ISO 17025'
  },
  {
    stepNumber: '04',
    title: 'Pengemasan Kedap Udara & Food-Grade Desiccant',
    subtitle: 'Vacuum Sealing & Kemasan Ekspor Khusus',
    description: 'Pengemasan menggunakan plastik vacuum barrier tinggi atau kemasan ritel berlabel nutrisi ekspor, dilengkapi food-grade desiccant dan master box tebal 5-ply.',
    imageUrl: '/images/gallery/pengemasan-kedap-udara.png',
    keyAction: 'Penyegelan vakum otomatis, detektor logam (metal detector), dan labeling multibahasa.',
    complianceDoc: 'Packing List, Weight Slip & Certificate of Packaging Quality'
  },
  {
    stepNumber: '05',
    title: 'Pemuatan Kontainer Kering & Pengapalan Global',
    subtitle: 'Pemberangkatan FCL Laut & Kargo Udara Kilat',
    description: 'Pemuatan kontainer ekspor di pelabuhan Tanjung Priok atau Bandara Soekarno-Hatta dengan jalur hijau kepabeanan dan pelayaran terjadwal ke pelabuhan tujuan.',
    imageUrl: '/images/gallery/pemuatan-kontainer.png',
    keyAction: 'Pengurusan PEB, COO Form E/D/AK, dan pelacakan kontainer maritim real-time.',
    complianceDoc: 'Bill of Lading (B/L), COO Form E, PEB & Dokumen Ekspor Lengkap'
  }
];

export const BUYER_TESTIMONIALS: BuyerTestimonial[] = [
  {
    id: 'test-1',
    buyerName: 'Chan Wing Keung',
    buyerRole: 'Managing Director & Head Buyer',
    companyName: 'Wing Fat Marine Products Trading Co.',
    country: 'Hong Kong SAR',
    flag: '🇭🇰',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    commodityPurchased: 'Imperial Grade Dried Fish Maw & Sandfish Sea Cucumber',
    volumeAnnually: '18 Metrik Ton / Tahun (Air Cargo & Sea FCL)',
    rating: 5,
    comment: 'Dried Seafood Global adalah mitra terpercaya kami untuk pasokan gelembung ikan (fish maw) dan teripang dari Indonesia ke distrik Sheung Wan, Hong Kong. Kualitas pengeringan sangat sempurna, bersih dari noda darah, dan tebal. Sertifikat CITES dan Health Certificate BKIPM selalu lengkap sehingga impor kami berjalan lancar tanpa hambatan.',
    verifiedTransaction: true
  },
  {
    id: 'test-2',
    buyerName: 'Lawrence Wong',
    buyerRole: 'Procurement Director',
    companyName: 'Sing Lun Marine Wholesalers Pte Ltd',
    country: 'Singapura (Singapore)',
    flag: '🇸🇬',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    commodityPurchased: 'Super White Anchovy (Teri Nasi) & Salted Catfish Fillet',
    volumeAnnually: '120 Metrik Ton / Tahun (FCL Regular)',
    rating: 5,
    comment: 'Kami memasok teri nasi super dan ikan asin jambal roti untuk jaringan pasar modern dan restoran di seluruh Singapura. Produk dari Dried Seafood Global selalu putih bersih tanpa pemutih kimiawi dan kadar garamnya pas sesuai selera konsumen kami di Jurong. Pengiriman kontainer terjaga sangat kering.',
    verifiedTransaction: true
  },
  {
    id: 'test-3',
    buyerName: 'Zheng Wei Lin',
    buyerRole: 'General Manager of Seafood Imports',
    companyName: 'Guangzhou Yide Dried Seafood Center',
    country: 'Tiongkok (China)',
    flag: '🇨🇳',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    commodityPurchased: 'Sun-Dried Squid Sero & Baby Cuttlefish Grade A',
    volumeAnnually: '8 Kontainer 40ft HC / Tahun',
    rating: 5,
    comment: 'Cumi kering sero dan baby cumi dari Indonesia memiliki cita rasa manis alami yang sangat disukai pasar Guangdong. Dengan fasilitas Form E dari Dried Seafood Global, kami menikmati pembebasan tarif bea masuk (tarif 0%). Layanan cepat tanggap dan kualitas komoditas selalu stabil.',
    verifiedTransaction: true
  },
  {
    id: 'test-4',
    buyerName: 'Michael Santoso',
    buyerRole: 'Director of Asian Food Distribution',
    companyName: 'Pacific Heritage Foods LLC',
    country: 'Amerika Serikat (Los Angeles, USA)',
    flag: '🇺🇸',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    commodityPurchased: 'Retail-Pack Vacuum Dried Anchovy & Salted Mackerel Fillet',
    volumeAnnually: '35 Metrik Ton / Tahun',
    rating: 5,
    comment: 'Produk ikan asin kemasan ritel ber-vacuum seal dari PT Dried Seafood Global Indonesia telah terdaftar resmi di US FDA. Diaspora Indonesia dan penikmat kuliner Asia di California sangat menyukai cita rasa autentiknya yang bebas formalin dan higienis. Layanan RFQ dan komunikasi hotline 24/7 mereka sangat memuaskan.',
    verifiedTransaction: true
  }
];



export type SupportedLanguage = 'id' | 'en' | 'zh' | 'ja' | 'ar';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/Global)', flag: '🇺🇸', region: 'Global Market', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Domestik / Produsen', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体/繁體)', flag: '🇨🇳', region: 'China / Taiwan / HK', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan Market', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East / GCC', dir: 'rtl' },
];

export interface TranslationSchema {
  // Top bar
  topBar: {
    sslVerified: string;
    liveMonitor: string;
    buyersOnline: string;
    qualityBadge: string;
    hotlineLabel: string;
    adminPortal: string;
  };
  // Nav
  nav: {
    home: string;
    about: string;
    products: string;
    workflow: string;
    shippingCalc: string;
    docsHub: string;
    gallery: string;
    galleryDesc: string;
    mapHubs: string;
    mapHubsDesc: string;
    testimonials: string;
    testimonialsDesc: string;
    insights: string;
    insightsDesc: string;
    contactRfq: string;
    requestRfqBtn: string;
    hotline24h: string;
    adminOpen: string;
  };
  // Hero
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2: string;
    description: string;
    ctaRfq: string;
    ctaCatalog: string;
    ctaCalculator: string;
    trust1Title: string;
    trust1Desc: string;
    trust2Title: string;
    trust2Desc: string;
    trust3Title: string;
    trust3Desc: string;
    trust4Title: string;
    trust4Desc: string;
    statCountries: string;
    statCountriesLabel: string;
    statVolume: string;
    statVolumeLabel: string;
    statSatisfaction: string;
    statSatisfactionLabel: string;
    statFarms: string;
    statFarmsLabel: string;
  };
  // About & Quality
  about: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    tabs: {
      services: string;
      profile: string;
      leadership: string;
      certifications: string;
    };
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    certSectionTitle: string;
    certHaccpTitle: string;
    certHaccpDesc: string;
    certBkipmTitle: string;
    certBkipmDesc: string;
    certFdaTitle: string;
    certFdaDesc: string;
    certHalalTitle: string;
    certHalalDesc: string;
  };
  // Commodities (Catalog section)
  commodities: {
    badge: string;
    title: string;
    subtitle: string;
    downloadCatalog: string;
    filterAll: string;
    filterFish: string;
    filterSquid: string;
    filterMaw: string;
    filterShrimp: string;
    searchPlaceholder: string;
    origin: string;
    grade: string;
    moq: string;
    supplyCapacity: string;
    certifications: string;
    specs: string;
    requestQuote: string;
  };
  // Products / Commodities
  products: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFish: string;
    filterSquid: string;
    filterPremium: string;
    specGrade: string;
    specMoisture: string;
    specSalt: string;
    specPackaging: string;
    specHsCode: string;
    specMoq: string;
    btnInquire: string;
    btnDownloadSpec: string;
    naturalDried: string;
    chemicalFree: string;
  };
  // Workflow
  workflow: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  // Calculator
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    originLabel: string;
    destLabel: string;
    modeLabel: string;
    weightLabel: string;
    btnCalculate: string;
    resultTitle: string;
    transitTime: string;
    estTotal: string;
    btnExportSlip: string;
    btnOrderShipping: string;
  };
  // Gallery
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterProcessing: string;
    filterCommodities: string;
    filterStorage: string;
    filterShipping: string;
    filterSustainability: string;
  };
  // Map
  map: {
    badge: string;
    title: string;
    subtitle: string;
    headquartersTitle: string;
    portHubTitle: string;
    storageFacilityTitle: string;
  };
  // Testimonials
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    buyerRole: string;
  };
  // FAQ
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  // Contact & RFQ
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    companyLabel: string;
    productLabel: string;
    volumeLabel: string;
    destinationLabel: string;
    messageLabel: string;
    submitBtn: string;
    sending: string;
    successMessage: string;
    sslNote: string;
  };
  // Footer
  footer: {
    tagline: string;
    addressLabel: string;
    hotlineLabel: string;
    emailLabel: string;
    quickLinks: string;
    compliance: string;
    copyright: string;
    privacy: string;
    terms: string;
    sslEncryption: string;
    securityTitle: string;
    securityDesc: string;
    description: string;
    productsTitle: string;
    complianceTitle: string;
    rightsReserved: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    topBar: {
      sslVerified: 'TLS 1.3 EV SSL Verified Exporter',
      liveMonitor: 'Live Radar',
      buyersOnline: 'Global Buyers Active',
      qualityBadge: 'HACCP Grade A • Official Quarantine Health Cert',
      hotlineLabel: 'Export Desk 24/7:',
      adminPortal: 'Admin Portal'
    },
    nav: {
      home: 'Home',
      about: 'About & Quality',
      products: 'Export Catalog',
      workflow: 'Export Process',
      shippingCalc: 'Freight Calculator',
      docsHub: 'Docs & Hubs',
      gallery: 'Processing & Facility Gallery',
      galleryDesc: 'Solar Dome dryers, grading & climate-controlled storage',
      mapHubs: 'Export Hubs & Ports',
      mapHubsDesc: 'Offices & ports in Jakarta, Belawan, Cilacap, Surabaya',
      testimonials: 'Global Buyer Reviews',
      testimonialsDesc: 'Verified importers from Singapore, Taiwan, USA, UAE, Japan',
      insights: 'Market Insights & Trade',
      insightsDesc: 'BKIPM SPS health compliance & dried fish market reports',
      contactRfq: 'RFQ Inquiry',
      requestRfqBtn: 'Request Export Quote',
      hotline24h: 'Export Hotline 24/7:',
      adminOpen: 'Open Admin Management Portal'
    },
    hero: {
      badge: 'INDONESIA SEAFOOD EXPORTER OF EXCELLENCE',
      titlePart1: 'Premium Indonesian',
      titleHighlight: 'Dried Seafood & Fish',
      titlePart2: 'For Global Markets',
      description: 'Direct exporter of Grade AAA Indonesian dried anchovy (teri nasi/whitebait), salted kurisi & jambal roti, sun-dried squid, and export-grade fish maw. Produced with closed Solar Dome drying technology, strictly zero chemical preservatives, compliant with HACCP and international SPS quarantine standards.',
      ctaRfq: 'Request Formal RFQ',
      ctaCatalog: 'Download Export Catalog (PDF)',
      ctaCalculator: 'Freight Rate Calculator',
      trust1Title: 'HACCP & Health Certificate',
      trust1Desc: 'Official Quarantine Health Certificate issued per shipment by BKIPM Marine Fisheries Ministry.',
      trust2Title: 'Solar Dome Hygiene',
      trust2Desc: 'Enclosed sanitary drying protecting from dust, insects, and humidity fluctuations.',
      trust3Title: 'Zero Chemical Preservatives',
      trust3Desc: 'Guaranteed 100% natural sea salt cure. Formulated without formalin, bleach, or chlorine.',
      trust4Title: 'Worldwide FCL & LCL Delivery',
      trust4Desc: 'Fast air freight and moisture-absorbed sea containers to 45+ international ports.',
      statCountries: '45+',
      statCountriesLabel: 'Destination Countries',
      statVolume: '350+ MT',
      statVolumeLabel: 'Annual Export Tonnage',
      statSatisfaction: '99.4%',
      statSatisfactionLabel: 'Batch Acceptance Rate',
      statFarms: '1,200+',
      statFarmsLabel: 'Partner Artisanal Fishermen'
    },
    about: {
      badge: 'EXPORT QUALITY HERITAGE',
      title: 'Decades of Preserving Marine Wealth with Modern Hygiene',
      subtitle: 'Dried Seafood Global bridges Indonesia\'s rich archipelagic fishery with stringent global food safety protocols.',
      description: 'PT Dried Seafood Global Indonesia combines 30+ years of traditional maritime artisanal craftsmanship with modern closed Solar Dome drying, vacuum food-grade packaging, and strict BKIPM/HACCP quarantine certifications for global markets.',
      tabs: {
        services: 'Services & Capabilities',
        profile: 'Corporate Profile',
        leadership: 'Executive Team',
        certifications: 'Accreditation & Compliance'
      },
      pillar1Title: 'Solar Dome Dryer Technology',
      pillar1Desc: 'We replaced traditional open-ground drying with climate-controlled, UV-shielded polycarbonate solar domes. This guarantees clean, insect-free, and uniformly dried commodities with moisture controlled below 15-20%.',
      pillar2Title: 'Rigorous Lab Testing (COA)',
      pillar2Desc: 'Every production batch undergoes independent organoleptic, heavy metal, histamine, and microbiological analysis before customs clearance.',
      pillar3Title: 'Direct Fishermen Empowerment',
      pillar3Desc: 'Partnering with over 1,200 coastal fishermen across Java, Sumatra, and Sulawesi using selective non-trawl fishing gears and fair-trade purchasing agreements.',
      pillar4Title: 'Specialized Export Packaging',
      pillar4Desc: 'Vacuum-sealed food grade pouches, multi-wall master cartons with food-safe desiccant packs, and temperature-controlled Reefer or dry container stuffing.',
      certSectionTitle: 'Internationally Accredited Certifications',
      certHaccpTitle: 'HACCP Grade A Certified',
      certHaccpDesc: 'Rigorous Hazard Analysis Critical Control Point system governing reception, salting, drying, and packing.',
      certBkipmTitle: 'BKIPM Health Certificate (KKP)',
      certBkipmDesc: 'Official sanitary and phytosanitary certificate for marine fishery products required by EU, US FDA, and Asia.',
      certFdaTitle: 'US FDA & Customs Compliant',
      certFdaDesc: 'Registered food facility adhering to Foreign Supplier Verification Program (FSVP) guidelines.',
      certHalalTitle: 'MUI / BPJPH Halal Certified',
      certHalalDesc: '100% Halal certified processing and supply chain traceability.'
    },
    commodities: {
      badge: 'EXPORT GRADE COMMODITIES',
      title: 'Flagship Indonesian Dried Seafood & Salted Fish',
      subtitle: 'Direct sourcing from Belawan, Cilacap, and East Java ports. Sun-dried in clean Solar Domes with zero formalin or synthetic preservatives.',
      downloadCatalog: 'Download Export Catalog (PDF)',
      filterAll: 'All Products',
      filterFish: 'Salted & Dried Fish',
      filterSquid: 'Dried Squid & Octopus',
      filterMaw: 'Fish Maw (Premium)',
      filterShrimp: 'Dried Shrimp & Ebi',
      searchPlaceholder: 'Search by fish name, species, origin, HS Code...',
      origin: 'Harvest Origin',
      grade: 'Quality Grade',
      moq: 'Minimum Order (MOQ)',
      supplyCapacity: 'Supply Capacity',
      certifications: 'Export Certifications',
      specs: 'Technical Specs',
      requestQuote: 'Request RFQ'
    },
    products: {
      badge: 'FLAGSHIP COMMODITIES',
      title: 'Export Grade Dried Fish & Seafood Selection',
      subtitle: 'Sorted by hand, vacuum-packed, and custom-labeled for commercial importers, Asian supermarket chains, and food manufacturers.',
      filterAll: 'All Products',
      filterFish: 'Salted & Dried Fish',
      filterSquid: 'Dried Squid & Octopus',
      filterPremium: 'Premium (Fish Maw / Sea Cucumber)',
      specGrade: 'Grade',
      specMoisture: 'Moisture',
      specSalt: 'Salt Content',
      specPackaging: 'Export Packaging',
      specHsCode: 'HS Code',
      specMoq: 'Min. Order (MOQ)',
      btnInquire: 'Inquire This Item',
      btnDownloadSpec: 'Spec Sheet',
      naturalDried: 'Solar Dome Dried',
      chemicalFree: 'Formalin Free Lab Tested'
    },
    workflow: {
      badge: 'END-TO-END EXECUTION',
      title: 'Seamless Export Process from Harbour to Destination Port',
      subtitle: 'Our experienced trade team manages procurement, quality inspection, export documentation, customs clearance, and global logistics.',
      step1Title: '1. RFQ & Specification Agreement',
      step1Desc: 'Submit target species, grade, moisture range, packaging preference, and incoterm (FOB, CFR, CIF). We provide formal commercial invoice and lab specs within 24 hours.',
      step2Title: '2. Sorting & Production Run',
      step2Desc: 'Fresh catch is salted with pure marine salt, dried in clean solar domes, and sorted by size and color consistency.',
      step3Title: '3. Laboratory QA & Quarantine Inspection',
      step3Desc: 'Inspectors from BKIPM examine the batch. Official Health Certificate, Certificate of Origin (COO), and Certificate of Analysis (COA) are issued.',
      step4Title: '4. Vacuum Packing & Container Stuffing',
      step4Desc: 'Goods packed in 500g/1kg retail vacuum packs or 10kg-25kg bulk master cartons with high-absorption desiccants for voyage protection.',
      step5Title: '5. Dispatch & Customs Clearance',
      step5Desc: 'Containers loaded at Jakarta (Tanjung Priok), Belawan, or Surabaya, or air-shipped via Soekarno-Hatta (CGK). Full BL and export docs sent for prompt clearance.'
    },
    calculator: {
      badge: 'REAL-TIME LOGISTICS',
      title: 'International Freight & Transit Time Calculator',
      subtitle: 'Calculate estimated ocean container (FCL/LCL) and air cargo freight rates from Indonesia to 140+ global destinations.',
      originLabel: 'Departure Port / Airport',
      destLabel: 'Destination Port / Country',
      modeLabel: 'Shipping Mode',
      weightLabel: 'Cargo Weight (Kg)',
      btnCalculate: 'Calculate Freight Estimate',
      resultTitle: 'Official Freight Quote Estimate',
      transitTime: 'Estimated Transit Time',
      estTotal: 'Estimated Total Cost',
      btnExportSlip: 'Copy Quotation Summary',
      btnOrderShipping: 'Proceed with Cargo Booking'
    },
    gallery: {
      badge: 'FACILITIES & PRODUCTION',
      title: 'Behind the Scenes: Modern Seafood Processing',
      subtitle: 'Explore high-resolution visual evidence of our sanitary solar drying domes, cold storage facilities, grading tables, and export container operations.',
      filterAll: 'All Facilities',
      filterProcessing: 'Solar Domes & Sorting',
      filterCommodities: 'Fish & Seafood Grades',
      filterStorage: 'Dehumidified Storage',
      filterShipping: 'Export Container Stuffing',
      filterSustainability: 'Fishermen Empowerment'
    },
    map: {
      badge: 'GLOBAL REACH & PROCESSING NETWORK',
      title: 'Strategic Production Hubs & International Export Routes',
      subtitle: 'With processing centres located near pristine fishing grounds in Pantura, Belawan, Pangandaran, and Makassar, directly linked to major international seaports.',
      headquartersTitle: 'Corporate HQ & Export Office',
      portHubTitle: 'Deep Sea Loading Terminal',
      storageFacilityTitle: 'Climate Controlled Storage'
    },
    testimonials: {
      badge: 'VERIFIED TRADE PARTNERS',
      title: 'What Global Importers Say About Our Quality',
      subtitle: 'Read authentic feedback from procurement directors, seafood wholesalers, and retail chain distributors across North America, Asia, and the Middle East.',
      buyerRole: 'Verified Global Importer'
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Export Compliance, Minimum Orders & Payment Terms',
      subtitle: 'Clear answers to common questions asked by international buyers before placing an initial container or air trial order.',
      q1: 'What documents do you provide for customs and quarantine clearance?',
      a1: 'We provide complete export documentation: Health Certificate from BKIPM (Indonesian Ministry of Marine Affairs & Fisheries), Certificate of Origin (COO / Form D/AK/E), Commercial Invoice, Packing List, Certificate of Analysis (COA), Bill of Lading (BL) / Air Waybill (AWB), and Fumigation certificate if required.',
      q2: 'What is your Minimum Order Quantity (MOQ)?',
      a2: 'For premium commodities such as Fish Maw and Dried Sea Cucumber, trial air shipments start from 25 kg - 50 kg. For salted fish (Jambal Roti, Tenggiri) and dried anchovies (Teri Nasi), minimum LCL order is 500 kg, while full container load (FCL 20ft) holds 10 to 14 metric tonnes.',
      q3: 'How do you guarantee moisture stability during long sea voyages?',
      a3: 'Our products are dried down to 12%-18% moisture under controlled solar domes. We use multi-layer vacuum barrier pouches with industrial food-grade desiccants and moisture-trap container liners inside the shipping container.',
      q4: 'What are your accepted international payment terms?',
      a4: 'We accept Irrevocable Letter of Credit (L/C at sight) from prime international banks, Telegraphic Transfer (T/T with 30% deposit upon order confirmation and 70% against copy Bill of Lading), or escrow arrangements for verified institutional buyers.'
    },
    contact: {
      badge: 'INSTANT EXPORT QUOTATION',
      title: 'Request a Formal Export Price Quote (RFQ)',
      subtitle: 'Send us your commodity specifications, volume requirement, and destination port. Our export trade managers will respond with FOB/CIF quotation within 4-12 hours.',
      nameLabel: 'Your Full Name',
      emailLabel: 'Business Email Address',
      phoneLabel: 'WhatsApp / Phone (with Country Code)',
      companyLabel: 'Company Name & Country',
      productLabel: 'Requested Seafood Commodity',
      volumeLabel: 'Estimated Order Volume (Kg / MT)',
      destinationLabel: 'Destination Port / Country',
      messageLabel: 'Detailed Requirements / Packaging Specifications',
      submitBtn: 'Submit Export Inquiry (SSL Encrypted)',
      sending: 'Submitting Inquiry Securely...',
      successMessage: 'Thank you! Your RFQ has been received and routed to our Senior Export Specialist. A formal quotation will be sent to your email shortly.',
      sslNote: 'Protected by TLS 1.3 256-bit encryption. Your commercial data is strictly confidential.'
    },
    footer: {
      tagline: 'Leading Indonesian exporter of premium dried seafood, salted fish, dried squid, and fish maw. Certified HACCP Grade A and BKIPM Quarantine compliant.',
      addressLabel: 'Main Export Terminal & HQ',
      hotlineLabel: '24/7 International Desk',
      emailLabel: 'Commercial RFQ Desk',
      quickLinks: 'Commercial Sections',
      compliance: 'Export Standards & Certifications',
      copyright: 'Dried Seafood Global. All International Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of International Trade (Incoterms 2020)',
      sslEncryption: 'SSL Security Certificate',
      securityTitle: 'Enterprise Transaction & Trade Security Guaranteed',
      securityDesc: 'TLS 1.3 256-Bit DigiCert Encryption • ISO 9001:2015, ISO 27001 & AEO Gold Certified',
      description: 'Official exporter of premium Indonesian dried marine products and salted fish. Connecting Indonesian archipelagic wealth to international buyers with HACCP hygiene standards, chemical-free processing, and official quarantine clearance.',
      productsTitle: 'Export Commodities & Services',
      complianceTitle: 'Compliance & Official Accreditation',
      rightsReserved: 'All Rights Reserved'
    }
  },

  id: {
    topBar: {
      sslVerified: 'Eksportir Terverifikasi TLS 1.3 EV SSL',
      liveMonitor: 'Radar Langsung',
      buyersOnline: 'Buyer Internasional Aktif',
      qualityBadge: 'HACCP Grade A • Sertifikat Karantina KKP Resmi',
      hotlineLabel: 'Hotline Ekspor 24/7:',
      adminPortal: 'Portal Admin'
    },
    nav: {
      home: 'Beranda',
      about: 'Tentang & Mutu',
      products: 'Katalog Ekspor',
      workflow: 'Alur Ekspor',
      shippingCalc: 'Estimasi Ongkir',
      docsHub: 'Dokumentasi & Hub',
      gallery: 'Galeri Sentra & Fasilitas',
      galleryDesc: 'Dokumentasi Solar Dome, grading & gudang higienis',
      mapHubs: 'Peta Sentra & Hub Ekspor',
      mapHubsDesc: 'Lokasi kantor Jakarta, Belawan, Cilacap, Surabaya',
      testimonials: 'Testimoni Importir Global',
      testimonialsDesc: 'Ulasan pembeli dari Singapura, Taiwan, AS, UEA, Jepang',
      insights: 'Wawasan & Riset Pasar',
      insightsDesc: 'Panduan regulasi karantina BKIPM & tren komoditas',
      contactRfq: 'Kontak RFQ',
      requestRfqBtn: 'Minta Penawaran (RFQ)',
      hotline24h: 'Hotline Ekspor 24 Jam:',
      adminOpen: 'Buka Portal Manajemen Admin'
    },
    hero: {
      badge: 'EKSPORTIR RESMI PRODUK HASIL LAUT KHAS INDONESIA',
      titlePart1: 'Produk Ikan Asin &',
      titleHighlight: 'Hasil Laut Kering Premium',
      titlePart2: 'Pasar Internasional',
      description: 'Eksportir langsung ikan asin jambal roti, teri nasi super (whitebait), cumi kering sero, tenggiri, dan gelembung ikan (fish maw) kualitas ekspor. Diproses dengan teknologi Solar Dome higienis, 100% bebas formalin & pengawet sintetis, serta bersertifikasi resmi HACCP dan Karantina BKIPM KKP.',
      ctaRfq: 'Minta Penawaran Resmi (RFQ)',
      ctaCatalog: 'Unduh Katalog Ekspor (PDF)',
      ctaCalculator: 'Kalkulator Ongkir Kargo',
      trust1Title: 'Sertifikat Karantina & HACCP',
      trust1Desc: 'Health Certificate resmi dari BKIPM Kementerian Kelautan dan Perikanan (KKP) diterbitkan di setiap pengiriman.',
      trust2Title: 'Higienitas Solar Dome Tertutup',
      trust2Desc: 'Pengeringan kubah surya bebas debu, lalat, dan polusi luar dengan kadar air presisi di bawah 15-20%.',
      trust3Title: '100% Alami Tanpa Formalin',
      trust3Desc: 'Pengawetan hanya menggunakan garam laut murni tanpa pemutih, klorin, atau zat kimia berbahaya.',
      trust4Title: 'Jangkauan Ekspor Laut & Udara',
      trust4Desc: 'Pengiriman kontainer FCL/LCL serta kargo udara kilat ke 45+ negara tujuan ekspor utama dunia.',
      statCountries: '45+',
      statCountriesLabel: 'Negara Tujuan Ekspor',
      statVolume: '350+ Ton',
      statVolumeLabel: 'Kapasitas Ekspor Tahunan',
      statSatisfaction: '99.4%',
      statSatisfactionLabel: 'Tingkat Penerimaan Mutu',
      statFarms: '1.200+',
      statFarmsLabel: 'Nelayan Tradisional Binaan'
    },
    about: {
      badge: 'WARISAN MUTU HASIL LAUT',
      title: 'Puluhan Tahun Mengolah Kekayaan Bahari Nusantara dengan Standar Higienis Modern',
      subtitle: 'Dried Seafood Global memadukan keaslian rasa hasil laut tradisional Indonesia dengan protokol keamanan pangan internasional yang ketat.',
      description: 'PT Dried Seafood Global Indonesia memadukan pengalaman 30+ tahun pengolahan hasil laut nusantara dengan teknologi penjemuran modern Solar Dome tertutup, kemasan hampa udara berstandar pangan, dan sertifikasi karantina resmi KKP/BKIPM untuk pasar ekspor global.',
      tabs: {
        services: 'Layanan & Operasional',
        profile: 'Profil Perusahaan',
        leadership: 'Tim Manajemen',
        certifications: 'Sertifikasi & Legalitas'
      },
      pillar1Title: 'Teknologi Kubah Pengering (Solar Dome)',
      pillar1Desc: 'Kami mentransformasi metode penjemuran konvensional menjadi penjemuran kubah surya polikarbonat bersirkulasi udara terkontrol. Menghasilkan produk yang higienis, bebas serangga, dan berkadar air konsisten.',
      pillar2Title: 'Uji Laboratorium Mandiri & Berkala (COA)',
      pillar2Desc: 'Setiap lot produksi diuji secara organoleptik, uji kadar histamin, logam berat, dan mikrobiologi sebelum pengurusan dokumen kepabeanan dan karantina.',
      pillar3Title: 'Pemberdayaan 1.200+ Nelayan Pesisir',
      pillar3Desc: 'Bermitra langsung dengan kelompok nelayan tangkap ramah lingkungan di pesisir Pantura Jawa, Belawan, Cilacap, dan Sulawesi dengan harga pembelian yang adil.',
      pillar4Title: 'Standar Kemasan Ekspor Kedap Udara',
      pillar4Desc: 'Pilihan kemasan vacuum pack food grade untuk ritel serta master carton tebal dengan moisture absorber food grade untuk perjalanan laut antarbenua.',
      certSectionTitle: 'Akreditasi & Sertifikasi Ekspor Lengkap',
      certHaccpTitle: 'Sertifikasi HACCP Grade A',
      certHaccpDesc: 'Sistem manajemen keamanan pangan ketat dari penerimaan bahan baku, penggaraman, penjemuran, hingga pengepakan akhir.',
      certBkipmTitle: 'Health Certificate Resmi BKIPM',
      certBkipmDesc: 'Sertifikat kesehatan resmi yang menjadi syarat wajib masuk pelabuhan ekspor di AS, Uni Eropa, dan Asia.',
      certFdaTitle: 'Kepatuhan Standar US FDA',
      certFdaDesc: 'Fasilitas terdaftar yang memenuhi regulasi Foreign Supplier Verification Program (FSVP).',
      certHalalTitle: 'Sertifikasi Halal MUI / BPJPH',
      certHalalDesc: '100% proses penanganan terjamin halal dan memiliki ketertelusuran rantai pasok yang bersih.'
    },
    commodities: {
      badge: 'KOMODITAS UNGGULAN EKSPOR',
      title: 'Pilihan Ikan Asin & Hasil Laut Kering Kualitas Ekspor',
      subtitle: 'Dipanen langsung dari nelayan Belawan, Cilacap, dan pesisir Nusantara. Dikeringkan higienis tanpa formalin atau bahan kimia berbahaya.',
      downloadCatalog: 'Unduh Katalog Ekspor (PDF)',
      filterAll: 'Semua Produk',
      filterFish: 'Ikan Kering & Asin',
      filterSquid: 'Cumi & Gurita Kering',
      filterMaw: 'Fish Maw & Mewah',
      filterShrimp: 'Udang Kering & Ebi',
      searchPlaceholder: 'Cari nama ikan, spesies, daerah asal, Kode HS...',
      origin: 'Asal / Origin',
      grade: 'Grade Mutu',
      moq: 'Minimum Order (MOQ)',
      supplyCapacity: 'Kapasitas Pasokan',
      certifications: 'Sertifikasi Mutu & Pasar Ekspor',
      specs: 'Spesifikasi Teknis',
      requestQuote: 'Minta RFQ'
    },
    products: {
      badge: 'KOMODITAS UNGGULAN EKSPOR',
      title: 'Pilihan Ikan Asin & Hasil Laut Kering Kualitas Ekspor',
      subtitle: 'Tersortir rapi secara manual, dikemas vacuum pack higienis, dan siap diekspor ke distributor, supermarket Asia, dan manufaktur makanan internasional.',
      filterAll: 'Semua Produk',
      filterFish: 'Ikan Asin & Kering',
      filterSquid: 'Cumi & Gurita Kering',
      filterPremium: 'Premium (Fish Maw / Teripang)',
      specGrade: 'Tingkat Mutu',
      specMoisture: 'Kadar Air',
      specSalt: 'Kadar Garam',
      specPackaging: 'Kemasan Ekspor',
      specHsCode: 'Kode HS',
      specMoq: 'Minimal Order (MOQ)',
      btnInquire: 'Ajukan Penawaran Produk Ini',
      btnDownloadSpec: 'Lembar Spesifikasi',
      naturalDried: 'Penjemuran Solar Dome',
      chemicalFree: 'Uji Lab Bebas Formalin'
    },
    workflow: {
      badge: 'ALUR EKSPOR PROFESIONAL',
      title: 'Proses Ekspor Terstruktur dari Sentra ke Pelabuhan Tujuan',
      subtitle: 'Tim ekspor berpengalaman kami menangani pengadaan, inspeksi mutu, legalitas karantina, kepabeanan, hingga pelayaran internasional.',
      step1Title: '1. Konsultasi Spesifikasi & RFQ',
      step1Desc: 'Sampaikan jenis komoditas, tingkat mutu, kadar air, kemasan, dan incoterm yang diinginkan (FOB, CFR, CIF). Kami terbitkan penawaran resmi dalam 24 jam.',
      step2Title: '2. Sortasi Ketat & Pengolahan',
      step2Desc: 'Ikan segar pilihan digarami dengan garam laut alami, dijemur pada Solar Dome higienis, dan disortasi berdasarkan keseragaman ukuran dan warna.',
      step3Title: '3. Uji Mutu & Inspeksi Karantina BKIPM',
      step3Desc: 'Inspektur resmi dari BKIPM KKP melakukan pemeriksaan fisik dan uji sampel untuk menerbitkan Health Certificate, COO, dan sertifikat mutu.',
      step4Title: '4. Pengemasan Vacuum & Pemuatan Kontainer',
      step4Desc: 'Produk disegel dalam vacuum pack food grade atau master carton tebal dengan moisture absorber untuk menjaga kerenyahan selama pelayaran panjang.',
      step5Title: '5. Keberangkatan & Bea Cukai Pelabuhan',
      step5Desc: 'Kontainer dimuat di Tanjung Priok, Belawan, atau Tanjung Perak, atau diterbangkan via Bandara Soekarno-Hatta (CGK) dengan dokumen pengapalan lengkap.'
    },
    calculator: {
      badge: 'LOGISTIK REAL-TIME',
      title: 'Kalkulator Estimasi Ongkir Kargo & Waktu Transit',
      subtitle: 'Hitung perkiraan biaya pengiriman kontainer laut (FCL/LCL) dan kargo udara ekspres dari Indonesia ke lebih dari 140 negara tujuan.',
      originLabel: 'Pelabuhan / Bandara Asal',
      destLabel: 'Negara / Pelabuhan Tujuan',
      modeLabel: 'Metode Pengiriman',
      weightLabel: 'Berat Kargo (Kg)',
      btnCalculate: 'Hitung Estimasi Ongkir',
      resultTitle: 'Estimasi Resmi Biaya Logistik',
      transitTime: 'Estimasi Waktu Tempuh',
      estTotal: 'Perkiraan Total Biaya',
      btnExportSlip: 'Salin Ringkasan Penawaran',
      btnOrderShipping: 'Lanjutkan Pemesanan Kargo'
    },
    gallery: {
      badge: 'SENTRA & FASILITAS PRODUKSI',
      title: 'Melihat Lebih Dekat Fasilitas Pengolahan Modern Kami',
      subtitle: 'Jelajahi dokumentasi resolusi tinggi kubah Solar Dome, ruang sortir higienis, gudang dehumidified, dan pemuatan kontainer ekspor.',
      filterAll: 'Semua Dokumentasi',
      filterProcessing: 'Solar Dome & Pengeringan',
      filterCommodities: 'Produk & Grading',
      filterStorage: 'Gudang & Lab Uji Mutu',
      filterShipping: 'Pemuatan Kontainer',
      filterSustainability: 'Pemberdayaan Nelayan'
    },
    map: {
      badge: 'JARINGAN HUB & PRODUKSI',
      title: 'Sebaran Sentra Pengolahan & Jalur Ekspor Internasional',
      subtitle: 'Pabrik dan sentra pengolahan kami berlokasi strategis di dekat perairan kaya ikan di Pantura Jawa, Belawan, Cilacap, dan Sulawesi.',
      headquartersTitle: 'Kantor Pusat & Terminal Ekspor',
      portHubTitle: 'Pelabuhan Utama Petikemas',
      storageFacilityTitle: 'Gudang Terkontrol Kelembaban'
    },
    testimonials: {
      badge: 'MITRA BISNIS TERVERIFIKASI',
      title: 'Testimoni Pembeli & Importir Internasional',
      subtitle: 'Ulasan langsung dari para direktur pengadaan pangan, importir grosir, dan distributor supermarket Asia di berbagai belahan dunia.',
      buyerRole: 'Importir Terverifikasi'
    },
    faq: {
      badge: 'PERTANYAAN UMUM EKSPOR',
      title: 'Kepatuhan Regulasi, Minimal Order & Ketentuan Pembayaran',
      subtitle: 'Jawaban transparan untuk pertanyaan yang sering diajukan importir internasional sebelum memulai pesanan uji coba atau kontrak jangka panjang.',
      q1: 'Dokumen legal apa saja yang disertakan dalam setiap pengiriman ekspor?',
      a1: 'Kami menyertakan dokumen lengkap: Health Certificate resmi dari BKIPM KKP, Certificate of Origin (COO / Form AK/D/E), Commercial Invoice, Packing List, Certificate of Analysis (COA) hasil uji lab, Bill of Lading (B/L) atau Air Waybill (AWB), serta sertifikat fumigasi jika disyaratkan negara tujuan.',
      q2: 'Berapa Minimum Order Quantity (MOQ) untuk pembelian ekspor?',
      a2: 'Untuk komoditas bernilai tinggi seperti Fish Maw dan Teripang Kering, trial order via kargo udara mulai dari 25 kg - 50 kg. Untuk ikan asin (Jambal Roti, Tenggiri) dan teri nasi super, minimum LCL adalah 500 kg, sedangkan pemesanan kontainer 20ft (FCL) menampung sekitar 10 hingga 14 ton.',
      q3: 'Bagaimana Anda menjamin ikan asin tidak berjamur selama pelayaran laut berhari-hari?',
      a3: 'Kadar air dikeringkan secara terukur di bawah 15%-18% menggunakan Solar Dome, dikemas dalam vacuum bag tebal kedap udara, dilapisi master carton kokoh, dan dilengkapi moisture absorber desiccant di dalam kontainer kargo laut.',
      q4: 'Apa saja metode pembayaran internasional yang diterima?',
      a4: 'Kami menerima Irrevocable Letter of Credit (L/C at sight) yang diterbitkan bank internasional terkemuka, Telegraphic Transfer (T/T dengan uang muka 30% saat konfirmasi PO dan 70% setelah copy Bill of Lading terbit), serta skema escrow untuk pembeli korporat terverifikasi.'
    },
    contact: {
      badge: 'RESPONS CEPAT 24 JAM',
      title: 'Formulir Permintaan Penawaran Harga Ekspor (RFQ)',
      subtitle: 'Sampaikan jenis komoditas hasil laut yang Anda butuhkan, estimasi volume, dan pelabuhan tujuan. Manajer ekspor kami akan mengirimkan kalkulasi penawaran resmi dalam 4-12 jam.',
      nameLabel: 'Nama Lengkap Anda',
      emailLabel: 'Alamat Email Bisnis',
      phoneLabel: 'Nomor WhatsApp / Telepon (dengan Kode Negara)',
      companyLabel: 'Nama Perusahaan & Negara Asal',
      productLabel: 'Komoditas yang Diminati',
      volumeLabel: 'Estimasi Kebutuhan Volume (Kg / Ton)',
      destinationLabel: 'Pelabuhan / Negara Tujuan',
      messageLabel: 'Rincian Spesifikasi / Preferensi Kemasan',
      submitBtn: 'Kirim Permintaan Penawaran (Terkirim Aman SSL)',
      sending: 'Mengirimkan Permintaan Secara Aman...',
      successMessage: 'Terima kasih! Permintaan penawaran (RFQ) Anda telah terenkripsi dan diteruskan ke Senior Export Specialist kami. Penawaran resmi akan dikirim ke email Anda dalam hitungan jam.',
      sslNote: 'Dilindungi enkripsi TLS 1.3 256-bit. Data bisnis dan korespondensi Anda dijamin kerahasiaannya.'
    },
    footer: {
      tagline: 'Eksportir terpercaya hasil laut kering, ikan asin jambal, teri nasi super, cumi kering, dan gelembung ikan khas Indonesia bersertifikasi HACCP dan Karantina KKP.',
      addressLabel: 'Sentra Kantor Ekspor & Gudang',
      hotlineLabel: 'Hotline Ekspor Internasional',
      emailLabel: 'Email Permintaan RFQ',
      quickLinks: 'Navigasi Cepat',
      compliance: 'Kepatuhan & Sertifikasi Mutu',
      copyright: 'Dried Seafood Global. Seluruh Hak Cipta Internasional Dilindungi.',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat & Ketentuan Perdagangan Internasional',
      sslEncryption: 'Sertifikat Enkripsi SSL',
      securityTitle: 'Keamanan Transaksi & Data Korporat Terjamin',
      securityDesc: 'Enkripsi TLS 1.3 256-Bit • Bersertifikasi ISO 9001:2015, ISO 27001, & AEO Gold',
      description: 'Eksportir resmi terkemuka hasil laut kering dan ikan asin khas Nusantara. Menghubungkan kekayaan laut Indonesia ke pasar internasional dengan standar higienis HACCP, bebas formalin, dan sertifikasi karantina resmi.',
      productsTitle: 'Produk & Layanan',
      complianceTitle: 'Kepatuhan & Sertifikasi',
      rightsReserved: 'Seluruh Hak Cipta Dilindungi Undang-Undang'
    }
  },

  zh: {
    topBar: {
      sslVerified: 'TLS 1.3 EV SSL 认证出口商',
      liveMonitor: '实时监控',
      buyersOnline: '位全球采购商在线',
      qualityBadge: 'HACCP A级认证 • 印尼海洋渔业部检疫健康证',
      hotlineLabel: '24/7 出口专线:',
      adminPortal: '管理后台'
    },
    nav: {
      home: '首页',
      about: '关于与品质',
      products: '出口目录',
      workflow: '出口流程',
      shippingCalc: '海空运费计算',
      docsHub: '资质与枢纽',
      gallery: '加工厂实拍',
      galleryDesc: '太阳能烘干棚、分级挑选与恒温仓储',
      mapHubs: '港口与出口枢纽',
      mapHubsDesc: '雅加达、勿老湾、芝拉扎、泗水加工与出货港',
      testimonials: '全球买家评价',
      testimonialsDesc: '新加坡、台湾、美国、阿联酋、日本采购商实名反馈',
      insights: '市场研报与法规',
      insightsDesc: 'BKIPM海关检疫SPS标准与水产干货市场动态',
      contactRfq: '询价联系',
      requestRfqBtn: '获取正式报价 (RFQ)',
      hotline24h: '24小时出口热线:',
      adminOpen: '登录出口管理系统'
    },
    hero: {
      badge: '印尼国家渔业官方推荐海鲜出口商',
      titlePart1: '印度尼西亚特级',
      titleHighlight: '水产干货与优质咸鱼',
      titlePart2: '直供全球各大市场',
      description: '专业出口印尼原产特级白饭鱼/银鱼干、精选咸马友鱼（Jambal Roti）、天然晒制鱿鱼干、马鲛鱼干、特级花胶鱼鳔及海参。采用全封闭太阳能环保聚碳酸酯烘干棚（Solar Dome），天然纯海盐腌制，零甲醛添加，完全符合 HACCP 标准与国际 SPS 检验检疫要求。',
      ctaRfq: '立即索取正式报价单 (RFQ)',
      ctaCatalog: '下载出口产品手册 (PDF)',
      ctaCalculator: '国际海空运费测算',
      trust1Title: '官方卫生检疫证书 (Health Cert)',
      trust1Desc: '印尼海洋与渔业部 (BKIPM) 每批出口逐批验货，出具权威动植物卫生检疫证书。',
      trust2Title: '全封闭太阳能烘干房',
      trust2Desc: '告别传统露天晾晒，防尘、防苍蝇、防外部污染，水分严格控制在15%-18%以内。',
      trust3Title: '100% 天然无化学防腐剂',
      trust3Desc: '天然海盐脱水腌制，实验室化验保证零甲醛、零漂白剂、零过量组胺。',
      trust4Title: '全球集装箱整柜与拼箱',
      trust4Desc: '专业整柜 (FCL)、拼箱 (LCL) 及空运冷链直送全球45个以上核心贸易港口。',
      statCountries: '45+',
      statCountriesLabel: '出口覆盖国家与地区',
      statVolume: '350+ 吨',
      statVolumeLabel: '年出口供货总量',
      statSatisfaction: '99.4%',
      statSatisfactionLabel: '到港验收合格率',
      statFarms: '1,200+',
      statFarmsLabel: '签约合作传统渔民'
    },
    about: {
      badge: '数十年海洋干货深耕',
      title: '立足印尼群岛丰富渔业资源，践行国际顶尖食品卫生标准',
      subtitle: 'Dried Seafood Global 致力于将印尼最优质的深海天然水产，以严苛的出口卫生标准输送至全球各大华人商超、食品加工厂与批发贸易商。',
      description: 'PT Dried Seafood Global Indonesia 将30余年传统南洋海味干货精制工艺与现代封闭式太阳能穹顶干燥技术相结合，辅以食品级抽真空包装和BKIPM国家渔业检疫认证，为全球买家提供纯天然、高卫生规格的优质水产干货。',
      tabs: {
        services: '业务与供应链',
        profile: '公司概况',
        leadership: '管理团队',
        certifications: '资质与海关认证'
      },
      pillar1Title: '太阳能穹顶干燥技术 (Solar Dome)',
      pillar1Desc: '全面升级为双层聚碳酸酯防紫外线太阳能干燥棚，恒定通风与温度监测，确保干货成色金黄自然、受热均匀、无沙无杂质。',
      pillar2Title: '第三方权威化验分析报告 (COA)',
      pillar2Desc: '每批货物装运前均送交实验室检测，提供组胺、重金属、大肠杆菌群及水分指标检验报告。',
      pillar3Title: '直连 1200+ 沿海原生态渔民',
      pillar3Desc: '长期帮扶爪哇海、苏门答腊与苏拉威西沿海渔民，采购环保非拖网渔获，保障源头原料新鲜度与公平贸易。',
      pillar4Title: '出口级多重防潮真空包装',
      pillar4Desc: '提供 500g/1kg 食品级加厚抽真空内包装，外箱采用多层耐压牛皮瓦楞箱，内置高效防潮干燥剂包。',
      certSectionTitle: '完备的国际贸易合规资质',
      certHaccpTitle: 'HACCP A 级体系认证',
      certHaccpDesc: '贯穿原料验收、清洗切块、盐渍控温、恒温烘干至无菌包装的全流程危害控制。',
      certBkipmTitle: '印尼国家渔业检疫 Health Certificate',
      certBkipmDesc: '中国海关、美国 FDA、欧盟及东盟各国清关必备的原产地官方水产卫生证书。',
      certFdaTitle: '符合美国 FDA FSVP 进口规范',
      certFdaDesc: '完备的海外供应商验证程序，保障出口至北美市场的食品安全合规。',
      certHalalTitle: '印尼官方清真 HALAL 认证',
      certHalalDesc: '100% 清真合规加工环节与洁净供应链追溯体系。'
    },
    commodities: {
      badge: '核心出口商品',
      title: '高品质印尼水产干货与海鲜精品',
      subtitle: '直采自勿老湾、芝拉扎与爪哇海沿海渔场。采用洁净太阳能穹顶烘干，绝无甲醛、防腐剂或任何化学添加。',
      downloadCatalog: '下载出口产品手册 (PDF)',
      filterAll: '全部商品',
      filterFish: '传统咸鱼干',
      filterSquid: '鱿鱼干与海味',
      filterMaw: '鱼胶花胶 (顶级)',
      filterShrimp: '深海开洋虾米',
      searchPlaceholder: '搜索鱼种、品名、产地、海关编码...',
      origin: '捕捞产地',
      grade: '品质等级',
      moq: '最小起订量 (MOQ)',
      supplyCapacity: '年供货能力',
      certifications: '出口检验认证',
      specs: '技术规格指标',
      requestQuote: '索取正式报价 (RFQ)'
    },
    products: {
      badge: '核心出口商品',
      title: '高品质印尼水产干货与海鲜精品',
      subtitle: '人工严选分级、食品级抽真空包装，专为海外华人超市、亚洲食品批发商与餐饮供应链定制。',
      filterAll: '全部商品',
      filterFish: '传统咸鱼干',
      filterSquid: '鱿鱼干与海味',
      filterPremium: '贵细海味 (花胶 / 海参)',
      specGrade: '产品等级',
      specMoisture: '含水量',
      specSalt: '含盐量',
      specPackaging: '出口包装形式',
      specHsCode: '海关编码 (HS Code)',
      specMoq: '起订量 (MOQ)',
      btnInquire: '对此商品发起询盘',
      btnDownloadSpec: '下载规格书',
      naturalDried: '太阳能棚烘干',
      chemicalFree: '实验室无甲醛检测'
    },
    workflow: {
      badge: '规范出口贸易全流程',
      title: '从源头渔港直达目的港的无忧跨境履约',
      subtitle: '专业外贸团队全权代办货源采购、质量检验、官方检疫、原产地证、海运订舱与清关协助。',
      step1Title: '1. 明确规格与报价协议 (RFQ)',
      step1Desc: '提交您需要的品类、品级、水分、包装要求与贸易条款 (FOB/CFR/CIF)，24小时内提供正式商业发票与报价单。',
      step2Title: '2. 鲜活源头挑选与加工',
      step2Desc: '新鲜捕捞的水产使用精制海盐适度腌制，进入太阳能大棚控温脱水，按规格人工精细分级。',
      step3Title: '3. 实验室检测与官方检验检疫',
      step3Desc: '印尼国家检验检疫局 (BKIPM) 专员现场验货并封签，核发官方健康证明 (Health Certificate) 与原产地证 (COO)。',
      step4Title: '4. 加厚真空包装与集装箱装柜',
      step4Desc: '产品真空塑封后装入五层强化出口外箱，集装箱内部铺设强力吸湿干燥条，抵御跨洋温差潮气。',
      step5Title: '5. 提单签发与目的港高效清关',
      step5Desc: '集装箱自雅加达港或勿老湾港起运，或通过雅加达机场空运，完整提单及正本清关单据顺畅寄达。'
    },
    calculator: {
      badge: '实时物流测算',
      title: '国际海运集装箱与航空运费在线估算',
      subtitle: '精准测算自印尼各主要港口发往全球140多个目的港的海运整柜 (FCL)、拼箱 (LCL) 和空运运费及航程时间。',
      originLabel: '印尼起运港口 / 机场',
      destLabel: '目的港 / 国家地区',
      modeLabel: '运输方式',
      weightLabel: '货物重量 (公斤)',
      btnCalculate: '立即计算预估运费',
      resultTitle: '海空运费测算结果明细',
      transitTime: '预计航程时间',
      estTotal: '预估综合运费',
      btnExportSlip: '复制报价单摘要',
      btnOrderShipping: '确认舱位预订'
    },
    gallery: {
      badge: '实体工厂实景',
      title: '走进印尼现代化水产干货加工中心',
      subtitle: '全景呈现太阳能烘干大棚、恒温低湿仓储库、手工分级流水线及海运整柜装卸实况。',
      filterAll: '全部实拍',
      filterProcessing: '太阳能烘干棚',
      filterCommodities: '成品分级与展示',
      filterStorage: '恒温干燥仓储',
      filterShipping: '集装箱装柜装船',
      filterSustainability: '传统渔民帮扶合作'
    },
    map: {
      badge: '全球航线与基地分布',
      title: '战略加工枢纽与主要远洋出口航线',
      subtitle: '加工厂紧邻爪哇海、苏门答腊及苏拉威西优质渔场，直连雅加达丹戎不碌港与勿老湾深水码头。',
      headquartersTitle: '企业总部与出口运营中心',
      portHubTitle: '远洋深水集装箱港',
      storageFacilityTitle: '恒温恒湿大型仓储'
    },
    testimonials: {
      badge: '实名认证买家',
      title: '全球采购商与海味进口商的真实评价',
      subtitle: '来自新加坡、台湾高雄、美国洛杉矶、阿联酋迪拜及日本东京的餐饮企业与批发商口碑见证。',
      buyerRole: '实名认证进口商'
    },
    faq: {
      badge: '常见贸易问答',
      title: '出口通关单证、最小起订量与付款方式',
      subtitle: '解答国际采购商在首次下单试单或签订年度采购合同时最关心的关务与贸易条款细节。',
      q1: '货物出口提供哪些清关与检验检疫单据？',
      a1: '我们提供全套正规清关文件：印尼渔业部 BKIPM 官方水产健康证书 (Health Certificate)、原产地证书 (COO / Form E/AK)、商业发票 (Commercial Invoice)、装箱单 (Packing List)、实验室分析证书 (COA)、海运提单 (B/L) 或空运单 (AWB)，必要时出具熏蒸证明。',
      q2: '你们的最小起订量 (MOQ) 是多少？',
      a2: '对于高货值商品（如花胶鱼鳔、特级干海参），空运起订量为 25 - 50 公斤。传统咸鱼（马友咸鱼、马鲛鱼）及特级白饭鱼干，拼箱 (LCL) 最低 500 公斤起；整柜 (20尺集装箱 FCL) 通常装载约 10 至 14 吨。',
      q3: '如何保证长途海运过程中咸鱼干不会发霉变质？',
      a3: '我们在太阳能干燥棚内严格将水分控制在 15%-18% 安全区间，配合食品级高阻隔真空包装，集装箱内壁挂设高吸湿氯化钙防潮条，有效隔绝海运温差形成的冷凝水。',
      q4: '你们接受哪些国际付款方式？',
      a4: '我们支持国际知名银行开立的不可撤销即期信用证 (L/C at sight)、电汇 (T/T：定金30%，见提单副本付清余款70%)，以及针对资深企业客户的第三方合规托管支付机制。'
    },
    contact: {
      badge: '24小时快速响应',
      title: '提交正式出口询价单 (RFQ)',
      subtitle: '请填写您所需的品类、规格、采购量及目的港口，我们的资深出口经理将在 4 至 12 小时内为您提供准确的 FOB / CIF 报价。',
      nameLabel: '您的姓名',
      emailLabel: '企业邮箱地址',
      phoneLabel: '手机 / 微信 / WhatsApp (含国家区号)',
      companyLabel: '公司名称及所在国家/地区',
      productLabel: '所询海产商品品类',
      volumeLabel: '预计采购量 (公斤 / 吨)',
      destinationLabel: '目的港口 / 城市',
      messageLabel: '详细品质要求或包装定制需求',
      submitBtn: '提交正式询价单 (SSL安全加密)',
      sending: '正在安全加密提交...',
      successMessage: '感谢您的询价！您的询价信息已安全送达高级外贸主管，我们将在短时间内将正式报价单发送至您的邮箱。',
      sslNote: '全程受 TLS 1.3 256 位高强度安全加密保护，严格保障商业机密。'
    },
    footer: {
      tagline: '印尼权威正规水产干货出口商，主营精选白饭鱼、马友咸鱼、干鱿鱼、特级花胶鱼鳔。全资质拥有 HACCP A 级与印尼官方检疫证书。',
      addressLabel: '总部与集装箱装运基地',
      hotlineLabel: '全球外贸热线',
      emailLabel: '出口业务邮箱',
      quickLinks: '快捷通道',
      compliance: '国际认证与检疫标准',
      copyright: 'Dried Seafood Global. 全球所有权保留。',
      privacy: '隐私协议',
      terms: '国际贸易条款 (Incoterms 2020)',
      sslEncryption: 'SSL安全证书认证',
      securityTitle: '企业级交易安全与贸易数据保密',
      securityDesc: 'TLS 1.3 256 位 DigiCert 高阶加密 • ISO 9001:2015、ISO 27001 与海关 AEO 金牌认证',
      description: '印尼官方大型水产干货及传统咸鱼专业出口企业。以国际HACCP卫生规范为纲，全程杜绝甲醛及化学防腐，具备全套官方动植物检疫清关资质，连通印尼万岛渔业与全球华人采购市场。',
      productsTitle: '核心出口产品与服务',
      complianceTitle: '国际合规与权威官方认证',
      rightsReserved: '保留所有权利'
    }
  },

  ja: {
    topBar: {
      sslVerified: 'TLS 1.3 EV SSL 認証正規輸出業者',
      liveMonitor: 'リアルタイム監視',
      buyersOnline: '件の海外バイヤーが接続中',
      qualityBadge: 'HACCP A級基準 • インドネシア水産省公式検疫証明書',
      hotlineLabel: '24時間輸出窓口:',
      adminPortal: '管理ポータル'
    },
    nav: {
      home: 'ホーム',
      about: '企業と品質管理',
      products: '輸出製品カタログ',
      workflow: '輸出プロセス',
      shippingCalc: '運賃計算機',
      docsHub: '認証・港湾拠点',
      gallery: '加工施設ギャラリー',
      galleryDesc: 'ソーラードーム乾燥、選別・衛生管理倉庫',
      mapHubs: '出荷港・拠点マップ',
      mapHubsDesc: 'ジャカルタ、ベラワン、チラチャップ、スラバヤ',
      testimonials: '海外バイヤーの声',
      testimonialsDesc: '日本、シンガポール、台湾、米国、UAEからの評価',
      insights: '水産輸出レポート',
      insightsDesc: 'BKIPM検疫SPS基準と水産乾物トレンド',
      contactRfq: 'お問い合わせ',
      requestRfqBtn: '正式見積依頼 (RFQ)',
      hotline24h: '輸出ホットライン:',
      adminOpen: '管理システムを開く'
    },
    hero: {
      badge: 'インドネシア産高級水産乾物正規輸出商社',
      titlePart1: 'インドネシア産最高級',
      titleHighlight: '乾燥水産物＆魚乾物',
      titlePart2: '世界市場へ直輸出',
      description: '極上チリメンジャコ（白子干）、高級塩漬けナマズ（ジャンバル・ロティ）、天日干しスルメイカ、サワラ干物、高級魚鰾（フカヒレ・花胶）の正規輸出メーカーです。密閉型ソーラードーム乾燥機を使用し、ホルマリン・合成保存料は完全不使用。HACCPおよび国際検疫SPS基準に完全準拠しています。',
      ctaRfq: '正式見積りを依頼する (RFQ)',
      ctaCatalog: '輸出カタログをダウンロード (PDF)',
      ctaCalculator: '国際運賃・日数計算',
      trust1Title: '水産省公式検疫健康証明書',
      trust1Desc: 'BKIPM（インドネシア海洋水産省検疫総局）による輸出毎の公式検疫証明書を添付。',
      trust2Title: '密閉型ソーラードーム衛生乾燥',
      trust2Desc: '粉塵、昆虫、雨風を遮断し、水分含有量を精密に15-18%以下に保ちます。',
      trust3Title: '100% 天然製法・ホルマリン不使用',
      trust3Desc: '天然海塩のみで脱水・保存。漂白剤や化学防腐剤は一切使用していません。',
      trust4Title: 'FCLコンテナ＆航空便対応',
      trust4Desc: '湿気吸収材を完備した海上コンテナおよび迅速な航空便で世界45カ国以上へ直送。',
      statCountries: '45+',
      statCountriesLabel: '輸出先対象国',
      statVolume: '350+ トン',
      statVolumeLabel: '年間輸出量',
      statSatisfaction: '99.4%',
      statSatisfactionLabel: '品質受領合格率',
      statFarms: '1,200+',
      statFarmsLabel: '提携沿岸漁民数'
    },
    about: {
      badge: '水産乾物の伝統と現代衛生管理',
      title: 'インドネシアの豊かな海洋資源を、世界基準の衛生安全管理でお届けします',
      subtitle: 'Dried Seafood Global は、伝統的な乾物製法と最新の食品安全プロトコル（HACCP）を融合させた輸出専業企業です。',
      description: 'PT Dried Seafood Global Indonesia は、30年以上にわたる海洋水産加工の職人技と、最新の密閉型ソーラードーム乾燥技術、食品グレード真空包装、BKIPM政府公式水産検疫認証を融合し、世界市場へ安心・安全な水産乾物をお届けしています。',
      tabs: {
        services: '事業内容・供給体制',
        profile: '企業概要',
        leadership: '経営陣紹介',
        certifications: '国際認証・認可'
      },
      pillar1Title: 'ソーラードーム乾燥技術',
      pillar1Desc: '従来の野外天日干しから、紫外線カット・温湿度制御ポリカーボネートドームへ全面移行。虫や異物混入のない衛生的な仕上がりを実現しています。',
      pillar2Title: '厳格な成分分析検査 (COA)',
      pillar2Desc: '出荷ロットごとにヒスタミン、重金属、水分率、微生物の自主検査を実施し、合格証を発行します。',
      pillar3Title: '1,200名以上の伝統漁民支援',
      pillar3Desc: '環境に配慮した非トロール一本釣り・定置網漁船団と直接連携し、フェアトレード価格で新鮮な原料を確保しています。',
      pillar4Title: '輸出専用防湿バキューム包装',
      pillar4Desc: '食品グレード高バリア真空パックおよび高吸湿性コンテナ用乾燥剤を採用し、航海中の品質劣化を徹底防止します。',
      certSectionTitle: '国際貿易規格と公式認証',
      certHaccpTitle: 'HACCP グレードA 認証',
      certHaccpDesc: '原料入荷から塩蔵、乾燥、パッキングに至るまでの重要管理点を徹底管理。',
      certBkipmTitle: 'BKIPM 水産物検疫証明書',
      certBkipmDesc: '日本国動物検疫所および各国の検疫基準に適合する公式証明書。',
      certFdaTitle: '米FDA登録・FSVP基準準拠',
      certFdaDesc: '厳格な外国供給業者検証プログラムに適合した製造施設。',
      certHalalTitle: 'ハラール (MUI / BPJPH) 認証',
      certHalalDesc: '100% クリーンで追跡可能なサプライチェーン。'
    },
    commodities: {
      badge: '主力輸出品目',
      title: '輸出仕様 インドネシア産水産乾物ラインナップ',
      subtitle: 'ベラワン、チラチャップ、東ジャワ漁港から直送。ホルマリンや化学薬品を一切使わず、清潔なソーラードームで天日乾燥。',
      downloadCatalog: '輸出カタログダウンロード (PDF)',
      filterAll: '全製品',
      filterFish: '塩干魚・チリメン',
      filterSquid: 'スルメ・干しイカ',
      filterMaw: '高級魚鰾 (フィッシュモー)',
      filterShrimp: '干しエビ・桜えび類',
      searchPlaceholder: '魚種名、学名、原産地、HSコードで検索...',
      origin: '漁獲地',
      grade: '品質等級',
      moq: '最小ロット (MOQ)',
      supplyCapacity: '年間供給能力',
      certifications: '取得検疫・輸出認証',
      specs: '品質規格スペック',
      requestQuote: '見積を依頼する (RFQ)'
    },
    products: {
      badge: '主力輸出品目',
      title: '輸出仕様 インドネシア産水産乾物ラインナップ',
      subtitle: '職人による手選別、食品グレード真空包装により、海外の日本食スーパー、アジア系量販店、食品加工工場へお届けします。',
      filterAll: '全製品',
      filterFish: '塩干魚・チリメン',
      filterSquid: 'スルメ・干しイカ',
      filterPremium: '高級乾物 (魚鰾 / ナマコ)',
      specGrade: '品質等級',
      specMoisture: '水分含有率',
      specSalt: '塩分濃度',
      specPackaging: '輸出梱包仕様',
      specHsCode: 'HSコード',
      specMoq: '最小発注数量 (MOQ)',
      btnInquire: 'この製品の見積を依頼する',
      btnDownloadSpec: '仕様書ダウンロード',
      naturalDried: 'ソーラードーム乾燥',
      chemicalFree: 'ホルマリン検査済'
    },
    workflow: {
      badge: '確実な輸出業務ステップ',
      title: '仕入れから仕向港到着までのワンストップ輸出体制',
      subtitle: '経験豊富な貿易チームが原料調達、検品、検疫手続き、通関、国際物流まで一貫サポートいたします。',
      step1Title: '1. 仕様確認とお見積り (RFQ)',
      step1Desc: '魚種、等級、規格、希望包装、インコタームズ（FOB/CFR/CIF）をご提示いただき、24時間以内に見積書を提示します。',
      step2Title: '2. 厳選仕入れと衛生加工',
      step2Desc: '水揚げ直後の魚を天然海塩で漬け込み、温度管理されたソーラードームで乾燥させ、サイズと色合いを選別します。',
      step3Title: '3. 検疫所による立会検査と証明書発行',
      step3Desc: 'インドネシア政府検疫官（BKIPM）による現物検査を経て、Health Certificate、原産地証明書（COO）が発行されます。',
      step4Title: '4. 真空パック梱包とコンテナ積載',
      step4Desc: '湿気吸収材とともに強化カートンへ梱包し、海上輸送中の温度変化による結露を防ぎます。',
      step5Title: '5. 出港および船積書類の送付',
      step5Desc: 'ジャカルタ港またはベラワン港より出港。船荷証券（B/L）をはじめとする通関書類一式を速やかに送付します。'
    },
    calculator: {
      badge: 'リアルタイム運賃試算',
      title: '国際海上コンテナ・航空運賃＆所要日数シミュレーター',
      subtitle: 'インドネシア主要港から世界140以上の仕向地への海上運賃（FCL/LCL）および航空貨物運賃の目安を即座に計算できます。',
      originLabel: 'インドネシア積載港 / 空港',
      destLabel: '仕向港 / 対象国',
      modeLabel: '輸送モード',
      weightLabel: '貨物重量 (Kg)',
      btnCalculate: '概算運賃を計算する',
      resultTitle: '運賃概算見積結果',
      transitTime: '推定輸送日数',
      estTotal: '概算合計費用',
      btnExportSlip: '見積サマリーをコピー',
      btnOrderShipping: '出荷ブッキングを相談する'
    },
    gallery: {
      badge: '施設と加工現場',
      title: '近代的な水産乾物加工センターの実績写真',
      subtitle: 'ソーラードーム乾燥施設、定温低湿度保管庫、選別ライン、輸出コンテナ積み込み現場を高画質写真でご覧いただけます。',
      filterAll: 'すべて',
      filterProcessing: 'ソーラードーム・乾燥工程',
      filterCommodities: '製品グレーディング',
      filterStorage: '低温除湿保管庫',
      filterShipping: 'コンテナ積み込み作業',
      filterSustainability: '沿岸漁業・生産者支援'
    },
    map: {
      badge: '生産拠点と航路ネットワーク',
      title: '戦略的加工拠点と主要国際コンテナ航路',
      subtitle: 'ジャワ海、スマトラ、スラウェシの豊かな漁場近郊に加工施設を配置し、国際主要港へスムーズに連結しています。',
      headquartersTitle: '本社および輸出オペレーション統括',
      portHubTitle: '国際深水コンテナターミナル',
      storageFacilityTitle: '定温除湿型メガストレージ'
    },
    testimonials: {
      badge: '実名レビュー',
      title: '世界各国の輸入バイヤーからの声',
      subtitle: '日本、シンガポール、台湾、米国、中東の食品輸入商社および量販店バイヤーからの評価をご紹介します。',
      buyerRole: '認証済輸入業者'
    },
    faq: {
      badge: 'よくあるご質問',
      title: '輸出通関、最小発注数量（MOQ）、決済条件について',
      subtitle: '海外バイヤー様から頻繁に寄せられる貿易手続きに関するご質問にお答えします。',
      q1: '通関に必要などのような公的証明書が添付されますか？',
      a1: 'インドネシア水産省（BKIPM）発行の公式衛生検疫証明書（Health Certificate）、原産地証明書（COO / Form EPA/AK）、商業送り状、パッキングリスト、検査成績書（COA）、B/L（船荷証券）を完備してお届けします。',
      q2: '最小発注数量（MOQ）はどのくらいですか？',
      a2: '魚鰾（花胶）や干しナマコなどの高級乾物は航空便25kg〜50kgから対応可能です。塩干魚やチリメンジャコはLCL混載500kgより承り、20ftフルコンテナ（FCL）では約10〜14トンの積載となります。',
      q3: '海上輸送中のカビや品質劣化を防ぐ対策はどのようなものですか？',
      a3: 'ソーラードームで水分を15%〜18%の基準値まで均一乾燥させた後、高密度真空パックに封入し、コンテナ内には大型塩化カルシウム乾燥剤を設置して結露を完全に防止します。',
      q4: '利用可能な国際決済方法は何ですか？',
      a4: '主要国際銀行発行の取消不能一覧払信用状（L/C at sight）、電信送金（T/T：受注時手付金30%、B/Lコピー提示時残金70%）、または検証済み法人向けエスクロー決済に対応しています。'
    },
    contact: {
      badge: '24時間以内にご回答',
      title: '正式輸出見積り依頼フォーム (RFQ)',
      subtitle: 'ご希望の魚種、規格、数量、仕向港をお知らせください。専任の輸出担当者が4〜12時間以内にFOB/CIF見積書をお送りいたします。',
      nameLabel: 'ご担当者様名',
      emailLabel: '企業メールアドレス',
      phoneLabel: 'お電話番号 / WhatsApp (国番号含む)',
      companyLabel: '貴社名および国名',
      productLabel: 'ご希望の水産品目',
      volumeLabel: '想定発注量 (Kg / トン)',
      destinationLabel: '仕向港 / 都市名',
      messageLabel: '規格詳細・希望梱包仕様',
      submitBtn: '見積依頼を送信する (SSL暗号化)',
      sending: '安全に送信中...',
      successMessage: 'お問い合わせありがとうございます。シニア輸出マネージャーに転送されました。まもなく正式なお見積りをメールにてお届けします。',
      sslNote: 'TLS 1.3 256ビット暗号化で保護されており、貴社の商業情報は厳重に管理されます。'
    },
    footer: {
      tagline: 'インドネシア産高級水産乾物、チリメンジャコ、塩干魚、スルメイカ、魚鰾の正規輸出メーカー。HACCP A級基準および国家検疫BKIPM認証取得。',
      addressLabel: '輸出ターミナルおよび本社',
      hotlineLabel: '国際輸出窓口 (24時間)',
      emailLabel: '見積り依頼専用窓口',
      quickLinks: 'サイトマップ',
      compliance: '国際品質基準・検疫認証',
      copyright: 'Dried Seafood Global. 無断転載を禁じます。',
      privacy: 'プライバシーポリシー',
      terms: '国際貿易規約 (Incoterms 2020)',
      sslEncryption: 'SSLセキュリティ認証',
      securityTitle: '企業間取引および貿易データの安全性保証',
      securityDesc: 'TLS 1.3 256ビット DigiCert 暗号化 • ISO 9001:2015、ISO 27001、税関 AEO ゴールド認定',
      description: 'インドネシア産高級水産乾物および塩干魚の正規輸出企業。HACCP基準の徹底した衛生管理、ホルマリン・合成保存料完全不使用、国家検疫証明書（BKIPM）完備で、世界各国の水産バイヤーへお届けします。',
      productsTitle: '輸出品目およびサービス',
      complianceTitle: '国際法令遵守および認証',
      rightsReserved: '無断複写・転載を禁じます'
    }
  },

  ar: {
    topBar: {
      sslVerified: 'مصدّر معتمد بتشفير TLS 1.3 EV SSL',
      liveMonitor: 'الرادار المباشر',
      buyersOnline: 'مشترٍ دولي نشط الآن',
      qualityBadge: 'معتمد HACCP الفئة A • شهادة حجر صحي رسمي من وزارة الثروة السمكية',
      hotlineLabel: 'مكتب التصدير 24/7:',
      adminPortal: 'بوابة الإدارة'
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن الشركة والجودة',
      products: 'كتالوج التصدير',
      workflow: 'إجراءات التصدير',
      shippingCalc: 'حاسبة الشحن الدولي',
      docsHub: 'الشهادات والموانئ',
      gallery: 'معرض المنشآت والتجفيف',
      galleryDesc: 'قباب التجفيف الشمسي والفرز والمستودعات المكيفة',
      mapHubs: 'خريطة الموانئ والمراكز',
      mapHubsDesc: 'جاكرتا، بيلاوان، سيلاكاب، وسورابايا',
      testimonials: 'آراء المستوردين الدوليين',
      testimonialsDesc: 'شهادات موثقة من سنغافورة، تايوان، أمريكا، الإمارات، واليابان',
      insights: 'أبحاث السوق واللوائح',
      insightsDesc: 'معايير الحجر الصحي ومؤشرات الأسماك المجففة عالمياً',
      contactRfq: 'طلب عرض سعر',
      requestRfqBtn: 'طلب تسعير رسمي (RFQ)',
      hotline24h: 'الخط الساخن 24 ساعة:',
      adminOpen: 'فتح لوحة التحكم'
    },
    hero: {
      badge: 'المصدّر الرسمي الرائد للأسماك المجففة من إندونيسيا',
      titlePart1: 'أجود أنواع الأسماك',
      titleHighlight: 'والمأكولات البحرية المجففة',
      titlePart2: 'للأسواق العالمية مباشرة',
      description: 'مصدّر مباشر لأسماك الأنشوجة البيضاء المجففة الممتازة (تيري ناسي)، الأسماك المملحة الفاخرة (جامبال روتي)، الحبار المجفف الطبيعي، وحويصلات الأسماك الفاخرة (Fish Maw). معالجة بأحدث تقنيات القباب الشمسية المغلقة (Solar Dome)، خالية 100% من الفورمالين والمواد الكيميائية، ومطابقة لمعايير HACCP وشهادات الحجر الصحي الدولي.',
      ctaRfq: 'طلب تسعير تصدير رسمي (RFQ)',
      ctaCatalog: 'تحميل كتالوج التصدير (PDF)',
      ctaCalculator: 'حاسبة نولون الشحن البحري والجوي',
      trust1Title: 'شهادة صحية بيطرية رسمية',
      trust1Desc: 'شهادة صحية تصدر مع كل شحنة من وزارة الشؤون البحرية والمصايد الإندونيسية (BKIPM).',
      trust2Title: 'تجفيف شمسي صحي ومغلق',
      trust2Desc: 'حماية كاملة من الغبار والحشرات والتلوث مع ضبط دقيق لنسبة الرطوبة دون 15-18%.',
      trust3Title: 'طبيعي 100% بدون أي فورمالين',
      trust3Desc: 'حفظ بملح البحر النقي فقط ومفحوص مخبرياً لخلوه التام من أي مواد حافظة ضارة.',
      trust4Title: 'شحن حاويات بحرية وجوية لكافة الموانئ',
      trust4Desc: 'حاويات مجهزة بممتصات رطوبة وشحن جوي سريع إلى أكثر من 45 دولة حول العالم.',
      statCountries: '+45',
      statCountriesLabel: 'دولة حول العالم',
      statVolume: '+350 طن',
      statVolumeLabel: 'طاقة التصدير السنوية',
      statSatisfaction: '99.4%',
      statSatisfactionLabel: 'معدل قبول الجودة في الموانئ',
      statFarms: '+1,200',
      statFarmsLabel: 'صياد تقليدي شريك'
    },
    about: {
      badge: 'أصالة الجودة البحرية',
      title: 'عقود من الاستفادة من الثروات البحرية الإندونيسية وفق أعلى معايير السلامة العالمية',
      subtitle: 'تجمع Dried Seafood Global بين عراقة التجفيف الإندونيسي التقليدي وأحدث بروتوكولات سلامة الأغذية المعتمدة دولياً.',
      description: 'تجمع شركة PT Dried Seafood Global Indonesia بين أكثر من 30 عاماً من الحرفية البحرية الإندونيسية العريقة وتقنية التجفيف الشمسي بالقباب المغلقة المتطورة، والتغليف المفرغ من الهواء الغذائي وشهادات الحجر الصحي المعتمدة من وزارة الثروة السمكية الإندونيسية للتصدير الدولي.',
      tabs: {
        services: 'الخدمات والتشغيل',
        profile: 'الملف التعريفي للشركة',
        leadership: 'الفريق الإداري',
        certifications: 'الشهادات والاعتمادات'
      },
      pillar1Title: 'تقنية قباب التجفيف الشمسي المتطورة',
      pillar1Desc: 'استبدلنا التجفيف المكشوف بأحدث قباب البولي كربونات الشمسية المحمية من الأشعة فوق البنفسجية لضمان نظافة مطلقة وخلو تام من الحشرات والشوائب.',
      pillar2Title: 'فحوصات مخبرية مستقلة ومعتمدة (COA)',
      pillar2Desc: 'تخضع كل دفعة إنتاج لتحاليل دقيقة للهستامين، المعادن الثقيلة، البكتيريا، ونسبة الرطوبة قبل استخراج تصاريح التصدير.',
      pillar3Title: 'تمكين أكثر من 1200 صياد ساحلي',
      pillar3Desc: 'شراكة مباشرة ومستدامة مع مجتمعات الصيادين المحليين باستخدام معدات صيد انتقائية غير ضارة بالبيئة وبأسعار عادلة.',
      pillar4Title: 'تغليف تصديري مفرغ من الهواء (Vacuum)',
      pillar4Desc: 'أكياس سميكة مفرغة من الهواء وكراتين تصدير مقواة مع أكياس امتصاص الرطوبة لحماية الشحنات البحرية الطويلة.',
      certSectionTitle: 'الشهادات والاعتمادات الدولية المكتملة',
      certHaccpTitle: 'شهادة HACCP الفئة A',
      certHaccpDesc: 'نظام صارم لإدارة المخاطر يشمل مراحل الاستلام، التمليح، التجفيف، والتعبئة.',
      certBkipmTitle: 'الشهادة الصحية الرسمية (Health Cert)',
      certBkipmDesc: 'الوثيقة البيطرية الرسمية المعتمدة للإفراج الجمركي في دول الخليج، أمريكا، وأوروبا.',
      certFdaTitle: 'مطابقة لمعايير إدارة الغذاء والدواء الأمريكية (FDA)',
      certFdaDesc: 'منشأة مسجلة ومطابقة لبرنامج التحقق من الموردين الأجانب (FSVP).',
      certHalalTitle: 'شهادة حلال رسمية معتمدة',
      certHalalDesc: 'سلسلة توريد ومعالجة إسلامية نظيفة 100% وموثقة المصدر.'
    },
    commodities: {
      badge: 'المنتجات البحرية المميزة',
      title: 'تشكيلة المأكولات البحرية والأسماك المجففة للتصدير',
      subtitle: 'توريد مباشر من موانئ بيلاوان وسيلاكاب وسواحل الأرخبيل الإندونيسي. تجفيف شمسي نظيف وخالٍ تماماً من الفورمالين أو المواد الكيميائية.',
      downloadCatalog: 'تحميل كتالوج التصدير (PDF)',
      filterAll: 'كافة المنتجات',
      filterFish: 'الأسماك المجففة والمملحة',
      filterSquid: 'الحبار والكاليماري المجفف',
      filterMaw: 'حويصلات الأسماك الفاخرة',
      filterShrimp: 'الجمبري والروبيان المجفف',
      searchPlaceholder: 'ابحث باسم السمك، الفصيلة، المنشأ، الرمز الجمركي...',
      origin: 'ميناء المنشأ',
      grade: 'درجة الجودة',
      moq: 'الحد الأدنى للطلب (MOQ)',
      supplyCapacity: 'طاقة التوريد السنوية',
      certifications: 'شهادات التصدير المعتمدة',
      specs: 'المواصفات الفنية',
      requestQuote: 'طلب تسعير رسمي'
    },
    products: {
      badge: 'المنتجات البحرية المميزة',
      title: 'تشكيلة المأكولات البحرية والأسماك المجففة للتصدير',
      subtitle: 'مفروزة يدوياً بعناية، معبأة في عبوات مفرغة من الهواء، وجاهزة لشركات التوزيع وسلاسل السوبرماركت والمطاعم.',
      filterAll: 'كافة المنتجات',
      filterFish: 'الأسماك المملحة والمجففة',
      filterSquid: 'الحبار والكاليماري المجفف',
      filterPremium: 'أصناف فاخرة (حويصلات الأسماك / خيار البحر)',
      specGrade: 'درجة الجودة',
      specMoisture: 'نسبة الرطوبة',
      specSalt: 'نسبة الملوحة',
      specPackaging: 'طريقة التعبئة والتغليف',
      specHsCode: 'الرمز الجمركي (HS Code)',
      specMoq: 'الحد الأدنى للطلب (MOQ)',
      btnInquire: 'طلب تسعير لهذا المنتج',
      btnDownloadSpec: 'تحميل ورقة المواصفات',
      naturalDried: 'تجفيف قباب شمسية',
      chemicalFree: 'مفحوص مخبرياً خالي من الفورمالين'
    },
    workflow: {
      badge: 'سلسلة إجراءات تصدير احترافية',
      title: 'من موانئ الصيد الإندونيسية إلى ميناء وجهتك بكل سلاسة',
      subtitle: 'فريق تجارة دولية محترف يتولى التوريد، فحص الجودة، إصدار الأوراق البيطرية، التخليص الجمركي، والشحن الدولي.',
      step1Title: '1. استلام طلب التسعير والاتفاق على المواصفات',
      step1Desc: 'حدد الأصناف والكميات وميناء الوصول وشروط التجارة (FOB/CFR/CIF). نصدر لك فاتورة مبدئية وعرض سعر رسمي خلال 24 ساعة.',
      step2Title: '2. الفرز الدقيق والمعالجة الصحية',
      step2Desc: 'تمليح الصيد الطازج بملح بحري نقي، والتجفيف داخل قباب شمسية معزولة، والفرز اليدوي لتوحيد الأحجام.',
      step3Title: '3. الفحص المخبري والحجر الصحي الرسمي',
      step3Desc: 'يقوم مفتشو وزارة الثروة السمكية بفحص الشحنة وإصدار الشهادة الصحية الرسمية وشهادة المنشأ (COO).',
      step4Title: '4. التعبئة المفرغة والشحن في الحاويات',
      step4Desc: 'تعبئة مفرغة من الهواء مع مواد امتصاص الرطوبة الصناعية في كراتين تصدير قوية ومجهزة للشحن البحري.',
      step5Title: '5. انطلاق الحاويات وتزويدك بالوثائق الأصلية',
      step5Desc: 'شحن الحاويات من ميناء جاكرتا أو بيلاوان أو عبر الشحن الجوي مع تزويدك بكافة بوالص الشحن والأوراق لتخليص سلس.'
    },
    calculator: {
      badge: 'لوجستيات الشحن المباشر',
      title: 'حاسبة تكاليف الشحن البحري والجوي وفترات الوصول',
      subtitle: 'احسب التكاليف التقديرية لحاويات الشحن البحري (FCL/LCL) والشحن الجوي السريع من إندونيسيا إلى أكثر من 140 وجهة دولية.',
      originLabel: 'ميناء أو مطار الإقلاع بإندونيسيا',
      destLabel: 'ميناء أو دولة الوصول',
      modeLabel: 'نوع الشحن',
      weightLabel: 'الوزن الإجمالي (كجم)',
      btnCalculate: 'احسب التكلفة التقديرية',
      resultTitle: 'تفاصيل التسعير اللوجستي التقديري',
      transitTime: 'مدة الرحلة التقديرية',
      estTotal: 'التكلفة الإجمالية التقديرية',
      btnExportSlip: 'نسخ ملخص عرض الأسعار',
      btnOrderShipping: 'تأكيد حجز مساحة الشحن'
    },
    gallery: {
      badge: 'المنشآت ومراكز الإنتاج',
      title: 'شاهد منشآت تجهيز المأكولات البحرية الحديثة',
      subtitle: 'استكشف صوراً عالية الدقة لقباب التجفيف الشمسي، غرف التبريد والتحكم بالرطوبة، ومراحل تحميل الحاويات للتصدير.',
      filterAll: 'كافة الأقسام',
      filterProcessing: 'القباب الشمسية والتجفيف',
      filterCommodities: 'فرز وتصنيف المنتجات',
      filterStorage: 'المستودعات والمختبرات',
      filterShipping: 'تحميل الحاويات البحرية',
      filterSustainability: 'دعم وتمكين مجتمعات الصيادين'
    },
    map: {
      badge: 'المراكز الاستراتيجية وشبكة التصدير',
      title: 'مراكز الإنتاج وخطوط الشحن البحري العالمية',
      subtitle: 'تقع مصانعنا ومراكز تجهيزنا بمحاذاة أغنى مناطق الصيد البحري في جاوة وسومطرة وسولاويزي مباشرة نحو الموانئ الدولية.',
      headquartersTitle: 'المقر الرئيسي ومكتب التصدير',
      portHubTitle: 'محطة الشحن البحري للحاويات',
      storageFacilityTitle: 'مستودعات مكيفة ومضبوطة الرطوبة'
    },
    testimonials: {
      badge: 'آراء شركائنا الموثوقين',
      title: 'ماذا يقول المستوردون الدوليون عن جودتنا',
      subtitle: 'تقييمات واقعية وموثقة من مديري المشتريات ومستوردي الأغذية في الشرق الأوسط، آسيا، وأمريكا الشمالية.',
      buyerRole: 'مستورد معتمد'
    },
    faq: {
      badge: 'الأسئلة الأكثر شيوعاً',
      title: 'إجراءات التصدير، الحد الأدنى للطلب وشروط الدفع',
      subtitle: 'إجابات واضحة ومباشرة عن الاستفسارات الأساسية التي تهم كبار المستوردين قبل بدء التعاقد أو شحنات التجارب.',
      q1: 'ما هي المستندات الرسمية المرفقة مع كل شحنة تصدير؟',
      a1: 'نقدم حزمة مستندات تخليص متكاملة: شهادة صحية بيطرية رسمية من وزارة الثروة السمكية (BKIPM)، شهادة المنشأ (COO)، الفاتورة التجارية المعتمدة، بيان التعبئة (Packing List)، شهادة التحليل المخبري (COA)، بوليصة الشحن (B/L) أو الجوي (AWB)، وشهادة التبخير إن طلبت.',
      q2: 'ما هو الحد الأدنى للطلب (MOQ) للتصدير؟',
      a2: 'للأصناف الفاخرة مثل حويصلات الأسماك وخيار البحر، نوفر شحنات تجريبية جوية تبدأ من 25 إلى 50 كجم. للأسماك المجففة والمملحة والأنشوجة، الحد الأدنى للشحن الجزئي (LCL) هو 500 كجم، وحاوية 20 قدماً كاملة (FCL) تتسع لحوالي 10 إلى 14 طناً.',
      q3: 'كيف تضمنون عدم تعفن أو رطوبة الأسماك أثناء الرحلات البحرية الطويلة؟',
      a3: 'يتم تجفيف الأسماك لنسبة رطوبة آمنة بين 15% و18% داخل القباب الشمسية، وتعبأ في أكياس مفرغة من الهواء وتوضع أكياس كلوريد الكالسيوم القوية لامتصاص الرطوبة داخل الحاوية طوال الرحلة.',
      q4: 'ما هي طرق الدفع الدولية المعتمدة لديكم؟',
      a4: 'نقبل الاعتمادات المستندية غير القابلة للإلغاء والمعززة بالاطلاع (L/C at sight) من بنوك عالمية رائدة، والتحويل البنكي المباشر (T/T بنسبة 30% دفعة أولى و70% مقابل نسخة بوليصة الشحن)، وحسابات الضمان الموثوقة للمؤسسات المعتمدة.'
    },
    contact: {
      badge: 'استجابة سريعة 24 ساعة',
      title: 'نموذج طلب عرض سعر تصدير رسمي (RFQ)',
      subtitle: 'يرجى تحديد الأصناف المطلوبة والكميات التقديرية وميناء الوصول. سيقوم فريق التصدير بإرسال عرض سعر تفصيلي FOB/CIF خلال 4 إلى 12 ساعة.',
      nameLabel: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني للعمل',
      phoneLabel: 'رقم الهاتف / واتساب (مع رمز الدولة)',
      companyLabel: 'اسم الشركة والدولة',
      productLabel: 'الأصناف البحرية المطلوبة',
      volumeLabel: 'الكمية التقديرية (كجم / طن)',
      destinationLabel: 'ميناء أو دولة الوصول',
      messageLabel: 'المواصفات المطلوبة أو اشتراطات التعبئة',
      submitBtn: 'إرسال طلب التسعير (مشفر وآمن)',
      sending: 'جارٍ إرسال الطلب بأمان...',
      successMessage: 'شكراً لتواصلك! تم استلام طلب التسعير بنجاح وإحالته لمدير التصدير الإقليمي. ستصلك عروض الأسعار الرسمية عبر بريدك الإلكتروني في أقرب وقت.',
      sslNote: 'محمي بتشفير TLS 1.3 المتطور 256-بت. نحافظ على سرية بياناتك التجارية بنسبة 100%.'
    },
    footer: {
      tagline: 'المصدّر المعتمد للأسماك المجففة والمملحة، الأنشوجة البيضاء، الحبار، وحويصلات الأسماك من إندونيسيا. حاصل على شهادات HACCP الفئة A واعتماد الحجر الصحي الدولي.',
      addressLabel: 'المقر الرئيسي ومحطة التصدير',
      hotlineLabel: 'مكتب التصدير الدولي (24 ساعة)',
      emailLabel: 'بريد طلبات عروض الأسعار',
      quickLinks: 'أقسام الموقع',
      compliance: 'معايير الجودة والحجر الصحي',
      copyright: 'Dried Seafood Global. جميع الحقوق الدولية محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط التجارة الدولية (Incoterms 2020)',
      sslEncryption: 'شهادة أمان وتشفير SSL',
      securityTitle: 'معاملات تجارية آمنة وسرية تامة لبيانات الشركات',
      securityDesc: 'تشفير متطور TLS 1.3 256-بت من DigiCert • معتمد بمعايير ISO 9001:2015 و ISO 27001 والمشغل الاقتصادي المعتمد AEO Gold',
      description: 'المصدّر الرسمي الرائد للمنتجات البحرية المجففة والأسماك المملحة من الأرخبيل الإندونيسي. نلتزم بأعلى معايير النظافة الدولية HACCP، والخلو التام من الفورمالين والمواد الكيميائية مع استخراج كامل الشهادات البيطرية والصحية.',
      productsTitle: 'المنتجات والخدمات التصديرية',
      complianceTitle: 'الامتثال والمعايير الدولية',
      rightsReserved: 'جميع الحقوق محفوظة'
    }
  }
};

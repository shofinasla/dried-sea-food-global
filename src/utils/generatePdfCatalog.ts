import { jsPDF } from 'jspdf';
import { COMPANY_PROFILE } from '../data/initialData';

export async function generateOfficialCatalogPdf(): Promise<Blob> {
  // A4 Landscape format: 297mm x 210mm (matching the presentation slide layout of the original PDF)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Helper colors
  const primaryTeal = [0, 155, 179]; // #009bb3
  const darkTeal = [14, 116, 144]; // #0e7490
  const lightTeal = [240, 253, 250]; // #f0fdfa
  const textDark = [15, 23, 42]; // #0f172a
  const textMuted = [100, 116, 139]; // #64748b
  const accentOrange = [249, 115, 22]; // #f97316

  const drawHeader = (pageNumber: number) => {
    // Top bar with branding
    doc.setFillColor(lightTeal[0], lightTeal[1], lightTeal[2]);
    doc.rect(0, 0, pageWidth, 16, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('SALTED', 90, 10);
    doc.text('NATURAL', 120, 10);
    doc.text('DRIED', 150, 10);
    doc.text('PACKED', 180, 10);

    // Shrimora / DSG brand pill
    doc.setFillColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.roundedRect(240, 4, 45, 8, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('SHRIMORA • DSG', 262.5, 9.5, { align: 'center' });

    // Page number bottom footer
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Official Export Product Catalog • Page ${pageNumber} of 10`, 15, pageHeight - 8);
    doc.text('PT Samdura Bara Persada (Dried Seafood Global)', pageWidth - 15, pageHeight - 8, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER
  // ==========================================
  drawHeader(1);

  // Background visual decorative card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 24, 267, 172, 8, 8, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, 24, 267, 172, 8, 8, 'S');

  // Big Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('CATALOG PRODUK', 148.5, 60, { align: 'center' });

  // Brand Subtitle
  doc.setFontSize(16);
  doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
  doc.text('SHRIMORA • DRIED SEAFOOD GLOBAL', 148.5, 75, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Indonesian Premium Dried Anchovies, Salted Fish & High-Grade Marine Commodities', 148.5, 85, { align: 'center' });

  // 4 Core Value Pillars (Pills)
  const pillars = [
    { label: 'QUALITY', x: 50, y: 115 },
    { label: 'CONSISTENCY', x: 100, y: 115 },
    { label: 'TRACEABILITY', x: 150, y: 115 },
    { label: 'RELIABILITY', x: 200, y: 115 },
  ];

  pillars.forEach(p => {
    doc.setFillColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.roundedRect(p.x, p.y, 45, 14, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(p.label, p.x + 22.5, p.y + 9, { align: 'center' });
  });

  // Legal & Certification Badge
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('NIB: 1408230135849 • P-IRT: 5023315010556-31 • HACCP Grade A • BKIPM Certified', 148.5, 160, { align: 'center' });
  doc.text('Demak Central Java & Muara Baru Jakarta • Direct Coastal Sourcing', 148.5, 168, { align: 'center' });

  // ==========================================
  // PAGE 2: DRIED ANCHOVY SPECIFICATIONS
  // ==========================================
  doc.addPage();
  drawHeader(2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('DRIED ANCHOVY', 20, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const anchovyIntro = [
    'Behind every anchovy is the hard work of fishermen who head out to sea early in the morning to bring in the best catch.',
    'After being caught, the anchovies are carefully sorted, cleaned, and dried using proper methods to preserve their natural',
    'taste, texture, nutrients, and quality. From the coast, the anchovies continue their journey through packaging and',
    'distribution to distributors, wholesalers, and markets around the world carrying a story of fishermen, process, and quality.'
  ];
  doc.text(anchovyIntro, 20, 44);

  // 3 Product Spec Cards
  const anchovyCards = [
    {
      num: '01',
      title: 'Natural Dried Anchovy (Teri Nasi Super)',
      moisture: '3 – 5%',
      salt: '< 3% (Low Salt Natural)',
      size: '3 – 5 cm',
      process: 'Naturally Solar Dome Dried',
      x: 20
    },
    {
      num: '02',
      title: 'Salt Dried Anchovy (Teri Medan Asin)',
      moisture: '15%',
      salt: '< 3% - 5%',
      size: '4 – 6 cm',
      process: 'Boiled & Naturally Sun Dried',
      x: 108
    },
    {
      num: '03',
      title: 'Dried Whole Anchovy (Teri Utuh Super)',
      moisture: '15%',
      salt: '< 3%',
      size: '5 – 7 cm',
      process: 'Naturally Dried, Head & Body Intact',
      x: 196
    }
  ];

  anchovyCards.forEach(c => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(c.x, 82, 80, 95, 6, 6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(c.x, 82, 80, 95, 6, 6, 'S');

    // Header badge
    doc.setFillColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.roundedRect(c.x + 6, 88, 20, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(c.num, c.x + 16, 93, { align: 'center' });

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10);
    doc.text(c.title, c.x + 6, 105, { maxWidth: 68 });

    // Specs
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    
    doc.text('• Moisture Content:', c.x + 6, 122);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(c.moisture, c.x + 40, 122);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('• Salinity Level:', c.x + 6, 132);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(c.salt, c.x + 40, 132);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('• Fish Size:', c.x + 6, 142);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(c.size, c.x + 40, 142);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('• Processing:', c.x + 6, 152);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text(c.process, c.x + 6, 160, { maxWidth: 68 });
  });

  // ==========================================
  // PAGE 3: READY TO EAT PRODUCTS
  // ==========================================
  doc.addPage();
  drawHeader(3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('READY TO EAT SEAFOOD', 20, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const readyIntro = [
    'Behind every bite of our ready-to-eat anchovy sambal is the hard work of fishermen who head out to sea early in the morning.',
    'Our anchovies are carefully selected, cleaned, and processed before being combined with authentic Indonesian flavors to create',
    'a delicious, convenient, and shelf-stable export-ready dish that is ready to eat anytime.'
  ];
  doc.text(readyIntro, 20, 44);

  const readyCards = [
    {
      num: '01',
      title: 'Spicy, Savory & Crunchy (Crispy Teri)',
      desc: 'Anchovies, peanuts, chili, shallots, garlic, cooking oil, salt, sugar, and selected natural seasonings. Crispy texture with high calcium.',
      pack: 'Pouch 100g / 150g • Master Carton 24 Pcs',
      x: 20
    },
    {
      num: '02',
      title: 'Sambal Teri Balado Siap Santap',
      desc: 'Authentic Indonesian Balado Sambal with fresh anchovies, red bird-eye chilies, shallots, garlic, palm oil, and traditional recipe.',
      pack: 'Pouch 120g / Box 120g x 24 Pcs (Box Packaging)',
      x: 108
    },
    {
      num: '03',
      title: 'Spicy Mango Anchovy (Sambal Mangga)',
      desc: 'Tangy, sweet, and fiery kick combining fresh young mango slices, crispy dried anchovies, peanuts, and selected aromatic seasonings.',
      pack: 'Pouch 120g • Export Grade Foil Barrier',
      x: 196
    }
  ];

  readyCards.forEach(c => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(c.x, 75, 80, 102, 6, 6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(c.x, 75, 80, 102, 6, 6, 'S');

    doc.setFillColor(accentOrange[0], accentOrange[1], accentOrange[2]);
    doc.roundedRect(c.x + 6, 81, 20, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(c.num, c.x + 16, 86, { align: 'center' });

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10.5);
    doc.text(c.title, c.x + 6, 98, { maxWidth: 68 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(c.desc, c.x + 6, 115, { maxWidth: 68 });

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(c.x + 6, 150, 68, 18, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text('PACKAGING SPECIFICATION:', c.x + 9, 156);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(c.pack, c.x + 9, 163, { maxWidth: 62 });
  });

  // ==========================================
  // PAGE 4: OUR PROJECTS
  // ==========================================
  doc.addPage();
  drawHeader(4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('OUR PROJECT & SUPPLY ECOSYSTEM', 20, 35);

  // Left Column: Process & Mission Overview
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const projectText1 = [
    'Our anchovies begin with the hard work of local fishermen, who carefully catch fresh anchovies',
    'from the rich waters of Indonesia. After landing, the anchovies are carefully sorted and cleaned',
    'before being naturally dried using proper Solar Dome methods to preserve their taste and quality.',
    '',
    'For our ready-to-eat products, the dried anchovies are further processed with selected natural',
    'ingredients and authentic Indonesian recipes. Every lot undergoes strict quality control and ISO',
    'laboratory testing before being packed in hygienic, export-ready food-grade pouches.'
  ];
  doc.text(projectText1, 20, 48);

  // Project 01 Card
  doc.setFillColor(240, 253, 250);
  doc.roundedRect(20, 95, 122, 85, 6, 6, 'F');
  doc.setDrawColor(204, 251, 241);
  doc.roundedRect(20, 95, 122, 85, 6, 6, 'S');

  doc.setFillColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
  doc.roundedRect(26, 102, 40, 7, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('OUR PROJECT 01', 46, 107, { align: 'center' });

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(11);
  doc.text('Authentic Ready-to-Eat Indonesian Anchovy Sambal', 26, 120, { maxWidth: 110 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Developing authentic Indonesian ready-to-eat anchovy sambal with peanuts and a variety of regional flavors: Balado, Green Chili (Cabe Ijo), and Fresh Mango Sambal for diaspora and mainstream Asian supermarkets.', 26, 132, { maxWidth: 110 });

  // Project 02 Card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(155, 95, 122, 85, 6, 6, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(155, 95, 122, 85, 6, 6, 'S');

  doc.setFillColor(accentOrange[0], accentOrange[1], accentOrange[2]);
  doc.roundedRect(161, 102, 40, 7, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('OUR PROJECT 02', 181, 107, { align: 'center' });

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(11);
  doc.text('International B2B Seafood Distribution & Private Label', 161, 120, { maxWidth: 110 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Bringing Indonesian anchovy products to international distributors, wholesalers, retailers, and foodservice markets with consistent Grade A quality, private label capabilities, and authentic local heritage.', 161, 132, { maxWidth: 110 });

  // ==========================================
  // PAGE 5: DOCUMENTS & LEGAL COMPLIANCE
  // ==========================================
  doc.addPage();
  drawHeader(5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LEGAL COMPLIANCE & EXPORT DOCUMENTS', 20, 35);

  // Legal Identification Bar
  doc.setFillColor(240, 253, 250);
  doc.roundedRect(20, 42, 257, 18, 4, 4, 'F');
  doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NIB (Nomor Induk Berusaha): 1408230135849    |    P-IRT: 5023315010556-31', 30, 53);

  // Left Column: HS Codes by Destination
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 68, 120, 110, 6, 6, 'F');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('HARMONIZED SYSTEM (HS) TARIFF CODES', 26, 78);

  const hsCodes = [
    { country: '🇮🇩 INDONESIA', code: '0305.59.21', desc: 'Teri Kering (Dried Anchovies)' },
    { country: '🇯🇵 JAPAN', code: '0305.59 / Subkode', desc: 'Dried Fish (カタクチイワシ)' },
    { country: '🇸🇦 SAUDI ARABIA', code: '0305.59', desc: 'Other Dried Fish, Not Smoked' },
    { country: '🇦🇪 UAE (DUBAI)', code: '0305.59', desc: 'Other Dried Fish, Not Smoked' },
    { country: '🇸🇬 SINGAPORE', code: '0305.59 / 0305.59.20', desc: 'Dried Marine Fish (Anchovies)' },
    { country: '🇲🇾 MALAYSIA', code: '0305.54 / 0305.59', desc: 'Spesies HS 2022 Ikan Kering' },
  ];

  let hsY = 90;
  hsCodes.forEach(h => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(h.country, 26, hsY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text(h.code, 70, hsY);

    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`(${h.desc})`, 26, hsY + 4.5);
    hsY += 13;
  });

  // Right Column: Official Documents Included
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(150, 68, 127, 110, 6, 6, 'F');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('STANDARD EXPORT CLEARANCE DOCUMENTS', 156, 78);

  const exportDocs = [
    '✓ HEALTH CERTIFICATE (BKIPM KKP RI)',
    '✓ CERTIFICATE OF ORIGIN (COO FORM D / E / AK)',
    '✓ CERTIFICATE OF ANALYSIS (COA Lab Tested)',
    '✓ HACCP GRADE A (Upon Request)',
    '✓ CATCH / LEGAL ORIGIN CERTIFICATE',
    '✓ COMMERCIAL INVOICE & PACKING LIST',
    '✓ BILL OF LADING (B/L) / AIR WAYBILL (AWB)'
  ];

  let docY = 92;
  exportDocs.forEach(d => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.text(d, 156, docY);
    docY += 11.5;
  });

  // ==========================================
  // PAGE 6: ORDER MOQ, TERMS & INCOTERMS
  // ==========================================
  doc.addPage();
  drawHeader(6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ORDER TERMS & COMMERCIAL POLICY', 20, 35);

  const termBoxes = [
    {
      letter: 'A',
      title: 'Order MOQ (Minimum Order Quantity)',
      items: [
        '• Sample Order: 1 – 5 kg (Packaging by Request)',
        '• Trial Order: 100 – 300 kg',
        '• Regular Commercial Order: 500 kg – 1 Ton',
        '• Bulk Ocean Container Order: 2 – 5 Ton+ (FCL 20ft/40ft)'
      ],
      x: 20,
      y: 45
    },
    {
      letter: 'B',
      title: 'Payment Terms & Safeguards',
      items: [
        '• 100% Advance T/T (Telegraphic Transfer)',
        '• 50% Advance Deposit + 50% Before Shipment',
        '• Irrevocable Letter of Credit (L/C at Sight for regular bulk)',
        '• Escrow & Trade Insurance Supported'
      ],
      x: 150,
      y: 45
    },
    {
      letter: 'C',
      title: 'Supported Incoterms 2020',
      items: [
        '• FOB (Free On Board - Tanjung Priok Jakarta / Tanjung Emas)',
        '• CIF (Cost, Insurance & Freight to Destination Sea Port)',
        '• CFR (Cost & Freight)',
        '• Air Freight Priority (Soekarno-Hatta CGK / Ahmad Yani SRG)'
      ],
      x: 20,
      y: 115
    },
    {
      letter: 'D',
      title: 'Production & Dispatch Lead Time',
      items: [
        '• 7 – 14 Days After Deposit Confirmation',
        '• Customized packaging / Private labeling: +3-5 days',
        '• Real-Time Dispatch Tracking & Notification',
        '• Reefer Pre-Cooling -18°C or Dry Ambient Container'
      ],
      x: 150,
      y: 115
    }
  ];

  termBoxes.forEach(b => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(b.x, b.y, 125, 60, 6, 6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(b.x, b.y, 125, 60, 6, 6, 'S');

    // Circle Letter Icon
    doc.setFillColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.circle(b.x + 12, b.y + 12, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(b.letter, b.x + 12, b.y + 14.5, { align: 'center' });

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10.5);
    doc.text(b.title, b.x + 22, b.y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    let itemY = b.y + 26;
    b.items.forEach(it => {
      doc.text(it, b.x + 8, itemY);
      itemY += 7.5;
    });
  });

  // ==========================================
  // PAGE 7: OUR PORTFOLIO & SUPPLY CHAIN
  // ==========================================
  doc.addPage();
  drawHeader(7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('OUR EXPORT PORTFOLIO', 20, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Authentic documentation of coastal processing centers, hygienic dehydration, and international ocean freight loading.', 20, 44);

  const portfolioItems = [
    { title: 'Solar Dome Drying Center', desc: 'Clean, enclosed dehydration facility protecting catch from dust, pests, and ambient humidity.', x: 20 },
    { title: 'Quality Inspection & Sorting', desc: 'Manual size grading, moisture verification, and salt calibration for export compliance.', x: 108 },
    { title: 'Reefer Container Loading', desc: 'Temperature-controlled palletizing and sealed container dispatch for Asia, USA & Middle East.', x: 196 }
  ];

  portfolioItems.forEach(p => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(p.x, 56, 80, 120, 6, 6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(p.x, 56, 80, 120, 6, 6, 'S');

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(p.x + 5, 61, 70, 65, 4, 4, 'F');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('[FIELD DOCUMENTATION]', p.x + 40, 96, { align: 'center' });

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10.5);
    doc.text(p.title, p.x + 6, 140, { maxWidth: 68 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(p.desc, p.x + 6, 150, { maxWidth: 68 });
  });

  // ==========================================
  // PAGE 8: PACKAGING SPECIFICATIONS & SIZING
  // ==========================================
  doc.addPage();
  drawHeader(8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('PACKAGING SPECIFICATIONS & SIZING GUIDE', 20, 35);

  // Sizing Table Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 45, 125, 130, 6, 6, 'F');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DRIED ANCHOVY SIZING SPECIFICATIONS', 26, 56);

  const sizingData = [
    { grade: 'Grade AAA (Teri Nasi Super)', size: '2.5 – 4 cm', desc: 'White translucent, low salt, crisp texture' },
    { grade: 'Grade A (Dried Whole Anchovy)', size: '4 – 6 cm', desc: 'Head & body intact, golden white shine' },
    { grade: 'Grade B (Dried Black Anchovy)', size: '5 – 7 cm', desc: 'Savory rich taste, perfect for soup/stir-fry' },
    { grade: 'Custom Sizing Sieve', size: 'By Request', desc: 'Custom sorting by mesh size & buyer requirement' }
  ];

  let szY = 68;
  sizingData.forEach(s => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text(s.grade, 26, szY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Size: ${s.size}`, 26, szY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(s.desc, 26, szY + 10, { maxWidth: 110 });
    szY += 19;
  });

  // Packaging Box (Carton 24 Pcs)
  doc.setFillColor(240, 253, 250);
  doc.roundedRect(155, 45, 122, 130, 6, 6, 'F');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('EXPORT CARTON & MASTER PACKAGING', 161, 56);

  const packSpecs = [
    '• Outer Master Carton: Double Wall Corrugated Box (120g x 24 Pcs)',
    '• Primary Packaging: Food-Grade Stand-Up Foil Pouch with Zipper',
    '• Protection: Nitrogen Flushed & Oxygen Absorber Included',
    '• Bulk Packaging: 5 kg / 10 kg Vacuum Sealed Block with Desiccant',
    '• Shelf Life: 12 Months (Ambient) / 24 Months (Cold Storage)',
    '• Private Label: Custom logo, barcode, nutrition facts & language'
  ];

  let pkY = 68;
  packSpecs.forEach(pk => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(pk, 161, pkY, { maxWidth: 110 });
    pkY += 16;
  });

  // ==========================================
  // PAGE 9: CONTACT US & SAMPLE REQUEST
  // ==========================================
  doc.addPage();
  drawHeader(9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('CONTACT US & FREE SAMPLE REQUEST', 20, 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
  doc.text('🐟 DRIED SEAFOOD FROM INDONESIA', 20, 48);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.setFontSize(9.5);
  doc.text('Premium Dried Anchovies & Dried Fish directly from Indonesia to Global Markets.', 20, 56);

  // Key Highlights Banner
  const highlights = [
    '📦 Bulk & Private Label Available',
    '🌎 Global Export Ready (140+ Destinations)',
    '🎁 Contact us to request your FREE SAMPLE!'
  ];

  let hlY = 68;
  highlights.forEach(h => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkTeal[0], darkTeal[1], darkTeal[2]);
    doc.text(h, 20, hlY);
    hlY += 8;
  });

  // Contact Info Cards
  const contactBoxes = [
    { title: 'Official Email Inquiries', value: 'shrimorajava@gmail.com\ncontact@driedseafoodglobal.com', x: 20, y: 100 },
    { title: 'Direct Website & Catalog', value: 'www.shrimorajava.com\nwww.driedseafoodglobal.com', x: 108, y: 100 },
    { title: 'Social & Instant WhatsApp', value: 'Instagram: @shrimora\nHotline: +62 821-3456-7890', x: 196, y: 100 }
  ];

  contactBoxes.forEach(cb => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(cb.x, cb.y, 80, 50, 4, 4, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cb.x, cb.y, 80, 50, 4, 4, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
    doc.text(cb.title, cb.x + 6, cb.y + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(cb.value, cb.x + 6, cb.y + 24);
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Headquarters: Lapangan, Morodemak, Bonang, Demak Regency, Central Java 59552, Indonesia', 148.5, 172, { align: 'center' });

  // ==========================================
  // PAGE 10: THANK YOU
  // ==========================================
  doc.addPage();
  drawHeader(10);

  doc.setFillColor(240, 253, 250);
  doc.roundedRect(15, 24, 267, 172, 8, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(44);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('THANK YOU', 148.5, 80, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(primaryTeal[0], primaryTeal[1], primaryTeal[2]);
  doc.text('SHRIMORA • DRIED SEAFOOD GLOBAL', 148.5, 98, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Your Trusted Marine Partner for Sustainable Indonesian Dried Seafood.', 148.5, 112, { align: 'center' });
  doc.text('SALTED • NATURAL • DRIED • PACKED', 148.5, 122, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('© 2026 PT Samdura Bara Persada (Dried Seafood Global). All Rights Reserved.', 148.5, 160, { align: 'center' });

  // Generate output blob
  return doc.output('blob');
}

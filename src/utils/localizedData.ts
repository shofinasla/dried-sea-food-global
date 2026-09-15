import { ExportCommodity, ExportWorkflowStep, BuyerTestimonial, GalleryItem, ServiceItem, BlogPost } from '../types';

export function getLocalizedCommodity(c: ExportCommodity, lang: string): ExportCommodity {
  const isId = lang === 'id';
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';

  let name = c.name;
  let category = c.category;
  let origin = c.origin;
  let description = c.description;
  let supplyCapacity = c.supplyCapacity;
  let grade = c.specification.grade;
  let packaging = c.specification.packaging;
  let colorTexture = c.specification.colorTexture;
  let moq = c.specification.moq;
  let shelfLife = c.specification.shelfLife;

  if (isId) {
    name = c.indonesianName || c.name;
    // Already in Indonesian in initialData.ts
    return {
      ...c,
      name,
      origin: c.origin,
      description: c.description
    };
  }

  if (isAr) {
    switch (c.id) {
      case 'exp-jambal-roti':
        name = 'سمك الثريدفين المملح الفاخر (جامبال روتي)';
        category = 'الأسماك المجففة والمملحة';
        origin = 'بانغانداران وسيلاكاب، جاوة الغربية، إندونيسيا';
        description = 'سمك جامبال روتي المملح من الدرجة الأولى من مياه بانغانداران وسيلاكاب. لحم سميك وطري مع تمليح طبيعي بملح البحر النقي وخالٍ 100% من الفورمالين.';
        supplyCapacity = '25 طن متري / شهرياً';
        grade = 'درجة أولى ممتازة للتصدير (فيليه سميك)';
        packaging = 'تغليف مفرغ غذائي 500 جم، 1 كجم، 5 كجم / كرتون تصدير 10 كجم';
        moq = '500 كجم (شحن جزئي LCL) / حاوية كاملة 1 FCL';
        shelfLife = '12 شهراً في مكان جاف وبارد';
        colorTexture = 'أبيض كريمي ناصع، ملمس متماسك، رائحة بحرية زكية';
        break;

      case 'exp-cumi-sero':
        name = 'حبار كاليماري طبيعي مجفف بالشمس (سيرو)';
        category = 'الحبار والكاليماري المجفف';
        origin = 'موانئ بحر جاوة وسوندا، إندونيسيا';
        description = 'حبار بحري طازج يتم صيده وتجفيفه في نفس اليوم تحت أشعة الشمس الساحلية. نكهة بحرية سكرية طبيعية دون إفراط في الملوحة، ومثالي للمطاعم والتوزيع.';
        supplyCapacity = '40 طن متري / شهرياً';
        grade = 'درجة أولى ممتازة A (طول 12 - 18 سم)';
        packaging = 'أكياس مفرغة 1 كجم + كرتون مقوى 10 كجم';
        moq = '500 كجم LCL / حاوية 20 قدماً كاملة';
        shelfLife = '18 شهراً في بيئة محكمة الإغلاق';
        colorTexture = 'شفاف مائل للبني الفاتح، خالي من أي مسحوق أبيض كيميائي';
        break;

      case 'exp-fish-maw':
        name = 'حويصلات الأسماك الفاخرة المجففة (فيش ماو كروكر وقاروص)';
        category = 'حويصلات الأسماك الفاخرة';
        origin = 'ميراوكي (بابوا) وبونتياناك (كاليمنتان)، إندونيسيا';
        description = 'حويصلات سباحة غنية بالكولاجين النقي يتم فرزها يدوياً قطعة قطعة بعناية فائقة لتلبية متطلبات الفنادق الفاخرة ومطاعم الشرق الأقصى والعلاجات التقليدية.';
        supplyCapacity = '5 أطنان متري / شهرياً';
        grade = 'درجة إمبريالية أولى (جدار سميك، لون عنبري، كولاجين عميق)';
        packaging = 'صناديق خشبية فاخرة 1 كجم / كراتين شحن جوي 10 كجم';
        moq = '25 كجم عبر الشحن الجوي السريع / 100 كجم شحن مجمع';
        shelfLife = '5 سنوات (تزداد قيمتها مع مرور الوقت)';
        colorTexture = 'أصفر ذهبي ناصع، خالي من بقع الدم، سميك جداً';
        break;

      case 'exp-teripang':
        name = 'خيار البحر المجفف الطبيعي (تيريبانغ باوت وساندفيش)';
        category = 'أصناف بحرية حصرية (خيار البحر)';
        origin = 'جزر آرو (مالوكو) وكوبانغ، إندونيسيا';
        description = 'خيار البحر البري المجموع يدوياً من أعماق الشعاب المرجانية النقية. مسلوق ومجفف باحترافية مع نسبة تمدد فائقة تزيد عن 6 أضعاف عند إعادة الترطيب.';
        supplyCapacity = '8 أطنان متري / شهرياً';
        grade = 'سوبر درجة أولى (20-30 حبة/كجم و 40-50 حبة/كجم)';
        packaging = 'تعبئة مفرغة 1 كجم + كرتون رئيسي 20 كجم';
        moq = '50 كجم عبر الشحن الجوي / 500 كجم بحري';
        shelfLife = '36 شهراً في عبوة محكمة الإغلاق';
        colorTexture = 'أسود رمادي نظيف، شكل متناسق وخالٍ من الشقوق';
        break;

      case 'exp-teri-asin':
        name = 'أنشوجة بيضاء مجففة سوبر (تيري ناسي وميدان)';
        category = 'الأنشوجة والأسماك الصغيرة';
        origin = 'بيلاوان (سومطرة الشمالية) وتوبان، إندونيسيا';
        description = 'أنشوجة بيضاء فاخرة مجففة بتقنية القباب الشمسية الحديثة. لون عاجي طبيعي دون مبيضات، ونكهة مقرمشة خفيفة الملوحة ومفضلة في الأسواق الآسيوية وسلاسل الهايبرماركت.';
        supplyCapacity = '80 طن متري / شهرياً';
        grade = 'سوبر AAA (طول 1.5 - 2.5 سم، حبات كاملة وبيضاء)';
        packaging = 'أكياس فاكيوم 100غ/250غ/500غ / كرتون تصدير 10 كجم';
        moq = '500 كجم LCL / حاوية 20 قدماً كاملة (12 طناً)';
        shelfLife = '12 شهراً في بيئة جافة / 24 شهراً في التبريد';
        colorTexture = 'أبيض عاجي طبيعي، مقرمش، خالٍ من الفورمالين والمبيضات';
        break;

      case 'exp-udang-ebi':
        name = 'روبيان بحري أحمر مجفف طبيعي (إيبي ممتاز)';
        category = 'الروبيان والمأكولات البحرية';
        origin = 'باغان سيابي-آبي (رياو) وتاراكان (كاليمنتان الشمالية)';
        description = 'جمبري مجفف درجة أولى من صيد المياه الساحلية الضحلة، بمذاق حلو ونقي وطبيعي خالٍ من الملونات الاصطناعية ومحسنات الطعم.';
        supplyCapacity = '50 طن متري / شهرياً';
        grade = 'سوبر درجة A (لون برتقالي محمر طبيعي، مقشر ونظيف)';
        packaging = 'أكياس بولي إيثيلين غذائي 5 كجم + كرتون رئيسي 20 كجم';
        moq = '1000 كجم LCL / حاوية 20 قدماً (15 طناً)';
        shelfLife = '12 شهراً في مكان بارد وجاف';
        colorTexture = 'برتقالي مائل للحمرة، رائحة ذكية، خالٍ تماماً من الملونات';
        break;

      case 'exp-tenggiri-kering':
        name = 'فيليه سمك الكنعد والماكريل الأسباني المملح المجفف';
        category = 'الأسماك المملحة والمجففة';
        origin = 'بحر جاوة ومضيق سوندا، إندونيسيا';
        description = 'شرائح فيليه سمك التنجيري (الكنعد) المملحة بأجود ملح بحري نقي. لحم متماسك ورائحة زكية، مناسب للفنادق والمطاعم.';
        supplyCapacity = '35 طن متري / شهرياً';
        grade = 'درجة A فيليه سميك (منظف بدون حسك رئيسي وبدون قشور)';
        packaging = 'تغليف فردي بالانكماش الحراري + كرتون رئيسي 10 كجم';
        moq = '1000 كجم / حاوية 20 قدماً (14 طناً)';
        shelfLife = '10 أشهر في مكان جاف ومضبوط الحرارة';
        colorTexture = 'لحم أبيض ناصع، متماسك وغير متفتت، خالٍ من الفورمالين';
        break;

      case 'exp-ikan-gabus':
        name = 'فيليه سمك رأس الأفعى النهري المجفف (غابوس)';
        category = 'الأسماك المملحة والمجففة';
        origin = 'بالمبانغ وبانجارماسين وبحيرة توبا، إندونيسيا';
        description = 'سمك رأس الأفعى النهري الغني بالبروتين والألبومين الصحي، مقطوع بنمط الفراشة ومجفف بعناية فائقة. رائج ومطلوب في قطاع التغذية العلاجية والمأكولات التقليدية.';
        supplyCapacity = '30 طن متري / شهرياً';
        grade = 'درجة A فراشة مفتوحة (بدون رأس وعظام شوكية)';
        packaging = 'أكياس مفرغة 250غ/500غ + كرتون رئيسي 15 كجم';
        moq = '500 كجم LCL / حاوية 10 أطنان كاملة';
        shelfLife = '12 شهراً في بيئة تخزين جافة';
        colorTexture = 'بني فاتح طبيعي، مجفف ومقرمش، غني بالألبومين';
        break;
    }
  } else if (!isId) {
    // English & International defaults
    switch (c.id) {
      case 'exp-jambal-roti':
        name = 'Salted Threadfin Fillet (Jambal Roti Super Export)';
        category = 'Traditional Salted Fish';
        origin = 'Pangandaran & Cilacap, West Java, Indonesia';
        description = 'Imperial grade salted threadfin fish sustainably harvested from the pristine waters of West Java. Firm texture, naturally cured with pure sea salt, 100% formalin-free.';
        supplyCapacity = '25 Metric Tons / Month';
        grade = 'Grade A Super Export (Thick Fillet Cut)';
        packaging = 'Food-Grade Vacuum Bag (500g, 1kg, 5kg) / Master Carton 10kg';
        moq = '500 Kg (LCL) / 1 x 20ft FCL Container';
        shelfLife = '12 Months in cool, dry storage';
        colorTexture = 'Clean Ivory White, Firm Texture, Non-Formalin';
        break;

      case 'exp-cumi-sero':
        name = 'Sun-Dried Coastal Squid (Cumi Sero Grade A)';
        category = 'Dried Squid & Cuttlefish';
        origin = 'Java Sea & Sunda Strait, Indonesia';
        description = 'Fresh day-catch squid harvested via traditional sero fish traps, cleaned and sun-dried immediately under coastal sunshine. Retains natural marine umami sweetness without excess salinity.';
        supplyCapacity = '40 Metric Tons / Month';
        grade = 'Super Grade A (12 - 18 cm Length)';
        packaging = 'Vacuum Pouch (1 Kg) + 10 Kg Master Carton';
        moq = '500 Kg (LCL) / 1 x 20ft FCL';
        shelfLife = '18 Months in airtight sealed packaging';
        colorTexture = 'Translucent Amber-Brown, Free from Chemical Residues';
        break;

      case 'exp-fish-maw':
        name = 'Indonesian Premium Dried Fish Maw (Gulama & Croaker)';
        category = 'Imperial Fish Maw';
        origin = 'Merauke (Papua), Riau, & West Kalimantan, Indonesia';
        description = 'Deep-sea and river fish maw rich in pure bio-collagen. Meticulously inspected and graded piece-by-piece by veteran specialists for haute cuisine, luxury banquet soups, and wellness.';
        supplyCapacity = '5 Metric Tons / Month';
        grade = 'Imperial First Grade (Thick Wall, Clean Amber Hue, High Collagen)';
        packaging = 'Luxury Wood Case (1 Kg) / Air Cargo Carton (10 Kg)';
        moq = '25 Kg via Priority Air Freight / 100 Kg Consolidated';
        shelfLife = '5 Years (develops higher gastronomic value with age)';
        colorTexture = 'Clear Golden Amber, Zero Blood Stains, Thick Wall';
        break;

      case 'exp-teripang':
        name = 'Wild-Harvested Dried Sea Cucumber (Sandfish & Teatfish)';
        category = 'Exclusive Sea Cucumber';
        origin = 'Aru Islands (Maluku) & Kupang, Indonesia';
        description = 'Wild sea cucumber harvested by traditional divers across pristine coral reefs. Boiled, cured, and dried with an expansion ratio exceeding 6x upon rehydration.';
        supplyCapacity = '8 Metric Tons / Month';
        grade = 'Super Grade 1 (20-30 pcs/kg & 40-50 pcs/kg)';
        packaging = 'Vacuum Sealed Pack 1 Kg + Master Carton 20 Kg';
        moq = '50 Kg (Via Air Cargo Express) / 500 Kg Ocean Freight';
        shelfLife = '36 Months in airtight dry container';
        colorTexture = 'Clean Ash Black, Symmetrical Shape, Crack-Free';
        break;

      case 'exp-teri-asin':
        name = 'Super White Dried Anchovy (Teri Nasi & Medan Anchovy)';
        category = 'Dried Anchovy & Small Fish';
        origin = 'Belawan (North Sumatra) & Tuban (East Java), Indonesia';
        description = 'Super AAA grade white anchovies dried using enclosed Solar Dome technology. Natural ivory color without chemical bleaches, crispy texture, low sodium, ideal for Asian supermarkets.';
        supplyCapacity = '80 Metric Tons / Month';
        grade = 'Super AAA Grade (1.5 - 2.5 cm, Intact & Clean White)';
        packaging = '100g/250g/500g Vacuum Pouch / 10 Kg Master Carton';
        moq = '500 Kg (LCL) / 1 x 20ft FCL Container (12 MT)';
        shelfLife = '12 Months dry room temp / 24 Months chilled';
        colorTexture = 'Natural Ivory White, Crispy, Formalin-Free, Zero Bleach';
        break;

      case 'exp-udang-ebi':
        name = 'Super Red Sun-Dried Prawns / Dried Shrimp (Ebi Super)';
        category = 'Dried Prawns & Seafood';
        origin = 'Bagan Siapi-api (Riau) & Tarakan, Indonesia';
        description = 'Top-tier sun-dried prawns caught in coastal waters. Cleanly shelled with a natural sweet-savory flavor and no artificial dyes, widely used in XO sauces and gourmet cooking.';
        supplyCapacity = '50 Metric Tons / Month';
        grade = 'Super Grade A (Natural Reddish-Orange, Cleanly Shelled)';
        packaging = 'Food-Grade Polythene Bag (5 Kg) + 20 Kg Master Box';
        moq = '1,000 Kg (LCL) / 1 x 20ft FCL (15 MT)';
        shelfLife = '12 Months in cool dry room';
        colorTexture = 'Reddish-Orange, Pleasant Aroma, Zero Artificial Colorants';
        break;

      case 'exp-tenggiri-kering':
        name = 'Salted Spanish Mackerel Fillet (Tenggiri Papan Cut)';
        category = 'Traditional Salted Fish';
        origin = 'Java Sea & Sunda Strait, Indonesia';
        description = 'Fresh Spanish mackerel fillets salted with pure marine salt. Dense, savory meat free from fishy odor, favored by hotels and seafood restaurants across Southeast Asia.';
        supplyCapacity = '35 Metric Tons / Month';
        grade = 'Grade A Thick Cut Fillet (Clean, Scaleless, Deboned Center)';
        packaging = 'Individual Shrink Wrap + 10 Kg Master Carton';
        moq = '1,000 Kg / 1 x 20ft Container (14 MT)';
        shelfLife = '10 Months in temperature-controlled dry storage';
        colorTexture = 'Lustrous White Meat, Firm & Savory, Non-Formalin';
        break;

      case 'exp-ikan-gabus':
        name = 'Sun-Dried Snakehead Fish Fillet (Ikan Gabus Rawa)';
        category = 'Traditional Salted Fish';
        origin = 'Palembang (South Sumatra) & Lake Toba, Indonesia';
        description = 'Fresh swamp snakehead fish prized for its high protein and albumin content, butterfly-split and sun-dried to crisp perfection. Popular among health-conscious culinary buyers.';
        supplyCapacity = '30 Metric Tons / Month';
        grade = 'Grade A Butterfly Cut (Headless, Cleaned Butterfly Cut)';
        packaging = 'Vacuum Bag 250g/500g + Master Box 15 Kg';
        moq = '500 Kg LCL / 10 Metric Tons FCL';
        shelfLife = '12 Months in cool storage';
        colorTexture = 'Natural Light Brown, Crispy, Rich in Natural Albumin';
        break;
    }
  }

  return {
    ...c,
    name,
    category,
    origin,
    description,
    supplyCapacity,
    specification: {
      ...c.specification,
      grade,
      packaging,
      moq,
      shelfLife,
      colorTexture
    }
  };
}

export function getLocalizedWorkflowStep(step: ExportWorkflowStep, lang: string): ExportWorkflowStep {
  if (lang === 'id') {
    return step;
  }

  if (lang === 'ar') {
    switch (step.stepNumber) {
      case '01':
        return {
          ...step,
          title: 'التوريد المباشر واختيار الصيد الطازج',
          subtitle: 'اختيار المواد الخام وفرز الجودة الأولية',
          description: 'يتم فرز الأسماك المصطادة فور وصول قوارب الصيادين إلى موانئ الإنزال. نختار فقط الأسماك الطازجة الخالية من أي تلف لضمان أعلى مواصفات التصدير.',
          keyAction: 'فحص نضارة الخياشيم، مرونة اللحم، وإجراء اختبار فوري لخلو الشحنة من الفورمالين.',
          complianceDoc: 'سجل استلام المواد الخام الطازجة وتقرير الفرز الميداني'
        };
      case '02':
        return {
          ...step,
          title: 'التمليح الصحي والتجفيف بالقباب الشمسية',
          subtitle: 'تجفيف نقي في بيئة مغلقة وصديقة للبيئة',
          description: 'تتم عملية التمليح باستخدام ملح البحر النقي الغذائي، تليها مرحلة التجفيف في قباب الطاقة الشمسية (Solar Dome) المعزولة عن الأتربة والحشرات والتلوث.',
          keyAction: 'مراقبة نسبة الرطوبة (< 14%) ومستويات الجفاف بواسطة أجهزة قياس الرطوبة الرقمية.',
          complianceDoc: 'سجل ضبط درجات حرارة التجفيف وبطاقة مراقبة الجودة'
        };
      case '03':
        return {
          ...step,
          title: 'الفحص المخبري والتحقق من السلامة',
          subtitle: 'شهادة الحجر الصحي BKIPM ومعايير HACCP الفئة A',
          description: 'تخضع كل دفعة إنتاجية للتحليل في مختبرات مستقلة معتمدة لضمان الخلو التام من الفورمالين، المعادن الثقيلة، والتأكد من أمان نسب الهستامين.',
          keyAction: 'إصدار شهادة التحليل الرسمية (COA) واعتماد الكشف البيطري الصحي للأسماك.',
          complianceDoc: 'الشهادة الصحية البيطرية الرسمية (BKIPM HC) وشهادة فحص ISO 17025'
        };
      case '04':
        return {
          ...step,
          title: 'التغليف المفرغ وممتصات الرطوبة الغذائية',
          subtitle: 'إحكام الإغلاق الفراغي وكراتين التصدير المقواة',
          description: 'تعبئة في أكياس عازلة عالية الجودة ومفرغة من الهواء أو عبوات تجزئة بملصق بيانات غذائية متعدد اللغات، مع ممتصات الرطوبة وكراتين 5 طبقات مقواة.',
          keyAction: 'الختم الحراري الفراغي التلقائي، الفحص عبر كاشف المعادن الصناعي، والترميز بالباركود.',
          complianceDoc: 'بيان التعبئة (Packing List)، شهادة الوزن، وشهادة فحص جودة التعبئة'
        };
      case '05':
        return {
          ...step,
          title: 'تحميل الحاويات الجافة والشحن الدولي',
          subtitle: 'تسيير الحاويات البحرية والشحن الجوي السريع',
          description: 'تحميل الحاويات البحرية في ميناء تانجونغ بريوك أو مطار سوكارنو هاتا عبر المسار الجمركي الأخضر وجداول الملاحة الدولية المنظمة إلى ميناء وجهتك.',
          keyAction: 'إصدار إشعار التصدير الجمركي (PEB)، شهادة المنشأ (Form E/D/AK)، والتتبع الملاحي الحي.',
          complianceDoc: 'بوليصة الشحن البحرية (B/L) أو الجوية (AWB)، شهادة المنشأ الرسمية (COO)'
        };
    }
  }

  // English & Fallback
  switch (step.stepNumber) {
    case '01':
      return {
        ...step,
        title: 'Fisherman Sourcing & Fresh Catch Selection',
        subtitle: 'Raw Material Selection & Quality Sorting',
        description: 'Fish are sorted immediately upon boat landings at regional fishing ports. We select only prime, fresh catches with zero initial degradation to guarantee export excellence.',
        keyAction: 'Verification of gill freshness, flesh firmness, and rapid preliminary chemical screening.',
        complianceDoc: 'Raw Material Reception Log & QC Sorting Report'
      };
    case '02':
      return {
        ...step,
        title: 'Hygienic Salting & Solar Dome Drying',
        subtitle: 'Eco-Friendly, Enclosed Hygienic Dehydration',
        description: 'Salting utilizes pure food-grade sea salt, followed by controlled drying inside polycarbonate Solar Domes fully protected from dust, insects, and coastal rain.',
        keyAction: 'Digital moisture meter verification (< 14% moisture) and hourly temperature logging.',
        complianceDoc: 'Drying Temperature Monitor & Internal Quality Control Card'
      };
    case '03':
      return {
        ...step,
        title: 'Laboratory Testing & Chemical-Free Audit',
        subtitle: 'BKIPM Quarantine Certification & HACCP Grade A',
        description: 'Every production lot is audited in independent accredited laboratories to ensure zero formalin, heavy metals compliance, and safe histamine thresholds.',
        keyAction: 'Issuance of official Certificate of Analysis (COA) and fishery veterinary clearance.',
        complianceDoc: 'Official BKIPM Health Certificate (HC) & ISO 17025 COA'
      };
    case '04':
      return {
        ...step,
        title: 'Airtight Vacuum Sealing & Food-Grade Desiccant',
        subtitle: 'High-Barrier Vacuum Packing & Export Cartons',
        description: 'Packaging uses high-barrier vacuum barrier film or retail-ready branded pouches with export nutrition panels, food-grade desiccants, and heavy 5-ply master cartons.',
        keyAction: 'Automated vacuum sealing, industrial metal detection, and multilingual regulatory labeling.',
        complianceDoc: 'Packing List, Weight Slips & Certificate of Packaging Quality'
      };
    case '05':
      return {
        ...step,
        title: 'Dry Container Loading & Global Voyage Dispatch',
        subtitle: 'Scheduled FCL Ocean Freight & Priority Air Cargo',
        description: 'Container stuffing at Tanjung Priok Port or Soekarno-Hatta Air Cargo Terminal with priority customs green channel and direct sailings to your destination port.',
        keyAction: 'PEB customs filing, Form E/D/AK Certificate of Origin, and real-time container tracking.',
        complianceDoc: 'Ocean Bill of Lading (B/L) / Airway Bill (AWB), COO Form E, & Customs Clearance'
      };
  }

  return step;
}

export function getLocalizedTestimonial(t: BuyerTestimonial, lang: string): BuyerTestimonial {
  if (lang === 'id') {
    return t;
  }

  if (lang === 'ar') {
    switch (t.id) {
      case 'test-1':
        return {
          ...t,
          buyerRole: 'المدير التنفيذي وكبير مسؤولي المشتريات',
          country: 'هونغ كونغ (Sheung Wan)',
          commodityPurchased: 'حويصلات الأسماك الفاخرة وخيار البحر الإندونيسي',
          volumeAnnually: '18 طن متري / سنوياً (شحن جوي وبحري)',
          comment: 'شركة Dried Seafood Global هي شريكنا الأوثق والمفضل لتوريد حويصلات الأسماك الفاخرة وخيار البحر الإندونيسي إلى أسواق هونغ كونغ. جودة التجفيف ممتازة، ونظيفة تماماً من الشوائب والدم، والجدار سميك وغني. أوراق الحجر الصحي BKIPM وتراخيص CITES مكتملة دائماً مما يضمن تخليصاً سلساً دون تأخير.'
        };
      case 'test-2':
        return {
          ...t,
          buyerRole: 'مدير المشتريات والتوريد',
          country: 'سنغافورة (Singapore)',
          commodityPurchased: 'الأنشوجة البيضاء الفاخرة (تيري ناسي) وسمك جامبال المملح',
          volumeAnnually: '120 طن متري / سنوياً (حاويات كاملة منتظمة)',
          comment: 'نحن نورد الأنشوجة البيضاء وسمك جامبال روتي المملح لسلاسل السوبرماركت والمطاعم في سنغافورة. منتجات Dried Seafood Global بيضاء ونقية وخالية تماماً من المبيضات، ومستوى الملوحة مضبوط تماماً وفق رغبة المستهلكين. تصل الحاويات دائماً في حالة جافة ومثالية.'
        };
      case 'test-3':
        return {
          ...t,
          buyerRole: 'المدير العام لواردات المأكولات البحرية',
          country: 'الصين (قوانغتشو)',
          commodityPurchased: 'حبار سيرو مجفف بالشمس وكاليماري درجة أولى',
          volumeAnnually: '8 حاويات 40 قدماً مكعبة / سنوياً',
          comment: 'يمتاز الحبار المجفف الإندونيسي بنكهة حلوة طبيعية محبوبة جداً في أسواق غوانغدونغ. بفضل شهادة المنشأ Form E الصادرة من Dried Seafood Global، نستفيد من الإعفاء الجمركي الكامل (تعريفة 0%). تعاملهم راقٍ وتوريدهم منتظم على مدار العام.'
        };
      case 'test-4':
        return {
          ...t,
          buyerRole: 'مدير توزيع المنتجات الآسيوية',
          country: 'الولايات المتحدة (لوس أنجلوس، كاليفورنيا)',
          commodityPurchased: 'عبوات تجزئة مفرغة من الأنشوجة والماكريل المملح',
          volumeAnnually: '35 طن متري / سنوياً',
          comment: 'منتجات الأسماك المجففة المعبأة بتفريغ الهواء مسجلة رسمياً لدى إدارة الغذاء والدواء الأمريكية (US FDA). يعشق الجالية الآسيوية والمستهلكون في كاليفورنيا جودتها ونكهتها الأصيلة والنظيفة. فريق خدمة العملاء والاستجابة السريعة لعروض الأسعار ممتاز وموثوق للغاية.'
        };
    }
  }

  // English & Default
  switch (t.id) {
    case 'test-1':
      return {
        ...t,
        buyerRole: 'Managing Director & Head Buyer',
        country: 'Hong Kong SAR (Sheung Wan District)',
        commodityPurchased: 'Imperial Grade Dried Fish Maw & Sandfish Sea Cucumber',
        volumeAnnually: '18 Metric Tons / Year (Air Cargo & Ocean FCL)',
        comment: 'Dried Seafood Global is our prime trusted partner for supplying premium fish maw and wild sea cucumber from Indonesia to Hong Kong. The drying purity is flawless, clean of blood stains, and thick. CITES and BKIPM Health Certificates are always complete, making customs clearance smooth and predictable.'
      };
    case 'test-2':
      return {
        ...t,
        buyerRole: 'Procurement Director',
        country: 'Singapore',
        commodityPurchased: 'Super White Anchovy (Teri Nasi) & Salted Fish Fillets',
        volumeAnnually: '120 Metric Tons / Year (Regular FCL Containers)',
        comment: 'We supply super white anchovies and salted fish to supermarket chains and gourmet dining groups across Singapore. Products from Dried Seafood Global are consistently clean, free of chemical bleaches, and lightly salted to match our regional consumer palates. Container arrivals are kept perfectly dry.'
      };
    case 'test-3':
      return {
        ...t,
        buyerRole: 'General Manager of Seafood Imports',
        country: 'China (Guangzhou Seafood Center)',
        commodityPurchased: 'Sun-Dried Coastal Squid Sero & Baby Cuttlefish Grade A',
        volumeAnnually: '8 x 40ft High Cube Containers / Year',
        comment: 'Sun-dried squid from Indonesia carries a natural umami sweetness that is in high demand across Guangdong markets. Through Form E certificates provided by Dried Seafood Global, we enjoy zero-duty customs preferential tariffs. Their rapid response and consistent batch quality are unmatched.'
      };
    case 'test-4':
      return {
        ...t,
        buyerRole: 'Director of Asian Food Distribution',
        country: 'United States (Los Angeles, CA)',
        commodityPurchased: 'Retail-Pack Vacuum Dried Anchovy & Salted Mackerel Fillet',
        volumeAnnually: '35 Metric Tons / Year',
        comment: 'The vacuum-sealed retail packs from Dried Seafood Global are officially registered with the US FDA. Asian food connoisseurs and diaspora communities in California appreciate the authentic taste, hygienic processing, and non-formalin assurance. Their 24/7 RFQ team and communication are outstanding.'
      };
  }

  return t;
}

export function getLocalizedGalleryItem(item: GalleryItem, lang: string): GalleryItem {
  if (lang === 'id') {
    return item;
  }

  if (lang === 'ar') {
    switch (item.id) {
      case 'gal-1':
        return {
          ...item,
          title: 'فرز وتجفيف الأنشوجة البيضاء الفاخرة (تيري ناسي)',
          location: 'مراكز تجهيز موانئ موارا بارو وبيلاوان، إندونيسيا',
          date: '15 أغسطس 2025',
          description: 'عملية انتقاء وفرز دقيقة لأسماك الأنشوجة البيضاء النقية المجففة على رفوف شبكية من الستانلس ستيل الصحي والمقاوم للصدأ بدون أي مواد حافظة.',
          tags: ['أنشوجة بيضاء فاخرة', 'سلامة غذائية', 'فرز يدوي دقيق', 'درجة أولى A']
        };
      case 'gal-2':
        return {
          ...item,
          title: 'مستودعات مكيفة ومضبوطة الرطوبة بمعايير HACCP',
          location: 'المنطقة الصناعية البحرية في ماروندا، جاكرتا',
          date: '10 يوليو 2025',
          description: 'مستودعات تخزين جافة بمساحة 18,500 متر مربع مزودة بمعدات تحكم متطورة بالرطوبة (RH < 55%) للحفاظ على جودة ونكهة الأسماك المجففة.',
          tags: ['مستودعات مضبوطة الرطوبة', 'معايير HACCP الفئة A', 'خالية من الآفات', 'معقمة بالكامل']
        };
      case 'gal-3':
        return {
          ...item,
          title: 'تصنيف وفرز حويصلات الأسماك الفاخرة (فيش ماو)',
          location: 'منشأة التصدير الفاخر في موارا بارو، جاكرتا',
          date: '02 مايو 2025',
          description: 'فحص سماكة وشفافية ونقاء حويصلات الأسماك الفاخرة المخصصة لمطاعم الفنادق الراقية وسوق هونغ كونغ الدولية.',
          tags: ['حويصلات أسماك فاخرة', 'كولاجين طبيعي', 'تجارة هونغ كونغ', 'أصناف بحرية نادرة']
        };
      case 'gal-4':
        return {
          ...item,
          title: 'تحميل حاويات التصدير البحرية في الميناء الدولي',
          location: 'محطة الحاويات بميناء تانجونغ بريوك جاكرتا',
          date: '28 يونيو 2025',
          description: 'تحميل حاوية 40 قدماً مكعبة مجهزة بممتصات الرطوبة الصناعية لشحنة أسماك جامبال وماكريل متجهة إلى لوس أنجلوس، الولايات المتحدة.',
          tags: ['تصدير حاويات FCL', 'ميناء تانجونغ بريوك', 'امتصاص الرطوبة', 'شحن بحري دولي']
        };
      default:
        return item;
    }
  }

  // English & Default
  switch (item.id) {
    case 'gal-1':
      return {
        ...item,
        title: 'Super White Anchovy Sorting & Solar Drying Center',
        location: 'Muara Baru & Belawan Coastal Processing Centers',
        date: 'August 15, 2025',
        description: 'Careful hand-sorting of premium white anchovies dried hygienically on food-grade stainless steel mesh tables without chemical preservatives.',
        tags: ['Super White Anchovy', 'Food Safety', 'Hand-Sorted', 'Grade A']
      };
    case 'gal-2':
      return {
        ...item,
        title: 'Dehumidified Storage Facility Under HACCP Protocols',
        location: 'Marunda Marine Industrial Zone, North Jakarta',
        date: 'July 10, 2025',
        description: '18,500 m² humidity-controlled dry warehouse (RH < 55%) protecting dried marine commodities from mold and preserving natural oceanic aroma.',
        tags: ['Dehumidified Storage', 'HACCP Grade A', 'Pest-Free', 'Sanitized']
      };
    case 'gal-3':
      return {
        ...item,
        title: 'Grading of Imperial Dried Fish Maw & Sandfish Sea Cucumber',
        location: 'Premium Export Sorting Facility, Muara Baru, Jakarta',
        date: 'May 02, 2025',
        description: 'Inspection of wall thickness, amber translucency, and low moisture in premium fish maw destined for Sheung Wan culinary markets in Hong Kong.',
        tags: ['Fish Maw', 'Isinglass', 'Luxury Seafood', 'Hong Kong Trade']
      };
    case 'gal-4':
      return {
        ...item,
        title: 'Export Container Stuffing with Moisture Desiccants',
        location: 'Tanjung Priok Container Terminal, Jakarta',
        date: 'June 28, 2025',
        description: 'Loading of a 40ft High Cube container carrying salted threadfin fillets with heavy-duty desiccants destined for Los Angeles, USA.',
        tags: ['FCL Export', 'Tanjung Priok', 'Moisture Absorbers', 'USA Shipping']
      };
    default:
      return item;
  }
}

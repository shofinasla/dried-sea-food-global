import { SupportedLanguage } from './translations';

type CategoryGroup = 'product' | 'blog' | 'gallery';

const CATEGORY_LABELS: Record<CategoryGroup, Record<string, Partial<Record<SupportedLanguage, string>>>> = {
  product: {
    'Ikan Teri & Bilis Kering': {
      en: 'Dried Anchovy & Whitebait', id: 'Ikan Teri & Bilis Kering', zh: '鳀鱼干与白饭鱼', ja: '煮干し・白魚', ko: '건멸치와 빙어', ar: 'الأنشوجة والسمك الأبيض المجفف', es: 'Anchoa y Pez Aguja Secos', fr: 'Anchois et Blanchailles Séchés', de: 'Getrocknete Sardellen & Sandaale', vi: 'Cá cơm và cá trắng khô', ru: 'Сушеный анчоус и белая рыба'
    },
    'Ikan Asin Olahan Tradisional': {
      en: 'Traditional Processed Salted Fish', id: 'Ikan Asin Olahan Tradisional', zh: '传统加工咸鱼', ja: '伝統加工塩魚', ko: '전통 가공 염장 생선', ar: 'الأسماك المملحة التقليدية', es: 'Pescado Salado Tradicional', fr: 'Poissons Salés Traditionnels', de: 'Traditionell Verarbeiteter Salzfisch', vi: 'Cá muối chế biến truyền thống', ru: 'Традиционная соленая рыба'
    },
    'Cumi & Sotong Kering': {
      en: 'Dried Squid & Cuttlefish', id: 'Cumi & Sotong Kering', zh: '鱿鱼与墨鱼干', ja: 'するめ・干しイカ', ko: '건오징어와 갑오징어', ar: 'الحبار والسيبيا المجففة', es: 'Calamar y Sepia Secos', fr: 'Calmars et Seiches Séchés', de: 'Getrocknete Tinten- & Sepiafische', vi: 'Mực và nang khô', ru: 'Сушеный кальмар и каракатица'
    },
    'Gelembung Ikan / Fish Maw': {
      en: 'Fish Maw', id: 'Gelembung Ikan / Fish Maw', zh: '鱼胶花胶', ja: '魚鰾（フィッシュモー）', ko: '생선 부레 (Fish Maw)', ar: 'حويصلات الأسماك', es: 'Buche de Pescado', fr: 'Vessie Natatoire (Fish Maw)', de: 'Fischblasen (Fish Maw)', vi: 'Bong bóng cá', ru: 'Рыбьи пузыри (Fish Maw)'
    },
    'Teripang & Hasil Laut Eksklusif': {
      en: 'Sea Cucumber & Exclusive Seafood', id: 'Teripang & Hasil Laut Eksklusif', zh: '海参与珍稀海产', ja: 'ナマコ・高級海産物', ko: '해삼 및 프리미엄 해산물', ar: 'خيار البحر والمأكولات البحرية الفاخرة', es: 'Pepino de Mar y Mariscos Exclusivos', fr: 'Holothuries et Fruits de Mer Exclusifs', de: 'Seegurken & Exklusive Meeresfrüchte', vi: 'Hải sâm và hải sản cao cấp', ru: 'Трепанг и элитные морепродукты'
    },
    'Ikan Teri & Asin': {
      en: 'Anchovy & Salted Fish', id: 'Ikan Teri & Asin', zh: '鳀鱼与咸鱼', ja: 'アンチョビ・塩魚', ko: '멸치와 염장 생선', ar: 'الأنشوجة والأسماك المملحة', es: 'Anchoa y Pescado Salado', fr: 'Anchois et Poissons Salés', de: 'Sardellen & Salzfisch', vi: 'Cá cơm và cá muối', ru: 'Анчоус и соленая рыба'
    },
    'Hasil Laut & Pangan': {
      en: 'Seafood & Food Products', id: 'Hasil Laut & Pangan', zh: '海产与食品', ja: '海産物・食品', ko: '해산물 및 식품', ar: 'المأكولات البحرية والمواد الغذائية', es: 'Mariscos y Productos Alimentarios', fr: 'Produits de la Mer et Alimentaires', de: 'Meeresfrüchte & Lebensmittel', vi: 'Hải sản và thực phẩm', ru: 'Морепродукты и продукты питания'
    }
  },
  blog: {
    'Ekspor & Pasar': { en: 'Export & Global Markets', id: 'Ekspor & Pasar', zh: '出口与全球市场', ja: '輸出・グローバル市場', ko: '수출 및 글로벌 시장', ar: 'التصدير والأسواق العالمية', es: 'Exportación y Mercados Globales', fr: 'Exportation et Marchés Mondiaux', de: 'Export & Globale Märkte', vi: 'Xuất khẩu và thị trường toàn cầu', ru: 'Экспорт и мировые рынки' },
    'Teknologi Pengolahan': { en: 'Processing Technology', id: 'Teknologi Pengolahan', zh: '加工技术', ja: '加工技術', ko: '가공 기술', ar: 'تقنيات المعالجة', es: 'Tecnología de Procesamiento', fr: 'Technologie de Transformation', de: 'Verarbeitungstechnologie', vi: 'Công nghệ chế biến', ru: 'Технология обработки' },
    'Regulasi & Sertifikasi': { en: 'Regulations & Certification', id: 'Regulasi & Sertifikasi', zh: '法规与认证', ja: '規制・認証', ko: '규정 및 인증', ar: 'اللوائح والشهادات', es: 'Regulación y Certificación', fr: 'Réglementation et Certification', de: 'Regulierung & Zertifizierung', vi: 'Quy định và chứng nhận', ru: 'Регулирование и сертификация' },
    'Kualitas & Higienitas': { en: 'Quality & Hygiene', id: 'Kualitas & Higienitas', zh: '质量与卫生', ja: '品質・衛生', ko: '품질 및 위생', ar: 'الجودة والنظافة', es: 'Calidad e Higiene', fr: 'Qualité et Hygiène', de: 'Qualität & Hygiene', vi: 'Chất lượng và vệ sinh', ru: 'Качество и гигиена' },
    'Nelayan & Keberlanjutan': { en: 'Fisheries & Sustainability', id: 'Nelayan & Keberlanjutan', zh: '渔民与可持续发展', ja: '漁業・持続可能性', ko: '어민 및 지속가능성', ar: 'الصيادون والاستدامة', es: 'Pesca y Sostenibilidad', fr: 'Pêcheurs et Durabilité', de: 'Fischer & Nachhaltigkeit', vi: 'Ngư dân và phát triển bền vững', ru: 'Рыбаки и устойчивое развитие' }
  },
  gallery: {
    processing: { en: 'Processing & Solar Dome', id: 'Pengeringan & Solar Dome', zh: '加工与太阳能穹顶', ja: '加工・ソーラードーム', ko: '가공 및 솔라 돔', ar: 'المعالجة والقبة الشمسية', es: 'Procesamiento y Solar Dome', fr: 'Transformation et Solar Dome', de: 'Verarbeitung & Solar Dome', vi: 'Chế biến và Solar Dome', ru: 'Обработка и Solar Dome' },
    commodities: { en: 'Selected Fish Products', id: 'Produk Ikan Pilihan', zh: '精选鱼类产品', ja: '厳選水産品', ko: '엄선 수산물', ar: 'منتجات الأسماك المختارة', es: 'Productos de Pescado Seleccionados', fr: 'Produits de Poisson Sélectionnés', de: 'Ausgewählte Fischprodukte', vi: 'Sản phẩm cá chọn lọc', ru: 'Отборные рыбные продукты' },
    storage: { en: 'Storage & Quality Lab', id: 'Gudang & Lab Uji Mutu', zh: '仓储与质量实验室', ja: '倉庫・品質検査室', ko: '창고 및 품질 연구소', ar: 'المخازن ومختبر الجودة', es: 'Almacén y Laboratorio de Calidad', fr: 'Entrepôt et Laboratoire Qualité', de: 'Lager & Qualitätslabor', vi: 'Kho và phòng thí nghiệm chất lượng', ru: 'Склад и лаборатория качества' },
    shipping: { en: 'Export Packing & Containers', id: 'Pengepakan & Kontainer Ekspor', zh: '出口包装与集装箱', ja: '輸出梱包・コンテナ', ko: '수출 포장 및 컨테이너', ar: 'التعبئة والحاويات للتصدير', es: 'Embalaje y Contenedores de Exportación', fr: 'Emballage et Conteneurs d’Exportation', de: 'Exportverpackung & Container', vi: 'Đóng gói và container xuất khẩu', ru: 'Экспортная упаковка и контейнеры' },
    sustainability: { en: 'Coastal Fisheries Partnership', id: 'Kemitraan Nelayan Pesisir', zh: '沿海渔业合作', ja: '沿岸漁業パートナーシップ', ko: '연안 어민 파트너십', ar: 'شراكة الصيادين الساحليين', es: 'Alianza con Pescadores Costeros', fr: 'Partenariat avec les Pêcheurs Côtiers', de: 'Partnerschaft mit Küstenfischern', vi: 'Hợp tác ngư dân ven biển', ru: 'Партнерство с прибрежными рыбаками' }
  }
};

export function getCategoryLabel(group: CategoryGroup, category: string, language: SupportedLanguage): string {
  return CATEGORY_LABELS[group][category]?.[language] || CATEGORY_LABELS[group][category]?.en || category;
}

export function getAllCategoryLabel(group: CategoryGroup, language: SupportedLanguage): string {
  const labels: Record<CategoryGroup, Partial<Record<SupportedLanguage, string>>> = {
    product: { en: 'All Products', id: 'Semua Produk', zh: '全部商品', ja: '全製品', ko: '전체 품목', ar: 'كافة المنتجات', es: 'Todos los Productos', fr: 'Tous les Produits', de: 'Alle Produkte', vi: 'Tất cả sản phẩm', ru: 'Все товары' },
    blog: { en: 'All Articles', id: 'Semua Artikel', zh: '全部文章', ja: 'すべての記事', ko: '전체 글', ar: 'كل المقالات', es: 'Todos los Artículos', fr: 'Tous les Articles', de: 'Alle Artikel', vi: 'Tất cả bài viết', ru: 'Все статьи' },
    gallery: { en: 'All Documentation', id: 'Semua Dokumentasi', zh: '全部实拍', ja: 'すべての記録', ko: '전체 문서', ar: 'كل التوثيق', es: 'Toda la Documentación', fr: 'Toute la Documentation', de: 'Gesamtdokumentation', vi: 'Tất cả tư liệu', ru: 'Вся документация' }
  };
  return labels[group][language] || labels[group].en || 'All';
}

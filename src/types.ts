export interface CompanyStat {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface CompanyLeader {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
}

export interface StrategicPartner {
  id: string;
  name: string;
  category: string;
  description: string;
  logoUrl?: string;
  initials: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facilities' | 'fleet' | 'operations' | 'team' | 'projects' | 'processing' | 'storage' | 'commodities' | 'shipping' | 'sustainability';
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  dimensions?: string;
}

export interface BlogComment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'Industri' | 'Teknologi' | 'Sustainability' | 'Kasus Nyata' | 'Update Korporat' | 'Ekspor & Pasar' | 'Kualitas & Higienitas' | 'Regulasi & Karantina' | 'Nelayan & Mutu';
  tags: string[];
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  comments: BlogComment[];
  seoKeywords?: string[];
}

export interface OfficeLocation {
  id: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isHQ?: boolean;
  hours: string;
  timeZone: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  inquiryType: 'Permintaan Penawaran (RFQ)' | 'Kemitraan Strategis' | 'Dukungan Logistik' | 'Konsultasi Ekspor-Impor' | 'Lainnya';
  message: string;
  originCountry?: string;
  destinationCountry?: string;
  estimatedWeight?: number;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived';
  replyNotes?: string;
  ipLocation?: string;
  sslEncrypted: boolean;
}

export interface CountryInfo {
  code: string;
  name: string;
  region: string;
  flag: string;
  currency: string;
  customsRisk: 'low' | 'medium' | 'high';
  deliveryBaseFactor: number;
}

export interface CourierOption {
  id: string;
  name: string;
  logo: string;
  serviceTier: 'Express Air' | 'Priority Freight' | 'Standard Parcel' | 'Ocean Cargo';
  transitDaysMin: number;
  transitDaysMax: number;
  baseRatePerKgUSD: number;
  customsHandlingUSD: number;
  reliabilityScore: number;
  trackingFeatures: string[];
  co2OffsetKg: number;
}

export interface ShippingCalculationRequest {
  originCode: string;
  destinationCode: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  itemType: 'document' | 'parcel' | 'fragile' | 'perishable' | 'dangerous_goods' | 'heavy_machinery';
  declaredValueUSD: number;
  includeInsurance: boolean;
  expressClearance: boolean;
}

export interface ShippingCalculationResult {
  chargeableWeightKg: number;
  volumetricWeightKg: number;
  actualWeightKg: number;
  origin: CountryInfo;
  destination: CountryInfo;
  quotes: {
    courierId: string;
    courierName: string;
    serviceTier: string;
    estimatedDeliveryDays: string;
    estimatedDeliveryDate: string;
    basePriceUSD: number;
    fuelSurchargeUSD: number;
    customsDutyEstimatedUSD: number;
    insuranceUSD: number;
    totalUSD: number;
    totalIDR: number;
    carbonNeutral: boolean;
    features: string[];
    bookingReference: string;
  }[];
  calculatedAt: string;
}

export interface AnalyticsSummary {
  activeVisitorsNow: number;
  totalPageViews: number;
  uniqueSessionsToday: number;
  avgSessionDuration: string;
  bounceRatePercent: number;
  realtimeTraffic: { time: string; count: number }[];
  dailyViews: { date: string; views: number; visitors: number; quotes: number }[];
  topCountries: { country: string; flag: string; visitors: number; percentage: number }[];
  topPages: { path: string; title: string; views: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  trafficSources: { source: string; percentage: number; color: string }[];
  recentEvents: { id: string; timestamp: string; event: string; country: string; device: string }[];
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  canonicalUrl: string;
  ogImageUrl: string;
  structuredDataType: 'Organization' | 'LogisticsService' | 'Corporation';
  robotsIndex: boolean;
  robotsFollow: boolean;
  sitemapCount: number;
  sslGrade: 'A+' | 'A';
  // Google Ecosystem & Tracking Integration
  googleSearchConsoleKey?: string; // e.g. "google-site-verification=xxxx"
  googleAnalyticsId?: string; // e.g. "G-XXXXXXXXXX"
  googleTagManagerId?: string; // e.g. "GTM-XXXXXXX"
  googleMerchantCenterId?: string; // e.g. "123456789"
  googleBusinessProfileUrl?: string; // e.g. Google Maps / Business profile link
}

export interface ExportCommodity {
  id: string;
  name: string;
  indonesianName: string;
  category: 
    | 'Ikan Teri & Bilis Kering' 
    | 'Ikan Asin Olahan Tradisional' 
    | 'Cumi & Sotong Kering' 
    | 'Gelembung Ikan / Fish Maw' 
    | 'Teripang & Hasil Laut Eksklusif'
    | 'Hasil Laut & Pangan'
    | string;
  hsCode: string;
  origin: string;
  specification: {
    grade: string;
    moisture?: string;
    packaging: string;
    moq: string;
    shelfLife?: string;
    colorTexture?: string;
  };
  supplyCapacity: string;
  certifications: string[];
  keyMarkets: string[];
  imageUrl: string;
  galleryImages: string[];
  description: string;
  featured?: boolean;
}

export interface ExportWorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  keyAction: string;
  complianceDoc: string;
}

export interface BuyerTestimonial {
  id: string;
  buyerName: string;
  buyerRole: string;
  companyName: string;
  country: string;
  flag: string;
  avatarUrl: string;
  commodityPurchased: string;
  volumeAnnually: string;
  rating: number;
  comment: string;
  verifiedTransaction: boolean;
}


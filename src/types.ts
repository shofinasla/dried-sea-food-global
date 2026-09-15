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
  descriptionEn?: string;
  descriptionAr?: string;
  logoUrl?: string;
  initials: string;
}

export interface AdminStats {
  totalProducts: number;
  activeProducts: number;
  totalArticles: number;
  publishedArticles: number;
  totalInquiries: number;
  newInquiries: number;
  totalGallery: number;
  activeVisitors: number;
}

export type ExportInquiry = ContactInquiry;
export type SeoConfig = SEOSettings;

export interface ServiceItem {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  category: string;
  categoryEn?: string;
  categoryAr?: string;
  icon: string;
  summary: string;
  summaryEn?: string;
  summaryAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  features: string[];
  metrics: { label: string; value: string }[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  category: 'facilities' | 'fleet' | 'operations' | 'team' | 'projects' | 'processing' | 'storage' | 'commodities' | 'shipping' | 'sustainability';
  imageUrl: string;
  location: string;
  locationEn?: string;
  locationAr?: string;
  date: string;
  dateEn?: string;
  dateAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  tags: string[];
  dimensions?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  email?: string;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface AdminAuthSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
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
  titleEn?: string;
  titleAr?: string;
  slug: string;
  excerpt: string;
  excerptEn?: string;
  excerptAr?: string;
  content: string;
  contentEn?: string;
  contentAr?: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    roleEn?: string;
    roleAr?: string;
    avatar: string;
  };
  category: 'Industri' | 'Teknologi' | 'Sustainability' | 'Kasus Nyata' | 'Update Korporat' | 'Ekspor & Pasar' | 'Kualitas & Higienitas' | 'Regulasi & Karantina' | 'Nelayan & Mutu' | string;
  tags: string[];
  readTime: string;
  readTimeEn?: string;
  readTimeAr?: string;
  publishedAt: string;
  publishedAtEn?: string;
  publishedAtAr?: string;
  status?: 'published' | 'draft';
  featured?: boolean;
  comments: BlogComment[];
  seoKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
  contactPerson?: string;
  email: string;
  phone: string;
  companyName: string;
  inquiryType?: 'Permintaan Penawaran (RFQ)' | 'Kemitraan Strategis' | 'Dukungan Logistik' | 'Konsultasi Ekspor-Impor' | 'Lainnya' | string;
  message: string;
  commodity?: string;
  volumeTons?: number;
  shippingTerms?: string;
  notes?: string;
  submittedAt?: string;
  originCountry?: string;
  destinationCountry?: string;
  estimatedWeight?: number;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived' | 'quoted' | 'closed' | 'in_review';
  replyNotes?: string;
  ipLocation?: string;
  sslEncrypted?: boolean;
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
  siteTitle?: string;
  metaDescription: string;
  keywords?: string[];
  focusKeywords: string[];
  canonicalUrl: string;
  ogImageUrl: string;
  author?: string;
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
  nameAr?: string;
  nameZh?: string;
  latinName?: string;
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
  originEn?: string;
  originAr?: string;
  specification?: {
    grade?: string;
    gradeEn?: string;
    gradeAr?: string;
    moisture?: string;
    packaging?: string;
    packagingEn?: string;
    packagingAr?: string;
    moq?: string;
    shelfLife?: string;
    colorTexture?: string;
    colorTextureEn?: string;
    colorTextureAr?: string;
  };
  specifications?: {
    grade?: string;
    moisture?: string;
    packaging?: string;
    shelfLife?: string;
    [key: string]: any;
  };
  supplyCapacity?: string;
  supplyCapacityEn?: string;
  supplyCapacityAr?: string;
  certifications?: string[];
  keyMarkets?: string[];
  imageUrl?: string;
  image?: string;
  galleryImages?: string[];
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  shortDescription?: string;
  slug?: string;
  sku?: string;
  price?: number;
  priceUSDPerKg?: number;
  priceIDRPerKg?: number;
  moqKg?: number;
  comparePrice?: number;
  stock?: number;
  unit?: string;
  brand?: string;
  packaging?: string;
  status?: 'published' | 'draft' | 'archived';
  isPublished?: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExportWorkflowStep {
  stepNumber: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  subtitle: string;
  subtitleEn?: string;
  subtitleAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl: string;
  keyAction: string;
  keyActionEn?: string;
  keyActionAr?: string;
  complianceDoc: string;
  complianceDocEn?: string;
  complianceDocAr?: string;
}

export interface BuyerTestimonial {
  id: string;
  buyerName: string;
  buyerRole: string;
  buyerRoleEn?: string;
  buyerRoleAr?: string;
  companyName: string;
  country: string;
  countryEn?: string;
  countryAr?: string;
  flag: string;
  avatarUrl: string;
  commodityPurchased: string;
  commodityPurchasedEn?: string;
  commodityPurchasedAr?: string;
  volumeAnnually: string;
  volumeAnnuallyEn?: string;
  volumeAnnuallyAr?: string;
  rating: number;
  comment: string;
  commentEn?: string;
  commentAr?: string;
  verifiedTransaction: boolean;
}


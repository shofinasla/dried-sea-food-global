-- ====================================================================
-- DRIED SEAFOOD GLOBAL — D1 INITIAL DATABASE SCHEMA
-- Migration: 0001_initial_schema.sql
-- ====================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  name_zh TEXT,
  latin_name TEXT,
  indonesian_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT,
  category TEXT NOT NULL,
  hs_code TEXT,
  origin TEXT,
  origin_en TEXT,
  origin_ar TEXT,
  specification TEXT, -- JSON string
  supply_capacity TEXT,
  supply_capacity_en TEXT,
  supply_capacity_ar TEXT,
  certifications TEXT, -- JSON string array
  key_markets TEXT, -- JSON string array
  image_url TEXT,
  gallery_images TEXT, -- JSON string array
  description TEXT,
  description_en TEXT,
  description_ar TEXT,
  short_description TEXT,
  price_usd_per_kg REAL,
  price_idr_per_kg REAL,
  moq_kg REAL,
  status TEXT DEFAULT 'published',
  is_published INTEGER DEFAULT 1,
  featured INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 2. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  title_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  excerpt_ar TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  content_ar TEXT,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  author_avatar TEXT,
  category TEXT NOT NULL,
  tags TEXT, -- JSON string array
  read_time TEXT,
  published_at TEXT,
  status TEXT DEFAULT 'published',
  featured INTEGER DEFAULT 0,
  seo_keywords TEXT, -- JSON string array
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- 3. ARTICLE COMMENTS TABLE
CREATE TABLE IF NOT EXISTS article_comments (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_article_id ON article_comments(article_id);

-- 4. INQUIRIES TABLE (Contact / RFQ Submissions)
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  inquiry_type TEXT,
  commodity TEXT,
  destination_country TEXT,
  origin_country TEXT,
  estimated_weight REAL,
  volume_tons REAL,
  shipping_terms TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  reply_notes TEXT,
  ip_location TEXT,
  ssl_encrypted INTEGER DEFAULT 1,
  submitted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- 5. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  title_ar TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  location TEXT,
  location_en TEXT,
  location_ar TEXT,
  date TEXT,
  description TEXT,
  description_en TEXT,
  description_ar TEXT,
  tags TEXT, -- JSON string array
  dimensions TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- 6. SEO SETTINGS TABLE (Singleton row with id='default')
CREATE TABLE IF NOT EXISTS seo_settings (
  id TEXT PRIMARY KEY,
  meta_title TEXT NOT NULL,
  site_title TEXT,
  meta_description TEXT NOT NULL,
  keywords TEXT, -- JSON string array
  focus_keywords TEXT, -- JSON string array
  canonical_url TEXT NOT NULL,
  og_image_url TEXT,
  author TEXT,
  structured_data_type TEXT DEFAULT 'Organization',
  robots_index INTEGER DEFAULT 1,
  robots_follow INTEGER DEFAULT 1,
  sitemap_count INTEGER DEFAULT 32,
  ssl_grade TEXT DEFAULT 'A+',
  google_search_console_key TEXT,
  google_analytics_id TEXT,
  google_tag_manager_id TEXT,
  google_merchant_center_id TEXT,
  google_business_profile_url TEXT,
  updated_at TEXT NOT NULL
);

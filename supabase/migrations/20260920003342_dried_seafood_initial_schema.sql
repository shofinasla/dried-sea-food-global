-- ============================================================
-- Dried Seafood Global
-- Supabase PostgreSQL Initial Schema
-- Migrated from Cloudflare D1
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- PRODUCTS
-- ============================================================

create table if not exists public.products (
  id text primary key,
  name text not null,
  name_ar text,
  name_zh text,
  latin_name text,
  indonesian_name text,
  slug text not null unique,
  sku text,
  category text,
  hs_code text,
  origin text,
  origin_en text,
  origin_ar text,
  specification text,
  supply_capacity text,
  supply_capacity_en text,
  supply_capacity_ar text,
  certifications text,
  key_markets text,
  image_url text,
  gallery_images text,
  description text,
  description_en text,
  description_ar text,
  short_description text,
  price_usd_per_kg numeric,
  price_idr_per_kg numeric,
  moq_kg numeric,
  status text,
  is_published boolean not null default false,
  featured boolean not null default false,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category
  on public.products(category);

create index if not exists idx_products_status
  on public.products(status);

create index if not exists idx_products_slug
  on public.products(slug);

-- ============================================================
-- ARTICLES
-- ============================================================

create table if not exists public.articles (
  id text primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  author text,
  image_url text,
  status text,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_articles_category
  on public.articles(category);

create index if not exists idx_articles_status
  on public.articles(status);

create index if not exists idx_articles_slug
  on public.articles(slug);

-- ============================================================
-- ARTICLE COMMENTS
-- ============================================================

create table if not exists public.article_comments (
  id text primary key,
  article_id text not null,
  name text,
  email text,
  comment text,
  status text,
  created_at timestamptz not null default now(),

  constraint article_comments_article_id_fkey
    foreign key (article_id)
    references public.articles(id)
    on delete cascade
);

create index if not exists idx_article_comments_article_id
  on public.article_comments(article_id);

-- ============================================================
-- INQUIRIES
-- ============================================================

create table if not exists public.inquiries (
  id text primary key,
  name text,
  email text,
  company text,
  country text,
  phone text,
  whatsapp text,
  product text,
  quantity text,
  message text,
  source text,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_inquiries_status
  on public.inquiries(status);

create index if not exists idx_inquiries_created_at
  on public.inquiries(created_at desc);

-- ============================================================
-- GALLERY
-- ============================================================

create table if not exists public.gallery (
  id text primary key,
  title text,
  description text,
  image_url text,
  category text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_gallery_category
  on public.gallery(category);

-- ============================================================
-- SEO SETTINGS
-- ============================================================

create table if not exists public.seo_settings (
  id text primary key,
  site_name text,
  site_url text,
  meta_title text,
  meta_description text,
  keywords text,
  og_image_url text,
  twitter_card text,
  robots_txt text,
  google_verification text,
  bing_verification text,
  default_locale text,
  supported_locales text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at
  on public.products;

create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists articles_set_updated_at
  on public.articles;

create trigger articles_set_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

drop trigger if exists inquiries_set_updated_at
  on public.inquiries;

create trigger inquiries_set_updated_at
before update on public.inquiries
for each row
execute function public.set_updated_at();

drop trigger if exists gallery_set_updated_at
  on public.gallery;

create trigger gallery_set_updated_at
before update on public.gallery
for each row
execute function public.set_updated_at();

drop trigger if exists seo_settings_set_updated_at
  on public.seo_settings;

create trigger seo_settings_set_updated_at
before update on public.seo_settings
for each row
execute function public.set_updated_at();
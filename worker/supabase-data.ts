import { ExportCommodity, BlogPost, GalleryItem, ContactInquiry, SEOSettings } from '../src/types';
import {
  workerCommodities,
  workerBlogPosts,
  workerGalleryItems,
  workerInquiries,
  workerSeoSettings
} from './data';

export type CommoditySpecification = NonNullable<ExportCommodity['specification']>;

// Helper to safely parse JSON or return default
function safeJsonParse<T>(jsonStr: any, fallback: T): T {
  if (!jsonStr) return fallback;
  if (typeof jsonStr !== 'string') return jsonStr as T;
  try {
    return JSON.parse(jsonStr) as T;
  } catch {
    return fallback;
  }
}

// -------------------------------------------------------------------
// PRODUCTS / COMMODITIES REPOSITORY
// -------------------------------------------------------------------
export async function getProducts(
  db: any,
  options: {
    category?: string | null;
    search?: string | null;
    status?: string | null;
    includeDrafts?: boolean;
  } = {}
): Promise<ExportCommodity[]> {
  if (!db) {
    let list = [...workerCommodities];
    if (!options.includeDrafts) {
      list = list.filter(c => c.status !== 'draft' && c.status !== 'archived');
    } else if (options.status && options.status !== 'all') {
      list = list.filter(c => (c.status || 'published') === options.status);
    }
    if (options.category && options.category !== 'all') {
      list = list.filter(c => c.category === options.category);
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.indonesianName.toLowerCase().includes(q) ||
        c.origin.toLowerCase().includes(q)
      );
    }
    return list;
  }

  try {
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (!options.includeDrafts) {
      sql += " AND status NOT IN ('draft', 'archived')";
    } else if (options.status && options.status !== 'all') {
      sql += ' AND status = ?';
      params.push(options.status);
    }

    if (options.category && options.category !== 'all') {
      sql += ' AND category = ?';
      params.push(options.category);
    }

    if (options.search) {
      sql += ' AND (name LIKE ? OR indonesian_name LIKE ? OR origin LIKE ?)';
      const term = `%${options.search}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY created_at DESC';

    const stmt = db.prepare(sql);
    const { results } = await stmt.bind(...params).all();

    if (!results || results.length === 0) {
      // If table is empty, return fallback data
      return workerCommodities;
    }

    return results.map(rowToProduct);
  } catch (err) {
    console.error('D1 getProducts error:', err);
    return workerCommodities;
  }
}

export async function getProductByIdOrSlug(db: any, idOrSlug: string): Promise<ExportCommodity | null> {
  if (!db) {
    return workerCommodities.find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
  }

  try {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ? OR slug = ? LIMIT 1');
    const row = await stmt.bind(idOrSlug, idOrSlug).first();
    if (!row) {
      return workerCommodities.find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
    }
    return rowToProduct(row);
  } catch (err) {
    console.error('D1 getProductByIdOrSlug error:', err);
    return workerCommodities.find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
  }
}

export async function createProduct(db: any, product: ExportCommodity): Promise<ExportCommodity> {
  if (!db) {
    workerCommodities.unshift(product);
    return product;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      INSERT INTO products (
        id, name, name_ar, name_zh, latin_name, indonesian_name, slug, sku,
        category, hs_code, origin, origin_en, origin_ar, specification,
        supply_capacity, supply_capacity_en, supply_capacity_ar, certifications,
        key_markets, image_url, gallery_images, description, description_en,
        description_ar, short_description, price_usd_per_kg, price_idr_per_kg,
        moq_kg, status, is_published, featured, meta_title, meta_description,
        canonical_url, og_image_url, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `;

    const spec = JSON.stringify(product.specification || {});
    const certs = JSON.stringify(product.certifications || []);
    const markets = JSON.stringify(product.keyMarkets || []);
    const gallery = JSON.stringify(product.galleryImages || []);

    await db.prepare(sql).bind(
      product.id,
      product.name,
      product.nameAr || null,
      product.nameZh || null,
      product.latinName || null,
      product.indonesianName,
      product.slug,
      product.sku || null,
      product.category,
      product.hsCode || null,
      product.origin || null,
      product.originEn || null,
      product.originAr || null,
      spec,
      product.supplyCapacity || null,
      product.supplyCapacityEn || null,
      product.supplyCapacityAr || null,
      certs,
      markets,
      product.imageUrl || null,
      gallery,
      product.description || null,
      product.descriptionEn || null,
      product.descriptionAr || null,
      product.shortDescription || null,
      product.priceUSDPerKg || null,
      product.priceIDRPerKg || null,
      product.moqKg || null,
      product.status || 'published',
      product.status === 'published' ? 1 : 0,
      product.featured ? 1 : 0,
      product.metaTitle || null,
      product.metaDescription || null,
      product.canonicalUrl || null,
      product.ogImageUrl || null,
      now,
      now
    ).run();

    // Also update in-memory cache for fast lookups
    const existingIndex = workerCommodities.findIndex(c => c.id === product.id);
    if (existingIndex >= 0) {
      workerCommodities[existingIndex] = product;
    } else {
      workerCommodities.unshift(product);
    }

    return product;
  } catch (err) {
    console.error('D1 createProduct error:', err);
    workerCommodities.unshift(product);
    return product;
  }
}

export async function updateProduct(db: any, id: string, product: Partial<ExportCommodity>): Promise<ExportCommodity | null> {
  const existing = await getProductByIdOrSlug(db, id);
  if (!existing) return null;

  const merged: ExportCommodity = {
    ...existing,
    ...product,
    specification: {
      ...existing.specification,
      ...(product.specification || {})
    }
  };

  if (!db) {
    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) workerCommodities[idx] = merged;
    return merged;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      UPDATE products SET
        name = ?, name_ar = ?, name_zh = ?, latin_name = ?, indonesian_name = ?,
        slug = ?, sku = ?, category = ?, hs_code = ?, origin = ?,
        origin_en = ?, origin_ar = ?, specification = ?, supply_capacity = ?,
        supply_capacity_en = ?, supply_capacity_ar = ?, certifications = ?,
        key_markets = ?, image_url = ?, gallery_images = ?, description = ?,
        description_en = ?, description_ar = ?, short_description = ?,
        price_usd_per_kg = ?, price_idr_per_kg = ?, moq_kg = ?, status = ?,
        is_published = ?, featured = ?, meta_title = ?, meta_description = ?,
        canonical_url = ?, og_image_url = ?, updated_at = ?
      WHERE id = ?
    `;

    const spec = JSON.stringify(merged.specification || {});
    const certs = JSON.stringify(merged.certifications || []);
    const markets = JSON.stringify(merged.keyMarkets || []);
    const gallery = JSON.stringify(merged.galleryImages || []);

    await db.prepare(sql).bind(
      merged.name,
      merged.nameAr || null,
      merged.nameZh || null,
      merged.latinName || null,
      merged.indonesianName,
      merged.slug,
      merged.sku || null,
      merged.category,
      merged.hsCode || null,
      merged.origin || null,
      merged.originEn || null,
      merged.originAr || null,
      spec,
      merged.supplyCapacity || null,
      merged.supplyCapacityEn || null,
      merged.supplyCapacityAr || null,
      certs,
      markets,
      merged.imageUrl || null,
      gallery,
      merged.description || null,
      merged.descriptionEn || null,
      merged.descriptionAr || null,
      merged.shortDescription || null,
      merged.priceUSDPerKg || null,
      merged.priceIDRPerKg || null,
      merged.moqKg || null,
      merged.status || 'published',
      merged.status === 'published' ? 1 : 0,
      merged.featured ? 1 : 0,
      merged.metaTitle || null,
      merged.metaDescription || null,
      merged.canonicalUrl || null,
      merged.ogImageUrl || null,
      now,
      id
    ).run();

    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) workerCommodities[idx] = merged;

    return merged;
  } catch (err) {
    console.error('D1 updateProduct error:', err);
    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) workerCommodities[idx] = merged;
    return merged;
  }
}

export async function deleteProduct(db: any, id: string): Promise<boolean> {
  if (!db) {
    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) {
      workerCommodities.splice(idx, 1);
      return true;
    }
    return false;
  }

  try {
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) workerCommodities.splice(idx, 1);
    return true;
  } catch (err) {
    console.error('D1 deleteProduct error:', err);
    const idx = workerCommodities.findIndex(c => c.id === id);
    if (idx >= 0) {
      workerCommodities.splice(idx, 1);
      return true;
    }
    return false;
  }
}

function rowToProduct(row: any): ExportCommodity {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar || undefined,
    nameZh: row.name_zh || undefined,
    latinName: row.latin_name || undefined,
    indonesianName: row.indonesian_name,
    slug: row.slug,
    sku: row.sku || undefined,
    category: row.category,
    hsCode: row.hs_code || undefined,
    origin: row.origin || 'Indonesia',
    originEn: row.origin_en || undefined,
    originAr: row.origin_ar || undefined,
    specification: safeJsonParse<CommoditySpecification>(row.specification, {
      grade: 'Grade AAA',
      moisture: '18% - 22%',
      packaging: 'Master Carton Vacuum Pack',
      moq: '1 Ton',
      shelfLife: '12 Bulan',
      colorTexture: 'Alami Kering'
    }),
    supplyCapacity: row.supply_capacity || undefined,
    supplyCapacityEn: row.supply_capacity_en || undefined,
    supplyCapacityAr: row.supply_capacity_ar || undefined,
    certifications: safeJsonParse<string[]>(row.certifications, ['HACCP', 'Health Certificate KKP', 'Halal Indonesia']),
    keyMarkets: safeJsonParse<string[]>(row.key_markets, ['Singapura', 'Malaysia', 'Taiwan', 'Arab Saudi', 'Amerika Serikat']),
    imageUrl: row.image_url || '/images/products/exp-teri-nasi-1.png',
    galleryImages: safeJsonParse<string[]>(row.gallery_images, []),
    description: row.description || '',
    descriptionEn: row.description_en || undefined,
    descriptionAr: row.description_ar || undefined,
    shortDescription: row.short_description || undefined,
    priceUSDPerKg: row.price_usd_per_kg ? Number(row.price_usd_per_kg) : undefined,
    priceIDRPerKg: row.price_idr_per_kg ? Number(row.price_idr_per_kg) : undefined,
    moqKg: row.moq_kg ? Number(row.moq_kg) : undefined,
    status: row.status || 'published',
    featured: Boolean(row.featured),
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined,
    canonicalUrl: row.canonical_url || undefined,
    ogImageUrl: row.og_image_url || undefined
  };
}

// -------------------------------------------------------------------
// BLOG ARTICLES REPOSITORY
// -------------------------------------------------------------------
export async function getArticles(
  db: any,
  options: {
    category?: string | null;
    search?: string | null;
    status?: string | null;
    includeDrafts?: boolean;
  } = {}
): Promise<BlogPost[]> {
  if (!db) {
    let list = [...workerBlogPosts];
    if (!options.includeDrafts) {
      list = list.filter(p => p.status === 'published' || !p.status);
    } else if (options.status && options.status !== 'all') {
      list = list.filter(p => (p.status || 'published') === options.status);
    }
    if (options.category && options.category !== 'all') {
      list = list.filter(p => p.category === options.category);
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return list;
  }

  try {
    let sql = 'SELECT * FROM articles WHERE 1=1';
    const params: any[] = [];

    if (!options.includeDrafts) {
      sql += " AND status = 'published'";
    } else if (options.status && options.status !== 'all') {
      sql += ' AND status = ?';
      params.push(options.status);
    }

    if (options.category && options.category !== 'all') {
      sql += ' AND category = ?';
      params.push(options.category);
    }

    if (options.search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const term = `%${options.search}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY created_at DESC';

    const { results } = await db.prepare(sql).bind(...params).all();
    if (!results || results.length === 0) {
      return workerBlogPosts;
    }

    // Fetch comments for all articles
    const articles = results.map(rowToArticle);
    for (const article of articles) {
      const commentsStmt = db.prepare('SELECT * FROM article_comments WHERE article_id = ? ORDER BY created_at ASC');
      const { results: commentRows } = await commentsStmt.bind(article.id).all();
      article.comments = (commentRows || []).map((c: any) => ({
        id: c.id,
        author: c.author,
        email: c.email || '',
        content: c.content,
        createdAt: c.created_at
      }));
    }

    return articles;
  } catch (err) {
    console.error('D1 getArticles error:', err);
    return workerBlogPosts;
  }
}

export async function getArticleByIdOrSlug(db: any, idOrSlug: string): Promise<BlogPost | null> {
  if (!db) {
    return workerBlogPosts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }

  try {
    const row = await db.prepare('SELECT * FROM articles WHERE id = ? OR slug = ? LIMIT 1').bind(idOrSlug, idOrSlug).first();
    if (!row) {
      return workerBlogPosts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    }
    const article = rowToArticle(row);

    // Fetch comments
    const { results: commentRows } = await db.prepare('SELECT * FROM article_comments WHERE article_id = ? ORDER BY created_at ASC').bind(article.id).all();
    article.comments = (commentRows || []).map((c: any) => ({
      id: c.id,
      author: c.author,
      email: c.email || '',
      content: c.content,
      createdAt: c.created_at
    }));

    return article;
  } catch (err) {
    console.error('D1 getArticleByIdOrSlug error:', err);
    return workerBlogPosts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }
}

export async function createArticle(db: any, post: BlogPost): Promise<BlogPost> {
  if (!db) {
    workerBlogPosts.unshift(post);
    return post;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      INSERT INTO articles (
        id, title, title_en, title_ar, slug, excerpt, excerpt_en, excerpt_ar,
        content, content_en, content_ar, cover_image, author_name, author_role,
        author_avatar, category, tags, read_time, published_at, status, featured,
        seo_keywords, meta_title, meta_description, canonical_url, og_image_url,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `;

    const tagsJson = JSON.stringify(post.tags || []);
    const seoKeywordsJson = JSON.stringify(post.seoKeywords || []);

    await db.prepare(sql).bind(
      post.id,
      post.title,
      post.titleEn || null,
      post.titleAr || null,
      post.slug,
      post.excerpt,
      post.excerptEn || null,
      post.excerptAr || null,
      post.content,
      post.contentEn || null,
      post.contentAr || null,
      post.coverImage,
      post.author.name,
      post.author.role,
      post.author.avatar || null,
      post.category,
      tagsJson,
      post.readTime,
      post.publishedAt,
      post.status || 'published',
      post.featured ? 1 : 0,
      seoKeywordsJson,
      post.metaTitle || null,
      post.metaDescription || null,
      post.canonicalUrl || null,
      post.ogImageUrl || null,
      now,
      now
    ).run();

    const existingIndex = workerBlogPosts.findIndex(p => p.id === post.id);
    if (existingIndex >= 0) {
      workerBlogPosts[existingIndex] = post;
    } else {
      workerBlogPosts.unshift(post);
    }

    return post;
  } catch (err) {
    console.error('D1 createArticle error:', err);
    workerBlogPosts.unshift(post);
    return post;
  }
}

export async function updateArticle(db: any, id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  const existing = await getArticleByIdOrSlug(db, id);
  if (!existing) return null;

  const merged: BlogPost = {
    ...existing,
    ...post,
    author: {
      ...existing.author,
      ...(post.author || {})
    }
  };

  if (!db) {
    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) workerBlogPosts[idx] = merged;
    return merged;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      UPDATE articles SET
        title = ?, title_en = ?, title_ar = ?, slug = ?, excerpt = ?,
        excerpt_en = ?, excerpt_ar = ?, content = ?, content_en = ?, content_ar = ?,
        cover_image = ?, author_name = ?, author_role = ?, author_avatar = ?,
        category = ?, tags = ?, read_time = ?, published_at = ?, status = ?,
        featured = ?, seo_keywords = ?, meta_title = ?, meta_description = ?,
        canonical_url = ?, og_image_url = ?, updated_at = ?
      WHERE id = ?
    `;

    const tagsJson = JSON.stringify(merged.tags || []);
    const seoKeywordsJson = JSON.stringify(merged.seoKeywords || []);

    await db.prepare(sql).bind(
      merged.title,
      merged.titleEn || null,
      merged.titleAr || null,
      merged.slug,
      merged.excerpt,
      merged.excerptEn || null,
      merged.excerptAr || null,
      merged.content,
      merged.contentEn || null,
      merged.contentAr || null,
      merged.coverImage,
      merged.author.name,
      merged.author.role,
      merged.author.avatar || null,
      merged.category,
      tagsJson,
      merged.readTime,
      merged.publishedAt,
      merged.status || 'published',
      merged.featured ? 1 : 0,
      seoKeywordsJson,
      merged.metaTitle || null,
      merged.metaDescription || null,
      merged.canonicalUrl || null,
      merged.ogImageUrl || null,
      now,
      id
    ).run();

    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) workerBlogPosts[idx] = merged;

    return merged;
  } catch (err) {
    console.error('D1 updateArticle error:', err);
    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) workerBlogPosts[idx] = merged;
    return merged;
  }
}

export async function deleteArticle(db: any, id: string): Promise<boolean> {
  if (!db) {
    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) {
      workerBlogPosts.splice(idx, 1);
      return true;
    }
    return false;
  }

  try {
    await db.prepare('DELETE FROM article_comments WHERE article_id = ?').bind(id).run();
    await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) workerBlogPosts.splice(idx, 1);
    return true;
  } catch (err) {
    console.error('D1 deleteArticle error:', err);
    const idx = workerBlogPosts.findIndex(p => p.id === id);
    if (idx >= 0) {
      workerBlogPosts.splice(idx, 1);
      return true;
    }
    return false;
  }
}

export async function addArticleComment(
  db: any,
  articleId: string,
  comment: { id: string; author: string; email: string; content: string; createdAt: string }
): Promise<boolean> {
  if (!db) {
    const post = workerBlogPosts.find(p => p.id === articleId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push(comment);
      return true;
    }
    return false;
  }

  try {
    const sql = `
      INSERT INTO article_comments (id, article_id, author, email, content, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.prepare(sql).bind(
      comment.id,
      articleId,
      comment.author,
      comment.email || null,
      comment.content,
      comment.createdAt
    ).run();

    const post = workerBlogPosts.find(p => p.id === articleId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push(comment);
    }
    return true;
  } catch (err) {
    console.error('D1 addArticleComment error:', err);
    return false;
  }
}

function rowToArticle(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    titleEn: row.title_en || undefined,
    titleAr: row.title_ar || undefined,
    slug: row.slug,
    excerpt: row.excerpt || '',
    excerptEn: row.excerpt_en || undefined,
    excerptAr: row.excerpt_ar || undefined,
    content: row.content,
    contentEn: row.content_en || undefined,
    contentAr: row.content_ar || undefined,
    coverImage: row.cover_image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: row.author_name || 'Tim Redaksi Dried Seafood Global',
      role: row.author_role || 'Fisheries Trade Analyst',
      avatar: row.author_avatar || undefined
    },
    category: row.category,
    tags: safeJsonParse<string[]>(row.tags, ['Dried Seafood', 'Ekspor Ikan Asin']),
    readTime: row.read_time || '5 menit baca',
    publishedAt: row.published_at || '14 Maret 2026',
    status: row.status || 'published',
    featured: Boolean(row.featured),
    seoKeywords: safeJsonParse<string[]>(row.seo_keywords, []),
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined,
    canonicalUrl: row.canonical_url || undefined,
    ogImageUrl: row.og_image_url || undefined,
    comments: []
  };
}

// -------------------------------------------------------------------
// INQUIRIES REPOSITORY
// -------------------------------------------------------------------
export async function getInquiries(db: any): Promise<ContactInquiry[]> {
  if (!db) return workerInquiries;

  try {
    const { results } = await db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
    if (!results || results.length === 0) return workerInquiries;
    return results.map(rowToInquiry);
  } catch (err) {
    console.error('D1 getInquiries error:', err);
    return workerInquiries;
  }
}

export async function createInquiry(db: any, inquiry: ContactInquiry): Promise<ContactInquiry> {
  if (!db) {
    workerInquiries.unshift(inquiry);
    return inquiry;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      INSERT INTO inquiries (
        id, name, contact_person, email, phone, company_name, inquiry_type,
        commodity, destination_country, origin_country, estimated_weight,
        volume_tons, shipping_terms, message, status, reply_notes,
        ip_location, ssl_encrypted, submitted_at, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      )
    `;

    await db.prepare(sql).bind(
      inquiry.id,
      inquiry.name,
      inquiry.contactPerson || null,
      inquiry.email,
      inquiry.phone || null,
      inquiry.companyName || null,
      inquiry.inquiryType || null,
      inquiry.commodity || null,
      inquiry.destinationCountry || null,
      inquiry.originCountry || null,
      inquiry.estimatedWeight || null,
      inquiry.volumeTons || null,
      inquiry.shippingTerms || null,
      inquiry.message,
      inquiry.status || 'new',
      inquiry.replyNotes || null,
      inquiry.ipLocation || null,
      inquiry.sslEncrypted ? 1 : 0,
      inquiry.submittedAt || now,
      now,
      now
    ).run();

    workerInquiries.unshift(inquiry);
    return inquiry;
  } catch (err) {
    console.error('D1 createInquiry error:', err);
    workerInquiries.unshift(inquiry);
    return inquiry;
  }
}

export async function updateInquiryStatus(
  db: any,
  id: string,
  update: { status?: ContactInquiry['status'] | string; replyNotes?: string }
): Promise<ContactInquiry | null> {
  const existing = workerInquiries.find(i => i.id === id);

  if (!db) {
    if (!existing) return null;
    if (update.status) existing.status = update.status as ContactInquiry['status'];
    if (update.replyNotes !== undefined) existing.replyNotes = update.replyNotes;
    return existing;
  }

  try {
    const now = new Date().toISOString();
    let sql = 'UPDATE inquiries SET updated_at = ?';
    const params: any[] = [now];

    if (update.status) {
      sql += ', status = ?';
      params.push(update.status);
    }
    if (update.replyNotes !== undefined) {
      sql += ', reply_notes = ?';
      params.push(update.replyNotes);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    await db.prepare(sql).bind(...params).run();

    if (existing) {
      if (update.status) existing.status = update.status as ContactInquiry['status'];
      if (update.replyNotes !== undefined) existing.replyNotes = update.replyNotes;
      return existing;
    }
    return null;
  } catch (err) {
    console.error('D1 updateInquiryStatus error:', err);
    return existing || null;
  }
}

export async function deleteInquiry(db: any, id: string): Promise<boolean> {
  if (!db) {
    const idx = workerInquiries.findIndex(i => i.id === id);
    if (idx >= 0) {
      workerInquiries.splice(idx, 1);
      return true;
    }
    return false;
  }

  try {
    await db.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run();
    const idx = workerInquiries.findIndex(i => i.id === id);
    if (idx >= 0) workerInquiries.splice(idx, 1);
    return true;
  } catch (err) {
    console.error('D1 deleteInquiry error:', err);
    const idx = workerInquiries.findIndex(i => i.id === id);
    if (idx >= 0) {
      workerInquiries.splice(idx, 1);
      return true;
    }
    return false;
  }
}

function rowToInquiry(row: any): ContactInquiry {
  return {
    id: row.id,
    name: row.name,
    contactPerson: row.contact_person || undefined,
    email: row.email,
    phone: row.phone || undefined,
    companyName: row.company_name || undefined,
    inquiryType: row.inquiry_type || undefined,
    commodity: row.commodity || undefined,
    destinationCountry: row.destination_country || undefined,
    originCountry: row.origin_country || undefined,
    estimatedWeight: row.estimated_weight ? Number(row.estimated_weight) : undefined,
    volumeTons: row.volume_tons ? Number(row.volume_tons) : undefined,
    shippingTerms: row.shipping_terms || undefined,
    message: row.message,
    status: (row.status as ContactInquiry['status']) || 'new',
    replyNotes: row.reply_notes || undefined,
    ipLocation: row.ip_location || undefined,
    sslEncrypted: Boolean(row.ssl_encrypted),
    submittedAt: row.submitted_at || row.created_at,
    createdAt: row.created_at
  };
}

// -------------------------------------------------------------------
// GALLERY REPOSITORY
// -------------------------------------------------------------------
export async function getGalleryItems(db: any): Promise<GalleryItem[]> {
  if (!db) return workerGalleryItems;

  try {
    const { results } = await db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
    if (!results || results.length === 0) return workerGalleryItems;
    return results.map(rowToGalleryItem);
  } catch (err) {
    console.error('D1 getGalleryItems error:', err);
    return workerGalleryItems;
  }
}

export async function createGalleryItem(db: any, item: GalleryItem): Promise<GalleryItem> {
  if (!db) {
    workerGalleryItems.unshift(item);
    return item;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      INSERT INTO gallery (
        id, title, title_en, title_ar, category, image_url,
        location, location_en, location_ar, date, description,
        description_en, description_ar, tags, dimensions, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `;

    const tagsJson = JSON.stringify(item.tags || []);

    await db.prepare(sql).bind(
      item.id,
      item.title,
      item.titleEn || null,
      item.titleAr || null,
      item.category,
      item.imageUrl,
      item.location || null,
      item.locationEn || null,
      item.locationAr || null,
      item.date || null,
      item.description || null,
      item.descriptionEn || null,
      item.descriptionAr || null,
      tagsJson,
      item.dimensions || null,
      now,
      now
    ).run();

    workerGalleryItems.unshift(item);
    return item;
  } catch (err) {
    console.error('D1 createGalleryItem error:', err);
    workerGalleryItems.unshift(item);
    return item;
  }
}

export async function updateGalleryItem(db: any, id: string, item: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const existing = workerGalleryItems.find(g => g.id === id);
  if (!existing) return null;

  const merged: GalleryItem = { ...existing, ...item };

  if (!db) {
    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) workerGalleryItems[idx] = merged;
    return merged;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      UPDATE gallery SET
        title = ?, title_en = ?, title_ar = ?, category = ?, image_url = ?,
        location = ?, location_en = ?, location_ar = ?, date = ?, description = ?,
        description_en = ?, description_ar = ?, tags = ?, dimensions = ?, updated_at = ?
      WHERE id = ?
    `;

    const tagsJson = JSON.stringify(merged.tags || []);

    await db.prepare(sql).bind(
      merged.title,
      merged.titleEn || null,
      merged.titleAr || null,
      merged.category,
      merged.imageUrl,
      merged.location || null,
      merged.locationEn || null,
      merged.locationAr || null,
      merged.date || null,
      merged.description || null,
      merged.descriptionEn || null,
      merged.descriptionAr || null,
      tagsJson,
      merged.dimensions || null,
      now,
      id
    ).run();

    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) workerGalleryItems[idx] = merged;

    return merged;
  } catch (err) {
    console.error('D1 updateGalleryItem error:', err);
    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) workerGalleryItems[idx] = merged;
    return merged;
  }
}

export async function deleteGalleryItem(db: any, id: string): Promise<boolean> {
  if (!db) {
    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) {
      workerGalleryItems.splice(idx, 1);
      return true;
    }
    return false;
  }

  try {
    await db.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) workerGalleryItems.splice(idx, 1);
    return true;
  } catch (err) {
    console.error('D1 deleteGalleryItem error:', err);
    const idx = workerGalleryItems.findIndex(g => g.id === id);
    if (idx >= 0) {
      workerGalleryItems.splice(idx, 1);
      return true;
    }
    return false;
  }
}

function rowToGalleryItem(row: any): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    titleEn: row.title_en || undefined,
    titleAr: row.title_ar || undefined,
    category: row.category,
    imageUrl: row.image_url,
    location: row.location || undefined,
    locationEn: row.location_en || undefined,
    locationAr: row.location_ar || undefined,
    date: row.date || undefined,
    description: row.description || undefined,
    descriptionEn: row.description_en || undefined,
    descriptionAr: row.description_ar || undefined,
    tags: safeJsonParse<string[]>(row.tags, []),
    dimensions: row.dimensions || undefined
  };
}

// -------------------------------------------------------------------
// SEO SETTINGS REPOSITORY
// -------------------------------------------------------------------
export async function getSeoSettings(db: any): Promise<SEOSettings> {
  if (!db) return workerSeoSettings;

  try {
    const row = await db.prepare('SELECT * FROM seo_settings WHERE id = ? LIMIT 1').bind('default').first();
    if (!row) return workerSeoSettings;
    return rowToSeoSettings(row);
  } catch (err) {
    console.error('D1 getSeoSettings error:', err);
    return workerSeoSettings;
  }
}

export async function saveSeoSettings(db: any, settings: Partial<SEOSettings>): Promise<SEOSettings> {
  const merged: SEOSettings = { ...workerSeoSettings, ...settings };

  if (!db) {
    Object.assign(workerSeoSettings, merged);
    return workerSeoSettings;
  }

  try {
    const now = new Date().toISOString();
    const sql = `
      INSERT INTO seo_settings (
        id, meta_title, site_title, meta_description, keywords, focus_keywords,
        canonical_url, og_image_url, author, structured_data_type, robots_index,
        robots_follow, sitemap_count, ssl_grade, google_search_console_key,
        google_analytics_id, google_tag_manager_id, google_merchant_center_id,
        google_business_profile_url, updated_at
      ) VALUES (
        'default', ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        meta_title = excluded.meta_title,
        site_title = excluded.site_title,
        meta_description = excluded.meta_description,
        keywords = excluded.keywords,
        focus_keywords = excluded.focus_keywords,
        canonical_url = excluded.canonical_url,
        og_image_url = excluded.og_image_url,
        author = excluded.author,
        structured_data_type = excluded.structured_data_type,
        robots_index = excluded.robots_index,
        robots_follow = excluded.robots_follow,
        sitemap_count = excluded.sitemap_count,
        ssl_grade = excluded.ssl_grade,
        google_search_console_key = excluded.google_search_console_key,
        google_analytics_id = excluded.google_analytics_id,
        google_tag_manager_id = excluded.google_tag_manager_id,
        google_merchant_center_id = excluded.google_merchant_center_id,
        google_business_profile_url = excluded.google_business_profile_url,
        updated_at = excluded.updated_at
    `;

    const keywordsJson = JSON.stringify(merged.keywords || []);
    const focusKeywordsJson = JSON.stringify(merged.focusKeywords || []);

    await db.prepare(sql).bind(
      merged.metaTitle,
      merged.siteTitle || null,
      merged.metaDescription,
      keywordsJson,
      focusKeywordsJson,
      merged.canonicalUrl,
      merged.ogImageUrl || null,
      merged.author || null,
      merged.structuredDataType || 'Organization',
      merged.robotsIndex ? 1 : 0,
      merged.robotsFollow ? 1 : 0,
      merged.sitemapCount || 32,
      merged.sslGrade || 'A+',
      merged.googleSearchConsoleKey || null,
      merged.googleAnalyticsId || null,
      merged.googleTagManagerId || null,
      merged.googleMerchantCenterId || null,
      merged.googleBusinessProfileUrl || null,
      now
    ).run();

    Object.assign(workerSeoSettings, merged);
    return merged;
  } catch (err) {
    console.error('D1 saveSeoSettings error:', err);
    Object.assign(workerSeoSettings, merged);
    return merged;
  }
}

function rowToSeoSettings(row: any): SEOSettings {
  return {
    metaTitle: row.meta_title,
    siteTitle: row.site_title || undefined,
    metaDescription: row.meta_description,
    keywords: safeJsonParse<string[]>(row.keywords, []),
    focusKeywords: safeJsonParse<string[]>(row.focus_keywords, []),
    canonicalUrl: row.canonical_url,
    ogImageUrl: row.og_image_url || undefined,
    author: row.author || undefined,
    structuredDataType: row.structured_data_type || 'Organization',
    robotsIndex: Boolean(row.robots_index),
    robotsFollow: Boolean(row.robots_follow),
    sitemapCount: row.sitemap_count || 32,
    sslGrade: row.ssl_grade || 'A+',
    googleSearchConsoleKey: row.google_search_console_key || undefined,
    googleAnalyticsId: row.google_analytics_id || undefined,
    googleTagManagerId: row.google_tag_manager_id || undefined,
    googleMerchantCenterId: row.google_merchant_center_id || undefined,
    googleBusinessProfileUrl: row.google_business_profile_url || undefined
  };
}

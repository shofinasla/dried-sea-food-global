# SEO ROUTE MAP & REDIRECT REGISTRY
**Project:** Dried Seafood Global (PT Samdura Bara Persada)  
**Primary Host:** `https://www.driedseafoodglobal.com`  
**Standard:** 301 Permanent Redirects for legacy/alias routes, self-referential canonicals for all indexable endpoints.

---

## 1. Route Inventory & Mapping Table

| Old URL / Alias | Canonical Destination URL | Status Code | Indexable | Purpose / Content |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `https://www.driedseafoodglobal.com/` | 200 OK | Yes | B2B Global Homepage (English / Global) |
| `/id` | `https://www.driedseafoodglobal.com/id/` | 301 Moved Permanently | Yes (target) | Trailing slash normalization |
| `/id/` | `https://www.driedseafoodglobal.com/id/` | 200 OK | Yes | Indonesian Localized Homepage |
| `/ar` | `https://www.driedseafoodglobal.com/ar/` | 301 Moved Permanently | Yes (target) | Trailing slash normalization |
| `/ar/` | `https://www.driedseafoodglobal.com/ar/` | 200 OK | Yes | Arabic (GCC / Middle East) Homepage |
| `/company` | `https://www.driedseafoodglobal.com/about` | 200 OK (Preserved) / 301 Alias | Yes | PT Samdura Bara Persada Corporate Profile |
| `/about` | `https://www.driedseafoodglobal.com/about` | 200 OK | Yes | About Company, Mission, Vision & Team |
| `/partners` | `https://www.driedseafoodglobal.com/partners` | 200 OK | Yes | Strategic Partners (Shrimora, Dapur Ikan) |
| `/products` | `https://www.driedseafoodglobal.com/products` | 200 OK | Yes | Master B2B Product Catalog & Categories |
| `/products/dried-anchovy` | `https://www.driedseafoodglobal.com/products/dried-anchovy` | 200 OK | Yes | B2B Landing: Super White Anchovy (Teri Nasi) |
| `/products/dried-squid` | `https://www.driedseafoodglobal.com/products/dried-squid` | 200 OK | Yes | B2B Landing: Sun-Dried Squid (Cumi Sero) |
| `/products/dried-shrimp` | `https://www.driedseafoodglobal.com/products/dried-shrimp` | 200 OK | Yes | B2B Landing: Super Red Sun-Dried Prawns (Ebi) |
| `/products/dried-fish` | `https://www.driedseafoodglobal.com/products/dried-fish` | 200 OK | Yes | B2B Landing: Salted Dried Fish (Jambal Roti/Tenggiri) |
| `/products/fish-maw` | `https://www.driedseafoodglobal.com/products/fish-maw` | 200 OK | Yes | B2B Landing: Premium Dried Fish Maw (Gelembung Ikan) |
| `/products/sea-cucumber` | `https://www.driedseafoodglobal.com/products/sea-cucumber` | 200 OK | Yes | B2B Landing: Wild Dried Sea Cucumber (Teripang) |
| `/export` | `https://www.driedseafoodglobal.com/export-process` | 301 Moved Permanently | Yes (target) | Export Hub redirection |
| `/export-process` | `https://www.driedseafoodglobal.com/export-process` | 200 OK | Yes | 9-Step B2B Export Workflow & Documentation |
| `/quality` | `https://www.driedseafoodglobal.com/quality` | 200 OK | Yes | Quality Assurance, Solar Dome & Lab Certifications |
| `/facility` | `https://www.driedseafoodglobal.com/facility` | 200 OK | Yes | Muara Baru & Marunda Processing Facility Showcase |
| `/markets` | `https://www.driedseafoodglobal.com/markets` | 200 OK | Yes | Global Export Markets & Destination Ports |
| `/insights` | `https://www.driedseafoodglobal.com/insights` | 200 OK | Yes | B2B Seafood Industry Guides & Articles |
| `/blog` | `https://www.driedseafoodglobal.com/insights` | 301 Moved Permanently | Yes (target) | Legacy blog alias redirection |
| `/insights/:slug` | `https://www.driedseafoodglobal.com/insights/:slug` | 200 OK | Yes | Article Detail Page |
| `/blog/:slug` | `https://www.driedseafoodglobal.com/insights/:slug` | 301 Moved Permanently | Yes (target) | Legacy post URL mapping |
| `/request-quote` | `https://www.driedseafoodglobal.com/request-quote` | 200 OK | Yes | Dedicated RFQ & Quotation Submission Landing Page |
| `/buyer-inquiry` | `https://www.driedseafoodglobal.com/buyer-inquiry` | 200 OK | Yes | Direct Buyer Inquiry & Sample Request Portal |
| `/admin` | `https://www.driedseafoodglobal.com/admin` | 200 OK | No (Disallow) | Secure CMS & RFQ Admin Portal |
| `/admin/*` | `https://www.driedseafoodglobal.com/admin/*` | 200 OK | No (Disallow) | Secure Admin Subpaths (Inquiries, Products, SEO) |

---

## 2. Multilingual Path Structure

Each public canonical route supports localized international paths:
- Global / English: `https://www.driedseafoodglobal.com/<path>` (`hreflang="x-default"`, `hreflang="en"`)
- Indonesian: `https://www.driedseafoodglobal.com/id/<path>` (`hreflang="id"`)
- Arabic: `https://www.driedseafoodglobal.com/ar/<path>` (`hreflang="ar"`)

---

## 3. Redirect Validation Principles
1. **Single-Hop Rule:** All redirects (e.g. `http://` $\rightarrow$ `https://`, non-www $\rightarrow$ www, `/blog` $\rightarrow$ `/insights`) execute in a single 301 hop to prevent redirect chains.
2. **Trailing Slash Consistency:** Language roots require trailing slashes (`/id/`, `/ar/`), whereas clean content slugs omit trailing slashes (`/products/dried-anchovy`).

/**
 * Centralized SEO Configuration & Schema.org Helpers
 * Dried Seafood Global (PT Samdura Bara Persada)
 * Primary Host: https://www.driedseafoodglobal.com
 */

export const SITE_CONFIG = {
  name: 'Dried Seafood Global',
  legalName: 'PT Samdura Bara Persada',
  domain: 'https://www.driedseafoodglobal.com',
  defaultTitle: 'Dried Seafood Supplier & Exporter from Indonesia | Dried Seafood Global',
  defaultDescription: 'Direct Indonesian supplier of Grade AAA dried anchovy (teri nasi), sun-dried squid, dried shrimp, salted catfish, and premium fish maw. HACCP & BKIPM certified.',
  defaultOgImage: 'https://www.driedseafoodglobal.com/images/hero/tempat-penjemuran-ikan.png',
  phone: '+62 889-8558-2838',
  email: 'info@driedseafoodglobal.com',
  salesEmail: 'sales@driedseafoodglobal.com',
  address: {
    street: 'Lapangan, Morodemak, Kec. Bonang',
    city: 'Kabupaten Demak',
    region: 'Jawa Tengah',
    postalCode: '59552',
    country: 'ID'
  }
};

/**
 * Builds absolute canonical URL for any subpath and optional language code
 */
export function buildCanonicalUrl(path: string, langPrefix = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;
  if (langPrefix === '/id' || langPrefix === 'id') {
    return `${SITE_CONFIG.domain}/id${normalizedPath || '/'}`;
  }
  if (langPrefix === '/ar' || langPrefix === 'ar') {
    return `${SITE_CONFIG.domain}/ar${normalizedPath || '/'}`;
  }
  return `${SITE_CONFIG.domain}${normalizedPath || '/'}`;
}

/**
 * Generates Organization Schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'WholesaleStore'],
    '@id': `${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: `${SITE_CONFIG.domain}/`,
    logo: `${SITE_CONFIG.domain}/logo-dsg.png`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.824927,
      longitude: 110.525486
    },
    hasMap: 'https://www.google.com/maps/place/Dried+Seafood+Global+(Shrimora+Java)/@-6.824927,110.525486,16z/data=!4m6!3m5!1s0x2e709779a92604f7:0x70e41312df5e05ff!8m2!3d-6.824927!4d110.525486'
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.domain}${item.url}`
    }))
  };
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  LanguageOption, 
  TRANSLATIONS, 
  TranslationSchema 
} from './translations';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
  dir: 'ltr' | 'rtl';
  currentLanguageOption: LanguageOption;
  availableLanguages: LanguageOption[];
  getLocalizedPath: (targetLang: SupportedLanguage, customPath?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const ALL_LANG_CODES: SupportedLanguage[] = ['id', 'en', 'zh', 'ja', 'ko', 'ar', 'es', 'fr', 'de', 'vi', 'ru'];

/**
 * Extract canonical language from URL pathname
 * Subdirectory architecture: /id/* -> id, /ar/* -> ar, /zh/* -> zh, etc., / -> en
 */
export const getLanguageFromPathname = (pathname: string): SupportedLanguage => {
  const cleanPath = (pathname || '').toLowerCase();
  for (const code of ALL_LANG_CODES) {
    if (code === 'en') continue;
    if (cleanPath === `/${code}` || cleanPath === `/${code}/` || cleanPath.startsWith(`/${code}/`)) {
      return code;
    }
  }
  return 'en'; // Root domain represents English by default
};

/**
 * Generate localized path preserving page subpath
 * e.g. / -> /ar/, /company -> /ar/company, /id/company -> /ar/company
 */
export const buildLocalizedPath = (targetLang: SupportedLanguage, currentPath: string = '/'): string => {
  // Strip any current language prefix (/id, /ar, /zh, /ja, /ko, /es, /fr, /de, /vi, /ru, /en)
  let cleanSubPath = currentPath.replace(/^\/(id|en|zh|ja|ko|ar|es|fr|de|vi|ru)(\/|$)/, '/');
  if (!cleanSubPath || cleanSubPath === '') cleanSubPath = '/';

  if (targetLang === 'en') {
    return cleanSubPath;
  }
  return cleanSubPath === '/' ? `/${targetLang}/` : `/${targetLang}${cleanSubPath.startsWith('/') ? '' : '/'}${cleanSubPath}`;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial language strictly from URL pathname (or legacy ?lang= query migration)
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const pathLang = getLanguageFromPathname(window.location.pathname);
      
      // Check legacy ?lang= query parameter and migrate safely
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get('lang') as SupportedLanguage;
      if (queryLang && ALL_LANG_CODES.includes(queryLang)) {
        urlParams.delete('lang');
        const remainingQuery = urlParams.toString() ? `?${urlParams.toString()}` : '';
        const targetPath = buildLocalizedPath(queryLang, window.location.pathname);
        const newUrl = `${targetPath}${remainingQuery}${window.location.hash || ''}`;
        window.history.replaceState({}, '', newUrl);
        return queryLang;
      }

      // Check stored preference if on root and no path lang
      if (pathLang === 'en' && window.location.pathname === '/') {
        try {
          const stored = localStorage.getItem('dsg_lang') as SupportedLanguage;
          if (stored && ALL_LANG_CODES.includes(stored) && stored !== 'en') {
            return stored;
          }
        } catch (e) {}
      }

      return pathLang;
    }
    return 'en';
  });

  // Helper to get localized path for any target language
  const getLocalizedPath = useCallback((targetLang: SupportedLanguage, customPath?: string) => {
    const basePath = customPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    return buildLocalizedPath(targetLang, basePath);
  }, []);

  // Safe language switch updating browser URL without full reload
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dsg_lang', lang);
      } catch (e) {
        // Ignore local storage errors in private mode
      }

      const targetPath = buildLocalizedPath(lang, window.location.pathname);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('lang');
      const remainingQuery = urlParams.toString() ? `?${urlParams.toString()}` : '';
      const hash = window.location.hash || '';
      const targetUrl = `${targetPath}${remainingQuery}${hash}`;

      window.history.pushState({}, '', targetUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, []);

  // Listen to browser navigation (Back / Forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const detectedLang = getLanguageFromPathname(window.location.pathname);
      setCurrentLangState(detectedLang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentLanguageOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const dir = currentLanguageOption.dir || 'ltr';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Sync DOM attributes, Canonical, Hreflangs, and Open Graph tags
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. HTML attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = dir;

    // 2. Compute canonical URL and reciprocal alternates
    let currentPath = window.location.pathname;
    if (currentLang !== 'en' && currentPath === `/${currentLang}`) {
      currentPath = `/${currentLang}/`;
    }

    const canonicalUrl = `https://www.driedseafoodglobal.com${currentPath}`;
    const canonicalLink = document.querySelector('link#meta-canonical') || document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 3. Dynamic Reciprocal Hreflang Alternates
    let cleanSubPath = window.location.pathname.replace(/^\/(id|en|zh|ja|ko|ar|es|fr|de|vi|ru)(\/|$)/, '/');
    if (!cleanSubPath || cleanSubPath === '') cleanSubPath = '/';

    const updateHreflang = (hreflang: string, href: string) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    updateHreflang('x-default', `https://www.driedseafoodglobal.com${cleanSubPath === '/' ? '/' : cleanSubPath}`);
    ALL_LANG_CODES.forEach(code => {
      const langUrl = code === 'en' 
        ? `https://www.driedseafoodglobal.com${cleanSubPath === '/' ? '/' : cleanSubPath}`
        : `https://www.driedseafoodglobal.com/${code}${cleanSubPath === '/' ? '/' : cleanSubPath}`;
      updateHreflang(code, langUrl);
    });

    // 4. Open Graph & Twitter meta tags
    const ogLocales: Record<SupportedLanguage, string> = {
      en: 'en_US',
      id: 'id_ID',
      zh: 'zh_CN',
      ja: 'ja_JP',
      ko: 'ko_KR',
      ar: 'ar_SA',
      es: 'es_ES',
      fr: 'fr_FR',
      de: 'de_DE',
      vi: 'vi_VN',
      ru: 'ru_RU'
    };

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', ogLocales[currentLang] || 'en_US');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', canonicalUrl);
    }

    // 5. Localized Page Titles and Descriptions
    const titles: Record<SupportedLanguage, string> = {
      en: 'Dried Seafood Global - Certified Indonesian Dried Fish & Seafood Supplier',
      id: 'Dried Seafood Global - Eksportir Resmi Ikan Asin & Hasil Laut Kering Indonesia',
      zh: 'Dried Seafood Global - 印度尼西亚特级水产干货与咸鱼官方出口商',
      ja: 'Dried Seafood Global - インドネシア産高級水産乾物・チリメンジャコ正規輸出商社',
      ko: 'Dried Seafood Global - 인도네시아산 프리미엄 건어물·멸치·어교 공식 수출기업',
      ar: 'Dried Seafood Global - المصدّر المعتمد للأسماك والمأكولات البحرية المجففة من إندونيسيا',
      es: 'Dried Seafood Global - Proveedor Certificado de Pescado y Mariscos Secos de Indonesia',
      fr: 'Dried Seafood Global - Fournisseur Agréé de Poissons Séchés & Produits Halieutiques d\'Indonésie',
      de: 'Dried Seafood Global - Zertifizierter Lieferant für Indonesischen Trockenfisch & Meeresfrüchte',
      vi: 'Dried Seafood Global - Doanh Nghiệp Xuất Khẩu Thủy Hải Sản Khô & Cá Muối Indonesia Chính Thức',
      ru: 'Dried Seafood Global - Официальный Экспортер Индонезийской Сушеной Рыбы и Морепродуктов'
    };

    const descriptions: Record<SupportedLanguage, string> = {
      en: 'Direct supplier of Indonesian dried anchovy (teri nasi), salted fish (jambal roti), sun-dried squid, and fish maw. HACCP Grade A and BKIPM Quarantine certified.',
      id: 'Eksportir langsung ikan asin jambal roti, teri nasi super, cumi kering sero, dan gelembung ikan khas Indonesia bersertifikasi HACCP dan Karantina BKIPM.',
      zh: '专业直供印尼特级白饭鱼干、咸马友鱼、优质鱿鱼干与花胶鱼鳔，持有 HACCP A 级体系与印尼官方检疫证书。',
      ja: '極上チリメンジャコ、塩干魚、スルメイカ、魚鰾の正規輸出。HACCP A級基準および国家検疫BKIPM認証取得。',
      ko: '인도네시아산 특급 백자멸치, 염장 생선, 마른오징어, 생선 부레(화교) 직수출. HACCP Grade A 및 인도네시아 해양수산부 검역 인증.',
      ar: 'مصدّر معتمد لأسماك الأنشوجة البيضاء، الأسماك المملحة، الحبار، وحويصلات الأسماك من إندونيسيا بشهادات HACCP والفحص البيطري.',
      es: 'Proveedor directo de anchoa seca indonesia (teri nasi), pescado salado, calamar seco y buches de pescado. Certificación HACCP Grado A y Cuarentena BKIPM.',
      fr: 'Fournisseur direct d\'anchois séchés indonésiens, poissons salés, calmars séchés et vessies natatoires. Certifié HACCP Grade A et inspection vétérinaire BKIPM.',
      de: 'Direktlieferant für indonesische getrocknete Sardellen (Teri Nasi), gesalzenen Fisch, getrockneten Tintenfisch und Fischblasen. HACCP Klasse A und BKIPM-zertifiziert.',
      vi: 'Xuất khẩu trực tiếp cá cơm khô trắng Indonesia (teri nasi), cá mặn, mực khô và bong bóng cá. Chứng nhận HACCP Hạng A và kiểm dịch BKIPM.',
      ru: 'Прямой экспортер индонезийского сушеного анчоуса (teri nasi), соленой рыбы, сушеного кальмара и рыбьих пузырей. Сертифицировано HACCP Grade A и карантином BKIPM.'
    };

    // Subpage-specific title adjustments
    if (cleanSubPath === '/company' || cleanSubPath === '/about') {
      document.title = currentLang === 'ar'
        ? 'الملف التعريفي للشركة | Dried Seafood Global (PT Samdura Bara Persada)'
        : currentLang === 'id'
          ? 'Profil Perusahaan | PT Samdura Bara Persada - Dried Seafood Global'
          : 'Corporate Profile | PT Samdura Bara Persada - Dried Seafood Global';
    } else if (cleanSubPath === '/partners') {
      document.title = currentLang === 'ar'
        ? 'الشركاء الاستراتيجيون | Dried Seafood Global'
        : currentLang === 'id'
          ? 'Mitra Strategis | Dried Seafood Global'
          : 'Strategic Partners | Dried Seafood Global';
    } else {
      document.title = titles[currentLang] || titles.en;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[currentLang] || descriptions.en);
    }
  }, [currentLang, dir]);

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        t,
        dir,
        currentLanguageOption,
        availableLanguages: SUPPORTED_LANGUAGES,
        getLocalizedPath,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

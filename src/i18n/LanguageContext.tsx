import React, { createContext, useContext, useState, useEffect } from 'react';
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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const ALL_LANG_CODES: SupportedLanguage[] = ['en', 'id', 'zh', 'ja', 'ko', 'ar', 'es', 'fr', 'de', 'vi', 'ru'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial language from URL query param ?lang= or localStorage or navigator.language
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang') as SupportedLanguage;
      if (paramLang && ALL_LANG_CODES.includes(paramLang)) {
        return paramLang;
      }
      const savedLang = localStorage.getItem('dsg_lang') as SupportedLanguage;
      if (savedLang && ALL_LANG_CODES.includes(savedLang)) {
        return savedLang;
      }
      // Browser language check
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('ja')) return 'ja';
      if (navLang.startsWith('ko')) return 'ko';
      if (navLang.startsWith('ar')) return 'ar';
      if (navLang.startsWith('id')) return 'id';
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('fr')) return 'fr';
      if (navLang.startsWith('de')) return 'de';
      if (navLang.startsWith('vi')) return 'vi';
      if (navLang.startsWith('ru')) return 'ru';
    }
    return 'en'; // Global standard default for international trade
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dsg_lang', lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const currentLanguageOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const dir = currentLanguageOption.dir || 'ltr';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Sync DOM attributes and SEO headers when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
      document.documentElement.dir = dir;

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
        ogLocale.setAttribute('content', ogLocales[currentLang]);
      }

      // Update meta titles & description based on current language
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

      document.title = titles[currentLang] || titles.en;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', descriptions[currentLang] || descriptions.en);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', titles[currentLang] || titles.en);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', descriptions[currentLang] || descriptions.en);
      }
    }
  }, [currentLang, dir]);

  return (
    <LanguageContext.Provider value={{
      currentLang,
      setLanguage,
      t,
      dir,
      currentLanguageOption,
      availableLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

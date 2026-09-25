import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutServices from './components/AboutServices';
import ExportCommodities from './components/ExportCommodities';
import ExportProcessWorkflow from './components/ExportProcessWorkflow';
import GlobalShippingCalculator from './components/GlobalShippingCalculator';
import PhotoGallery from './components/PhotoGallery';
import BuyerTestimonials from './components/BuyerTestimonials';
import LocationMap from './components/LocationMap';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SSLSecurityModal from './components/SSLSecurityModal';
import ExportCatalogModal from './components/ExportCatalogModal';
import NotFoundPage from './components/NotFoundPage';
import CompanyPage from './components/CompanyPage';
import PartnersPage from './components/PartnersPage';
import WhatsAppFloatingWidget from './components/WhatsAppFloatingWidget';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

// Dedicated New Architecture Pages
import ProductsPage from './components/pages/ProductsPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import ExportProcessPage from './components/pages/ExportProcessPage';
import QualityPage from './components/pages/QualityPage';
import FacilityPage from './components/pages/FacilityPage';
import AboutPage from './components/pages/AboutPage';
import MarketsPage from './components/pages/MarketsPage';
import InsightsPage from './components/pages/InsightsPage';
import ArticleDetailPage from './components/pages/ArticleDetailPage';
import RequestQuotePage from './components/pages/RequestQuotePage';

import { EXPORT_COMMODITIES, INITIAL_BLOG_POSTS, INITIAL_GALLERY, INITIAL_INQUIRIES, INITIAL_SEO_SETTINGS } from './data/initialData';
import { BlogPost, BlogComment, GalleryItem, ContactInquiry, SEOSettings, ExportCommodity } from './types';
import { initGoogleAnalytics, initGoogleTagManager, pingVisitorPresence } from './utils/analytics';

export default function App() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(INITIAL_INQUIRIES);
  const [products, setProducts] = useState<ExportCommodity[]>(() => {
    try {
      const savedProducts = localStorage.getItem('dried-seafood-products');
      const storedProducts = savedProducts ? JSON.parse(savedProducts) : EXPORT_COMMODITIES;
      if (!Array.isArray(storedProducts)) return EXPORT_COMMODITIES;

      const usedIds = new Set<string>();
      return storedProducts.map((product: ExportCommodity, index: number) => {
        const baseId = String(product.id || `product-${index + 1}`);
        let uniqueId = baseId;
        let suffix = 2;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${baseId}-${suffix}`;
          suffix += 1;
        }
        usedIds.add(uniqueId);
        return {
          ...product,
          id: uniqueId,
          slug: product.slug || uniqueId,
          category: String(product.category || 'Uncategorized').trim()
        };
      });
    } catch {
      return EXPORT_COMMODITIES;
    }
  });
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(INITIAL_SEO_SETTINGS);
  const [liveVisitors, setLiveVisitors] = useState<number>(46);

  // Admin Auth State
  const [adminUser, setAdminUser] = useState<{ id: string; username: string; name: string; role: string } | null>(null);
  const [checkingAdminAuth, setCheckingAdminAuth] = useState(true);

  const [isSSLModalOpen, setIsSSLModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledBooking, setPrefilledBooking] = useState<{
    origin: string;
    destination: string;
    weight: number;
    courierName: string;
    estimatedPriceUSD: number;
  } | null>(null);

  // Selected commodity for quotation
  const [activeQuoteCommodity, setActiveQuoteCommodity] = useState<string>('');

  // Client-side route detection
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  useEffect(() => {
    localStorage.setItem('dried-seafood-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Check admin session with backend on mount
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        } else {
          setAdminUser(null);
        }
      })
      .catch(() => setAdminUser(null))
      .finally(() => setCheckingAdminAuth(false));
  }, []);

  // Route Parser: Extracts language subdirectory and page subpath
  const normalizedRaw = currentPath.toLowerCase().replace(/\/+$/, '') || '/';
  
  let currentLangPrefix = '';
  let subPath = normalizedRaw;

  const langMatch = normalizedRaw.match(/^\/(id|zh|ja|ko|ar|es|fr|de|vi|ru)(\/|$)/);
  if (langMatch) {
    currentLangPrefix = `/${langMatch[1]}`;
    subPath = normalizedRaw.slice(langMatch[0].length - 1) || '/';
    if (!subPath.startsWith('/')) subPath = `/${subPath}`;
  }

  // Exact or prefix checks for pages
  const isHome = subPath === '/' || subPath === '/index.html';
  const isProducts = subPath === '/products';
  const isProductDetail = subPath.startsWith('/products/');
  const isExport = subPath === '/export' || subPath === '/export-process';
  const isQuality = subPath === '/quality';
  const isFacility = subPath === '/facility';
  const isAbout = subPath === '/about' || subPath === '/company';
  const isMarkets = subPath === '/markets';
  const isInsights = subPath === '/insights' || subPath === '/blog';
  const isArticleDetail = subPath.startsWith('/insights/') || subPath.startsWith('/blog/');
  const isRequestQuote = subPath === '/request-quote';
  const isBuyerInquiry = subPath === '/buyer-inquiry' || subPath === '/sample-request';
  const isPartners = subPath === '/partners';
  const isAdminRoute = subPath === '/admin' || normalizedRaw === '/admin' || normalizedRaw.startsWith('/admin/');
  
  const isKnownRoute = isHome || isProducts || isProductDetail || isExport || isQuality || isFacility || isAbout || isMarkets || isInsights || isArticleDetail || isRequestQuote || isBuyerInquiry || isPartners || isAdminRoute;
  const is404 = !isKnownRoute;

  const homeUrl = currentLangPrefix ? `${currentLangPrefix}/` : '/';

  // Find targeted product for ProductDetailPage
  let selectedProduct: ExportCommodity | undefined;
  if (isProductDetail) {
    const slugOrId = subPath.replace('/products/', '').trim();
    selectedProduct = products.find(p => p.slug === slugOrId || p.id === slugOrId)
      || (slugOrId.includes('anchovy') || slugOrId.includes('teri') ? products.find(p => p.id === 'teri-nasi-super' || p.slug === 'dried-anchovy') : undefined)
      || (slugOrId.includes('squid') || slugOrId.includes('cumi') ? products.find(p => p.id === 'cumi-kering-sero' || p.slug === 'dried-squid') : undefined)
      || (slugOrId.includes('shrimp') || slugOrId.includes('ebi') ? products.find(p => p.id === 'udang-rebon-kering' || p.slug === 'dried-shrimp') : undefined)
      || (slugOrId.includes('fish') || slugOrId.includes('ikan') || slugOrId.includes('jambal') ? products.find(p => p.id === 'ikan-asin-jambal' || p.slug === 'dried-fish') : undefined)
      || (slugOrId.includes('maw') || slugOrId.includes('gelembung') ? products.find(p => p.id === 'fish-maw-gulama' || p.slug === 'fish-maw') : undefined)
      || (slugOrId.includes('cucumber') || slugOrId.includes('teripang') ? products.find(p => p.id === 'teripang-pasir' || p.slug === 'sea-cucumber') : undefined)
      || products[0];
  }

  // Find targeted article for ArticleDetailPage
  let selectedArticle: BlogPost | undefined;
  if (isArticleDetail) {
    const artIdOrSlug = subPath.replace('/insights/', '').replace('/blog/', '').trim();
    selectedArticle = blogPosts.find(b => b.id === artIdOrSlug)
      || blogPosts.find(b => b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(artIdOrSlug))
      || blogPosts[0];
  }

  // Dynamic document title update per route
  useEffect(() => {
    if (isProductDetail && selectedProduct) {
      document.title = `${selectedProduct.name} Supplier & Exporter | Dried Seafood Global`;
    } else if (isProducts) {
      document.title = `Export Dried Seafood Products Catalog | Dried Seafood Global`;
    } else if (isExport) {
      document.title = `9-Step B2B Dried Seafood Export Process & Compliance | Dried Seafood Global`;
    } else if (isQuality) {
      document.title = `HACCP Quality Standards & Solar Dome Processing | Dried Seafood Global`;
    } else if (isFacility) {
      document.title = `Muara Baru Processing & Storage Facilities | Dried Seafood Global`;
    } else if (isAbout) {
      document.title = `About PT Samdura Bara Persada - Indonesian Marine Exporter | Dried Seafood Global`;
    } else if (isMarkets) {
      document.title = `Global Export Markets & International Shipping Ports | Dried Seafood Global`;
    } else if (isInsights) {
      document.title = `Export Insights & Seafood Buyer Intelligence | Dried Seafood Global`;
    } else if (isArticleDetail && selectedArticle) {
      document.title = `${selectedArticle.title} | Dried Seafood Global Insights`;
    } else if (isRequestQuote) {
      document.title = `Request Official B2B Export Quotation (RFQ) | Dried Seafood Global`;
    } else if (isBuyerInquiry) {
      document.title = `Buyer Inquiry & Quality Sample Request | Dried Seafood Global`;
    } else if (isHome) {
      document.title = 'Dried Seafood Global | Indonesian Dried Seafood Exporter | PT Samdura Bara Persada';
    }
  }, [currentPath, selectedProduct, selectedArticle, isProducts, isExport, isQuality, isFacility, isAbout, isMarkets, isInsights, isRequestQuote, isBuyerInquiry, isHome]);

  // Fetch initial public data from server APIs
  useEffect(() => {
    if (isAdminRoute) return;

    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogPosts(data);
        } else if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setBlogPosts(data.posts);
        }
      })
      .catch(() => {});

    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryItems(data);
        } else if (data && Array.isArray(data.items) && data.items.length > 0) {
          setGalleryItems(data.items);
        }
      })
      .catch(() => {});

    fetch('/api/contact/messages')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setInquiries(data.inquiries);
        }
      })
      .catch(() => {});

    fetch('/api/seo')
      .then(res => res.json())
      .then(data => {
        if (data && data.metaTitle) setSeoSettings(data);
      })
      .catch(() => {});

    pingVisitorPresence();
    fetch('/api/analytics/realtime')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.activeVisitorsNow === 'number') {
          setLiveVisitors(data.activeVisitorsNow);
        }
      })
      .catch(() => {});

    const interval = setInterval(() => {
      pingVisitorPresence();
      fetch('/api/analytics/realtime')
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.activeVisitorsNow === 'number') {
            setLiveVisitors(data.activeVisitorsNow);
          }
        })
        .catch(() => {});
    }, 20000);

    return () => clearInterval(interval);
  }, [isAdminRoute]);

  // Active section tracking for homepage
  const [activeSection, setActiveSection] = useState<string>('hero');
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const sections = ['hero', 'tentang', 'komoditas', 'alur-ekspor', 'kalkulator', 'galeri', 'testimoni', 'lokasi', 'blog', 'kontak'];
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleScrollTo = (id: string) => {
    if (!isHome) {
      navigateTo(homeUrl);
      setTimeout(() => {
        const targetElement = document.querySelector(id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setActiveQuoteCommodity(serviceTitle);
    navigateTo('/request-quote');
  };

  const handleSelectCommodityForQuote = (commodityName: string) => {
    setActiveQuoteCommodity(commodityName);
    navigateTo('/request-quote');
  };

  const handleBookFromCalculator = (bookingDetails: {
    origin: string;
    destination: string;
    weight: number;
    courierName: string;
    estimatedPriceUSD: number;
  }) => {
    setPrefilledBooking(bookingDetails);
    setPrefilledService('');
    navigateTo('/request-quote');
  };

  const handleAddBlogComment = (postId: string, comment: { author: string; email: string; content: string }) => {
    setBlogPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComments: BlogComment[] = [
          ...(post.comments || []),
          {
            id: `c-${Date.now()}`,
            author: comment.author,
            email: comment.email,
            content: comment.content,
            createdAt: 'Just now'
          }
        ];
        return { ...post, comments: newComments };
      }
      return post;
    }));
  };

  // Admin Route: completely isolated from public pages
  if (isAdminRoute) {
    if (checkingAdminAuth) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
          <div className="text-xs font-mono text-slate-400">Verifying security credentials...</div>
        </div>
      );
    }

    if (!adminUser) {
      return (
        <AdminLogin 
          onLoginSuccess={(user) => setAdminUser(user)} 
        />
      );
    }

    return (
      <AdminLayout 
        currentUser={adminUser} 
        onLogout={() => {
          setAdminUser(null);
          navigateTo('/');
        }} 
      />
    );
  }

  // 404 Handler
  if (is404) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-clip bg-white text-slate-800 font-sans selection:bg-[#009bb3] selection:text-white">
        <Navbar
          onOpenSSLModal={() => setIsSSLModalOpen(true)}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          onScrollTo={handleScrollTo}
          onNavigate={navigateTo}
          currentPath={currentPath}
          activeSection={activeSection}
          activeVisitors={liveVisitors}
        />
        <NotFoundPage
          onBackToHome={() => navigateTo(homeUrl)}
          onScrollToSection={(sectionId) => {
            navigateTo(homeUrl);
            setTimeout(() => {
              handleScrollTo(sectionId);
            }, 120);
          }}
          onOpenSSLModal={() => setIsSSLModalOpen(true)}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        />
        <Footer
          onScrollTo={handleScrollTo}
          onNavigate={navigateTo}
          onOpenCompany={() => navigateTo('/about')}
          onOpenPartners={() => navigateTo('/partners')}
          onOpenSSLModal={() => setIsSSLModalOpen(true)}
          onOpen404={() => navigateTo('/404')}
        />
      </div>
    );
  }

  // Public Layout rendering Header + Active Page + Footer
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-white text-slate-800 font-sans selection:bg-[#009bb3] selection:text-white">
      
      {/* Top Fixed Header Navbar */}
      <Navbar
        onOpenSSLModal={() => setIsSSLModalOpen(true)}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onScrollTo={handleScrollTo}
        onNavigate={navigateTo}
        currentPath={currentPath}
        activeSection={activeSection}
        activeVisitors={liveVisitors}
      />

      {/* Main Content Router */}
      <main>
        {isHome && (
          <>
            <Hero
              onScrollTo={handleScrollTo}
              onOpenSSLModal={() => setIsSSLModalOpen(true)}
              onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            />
            <AboutServices 
              onSelectServiceForQuote={handleSelectServiceForQuote} 
              onNavigate={navigateTo}
            />
            <ExportCommodities
              products={products}
              onSelectCommodityForQuote={handleSelectCommodityForQuote}
              onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
              onNavigateProducts={() => navigateTo(currentLangPrefix ? `${currentLangPrefix}/products` : '/products')}
            />
            <ExportProcessWorkflow />
            <GlobalShippingCalculator onBookInquiry={handleBookFromCalculator} />
            <PhotoGallery 
              items={galleryItems} 
              onNavigateFacility={() => navigateTo('/facility')}
            />
            <BuyerTestimonials />
            <LocationMap />
            <BlogSection 
              posts={blogPosts} 
              onAddComment={handleAddBlogComment} 
              onNavigateInsights={() => navigateTo('/insights')}
            />
            <ContactSection
              prefilledService={prefilledService}
              prefilledBooking={prefilledBooking}
              onOpenSSLModal={() => setIsSSLModalOpen(true)}
              onInquirySubmitted={(newInquiry) => setInquiries(prev => [newInquiry, ...prev])}
            />
          </>
        )}

        {isProducts && (
          <ProductsPage
            products={products}
            onSelectProduct={(p) => navigateTo(`/products/${p.slug || p.id}`)}
            onRequestQuote={handleSelectCommodityForQuote}
            onRequestSample={(p) => {
              setActiveQuoteCommodity(p.name);
              navigateTo('/buyer-inquiry');
            }}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isProductDetail && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onSelectProduct={(p) => navigateTo(`/products/${p.slug || p.id}`)}
            onRequestQuote={handleSelectCommodityForQuote}
            onRequestSample={(prodName) => {
              setActiveQuoteCommodity(prodName);
              navigateTo('/buyer-inquiry');
            }}
            onNavigateProducts={() => navigateTo('/products')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isExport && (
          <ExportProcessPage
            onRequestQuote={() => navigateTo('/request-quote')}
            onRequestSample={() => navigateTo('/buyer-inquiry')}
            onNavigateProducts={() => navigateTo('/products')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isQuality && (
          <QualityPage
            onRequestQuote={() => navigateTo('/request-quote')}
            onRequestSample={() => navigateTo('/buyer-inquiry')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isFacility && (
          <FacilityPage
            onRequestQuote={() => navigateTo('/request-quote')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isAbout && (
          <AboutPage
            onRequestQuote={() => navigateTo('/request-quote')}
            onNavigateHome={() => navigateTo('/')}
            onNavigateProducts={() => navigateTo('/products')}
          />
        )}

        {isMarkets && (
          <MarketsPage
            onRequestQuote={() => navigateTo('/request-quote')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isInsights && (
          <InsightsPage
            articles={blogPosts}
            onSelectArticle={(a) => navigateTo(`/insights/${a.id}`)}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isArticleDetail && selectedArticle && (
          <ArticleDetailPage
            article={selectedArticle}
            allArticles={blogPosts}
            onSelectArticle={(a) => navigateTo(`/insights/${a.id}`)}
            onRequestQuote={() => navigateTo('/request-quote')}
            onNavigateInsights={() => navigateTo('/insights')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {isRequestQuote && (
          <RequestQuotePage
            initialCommodity={activeQuoteCommodity}
            isSampleMode={false}
            products={products}
            onNavigateHome={() => navigateTo('/')}
            onNavigateProducts={() => navigateTo('/products')}
          />
        )}

        {isBuyerInquiry && (
          <RequestQuotePage
            initialCommodity={activeQuoteCommodity}
            isSampleMode={true}
            products={products}
            onNavigateHome={() => navigateTo('/')}
            onNavigateProducts={() => navigateTo('/products')}
          />
        )}

        {isPartners && (
          <PartnersPage
            onBackToHome={() => navigateTo(homeUrl)}
            onOpenContact={() => navigateTo('/request-quote')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onNavigate={navigateTo}
        onOpenCompany={() => navigateTo('/about')}
        onOpenPartners={() => navigateTo('/partners')}
        onOpenSSLModal={() => setIsSSLModalOpen(true)}
        onOpen404={() => navigateTo('/404')}
      />

      {/* Modals & Floating Tools */}
      <SSLSecurityModal
        isOpen={isSSLModalOpen}
        onClose={() => setIsSSLModalOpen(false)}
      />

      <ExportCatalogModal
        isOpen={isCatalogModalOpen}
        products={products}
        onClose={() => setIsCatalogModalOpen(false)}
        onSelectCommodityForQuote={handleSelectCommodityForQuote}
      />

      <WhatsAppFloatingWidget />
    </div>
  );
}

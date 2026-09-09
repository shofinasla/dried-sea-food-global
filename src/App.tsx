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
import AdminCMSModal from './components/AdminCMSModal';
import SSLSecurityModal from './components/SSLSecurityModal';
import ExportCatalogModal from './components/ExportCatalogModal';
import { INITIAL_BLOG_POSTS, INITIAL_GALLERY, INITIAL_INQUIRIES, INITIAL_SEO_SETTINGS } from './data/initialData';
import { BlogPost, GalleryItem, ContactInquiry, SEOSettings } from './types';
import { initGoogleAnalytics, initGoogleTagManager, pingVisitorPresence } from './utils/analytics';

export default function App() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(INITIAL_INQUIRIES);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(INITIAL_SEO_SETTINGS);
  const [liveVisitors, setLiveVisitors] = useState<number>(46);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
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

  // Fetch initial data from server APIs
  useEffect(() => {
    // 1. Fetch Blog Posts
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setBlogPosts(data);
      })
      .catch(err => console.log('API blog load fallback to memory', err));

    // 2. Fetch Gallery
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setGalleryItems(data);
      })
      .catch(err => console.log('API gallery load fallback to memory', err));

    // 3. Fetch SEO Settings
    fetch('/api/seo')
      .then(res => res.json())
      .then(data => {
        if (data && data.metaTitle) setSeoSettings(data);
      })
      .catch(err => console.log('API SEO fallback to memory', err));

    // 4. Real-time Telemetry Ping & Active Visitor counter
    pingVisitorPresence();
    fetch('/api/analytics/realtime')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.activeVisitorsNow === 'number') {
          setLiveVisitors(data.activeVisitorsNow);
        }
      })
      .catch(() => {});

    // Periodic heartbeat to refresh live visitor count every 20 seconds
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
  }, []);

  // Synchronize dynamic SEO Meta Tags & Google Ecosystem with state
  useEffect(() => {
    if (seoSettings.metaTitle) {
      document.title = seoSettings.metaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seoSettings.metaDescription) {
      metaDesc.setAttribute('content', seoSettings.metaDescription);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && seoSettings.metaTitle) {
      ogTitle.setAttribute('content', seoSettings.metaTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && seoSettings.metaDescription) {
      ogDesc.setAttribute('content', seoSettings.metaDescription);
    }

    // Google Site Verification (GSC / GMC)
    const gscMeta = document.getElementById('meta-google-verification');
    if (gscMeta && seoSettings.googleSearchConsoleKey) {
      gscMeta.setAttribute('content', seoSettings.googleSearchConsoleKey);
    }

    // Google Analytics 4 (GA4)
    if (seoSettings.googleAnalyticsId) {
      initGoogleAnalytics(seoSettings.googleAnalyticsId);
    }

    // Google Tag Manager (GTM)
    if (seoSettings.googleTagManagerId) {
      initGoogleTagManager(seoSettings.googleTagManagerId);
    }
  }, [seoSettings]);

  // Dynamic Scroll-Spy to highlight current active section in Navbar
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sections = [
      'hero',
      'tentang',
      'komoditas',
      'alur-ekspor',
      'kalkulator',
      'galeri',
      'lokasi',
      'testimoni',
      'blog',
      'kontak'
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setPrefilledBooking(null);
    handleScrollTo('#kontak');
  };

  const handleSelectCommodityForQuote = (commodityName: string) => {
    setPrefilledService(`Permintaan Penawaran Ekspor: ${commodityName}`);
    setPrefilledBooking(null);
    handleScrollTo('#kontak');
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
    handleScrollTo('#kontak');
  };

  // CMS Handlers
  const handleSaveBlogPost = async (postData: Partial<BlogPost>) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      if (data.success && data.post) {
        if (postData.id) {
          setBlogPosts(prev => prev.map(p => p.id === postData.id ? data.post : p));
        } else {
          setBlogPosts(prev => [data.post, ...prev]);
        }
      }
    } catch (err) {
      console.error('Failed to save blog post:', err);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete blog post:', err);
    }
  };

  const handleAddBlogComment = (postId: string, comment: { author: string; email: string; content: string }) => {
    setBlogPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComments = [
          ...(post.comments || []),
          {
            id: `c-${Date.now()}`,
            author: comment.author,
            content: comment.content,
            createdAt: 'Baru saja'
          }
        ];
        return { ...post, comments: newComments };
      }
      return post;
    }));
  };

  const handleSaveGalleryItem = async (itemData: Partial<GalleryItem>) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      const data = await res.json();
      if (data.success && data.item) {
        setGalleryItems(prev => [data.item, ...prev]);
      }
    } catch (err) {
      console.error('Failed to save gallery item:', err);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setGalleryItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string, notes?: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status: status as any,
          replyNotes: notes || inq.replyNotes
        };
      }
      return inq;
    }));
  };

  const handleSaveSEOSettings = async (newSettings: Partial<SEOSettings>) => {
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (data.success && data.settings) {
        setSeoSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to save SEO settings:', err);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-800 font-sans selection:bg-[#009bb3] selection:text-white">
      
      {/* Top Fixed Header Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSSLModal={() => setIsSSLModalOpen(true)}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onScrollTo={handleScrollTo}
        activeSection={activeSection}
        activeVisitors={liveVisitors}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section with Trust Badges, High-Res Image Carousel & Live KPI counters */}
        <Hero
          onScrollTo={handleScrollTo}
          onOpenSSLModal={() => setIsSSLModalOpen(true)}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        />

        {/* 2. Corporate Profile, Vision, 6 Core Logistics Pillars, & Leadership */}
        <AboutServices
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* 3. Indonesian High-Value Export Commodities Showcase (WebEkspor Collaboration) */}
        <ExportCommodities
          onSelectCommodityForQuote={handleSelectCommodityForQuote}
          onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        />

        {/* 4. Visual 5-Step Export Workflow & Quality Standard (ISPM 15, HACCP, AEO) */}
        <ExportProcessWorkflow />

        {/* 5. Global Multi-Carrier Shipping Estimator & AI Customs Advisory */}
        <GlobalShippingCalculator
          onBookInquiry={handleBookFromCalculator}
        />

        {/* 6. High-Resolution Responsive Photo Gallery with Lightbox */}
        <PhotoGallery
          items={galleryItems}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 7. Verified Global Importer & Buyer Testimonials */}
        <BuyerTestimonials />

        {/* 8. Interactive Global Map Integration with International Hubs */}
        <LocationMap />

        {/* 9. Blog & Industrial Intelligence Reader with Comments */}
        <BlogSection
          posts={blogPosts}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onAddComment={handleAddBlogComment}
        />

        {/* 10. Professional RFQ Contact Form with End-to-End SSL Encryption & Anti-Spam */}
        <ContactSection
          prefilledService={prefilledService}
          prefilledBooking={prefilledBooking}
          onOpenSSLModal={() => setIsSSLModalOpen(true)}
        />
      </main>

      {/* Footer with rich enterprise navigation and certification logos */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenSSLModal={() => setIsSSLModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Content Management System (CMS) & Analytics Portal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        blogPosts={blogPosts}
        galleryItems={galleryItems}
        inquiries={inquiries}
        seoSettings={seoSettings}
        onSaveBlogPost={handleSaveBlogPost}
        onDeleteBlogPost={handleDeleteBlogPost}
        onSaveGalleryItem={handleSaveGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onSaveSEOSettings={handleSaveSEOSettings}
      />

      {/* SSL / TLS 1.3 Extended Validation Certificate Modal */}
      <SSLSecurityModal
        isOpen={isSSLModalOpen}
        onClose={() => setIsSSLModalOpen(false)}
      />

      {/* Export Commodity E-Catalog Download Modal */}
      <ExportCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        onSelectCommodityForQuote={handleSelectCommodityForQuote}
      />

    </div>
  );
}

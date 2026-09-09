// Google Analytics 4, Google Tag Manager & Real-Time Visitor Telemetry Utility

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

let isGAInitialized = false;
let isGTMInitialized = false;

/**
 * Initialize Google Analytics 4 (gtag.js) dynamically
 * @param measurementId - Google Analytics 4 Measurement ID, e.g. G-XXXXXXXXXX
 */
export function initGoogleAnalytics(measurementId?: string) {
  if (!measurementId || typeof window === 'undefined') return;
  const cleanId = measurementId.trim();
  if (!cleanId.startsWith('G-')) return;

  if (isGAInitialized && document.getElementById('ga4-script')) {
    // Already loaded, just configure ID if changed
    if (window.gtag) {
      window.gtag('config', cleanId, {
        page_path: window.location.pathname + window.location.search,
        send_page_view: true
      });
    }
    return;
  }

  // Inject gtag.js script
  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', cleanId, {
    page_path: window.location.pathname + window.location.search,
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  isGAInitialized = true;
  console.log(`[Google Analytics] Initialized with ID: ${cleanId}`);
}

/**
 * Initialize Google Tag Manager container
 * @param gtmId - GTM Container ID, e.g. GTM-XXXXXXX
 */
export function initGoogleTagManager(gtmId?: string) {
  if (!gtmId || typeof window === 'undefined') return;
  const cleanId = gtmId.trim();
  if (!cleanId.startsWith('GTM-')) return;

  if (isGTMInitialized || document.getElementById('gtm-script')) return;

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${cleanId}');`;
  document.head.appendChild(script);

  isGTMInitialized = true;
  console.log(`[Google Tag Manager] Initialized with Container: ${cleanId}`);
}

/**
 * Send an event to Google Analytics 4 and on-site real-time telemetry
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  // 1. Send to GA4 if available
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      console.warn('[Analytics] GA event dispatch failed:', e);
    }
  }

  // 2. Telemetry ping to backend real-time event log
  try {
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        label: params.event_label || params.item_name || params.service_tier || eventName,
        path: window.location.hash || window.location.pathname,
        device: window.innerWidth < 768 ? 'Mobile Smartphone' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop',
        timestamp: new Date().toISOString()
      }),
      keepalive: true
    }).catch(() => {});
  } catch (_) {}
}

/**
 * Send visitor presence ping on route change or interval
 */
export function pingVisitorPresence() {
  if (typeof window === 'undefined') return;
  try {
    fetch('/api/analytics/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.hash || window.location.pathname,
        referrer: document.referrer || 'Direct Visit',
        device: window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop',
        screenWidth: window.innerWidth,
        language: navigator.language
      }),
      keepalive: true
    }).catch(() => {});
  } catch (_) {}
}

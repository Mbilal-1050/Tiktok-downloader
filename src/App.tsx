import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { DownloaderHero } from './components/DownloaderHero';
import { DownloadResult } from './components/DownloadResult';
import { AdsterraBanner } from './components/AdsterraBanner';
import { HowToUse } from './components/HowToUse';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { FaqSection } from './components/FaqSection';
import { SeoContentSection } from './components/SeoContentSection';
import { Footer } from './components/Footer';
import { AdSettingsModal } from './components/AdSettingsModal';
import { BatchDownloaderModal } from './components/BatchDownloaderModal';
import { TrendingExplore } from './components/TrendingExplore';
import { MonetagAdManager } from './components/MonetagAdManager';

// Standalone Full Legal & Informational Pages
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { DmcaPolicyPage } from './pages/DmcaPolicyPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';

import { TikTokVideoData, AdSettings, DownloadHistoryItem } from './types';
import { Clock, Trash2, Download } from 'lucide-react';

const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  network: 'adsterra',
  bannerTopEnabled: true,
  inFeedEnabled: true,
  interstitialEnabled: true,
  stickyBottomEnabled: true,
  adsterraDirectLink: 'https://beta.publishers.adsterra.com',
};

export default function App() {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState<TikTokVideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'ur'>('en');

  // Page Routing (home, privacy, terms, dmca, about, contact)
  const [currentView, setCurrentView] = useState<string>(() => {
    // 1. Check pathname first (e.g., /about, /privacy)
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(path)) {
      return path;
    }
    // 2. Check hash fallback for legacy links (e.g., #about)
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Listen to browser back/forward buttons (popstate) & hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(path)) {
        setCurrentView(path);
        return;
      }
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash);
        // Normalize hash URL to clean path without hash
        window.history.replaceState({ view: hash }, '', `/${hash}`);
        return;
      }
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update Page Title, Meta Description, Open Graph and Structured Data on route change
  useEffect(() => {
    const titles: Record<string, { en: string; ur: string; descEn: string; descUr: string }> = {
      home: {
        en: 'TikDownload Pro - TikTok Video Downloader (No Watermark HD)',
        ur: 'ٹک ڈاؤنلوڈ پرو - بغیر واٹر مارک ٹک ٹاک ویڈیو ڈاؤنلوڈر',
        descEn: 'Download TikTok videos without watermark in crisp 1080p Full HD MP4 and MP3 audio instantly. 100% free with no login required.',
        descUr: 'بغیر واٹر مارک ٹک ٹاک ویڈیوز اور ایم پی تھری آڈیو فل ایچ ڈی میں ڈاؤنلوڈ کریں۔ تیز رفتار اور بالکل مفت۔',
      },
      about: {
        en: 'About TikDownload Pro - High Speed TikTok Video Downloader',
        ur: 'ہمارے بارے میں - ٹک ڈاؤنلوڈ پرو',
        descEn: 'Learn more about TikDownload Pro, the leading fast and free media downloader for TikTok content creators and digital editors.',
        descUr: 'ٹک ڈاؤنلوڈ پرو کے بارے میں جانیے، دنیا کا تیز ترین ٹک ٹاک ڈاؤنلوڈر۔',
      },
      contact: {
        en: 'Contact Us - TikDownload Pro Support & Inquiries',
        ur: 'ہم سے رابطہ کریں - ٹک ڈاؤنلوڈ پرو',
        descEn: 'Get in touch with the TikDownload Pro support team for general inquiries, feedback, DMCA notices, and creator assistance.',
        descUr: 'ٹک ڈاؤنلوڈ پرو کی کسٹمر سپورٹ ٹیم سے فوری رابطہ کریں۔',
      },
      privacy: {
        en: 'Privacy Policy - TikDownload Pro',
        ur: 'پرائیویسی پالیسی - ٹک ڈاؤنلوڈ پرو',
        descEn: 'TikDownload Pro privacy policy detailing our zero-logging, anonymous usage, and data protection practices.',
        descUr: 'ٹک ڈاؤنلوڈ پرو کی پرائیویسی پالیسی اور ڈیٹا کے تحفظ کی تفصیلات۔',
      },
      terms: {
        en: 'Terms of Service - TikDownload Pro',
        ur: 'استعمال کی شرائط - ٹک ڈاؤنلوڈ پرو',
        descEn: 'Terms and conditions governing the use of TikDownload Pro video downloader services and media utilities.',
        descUr: 'ٹک ڈاؤنلوڈ پرو کی شرائط و ضوابط۔',
      },
      dmca: {
        en: 'DMCA Copyright Policy - TikDownload Pro',
        ur: 'کاپی رائٹ پالیسی - ٹک ڈاؤنلوڈ پرو',
        descEn: 'DMCA compliance and intellectual property copyright takedown request guidelines for TikDownload Pro.',
        descUr: 'ٹک ڈاؤنلوڈ پرو کی ڈی ایم سی اے کاپی رائٹ پالیسی۔',
      },
    };

    const currentMeta = titles[currentView] || titles.home;
    const titleText = lang === 'ur' ? currentMeta.ur : currentMeta.en;
    const descText = lang === 'ur' ? currentMeta.descUr : currentMeta.descEn;

    document.title = titleText;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descText);

    // Update Absolute Canonical & Open Graph URLs
    const canonicalUrl = currentView === 'home'
      ? 'https://tikdownloadpro.online/'
      : `https://tikdownloadpro.online/${currentView}`;

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', titleText);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descText);

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', titleText);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', descText);

    // Structured Data (JSON-LD)
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';

    const schemaData = [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'TikDownload Pro',
        operatingSystem: 'All',
        applicationCategory: 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Fast, free, and premium TikTok video downloader without watermark. Download HD MP4 and MP3 audio instantly.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do I need to create an account or sign up?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, absolutely not! TikDownload Pro requires no registration, signup, or login. You can open the website anytime, paste your TikTok link, and download your video immediately.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I download TikTok videos without watermark on iPhone (iOS)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'On your iPhone, open the TikTok app, tap "Share" and "Copy Link". Open Safari, visit TikDownload Pro, paste the URL and tap Download. When prompted by Safari, tap "Download", and the video will be saved directly to your Files or Photos gallery.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where are downloaded TikTok videos saved on my PC or Android?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Videos are automatically saved in your device\'s default "Downloads" folder or your mobile Photos/Gallery app.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is TikDownload Pro completely free and safe to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! TikDownload Pro is 100% free, virus-free, and SSL encrypted. We never ask for sensitive permissions, passwords, or personal data.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download TikTok audio in MP3 format?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After entering the video link, simply click the "Download Audio (MP3 320kbps)" button to extract and save the background sound or song directly.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does TikDownload Pro store copies of downloaded videos or track users?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TikDownload Pro does not host, store, or archive any videos on its servers. All media is fetched directly from TikTok\'s public CDN and delivered straight to your device with zero tracking.',
            },
          },
        ],
      },
    ];

    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

  }, [currentView, lang]);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    const newPath = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== newPath || window.location.hash) {
      window.history.pushState({ view }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Default Monitored Ad Settings for Owner Earning
  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    try {
      const saved = localStorage.getItem('tiksave_ad_settings');
      return saved ? JSON.parse(saved) : DEFAULT_AD_SETTINGS;
    } catch {
      return DEFAULT_AD_SETTINGS;
    }
  });

  // Download History (stored locally in client browser)
  const [history, setHistory] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('tiksave_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals (Owner Secret Admin, Batch, Trending)
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);

  // Check if owner opened URL with ?admin=1 or secret hash
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || params.get('admin') === 'ads') {
      setIsAdsModalOpen(true);
    }
  }, []);

  // Save ad settings to localStorage
  const handleSaveAdSettings = (newSettings: AdSettings) => {
    setAdSettings(newSettings);
    try {
      localStorage.setItem('tiksave_ad_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  // Record item to download history
  const handleRecordHistory = (type: any) => {
    if (!videoData) return;
    const newItem: DownloadHistoryItem = {
      id: videoData.id,
      title: videoData.title,
      authorNickname: videoData.author?.nickname || 'Creator',
      authorHandle: videoData.author?.unique_id || 'creator',
      authorAvatar: videoData.author?.avatar,
      cover: videoData.cover,
      playUrl: videoData.playUrl || videoData.hdPlayUrl,
      downloadedAt: Date.now(),
      type,
    };

    const updated = [newItem, ...history.filter((h) => h.id !== videoData.id)].slice(0, 8);
    setHistory(updated);
    try {
      localStorage.setItem('tiksave_history', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('tiksave_history');
    } catch (e) {
      // ignore
    }
  };

  // Perform TikTok Video Fetch with robust JSON error handling
  const handleDownload = async (customUrl?: string) => {
    const rawTarget = customUrl !== undefined ? customUrl : url;
    const targetUrl = (rawTarget || '').trim();
    if (!targetUrl) return;

    if (customUrl) {
      setUrl(customUrl);
    }

    setIsLoading(true);
    setError(null);

    // If currently on another page, return to home view
    if (currentView !== 'home') {
      navigateTo('home');
    }

    try {
      // Use relative API path /api/download
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const contentType = res.headers.get('content-type') || '';
      let json: any = null;

      if (contentType.includes('application/json')) {
        try {
          json = await res.json();
        } catch {
          json = null;
        }
      } else {
        // If server returned non-JSON (e.g. HTML 404/500/502 error page), avoid raw SyntaxError
        const text = await res.text().catch(() => '');
        console.warn('Received non-JSON response from /api/download:', res.status, text.slice(0, 80));
      }

      if (!res.ok || !json || !json.success || !json.data) {
        let serverErrorMsg = '';
        if (typeof json?.error === 'string') {
          serverErrorMsg = json.error;
        } else if (json?.error && typeof json.error === 'object') {
          serverErrorMsg = json.error.message || json.error.msg || JSON.stringify(json.error);
        } else if (typeof json?.msg === 'string') {
          serverErrorMsg = json.msg;
        }

        const fallbackMsg =
          lang === 'ur'
            ? 'ک��ھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں یا لنک چیک کریں۔'
            : 'Something went wrong, please try again. Please verify the TikTok link.';

        throw new Error(serverErrorMsg || fallbackMsg);
      }

      setVideoData(json.data);
      // Smooth scroll to result
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Download error:', err);

      // Extract readable message string safely
      let extractedMessage = '';
      if (err instanceof Error) {
        extractedMessage = err.message;
      } else if (typeof err === 'string') {
        extractedMessage = err;
      } else if (err && typeof err === 'object') {
        if ('message' in err && typeof (err as any).message === 'string') {
          extractedMessage = (err as any).message;
        } else if ('error' in err && typeof (err as any).error === 'string') {
          extractedMessage = (err as any).error;
        } else if ('msg' in err && typeof (err as any).msg === 'string') {
          extractedMessage = (err as any).msg;
        } else {
          try {
            extractedMessage = JSON.stringify(err);
          } catch {
            extractedMessage = String(err);
          }
        }
      } else {
        extractedMessage = String(err);
      }

      // Ensure no raw [object Object] or JSON syntax error is shown to user
      const isObjectStringOrSyntax =
        !extractedMessage ||
        extractedMessage === '[object Object]' ||
        extractedMessage.includes('[object Object]') ||
        extractedMessage.includes('Unexpected token') ||
        extractedMessage.includes('is not valid JSON');

      const userFriendlyMessage = isObjectStringOrSyntax
        ? (lang === 'ur'
            ? 'کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں۔'
            : 'Something went wrong, please check the link and try again.')
        : extractedMessage;

      setError(userFriendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Window-level global paste listener for seamless automatic fetching on paste
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      // If user is typing in a textarea or input other than the search box, ignore
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'TEXTAREA' || (activeEl.tagName === 'INPUT' && activeEl.id !== 'tiktok-url-input'))) {
        return;
      }

      const pastedText = e.clipboardData?.getData('text');
      if (pastedText) {
        const trimmed = pastedText.trim();
        if (/(?:https?:\/\/)?(?:vm\.|vt\.|www\.|v\.)?tiktok\.com\/[a-zA-Z0-9_@&/?=-]+/i.test(trimmed) || trimmed.startsWith('http')) {
          setUrl(trimmed);
          handleDownload(trimmed);
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [currentView, lang]);

  // Sample quick select
  const handleSelectSample = (sampleKey: string) => {
    setUrl(`https://sample.tiktok.com/${sampleKey}`);
    handleDownload(`https://sample.tiktok.com/${sampleKey}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Monetag In-Page Push Non-Intrusive Corner Positioner */}
      <MonetagAdManager />

      {/* Navigation Header (Clean, professional, with no visitor ad calculators) */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenBatch={() => setIsBatchModalOpen(true)}
        onOpenTrending={() => setIsTrendingModalOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Real Adsterra 728x90 Banner Slot (Top Leaderboard) */}
      <AdsterraBanner id="adsterra-banner-header" className="mt-2" />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Standalone Privacy Policy Page */}
        {currentView === 'privacy' && (
          <div className="w-full">
            <AdsterraBanner id="adsterra-banner-privacy" className="pt-4 pb-2" />
            <PrivacyPolicyPage onBack={() => navigateTo('home')} lang={lang} />
          </div>
        )}

        {/* VIEW 2: Standalone Terms of Service Page */}
        {currentView === 'terms' && (
          <div className="w-full">
            <AdsterraBanner id="adsterra-banner-terms" className="pt-4 pb-2" />
            <TermsOfServicePage onBack={() => navigateTo('home')} lang={lang} />
          </div>
        )}

        {/* VIEW 3: Standalone DMCA & Copyright Policy Page */}
        {currentView === 'dmca' && (
          <div className="w-full">
            <AdsterraBanner id="adsterra-banner-dmca" className="pt-4 pb-2" />
            <DmcaPolicyPage onBack={() => navigateTo('home')} lang={lang} />
          </div>
        )}

        {/* VIEW 4: Standalone About Us Page */}
        {currentView === 'about' && (
          <div className="w-full">
            <AdsterraBanner id="adsterra-banner-about" className="pt-4 pb-2" />
            <AboutUsPage onBack={() => navigateTo('home')} lang={lang} />
          </div>
        )}

        {/* VIEW 5: Standalone Contact Us Page */}
        {currentView === 'contact' && (
          <div className="w-full">
            <AdsterraBanner id="adsterra-banner-contact" className="pt-4 pb-2" />
            <ContactUsPage onBack={() => navigateTo('home')} lang={lang} />
          </div>
        )}

        {/* VIEW 6 (DEFAULT): Main Video Downloader Tool */}
        {currentView === 'home' && (
          <>
            {/* Downloader Hero Input */}
            <DownloaderHero
              url={url}
              setUrl={setUrl}
              onDownload={(targetUrl) => handleDownload(targetUrl)}
              isLoading={isLoading}
              error={error}
              lang={lang}
              onSelectSample={handleSelectSample}
            />

            {/* Real Adsterra 728x90 Banner Slot (Top Placement) */}
            <AdsterraBanner id="adsterra-banner-top" className="my-4" />

            {/* Video Download Result Card */}
            {videoData ? (
              <DownloadResult
                video={videoData}
                adSettings={adSettings}
                lang={lang}
                onNewDownload={() => {
                  setVideoData(null);
                  setUrl('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onRecordHistory={handleRecordHistory}
              />
            ) : (
              /* Recent Downloads History (if any) */
              history.length > 0 && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ur' ? 'حالیہ ڈاؤنلوڈز' : 'Recent Downloads History'}</span>
                    </h3>
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-neutral-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-2.5 flex flex-col justify-between group hover:border-neutral-700 transition-all"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-2 bg-neutral-950">
                          <img
                            src={item.cover}
                            alt={item.title ? `Thumbnail for ${item.title}` : 'TikTok downloaded video history preview'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white truncate">{item.title || 'TikTok Video'}</p>
                          <p className="text-[11px] text-neutral-400 truncate">@{item.authorHandle}</p>
                        </div>

                        <button
                          onClick={() => handleDownload(`https://sample.tiktok.com/${item.id}`)}
                          className="mt-2 w-full py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-bold text-neutral-300 hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-rose-400" />
                          <span>Download Again</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* How to Download Steps */}
            <HowToUse lang={lang} />

            {/* Features Showcase */}
            <FeaturesShowcase lang={lang} />

            {/* FAQ Section */}
            <FaqSection lang={lang} />

            {/* Rich SEO Original Text Content Block (Below the fold) */}
            <SeoContentSection lang={lang} />

            {/* Real Adsterra 728x90 Banner Slot (Footer Placement above footer links) */}
            <AdsterraBanner id="adsterra-banner-footer" className="my-6" />
          </>
        )}

      </main>

      {/* Footer with Dedicated Legal & Support Page Navigation */}
      <Footer
        lang={lang}
        onNavigate={navigateTo}
        onOpenSecretAdmin={() => setIsAdsModalOpen(true)}
      />

      {/* Owner-Only Secret Monetization Modal (Not shown to visitors) */}
      <AdSettingsModal
        isOpen={isAdsModalOpen}
        onClose={() => setIsAdsModalOpen(false)}
        settings={adSettings}
        onSaveSettings={handleSaveAdSettings}
        lang={lang}
      />

      {/* Batch Downloader Modal */}
      <BatchDownloaderModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        lang={lang}
      />

      {/* Trending Discovery Modal */}
      <TrendingExplore
        isOpen={isTrendingModalOpen}
        onClose={() => setIsTrendingModalOpen(false)}
        onSelectVideo={(sampleKey) => handleSelectSample(sampleKey)}
        lang={lang}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DownloaderHero } from './components/DownloaderHero';
import { DownloadResult } from './components/DownloadResult';
import { AdBanner } from './components/AdBanner';
import { HowToUse } from './components/HowToUse';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AdSettingsModal } from './components/AdSettingsModal';
import { BatchDownloaderModal } from './components/BatchDownloaderModal';
import { TrendingExplore } from './components/TrendingExplore';

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
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Listen to hash changes for direct linking & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['privacy', 'terms', 'dmca', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update Page Title, Meta Description, Open Graph and Structured Data on route change
  useEffect(() => {
    const titles: Record<string, { en: string; ur: string; descEn: string; descUr: string }> = {
      home: {
        en: 'TikSave Pro - TikTok Video Downloader (No Watermark HD)',
        ur: 'ٹک سیو پرو - بغیر واٹر مارک ٹک ٹاک ویڈیو ڈاؤنلوڈر',
        descEn: 'Download TikTok videos without watermark in crisp 1080p Full HD MP4 and MP3 audio instantly. 100% free with no login required.',
        descUr: 'بغیر واٹر مارک ٹک ٹاک ویڈیوز اور ایم پی تھری آڈیو فل ایچ ڈی میں ڈاؤنلوڈ کریں۔ تیز رفتار اور بالکل مفت۔',
      },
      about: {
        en: 'About TikSave Pro - High Speed TikTok Video Downloader',
        ur: 'ہمارے بارے میں - ٹک سیو پرو',
        descEn: 'Learn more about TikSave Pro, the leading fast and free media downloader for TikTok content creators and digital editors.',
        descUr: 'ٹک سیو پرو کے بارے میں جانیے، دنیا کا تیز ترین ٹک ٹاک ڈاؤنلوڈر۔',
      },
      contact: {
        en: 'Contact Us - TikSave Pro Support & Inquiries',
        ur: 'ہم سے رابطہ کریں - ٹک سیو پرو',
        descEn: 'Get in touch with the TikSave Pro support team for general inquiries, feedback, DMCA notices, and creator assistance.',
        descUr: 'ٹک سیو پرو کی کسٹمر سپورٹ ٹیم سے فوری رابطہ کریں۔',
      },
      privacy: {
        en: 'Privacy Policy - TikSave Pro',
        ur: 'پرائیویسی پالیسی - ٹک سیو پرو',
        descEn: 'TikSave Pro privacy policy detailing our zero-logging, anonymous usage, and data protection practices.',
        descUr: 'ٹک سیو پرو کی پرائیویسی پالیسی اور ڈیٹا کے تحفظ کی تفصیلات۔',
      },
      terms: {
        en: 'Terms of Service - TikSave Pro',
        ur: 'استعمال کی شرائط - ٹک سیو پرو',
        descEn: 'Terms and conditions governing the use of TikSave Pro video downloader services and media utilities.',
        descUr: 'ٹک سیو پرو کی شرائط و ضوابط۔',
      },
      dmca: {
        en: 'DMCA Copyright Policy - TikSave Pro',
        ur: 'کاپی رائٹ پالیسی - ٹک سیو پرو',
        descEn: 'DMCA compliance and intellectual property copyright takedown request guidelines for TikSave Pro.',
        descUr: 'ٹک سیو پرو کی ڈی ایم سی اے کاپی رائٹ پالیسی۔',
      },
    };

    const currentMeta = titles[currentView] || titles.home;
    const titleText = lang === 'ur' ? currentMeta.ur : currentMeta.en;
    const descText = lang === 'ur' ? currentMeta.descUr : currentMeta.descEn;

    document.title = titleText;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descText);

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

    // Update Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentView === 'home' ? './' : `#${currentView}`);
    }

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
        name: 'TikSave Pro',
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
              text: 'No, absolutely not! TikSave Pro requires no registration, signup, or login. You can open the website anytime, paste your TikTok link, and download your video immediately.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I download TikTok videos without watermark on iPhone (iOS)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'On your iPhone, open the TikTok app, tap "Share" and "Copy Link". Open Safari, visit TikSave Pro, paste the URL and tap Download. When prompted by Safari, tap "Download", and the video will be saved directly to your Files or Photos gallery.',
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
            name: 'Is TikSave Pro completely free and safe to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! TikSave Pro is 100% free, virus-free, and SSL encrypted. We never ask for sensitive permissions, passwords, or personal data.',
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
            name: 'Does TikSave Pro store copies of downloaded videos or track users?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. TikSave Pro does not host, store, or archive any videos on its servers. All media is fetched directly from TikTok\'s public CDN and delivered straight to your device with zero tracking.',
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
    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
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
        const errorMsg =
          json?.error ||
          (lang === 'ur'
            ? 'کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں یا لنک چیک کریں۔'
            : 'Something went wrong, please try again. Please verify the TikTok link.');
        throw new Error(errorMsg);
      }

      setVideoData(json.data);
      // Smooth scroll to result
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Download error:', err);
      // Ensure user-friendly message is shown instead of raw token / syntax errors
      const isSyntaxOrTokenError =
        err?.message?.includes('JSON') ||
        err?.message?.includes('Unexpected token') ||
        err?.message?.includes('is not valid JSON');

      const friendlyMessage = isSyntaxOrTokenError
        ? (lang === 'ur' ? 'کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں۔' : 'Something went wrong, please try again.')
        : (err.message || (lang === 'ur' ? 'کچھ غلط ہو گیا، براہ کرم دوبارہ کوشش کریں۔' : 'Something went wrong, please try again.'));

      setError(friendlyMessage);
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
      
      {/* Navigation Header (Clean, professional, with no visitor ad calculators) */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenBatch={() => setIsBatchModalOpen(true)}
        onOpenTrending={() => setIsTrendingModalOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Top Banner Ad Leaderboard (Earnings for Site Owner) */}
      <AdBanner type="top_leaderboard" settings={adSettings} className="mt-2" />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Standalone Privacy Policy Page */}
        {currentView === 'privacy' && (
          <PrivacyPolicyPage onBack={() => navigateTo('home')} lang={lang} />
        )}

        {/* VIEW 2: Standalone Terms of Service Page */}
        {currentView === 'terms' && (
          <TermsOfServicePage onBack={() => navigateTo('home')} lang={lang} />
        )}

        {/* VIEW 3: Standalone DMCA & Copyright Policy Page */}
        {currentView === 'dmca' && (
          <DmcaPolicyPage onBack={() => navigateTo('home')} lang={lang} />
        )}

        {/* VIEW 4: Standalone About Us Page */}
        {currentView === 'about' && (
          <AboutUsPage onBack={() => navigateTo('home')} lang={lang} />
        )}

        {/* VIEW 5: Standalone Contact Us Page */}
        {currentView === 'contact' && (
          <ContactUsPage onBack={() => navigateTo('home')} lang={lang} />
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
                            alt={item.title}
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
          </>
        )}

      </main>

      {/* Sticky Bottom Floating Banner Ad */}
      <AdBanner type="sticky_bottom" settings={adSettings} />

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

    </div>
  );
}

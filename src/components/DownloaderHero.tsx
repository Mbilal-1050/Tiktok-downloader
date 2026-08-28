import React, { useState } from 'react';
import { Download, Clipboard, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface DownloaderHeroProps {
  url: string;
  setUrl: (url: string) => void;
  onDownload: (urlToFetch?: string) => void;
  isLoading: boolean;
  error: string | null;
  lang: 'en' | 'ur';
  onSelectSample: (sampleUrl: string) => void;
}

export const DownloaderHero: React.FC<DownloaderHeroProps> = ({
  url,
  setUrl,
  onDownload,
  isLoading,
  error,
  lang,
  onSelectSample,
}) => {
  const [copied, setCopied] = useState(false);
  const [pasteToast, setPasteToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setPasteToast(msg);
    setTimeout(() => setPasteToast(null), 3500);
  };

  // Synchronous clipboard read handler directly tied to user click gesture
  const handlePaste = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        showToast(lang === 'ur' ? 'براہ کرم لنک دستی طور پر پیسٹ کریں۔' : 'Please allow clipboard access or paste manually.');
        return;
      }

      const text = await navigator.clipboard.readText();
      const trimmed = text ? text.trim() : '';

      if (trimmed) {
        setUrl(trimmed);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Auto-fetch immediately on paste!
        onDownload(trimmed);
      } else {
        showToast(lang === 'ur' ? 'کلپ بورڈ خالی ہے۔' : 'Clipboard is empty. Please copy a TikTok link first.');
      }
    } catch (err) {
      console.warn('Clipboard permission rejected or failed:', err);
      showToast(lang === 'ur' ? 'کلپ بورڈ کی اجازت دیں یا لنک دستی طور پر پیسٹ کریں۔' : 'Please allow clipboard access or paste manually.');
    }
  };

  // Auto-fetch on native Ctrl+V / Right Click -> Paste
  const handleNativePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData?.getData('text');
    if (pasted) {
      const trimmed = pasted.trim();
      setUrl(trimmed);
      // Auto-trigger video resolve immediately without needing separate click
      setTimeout(() => {
        onDownload(trimmed);
      }, 50);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);

    // If a full TikTok link is typed/inserted into the box, auto-trigger
    if (val && /(?:https?:\/\/)?(?:vm\.|vt\.|www\.|v\.)?tiktok\.com\/[a-zA-Z0-9_@&/?=-]+/i.test(val.trim())) {
      const trimmed = val.trim();
      // Debounced slight check so it doesn't trigger on partial typing
      if (trimmed.length > 20) {
        onDownload(trimmed);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onDownload(url.trim());
    }
  };

  const sampleButtons = [
    { label: '🏔️ Alps Sunset HD', sampleKey: 'sample_nature_721' },
    { label: '🤖 AI Tools Viral', sampleKey: 'sample_tech_ai' },
    { label: '👨‍🍳 Crispy Recipe', sampleKey: 'sample_cooking_recipe' },
  ];

  return (
    <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-600/20 via-purple-600/10 to-cyan-500/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Top Trending Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 mb-6 shadow-inner">
        <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
        <span className="text-rose-400 font-bold">2026 UPDATE:</span>
        <span>
          {lang === 'ur' ? 'فل ایچ ڈی بغیر واٹر مارک ڈاؤن لوڈنگ' : '100% Free • No Watermark • Ultra HD'}
        </span>
      </div>

      {/* Hero Headline (Main H1 for the page) */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
        {lang === 'ur' ? (
          <>
            ٹک ٹاک ویڈیوز ڈاؤنلوڈر <br />
            <span className="tiktok-gradient-text">بغیر واٹر مارک فل ایچ ڈی</span>
          </>
        ) : (
          <>
            Download TikTok Videos <br />
            <span className="tiktok-gradient-text">Without Watermark (HD)</span>
          </>
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
        {lang === 'ur'
          ? 'کوئی لاگ ان یا سائن اپ کی ضرورت نہیں! بس ویڈیو کا لنک پیسٹ کریں اور ایک کلک میں ایچ ڈی ویڈیو اور ایم پی تھری آڈیو ڈاؤن لوڈ کریں۔'
          : 'Fast, unlimited and 100% free TikTok video & MP3 audio downloader. Works on all smartphones, iPhone, Android, and PC.'}
      </p>

      {/* Search / Paste Input Form */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 shadow-2xl backdrop-blur-xl focus-within:border-rose-500/80 transition-all"
        >
          {/* Input field with paste and clear icons */}
          <div className="relative flex-1 flex items-center min-w-0">
            <input
              id="tiktok-url-input"
              type="text"
              value={url}
              onChange={handleInputChange}
              onPaste={handleNativePaste}
              placeholder={
                lang === 'ur'
                  ? 'ٹک ٹاک ویڈیو کا لنک یہاں پیسٹ کریں...'
                  : 'Paste TikTok video or slideshow link here (https://www.tiktok.com/@...)'
              }
              className="w-full px-4 py-3.5 pr-20 rounded-xl bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
              disabled={isLoading}
            />

            {/* Clear Button */}
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors mr-1 cursor-pointer"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Paste Button inside Input */}
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-3 py-1.5 mr-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-700 transition-all cursor-pointer"
              title="Paste from clipboard"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{lang === 'ur' ? 'پیسٹ ہو گیا' : 'Pasted'}</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lang === 'ur' ? 'پیسٹ' : 'Paste'}</span>
                </>
              )}
            </button>
          </div>

          {/* Big Download Button */}
          <button
            id="download-submit-btn"
            type="submit"
            disabled={isLoading || !url.trim()}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-base text-white bg-gradient-to-r from-rose-500 via-rose-600 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{lang === 'ur' ? 'پروسیسنگ...' : 'Processing...'}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{lang === 'ur' ? 'ڈاؤنلوڈ کریں' : 'Download'}</span>
              </>
            )}
          </button>
        </form>

        {/* Small Clipboard Toast Notification */}
        {pasteToast && (
          <div className="mt-3 p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-amber-300 text-xs flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>{pasteToast}</span>
          </div>
        )}

        {/* Error Alert Message */}
        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs sm:text-sm flex items-center justify-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Test / Sample Video Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
          <span className="font-semibold text-neutral-500">
            {lang === 'ur' ? 'فوری ٹیسٹ کریں:' : '⚡ Instant Test Demo:'}
          </span>
          {sampleButtons.map((sample) => (
            <button
              key={sample.sampleKey}
              onClick={() => onSelectSample(sample.sampleKey)}
              className="px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <p className="text-xs font-bold text-white">🚫 No Watermark</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Clean original video</p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <p className="text-xs font-bold text-white">💎 Full HD / 4K</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Highest source quality</p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <p className="text-xs font-bold text-white">🎵 MP3 Audio</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Extract audio tracks</p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <p className="text-xs font-bold text-white">⚡ Instant & Free</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">No login or limits</p>
          </div>
        </div>
      </div>
    </section>
  );
};


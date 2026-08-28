import React, { useState } from 'react';
import {
  X,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Sliders,
  Code,
  ShieldCheck,
  Zap,
  Info,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { AdSettings } from '../types';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdSettings;
  onSaveSettings: (newSettings: AdSettings) => void;
  lang: 'en' | 'ur';
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  lang,
}) => {
  const [localSettings, setLocalSettings] = useState<AdSettings>(settings);
  const [activeTab, setActiveTab] = useState<'controls' | 'calculator' | 'guide'>('controls');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Revenue Calculator state
  const [dailyVisitors, setDailyVisitors] = useState(25000);
  const [averageCpm, setAverageCpm] = useState(3.5); // $3.50 CPM typical for Tier 2/1 mix

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(localSettings);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const estimatedDailyRevenue = ((dailyVisitors * 2.5) / 1000) * averageCpm;
  const estimatedMonthlyRevenue = estimatedDailyRevenue * 30;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-700 p-5 sm:p-7 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <span>{lang === 'ur' ? 'ایڈز اور کمائی کا سیٹ اپ' : 'Ad Monetization & Revenue Setup'}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                PRO EARNINGS
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'ur'
                ? 'گوگل ایڈسینس، ایڈسٹیرا یا ڈائریکٹ سپانسر لنکس کنٹرول کریں'
                : 'Configure Google AdSense, Adsterra, PropellerAds & Direct Sponsors'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-neutral-800 mb-6">
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'controls'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              {lang === 'ur' ? 'ایڈ پوزیشنز' : 'Ad Placements'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'ur' ? 'کمائی کا حساب' : 'Revenue Calculator'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'guide'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              {lang === 'ur' ? 'ایڈز گائیڈ (اردو)' : 'Setup Guide'}
            </span>
          </button>
        </div>

        {/* Tab 1: Ad Controls & Network Selection */}
        {activeTab === 'controls' && (
          <div className="space-y-4">
            
            {/* Master Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div>
                <p className="text-sm font-bold text-white">Enable Website Ads</p>
                <p className="text-xs text-neutral-400">Show high-converting banners & sponsored units</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.enabled}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, enabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Network Preset Selector */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <label className="text-xs font-bold text-neutral-300">Selected Ad Monetization Network</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'adsense', label: 'Google AdSense', badge: 'High RPM' },
                  { key: 'adsterra', label: 'Adsterra', badge: 'Instant Approval' },
                  { key: 'propeller', label: 'PropellerAds', badge: 'Pop/Push' },
                  { key: 'custom', label: 'Direct Sponsor', badge: 'Custom Link' },
                ].map((net) => (
                  <button
                    key={net.key}
                    type="button"
                    onClick={() =>
                      setLocalSettings({ ...localSettings, network: net.key as any })
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      localSettings.network === net.key
                        ? 'border-emerald-500 bg-emerald-950/40 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{net.label}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">{net.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Placement Toggles */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Active Placement Slots
              </p>

              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Top Header Leaderboard (728x90 / 320x50)</span>
                <input
                  type="checkbox"
                  checked={localSettings.bannerTopEnabled}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, bannerTopEnabled: e.target.checked })
                  }
                  className="rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>In-Feed Download Result Ad (Between download servers)</span>
                <input
                  type="checkbox"
                  checked={localSettings.inFeedEnabled}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, inFeedEnabled: e.target.checked })
                  }
                  className="rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Download Interstitial Timer (3-sec sponsor counter)</span>
                <input
                  type="checkbox"
                  checked={localSettings.interstitialEnabled}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, interstitialEnabled: e.target.checked })
                  }
                  className="rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Sticky Floating Bottom Bar</span>
                <input
                  type="checkbox"
                  checked={localSettings.stickyBottomEnabled}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, stickyBottomEnabled: e.target.checked })
                  }
                  className="rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-0"
                />
              </div>
            </div>

            {/* Direct Affiliate / Sponsor Link */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">
                Custom Adsterra Direct Link / Affiliate URL
              </label>
              <input
                type="text"
                value={localSettings.adsterraDirectLink || ''}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, adsterraDirectLink: e.target.value })
                }
                placeholder="https://beta.publishers.adsterra.com/direct-link/..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-500">
                Users clicking the promotional download buttons will be routed to your affiliate URL.
              </p>
            </div>

          </div>
        )}

        {/* Tab 2: Revenue Estimator Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80">
                <p className="text-[11px] font-bold uppercase text-emerald-400">Estimated Daily Revenue</p>
                <h4 className="text-2xl font-black text-white font-display mt-1">
                  ${estimatedDailyRevenue.toFixed(2)}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-1">based on ~{dailyVisitors.toLocaleString()} daily visitors</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-cyan-950/60 border border-emerald-700">
                <p className="text-[11px] font-bold uppercase text-emerald-300">Estimated Monthly Profit</p>
                <h4 className="text-2xl font-black text-emerald-300 font-display mt-1">
                  ${estimatedMonthlyRevenue.toFixed(0)} <span className="text-xs font-medium text-neutral-400">/mo</span>
                </h4>
                <p className="text-[10px] text-neutral-300 mt-1">Passive ad earnings</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Daily Visitors:</span>
                  <span className="text-cyan-400">{dailyVisitors.toLocaleString()} users/day</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={dailyVisitors}
                  onChange={(e) => setDailyVisitors(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Estimated CPM Rate ($):</span>
                  <span className="text-emerald-400">${averageCpm.toFixed(2)} CPM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={averageCpm}
                  onChange={(e) => setAverageCpm(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              💡 <strong>Why TikTok Downloaders Make Huge Profits:</strong> Each visitor typically downloads 2 to 4 videos per session, generating 6-10 ad impressions per user with extremely high click-through rates.
            </p>

          </div>
        )}

        {/* Tab 3: Step-by-Step Earning Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 text-left text-xs leading-relaxed text-neutral-300">
            
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
              <h5 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black text-xs">1</span>
                <span>Adsterra & PropellerAds (فوری اپروول 10 منٹ میں)</span>
              </h5>
              <p className="text-neutral-400">
                اگر آپ کے پاس نیا ڈومین ہے، تو سب سے پہلے <strong>Adsterra.com</strong> یا <strong>PropellerAds</strong> پر فری اکاؤنٹ بنائیں۔ یہ بغیر کسی ٹریفک شرط کے 5 منٹ میں اپروو کر دیتے ہیں۔ آپ وہاں سے "Direct Link" یا "Native Banner" کا لنک لے کر یہاں پیسٹ کر سکتے ہیں۔
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
              <h5 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black text-xs">2</span>
                <span>Google AdSense (ہائی سی پی ایم کے لیے)</span>
              </h5>
              <p className="text-neutral-400">
                گوگل ایڈسینس سب سے زیادہ پیسے دیتا ہے ($3 سے $8 CPM)۔ ایڈسینس اپروول کے لیے ہم نے ویب سائٹ میں Privacy Policy، Terms، DMCA اور FAQs مکمل شامل کر دیے ہیں۔ 1 سے 2 ہفتے بعد ایڈسینس کے لیے اپلائی کریں۔
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
              <h5 className="font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black text-xs">3</span>
                <span>ٹریفک لانے کا آسان طریقہ</span>
              </h5>
              <p className="text-neutral-400">
                ٹک ٹاک اور یوٹیوب شارٹس پر 10 سیکنڈ کی ویڈیوز بنائیں: <em>"How to download TikTok in HD without watermark"</em> اور بائیو میں اپنی ویب سائٹ کا لنک دیں۔ روزانہ 5,000 سے 20,000 ویوز باآسانی مل جاتے ہیں۔
              </p>
            </div>

          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

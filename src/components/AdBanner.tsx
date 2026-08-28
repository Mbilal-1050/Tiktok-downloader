import React, { useState } from 'react';
import { ExternalLink, Info, X } from 'lucide-react';
import { AdSettings } from '../types';

interface AdBannerProps {
  type?: 'top_leaderboard' | 'in_feed' | 'sponsor_card' | 'sticky_bottom';
  settings?: AdSettings;
  className?: string;
  onAdClick?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'top_leaderboard',
  settings,
  className = '',
  onAdClick,
}) => {
  const [closed, setClosed] = useState(false);

  // If ads are disabled or closed, do not render
  if (settings && !settings.enabled) return null;
  if (closed) return null;

  // Custom HTML Ad Injection if configured
  if (settings?.customTopHtml) {
    return (
      <div
        className={`max-w-4xl mx-auto my-3 overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800 p-2 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: settings.customTopHtml }}
      />
    );
  }

  /* AD_SLOT - replace with real ad network code after approval */
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 py-2 ${className}`}>
      <div className="relative group overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/70 p-3 sm:p-4 text-center transition-all hover:border-neutral-700 shadow-sm">
        {/* Generic Ad Label - No Fake Networks */}
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-neutral-800/60 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
          <span>Sponsored</span>
          <span className="flex items-center gap-1 text-neutral-500">
            <Info className="w-2.5 h-2.5" /> Ad
          </span>
        </div>

        <a
          href={settings?.adsterraDirectLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAdClick}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left hover:opacity-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-rose-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
              ⚡
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                Ultra Fast Cloud Storage & Media Suite
                <span className="text-[9px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded font-medium border border-neutral-700">
                  Featured
                </span>
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 line-clamp-1">
                Backup your downloaded TikTok videos with free high-speed cloud drive sync.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all">
              Learn More <ExternalLink className="w-3 h-3 text-neutral-400" />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};


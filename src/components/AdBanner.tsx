import React from 'react';
import { AdsterraBanner } from './AdsterraBanner';
import { AdSettings } from '../types';

interface AdBannerProps {
  id?: string;
  type?: 'top_leaderboard' | 'in_feed' | 'sponsor_card' | 'sticky_bottom';
  settings?: AdSettings;
  className?: string;
  onAdClick?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  id,
  settings,
  className = '',
}) => {
  // If ads are disabled by user settings, do not render
  if (settings && !settings.enabled) return null;

  // Custom HTML Ad Injection if configured
  if (settings?.customTopHtml) {
    return (
      <div
        className={`max-w-4xl mx-auto my-3 overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800 p-2 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: settings.customTopHtml }}
      />
    );
  }

  // Real 728x90 Adsterra Banner Slot
  return <AdsterraBanner id={id} className={className} />;
};

export { AdsterraBanner };



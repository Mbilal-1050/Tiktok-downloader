import React from 'react';
import { Download, ShieldCheck, Heart, FileText, Lock, Globe, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ur';
  onNavigate: (view: string) => void;
  onOpenSecretAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenSecretAdmin }) => {
  return (
    <footer className="mt-20 border-t border-neutral-800/80 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
        
        {/* Col 1: Brand & Bio */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Download className="w-4 h-4" />
            </div>
            <span className="font-display font-extrabold text-lg text-white">
              Tik<span className="text-rose-500">Save</span> PRO
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {lang === 'ur'
              ? 'مفت اور تیز ترین ٹک ٹاک ویڈیو ڈاؤنلوڈر۔ بغیر واٹر مارک ایچ ڈی کوالٹی اور ایم پی تھری آڈیو فوری محفوظ کریں۔'
              : 'The #1 ultra-fast online TikTok video downloader without watermark. 100% free, unlimited, and privacy-focused.'}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-[10px] font-bold text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> 100% Safe & Clean
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-[10px] font-bold text-cyan-400">
              <Lock className="w-3 h-3" /> SSL Secured
            </span>
          </div>
        </div>

        {/* Col 2: Features & Formats */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Supported Formats</h4>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-rose-400 transition-colors">
                • TikTok MP4 (No Watermark HD)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-rose-400 transition-colors">
                • TikTok MP4 (Full HD 1080p Ultra)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                • TikTok MP3 Audio (320kbps Music)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors">
                • TikTok Photo Slideshow / Carousel
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
                • High-Res Video Thumbnail (JPG)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Compliance Pages (Crucial for AdSense) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</h4>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <button
                onClick={() => onNavigate('privacy')}
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Privacy Policy (GDPR / CCPA)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('terms')}
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Terms of Service</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('dmca')}
                className="hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>DMCA & Copyright Takedown</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>About Us & Technology</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact & Support 24/7</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform Disclaimer */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Important Disclaimer</h4>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            TikSave Pro is an independent web utility and is NOT affiliated, endorsed, associated, or sponsored by TikTok, Musical.ly, or ByteDance Ltd.
          </p>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            All videos, audio clips, logos, and trademarks belong to their respective creators and copyright owners.
          </p>
        </div>

      </div>

      {/* Bottom Bar with subtle admin trigger */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
        <p>
          &copy; {new Date().getFullYear()} TikSave Pro. All rights reserved.{' '}
          {/* Subtle secret trigger for website administrator only */}
          {onOpenSecretAdmin && (
            <button
              onClick={onOpenSecretAdmin}
              className="text-neutral-800 hover:text-neutral-600 transition-colors ml-1 cursor-default"
              title="Site Admin"
            >
              &bull;
            </button>
          )}
        </p>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('privacy')} className="hover:text-neutral-400">
            Privacy
          </button>
          <span>&bull;</span>
          <button onClick={() => onNavigate('terms')} className="hover:text-neutral-400">
            Terms
          </button>
          <span>&bull;</span>
          <button onClick={() => onNavigate('dmca')} className="hover:text-neutral-400">
            DMCA
          </button>
          <span>&bull;</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-neutral-400">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};

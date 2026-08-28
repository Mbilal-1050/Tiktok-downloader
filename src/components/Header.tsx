import React from 'react';
import { Download, Layers, Globe, Flame, Info, Mail } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBatch: () => void;
  onOpenTrending: () => void;
  lang: 'en' | 'ur';
  setLang: (lang: 'en' | 'ur') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenBatch,
  onOpenTrending,
  lang,
  setLang,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-all duration-300">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Download className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Tik<span className="text-rose-500">Save</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-rose-500 to-cyan-500 text-white shadow-sm">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
              {lang === 'ur' ? 'بغیر واٹر مارک ٹک ٹاک ڈاؤنلوڈر' : 'TikTok HD Downloader'}
            </span>
          </div>
        </button>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Home / Downloader Link (if on another page) */}
          {currentView !== 'home' && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/60 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'ڈاؤنلوڈر' : 'Downloader'}</span>
            </button>
          )}

          {/* Trending Button */}
          <button
            onClick={onOpenTrending}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            title="Explore Trending TikTok Videos"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lang === 'ur' ? 'ٹرینڈنگ' : 'Trending'}</span>
          </button>

          {/* Batch Downloader Button */}
          <button
            onClick={onOpenBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            title="Batch Downloader (Multiple Links)"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{lang === 'ur' ? 'ملٹی لنکس' : 'Batch Mode'}</span>
          </button>

          {/* About Link */}
          <button
            onClick={() => onNavigate('about')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'text-cyan-400 bg-cyan-950/50 border-cyan-800/60'
                : 'text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800'
            }`}
            title="About Us"
          >
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span>{lang === 'ur' ? 'ہمارے بارے میں' : 'About'}</span>
          </button>

          {/* Contact Link */}
          <button
            onClick={() => onNavigate('contact')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-cyan-400 bg-cyan-950/50 border-cyan-800/60'
                : 'text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800'
            }`}
            title="Contact Support"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>{lang === 'ur' ? 'رابطہ' : 'Contact'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>

        </div>
      </div>
    </header>
  );
};

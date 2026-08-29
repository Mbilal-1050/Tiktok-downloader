import React from 'react';
import { Info, ArrowLeft, Zap, ShieldCheck, Heart, Sparkles, Smartphone, Users, Globe } from 'lucide-react';

interface AboutUsPageProps {
  onBack: () => void;
  lang: 'en' | 'ur';
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack, lang }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-semibold text-neutral-300 hover:text-white transition-all mb-8 shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'ur' ? 'واپس ڈاؤنلوڈر پر جائیں' : 'Back to Downloader'}</span>
      </button>

      {/* Header */}
      <div className="mb-10 text-left border-b border-neutral-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/80 text-purple-400 text-xs font-bold mb-4">
          <Info className="w-3.5 h-3.5" />
          <span>About TikDownload Pro &bull; Next-Gen Media Downloader</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
          {lang === 'ur' ? 'ہمارے بارے میں (About Us)' : 'About TikDownload Pro'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {lang === 'ur'
            ? 'TikDownload Pro دنیا بھر کے کروڑوں صارفین اور مواد تخلیق کاروں کے لیے بغیر واٹر مارک ٹک ٹاک ویڈیوز اور آڈیو ڈاؤنلوڈ کرنے کا سب سے تیز اور محفوظ ترین پلیٹ فارم ہے۔'
            : 'TikDownload Pro is an ultra-fast, high-performance web platform designed to help content creators, video editors, researchers, and everyday fans save and backup TikTok videos in crisp 1080p Full HD without watermarks.'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm text-neutral-300 leading-relaxed text-left">
        
        {/* Mission Statement */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Our Core Mission
          </h2>
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            In modern digital storytelling, creators and audiences need reliable tools to preserve memories, analyze viral video mechanics, or repurpose original content across multiple channels without intrusive overlays. 
          </p>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Our goal is to make video downloading <strong>instantaneous, 100% free, and completely frictionless</strong> — with zero registration barriers, no mandatory software installation, and strict adherence to user privacy.
          </p>
        </div>

        {/* Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Privacy & Security First</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We never ask for user login credentials, phone numbers, or credit card information. Your personal browsing activity stays entirely private.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Ultra Fast Edge Processing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Powered by high-throughput global edge servers, our streaming engine parses links and prepares direct download streams in under 0.8 seconds.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Cross-Device Compatibility</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Whether you are on iOS Safari (iPhone/iPad), Android Chrome, Windows PC, Mac, or Linux, TikDownload Pro works natively in any modern web browser.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Creator Intelligence</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Equipped with smart MP3 extractors, multi-image slideshow carousels, and AI viral hook analytics to empower digital marketing workflows.
            </p>
          </div>

        </div>

        {/* How it Works Technology */}
        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-xl font-bold text-white">How Our Technology Works</h2>
          <p>
            When you enter a public TikTok URL into TikDownload Pro, our backend service contacts TikTok's public endpoints to locate the raw, uncompressed source video file without the dynamic watermark layer attached by client applications. The media stream is then forwarded directly to your device via high-speed browser download streams.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-lg font-bold text-neutral-200">Independent Operation Disclaimer</h2>
          <p className="text-xs text-neutral-400">
            TikDownload Pro is an independent media utility and is not affiliated, endorsed, sponsored, or associated with TikTok, ByteDance Ltd., or any of their respective subsidiaries or affiliates.
          </p>
        </section>

      </div>

    </div>
  );
};

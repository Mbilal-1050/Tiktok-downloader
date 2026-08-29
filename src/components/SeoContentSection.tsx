import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Sparkles, HelpCircle, FileVideo, Music2, Smartphone, Monitor } from 'lucide-react';

interface SeoContentSectionProps {
  lang: 'en' | 'ur';
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({ lang }) => {
  return (
    <section id="about-tool-seo-content" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="rounded-3xl bg-neutral-900/70 border border-neutral-800/80 p-6 sm:p-10 shadow-2xl backdrop-blur-sm space-y-10">
        
        {/* Main Section Header */}
        <div className="border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'جامع گائیڈ اور فیچرز' : 'Comprehensive Guide & Overview'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            {lang === 'ur'
              ? 'ٹک ٹاک ویڈیوز بغیر واٹر مارک ڈاؤنلوڈ کرنے کا بہترین طریقہ'
              : 'Ultimate Free TikTok Video Downloader Without Watermark in HD'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 leading-relaxed">
            {lang === 'ur'
              ? 'TikDownload Pro ایک مفت، محفوظ اور بجلی کی رفتار والا ٹول ہے جو آپ کو بغیر کسی واٹر مارک یا لوگو کے ٹک ٹاک ویڈیوز اور آڈیو ڈاؤنلوڈ کرنے کی سہولت فراہم کرتا ہے۔'
              : 'TikDownload Pro is a premier online web utility engineered to help content creators, video editors, students, and social media enthusiasts save high-definition TikTok videos, carousel photo albums, and crystal-clear MP3 sound extracts without any intrusive watermarks.'}
          </p>
        </div>

        {/* Core Narrative / Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ur' ? 'واٹر مارک ہٹانا کیوں ضروری ہے؟' : 'Why Remove the Bouncing Watermark?'}</span>
            </h3>
            <p>
              When you download a video directly from the official TikTok mobile application, a bouncing logo watermark containing the creator's handle is permanently baked into the top and bottom corners of the video frame. For content creators seeking to repurpose their own original footage across YouTube Shorts, Instagram Reels, Pinterest, and Facebook Stories, this watermark severely harms organic engagement and cross-platform algorithm distribution.
            </p>
            <p>
              <strong>TikDownload Pro</strong> extracts the raw, unadulterated source video directly from the edge CDN stream before the watermark overlay is applied. This delivers an uncompressed, studio-grade 1080p MP4 file ready for seamless cross-posting, video montage editing, or offline archiving.
            </p>
          </div>

          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ur' ? '100% مفت، محفوظ اور نجی' : 'Zero Installation & Complete Privacy'}</span>
            </h3>
            <p>
              Unlike questionable third-party software or browser extensions that require intrusive system permissions and store tracking cookies, TikDownload Pro operates 100% within your web browser. You never need to install APKs, register user accounts, provide passwords, or submit credit card information.
            </p>
            <p>
              Our infrastructure employs strict zero-logging policies. We do not store copies of your downloaded videos or audio files on our servers. All media data is fetched on-the-fly and streamed directly to your local device storage through encrypted HTTPS connections.
            </p>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <FileVideo className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Full HD 1080p & 4K</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Preserves the original framerate and high bitrate of the original upload without dynamic compression.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Music2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">MP3 320kbps Audio</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Extract background soundtracks, viral voice clips, and trending music remixes in studio-quality MP3 format.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Universal Device Support</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Seamlessly compatible with iPhone (iOS Safari), Android (Chrome, Samsung Internet), macOS, Windows, and Linux.
            </p>
          </div>

        </div>

        {/* Step-by-Step Instructions & AdSense Depth Section */}
        <div className="border-t border-neutral-800 pt-8 space-y-4 text-sm text-neutral-300 leading-relaxed">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>How to Download TikTok Videos on Any Device</span>
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-neutral-400 pl-2">
            <li>
              <strong className="text-neutral-200">Copy the Video Link:</strong> Open the TikTok application on your smartphone or visit tiktok.com in your desktop web browser. Navigate to the video or slideshow you wish to download, tap the "Share" arrow icon, and select "Copy Link".
            </li>
            <li>
              <strong className="text-neutral-200">Paste URL into TikDownload Pro:</strong> Return to our homepage and paste the copied link into the top input bar. You can also tap the convenient "Paste Link" button for 1-click clipboard insertion.
            </li>
            <li>
              <strong className="text-neutral-200">Select Format and Save:</strong> Click the "Download" button to parse the media stream. Choose your desired output format—including No-Watermark HD MP4, 1080p Ultra, high-fidelity MP3 audio, or individual slideshow photo files—to save the file directly to your device.
            </li>
          </ol>
        </div>

        {/* Ethical Fair Use Note */}
        <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800/80 text-xs text-neutral-400 leading-relaxed">
          <p>
            <strong className="text-white">Legal & Ethical Fair Use Reminder:</strong> TikDownload Pro is intended solely for personal backup, offline research, academic study, and legitimate fair-use remixing. Please respect the copyright, moral rights, and commercial ownership of original content creators. Never re-upload or monetize copyrighted material without obtaining explicit authorization or licenses from the respective rights holder.
          </p>
        </div>

      </div>
    </section>
  );
};

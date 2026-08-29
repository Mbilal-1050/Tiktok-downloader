import React from 'react';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, Scale, ShieldAlert, BookOpen } from 'lucide-react';

interface TermsOfServicePageProps {
  onBack: () => void;
  lang: 'en' | 'ur';
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBack, lang }) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-400 text-xs font-bold mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Effective Date: August 2026 &bull; Terms of Use</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
          {lang === 'ur' ? 'استعمال کی شرائط (Terms of Service)' : 'Terms of Service'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {lang === 'ur'
            ? 'TikDownload Pro استعمال کرنے سے پہلے برائے مہربانی ان شرائط و ضوابط کو بغور پڑھیں۔ ہماری ویب سائٹ استعمال کرنے کا مطلب ہے کہ آپ ان تمام شرائط سے متفق ہیں۔'
            : 'Please read these Terms of Service carefully before using TikDownload Pro. By accessing or using our platform, you acknowledge and agree to be bound by these terms.'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm text-neutral-300 leading-relaxed text-left">

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using the TikDownload Pro website, services, and online tools (collectively, the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you must discontinue the use of our services immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Permitted Use and Fair Use Policy</h2>
          <p>
            TikDownload Pro is provided as a utility tool to assist users in saving, archiving, and previewing public video and audio media for strictly <strong>personal, educational, and non-commercial fair-use purposes</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Acceptable Use Guidelines
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400 pl-2">
              <li>Backing up your own created videos and content.</li>
              <li>Offline viewing of public videos for personal entertainment.</li>
              <li>Academic research, analysis, and fair educational review.</li>
              <li>Respecting the moral and economic rights of the original content creators.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights & Content Ownership</h2>
          <p>
            TikDownload Pro does <strong>NOT claim any ownership or copyright</strong> over the media, sounds, images, or videos processed through our platform. All trademarks, copyrights, audio tracks, and visual assets belong to their respective creators, publishers, and platforms (including TikTok and ByteDance Ltd.).
          </p>
          <p>
            Users are solely responsible for ensuring that their download and subsequent use of any media does not infringe upon any third-party intellectual property rights or applicable copyright laws.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Prohibited Activities</h2>
          <p>When using TikDownload Pro, you agree NOT to:</p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pl-2">
            <li>Use the service for commercial resale, distribution, or monetization of content created by other individuals without explicit copyright licenses.</li>
            <li>Attempt to bypass security barriers, execute automated DDoS attacks, or scrape our backend endpoints via malicious botnets.</li>
            <li>Download private, confidential, or restricted content without authorized access.</li>
            <li>Distribute hateful, defamatory, illegal, or abusive media downloaded through our service.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Disclaimer of Warranties</h2>
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-200/90 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              "AS-IS" AND "AS-AVAILABLE" SERVICE
            </div>
            TikDownload Pro is provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. We do not guarantee that the service will be uninterrupted, error-free, or compatible with future modifications made to third-party social media platforms.
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
          <p>
            In no event shall TikDownload Pro, its operators, affiliates, or contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, our service.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Third-Party Links & Advertisements</h2>
          <p>
            Our service may display advertisements and links to third-party web properties. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-xl font-bold text-white">8. Changes to Terms & Inquiries</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. Continued use of the Service after revisions constitutes your acceptance of the updated terms.
          </p>
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between mt-3">
            <span className="font-mono text-xs sm:text-sm text-cyan-400">legal@tikdownloadpro.online</span>
            <span className="text-xs text-neutral-400">Legal Department</span>
          </div>
        </section>

      </div>

    </div>
  );
};

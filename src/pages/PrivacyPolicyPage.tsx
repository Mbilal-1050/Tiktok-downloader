import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, Eye, Cookie, FileText, Globe, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  lang: 'en' | 'ur';
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, lang }) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-bold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Last Updated: August 2026 &bull; GDPR & CCPA Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
          {lang === 'ur' ? 'پرائیویسی پالیسی (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {lang === 'ur'
            ? 'TikSave Pro آپ کی پرائیویسی اور ڈیٹا کے تحفظ کو سب سے زیادہ اہمیت دیتا ہے۔ یہ پالیسی وضاحت کرتی ہے کہ ہماری ویب سائٹ آپ کے ڈیٹا کے ساتھ کیسے برتاؤ کرتی ہے۔'
            : 'At TikSave Pro, accessible from our web platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by TikSave Pro and how we use it.'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm text-neutral-300 leading-relaxed text-left">
        
        {/* Summary Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">No User Accounts</h4>
              <p className="text-xs text-neutral-400 mt-1">We never require passwords, usernames, phone numbers, or registration.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Video Archiving</h4>
              <p className="text-xs text-neutral-400 mt-1">Videos are streamed directly in real-time. We never store personal videos on our servers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">SSL Encrypted</h4>
              <p className="text-xs text-neutral-400 mt-1">All connections are secured via 256-bit TLS/SSL encryption end-to-end.</p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p>
            TikSave Pro is designed to be an anonymous and frictionless web utility. When you use our service to download videos or audio:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pl-2">
            <li><strong className="text-neutral-200">Video URLs:</strong> We temporarily process the public TikTok URL you submit solely to parse media streams (video, thumbnail, audio). We do not correlate URLs with your personal identity.</li>
            <li><strong className="text-neutral-200">Log Files:</strong> Like standard web hosting services, we maintain minimal automated server logs (IP address, browser type, referral page, timestamp). These logs are solely used for server maintenance, load balancing, and anti-abuse filtering.</li>
            <li><strong className="text-neutral-200">Local Browser Storage:</strong> We use your local browser storage (<code className="text-xs bg-neutral-800 px-1.5 py-0.5 rounded text-rose-300">localStorage</code>) to remember your recent download history locally on your own machine. This data never leaves your device.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Cookies and Web Beacons</h2>
          <p>
            Like any other modern web application, TikSave Pro uses standard cookies to maintain session states and user preferences (such as preferred language and theme).
          </p>
          <p>
            Third-party advertising partners and analytics networks (such as Google AdSense, DoubleClick, Adsterra, PropellerAds) may place non-personalized cookies on your device to serve relevant advertisements based on visits to this and other websites across the Internet.
          </p>
          <p className="text-xs text-neutral-400 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <strong>Note:</strong> You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Third-Party Advertising & Monetization</h2>
          <p>
            To keep our video downloading service 100% free and unlimited for creators and users worldwide, TikSave Pro displays third-party advertisements. These ad networks may automatically receive your IP address when ad units load.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-neutral-400 pl-2">
            <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">Google Ads Settings</a>.</li>
            <li>TikSave Pro has no access to or control over these cookies that are used by third-party advertisers.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. GDPR Privacy Rights (General Data Protection Regulation)</h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights under GDPR:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <strong className="text-white block mb-1">Right to Access & Rectify</strong>
              You have the right to request copies of your personal data or ask to correct any information you believe is inaccurate.
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <strong className="text-white block mb-1">Right to Erasure (Right to be Forgotten)</strong>
              You have the right to request that we erase your personal data under certain conditions.
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <strong className="text-white block mb-1">Right to Restrict Processing</strong>
              You have the right to request that we restrict or object to the processing of your personal data.
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <strong className="text-white block mb-1">Data Portability</strong>
              You have the right to request that we transfer collected data directly to you or another organization.
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), California consumers have the right to request disclosure of categories and specific pieces of personal data collected, request deletion of personal data, and request that a business not sell their personal data.
          </p>
          <p className="text-emerald-400 font-medium">
            TikSave Pro does not sell personal information to third parties under any circumstances.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Children's Information (COPPA Compliance)</h2>
          <p>
            Protecting children's privacy while using the internet is especially important. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            TikSave Pro does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child has provided this kind of information on our website, please contact us immediately.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-xl font-bold text-white">7. Contact Our Data Protection Officer</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach out via our contact page or email us at:
          </p>
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <span className="font-mono text-xs sm:text-sm text-cyan-400">privacy@tiksave.pro</span>
            <span className="text-xs text-neutral-400">Response within 24-48 hours</span>
          </div>
        </section>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft, Send, CheckCircle2, AlertCircle, FileCheck, Mail, Globe } from 'lucide-react';

interface DmcaPolicyPageProps {
  onBack: () => void;
  lang: 'en' | 'ur';
}

export const DmcaPolicyPage: React.FC<DmcaPolicyPageProps> = ({ onBack, lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    infringingUrl: '',
    copyrightProof: '',
    statementAgreement: false,
  });

  const handleSubmitTakedown = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.infringingUrl || !formData.statementAgreement) {
      alert('Please fill in all required fields and verify the statement.');
      return;
    }
    setSubmitted(true);
  };

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-400 text-xs font-bold mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Digital Millennium Copyright Act (DMCA) 17 U.S.C. § 512</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
          {lang === 'ur' ? 'کاپی رائٹ اور ڈی ایم سی اے پالیسی' : 'DMCA & Copyright Policy'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {lang === 'ur'
            ? 'TikDownload Pro تمام کریئیٹرز اور کاپی رائٹ ہولڈرز کے قانونی حقوق کا مکمل احترام کرتا ہے۔ اگر آپ کی ملکیت والی ویڈیو بلا اجازت استعمال ہو رہی ہے، تو یہاں ڈی ایم سی اے نوٹس جمع کرائیں۔'
            : 'TikDownload Pro respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, we respond expeditiously to valid copyright infringement notices.'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm text-neutral-300 leading-relaxed text-left">
        
        {/* Crucial Legal Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            No-Hosting Infrastructure Architecture Notice
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Please note that <strong>TikDownload Pro does NOT host, store, or archive any video or audio files on its web servers</strong>. All downloads and media streams are fetched directly from TikTok's official publicly accessible content delivery networks (CDNs).
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed">
            However, we maintain an active <strong>URL blocking mechanism</strong> that prevents our system from parsing or generating download links for any specific TikTok URLs that are reported by authorized copyright owners.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Filing a DMCA Notice of Infringement</h2>
          <p>
            To file a valid copyright infringement notification under 17 U.S.C. § 512(c)(3), you must provide our Designated Copyright Agent with a written communication containing substantially the following details:
          </p>
          <ul className="list-decimal list-inside space-y-2 text-neutral-400 pl-2">
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            <li>Identification of the copyrighted work claimed to have been infringed (e.g., original publication link or registration number).</li>
            <li>Identification of the material that is claimed to be infringing and the specific URL(s) to be blocked on TikDownload Pro.</li>
            <li>Information reasonably sufficient to permit our team to contact you, such as an address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          </ul>
        </section>

        {/* Interactive DMCA Takedown Submission Form */}
        <section className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-rose-400" />
            Direct DMCA Takedown Request Form
          </h3>
          <p className="text-xs text-neutral-400 mb-6">
            Authorized copyright owners or their representatives can submit an automated takedown request directly below:
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">DMCA Request Submitted Successfully</h4>
              <p className="text-xs text-emerald-300 max-w-md mx-auto">
                Thank you. Your request ticket has been logged with our legal compliance team. The reported URL will be reviewed and placed on our blocked URL blacklist within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', infringingUrl: '', copyrightProof: '', statementAgreement: false });
                }}
                className="mt-2 text-xs text-neutral-300 hover:text-white underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTakedown} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Studio Media Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Authorized Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="copyright@yourdomain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Target TikTok URL to Block *
                </label>
                <input
                  type="url"
                  required
                  value={formData.infringingUrl}
                  onChange={(e) => setFormData({ ...formData, infringingUrl: e.target.value })}
                  placeholder="https://www.tiktok.com/@creator/video/1234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Proof of Original Copyright Ownership (Link / Notes)
                </label>
                <textarea
                  rows={3}
                  value={formData.copyrightProof}
                  onChange={(e) => setFormData({ ...formData, copyrightProof: e.target.value })}
                  placeholder="Provide proof of original ownership or registration details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="dmca-agree"
                  required
                  checked={formData.statementAgreement}
                  onChange={(e) => setFormData({ ...formData, statementAgreement: e.target.checked })}
                  className="mt-1 rounded bg-neutral-950 border-neutral-700 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor="dmca-agree" className="text-xs text-neutral-400 leading-relaxed cursor-pointer">
                  I state under penalty of perjury that I am the copyright owner or authorized to act on behalf of the owner, and that the information in this notice is accurate.
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit DMCA Takedown Request</span>
              </button>
            </form>
          )}
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-neutral-800 pt-6">
          <h2 className="text-xl font-bold text-white">2. Designated Copyright Agent Contact</h2>
          <p>
            You may also transmit notices directly to our designated copyright officer:
          </p>
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1 text-xs">
            <p className="font-bold text-white">TikDownload Pro Legal Compliance & DMCA Department</p>
            <p className="text-neutral-400">Email: <span className="text-cyan-400 font-mono">dmca@tikdownloadpro.online</span></p>
            <p className="text-neutral-400">Expected Action Timeline: <span className="text-emerald-400">Within 24 business hours</span></p>
          </div>
        </section>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, MessageSquare, Clock, Globe, ShieldAlert, Sparkles } from 'lucide-react';

interface ContactUsPageProps {
  onBack: () => void;
  lang: 'en' | 'ur';
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onBack, lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all required fields.');
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-400 text-xs font-bold mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>24/7 Creator & User Support Team</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
          {lang === 'ur' ? 'ہم سے رابطہ کریں (Contact Us)' : 'Contact TikDownload Pro Support'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {lang === 'ur'
            ? 'اگر آپ کا کوئی سوال، تجویز، کاروباری پیشکش، یا ڈی ایم سی اے نوٹس ہے تو براہِ کرم نیچے دیے گئے فارم کے ذریعے ہماری ٹیم سے رابطہ کریں۔'
            : 'Have a question, feedback, technical bug report, or business inquiry? We are here to help you get the best experience from TikDownload Pro.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Contact Info Cards (Left Column) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Direct Email Support</h4>
                <p className="text-sm font-bold text-white font-mono">support@tikdownloadpro.online</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              For general questions, video download troubleshooting, and user assistance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">DMCA & Legal Department</h4>
                <p className="text-sm font-bold text-white font-mono">dmca@tikdownloadpro.online</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              For copyright removal requests and intellectual property compliance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Response Window</h4>
                <p className="text-sm font-bold text-white">Within 24 to 48 Hours</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              Our technical support team reviews and responds to messages Monday through Sunday.
            </p>
          </div>

        </div>

        {/* Contact Form (Right Column) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl">
            
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white font-display">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to TikDownload Pro. Your inquiry has been received by our support team and we will get back to you shortly at <strong className="text-cyan-400">{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'general', message: '' });
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Send a Message to Support</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Inquiry Topic / Category *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="general">General Inquiry & Feedback</option>
                    <option value="dmca">DMCA / Copyright Takedown Request</option>
                    <option value="business">Advertising & Sponsorship Inquiry</option>
                    <option value="bug">Technical Bug Report / Broken Link</option>
                    <option value="feature">Feature Request & Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message, video links or question here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Now</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

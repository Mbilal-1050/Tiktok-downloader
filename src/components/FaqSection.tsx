import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqSectionProps {
  lang: 'en' | 'ur';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'Do I need to create an account or sign up?',
      qUr: 'کیا مجھے اکاؤنٹ بنانے یا سائن اپ کرنے کی ضرورت ہے؟',
      aEn: 'No, absolutely not! TikDownload Pro requires no registration, signup, or login. You can open the website anytime, paste your TikTok link, and download your video immediately.',
      aUr: 'جی بالکل نہیں! TikDownload Pro پر کسی بھی قسم کی رجسٹریشن، ای میل یا سائن اپ کی ضرورت نہیں ہے۔ بس لنک پیسٹ کریں اور فوری ڈاؤنلوڈ کریں۔',
    },
    {
      qEn: 'How do I download TikTok videos without watermark on iPhone (iOS)?',
      qUr: 'آئی فون (iOS) پر بغیر واٹر مارک ویڈیو کیسے ڈاؤنلوڈ کریں؟',
      aEn: 'On your iPhone, open the TikTok app, tap "Share" and "Copy Link". Open Safari, visit TikDownload Pro, paste the URL and tap Download. When prompted by Safari, tap "Download", and the video will be saved directly to your Files or Photos gallery.',
      aUr: 'آئی فون میں ٹک ٹاک ویڈیو کا لنک کاپی کریں، سفاری براؤزر کھولیں اور TikDownload پر پیسٹ کر کے ڈاؤنلوڈ کریں۔ فائل فوری آپ کی فوٹوز گیلری میں سیو ہو جائے گی۔',
    },
    {
      qEn: 'Where are downloaded TikTok videos saved on my PC or Android?',
      qUr: 'ڈاؤنلوڈ شدہ ویڈیوز میرے فون یا کمپیوٹر میں کہاں محفوظ ہوتی ہیں؟',
      aEn: 'Videos are automatically saved in your device\'s default "Downloads" folder or your mobile Photos/Gallery app.',
      aUr: 'ویڈیوز آپ کے موبائل کی گیلری یا کمپیوٹر کے "Downloads" فولڈر میں خود بخود محفوظ ہو جاتی ہیں۔',
    },
    {
      qEn: 'Is TikDownload Pro completely free and safe to use?',
      qUr: 'کیا TikDownload Pro مکمل طور پر محفوظ اور مفت ہے؟',
      aEn: 'Yes! TikDownload Pro is 100% free, virus-free, and SSL encrypted. We never ask for sensitive permissions, passwords, or personal data.',
      aUr: 'جی ہاں! TikDownload Pro مکمل طور پر مفت، محفوظ اور وائرس سے پاک ہے۔ ہم کبھی بھی کوئی پاس ورڈ یا ذاتی معلومات نہیں مانگتے۔',
    },
    {
      qEn: 'Can I download TikTok audio in MP3 format?',
      qUr: 'کیا میں ٹک ٹاک ویڈیوز سے صرف آڈیو (MP3) ڈاؤنلوڈ کر سکتا ہوں؟',
      aEn: 'Yes! After entering the video link, simply click the "Download Audio (MP3 320kbps)" button to extract and save the background sound or song directly.',
      aUr: 'جی ہاں! ویڈیو سرچ کرنے کے بعد "Download Audio (MP3)" کا بٹن دبائیں اور اصل آڈیو ٹریک ڈاؤنلوڈ کریں۔',
    },
    {
      qEn: 'Does TikDownload Pro store copies of downloaded videos or track users?',
      qUr: 'کیا TikDownload Pro ڈاؤنلوڈ کی گئی ویڈیوز اپنے سرور پر محفوظ کرتا ہے؟',
      aEn: 'No. TikDownload Pro does not host, store, or archive any videos on its servers. All media is fetched directly from TikTok\'s public CDN and delivered straight to your device with zero tracking.',
      aUr: 'ہرگز نہیں! TikDownload Pro کسی بھی ویڈیو کو اپنے سرور پر محفوظ نہیں کرتا۔ تمام ویڈیوز براہِ راست ٹک ٹاک کے پبلک نیٹ ورک سے آپ کی ڈیوائس پر ڈاؤنلوڈ ہوتی ہیں۔',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>{lang === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Frequently Asked Questions'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          {lang === 'ur' ? 'عام سوالات اور جوابات' : 'Everything You Need to Know'}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-neutral-800/40 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {lang === 'ur' ? faq.qUr : faq.qEn}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-rose-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                  {lang === 'ur' ? faq.aUr : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

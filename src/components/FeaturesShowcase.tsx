import React from 'react';
import { Sparkles, Zap, ShieldCheck, Smartphone, Music, DownloadCloud } from 'lucide-react';

interface FeaturesShowcaseProps {
  lang: 'en' | 'ur';
}

export const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({ lang }) => {
  const features = [
    {
      icon: Sparkles,
      color: 'from-rose-500 to-pink-600',
      titleEn: 'No Watermark Guarantee',
      titleUr: 'بغیر واٹر مارک گارنٹی',
      descEn: 'Removes the TikTok username watermark logo cleanly without sacrificing pixel sharpness or quality.',
      descUr: 'ٹک ٹاک کا لوگو اور واٹر مارک مکمل صاف کر کے اصل ریزولوشن میں ویڈیو دیتا ہے۔',
    },
    {
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      titleEn: 'Ultra Fast Server Stream',
      titleUr: 'انتہائی تیز رفتار سرور',
      descEn: 'Powered by high-bandwidth CDN pipelines for instant 1-click direct download with zero buffering.',
      descUr: 'تیز ترین ہائی اسپیڈ سرورز کے ذریعے بغیر کسی رکاوٹ کے 1 سیکنڈ میں ڈاؤنلوڈ۔',
    },
    {
      icon: Music,
      color: 'from-purple-500 to-indigo-600',
      titleEn: 'High Bitrate MP3 Extractor',
      titleUr: 'ایم پی تھری ساؤنڈ ایکسٹریکٹر',
      descEn: 'Extract viral TikTok background sounds and music tracks in 320kbps crystal clear audio.',
      descUr: 'وائرل ٹک ٹاک میوزک اور آڈیو ٹریکس کو 320kbps ایچ ڈی کوالٹی میں ڈاؤنلوڈ کریں۔',
    },
    {
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      titleEn: '100% Free & No Sign-up',
      titleUr: '100% مفت اور بغیر لاگ ان',
      descEn: 'Zero account creation, passwords, or personal data tracking required. Pure instant utility.',
      descUr: 'کوئی رجسٹریشن، ای میل یا پاس ورڈ کی ضرورت نہیں۔ ہر صارف کے لیے مکمل آزاد اور مفت۔',
    },
    {
      icon: Smartphone,
      color: 'from-cyan-500 to-blue-600',
      titleEn: 'Cross-Device Compatibility',
      titleUr: 'ہر موبائل اور کمپیوٹر پر فعال',
      descEn: 'Works flawlessly on iPhone (Safari), Android (Chrome), Windows, Mac, and iPad without extra apps.',
      descUr: 'آئی فون، اینڈرائیڈ، ونڈوز اور میک تمام ڈیوائسز کے براؤزر میں بہترین کام کرتا ہے۔',
    },
    {
      icon: DownloadCloud,
      color: 'from-rose-600 to-purple-600',
      titleEn: 'Photo Slideshow Carousel',
      titleUr: 'فوٹو سلائیڈ شو ڈاؤنلوڈنگ',
      descEn: 'Supports full TikTok multi-image slideshow albums with individual full-resolution photo downloads.',
      descUr: 'ٹک ٹاک کی تمام تصاویر اور البم سلائیڈز کو ایچ ڈی کوالٹی میں ڈاؤنلوڈ کریں۔',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
          {lang === 'ur' ? 'TikDownload Pro کی بہترین خصوصیات' : 'Why Millions Choose TikDownload Pro'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          {lang === 'ur'
            ? 'پریمیم فیچرز اور تیز ترین ڈاؤنلوڈ رفتار جو آپ کے کام کو انتہائی آسان بناتی ہے۔'
            : 'Engineered for speed, high fidelity, and seamless downloading across all platforms.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-5 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {lang === 'ur' ? feat.titleUr : feat.titleEn}
                </h3>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'ur' ? feat.descUr : feat.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

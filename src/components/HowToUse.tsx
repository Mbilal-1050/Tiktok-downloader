import React from 'react';
import { Copy, Clipboard, Download, CheckCircle2 } from 'lucide-react';

interface HowToUseProps {
  lang: 'en' | 'ur';
}

export const HowToUse: React.FC<HowToUseProps> = ({ lang }) => {
  const steps = [
    {
      num: '01',
      icon: Copy,
      titleEn: 'Copy TikTok Link',
      titleUr: 'ٹک ٹاک سے ویڈیو کا لنک کاپی کریں',
      descEn: 'Open TikTok app or website, find any video you like, tap "Share" and click "Copy Link".',
      descUr: 'ٹک ٹاک ایپ کھولیں، پسندیدہ ویڈیو پر شیئر کے بٹن پر کلک کر کے لنک کاپی کریں۔',
    },
    {
      num: '02',
      icon: Clipboard,
      titleEn: 'Paste in TikSave Pro',
      titleUr: 'لنک کو TikSave میں پیسٹ کریں',
      descEn: 'Paste the copied URL into the search box above and click the "Download" button.',
      descUr: 'کاپی کیا ہوا لنک اوپر دیے گئے سرچ باکس میں پیسٹ کریں اور ڈاؤنلوڈ دبائیں۔',
    },
    {
      num: '03',
      icon: Download,
      titleEn: 'Save Without Watermark',
      titleUr: 'بغیر واٹر مارک ڈاؤنلوڈ حاصل کریں',
      descEn: 'Choose "HD No Watermark" or "MP3 Audio" to instantly save the file directly to your gallery or PC.',
      descUr: 'بغیر واٹر مارک یا ایم پی تھری آڈیو منتخب کریں اور فوری فائل سیو کریں۔',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
          {lang === 'ur' ? 'ویڈیو ڈاؤنلوڈ کرنے کا آسان طریقہ' : 'How to Download TikTok Videos (3 Easy Steps)'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          {lang === 'ur'
            ? 'بغیر کسی ایپ یا سافٹ ویئر کو انسٹال کیے، چند سیکنڈ میں مکمل ویڈیو محفوظ کریں۔'
            : 'No software installation or account registration required. Works seamlessly on any device.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-cyan-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-display text-2xl font-black text-neutral-700">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {lang === 'ur' ? step.titleUr : step.titleEn}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'ur' ? step.descUr : step.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

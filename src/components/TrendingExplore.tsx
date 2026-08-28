import React from 'react';
import { Flame, Music, Hash, Play, Download, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { TikTokVideoData } from '../types';

interface TrendingExploreProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideo: (sampleKey: string) => void;
  lang: 'en' | 'ur';
}

export const TrendingExplore: React.FC<TrendingExploreProps> = ({
  isOpen,
  onClose,
  onSelectVideo,
  lang,
}) => {
  if (!isOpen) return null;

  const viralHashtags = [
    { tag: '#fyp', views: '58.2T', growth: '+14%' },
    { tag: '#viral', views: '29.1T', growth: '+21%' },
    { tag: '#foryoupage', views: '18.4T', growth: '+9%' },
    { tag: '#tiktokgrowth', views: '4.2B', growth: '+45%' },
    { tag: '#recipe', views: '12.8B', growth: '+32%' },
    { tag: '#traveltok', views: '8.9B', growth: '+28%' },
    { tag: '#aitools', views: '3.1B', growth: '+85%' },
    { tag: '#learnontiktok', views: '9.4B', growth: '+19%' },
  ];

  const trendingCards = [
    {
      id: 'sample_nature_721',
      title: 'Satisfying sunset in Switzerland Alps 🏔️✨',
      author: 'Swiss Explorer 🏔️',
      category: 'Travel & Scenery',
      views: '2.8M',
      likes: '412K',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sample_tech_ai',
      title: 'Top 3 insane AI tools you must try in 2026! 🚀🤖',
      author: 'Tech Insider AI 🤖',
      category: 'Tech & AI',
      views: '1.5M',
      likes: '198K',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sample_cooking_recipe',
      title: 'Crispy Garlic Butter Potato Bites 🧄🥔',
      author: 'Crispy Kitchen 👨‍🍳',
      category: 'Food & Recipe',
      views: '4.3M',
      likes: '672K',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-neutral-900 border border-neutral-700 p-5 sm:p-7 relative shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <span>{lang === 'ur' ? 'ٹک ٹاک ٹرینڈز اور وائرل ویڈیوز' : 'Trending TikTok Discovery & Sounds'}</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-800">
                LIVE
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'ur'
                ? 'وائرل ویڈیوز دیکھیں اور 1 کلک میں ایچ ڈی ڈاؤنلوڈ کریں'
                : 'Discover top viral content, download no watermark HD, or extract trending sounds'}
            </p>
          </div>
        </div>

        {/* Viral Hashtags */}
        <div className="mb-6 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
          <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-rose-500" />
            <span>Top Rising Hashtags Today</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {viralHashtags.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs"
              >
                <span className="font-bold text-white">{h.tag}</span>
                <span className="text-[10px] text-neutral-500">{h.views}</span>
                <span className="text-[10px] text-emerald-400 font-bold">{h.growth}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Video Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Viral Showcase (Instant Download)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {trendingCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden group hover:border-neutral-700 transition-all flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white backdrop-blur-sm">
                    {card.category}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug mb-1">
                      {card.title}
                    </h5>
                    <p className="text-[11px] text-neutral-400">{card.author}</p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-medium">
                      🔥 {card.views} views
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectVideo(card.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

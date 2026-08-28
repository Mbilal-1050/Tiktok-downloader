import React, { useState } from 'react';
import { X, Layers, Download, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { TikTokVideoData } from '../types';

interface BatchDownloaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ur';
}

export const BatchDownloaderModal: React.FC<BatchDownloaderModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [linksText, setLinksText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchResults, setBatchResults] = useState<TikTokVideoData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleStartBatch = async () => {
    const lines = linksText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    if (lines.length === 0) return;

    setIsProcessing(true);
    setBatchResults([]);
    setErrors([]);

    const results: TikTokVideoData[] = [];
    const errorList: string[] = [];

    for (let i = 0; i < Math.min(lines.length, 5); i++) {
      const lineUrl = lines[i];
      try {
        const res = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ url: lineUrl }),
        });
        const contentType = res.headers.get('content-type') || '';
        let data: any = null;
        if (contentType.includes('application/json')) {
          try {
            data = await res.json();
          } catch {
            data = null;
          }
        }
        if (data && data.success && data.data) {
          results.push(data.data);
        } else {
          errorList.push(`Could not resolve: ${lineUrl.slice(0, 30)}...`);
        }
      } catch (err: any) {
        errorList.push(`Error fetching: ${lineUrl.slice(0, 30)}...`);
      }
    }

    setBatchResults(results);
    setErrors(errorList);
    setIsProcessing(false);
  };

  const handleDownloadItem = (video: TikTokVideoData) => {
    const targetUrl = video.playUrl || video.hdPlayUrl;
    const filename = `tiksave_${video.id}_hd.mp4`;
    const streamUrl = `/api/stream?url=${encodeURIComponent(targetUrl)}&filename=${encodeURIComponent(filename)}&type=video/mp4`;
    
    const link = document.createElement('a');
    link.href = streamUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-neutral-900 border border-neutral-700 p-5 sm:p-7 relative shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              {lang === 'ur' ? 'ملٹی لنک بیچ ڈاؤنلوڈر' : 'Batch TikTok Downloader'}
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'ur'
                ? 'ایک ساتھ 5 ویڈیوز کے لنکس پیسٹ کریں اور سب ڈاؤنلوڈ کریں'
                : 'Paste up to 5 TikTok video URLs (one per line) for multi-download'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-neutral-300 mb-1.5 block">
              TikTok URLs (One per line)
            </label>
            <textarea
              rows={4}
              value={linksText}
              onChange={(e) => setLinksText(e.target.value)}
              placeholder="https://www.tiktok.com/@user/video/7289123456...&#10;https://vt.tiktok.com/ZSxxxx/&#10;https://www.tiktok.com/@creator/video/..."
              className="w-full p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <button
            onClick={handleStartBatch}
            disabled={isProcessing || !linksText.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing batch links...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Process & Fetch All Videos</span>
              </>
            )}
          </button>

          {/* Results List */}
          {batchResults.length > 0 && (
            <div className="mt-4 space-y-2.5">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ready for 1-Click Download ({batchResults.length} Videos)</span>
              </p>
              {batchResults.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.cover}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.title || 'TikTok Video'}</p>
                      <p className="text-[11px] text-neutral-400 truncate">@{item.author?.unique_id}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadItem(item)}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.length > 0 && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
              {errors.map((err, i) => (
                <p key={i}>&bull; {err}</p>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

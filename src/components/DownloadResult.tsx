import React, { useState, useRef } from 'react';
import {
  Download,
  Music,
  Check,
  Copy,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  QrCode,
  Sparkles,
  Play,
  Pause,
  Image as ImageIcon,
  Film,
  Volume2,
  X,
  Zap,
  Loader2,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TikTokVideoData, AdSettings, ViralInsight } from '../types';

interface DownloadResultProps {
  video: TikTokVideoData;
  adSettings: AdSettings;
  lang: 'en' | 'ur';
  onNewDownload: () => void;
  onRecordHistory: (type: any) => void;
}

export const DownloadResult: React.FC<DownloadResultProps> = ({
  video,
  adSettings,
  lang,
  onNewDownload,
  onRecordHistory,
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // AI Insights State
  const [aiInsight, setAiInsight] = useState<ViralInsight | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff0844', '#00f2fe', '#ffffff', '#10b981'],
      });
    } catch (e) {
      // ignore
    }
  };

  // Direct, in-browser seamless download (No target="_blank" to prevent iframe/cookie-check errors)
  const handleDirectDownload = async (
    mediaUrl: string,
    filename: string,
    mediaType: string,
    formatKey: string
  ) => {
    if (!mediaUrl) return;
    setDownloadingFormat(formatKey);
    onRecordHistory(formatKey);

    try {
      // 1. Try direct fetch through our same-origin stream proxy
      const streamUrl = `/api/stream?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(
        filename
      )}&type=${encodeURIComponent(mediaType)}`;

      const response = await fetch(streamUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          if (document.body.contains(a)) {
            document.body.removeChild(a);
          }
        }, 1500);

        triggerConfetti();
        setDownloadSuccess(formatKey);
        setTimeout(() => setDownloadSuccess(null), 3000);
        return;
      }
    } catch (fetchErr) {
      console.warn('Fetch stream error, attempting direct fallback anchor:', fetchErr);
    } finally {
      setDownloadingFormat(null);
    }

    // 2. Direct Anchor fallback without target="_blank" (avoids opening new windows with auth errors)
    try {
      const fallbackUrl = `/api/stream?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(
        filename
      )}&type=${encodeURIComponent(mediaType)}`;
      const link = document.createElement('a');
      link.href = fallbackUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1500);
      triggerConfetti();
      setDownloadSuccess(formatKey);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Download execution failed:', err);
    }
  };

  const handleCopyCaption = () => {
    if (video.title) {
      navigator.clipboard.writeText(video.title);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    }
  };

  const toggleAudioPreview = () => {
    if (!audioRef.current && video.musicUrl) {
      audioRef.current = new Audio(video.musicUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play().catch((e) => console.warn('Audio play prevented:', e));
        setIsPlayingAudio(true);
      }
    }
  };

  // Generate AI Viral Hook & Insights using Gemini Server API
  const fetchAiAnalysis = async () => {
    try {
      setLoadingAi(true);
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          title: video.title,
          author: video.author?.nickname,
          views: video.stats?.views,
          likes: video.stats?.likes,
        }),
      });
      const contentType = res.headers.get('content-type') || '';
      let json: any = null;
      if (contentType.includes('application/json')) {
        try {
          json = await res.json();
        } catch {
          json = null;
        }
      }
      if (json && json.success && json.insight) {
        setAiInsight(json.insight);
      }
    } catch (e) {
      console.warn('AI analysis error:', e);
    } finally {
      setLoadingAi(false);
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Main Download Result Box */}
      <div className="mt-4 rounded-3xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-7 shadow-2xl backdrop-blur-xl">
        
        {/* Top bar: Author Info & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3.5">
            <img
              src={video.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={video.author?.nickname ? `${video.author.nickname}'s TikTok profile avatar` : 'TikTok Creator Avatar'}
              referrerPolicy="no-referrer"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-rose-500/50 shadow-md"
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {video.author?.nickname || 'TikTok Creator'}
                </h3>
                <span className="w-4 h-4 rounded-full bg-cyan-500 text-neutral-950 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                @{video.author?.unique_id || 'creator'} &bull; {video.duration}s
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Download to Smartphone with QR"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ur' ? 'موبائل کیو آر' : 'Mobile QR'}</span>
            </button>

            <button
              onClick={onNewDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <span>{lang === 'ur' ? 'دوسری ویڈیو' : '+ New Video'}</span>
            </button>
          </div>
        </div>

        {/* Video Preview & Download Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Player Preview, Metrics & Direct Below-Video Download Button */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/14] max-h-[440px] flex items-center justify-center border border-neutral-800 shadow-inner group">
              {video.isImages && video.images && video.images.length > 0 ? (
                <div className="relative w-full h-full">
                  <img
                    src={video.images[0]}
                    alt={`TikTok Slideshow Photo 1 of ${video.images.length}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-xs text-white font-bold backdrop-blur-sm">
                    📸 {video.images.length} Slides
                  </div>
                </div>
              ) : (
                <video
                  src={video.playUrl || video.hdPlayUrl}
                  poster={video.cover}
                  controls
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Video Engagement Metrics */}
            <div className="grid grid-cols-4 gap-2 text-center p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>Views</span>
                </div>
                <span className="text-xs font-extrabold text-white mt-0.5">
                  {formatNumber(video.stats?.views)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <Heart className="w-3 h-3 text-rose-500" />
                  <span>Likes</span>
                </div>
                <span className="text-xs font-extrabold text-white mt-0.5">
                  {formatNumber(video.stats?.likes)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <MessageCircle className="w-3 h-3 text-amber-400" />
                  <span>Comments</span>
                </div>
                <span className="text-xs font-extrabold text-white mt-0.5">
                  {formatNumber(video.stats?.comments)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <Share2 className="w-3 h-3 text-emerald-400" />
                  <span>Shares</span>
                </div>
                <span className="text-xs font-extrabold text-white mt-0.5">
                  {formatNumber(video.stats?.shares)}
                </span>
              </div>
            </div>

            {/* DIRECT QUICK DOWNLOAD OPTION UNDER THE VIDEO PLAYER */}
            <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
              <button
                onClick={() =>
                  handleDirectDownload(
                    video.playUrl || video.hdPlayUrl,
                    `tiksave_${video.id}_nowatermark.mp4`,
                    'video/mp4',
                    'video_quick'
                  )
                }
                disabled={downloadingFormat === 'video_quick'}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer disabled:opacity-75"
              >
                {downloadingFormat === 'video_quick' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{lang === 'ur' ? 'ویڈیو ڈاؤنلوڈ ہو رہی ہے...' : 'Downloading Video...'}</span>
                  </>
                ) : downloadSuccess === 'video_quick' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'ur' ? 'ڈاؤنلوڈ مکمل ہو گیا!' : 'Downloaded Successfully!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{lang === 'ur' ? 'ویڈیو ڈاؤنلوڈ کریں (بغیر واٹر مارک)' : 'Download MP4 (No Watermark)'}</span>
                  </>
                )}
              </button>

              {video.musicUrl && (
                <button
                  onClick={() =>
                    handleDirectDownload(
                      video.musicUrl!,
                      `tiksave_${video.id}_soundtrack.mp3`,
                      'audio/mp3',
                      'audio_quick'
                    )
                  }
                  disabled={downloadingFormat === 'audio_quick'}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {downloadingFormat === 'audio_quick' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                      <span>Downloading MP3...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{lang === 'ur' ? 'آڈیو محفوظ کریں (MP3)' : 'Download Audio MP3'}</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Full Download Actions Matrix & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <div>
              {/* Caption Box with Copy Button */}
              {video.title && (
                <div className="relative mb-4 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium line-clamp-3 leading-relaxed">
                      {video.title}
                    </p>
                    <button
                      onClick={handleCopyCaption}
                      className="shrink-0 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy video caption & hashtags"
                    >
                      {copiedCaption ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Sound / Music Audio preview */}
              {video.musicInfo && (
                <div className="mb-4 flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 to-neutral-900 border border-purple-900/40 text-left">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center shrink-0">
                      <Music className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-200 truncate">
                        {video.musicInfo.title || 'TikTok Audio Track'}
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {video.musicInfo.author || 'Original Sound'}
                      </p>
                    </div>
                  </div>

                  {video.musicUrl && (
                    <button
                      onClick={toggleAudioPreview}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Pause' : 'Preview'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Primary Download Buttons Matrix */}
              <div className="space-y-3 text-left">
                
                {/* 1. HD Without Watermark (Primary High-Speed) */}
                <button
                  onClick={() =>
                    handleDirectDownload(
                      video.playUrl || video.hdPlayUrl,
                      `tiksave_${video.id}_nowatermark.mp4`,
                      'video/mp4',
                      'video_hd'
                    )
                  }
                  disabled={downloadingFormat === 'video_hd'}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white font-display font-bold text-sm sm:text-base shadow-xl shadow-rose-500/25 active:scale-[0.99] transition-all cursor-pointer group disabled:opacity-80"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {downloadingFormat === 'video_hd' ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : downloadSuccess === 'video_hd' ? (
                        <Check className="w-5 h-5 text-emerald-300" />
                      ) : (
                        <Download className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>
                          {downloadingFormat === 'video_hd'
                            ? (lang === 'ur' ? 'ڈاؤنلوڈ جاری ہے...' : 'Downloading...')
                            : (lang === 'ur' ? 'بغیر واٹر مارک ویڈیو ڈاؤنلوڈ کریں (HD)' : 'Download Video (No Watermark HD)')}
                        </span>
                        <span className="text-[10px] uppercase font-extrabold bg-white text-rose-600 px-1.5 py-0.5 rounded shadow-sm">
                          1080p
                        </span>
                      </div>
                      <p className="text-xs text-rose-100 font-normal">
                        MP4 • Crystal Clear Resolution • Direct Save
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold bg-black/25 px-3 py-1.5 rounded-lg shrink-0">
                    ⚡ Fast Save
                  </span>
                </button>

                {/* 2. Full HD 1080p Ultra (If available) */}
                {video.hdPlayUrl && (
                  <button
                    onClick={() =>
                      handleDirectDownload(
                        video.hdPlayUrl!,
                        `tiksave_${video.id}_full_hd.mp4`,
                        'video/mp4',
                        'video_full_hd'
                      )
                    }
                    disabled={downloadingFormat === 'video_full_hd'}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700/90 border border-neutral-700 text-white font-semibold text-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {downloadingFormat === 'video_full_hd' ? (
                        <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                      ) : (
                        <Film className="w-5 h-5 text-cyan-400" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          {lang === 'ur' ? 'فل ایچ ڈی ڈاؤنلوڈ (الٹرا ریزولوشن)' : 'Download Video (Full HD 1080p Ultra)'}
                        </p>
                        <p className="text-[11px] text-neutral-400">High bitrate master stream</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50 shrink-0">
                      Ultra HD
                    </span>
                  </button>
                )}

                {/* 3. Download Audio MP3 */}
                {video.musicUrl && (
                  <button
                    onClick={() =>
                      handleDirectDownload(
                        video.musicUrl!,
                        `tiksave_${video.id}_soundtrack.mp3`,
                        'audio/mp3',
                        'audio_mp3'
                      )
                    }
                    disabled={downloadingFormat === 'audio_mp3'}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700/90 border border-neutral-700 text-white font-semibold text-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {downloadingFormat === 'audio_mp3' ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-purple-400" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          {lang === 'ur' ? 'ایم پی تھری آڈیو ڈاؤنلوڈ کریں (MP3)' : 'Download Audio (MP3 320kbps)'}
                        </p>
                        <p className="text-[11px] text-neutral-400">High-fidelity original sound extract</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/50 shrink-0">
                      MP3
                    </span>
                  </button>
                )}

                {/* 4. Download Photos Slideshow (If Carousel) */}
                {video.isImages && video.images && video.images.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                    <p className="text-xs font-bold text-neutral-200 mb-2 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      <span>Download Slideshow Images ({video.images.length} Photos)</span>
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {video.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleDirectDownload(
                              imgUrl,
                              `tiksave_slide_${video.id}_${idx + 1}.jpg`,
                              'image/jpeg',
                              `slide_${idx}`
                            )
                          }
                          className="relative rounded-lg overflow-hidden aspect-square border border-neutral-700 hover:border-emerald-500 group cursor-pointer"
                        >
                          <img
                            src={imgUrl}
                            alt={`Slide photo ${idx + 1} from TikTok creator`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Download className="w-4 h-4 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Download Cover Thumbnail */}
                {video.cover && (
                  <button
                    onClick={() =>
                      handleDirectDownload(
                        video.cover,
                        `tiksave_${video.id}_thumbnail.jpg`,
                        'image/jpeg',
                        'cover_img'
                      )
                    }
                    disabled={downloadingFormat === 'cover_img'}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-neutral-400" />
                      <span>{lang === 'ur' ? 'ویڈیو کا تھمب نیل محفوظ کریں' : 'Download HD Video Thumbnail'}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">JPG</span>
                  </button>
                )}
              </div>
            </div>

            {/* AI Viral Insights Drawer Button */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                onClick={fetchAiAnalysis}
                disabled={loadingAi}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border border-purple-800/60 hover:border-purple-600 text-purple-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>
                  {loadingAi
                    ? 'Analyzing Viral Hooks with AI...'
                    : '✨ Analyze Viral Hook & Hashtags with AI'}
                </span>
              </button>

              {/* AI Viral Insight Result */}
              {aiInsight && (
                <div className="mt-3 p-4 rounded-2xl bg-purple-950/30 border border-purple-800/60 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-purple-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Viral Score: {aiInsight.viralScore}/100
                    </span>
                    <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded font-semibold">
                      {aiInsight.contentCategory}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 mb-2 leading-relaxed">
                    <strong>Hook Insight:</strong> {aiInsight.hookSummary}
                  </p>

                  <div className="mb-2">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Suggested Hashtags for Reposting:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(aiInsight.suggestedHashtags.join(' '));
                          setCopiedHashtags(true);
                          setTimeout(() => setCopiedHashtags(false), 2000);
                        }}
                        className="text-[10px] text-purple-400 hover:underline font-bold cursor-pointer"
                      >
                        {copiedHashtags ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {aiInsight.suggestedHashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* QR Code Modal for Phone Download */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-neutral-900 border border-neutral-700 p-6 text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h4 className="text-base font-bold text-white mb-1 font-display">
              Scan to Download on Phone
            </h4>
            <p className="text-xs text-neutral-400 mb-5">
              Open your smartphone camera or QR scanner to save this video directly to your mobile gallery.
            </p>

            {/* QR Image */}
            <div className="p-4 rounded-2xl bg-white w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(video.playUrl || video.sourceUrl)}`}
                alt="QR Code to download TikTok video directly on mobile"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] text-neutral-500 mt-4">
              Works on iOS Safari & Android Chrome. No app required.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

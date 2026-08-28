export interface TikTokAuthor {
  id: string;
  unique_id: string;
  nickname: string;
  avatar: string;
}

export interface TikTokMusic {
  id?: string;
  title: string;
  author: string;
  play_url: string;
  cover?: string;
  duration?: number;
}

export interface TikTokStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  downloads?: number;
}

export interface TikTokVideoData {
  id: string;
  title: string;
  cover: string;
  playUrl: string; // no watermark video
  wmPlayUrl?: string; // with watermark
  hdPlayUrl?: string; // high definition
  musicUrl?: string;
  musicInfo?: TikTokMusic;
  author: TikTokAuthor;
  stats: TikTokStats;
  duration: number;
  isImages: boolean;
  images?: string[];
  size?: number;
  createTime?: number;
  sourceUrl: string;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  authorNickname: string;
  authorHandle: string;
  authorAvatar: string;
  cover: string;
  playUrl: string;
  downloadedAt: number;
  type: 'video_hd' | 'video_wm' | 'audio_mp3' | 'cover_img' | 'slides';
}

export interface AdSettings {
  enabled: boolean;
  network: 'adsense' | 'adsterra' | 'propeller' | 'custom';
  bannerTopEnabled: boolean;
  inFeedEnabled: boolean;
  interstitialEnabled: boolean;
  stickyBottomEnabled: boolean;
  customTopHtml?: string;
  customBottomHtml?: string;
  adsterraDirectLink?: string;
}

export interface ViralInsight {
  viralScore: number;
  hookSummary: string;
  suggestedHashtags: string[];
  contentCategory: string;
  keyTakeaway: string;
}

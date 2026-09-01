import React, { useEffect, useRef, useState } from 'react';

interface AdsterraBannerProps {
  id?: string;
  className?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  id = 'adsterra-banner-top',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Compute initial scale synchronously based on viewport to avoid flash of unscaled content
  const getInitialScale = () => {
    if (typeof window === 'undefined') return 1;
    const vp = Math.min(window.innerWidth || 728, document.documentElement.clientWidth || 728);
    const available = vp - 24; // 12px padding on each side
    if (available < 728 && available > 0) {
      return Math.max(0.35, Math.min(1, available / 728));
    }
    return 1;
  };

  const [scale, setScale] = useState<number>(getInitialScale);

  // Dynamic responsive scaling for all mobile, tablet, and desktop screen sizes
  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        // Measure real rendered container width or fallback to window innerWidth
        const containerWidth = wrapperRef.current.clientWidth || window.innerWidth;
        const availableWidth = Math.min(containerWidth, window.innerWidth - 20);

        if (availableWidth > 0 && availableWidth < 740) {
          const calculatedScale = Math.max(0.35, Math.min(1, (availableWidth - 8) / 728));
          setScale(calculatedScale);
        } else {
          setScale(1);
        }
      }
    };

    updateScale();

    // Use ResizeObserver if available for instantaneous layout updates
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && wrapperRef.current) {
      observer = new ResizeObserver(() => {
        updateScale();
      });
      observer.observe(wrapperRef.current);
    }

    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, []);

  // Inject Adsterra 728x90 Banner Ad inside isolated iframe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.title = 'Advertisement 728x90';
    iframe.width = '728';
    iframe.height = '90';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.style.maxWidth = 'none';
    iframe.scrolling = 'no';
    iframe.setAttribute('frameBorder', '0');

    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              * { box-sizing: border-box; }
              html, body {
                margin: 0;
                padding: 0;
                width: 728px;
                height: 90px;
                overflow: hidden;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '1a9dc274746fdae3c04b6f72ad3899a2',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highrevenueformat.com/1a9dc274746fdae3c04b6f72ad3899a2/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [id]);

  const scaledWidth = Math.min(728, Math.round(728 * scale));
  const scaledHeight = Math.max(32, Math.round(90 * scale));

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full max-w-full flex flex-col items-center justify-center my-3 px-2 overflow-hidden ${className}`}
    >
      <div
        ref={wrapperRef}
        className="w-full max-w-[760px] flex flex-col items-center justify-center mx-auto overflow-hidden"
        style={{ maxWidth: '100%' }}
      >
        {/* Ad Label */}
        <div
          className="flex items-center justify-between pb-1 mb-1 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold"
          style={{ width: `${scaledWidth}px`, maxWidth: '100%' }}
        >
          <span>Sponsored Banner</span>
          <span>728×90</span>
        </div>

        {/* Scaled Responsive Ad Container Box */}
        <div
          style={{
            height: `${scaledHeight}px`,
            width: `${scaledWidth}px`,
            maxWidth: '100%',
          }}
          className="relative flex items-center justify-center overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800/80 shadow-md transition-all duration-150"
        >
          {/* Inner 728x90 Canvas Centered & Scaled */}
          <div
            id={id}
            ref={containerRef}
            style={{
              width: '728px',
              height: '90px',
              minWidth: '728px',
              minHeight: '90px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: 'center center',
            }}
            className="w-[728px] h-[90px] min-w-[728px] min-h-[90px] flex items-center justify-center overflow-hidden"
          />
        </div>
      </div>
    </aside>
  );
};

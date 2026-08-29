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
  const [scale, setScale] = useState(1);

  // Responsive scaling to fit mobile screens narrower than 728px without horizontal scrolling
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const availableWidth = wrapperRef.current.clientWidth;
        if (availableWidth > 0 && availableWidth < 740) {
          const calculatedScale = Math.min(1, Math.max(0.42, (availableWidth - 16) / 728));
          setScale(calculatedScale);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inject Adsterra 728x90 Banner Ad (Key: 1a9dc274746fdae3c04b6f72ad3899a2)
  // Using an isolated sub-frame ensures multiple instances (top + footer) execute independently
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

  const heightPx = Math.round(90 * scale);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full flex flex-col items-center justify-center my-3 px-2 overflow-hidden ${className}`}
    >
      <div
        ref={wrapperRef}
        className="w-full max-w-[760px] flex flex-col items-center justify-center mx-auto overflow-hidden"
      >
        {/* Ad Label */}
        <div
          className="flex items-center justify-between pb-1 mb-1 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold"
          style={{ width: `${Math.min(728, Math.round(728 * scale))}px`, maxWidth: '100%' }}
        >
          <span>Sponsored Banner</span>
          <span>728×90</span>
        </div>

        {/* Scaled Responsive Ad Container */}
        <div
          style={{
            height: `${heightPx}px`,
            width: `${Math.min(728, Math.round(728 * scale))}px`,
            maxWidth: '100%',
          }}
          className="relative flex items-center justify-center overflow-hidden transition-all duration-150"
        >
          <div
            id={id}
            ref={containerRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '728px',
              height: '90px',
            }}
            className="w-[728px] h-[90px] min-w-[728px] min-h-[90px] rounded-xl bg-neutral-900/60 border border-neutral-800/80 shadow-md flex items-center justify-center overflow-hidden"
          />
        </div>
      </div>
    </aside>
  );
};

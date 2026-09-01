import React, { useEffect } from 'react';

/**
 * MonetagAdManager
 * Manages dynamically injected Monetag In-Page Push (IPP) and notification ads.
 * Ensures notifications render in a non-intrusive fixed corner position and stack cleanly
 * rather than vertical piling over the hero section or blocking download input interactions.
 */
export const MonetagAdManager: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const repositionInPagePushAds = () => {
      const bodyChildren = Array.from(document.body.children);
      const adElements: HTMLElement[] = [];

      bodyChildren.forEach((child) => {
        if (child.id === 'root' || child.tagName === 'SCRIPT' || child.tagName === 'STYLE') {
          return;
        }

        const el = child as HTMLElement;
        const style = window.getComputedStyle(el);
        const isFloating = style.position === 'fixed' || style.position === 'absolute';
        const hasAdClass =
          el.className &&
          typeof el.className === 'string' &&
          (el.className.includes('widget') ||
            el.className.includes('notification') ||
            el.className.includes('push') ||
            el.className.includes('ipp') ||
            el.className.includes('monetag'));

        const hasAdAttr =
          el.hasAttribute('data-zone') ||
          (el.id && (el.id.includes('monetag') || el.id.includes('widget')));

        if (isFloating || hasAdClass || hasAdAttr) {
          adElements.push(el);
        }
      });

      const isMobile = window.innerWidth <= 640;
      let currentBottom = isMobile ? 16 : 24;

      adElements.forEach((el) => {
        // Enforce fixed corner placement
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', 'auto', 'important');
        el.style.setProperty('left', isMobile ? '12px' : 'auto', 'important');
        el.style.setProperty('right', isMobile ? '12px' : '20px', 'important');
        el.style.setProperty('bottom', `${currentBottom}px`, 'important');
        el.style.setProperty('max-width', isMobile ? 'calc(100vw - 24px)' : '380px', 'important');
        el.style.setProperty('z-index', '45', 'important');
        el.style.setProperty('box-shadow', '0 10px 30px -5px rgba(0,0,0,0.7)', 'important');
        el.style.setProperty('border-radius', '16px', 'important');

        const height = el.offsetHeight || 80;
        currentBottom += height + 12; // stack next notification neatly above the previous one
      });
    };

    repositionInPagePushAds();

    // Observe body for runtime Monetag node insertions
    const observer = new MutationObserver(() => {
      repositionInPagePushAds();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false,
    });

    window.addEventListener('resize', repositionInPagePushAds);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', repositionInPagePushAds);
    };
  }, []);

  return null;
};

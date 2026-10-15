'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Replays the text reveal every time a [data-reveal] block scrolls into view.
 *  The CSS animation plays on its own when the page loads, so text is never left
 *  hidden if this script does not run. Here a block that is off screen gets
 *  .reveal-out, which parks its text in the start position; removing the class
 *  as it comes back into view restarts the animation. */
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        // Hide only once fully gone, show once a fifth is visible, so the edge of
        // the screen does not make it flicker.
        if (!entry.isIntersecting) entry.target.classList.add('reveal-out');
        else if (entry.intersectionRatio >= 0.2) entry.target.classList.remove('reveal-out');
      }
    }, { threshold: [0, 0.2] });
    const blocks = document.querySelectorAll('[data-reveal]');
    blocks.forEach(block => observer.observe(block));
    return () => {
      observer.disconnect();
      blocks.forEach(block => block.classList.remove('reveal-out'));
    };
  }, [pathname]);
  return null;
}

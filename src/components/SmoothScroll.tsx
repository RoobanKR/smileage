'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window { lenis?: Lenis }
}

/** Eased, inertia-style scrolling for mouse wheels and trackpads. Touch screens keep
 *  their own native scrolling, which already feels right. Admin screens are left
 *  alone because their panels and modals scroll on their own, and so is anyone who
 *  has asked for reduced motion. Lenis moves the real window scroll position, so
 *  sticky headers, IntersectionObserver reveals and the stats counter keep working. */
export default function SmoothScroll() {
  const pathname = usePathname() || '/';
  const enabled = !pathname.startsWith('/admin') && !pathname.startsWith('/superadmin');

  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: true,
      // Dropdown menus, the filter drawer and the review rail scroll inside themselves.
      allowNestedScroll: true,
      // In-page links like /#how-it-works glide to their section with a little breathing room.
      anchors: { offset: -24 }
    });
    window.lenis = lenis;
    return () => {
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
    };
  }, [enabled]);

  // A new page starts at the top instead of easing there from the old position.
  // The first render is skipped so a reload keeps the browser's restored position.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (!window.location.hash) window.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

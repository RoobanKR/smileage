'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function BackToTop() {
  const pathname = usePathname() || '/';
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 320); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  function scrollToTop() {
    // Ride the smooth scroller when it is running so the two never fight.
    if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // The admin form keeps its Save button in the bottom-right corner, where this would sit on top of it.
  if (pathname.startsWith('/admin') || pathname.startsWith('/superadmin')) return null;
  return <button type="button" className={visible ? 'back-to-top visible' : 'back-to-top'} onClick={scrollToTop} aria-label="Back to top" title="Back to top">
    <ArrowUp size={20} strokeWidth={2.6}/>
  </button>;
}

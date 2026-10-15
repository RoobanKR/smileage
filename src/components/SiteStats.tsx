'use client';
import { useEffect, useRef, useState } from 'react';
import { BadgeCheck, CarFront, MapPin, Store, Users } from 'lucide-react';
import type { SiteStats } from '@/lib/server/data';

type Tile = { key: string; value: number; label: string; caption: string; icon: React.ReactNode };

/** Counts up from zero each time the band scrolls into view (`run` goes up by one
 *  per entry). Anyone who has asked for reduced motion just gets the final number. */
function useCountUp(target: number, run: number, duration = 1100) {
  // null means "not animating", and the real figure is shown. The count-up is an
  // enhancement only: requestAnimationFrame is throttled in background tabs, and a
  // counter stuck on 0 would be worse than no animation at all.
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    if (!run) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / duration);
      // ease-out so it slows into the final figure rather than stopping dead
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration]);
  return value ?? target;
}

function StatTile({ tile, run }: { tile: Tile; run: number }) {
  const value = useCountUp(tile.value, run);
  return <div className="stat-tile">
    <span className="stat-icon">{tile.icon}</span>
    <strong>{value.toLocaleString('en-IN')}</strong>
    <span className="stat-label">{tile.label}</span>
    <small>{tile.caption}</small>
  </div>;
}

export default function SiteStatsBand({ stats }: { stats: SiteStats }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') { setRun(1); return; }
    // Count again on every entry: armed once the band has fully left the screen,
    // fired when a quarter of it is back.
    let armed = true;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) armed = true;
        else if (armed && entry.intersectionRatio >= 0.25) { armed = false; setRun(count => count + 1); }
      }
    }, { threshold: [0, 0.25] });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const tiles: Tile[] = [
    { key: 'stock', value: stats.vehiclesInStock, label: 'Vehicles in stock', caption: 'Across our inventory', icon: <CarFront size={18}/> },
    { key: 'customers', value: stats.happyCustomers, label: 'Happy customers', caption: 'Cars handed over', icon: <Users size={18}/> },
    { key: 'onsale', value: stats.vehiclesOnSale, label: 'Vehicles on sale', caption: 'Available right now', icon: <BadgeCheck size={18}/> },
    // No data source exists for partner dealers, so until a real figure is set in
    // config the band shows the cities we actually have cars in.
    stats.partnerDealers > 0
      ? { key: 'dealers', value: stats.partnerDealers, label: 'Partner dealers', caption: 'Working with us', icon: <Store size={18}/> }
      : { key: 'cities', value: stats.citiesCovered, label: 'Cities covered', caption: 'Where our cars are', icon: <MapPin size={18}/> }
  ];

  return <section className="market-stats" ref={ref}>
    <div className="container stat-grid">
      {tiles.map(tile => <StatTile key={tile.key} tile={tile} run={run}/>)}
    </div>
  </section>;
}

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CarFront, ChevronRight, CircleHelp, MessageSquareText, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CarCard from '@/components/CarCard';
import FeedbackSection from '@/components/FeedbackSection';
import SiteStatsBand from '@/components/SiteStats';
import { Car, Feedback, HeroMedia } from '@/lib/api';
import { getActiveHeroMedia, getSiteStats, listActiveCars, listFeedback } from '@/lib/server/data';
import JsonLd from '@/components/JsonLd';
import { BUSINESS, HOME_FAQ, faqJsonLd } from '@/lib/seo';
import { WHATSAPP_DISPLAY } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

/** Stagger index for the hero's bottom-up text reveal (see .reveal-line in marketplace.css). */
const step = (index: number) => ({ '--i': index } as CSSProperties);

export default async function Home() {
  const [cars, hero, feedback, stats] = await Promise.all([
    listActiveCars().catch(() => []) as Promise<Car[]>,
    getActiveHeroMedia().catch(() => null) as Promise<HeroMedia | null>,
    listFeedback({ limit: 5 }).catch(() => ({ items: [], total: 0 })) as Promise<{ items: Feedback[]; total: number }>,
    getSiteStats().catch(() => null)
  ]);
  const bodyTypes = ['SUV', 'Hatchback', 'Sedan'];
  const heroVideo = hero?.type === 'video' ? hero : null;
  const heroImage = hero?.type === 'image' ? hero : null;
  // A custom still swaps in through the --hero-image variable so every breakpoint keeps its own gradient.
  const heroStyle = heroImage ? ({ '--hero-image': `url("${heroImage.url}")` } as CSSProperties) : undefined;
  return <><SiteHeader/><main className="market-home">
    <section className={`market-hero${heroVideo ? ' market-hero-video' : ''}`} style={heroStyle}>{heroVideo && <><video className="market-hero-media" autoPlay muted loop playsInline preload="auto" poster={heroVideo.posterUrl || undefined} src={heroVideo.url}/><span className="market-hero-scrim" aria-hidden="true"/></>}<div className="container market-hero-inner"><div className="market-hero-copy" data-reveal=""><span className="market-hero-kicker reveal-fade" style={step(0)}><Sparkles size={15}/> SMILEAGE · CAR CONSULTING IN COIMBATORE</span><h1><span className="reveal-line" style={step(1)}><span>Car consulting in</span></span>{' '}<span className="reveal-line" style={step(2)}><span>Coimbatore</span></span>{' '}<span className="reveal-line" style={step(3)}><span><em>for a car you&apos;ll love.</em></span></span></h1><p className="reveal-fade" style={step(4)}>Smileage helps you buy and sell used cars in Coimbatore and across Tamil Nadu. Get honest car consulting from {BUSINESS.contactPerson} – call or WhatsApp <a href={`tel:${BUSINESS.phone}`}>{WHATSAPP_DISPLAY}</a>.</p><form action="/cars" className="market-hero-search reveal-fade" style={step(5)}><Search size={21}/><input name="search" aria-label="Search cars" placeholder="Search used cars by brand, model or city"/><button type="submit">Search cars <ArrowRight size={18}/></button></form><div className="market-hero-caption reveal-fade" style={step(6)}><span>Popular searches</span><Link href="/cars?body=SUV">SUV <ChevronRight size={13}/></Link><Link href="/cars?body=Sedan">Sedan <ChevronRight size={13}/></Link><Link href="/cars?body=Hatchback">Hatchback <ChevronRight size={13}/></Link></div></div></div></section>
    <section className="market-trust-bar"><div className="container"><span><Search size={19}/> Easy car search</span><span><SlidersHorizontal size={19}/> Useful filters</span><span><MessageSquareText size={19}/> Direct enquiries</span><span><CircleHelp size={19}/> Answers from our team</span></div></section>
    {stats && <SiteStatsBand stats={stats}/>}
    <section className="market-home-section"><div className="container"><div className="market-section-heading"><div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>START EXPLORING</span><h2><span className="reveal-line" style={step(1)}><span>What type of car fits you?</span></span></h2><p className="reveal-fade" style={step(2)}>Start with a body style, then refine the details.</p></div><Link href="/cars">Browse all cars <ArrowUpRight size={17}/></Link></div><div className="market-body-grid">{bodyTypes.map((body, index) => <Link href={`/cars?body=${encodeURIComponent(body)}`} className={`market-body-card body-${index}`} key={body}><div className="body-card-art"><CarFront size={72} strokeWidth={1.25}/></div><div><strong>{body}s</strong><span>Explore {body.toLowerCase()} cars <ArrowRight size={16}/></span></div></Link>)}</div></div></section>
    <section className="market-home-section market-featured"><div className="container"><div className="market-section-heading"><div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>THE LATEST LISTINGS</span><h2><span className="reveal-line" style={step(1)}><span>Cars to take a closer look at</span></span></h2><p className="reveal-fade" style={step(2)}>Every listing includes the price and key details up front.</p></div><Link href="/cars">View all cars <ArrowUpRight size={17}/></Link></div>{cars.length ? <div className="catalog-card-grid">{cars.slice(0, 6).map(car => <CarCard key={car._id} car={car}/>)}</div> : <div className="catalog-empty market-home-empty"><CarFront size={40}/><h3>Fresh listings are on the way</h3><p>New cars will appear here when they are added.</p><Link href="/cars">Explore the catalog <ArrowRight size={17}/></Link></div>}</div></section>
    <FeedbackSection entries={feedback.items} total={feedback.total}/>
    <section id="how-it-works" className="market-steps"><div className="container"><div className="market-section-heading"><div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>SIMPLE FROM START TO FINISH</span><h2><span className="reveal-line" style={step(1)}><span>Your next car in three easy steps</span></span></h2></div></div><div className="market-step-grid"><div><span>01</span><Search size={27}/><h3>Browse cars</h3><p>Use filters to find cars that match your budget and preferences.</p></div><div><span>02</span><CarFront size={27}/><h3>Check the details</h3><p>See photos, price, specifications and features in one place.</p></div><div><span>03</span><MessageSquareText size={27}/><h3>Send an enquiry</h3><p>Ask about a car and the team will follow up. No booking is needed.</p></div></div></div></section>
    <section className="market-local" aria-labelledby="local-heading"><div className="container market-local-grid"><div><div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>SMILEAGE, COIMBATORE</span><h2 id="local-heading"><span className="reveal-line" style={step(1)}><span>Car consulting &amp; used cars in Coimbatore</span></span></h2></div><p>Smileage is a car consulting and used car service based in Coimbatore, run by car consultant {BUSINESS.contactPerson} and serving buyers and sellers across Tamil Nadu. Whether you want to buy a used car in Coimbatore or sell your own, we help you find a fair price, check the car&apos;s condition and papers, and complete the deal without stress.</p><p>Every listing shows the asking price, kilometres, fuel type and photos up front. Found one you like? Call or WhatsApp {BUSINESS.contactPerson} on <a href={`tel:${BUSINESS.phone}`}>{WHATSAPP_DISPLAY}</a> and we will arrange a viewing in Coimbatore.</p><div className="market-local-links"><Link href="/car-consulting-coimbatore">Car consulting in Coimbatore <ArrowRight size={16}/></Link><Link href="/cars">Used cars for sale in Coimbatore <ArrowRight size={16}/></Link><Link href="/contact">Talk to {BUSINESS.contactPerson} <ArrowRight size={16}/></Link></div></div><div className="market-local-faq"><h3>Frequently asked questions</h3>{HOME_FAQ.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
    <JsonLd data={faqJsonLd()}/>
    <section className="market-home-cta"><div className="container"><div data-reveal=""><span className="reveal-fade" style={step(0)}>READY TO EXPLORE?</span><h2><span className="reveal-line" style={step(1)}><span>Your next car could be one search away.</span></span></h2><p className="reveal-fade" style={step(2)}>Browse the collection and get in touch when a car feels right.</p></div><Link href="/cars">Find your car <ArrowRight size={19}/></Link></div></section>
  </main><SiteFooter/></>;
}

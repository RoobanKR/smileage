import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeIndianRupee, CarFront, ClipboardCheck, FileCheck2, Handshake, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import { BUSINESS, BUSINESS_ADDRESS, OG_IMAGE, SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, generalMessage, whatsappLink } from '@/lib/whatsapp';

const PATH = '/car-consulting-coimbatore';

/** Stagger index for the bottom-up text reveal (see .reveal-line in marketplace.css). */
const step = (index: number) => ({ '--i': index } as CSSProperties);
const TITLE = 'Car Consulting in Coimbatore – Car Consultant David Raja';
const DESCRIPTION = `Looking for car consulting in Coimbatore? Smileage car consultant ${BUSINESS.contactPerson} helps you buy or sell a used car at the right price. Call or WhatsApp ${WHATSAPP_DISPLAY}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['car consulting Coimbatore', 'car consulting in Coimbatore', 'car consultant Coimbatore', 'car consulting near me', 'car consultant near me', 'car consalting Coimbatore', 'used car consultant Coimbatore', 'Smileage', 'David Raja car consultant'],
  alternates: { canonical: PATH },
  openGraph: { type: 'website', url: PATH, title: `${TITLE} | Smileage`, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: `${TITLE} | Smileage`, description: DESCRIPTION, images: [OG_IMAGE.url] }
};

const SERVICES = [
  { icon: CarFront, title: 'Choose the right car', text: 'Tell us your budget and needs. We shortlist used cars in Coimbatore that suit you, petrol, diesel or CNG, hatchback, sedan or SUV.' },
  { icon: ClipboardCheck, title: 'Car inspection', text: 'We check the engine, body, tyres, accident history and service record before you pay anything.' },
  { icon: FileCheck2, title: 'Papers & RC transfer', text: 'RC, insurance, loan clearance (NOC) and ownership transfer at the Coimbatore RTO, handled step by step.' },
  { icon: BadgeIndianRupee, title: 'Fair price & valuation', text: 'Know the real market value before you buy or sell, so you never overpay or sell too cheap.' },
  { icon: Handshake, title: 'Sell your car', text: 'Want to sell your car in Coimbatore? Send the details on WhatsApp and we find a genuine buyer.' },
  { icon: MessageCircle, title: 'Loan guidance', text: 'Help with used car loans and the paperwork so the purchase goes smoothly.' }
];

const FAQ = [
  { q: 'Where can I find car consulting near me in Coimbatore?', a: `Smileage offers car consulting across Coimbatore, including Gandhipuram, RS Puram, Peelamedu, Saravanampatti and Singanallur. Call or WhatsApp ${BUSINESS.contactPerson} on ${WHATSAPP_DISPLAY}.` },
  { q: 'Why should I use a car consultant to buy a used car?', a: 'A car consultant checks the car and its papers, tells you the fair market price and helps with the transfer, so you avoid hidden problems and overpaying.' },
  { q: 'Who is the car consultant at Smileage?', a: `${BUSINESS.contactPerson} is the car consultant at Smileage, Coimbatore. You can reach ${BUSINESS.contactPerson} directly on ${WHATSAPP_DISPLAY} by phone or WhatsApp.` },
  { q: 'Do you cover Tiruppur and Pollachi?', a: 'Yes. Smileage helps car buyers and sellers in Coimbatore, Tiruppur, Pollachi, Mettupalayam, Sulur, Palladam and Annur.' }
];

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: 'Car Consulting in Coimbatore',
  serviceType: 'Car consulting',
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: BUSINESS.areaServed.map(name => ({ '@type': 'Place', name: `${name}, Tamil Nadu` })),
  availableChannel: { '@type': 'ServiceChannel', servicePhone: { '@type': 'ContactPoint', telephone: BUSINESS.phone, name: BUSINESS.contactPerson }, serviceUrl: absoluteUrl(PATH) },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Car consulting services', itemListElement: SERVICES.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, description: service.text } })) }
};

export default function CarConsultingCoimbatore() {
  return <><SiteHeader/><JsonLd data={[serviceJsonLd, faqJsonLd(FAQ), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Car consulting in Coimbatore', path: PATH }])]}/><main>
    <section className="contact-page"><div className="container contact-inner" data-reveal="">
      <div className="eyebrow reveal-fade" style={step(0)}><span className="eyebrow-line"/> SMILEAGE · CAR CONSULTING</div>
      <h1><span className="reveal-line" style={step(1)}><span>Car consulting in</span></span>{' '}<span className="reveal-line" style={step(2)}><span>Coimbatore</span></span></h1>
      <p className="reveal-fade" style={step(3)}>Buying or selling a used car in Coimbatore? Smileage car consultant {BUSINESS.contactPerson} helps you choose the right car, check its condition and papers, and close the deal at a fair price.</p>
      <address className="contact-nap">
        <strong>{BUSINESS.name} – Car Consulting, {BUSINESS.city}</strong>
        <span><UserRound size={16}/>{BUSINESS.contactPerson}, Car Consultant</span>
        <a href={`tel:+${WHATSAPP_NUMBER}`}><Phone size={16}/>Call {WHATSAPP_DISPLAY}</a>
        <a href={whatsappLink(generalMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>WhatsApp {WHATSAPP_DISPLAY}</a>
        <span><MapPin size={16}/>{BUSINESS_ADDRESS}</span>
      </address>
      <div className="contact-actions"><a href={`tel:+${WHATSAPP_NUMBER}`} className="button button-primary">Call {BUSINESS.contactPerson} <ArrowRight size={18}/></a><a href={whatsappLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="button button-secondary">Chat on WhatsApp <ArrowRight size={18}/></a></div>
    </div></section>
    <section className="market-home-section"><div className="container"><div className="market-section-heading"><div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>WHAT WE DO</span><h2><span className="reveal-line" style={step(1)}><span>Car consulting services in Coimbatore</span></span></h2><p className="reveal-fade" style={step(2)}>Everything you need to buy or sell a used car with confidence.</p></div></div>
      <div className="market-step-grid consulting-services">{SERVICES.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={27}/><h3>{title}</h3><p>{text}</p></div>)}</div>
    </div></section>
    <section className="market-local" aria-labelledby="areas-heading"><div className="container market-local-grid"><div>
      <div data-reveal=""><span className="market-overline reveal-fade" style={step(0)}>AREAS WE SERVE</span>
      <h2 id="areas-heading"><span className="reveal-line" style={step(1)}><span>Car consultant near you in Coimbatore</span></span></h2></div>
      <p>Smileage works across Coimbatore city and nearby towns. Wherever you are, call {BUSINESS.contactPerson} on <a href={`tel:+${WHATSAPP_NUMBER}`}>{WHATSAPP_DISPLAY}</a> and we will meet you to see the car.</p>
      <ul className="market-local-areas">{BUSINESS.areaServed.map(area => <li key={area}>Car consulting {area}</li>)}</ul>
      <div className="market-local-links"><Link href="/cars">Used cars for sale in Coimbatore <ArrowRight size={16}/></Link><Link href="/contact">Contact Smileage <ArrowRight size={16}/></Link></div>
    </div><div className="market-local-faq"><h3>Car consulting questions</h3>{FAQ.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
  </main><SiteFooter/></>;
}

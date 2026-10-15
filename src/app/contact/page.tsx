import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import { BUSINESS, BUSINESS_ADDRESS, breadcrumbJsonLd } from '@/lib/seo';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, generalMessage, whatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact David Raja – Car Consulting in Coimbatore',
  description: `Contact Smileage for car consulting and used cars in Coimbatore. Call or WhatsApp car consultant ${BUSINESS.contactPerson} on ${WHATSAPP_DISPLAY}.`,
  alternates: { canonical: '/contact' }
};

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS.name} car consulting, ${BUSINESS_ADDRESS}`)}`;

export default function Contact() {
  return <><SiteHeader/><JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])}/><main className="contact-page"><div className="container contact-inner">
    <div className="eyebrow"><span className="eyebrow-line"/> CONTACT SMILEAGE</div>
    <h1>Car consulting in Coimbatore – talk to {BUSINESS.contactPerson}.</h1>
    <p>Looking for a used car in Coimbatore, or need advice before you buy or sell? Call or WhatsApp {BUSINESS.contactPerson} at Smileage on {WHATSAPP_DISPLAY}. You can also open any car listing and send an enquiry, and we will follow up.</p>
    <address className="contact-nap">
      <strong>{BUSINESS.name} – Car Consulting</strong>
      <span><UserRound size={16}/>{BUSINESS.contactPerson}, Car Consultant</span>
      <a href={mapsLink} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>{BUSINESS_ADDRESS}</a>
      <a href={`tel:+${WHATSAPP_NUMBER}`}><Phone size={16}/>Call {WHATSAPP_DISPLAY}</a>
      <a href={whatsappLink(generalMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>WhatsApp {WHATSAPP_DISPLAY}</a>
      {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={16}/>{CONTACT_EMAIL}</a>}
    </address>
    <div className="contact-actions"><a href={whatsappLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="button button-primary">Chat on WhatsApp <ArrowRight size={18}/></a><Link href="/cars" className="button button-secondary">Browse used cars <ArrowRight size={18}/></Link></div>
  </div></main><SiteFooter/></>;
}

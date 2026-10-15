import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone, UserRound } from 'lucide-react';
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PERSON, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, generalMessage, whatsappLink } from '@/lib/whatsapp';

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link href="/" className="brand footer-brand"><img className="footer-logo" src="/smileage-logo-light.png" alt="Smileage car consulting Coimbatore logo" width={640} height={558}/></Link>
        <p>Smileage – trusted car consulting and used cars in Coimbatore. Buy or sell your car with honest advice from {CONTACT_PERSON}.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <Link href="/cars">Browse cars</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/car-consulting-coimbatore">Car consulting in Coimbatore</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="footer-contact">
        <h4>Get in touch</h4>
        <span className="footer-line"><UserRound size={15}/><span>{CONTACT_PERSON}</span></span>
        <span className="footer-line"><MapPin size={15}/><span>{CONTACT_ADDRESS}</span></span>
        {/* The phone number is also the WhatsApp number, so tapping it starts a chat. */}
        <a className="footer-line" href={whatsappLink(generalMessage)} target="_blank" rel="noopener noreferrer"><Phone size={15}/><span>{WHATSAPP_DISPLAY}</span></a>
        {CONTACT_EMAIL && <a className="footer-line" href={`mailto:${CONTACT_EMAIL}`}><Mail size={15}/><span>{CONTACT_EMAIL}</span></a>}
        <a className="footer-line" href={`tel:+${WHATSAPP_NUMBER}`}>Call instead <ArrowUpRight size={14}/></a>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} Smileage, Coimbatore. All rights reserved.</span>
      <Link href="/admin">Admin</Link>
    </div>
  </footer>;
}

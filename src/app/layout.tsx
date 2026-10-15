import type { Metadata, Viewport } from 'next';
import './globals.css';
import './marketplace.css';
import './admin.css';
import QueryProvider from '@/components/QueryProvider';
import BackToTop from '@/components/BackToTop';
import CompareBar from '@/components/CompareBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import ScrollReveal from '@/components/ScrollReveal';
import SmoothScroll from '@/components/SmoothScroll';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { BUSINESS, DEFAULT_DESCRIPTION, DEFAULT_TITLE, KEYWORDS, OG_IMAGE, SITE_NAME, SITE_URL, businessJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s | Smileage Coimbatore' },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'automotive',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE]
  },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [OG_IMAGE.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  // Paste the code from Google Search Console (HTML tag method) into this env var.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: true },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': `${BUSINESS.city}, ${BUSINESS.district}, ${BUSINESS.state}`,
    'geo.position': `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`
  }
};

export const viewport: Viewport = { themeColor: '#4736d4', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN"><body><JsonLd data={[businessJsonLd(), websiteJsonLd()]}/><QueryProvider>{children}<CompareBar/><WhatsAppButton/><BackToTop/><ScrollReveal/><SmoothScroll/></QueryProvider><SpeedInsights/></body></html>;
}

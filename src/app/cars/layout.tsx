import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Used Cars for Sale in Coimbatore', template: '%s | Smileage' },
  description: 'Browse used cars for sale in Coimbatore and across Tamil Nadu. Filter second-hand cars by brand, price, fuel and body type, then get car consulting from Smileage – call or WhatsApp 96009 09652.',
  alternates: { canonical: '/cars' },
  openGraph: { url: '/cars', title: 'Used Cars for Sale in Coimbatore | Smileage', description: 'Second-hand cars in Coimbatore with clear prices, full details and expert car consulting.' }
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

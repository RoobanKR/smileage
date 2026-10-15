import type { Car } from './api';
import { carHref } from './api';
import { CONTACT_EMAIL, CONTACT_PERSON, WHATSAPP_NUMBER } from './whatsapp';

/** Public address of the site. Every canonical link, sitemap entry and social
 *  preview is built from it, so set NEXT_PUBLIC_SITE_URL once a custom domain
 *  (e.g. https://smileage.in) is connected in Vercel. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://car-consalting.vercel.app').replace(/\/+$/, '');

export const SITE_NAME = 'Smileage';

export const LOGO_PATH = '/smileage-logo.png';
/** 1200x630 share card: logo, "car consulting in Coimbatore", David Raja and the number. */
export const OG_IMAGE = { url: '/smileage-og.png', width: 1200, height: 630, alt: 'Smileage – car consulting in Coimbatore. David Raja, call or WhatsApp 96009 09652' };

export const BUSINESS = {
  name: 'Smileage',
  legalName: 'Smileage – Car Consulting & Used Cars, Coimbatore',
  contactPerson: CONTACT_PERSON,
  phone: `+${WHATSAPP_NUMBER}`,
  email: CONTACT_EMAIL,
  /** Add the shop's street and PIN code here once it has a fixed address; empty
   *  values are left out of the page and the schema. */
  street: '',
  city: 'Coimbatore',
  district: 'Coimbatore',
  state: 'Tamil Nadu',
  postalCode: '',
  country: 'IN',
  // Coimbatore city centre. Replace with the exact shop pin from Google Maps for best local results.
  latitude: 11.0168,
  longitude: 76.9558,
  /** Based in Coimbatore, working with buyers and sellers anywhere in the state. */
  region: 'Tamil Nadu'
};

/** Where the business works, for structured data: the whole state, with Coimbatore as its base. */
export const AREA_SERVED = [
  { '@type': 'State', name: 'Tamil Nadu', containedInPlace: { '@type': 'Country', name: 'India' } },
  { '@type': 'City', name: 'Coimbatore' }
];

/** "Coimbatore, Tamil Nadu" with the street and PIN added when they are known. */
export const BUSINESS_ADDRESS = [BUSINESS.street, BUSINESS.city, [BUSINESS.state, BUSINESS.postalCode].filter(Boolean).join(' ')].filter(Boolean).join(', ');

export const DEFAULT_TITLE = 'Smileage | Car Consulting in Coimbatore – Used Cars & Car Consultant';
export const DEFAULT_DESCRIPTION = 'Smileage is a trusted car consulting service in Coimbatore. Buy or sell used cars with expert help from car consultant David Raja – call or WhatsApp +91 96009 09652. Serving buyers and sellers across Tamil Nadu.';

export const KEYWORDS = [
  'Smileage', 'Smileage cars', 'Smileage car consulting', 'Smileage Coimbatore', 'smile age cars',
  'car consulting', 'car consulting Coimbatore', 'car consulting in Coimbatore', 'car consultant Coimbatore',
  'car consultant near me', 'car consulting near me', 'car consultancy Coimbatore', 'car consalting', 'car consalting Coimbatore',
  'used cars Coimbatore', 'used car dealer Coimbatore', 'second hand cars Coimbatore', 'pre-owned cars Coimbatore',
  'buy used car Coimbatore', 'sell my car Coimbatore', 'car broker Coimbatore', 'car consulting Tamil Nadu', 'car consultant Tamil Nadu', 'used cars Tamil Nadu', 'second hand cars Tamil Nadu',
  'David Raja car consultant'
];

export const absoluteUrl = (path = '/') => (/^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`);

export const carTitle = (car: Pick<Car, 'year' | 'brand' | 'model'>) => `${car.year} ${car.brand} ${car.model}`;

const inr = (value: number) => `₹${Number(value).toLocaleString('en-IN')}`;

export function carDescription(car: Car) {
  return `Used ${carTitle(car)} for sale in ${car.location || BUSINESS.city} at ${inr(car.price)}. ${Number(car.kmDriven).toLocaleString('en-IN')} km, ${car.fuelType}, ${car.transmission}. Enquire with Smileage, car consulting in Coimbatore.`;
}

/** The business itself. AutoDealer is the schema.org type Google uses for car
 *  dealers in local results and the knowledge panel. */
export function businessJsonLd() {
  const address: Record<string, string> = { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressRegion: BUSINESS.state, addressCountry: BUSINESS.country };
  if (BUSINESS.street) address.streetAddress = BUSINESS.street;
  if (BUSINESS.postalCode) address.postalCode = BUSINESS.postalCode;
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'ProfessionalService'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: ['Smileage Cars', 'Smileage Car Consulting', 'Smile Age Cars', BUSINESS.legalName],
    slogan: 'Car Deal',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    image: [absoluteUrl(OG_IMAGE.url), absoluteUrl(LOGO_PATH)],
    telephone: BUSINESS.phone,
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address,
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
    areaServed: AREA_SERVED,
    knowsAbout: ['Car consulting', 'Used car sales', 'Second-hand car buying advice', 'Selling used cars', 'Car valuation', 'Car loan and RC transfer guidance'],
    makesOffer: ['Car consulting', 'Used car buying assistance', 'Sell your car', 'Car valuation'].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${name} in ${BUSINESS.region}`, areaServed: AREA_SERVED } })),
    employee: { '@type': 'Person', name: BUSINESS.contactPerson, jobTitle: 'Car Consultant', telephone: BUSINESS.phone },
    founder: { '@type': 'Person', name: BUSINESS.contactPerson },
    contactPoint: [
      { '@type': 'ContactPoint', name: BUSINESS.contactPerson, telephone: BUSINESS.phone, contactType: 'sales', areaServed: 'IN', availableLanguage: ['English', 'Tamil'] },
      { '@type': 'ContactPoint', name: `${BUSINESS.contactPerson} (WhatsApp)`, telephone: BUSINESS.phone, contactType: 'customer service', url: `https://wa.me/${WHATSAPP_NUMBER}`, availableLanguage: ['English', 'Tamil'] }
    ]
  };
}

/** Lets Google show a search box for the site and ties the brand name to it. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ['Smileage Cars', 'Smileage Car Consulting'],
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/cars?search={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function carJsonLd(car: Car) {
  const url = absoluteUrl(carHref(car));
  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Car'],
    name: carTitle(car),
    description: car.description || carDescription(car),
    url,
    image: (car.images || []).map(image => absoluteUrl(image.url)),
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    bodyType: car.bodyType,
    itemCondition: 'https://schema.org/UsedCondition',
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.kmDriven, unitCode: 'KMT' },
    offers: {
      '@type': 'Offer',
      url,
      price: car.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      areaServed: car.location || BUSINESS.city,
      seller: { '@id': `${SITE_URL}/#business` }
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) }))
  };
}

export const HOME_FAQ = [
  { q: 'Who is a good car consultant in Coimbatore?', a: 'Smileage is a car consulting service in Coimbatore run by David Raja. We help you choose the right used car, check its condition and papers, and agree a fair price. Call or WhatsApp +91 96009 09652.' },
  { q: 'What does car consulting at Smileage include?', a: 'Our car consulting in Coimbatore covers picking a car for your budget, inspecting the car, checking RC, insurance and service history, comparing prices, loan guidance and completing the ownership transfer.' },
  { q: 'Where can I buy a used car in Coimbatore?', a: 'Browse second-hand cars on the Smileage website with clear prices, photos and full details, then call or WhatsApp David Raja to see the car in Coimbatore.' },
  { q: 'Can I sell my car through Smileage?', a: 'Yes. Send your car details to +91 96009 09652 on WhatsApp and we will guide you on a fair price and help you find a buyer in Coimbatore.' },
  { q: 'Do you help buyers outside Coimbatore?', a: 'Yes. Smileage is based in Coimbatore and helps car buyers and sellers across all of Tamil Nadu. Wherever you are in the state, call or WhatsApp +91 96009 09652.' }
];

export function faqJsonLd(items = HOME_FAQ) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
  };
}

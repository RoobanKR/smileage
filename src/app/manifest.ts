import type { MetadataRoute } from 'next';
import { DEFAULT_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Smileage – Car Consulting Coimbatore',
    short_name: 'Smileage',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4736d4',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
  };
}

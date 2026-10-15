import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: 'Read reviews from customers who bought used cars and took car consulting from Smileage in Coimbatore, Tamil Nadu.',
  alternates: { canonical: '/feedback' }
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}

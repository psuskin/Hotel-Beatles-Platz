import { unstable_setRequestLocale } from 'next-intl/server';
import ZimmerClient from './ZimmerClient';

export default function ZimmerPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <ZimmerClient />;
}
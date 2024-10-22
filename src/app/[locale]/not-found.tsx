'use client';

import '@/app/globals.css';
import { useRouter } from 'next/navigation';
import { FaHotel, FaConciergeBell, FaBed, FaUtensils } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-primary-color">404</h1>
        <h2 className="text-3xl mb-4">{t('title')}</h2>
        <p className="text-xl mb-8 max-w-md mx-auto">
          {t('description')} {t('suggestion')}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <button onClick={() => router.push('/zimmer')} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FaBed className="text-3xl mb-2 text-primary-color" />
            <span>{t('rooms')}</span>
          </button>
          <button onClick={() => router.push('/restaurant')} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FaUtensils className="text-3xl mb-2 text-primary-color" />
            <span>{t('restaurant')}</span>
          </button>
          <button onClick={() => router.push('/services')} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FaConciergeBell className="text-3xl mb-2 text-primary-color" />
            <span>{t('services')}</span>
          </button>
          <button onClick={() => router.push('/kontakt')} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FaHotel className="text-3xl mb-2 text-primary-color" />
            <span>{t('contact')}</span>
          </button>
        </div>
        <button onClick={() => router.push('/')} className="bg-primary-color text-white px-6 py-3 rounded-full hover:bg-primary-color-dark transition-colors duration-300">
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
}

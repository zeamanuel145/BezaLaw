'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Card Container */}
        <div className="border-4 border-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-white p-8 md:p-12">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900">
                {t('about.title')}
              </h2>
            </div>

            {/* Attorneys */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* =================== Beza =================== */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-80 rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
                  <Image
                    src="/images/beza.jpg"
                    alt={t('about.beza.name')}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-gray-900 text-center">
                  {t('about.beza.name')}
                </h3>

                <p className="text-gray-500 text-center mb-8">
                  {t('about.beza.title')}
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t('about.beza.bio1')}</p>
                  <p>{t('about.beza.bio2')}</p>
                  <p>{t('about.beza.bio3')}</p>
                </div>
              </div>

              {/* =================== Tesfaye =================== */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-80 rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
                  <Image
                    src="/images/tesfaye.jpg"
                    alt={t('about.tesfaye.name')}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-gray-900 text-center">
                  {t('about.tesfaye.name')}
                </h3>

                <p className="text-gray-500 text-center mb-8">
                  {t('about.tesfaye.title')}
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t('about.tesfaye.bio1')}</p>
                  <p>{t('about.tesfaye.bio2')}</p>
                  <p>{t('about.tesfaye.bio3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
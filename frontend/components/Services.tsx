'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const serviceKeys = ['mining', 'aviation', 'sustainable', 'immigration'];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-sky-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-2xl text-gray-700 text-balance max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {serviceKeys.map((key) => (
            <Card
              key={key}
              className="hover:shadow-[0_20px_50px_rgba(56,189,248,0.4)] transform hover:-translate-y-2 transition-all duration-500 p-6 bg-white rounded-2xl"
            >
              <CardHeader className="mb-4">
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {t(`services.${key}.name`)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t(`services.${key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
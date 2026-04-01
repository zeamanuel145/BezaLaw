'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder for lawyer image */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-lg">Beza Tesfaye Profile</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {t('about.title')}
            </h2>
            <p className="text-xl text-blue-600 font-semibold mb-6">
              {t('about.subtitle')}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {t('about.bio')}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {t('about.bio2')}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t('about.bio3')}
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('about.education')}
                  </h3>
                  <p className="text-gray-600">
                    Sorbonne Law School in Paris & University of Washington
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('about.experience')}
                  </h3>
                  <p className="text-gray-600">
                    Expertise in immigration, mining, aviation, and sustainable development law
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Human Rights Leadership
                  </h3>
                  <p className="text-gray-600">
                    Recognized as a Human Rights Award Leader by the Seattle Human Rights Commission
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

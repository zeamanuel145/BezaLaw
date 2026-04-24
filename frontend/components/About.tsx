'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Award } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Card Container */}
        <div className="border-4 border-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-white p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-64 h-80 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Beza Tesfaye</p>
                    <p className="text-gray-300 text-xs mt-2">Profile Photo</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                {/* Header Section */}
                <div className="mb-8">
                  <h2 className="text-5xl font-bold text-gray-900 mb-2">
                    {t('about.title')}
                  </h2>
                  <p className="text-sm text-gray-500 tracking-wide">
                    International Attorney
                  </p>
                </div>

                {/* Bio Content */}
                <div className="space-y-4 mb-10">
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.bio')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.bio2')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('about.bio3')}
                  </p>
                </div>

                {/* Credentials Section */}
                <div className="space-y-6 pt-6 border-t border-gray-200">
                  {/* Credential 1 - Education */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {t('about.education')}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Sorbonne Law School in Paris & University of Washington
                      </p>
                    </div>
                  </div>

                  {/* Credential 2 - Experience */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {t('about.experience')}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Expertise in immigration, mining, aviation, and sustainable development law
                      </p>
                    </div>
                  </div>

                  {/* Credential 3 - Human Rights */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {t('about.commitment')}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Recognized as a Human Rights Award Leader by the Seattle Human Rights Commission
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

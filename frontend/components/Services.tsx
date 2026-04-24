'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Gavel, Building2, Globe, Plane } from 'lucide-react';

const serviceKeys = ['mining', 'aviation', 'sustainable', 'immigration'];

// Service icons mapping
const serviceIcons: Record<string, React.ReactNode> = {
  mining: <Building2 className="w-12 h-12" />,
  aviation: <Plane className="w-12 h-12" />,
  sustainable: <Globe className="w-12 h-12" />,
  immigration: <Gavel className="w-12 h-12" />,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section 
      id="services" 
      className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22><defs><pattern id=%22grid%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22><path d=%22M 40 0 L 0 0 0 40%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.02)%22 stroke-width=%221%22/></pattern></defs><rect width=%221200%22 height=%22800%22 fill=%22url(%23grid)%22/></svg>')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4">
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              {t('services.subtitle') ? t('services.subtitle').split(' ')[0] : 'Services'}
            </p>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 text-pretty">
            {t('services.title')}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceKeys.map((key) => (
            <div 
              key={key}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/10"
            >
              {/* Icon */}
              <div className="mb-6 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                {serviceIcons[key]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
                {t(`services.${key}.name`)}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-4">
                {t(`services.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
   const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  const { t } = useLanguage();

  return (
  <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center overflow-hidden">
  
  {/*  BLOBS */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    
    <div
      className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40"
      style={{ animation: "floatSlow 20s ease-in-out infinite" }}
    />

    <div
      className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-sky-300 rounded-full blur-3xl opacity-40"
      style={{ animation: "floatSlow 25s ease-in-out infinite reverse" }}
    />

    <div
      className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-cyan-200 rounded-full blur-2xl opacity-30 -translate-x-1/2 -translate-y-1/2"
      style={{ animation: "floatSlow 30s ease-in-out infinite" }}
    />

  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    <div className="text-center md:text-left">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
        {t('hero.title')}
      </h1>

      <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl">
        {t('hero.subtitle')}
      </p>

      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        onClick={() => window.open(calendlyUrl, '_blank')}
      >
        {t('hero.cta')}
      </Button>
    </div>
{/* image */}
    <div className="flex justify-center">
      <img
        src="/images/Poster.png"
        alt="Poster"
        className="w-full max-w-md object-contain"
      />
    </div>

  </div>
</section>
  );
}

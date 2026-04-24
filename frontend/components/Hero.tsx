'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Gavel } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-50 overflow-hidden ">
      {/* Background grid pattern on dark side */}
      <div className="absolute inset-0 left-0 w-1/2 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22><defs><pattern id=%22grid%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22><path d=%22M 40 0 L 0 0 0 40%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.03)%22 stroke-width=%221%22/></pattern></defs><rect width=%221200%22 height=%22800%22 fill=%22url(%23grid)%22/></svg>')] opacity-20"></div>

      {/* Decorative shape background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-white space-y-8">

            {/* Main Heading */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-serif font-bold text-white leading-tight text-pretty mb-6">
                {t('hero.title')}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-slate-200 leading-relaxed max-w-lg text-balance">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => window.open(calendlyUrl, '_blank')}
                className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                {t('hero.cta') || 'Book Now'}
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          {/* Right Side - Scales of Justice Image */}
          <div className="hidden lg:flex items-center justify-center relative bg-blur-200">
            <div className="relative w-full max-w-md h-screen flex items-center justify-center">
              {/* Background light section */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 rounded-3xl"></div> */}
              {/* Image container */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <img 
                  src="/images/hero.png" 
                  alt="Scales of Justice"
                 // className="max-w-sm max-h-96 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

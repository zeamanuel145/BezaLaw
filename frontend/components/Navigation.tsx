'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL!;

  const { t, language, changeLanguage } = useLanguage();

  const [showNav, setShowNav] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show navbar
      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      // Scroll styling
      setIsScrolled(currentScrollY > 50);

      // Active section detection
      const sections = ['services', 'about', 'contact'];
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
        ${showNav ? 'translate-y-0' : '-translate-y-full'}
        ${
          isScrolled
            ? 'bg-sky-100/70 backdrop-blur-lg shadow-md border-b border-white/20 h-14'
            : 'bg-transparent h-16'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo */}
          <a href="/" >
          <h1 className="text-2xl font-bold text-blue-600">
            Law Firm
          </h1>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            
            {['services', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`
                  relative transition
                  ${
                    activeSection === section
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                {t(`nav.${section}`)}

                {/* underline animation */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
                    ${activeSection === section ? 'w-full' : 'w-0'}
                  `}
                />
              </button>
            ))}

          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            
            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('am')}>
                  አማርኛ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA */}
            <Button
              onClick={() => window.open(calendlyUrl, '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              {t('nav.booking')}
            </Button>

          </div>
        </div>
      </div>
    </nav>
  );
}
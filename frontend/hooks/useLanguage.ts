import { useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'am';

interface Translations {
  [key: string]: any;
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['en', 'fr', 'am'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        setTranslations(data);
        localStorage.setItem('language', language);
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string, defaultValue = key) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  };

  return {
    language,
    changeLanguage,
    t,
    isLoading,
  };
}

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Law Firm</h3>
            <p className="text-gray-400">
              Professional legal services dedicated to your success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white transition">Immigration</a></li>
              <li><a href="#services" className="hover:text-white transition">Sustainable International Development</a></li>
              <li><a href="#services" className="hover:text-white transition">Aviation</a></li>
              <li><a href="#services" className="hover:text-white transition">Mining</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@lawfirm.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Law Street, City, State</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2026 Law Firm. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

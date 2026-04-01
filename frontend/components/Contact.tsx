'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuccessMessage } from '@/components/SuccessMessage';
import { FormErrors } from '@/components/FormErrors';
import { validateContactForm, type ContactFormData, type ValidationError } from '@/lib/validation';
import { API_ENDPOINTS, SUCCESS_MESSAGES } from '@/lib/constants';

export function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrors([{ field: 'form', message: 'Failed to submit form. Please try again.' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors([{ field: 'form', message: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-sky-100/50">
      {showSuccess && (
        <SuccessMessage 
          message={t('contact.success')} 
          onDismiss={() => setShowSuccess(false)}
        />
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-balance">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-6">
              {/* Email Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <a
                    href="mailto:contact@lawfirm.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact@lawfirm.com
                  </a>
                </CardContent>
              </Card>

              {/* WhatsApp Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <a
                    href="https://wa.me/+12065350327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Chat with us on WhatsApp
                  </a>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {t('footer.hours')}
                  </h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('contact.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {errors.length > 0 && <FormErrors errors={errors} />}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name')}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.name')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.phone')}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.phone')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')}
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.subject')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.message')}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? 'Sending...' : t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

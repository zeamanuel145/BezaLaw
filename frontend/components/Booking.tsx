'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormErrors } from '@/components/FormErrors';
import { validateBookingForm, type BookingFormData, type ValidationError } from '@/lib/validation';

interface BookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Booking({ isOpen, onClose }: BookingProps) {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    description: '',
    serviceId: '',
  });

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(errors.filter(err => err.field !== name));
  };

  const handleRedirect = () => {
    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = `${calendlyUrl}?name=${encodeURIComponent(formData.clientName)}&email=${encodeURIComponent(formData.clientEmail)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t('booking.title')}</CardTitle>
          <CardDescription>{t('booking.subtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          {errors.length > 0 && <FormErrors errors={errors} />}

          <div className="space-y-4">
            <Input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder={t('booking.yourName')}
            />
            <FormErrors errors={errors} fieldName="clientName" />

            <Input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              placeholder={t('booking.yourEmail')}
            />
            <FormErrors errors={errors} fieldName="clientEmail" />

            <Input
              type="tel"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              placeholder={t('booking.yourPhone')}
            />
            <FormErrors errors={errors} fieldName="clientPhone" />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('booking.description')}
              className="w-full p-2 border rounded-md"
              rows={3}
            />

            <div className="flex gap-4 justify-end mt-6">
              <Button variant="outline" onClick={onClose}>
                {t('common.cancel') || 'Cancel'}
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleRedirect}
              >
                {t('booking.bookButton') || 'Book via Calendly'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
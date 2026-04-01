import { ERROR_MESSAGES } from './constants';

export interface ValidationError {
  field: string;
  message: string;
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (basic international format)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Contact form validation
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const validateContactForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name.trim()) {
    errors.push({ field: 'name', message: ERROR_MESSAGES.REQUIRED_FIELD });
  }

  if (!data.email.trim()) {
    errors.push({ field: 'email', message: ERROR_MESSAGES.REQUIRED_FIELD });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: ERROR_MESSAGES.INVALID_EMAIL });
  }

  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: ERROR_MESSAGES.REQUIRED_FIELD });
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: ERROR_MESSAGES.INVALID_PHONE });
  }

  if (!data.subject.trim()) {
    errors.push({ field: 'subject', message: ERROR_MESSAGES.REQUIRED_FIELD });
  }

  if (!data.message.trim()) {
    errors.push({ field: 'message', message: ERROR_MESSAGES.REQUIRED_FIELD });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long.' });
  }

  return errors;
};

// Booking form validation
export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  description: string;
  serviceId: string;
}

export const validateBookingForm = (data: BookingFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.clientName.trim()) {
    errors.push({ field: 'clientName', message: ERROR_MESSAGES.REQUIRED_FIELD });
  }

  if (!data.clientEmail.trim()) {
    errors.push({ field: 'clientEmail', message: ERROR_MESSAGES.REQUIRED_FIELD });
  } else if (!validateEmail(data.clientEmail)) {
    errors.push({ field: 'clientEmail', message: ERROR_MESSAGES.INVALID_EMAIL });
  }

  if (!data.clientPhone.trim()) {
    errors.push({ field: 'clientPhone', message: ERROR_MESSAGES.REQUIRED_FIELD });
  } else if (!validatePhone(data.clientPhone)) {
    errors.push({ field: 'clientPhone', message: ERROR_MESSAGES.INVALID_PHONE });
  }

  if (!data.appointmentDate.trim()) {
    errors.push({ field: 'appointmentDate', message: ERROR_MESSAGES.REQUIRED_FIELD });
  }

  return errors;
};

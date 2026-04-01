// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  // Contact endpoints
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact/submit`,

  // Booking endpoints
  BOOKING_CREATE: `${API_BASE_URL}/api/bookings/create`,
  BOOKING_AVAILABLE: `${API_BASE_URL}/api/bookings/available`,

  // Services endpoints
  SERVICES_LIST: `${API_BASE_URL}/api/services`,

  // Lawyer endpoints
  LAWYER_PROFILE: `${API_BASE_URL}/api/lawyer/profile`,
} as const;

// Navigation Links
export const NAVIGATION_LINKS = {
  SERVICES: 'services',
  ABOUT: 'about',
  CONTACT: 'contact',
  BOOKING: 'booking',
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'beza@bezalawfirm.com',
  PHONE: '+1 (206) XXX-XXXX',
  ADDRESS: 'Seattle, Washington',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  REQUIRED_FIELD: 'This field is required.',
  FORM_SUBMISSION_ERROR: 'Failed to submit form. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: 'Thank you! Your message has been sent successfully.',
  BOOKING_CREATED: 'Your appointment has been booked successfully.',
} as const;

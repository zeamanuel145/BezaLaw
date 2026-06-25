'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Booking } from '@/components/Booking';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClose = () => setIsBookingOpen(false);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Booking isOpen={isBookingOpen} onClose={handleBookingClose} />
      <Footer />
    </main>
  );
}

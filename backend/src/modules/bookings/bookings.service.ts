import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { EmailService } from '../email/email.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
import { LawyerService } from '../lawyer/lawyer.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private emailService: EmailService,
    private googleCalendarService: GoogleCalendarService,
    private lawyerService: LawyerService,
  ) {}

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    // ✅ validate required fields
    if (
      !bookingData.clientName ||
      !bookingData.clientEmail ||
      !bookingData.clientPhone ||
      !bookingData.serviceId ||
      !bookingData.appointmentDate
    ) {
      throw new Error('Missing required booking data');
    }

    const booking = await this.bookingModel.create(bookingData);

    const lawyer = await this.lawyerService.getLawyerProfile();
    if (!lawyer) throw new Error('Lawyer not found');

    const startTime = new Date(bookingData.appointmentDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const eventDetails = {
      summary: `Consultation - ${bookingData.clientName}`,
      description: `Client: ${bookingData.clientName}\nEmail: ${bookingData.clientEmail}`,
      startTime,
      endTime,
      attendeeEmail: bookingData.clientEmail,
    };

    try {
      const tokens = {
        access_token: lawyer.googleAccessToken,
        refresh_token: lawyer.googleRefreshToken,
      };
      const googleEvent = await this.googleCalendarService.createEvent(
        lawyer.googleCalendarId,
        tokens,
        eventDetails,
      );

      await this.bookingModel.findByIdAndUpdate(booking._id, {
        googleEventId: googleEvent.id,
        status: 'confirmed',
      });
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
    }

    await this.emailService.sendBookingConfirmation(
      bookingData.clientEmail,
      bookingData.clientName,
      bookingData.clientPhone,
      startTime,
      'Consultation',
    );

    await this.emailService.sendBookingNotificationToLawyer(
      lawyer.email,
      bookingData.clientName,
      bookingData.clientEmail,
      bookingData.clientPhone,
      'Consultation',
      startTime,
    );

    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookingModel.find().sort({ appointmentDate: 1 });
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  }

  async getAvailableSlots(): Promise<any> {
    try {
      const lawyer = await this.lawyerService.getLawyerProfile();
      if (!lawyer) throw new Error('Lawyer not found');

      const tokens = {
        access_token: lawyer.googleAccessToken,
        refresh_token: lawyer.googleRefreshToken,
      };
      return await this.googleCalendarService.getAvailableSlots(
        lawyer.googleCalendarId,
        tokens,
      );
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return [];
    }
  }
//  i dont think this is right, we should be deleting the booking not just changing the status to cancelled, if we change the status to cancelled then we will have a lot of cancelled bookings in our database and it will be hard to manage them, also if we change the status to cancelled then we will have to check the status of the booking every time we want to fetch the bookings, if we delete the booking then we don't have to worry about the status of the booking and we can just fetch the bookings without any additional checks, also if we delete the booking then we can free up some space in our database and improve the performance of our application, so i think we should delete the booking instead of changing the status to cancelled, what do you think?
  async cancelBooking(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true },
    );

    if (!booking) throw new Error('Booking not found');

    if (booking.googleEventId) {
      try {
        const lawyer = await this.lawyerService.getLawyerProfile();
        if (!lawyer) throw new Error('Lawyer not found');

        const tokens = {
          access_token: lawyer.googleAccessToken,
          refresh_token: lawyer.googleRefreshToken,
        };
        await this.googleCalendarService.cancelEvent(
          lawyer.googleCalendarId,
          booking.googleEventId,
          tokens,
        );
      } catch (error) {
        console.error('Error cancelling Google Calendar event:', error);
      }
    }

    return booking;
  }
}

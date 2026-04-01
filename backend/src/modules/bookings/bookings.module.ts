import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { EmailModule } from '../email/email.module';
import { GoogleCalendarModule } from '../google-calendar/google-calendar.module';
import { LawyerModule } from '../lawyer/lawyer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    EmailModule,
    GoogleCalendarModule,
    LawyerModule,
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
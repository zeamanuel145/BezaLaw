import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './schemas/booking.schema';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create')
  async createBooking(@Body() bookingData: Partial<Booking>): Promise<Booking> {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get()
  async getBookings(): Promise<Booking[]> {
    return this.bookingsService.getBookings();
  }

  @Get('available-slots')
  async getAvailableSlots(): Promise<unknown> {
    return this.bookingsService.getAvailableSlots();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.getBookingById(id);
  }

  @Delete(':id')
  async cancelBooking(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.cancelBooking(id);
  }
}

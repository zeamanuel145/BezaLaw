import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create')
  async createBooking(@Body() bookingData) {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get()
  async getBookings() {
    return this.bookingsService.getBookings();
  }

  @Get('available-slots')
  async getAvailableSlots() {
    return this.bookingsService.getAvailableSlots();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return this.bookingsService.getBookingById(id);
  }

  @Delete(':id')
  async cancelBooking(@Param('id') id: string) {
    return this.bookingsService.cancelBooking(id);
  }
}
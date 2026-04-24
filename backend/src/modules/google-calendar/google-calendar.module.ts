import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { GoogleAuthController } from './google-auth.controller';

@Module({
  providers: [GoogleCalendarService],
  controllers: [GoogleAuthController],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}

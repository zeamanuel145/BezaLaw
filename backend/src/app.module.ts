import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LawyerModule } from './modules/lawyer/lawyer.module';
import { ServicesModule } from './modules/services/services.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    DatabaseModule,
    LawyerModule,
    ServicesModule,
    BookingsModule,
    ContactModule,
  ],
})
export class AppModule {}

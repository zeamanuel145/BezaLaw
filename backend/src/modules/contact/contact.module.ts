import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    EmailModule,
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}

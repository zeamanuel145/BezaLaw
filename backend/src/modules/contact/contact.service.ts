import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private emailService: EmailService,
  ) {}

  async submitContact(contactData: Partial<Contact>): Promise<Contact> {
    const { name, email, phone, subject, message } = contactData;

    // ✅ validate required fields
    if (!name || !email || !phone || !subject || !message) {
      throw new Error('Missing contact fields');
    }

    if (!process.env.LAWYER_EMAIL) {
      throw new Error('LAWYER_EMAIL is missing in .env');
    }

    const lawyerEmail = process.env.LAWYER_EMAIL;

    // Save to database
    const contact = await this.contactModel.create(contactData);

    // Send email to lawyer
    await this.emailService.sendContactForm(
      lawyerEmail,
      name,
      email,
      phone,
      subject,
      message,
    );

    // Send confirmation to client
    await this.emailService.sendContactConfirmation(email, name, phone);

    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 });
  }

  async getContactById(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async markAsRead(id: string): Promise<Contact> {
    const contact = await this.contactModel.findByIdAndUpdate(
      id,
      { status: 'read' },
      { new: true },
    );

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async deleteContact(id: string): Promise<Contact> {
    const contact = await this.contactModel.findByIdAndDelete(id);

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }
}
